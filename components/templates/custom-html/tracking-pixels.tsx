'use client';

import { Box, Typography, TextField, Button, Paper } from '@mui/material';

interface TrackingPixelsProps {
  facebookPixelId: string;
  googleTagId: string;
  onFacebookPixelChange: (id: string) => void;
  onGoogleTagChange: (id: string) => void;
  onInjectPixels: () => void;
}

export default function TrackingPixels({
  facebookPixelId,
  googleTagId,
  onFacebookPixelChange,
  onGoogleTagChange,
  onInjectPixels,
}: TrackingPixelsProps) {
  const bothEmpty = !facebookPixelId.trim() && !googleTagId.trim();

  const facebookPreview = `<!-- Facebook Pixel Code -->\n<script>!function(f,b,e,v,n,t,s){...}('${facebookPixelId}');</script>\n<noscript><img ...></noscript>`;

  const googlePreview = `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagId}"></script>\n<script>window.dataLayer=[];function gtag(){...}gtag('config','${googleTagId}');</script>`;

  return (
    <Box
      sx={{
        backgroundColor: '#0f172a',
        borderRadius: 3,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20V10" />
            <path d="M18 20V4" />
            <path d="M6 20v-4" />
          </svg>
        </Box>
        <Box>
          <Typography
            sx={{
              color: '#f8fafc',
              fontWeight: 700,
              fontSize: 20,
              lineHeight: 1.3,
            }}
          >
            Tracking Pixels
          </Typography>
          <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>
            Add Facebook Pixel and Google Analytics to your pages
          </Typography>
        </Box>
      </Box>

      {/* Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Facebook Pixel Card */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 2.5,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#3b82f6"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Box>
            <Box>
              <Typography
                sx={{ color: '#f8fafc', fontWeight: 600, fontSize: 15 }}
              >
                Facebook Pixel
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: 12 }}>
                Track conversions and build audiences
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            size="small"
            placeholder="e.g. 123456789012345"
            value={facebookPixelId}
            onChange={(e) => onFacebookPixelChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                fontSize: 14,
                borderRadius: 1.5,
                '& fieldset': {
                  borderColor: '#334155',
                },
                '&:hover fieldset': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#64748b',
                opacity: 1,
              },
            }}
          />

          {facebookPixelId.trim() && (
            <Box
              sx={{
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 1.5,
                p: 1.5,
                fontFamily: '"Fira Code", "Cascadia Code", monospace',
                fontSize: 11,
                color: '#94a3b8',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                lineHeight: 1.6,
              }}
            >
              {facebookPreview}
            </Box>
          )}
        </Paper>

        {/* Google Analytics Card */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 2.5,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
              </svg>
            </Box>
            <Box>
              <Typography
                sx={{ color: '#f8fafc', fontWeight: 600, fontSize: 15 }}
              >
                Google Analytics (GA4)
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: 12 }}>
                Measure traffic and engagement
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            size="small"
            placeholder="e.g. G-XXXXXXXXXX"
            value={googleTagId}
            onChange={(e) => onGoogleTagChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                fontSize: 14,
                borderRadius: 1.5,
                '& fieldset': {
                  borderColor: '#334155',
                },
                '&:hover fieldset': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#64748b',
                opacity: 1,
              },
            }}
          />

          {googleTagId.trim() && (
            <Box
              sx={{
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 1.5,
                p: 1.5,
                fontFamily: '"Fira Code", "Cascadia Code", monospace',
                fontSize: 11,
                color: '#94a3b8',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                lineHeight: 1.6,
              }}
            >
              {googlePreview}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Inject Button */}
      <Button
        variant="contained"
        size="large"
        disabled={bothEmpty}
        onClick={onInjectPixels}
        sx={{
          background: bothEmpty
            ? '#334155'
            : 'linear-gradient(135deg, #3b82f6, #6366f1)',
          color: bothEmpty ? '#64748b' : '#fff',
          fontWeight: 600,
          fontSize: 15,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          boxShadow: bothEmpty
            ? 'none'
            : '0 4px 14px rgba(59, 130, 246, 0.35)',
          '&:hover': {
            background: bothEmpty
              ? '#334155'
              : 'linear-gradient(135deg, #2563eb, #4f46e5)',
            boxShadow: bothEmpty
              ? 'none'
              : '0 6px 20px rgba(59, 130, 246, 0.45)',
          },
          '&.Mui-disabled': {
            background: '#334155',
            color: '#64748b',
          },
        }}
      >
        Inject Tracking Scripts into HTML
      </Button>

      {/* Info Box */}
      <Box
        sx={{
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: 2,
          px: 2.5,
          py: 2,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
        }}
      >
        <Box
          component="span"
          sx={{
            color: '#3b82f6',
            fontSize: 18,
            lineHeight: 1,
            mt: '1px',
            flexShrink: 0,
          }}
        >
          ℹ
        </Box>
        <Typography sx={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
          Scripts are automatically injected into the{' '}
          <Box
            component="code"
            sx={{
              backgroundColor: '#334155',
              color: '#e2e8f0',
              px: 0.8,
              py: 0.2,
              borderRadius: 0.5,
              fontSize: 12,
              fontFamily: 'monospace',
            }}
          >
            {'<head>'}
          </Box>{' '}
          of your HTML. Re-inject after uploading new HTML files.
        </Typography>
      </Box>
    </Box>
  );
}
