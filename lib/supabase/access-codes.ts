"use client"

import { supabase } from "@/lib/supabase/client"

export interface AccessCode {
  id: string
  code: string
  plan_type: "starter" | "professional" | "unlimited"
  user_id: string | null
  is_redeemed: boolean
  redeemed_at: string | null
  created_by: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

/**
 * Redeem an access code for the current user
 */
export async function redeemAccessCode(code: string): Promise<{
  success: boolean
  planType?: string
  message: string
}> {

  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        success: false,
        message: "You must be logged in to redeem an access code",
      }
    }

    // Call the database function to redeem the code
    const { data, error } = await supabase.rpc("redeem_access_code", {
      p_code: code.toUpperCase().trim(),
      p_user_id: user.id,
    })

    if (error) {
      console.error("Error redeeming code:", error)
      return {
        success: false,
        message: error.message || "Failed to redeem access code",
      }
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        message: "Invalid response from server",
      }
    }

    const result = data[0]

    return {
      success: result.success,
      planType: result.plan_type,
      message: result.message,
    }
  } catch (error: any) {
    console.error("Unexpected error redeeming code:", error)
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    }
  }
}

/**
 * Get all redeemed codes for the current user
 */
export async function getUserRedeemedCodes(): Promise<AccessCode[]> {

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return []
    }

    const { data, error } = await supabase
      .from("access_codes")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_redeemed", true)
      .order("redeemed_at", { ascending: false })

    if (error) {
      console.error("Error fetching redeemed codes:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error fetching codes:", error)
    return []
  }
}

/**
 * Check if a code exists and is valid (without redeeming it)
 */
export async function checkAccessCodeValidity(code: string): Promise<{
  valid: boolean
  planType?: string
  expiresAt?: string
}> {

  try {
    const { data, error } = await supabase
      .from("access_codes")
      .select("plan_type, expires_at")
      .eq("code", code.toUpperCase().trim())
      .eq("is_redeemed", false)
      .single()

    if (error || !data) {
      return { valid: false }
    }

    // Check if expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return { valid: false }
    }

    return {
      valid: true,
      planType: data.plan_type,
      expiresAt: data.expires_at,
    }
  } catch (error) {
    console.error("Error checking code validity:", error)
    return { valid: false }
  }
}
