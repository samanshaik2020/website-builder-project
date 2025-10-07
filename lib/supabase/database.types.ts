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
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          plan: 'free' | 'starter' | 'professional' | 'unlimited'
          subscribed_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'starter' | 'professional' | 'unlimited'
          subscribed_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'starter' | 'professional' | 'unlimited'
          subscribed_at?: string
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
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          template: string
          theme?: string | null
          data: Json
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
          created_at?: string
          updated_at?: string
        }
      }
      shareable_links: {
        Row: {
          id: string
          user_id: string
          project_id: string
          custom_slug: string
          expires_at: string | null
          max_views: number | null
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          custom_slug: string
          expires_at?: string | null
          max_views?: number | null
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          custom_slug?: string
          expires_at?: string | null
          max_views?: number | null
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      template_stats: {
        Row: {
          id: string
          user_id: string
          template: string
          theme: string | null
          usage_count: number
          last_used_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template: string
          theme?: string | null
          usage_count?: number
          last_used_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template?: string
          theme?: string | null
          usage_count?: number
          last_used_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      plan_type: 'free' | 'starter' | 'professional' | 'unlimited'
    }
  }
}
