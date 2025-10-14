-- Migration for Analytics Tracking
-- This adds button click tracking and analytics functions

-- Create button_clicks table to track clicks on shared links
CREATE TABLE IF NOT EXISTS public.button_clicks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  shareable_link_id UUID REFERENCES public.shareable_links(id) ON DELETE CASCADE NOT NULL,
  button_id TEXT NOT NULL,
  button_text TEXT,
  button_href TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_button_clicks_link_id ON public.button_clicks(shareable_link_id);
CREATE INDEX IF NOT EXISTS idx_button_clicks_clicked_at ON public.button_clicks(clicked_at DESC);

-- Enable RLS for button_clicks
ALTER TABLE public.button_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert button clicks (for public shared links)
CREATE POLICY "Anyone can insert button clicks" ON public.button_clicks
  FOR INSERT WITH CHECK (true);

-- Users can view clicks on their own shareable links
CREATE POLICY "Users can view clicks on own links" ON public.button_clicks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shareable_links
      WHERE shareable_links.id = button_clicks.shareable_link_id
      AND shareable_links.user_id = auth.uid()
    )
  );

-- Function to get total views for a user (sum of all shareable link views)
CREATE OR REPLACE FUNCTION public.get_user_total_views(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  total_views INTEGER;
BEGIN
  SELECT COALESCE(SUM(views), 0)
  INTO total_views
  FROM public.shareable_links
  WHERE user_id = user_uuid;
  
  RETURN total_views;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get total clicks for a user (sum of all button clicks on their links)
CREATE OR REPLACE FUNCTION public.get_user_total_clicks(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  total_clicks INTEGER;
BEGIN
  SELECT COALESCE(COUNT(*), 0)
  INTO total_clicks
  FROM public.button_clicks bc
  INNER JOIN public.shareable_links sl ON bc.shareable_link_id = sl.id
  WHERE sl.user_id = user_uuid;
  
  RETURN total_clicks;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment link views (if not already exists)
CREATE OR REPLACE FUNCTION public.increment_link_views(link_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.shareable_links
  SET views = views + 1
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track button click
CREATE OR REPLACE FUNCTION public.track_button_click(
  link_id UUID,
  btn_id TEXT,
  btn_text TEXT DEFAULT NULL,
  btn_href TEXT DEFAULT NULL,
  user_agent_str TEXT DEFAULT NULL,
  ip_addr TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  click_id UUID;
BEGIN
  INSERT INTO public.button_clicks (
    shareable_link_id,
    button_id,
    button_text,
    button_href,
    user_agent,
    ip_address
  )
  VALUES (
    link_id,
    btn_id,
    btn_text,
    btn_href,
    user_agent_str,
    ip_addr
  )
  RETURNING id INTO click_id;
  
  RETURN click_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
