"use client"

import { useState, useEffect } from "react"

export type Currency = "INR" | "USD"

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>("USD")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Try to detect user's country from timezone or locale
    const detectCurrency = async () => {
      try {
        // Method 1: Check timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        if (timezone.includes("Asia/Kolkata") || timezone.includes("Asia/Calcutta")) {
          setCurrency("INR")
          setIsLoading(false)
          return
        }

        // Method 2: Use a free IP geolocation API
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        
        if (data.country_code === "IN") {
          setCurrency("INR")
        } else {
          setCurrency("USD")
        }
      } catch (error) {
        console.error("Error detecting currency:", error)
        // Default to USD if detection fails
        setCurrency("USD")
      } finally {
        setIsLoading(false)
      }
    }

    detectCurrency()
  }, [])

  return { currency, setCurrency, isLoading }
}

export function getCurrencySymbol(currency: Currency): string {
  return currency === "INR" ? "₹" : "$"
}
