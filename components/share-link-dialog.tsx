"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useShareableLinks } from "@/hooks/use-shareable-links"
import { useSubscription } from "@/hooks/use-subscription"
import {
  canCreateShareableLink,
  getShareableLinkExpiry,
  getMaxShareableLinks,
} from "@/lib/pricing-plans"
import { toast } from "sonner"
import { Copy, Check, ExternalLink, Calendar, Eye, Link2 } from "lucide-react"
import type { ProjectRecord } from "@/components/lib/projects-store"

interface ShareLinkDialogProps {
  project: ProjectRecord
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareLinkDialog({ project, open, onOpenChange }: ShareLinkDialogProps) {
  const { create, checkSlugAvailability, getActiveCount } = useShareableLinks(project.id)
  const { subscription } = useSubscription()
  const [customSlug, setCustomSlug] = useState("")
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const activeLinksCount = getActiveCount(project.id)
  const maxLinks = getMaxShareableLinks(subscription.plan)
  const expiryDays = getShareableLinkExpiry(subscription.plan)
  const canCreate = canCreateShareableLink(subscription.plan, activeLinksCount)

  const handleGenerateLink = async () => {
    if (!customSlug.trim()) {
      toast.error("Please enter a custom URL")
      return
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9-]+$/
    if (!slugRegex.test(customSlug)) {
      toast.error("URL can only contain lowercase letters, numbers, and hyphens")
      return
    }

    if (!checkSlugAvailability(customSlug)) {
      toast.error("This URL is already taken. Please choose a different one.")
      return
    }

    if (!canCreate) {
      toast.error("Link Limit Reached", {
        description: `You've reached the maximum of ${maxLinks} active links for your plan. Upgrade or delete existing links.`,
      })
      return
    }

    setLoading(true)
    try {
      const link = create(project.id, customSlug, expiryDays)
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
      const fullUrl = `${baseUrl}/share/${link.customSlug}`
      setGeneratedLink(fullUrl)
      
      toast.success("Shareable Link Created!", {
        description: expiryDays 
          ? `Link will expire in ${expiryDays} days`
          : "Link has no expiration date",
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create link")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleOpenLink = () => {
    if (generatedLink) {
      window.open(generatedLink, "_blank")
    }
  }

  const handleClose = () => {
    setCustomSlug("")
    setGeneratedLink(null)
    setCopied(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            Create Shareable Link
          </DialogTitle>
          <DialogDescription>
            Generate a custom URL to share your project. {expiryDays ? `Links expire after ${expiryDays} days.` : "Links never expire."}
          </DialogDescription>
        </DialogHeader>

        {!generatedLink ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="custom-slug" className="text-sm font-medium">Custom URL</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/share/
                </span>
                <Input
                  id="custom-slug"
                  placeholder="my-awesome-site"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Only lowercase letters, numbers, and hyphens allowed
              </p>
            </div>

            <div className="rounded-lg border p-4 space-y-2 bg-muted/30">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Link Expiry
                </span>
                <span className="font-medium">
                  {expiryDays ? `${expiryDays} days` : "Never"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Active Links
                </span>
                <span className="font-medium">
                  {activeLinksCount} / {maxLinks === "unlimited" ? "∞" : maxLinks}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950 space-y-3">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <Check className="w-5 h-5" />
                <span className="font-medium">Link Created Successfully!</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-white rounded border">
                <code className="flex-1 text-sm break-all text-gray-800 dark:text-gray-800">{generatedLink}</code>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopyLink} className="flex-1" variant="outline">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button onClick={handleOpenLink} className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Link
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          {!generatedLink ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleGenerateLink} disabled={loading || !customSlug.trim()}>
                {loading ? "Generating..." : "Generate Link"}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
