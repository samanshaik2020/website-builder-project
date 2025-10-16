/**
 * Access Code Generator
 * Generates unique access codes for different users to unlock Pro plans
 */

import crypto from 'crypto'

export type PlanType = 'starter' | 'professional' | 'unlimited'

interface AccessCodeData {
  code: string
  planType: PlanType
  userId: string
  expiresAt?: Date
}

/**
 * Generate a unique access code for a specific user and plan
 * Format: PLAN-USERID-RANDOM (e.g., PRO-ABC123-XYZ789)
 */
export function generateAccessCode(
  userId: string,
  planType: PlanType,
  expiresInDays?: number
): AccessCodeData {
  // Create a hash of userId for uniqueness
  const userHash = crypto
    .createHash('sha256')
    .update(userId)
    .digest('hex')
    .substring(0, 6)
    .toUpperCase()

  // Generate random component
  const randomPart = crypto.randomBytes(4).toString('hex').toUpperCase()

  // Plan prefix
  const planPrefix = getPlanPrefix(planType)

  // Combine to create the code
  const code = `${planPrefix}-${userHash}-${randomPart}`

  // Calculate expiration if provided
  const expiresAt = expiresInDays
    ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
    : undefined

  return {
    code,
    planType,
    userId,
    expiresAt,
  }
}

/**
 * Validate an access code format
 */
export function validateAccessCodeFormat(code: string): boolean {
  // Format: XXX-XXXXXX-XXXXXXXX
  const pattern = /^[A-Z]{3}-[A-Z0-9]{6}-[A-Z0-9]{8}$/
  return pattern.test(code)
}

/**
 * Extract plan type from access code
 */
export function extractPlanFromCode(code: string): PlanType | null {
  if (!validateAccessCodeFormat(code)) return null

  const prefix = code.split('-')[0]
  
  switch (prefix) {
    case 'STR':
      return 'starter'
    case 'PRO':
      return 'professional'
    case 'UNL':
      return 'unlimited'
    default:
      return null
  }
}

/**
 * Generate multiple codes for batch creation
 */
export function generateBatchCodes(
  userIds: string[],
  planType: PlanType,
  expiresInDays?: number
): AccessCodeData[] {
  return userIds.map(userId => generateAccessCode(userId, planType, expiresInDays))
}

/**
 * Get plan prefix for code generation
 */
function getPlanPrefix(planType: PlanType): string {
  switch (planType) {
    case 'starter':
      return 'STR'
    case 'professional':
      return 'PRO'
    case 'unlimited':
      return 'UNL'
    default:
      return 'STR'
  }
}

/**
 * Verify if a code belongs to a specific user
 * (Used for additional security checks)
 */
export function verifyCodeOwnership(code: string, userId: string): boolean {
  if (!validateAccessCodeFormat(code)) return false

  const userHash = crypto
    .createHash('sha256')
    .update(userId)
    .digest('hex')
    .substring(0, 6)
    .toUpperCase()

  const codeUserHash = code.split('-')[1]
  
  return userHash === codeUserHash
}
