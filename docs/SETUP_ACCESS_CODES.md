# Access Code System - Quick Setup Guide

## 🚀 Quick Start

Follow these steps to set up the access code system in your project.

## Step 1: Run Database Migration

Execute the SQL migration to create the access codes table and functions.

### Option A: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file: `lib/supabase/migration-access-codes.sql`
4. Copy and paste the entire content
5. Click **Run** to execute

### Option B: Using Command Line
```bash
psql -h your-db-host -U your-user -d your-database -f lib/supabase/migration-access-codes.sql
```

## Step 2: Update Developer Email

Update the developer contact email in these files:

**File: `components/payment-info-dialog.tsx`** (Line 15)
```typescript
const DEVELOPER_EMAIL = "your-email@domain.com" // Change this
```

**File: `components/redeem-access-code-dialog.tsx`** (Line 162)
```typescript
developer@squpage.com // Change this in the help text
```

## Step 3: Test the System

### 3.1 Generate a Test Code

**Option A: Using the HTML Generator (Easiest)**
1. Open `scripts/code-generator.html` in your browser
2. Fill in the form:
   - User Email: `test@example.com`
   - Plan Type: `professional`
   - Expires In: `30` (days)
3. Click "Generate Access Code"
4. Copy the SQL query

**Option B: Using the Node.js Script**
```bash
npx tsx scripts/generate-access-codes.ts test@example.com professional 30
```

### 3.2 Insert Code into Database

Copy the generated SQL and run it in Supabase SQL Editor:
```sql
INSERT INTO public.access_codes (code, plan_type, created_by, expires_at)
VALUES ('PRO-ABC123-XYZ78901', 'professional', 'admin', '2024-12-31 23:59:59');
```

### 3.3 Test Redemption

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the pricing page: `http://localhost:3000/pricing`

3. Click on any paid plan (Starter, Professional, or Unlimited)

4. **Payment Info Dialog** should appear with:
   - Instructions for manual payment
   - Developer email
   - "Send Email" button

5. Close the dialog and go to Dashboard: `http://localhost:3000/dashboard`

6. Click **"Redeem Access Code"** button in the upgrade card

7. Enter the test code you generated

8. Click **"Redeem Code"**

9. Your plan should be upgraded! ✅

## Step 4: Production Workflow

### When a User Requests Upgrade:

1. **User clicks** on a paid plan → Payment dialog appears
2. **User sends email** to your developer email
3. **You receive** the payment request email
4. **Verify payment** is completed
5. **Generate code** using the HTML generator or script:
   ```bash
   npx tsx scripts/generate-access-codes.ts user@example.com professional 90
   ```
6. **Insert code** into Supabase database
7. **Send email** to user with the access code:

   ```
   Subject: Your Squpage Pro Access Code
   
   Hi [User Name],
   
   Thank you for upgrading to Professional Plan!
   
   Your access code is: PRO-ABC123-XYZ78901
   
   To activate:
   1. Log in to your dashboard
   2. Click "Redeem Access Code"
   3. Enter the code above
   
   This code expires on: [DATE]
   
   Best regards,
   Squpage Team
   ```

8. **User redeems** the code in their dashboard
9. **Plan upgraded** automatically! 🎉

## Features Included

✅ Payment info popup with manual payment instructions  
✅ Access code redemption dialog in dashboard  
✅ Unique code generation per user  
✅ Code expiration support  
✅ Database validation and security  
✅ One-time use codes  
✅ Automatic plan upgrade on redemption  
✅ HTML code generator tool  
✅ Node.js script for batch generation  

## File Structure

```
project/
├── components/
│   ├── payment-info-dialog.tsx          # Payment instructions popup
│   ├── redeem-access-code-dialog.tsx    # Code redemption dialog
│   └── ui/
│       └── label.tsx                     # UI component
├── lib/
│   ├── access-code-generator.ts         # Code generation logic
│   └── supabase/
│       ├── access-codes.ts              # Database functions
│       └── migration-access-codes.sql   # Database migration
├── app/
│   ├── api/
│   │   └── redeem-access-code/
│   │       └── route.ts                 # API endpoint
│   ├── pricing/
│   │   └── page.tsx                     # Updated with dialog
│   └── dashboard/
│       └── page.tsx                     # Updated with redeem button
├── scripts/
│   ├── generate-access-codes.ts         # CLI code generator
│   └── code-generator.html              # Web-based generator
└── docs/
    ├── ACCESS_CODE_SYSTEM.md            # Full documentation
    └── SETUP_ACCESS_CODES.md            # This file
```

## Troubleshooting

### Code Not Redeeming?

1. **Check database**: Verify code exists
   ```sql
   SELECT * FROM access_codes WHERE code = 'YOUR-CODE';
   ```

2. **Check if already redeemed**:
   ```sql
   SELECT is_redeemed FROM access_codes WHERE code = 'YOUR-CODE';
   ```

3. **Check expiration**:
   ```sql
   SELECT expires_at FROM access_codes WHERE code = 'YOUR-CODE';
   ```

### Dialog Not Appearing?

1. Clear browser cache
2. Check console for errors
3. Verify imports in pricing page

### Database Errors?

1. Ensure migration ran successfully
2. Check RLS policies are enabled
3. Verify user is authenticated

## Support

For detailed documentation, see: `docs/ACCESS_CODE_SYSTEM.md`

For issues:
- Check browser console
- Check Supabase logs
- Review API endpoint responses

## Next Steps

1. ✅ Complete setup steps above
2. ✅ Test with a dummy code
3. ✅ Update developer email
4. ✅ Customize email templates
5. ✅ Set up your payment verification process
6. 🚀 Start accepting Pro upgrades!

---

**Need help?** Contact: developer@squpage.com
