'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CollectionsIcon from '@mui/icons-material/Collections';
import ImageLibrary from '@/components/image-library/image-library';
import { getCurrentUser } from '@/lib/services/auth-service';

export default function ImageLibraryPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/signin');
        return;
      }
      setIsCheckingAuth(false);
    };

    void checkAuth();
  }, [router]);

  if (isCheckingAuth) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', display: 'grid', placeItems: 'center' }}>
        <CircularProgress sx={{ color: '#38bdf8' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a' }}>
      <Box sx={{ py: 2.5, px: { xs: 2, md: 4 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', bgcolor: '#111827' }}>
        <Button
          startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
          onClick={() => router.push('/templates')}
          sx={{ color: '#cbd5e1', textTransform: 'none', fontWeight: 500, fontSize: 14, '&:hover': { bgcolor: 'transparent', color: '#fff' } }}
        >
          Back to Templates
        </Button>
        <Typography sx={{ color: '#cbd5e1', fontWeight: 600, fontSize: 14 }}>Squpage</Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box sx={{ width: 58, height: 58, borderRadius: 3, display: 'grid', placeItems: 'center', mx: 'auto', mb: 2, bgcolor: 'rgba(56, 189, 248, 0.14)', border: '1px solid rgba(56, 189, 248, 0.22)' }}>
            <CollectionsIcon sx={{ color: '#38bdf8', fontSize: 30 }} />
          </Box>
          <Typography variant="h3" sx={{ color: '#f8fafc', fontWeight: 800, fontSize: { xs: 32, md: 42 }, letterSpacing: '-0.03em' }}>
            Image Library
          </Typography>
          <Typography sx={{ color: '#94a3b8', mt: 1.25, maxWidth: 600, mx: 'auto', lineHeight: 1.65 }}>
            Keep your saved images in one place and reuse them across every Custom HTML project.
          </Typography>
        </Box>

        <ImageLibrary />
      </Container>
    </Box>
  );
}
