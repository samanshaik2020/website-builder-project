-- Access codes table for Pro plan unlocking
CREATE TABLE public.access_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  plan_type plan_type NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_redeemed BOOLEAN DEFAULT FALSE NOT NULL,
  redeemed_at TIMESTAMPTZ,
  created_by TEXT, -- Email or identifier of who generated the code
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX idx_access_codes_code ON public.access_codes(code);
CREATE INDEX idx_access_codes_user_id ON public.access_codes(user_id);
CREATE INDEX idx_access_codes_is_redeemed ON public.access_codes(is_redeemed);

-- Enable RLS
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view codes they've redeemed
CREATE POLICY "Users can view own redeemed codes" ON public.access_codes
  FOR SELECT USING (auth.uid() = user_id);

-- Anyone can check if a code is valid (for redemption)
CREATE POLICY "Anyone can check code validity" ON public.access_codes
  FOR SELECT USING (is_redeemed = FALSE);

-- Users can redeem codes
CREATE POLICY "Users can redeem codes" ON public.access_codes
  FOR UPDATE USING (is_redeemed = FALSE);

-- Trigger for updated_at
CREATE TRIGGER set_access_codes_updated_at
  BEFORE UPDATE ON public.access_codes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to redeem access code
CREATE OR REPLACE FUNCTION public.redeem_access_code(
  p_code TEXT,
  p_user_id UUID
)
RETURNS TABLE(success BOOLEAN, plan_type plan_type, message TEXT) AS $$
DECLARE
  v_code_record RECORD;
BEGIN
  -- Find the code
  SELECT * INTO v_code_record
  FROM public.access_codes
  WHERE code = p_code
  AND is_redeemed = FALSE
  AND (expires_at IS NULL OR expires_at > NOW());

  -- Check if code exists and is valid
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'free'::plan_type, 'Invalid or expired access code'::TEXT;
    RETURN;
  END IF;

  -- Redeem the code
  UPDATE public.access_codes
  SET 
    is_redeemed = TRUE,
    redeemed_at = NOW(),
    user_id = p_user_id
  WHERE code = p_code;

  -- Update user's plan
  UPDATE public.users
  SET 
    plan = v_code_record.plan_type,
    subscribed_at = NOW()
  WHERE id = p_user_id;

  RETURN QUERY SELECT TRUE, v_code_record.plan_type, 'Access code redeemed successfully'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
