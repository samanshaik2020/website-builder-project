import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, message: "Access code is required" },
        { status: 400 }
      )
    }

    // Create server-side Supabase client
    const supabase = await createServerSupabaseClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error("Auth error:", userError)
      return NextResponse.json(
        { success: false, message: "You must be logged in to redeem an access code" },
        { status: 401 }
      )
    }

    console.log("Redeeming code:", code.toUpperCase().trim(), "for user:", user.id)

    // Call the database function to redeem the code
    const { data, error } = await supabase.rpc("redeem_access_code", {
      p_code: code.toUpperCase().trim(),
      p_user_id: user.id,
    })

    if (error) {
      console.error("Error redeeming code:", error)
      return NextResponse.json(
        { success: false, message: error.message || "Failed to redeem access code" },
        { status: 400 }
      )
    }

    console.log("Redemption result:", data)

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid response from server" },
        { status: 400 }
      )
    }

    const result = data[0]

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      planType: result.plan_type,
      message: result.message,
    })
  } catch (error: any) {
    console.error("API error redeeming access code:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
