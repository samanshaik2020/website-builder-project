'use client'

import { createClient } from '@/lib/supabase/client'

export interface Lead {
  id: string
  project_id: string
  email: string
  ip_address: string | null
  user_agent: string | null
  referrer: string | null
  created_at: string
}

export interface CampaignSettings {
  campaignEnabled: boolean
  campaignHeading: string
  campaignSubheading: string
  affiliateUrl: string
  headScripts: string
  bodyScripts: string
}

/**
 * Submit a lead (email) for a project - used by anonymous visitors
 */
export async function submitLead(
  projectId: string,
  email: string,
  metadata?: {
    userAgent?: string
    referrer?: string
  }
): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.rpc('submit_lead', {
    p_project_id: projectId,
    p_email: email,
    p_user_agent: metadata?.userAgent || null,
    p_referrer: metadata?.referrer || null,
  })

  if (error) {
    console.error('[submitLead] Error:', error)
    throw new Error(error.message)
  }
}

/**
 * Get all leads for a specific project (authenticated user only)
 */
export async function getProjectLeads(
  projectId: string,
  options?: {
    limit?: number
    offset?: number
  }
): Promise<Lead[]> {
  const supabase = createClient()

  let query = supabase
    .from('project_leads')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Get lead count for a project
 */
export async function getLeadCount(projectId: string): Promise<number> {
  const supabase = createClient()

  const { data, error } = await supabase.rpc('get_lead_count', {
    p_project_id: projectId,
  })

  if (error) {
    console.error('[getLeadCount] Error:', error)
    return 0
  }

  return data || 0
}

/**
 * Get lead counts for multiple projects at once
 */
export async function getLeadCountsForProjects(
  projectIds: string[]
): Promise<Record<string, number>> {
  const counts: Record<string, number> = {}

  // Fetch counts in parallel
  await Promise.all(
    projectIds.map(async (projectId) => {
      counts[projectId] = await getLeadCount(projectId)
    })
  )

  return counts
}

/**
 * Update campaign settings for a project
 */
export async function updateCampaignSettings(
  projectId: string,
  settings: Partial<CampaignSettings>
): Promise<void> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const updateData: Record<string, unknown> = {}
  if (settings.campaignEnabled !== undefined) updateData.campaign_enabled = settings.campaignEnabled
  if (settings.campaignHeading !== undefined) updateData.campaign_heading = settings.campaignHeading
  if (settings.campaignSubheading !== undefined) updateData.campaign_subheading = settings.campaignSubheading
  if (settings.affiliateUrl !== undefined) updateData.affiliate_url = settings.affiliateUrl
  if (settings.headScripts !== undefined) updateData.head_scripts = settings.headScripts
  if (settings.bodyScripts !== undefined) updateData.body_scripts = settings.bodyScripts

  const { error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }
}

/**
 * Get campaign settings for a project
 */
export async function getCampaignSettings(projectId: string): Promise<CampaignSettings | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('campaign_enabled, campaign_heading, campaign_subheading, affiliate_url, head_scripts, body_scripts')
    .eq('id', projectId)
    .single()

  if (error) {
    console.error('[getCampaignSettings] Error:', error)
    return null
  }

  return {
    campaignEnabled: data.campaign_enabled || false,
    campaignHeading: data.campaign_heading || 'Get Exclusive Access',
    campaignSubheading: data.campaign_subheading || 'Enter your email to continue',
    affiliateUrl: data.affiliate_url || '',
    headScripts: data.head_scripts || '',
    bodyScripts: data.body_scripts || '',
  }
}

/**
 * Delete a lead
 */
export async function deleteLead(leadId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('project_leads')
    .delete()
    .eq('id', leadId)

  if (error) {
    throw new Error(error.message)
  }
}

/**
 * Export leads as CSV string
 */
export function exportLeadsToCsv(leads: Lead[]): string {
  const header = 'Email,Date,Referrer,User Agent'
  const rows = leads.map((lead) => {
    const date = new Date(lead.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    return `"${lead.email}","${date}","${lead.referrer || 'Direct'}","${lead.user_agent || 'Unknown'}"`
  })

  return [header, ...rows].join('\n')
}
