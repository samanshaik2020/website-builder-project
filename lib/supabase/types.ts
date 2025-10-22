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
    }
  }
}

// Helper types for application use
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectAnalytics = Database['public']['Tables']['project_analytics']['Row']
export type PageView = Database['public']['Tables']['page_views']['Row']
export type ButtonClick = Database['public']['Tables']['button_clicks']['Row']

// Combined project with analytics
export type ProjectWithAnalytics = Project & {
  analytics?: ProjectAnalytics
}
