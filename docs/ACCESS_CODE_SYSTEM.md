# Access Code System Documentation

## Overview

The Access Code System allows users to unlock Pro plans by redeeming unique access codes after making manual payments. This system was implemented because automated payment methods are not available due to application policies.

## How It Works

### User Flow

1. **User visits Pricing Page** → Clicks on a paid plan (Starter, Professional, or Unlimited)
2. **Payment Info Dialog appears** → Shows instructions to contact developer via email
3. **User contacts developer** → Sends email requesting plan upgrade
4. **Developer receives payment** → Generates unique access code for the user
5. **User receives code** → Gets access code via email
6. **User redeems code** → Enters code in Dashboard to unlock Pro features

### Developer Flow

1. **Receive payment request** from user
2. **Verify payment** completion
3. **Generate access code** using the provided script
4. **Insert code** into Supabase database
5. **Send code** to user via email
6. **User redeems** and plan is automatically upgraded

## Components

### 1. Payment Info Dialog (`components/payment-info-dialog.tsx`)
- Displays when user clicks on paid plans
- Shows step-by-step upgrade process
- Provides developer email for contact
- Includes "Send Email" button with pre-filled template

### 2. Redeem Access Code Dialog (`components/redeem-access-code-dialog.tsx`)
- Available in Dashboard for all users
- Validates code format before submission
- Calls API to redeem code
- Shows success/error messages
- Automatically refreshes page on success

### 3. Access Code Generator (`lib/access-code-generator.ts`)
- Generates unique codes per user
- Format: `XXX-XXXXXX-XXXXXXXX`
  - First part: Plan prefix (STR/PRO/UNL)
  - Second part: User hash (6 chars)
  - Third part: Random component (8 chars)
- Supports expiration dates
- Validates code format

### 4. Database Functions (`lib/supabase/access-codes.ts`)
- `redeemAccessCode()` - Redeems code and upgrades user plan
- `getUserRedeemedCodes()` - Gets user's redeemed codes
- `checkAccessCodeValidity()` - Validates code without redeeming

## Database Schema

### `access_codes` Table

```sql
CREATE TABLE public.access_codes (
  id UUID PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  plan_type plan_type NOT NULL,
  user_id UUID REFERENCES users(id),
  is_redeemed BOOLEAN DEFAULT FALSE,
  redeemed_at TIMESTAMPTZ,
  created_by TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Database Function

```sql
CREATE FUNCTION redeem_access_code(p_code TEXT, p_user_id UUID)
RETURNS TABLE(success BOOLEAN, plan_type plan_type, message TEXT)
```

## Generating Access Codes

### Using the Script

```bash
# Generate a code for a user
npx tsx scripts/generate-access-codes.ts user@example.com professional

# Generate a code with expiration (30 days)
npx tsx scripts/generate-access-codes.ts user@example.com starter 30

# Generate unlimited plan code
npx tsx scripts/generate-access-codes.ts user@example.com unlimited 90
```

### Manual Generation (Node.js)

```javascript
import { generateAccessCode } from './lib/access-code-generator'

const codeData = generateAccessCode(
  'user@example.com',  // User ID/Email
  'professional',       // Plan type
  30                    // Expires in 30 days (optional)
)

console.log(codeData.code) // PRO-ABC123-XYZ78901
```

## Inserting Codes into Database

After generating a code, insert it into Supabase:

```sql
-- Insert a new access code
INSERT INTO public.access_codes (code, plan_type, created_by, expires_at)
VALUES ('PRO-ABC123-XYZ78901', 'professional', 'admin@squpage.com', '2024-12-31 23:59:59');

-- Insert code without expiration
INSERT INTO public.access_codes (code, plan_type, created_by)
VALUES ('UNL-DEF456-ABC12345', 'unlimited', 'admin@squpage.com');
```

## Code Format

- **Format**: `XXX-XXXXXX-XXXXXXXX`
- **Total Length**: 19 characters (including dashes)
- **Plan Prefixes**:
  - `STR` - Starter Plan
  - `PRO` - Professional Plan
  - `UNL` - Unlimited Plan

### Example Codes
- `STR-A1B2C3-D4E5F6G7` - Starter Plan
- `PRO-X9Y8Z7-W6V5U4T3` - Professional Plan
- `UNL-M1N2O3-P4Q5R6S7` - Unlimited Plan

## Email Template for Users

```
Subject: Your Squpage Pro Access Code

Hi [User Name],

Thank you for upgrading to [Plan Name]!

Your access code is: [ACCESS_CODE]

To activate your plan:
1. Log in to your Squpage dashboard
2. Click on "Redeem Access Code" button
3. Enter the code above
4. Your plan will be upgraded immediately

This code is valid until [EXPIRATION_DATE / Never expires].

If you have any questions, feel free to reply to this email.

Best regards,
Squpage Team
```

## API Endpoints

### POST `/api/redeem-access-code`

Redeems an access code for the authenticated user.

**Request Body:**
```json
{
  "code": "PRO-ABC123-XYZ78901"
}
```

**Response (Success):**
```json
{
  "success": true,
  "planType": "professional",
  "message": "Access code redeemed successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid or expired access code"
}
```

## Security Features

1. **User-Specific Codes**: Each code contains a hash of the user ID
2. **One-Time Use**: Codes can only be redeemed once
3. **Expiration Support**: Optional expiration dates
4. **Database Validation**: Server-side validation before redemption
5. **RLS Policies**: Row-level security on access_codes table

## Configuration

### Developer Email

Update the developer email in:
- `components/payment-info-dialog.tsx` (line 15)
- `components/redeem-access-code-dialog.tsx` (line 162)

```typescript
const DEVELOPER_EMAIL = "your-email@domain.com"
```

## Troubleshooting

### Code Not Working

1. Check if code format is correct: `XXX-XXXXXX-XXXXXXXX`
2. Verify code exists in database
3. Check if code is already redeemed (`is_redeemed = true`)
4. Verify expiration date hasn't passed
5. Ensure user is logged in

### Database Issues

```sql
-- Check if code exists
SELECT * FROM access_codes WHERE code = 'YOUR-CODE-HERE';

-- Check if code is redeemed
SELECT is_redeemed, redeemed_at, user_id 
FROM access_codes 
WHERE code = 'YOUR-CODE-HERE';

-- Reset a code (for testing)
UPDATE access_codes 
SET is_redeemed = false, redeemed_at = NULL, user_id = NULL
WHERE code = 'YOUR-CODE-HERE';
```

## Testing

### Test Code Generation

```bash
# Generate test codes
npx tsx scripts/generate-access-codes.ts test@example.com starter
npx tsx scripts/generate-access-codes.ts test@example.com professional 7
npx tsx scripts/generate-access-codes.ts test@example.com unlimited
```

### Test Redemption Flow

1. Generate a test code
2. Insert into database
3. Log in as test user
4. Open Dashboard
5. Click "Redeem Access Code"
6. Enter code
7. Verify plan upgrade

## Migration

To set up the access code system in your database:

```bash
# Run the migration SQL file
psql -h your-db-host -U your-user -d your-database -f lib/supabase/migration-access-codes.sql
```

Or execute in Supabase SQL Editor:
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `lib/supabase/migration-access-codes.sql`
3. Execute the SQL

## Support

For issues or questions:
- Email: developer@squpage.com
- Check database logs for redemption errors
- Review browser console for client-side errors
