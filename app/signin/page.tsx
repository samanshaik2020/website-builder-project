'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signInWithGoogle } from '@/lib/services/auth-service';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Language as LanguageIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
        // Redirect will be handled by Supabase
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Side - Features */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#ffffff',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          px: 8,
          py: 6,
        }}
      >
        {/* Back to Home */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/')}
          sx={{
            position: 'absolute',
            top: 32,
            left: 32,
            textTransform: 'none',
            color: '#6b7280',
            fontWeight: 500,
            '&:hover': { bgcolor: 'transparent', color: '#111827' },
          }}
        >
          Back to Home
        </Button>

        <Box sx={{ maxWidth: 480 }}>
          <Typography sx={{ fontSize: 42, fontWeight: 700, color: '#111827', mb: 2, lineHeight: 1.2 }}>
            Join the Future of{' '}
            <span style={{ color: '#6366f1' }}>Web Creation</span>
          </Typography>
          <Typography sx={{ fontSize: 16, color: '#6b7280', mb: 5, lineHeight: 1.6 }}>
            Create professional websites in minutes with the power of AI
          </Typography>

          {/* Features List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {[
              'Generate content with advanced AI',
              'Choose from premium design templates',
              'No coding skills required',
              'Deploy instantly to global CDN',
              '24/7 customer support',
            ].map((feature, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 18, color: 'white' }} />
                </Box>
                <Typography sx={{ fontSize: 15, color: '#374151', fontWeight: 500 }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Side - Sign In Form */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.85 },
          bgcolor: '#fafbfc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
          py: 6,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 440 }}>
          {/* Logo and Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LanguageIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>
                Squpage
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 26, fontWeight: 700, color: '#111827', mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#6b7280' }}>
              Sign in to continue building amazing websites
            </Typography>
          </Box>

          {/* Sign In Card */}
          <Box sx={{ bgcolor: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', p: 4, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSignIn}>
            {/* Email */}
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151', mb: 1 }}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    bgcolor: '#f9fafb',
                    '& fieldset': { borderColor: '#e5e7eb' },
                    '&:hover fieldset': { borderColor: '#d1d5db' },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
                  },
                }}
              />
            </Box>

            {/* Password */}
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151', mb: 1 }}>
                Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#6b7280' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    bgcolor: '#f9fafb',
                    '& fieldset': { borderColor: '#e5e7eb' },
                    '&:hover fieldset': { borderColor: '#d1d5db' },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
                  },
                }}
              />
            </Box>

            {/* Remember Me & Forgot Password */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: '#d1d5db',
                      '&.Mui-checked': { color: '#6366f1' },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13, color: '#6b7280' }}>
                    Remember me
                  </Typography>
                }
              />
              <Button
                sx={{
                  textTransform: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#6366f1',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Button>
            </Box>

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                textTransform: 'none',
                bgcolor: '#6366f1',
                color: 'white',
                fontWeight: 600,
                py: 1.5,
                borderRadius: '10px',
                fontSize: 15,
                boxShadow: 'none',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                },
              }}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#e5e7eb' }} />
            <Typography sx={{ px: 2, fontSize: 13, color: '#9ca3af' }}>
              Or continue with
            </Typography>
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#e5e7eb' }} />
          </Box>

          {/* Social Sign In */}
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleSocialSignIn('google')}
            sx={{
              textTransform: 'none',
              borderColor: '#e5e7eb',
              color: '#374151',
              fontWeight: 500,
              py: 1.25,
              borderRadius: '10px',
              '&:hover': { borderColor: '#d1d5db', bgcolor: '#f9fafb' },
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: 8 }}>
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"/>
            </svg>
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography sx={{ fontSize: 14, color: '#6b7280' }}>
              Don't have an account?{' '}
              <Button
                onClick={() => router.push('/signup')}
                sx={{
                  textTransform: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#6366f1',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                }}
              >
                Sign up here
              </Button>
            </Typography>
          </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
