/**
 * Access Code Generator Script
 * 
 * This script helps generate access codes for users to unlock Pro plans.
 * Run this script to generate codes that can be sent to users after payment.
 * 
 * Usage:
 * npx tsx scripts/generate-access-codes.ts <userId> <planType> [expiresInDays]
 * 
 * Example:
 * npx tsx scripts/generate-access-codes.ts user@example.com professional 30
 */

import { generateAccessCode, generateBatchCodes } from '../lib/access-code-generator'

// Get command line arguments
const args = process.argv.slice(2)

if (args.length < 2) {
  console.error('❌ Error: Missing required arguments')
  console.log('\nUsage:')
  console.log('  npx tsx scripts/generate-access-codes.ts <userId> <planType> [expiresInDays]')
  console.log('\nArguments:')
  console.log('  userId         - User identifier (email or user ID)')
  console.log('  planType       - Plan type: starter, professional, or unlimited')
  console.log('  expiresInDays  - (Optional) Number of days until code expires')
  console.log('\nExamples:')
  console.log('  npx tsx scripts/generate-access-codes.ts user@example.com professional')
  console.log('  npx tsx scripts/generate-access-codes.ts user@example.com starter 30')
  console.log('  npx tsx scripts/generate-access-codes.ts user@example.com unlimited 90')
  process.exit(1)
}

const userId = args[0]
const planType = args[1] as 'starter' | 'professional' | 'unlimited'
const expiresInDays = args[2] ? parseInt(args[2]) : undefined

// Validate plan type
if (!['starter', 'professional', 'unlimited'].includes(planType)) {
  console.error('❌ Error: Invalid plan type')
  console.log('Valid plan types: starter, professional, unlimited')
  process.exit(1)
}

// Validate expiration days
if (expiresInDays !== undefined && (isNaN(expiresInDays) || expiresInDays <= 0)) {
  console.error('❌ Error: Invalid expiration days. Must be a positive number.')
  process.exit(1)
}

// Generate the access code
console.log('\n🔑 Generating Access Code...\n')

const codeData = generateAccessCode(userId, planType, expiresInDays)

console.log('✅ Access Code Generated Successfully!\n')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log(`📧 User ID:       ${userId}`)
console.log(`📦 Plan Type:     ${planType.toUpperCase()}`)
console.log(`🔐 Access Code:   ${codeData.code}`)
if (codeData.expiresAt) {
  console.log(`⏰ Expires At:    ${codeData.expiresAt.toLocaleString()}`)
} else {
  console.log(`⏰ Expires At:    Never`)
}
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

console.log('📝 Next Steps:')
console.log('1. Copy the access code above')
console.log('2. Insert it into your Supabase database:')
console.log('\n   INSERT INTO public.access_codes (code, plan_type, created_by, expires_at)')
console.log(`   VALUES ('${codeData.code}', '${planType}', 'admin', ${codeData.expiresAt ? `'${codeData.expiresAt.toISOString()}'` : 'NULL'});`)
console.log('\n3. Send the code to the user via email')
console.log('4. User can redeem it in their dashboard\n')

// Generate batch codes example
console.log('💡 Tip: To generate multiple codes, create a batch script or modify this file.\n')
