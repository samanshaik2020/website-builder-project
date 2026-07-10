export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          template: string
          theme: string | null
          data: Json
          custom_url: string | null
          campaign_enabled: boolean
          campaign_heading: string | null
          campaign_subheading: string | null
          affiliate_url: string | null
          head_scripts: string | null
          body_scripts: string | null
          redirect_after_submit: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          template: string
          theme?: string | null
          data?: Json
          custom_url?: string | null
          campaign_enabled?: boolean
          campaign_heading?: string | null
          campaign_subheading?: string | null
          affiliate_url?: string | null
          head_scripts?: string | null
          body_scripts?: string | null
          redirect_after_submit?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          template?: string
          theme?: string | null
          data?: Json
          custom_url?: string | null
          campaign_enabled?: boolean
          campaign_heading?: string | null
          campaign_subheading?: string | null
          affiliate_url?: string | null
          head_scripts?: string | null
          body_scripts?: string | null
          redirect_after_submit?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string | null
          user_id: string
          name: string
          url: string
          alt_text: string | null
          width: string | null
          height: string | null
          alignment: string | null
          storage_path: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          user_id: string
          name: string
          url: string
          alt_text?: string | null
          width?: string | null
          height?: string | null
          alignment?: string | null
          storage_path?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          user_id?: string
          name?: string
          url?: string
          alt_text?: string | null
          width?: string | null
          height?: string | null
          alignment?: string | null
          storage_path?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      project_analytics: {
        Row: {
          id: string
          project_id: string
          views: number
          clicks: number
          last_viewed_at: string | null
          last_clicked_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          views?: number
          clicks?: number
          last_viewed_at?: string | null
          last_clicked_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          views?: number
          clicks?: number
          last_viewed_at?: string | null
          last_clicked_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      page_views: {
        Row: {
          id: string
          project_id: string
          viewed_at: string
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
        }
        Insert: {
          id?: string
          project_id: string
          viewed_at?: string
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          viewed_at?: string
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
        }
      }
      button_clicks: {
        Row: {
          id: string
          project_id: string
          button_id: string | null
          clicked_at: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          project_id: string
          button_id?: string | null
          clicked_at?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          button_id?: string | null
          clicked_at?: string
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      project_leads: {
        Row: {
          id: string
          project_id: string
          email: string
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          email: string
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          email?: string
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          created_at?: string
        }
      }
    }
  }
}

// Helper types for application use
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectImage = Database['public']['Tables']['project_images']['Row']
export type ProjectAnalytics = Database['public']['Tables']['project_analytics']['Row']
export type PageView = Database['public']['Tables']['page_views']['Row']
export type ButtonClick = Database['public']['Tables']['button_clicks']['Row']
export type ProjectLead = Database['public']['Tables']['project_leads']['Row']

// Combined project with analytics
export type ProjectWithAnalytics = Project & {
  analytics?: ProjectAnalytics
}
