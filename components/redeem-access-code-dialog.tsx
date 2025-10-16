"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Key, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { validateAccessCodeFormat } from "@/lib/access-code-generator"

interface RedeemAccessCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (planType: string) => void
}

export function RedeemAccessCodeDialog({
  open,
  onOpenChange,
  onSuccess,
}: RedeemAccessCodeDialogProps) {
  const [code, setCode] = useState("")
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [error, setError] = useState("")

  const handleRedeem = async () => {
    // Clear previous errors
    setError("")

    // Validate format
    const formattedCode = code.trim().toUpperCase()
    if (!formattedCode) {
      setError("Please enter an access code")
      return
    }

    if (!validateAccessCodeFormat(formattedCode)) {
      setError("Invalid access code format. Format should be: XXX-XXXXXX-XXXXXXXX")
      return
    }

    setIsRedeeming(true)

    try {
      // TODO: Replace with actual Supabase call
      // For now, simulate the redemption
      const response = await fetch("/api/redeem-access-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: formattedCode }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to redeem access code")
      }

      const data = await response.json()

      toast.success("Access Code Redeemed!", {
        description: `Your ${data.planType} plan has been activated successfully.`,
        duration: 5000,
      })

      onSuccess(data.planType)
      onOpenChange(false)
      setCode("")
    } catch (err: any) {
      console.error("Redemption error:", err)
      setError(err.message || "Failed to redeem access code. Please try again.")
      toast.error("Redemption Failed", {
        description: err.message || "Invalid or expired access code",
      })
    } finally {
      setIsRedeeming(false)
    }
  }

  const handleCodeChange = (value: string) => {
    // Auto-format the code as user types
    const formatted = value.toUpperCase().replace(/[^A-Z0-9-]/g, "")
    setCode(formatted)
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Key className="w-6 h-6 text-purple-600" />
            Redeem Access Code
          </DialogTitle>
          <DialogDescription>
            Enter your access code to unlock Pro features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Info Box */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-gray-900 mb-1">Unlock Pro Features</p>
                <p className="text-gray-700">
                  After payment, you'll receive a unique access code via email. 
                  Enter it here to activate your Pro plan.
                </p>
              </div>
            </div>
          </div>

          {/* Code Input */}
          <div className="space-y-2">
            <Label htmlFor="access-code" className="text-sm font-medium">
              Access Code
            </Label>
            <Input
              id="access-code"
              type="text"
              placeholder="XXX-XXXXXX-XXXXXXXX"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="font-mono text-center text-lg tracking-wider"
              maxLength={19}
              disabled={isRedeeming}
            />
            <p className="text-xs text-gray-500">
              Format: XXX-XXXXXX-XXXXXXXX (e.g., PRO-ABC123-XYZ78901)
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Success Indicators */}
          {code && validateAccessCodeFormat(code) && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">Valid code format</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleRedeem}
              disabled={!code || isRedeeming}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isRedeeming ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Redeeming...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Redeem Code
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                setCode("")
                setError("")
              }}
              disabled={isRedeeming}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>

          {/* Help Text */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Don't have an access code?</strong> Contact the developer at{" "}
              <a
                href="mailto:samanshaik2020@gmail.com"
                className="text-purple-600 hover:underline"
              >
                samanshaik2020@gmail.com
              </a>{" "}
              to purchase a plan and receive your code.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
