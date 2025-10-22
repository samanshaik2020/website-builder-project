# Authentication System

## Overview
The website builder includes a simple authentication system with sign-in and sign-up pages. This is a **demo implementation** using localStorage for session management.

> **Note**: For production use, replace this with a proper authentication service like NextAuth.js, Supabase Auth, Firebase Auth, or Auth0.

## Pages

### Sign In (`/signin`)
- Email and password login
- Remember me checkbox
- Forgot password link (placeholder)
- Social sign-in options (Google, GitHub)
- Link to sign-up page

### Sign Up (`/signup`)
- Full name, email, and password registration
- Password strength requirement (8+ characters)
- Terms of service agreement
- Feature highlights
- Social sign-up options (Google, GitHub)
- Link to sign-in page

## Features

### User Session Management
- **Storage**: User data stored in `localStorage`
- **Session Persistence**: Remains logged in across browser sessions
- **Sign Out**: Clears user data and redirects to sign-in

### Dashboard Integration
- Displays user's full name and email
- User profile menu with dropdown
- Sign out functionality
- Dynamic user initials in avatar

### User Profile Menu
Located in the top-right corner of the dashboard:
- **Profile Settings** (placeholder)
- **Billing** (placeholder)
- **Help & Support** (placeholder)
- **Sign Out** (functional)

## Technical Implementation

### Authentication Utilities (`lib/auth.ts`)

```typescript
// Get current logged-in user
const user = getCurrentUser();

// Check if user is authenticated
const isLoggedIn = isAuthenticated();

// Sign out user
signOut();

// Require authentication (redirect if not logged in)
requireAuth('/signin');
```

### User Data Structure
```typescript
interface User {
  fullName?: string;
  email: string;
  loggedIn: boolean;
}
```

### Demo Credentials
For demo purposes, **any email and password combination** will work:
- Email: `user@example.com`
- Password: `password123`

Social sign-in buttons also work in demo mode.

## Usage Flow

### New User Registration
1. Navigate to `/signup`
2. Enter full name, email, and password
3. Agree to terms of service
4. Click "Create account"
5. Automatically redirected to `/dashboard`

### Existing User Login
1. Navigate to `/signin`
2. Enter email and password
3. Optionally check "Remember me"
4. Click "Sign in"
5. Redirected to `/dashboard`

### Sign Out
1. Click user profile in dashboard header
2. Select "Sign Out" from dropdown menu
3. Redirected to `/signin`

## Security Considerations

### Current Implementation (Demo)
- ✅ Password visibility toggle
- ✅ Basic form validation
- ✅ Session management
- ❌ No password encryption
- ❌ No backend validation
- ❌ No rate limiting
- ❌ No email verification
- ❌ No password reset

### Production Recommendations

**Use a proper auth service:**
- **NextAuth.js**: Best for Next.js apps, supports OAuth providers
- **Supabase Auth**: Full-featured with email verification, magic links
- **Firebase Auth**: Google's authentication service
- **Auth0**: Enterprise-grade authentication

**Implement security best practices:**
- Password hashing (bcrypt, argon2)
- JWT tokens for session management
- HTTPS only
- CSRF protection
- Rate limiting on login attempts
- Email verification
- Two-factor authentication (2FA)
- Password reset flow
- Secure password requirements

## File Structure

```
app/
├── signin/
│   └── page.tsx          # Sign-in page
├── signup/
│   └── page.tsx          # Sign-up page
└── dashboard/
    └── page.tsx          # Dashboard with user menu

lib/
└── auth.ts               # Authentication utilities
```

## Styling

Both auth pages use:
- Material-UI components
- Consistent design with dashboard
- Purple accent color (#8b5cf6)
- Responsive layout
- Modern card-based UI
- Social login buttons

## Future Enhancements

Potential improvements:
- [ ] Backend API integration
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] OAuth provider integration
- [ ] User profile editing
- [ ] Account settings page
- [ ] Session timeout
- [ ] Multi-factor authentication
- [ ] Activity logs
- [ ] Account deletion

## Migration to Production Auth

When ready to implement real authentication:

1. **Choose an auth provider** (NextAuth.js recommended)
2. **Install dependencies**:
   ```bash
   npm install next-auth
   ```
3. **Replace auth utilities** in `lib/auth.ts`
4. **Update sign-in/sign-up pages** to use provider
5. **Add API routes** for authentication
6. **Implement middleware** for protected routes
7. **Add environment variables** for secrets
8. **Test thoroughly** before deployment

## Testing

### Test User Accounts
For demo purposes, use any credentials:
- Email: `test@example.com`
- Password: `test1234`

### Test Scenarios
- ✅ Sign up with new account
- ✅ Sign in with existing account
- ✅ Sign out from dashboard
- ✅ Remember me functionality
- ✅ Social sign-in buttons
- ✅ Form validation
- ✅ User profile menu
- ✅ User initials display

## Support

For authentication issues:
1. Clear browser localStorage
2. Check browser console for errors
3. Ensure JavaScript is enabled
4. Try incognito/private mode
