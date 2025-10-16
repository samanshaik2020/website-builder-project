"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, Copy, Check, AlertCircle, CreditCard, Shield } from "lucide-react"
import { toast } from "sonner"

interface PaymentInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  planPrice: string
  currency: string
}

const DEVELOPER_EMAIL = "samanshaik2020@gmail.com"

export function PaymentInfoDialog({
  open,
  onOpenChange,
  planName,
  planPrice,
  currency,
}: PaymentInfoDialogProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_EMAIL)
    setCopiedEmail(true)
    toast.success("Email copied to clipboard!")
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleMailTo = () => {
    const subject = encodeURIComponent(`Pro Plan Upgrade Request - ${planName}`)
    const body = encodeURIComponent(
      `Hello,\n\nI would like to upgrade to the ${planName} plan.\n\nPlan Details:\n- Plan: ${planName}\n- Price: ${currency === "INR" ? "₹" : "$"}${planPrice}\n\nPlease upgrade my account to this plan.\n\nThank you!`
    )
    window.open(`mailto:${DEVELOPER_EMAIL}?subject=${subject}&body=${body}`, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CreditCard className="w-6 h-6 text-purple-600" />
            Payment Information
          </DialogTitle>
          <DialogDescription>
            How to upgrade to {planName}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 px-6 pb-6">
          {/* LEFT COLUMN - Payment Info */}
          <div className="space-y-4">
            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Payment Methods Not Integrated</p>
                <p className="text-blue-700">
                  Due to application policies, automated payment methods are not available. 
                  Please follow the manual process below to upgrade your plan.
                </p>
              </div>
            </div>

            {/* Plan Details */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">Selected Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-600">{planName}</span>
                <span className="text-gray-600">•</span>
                <span className="text-xl font-semibold text-gray-900">
                  {currency === "INR" ? "₹" : "$"}{planPrice}
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Upgrade Process
              </h3>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">Contact Developer</p>
                    <p className="text-sm text-gray-600">Send an email with your upgrade request</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">Make Payment</p>
                    <p className="text-sm text-gray-600">Complete payment as instructed</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">Account Activation</p>
                    <p className="text-sm text-gray-600">Your plan will be activated manually</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">Start Using</p>
                    <p className="text-sm text-gray-600">Refresh and enjoy your new features</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-gray-500 text-center pt-2">
              Processing time: Usually within 24 hours
            </p>
          </div>

          {/* RIGHT COLUMN - Email & Access Code */}
          <div className="space-y-4">
            {/* Developer Email */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-600" />
                Contact Developer
              </h3>
              <p className="text-sm text-gray-600 mb-3">Developer Email:</p>
              <div className="flex items-center gap-2 mb-4">
                <code className="flex-1 bg-white px-3 py-2 rounded border border-gray-300 text-sm font-mono text-gray-900">
                  {DEVELOPER_EMAIL}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="flex-shrink-0"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={handleMailTo}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email Request
              </Button>
            </div>

            {/* Close Button */}
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
