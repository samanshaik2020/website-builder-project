"use client"

import { Button } from "@/components/ui/button"
import { Check, Brain, ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"
import { PRICING_PLANS } from "@/lib/pricing-plans"
import { useSubscription } from "@/hooks/use-subscription"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useCurrency, getCurrencySymbol } from "@/hooks/use-currency"
import { useState } from "react"

export default function PricingPage() {
  const { subscription, upgradePlan, isLoaded } = useSubscription()
  const router = useRouter()
  const { currency, setCurrency, isLoading: currencyLoading } = useCurrency()
  const [isProcessing, setIsProcessing] = useState(false)

  // Prevent hydration errors
  if (!isLoaded || currencyLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pricing plans...</p>
        </div>
      </div>
    )
  }

  const handlePayment = async (planId: string) => {
    setIsProcessing(true)

    try {
      // Update subscription directly (payment integration removed)
      upgradePlan(planId as any)
      
      const plan = PRICING_PLANS.find((p) => p.id === planId)
      const planName = plan?.name || "selected plan"
      
      toast.success(`Successfully switched to ${planName}!`, {
        description: "Your plan has been updated.",
        duration: 4000,
      })
      
      setTimeout(() => router.push("/dashboard"), 1000)
    } catch (error) {
      console.error("Plan update error:", error)
      toast.error("Failed to update plan", {
        description: "Please try again later.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Squpage</span>
            </Link>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Start free, upgrade as you grow
        </p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <p className="text-sm text-gray-500">
            Current Plan: <span className="font-semibold text-purple-600">{subscription.plan.toUpperCase()}</span>
          </p>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Globe className="w-4 h-4 text-gray-600" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "INR" | "USD")}
              className="text-sm font-medium text-gray-900 bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="INR">🇮🇳 INR (₹)</option>
              <option value="USD">🌍 USD ($)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan) => {
            const isCurrentPlan = subscription.plan === plan.id
            const isPlanActive = subscription.plan === plan.id

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl border-2 p-8 flex flex-col ${
                  plan.popular
                    ? "border-purple-600 shadow-2xl scale-105"
                    : isCurrentPlan
                    ? "border-green-500 shadow-lg"
                    : "border-gray-200 shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      {getCurrencySymbol(currency)}
                      {currency === "INR" ? plan.priceINR : plan.priceUSD}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <div className="flex-1 mb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handlePayment(plan.id)}
                  disabled={isPlanActive || isProcessing}
                  className={`w-full ${isProcessing ? "opacity-50 cursor-not-allowed" : ""} ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      : isPlanActive
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {isProcessing
                    ? "Processing..."
                    : isPlanActive
                    ? "Current Plan"
                    : plan.id === "free"
                    ? "Switch to Free"
                    : `Upgrade to ${plan.name}`}
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                  {PRICING_PLANS.map((plan) => (
                    <th key={plan.id} className="text-center py-4 px-4 font-semibold text-gray-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Normal Templates</td>
                  {PRICING_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center py-4 px-4 text-gray-600">
                      {plan.limits.normalTemplates === "unlimited" ? "Unlimited" : plan.limits.normalTemplates}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Pro Templates</td>
                  {PRICING_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center py-4 px-4 text-gray-600">
                      {plan.limits.proTemplates === Infinity ? "Unlimited" : plan.limits.proTemplates}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Export to HTML</td>
                  {PRICING_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center py-4 px-4">
                      {plan.limits.canExport ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">AI Content Generation</td>
                  {PRICING_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center py-4 px-4">
                      {plan.id !== "free" ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">Support</td>
                  {PRICING_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center py-4 px-4 text-gray-600 text-sm">
                      {plan.id === "free"
                        ? "Community"
                        : plan.id === "starter"
                        ? "Email"
                        : plan.id === "professional"
                        ? "Priority"
                        : "Dedicated"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan later?</h3>
            <p className="text-gray-600 text-sm">
              Yes! You can upgrade or downgrade your plan at any time from your dashboard.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">What happens to my projects if I downgrade?</h3>
            <p className="text-gray-600 text-sm">
              Your existing projects will remain accessible, but you won't be able to create new projects beyond your plan limits.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Can I export my websites?</h3>
            <p className="text-gray-600 text-sm">
              Export to HTML is available on Professional and Unlimited plans only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
