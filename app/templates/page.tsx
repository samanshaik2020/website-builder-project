'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { getAllTemplates } from '@/lib/templates';
import { getCurrentUser } from '@/lib/auth';

export default function TemplatesPage() {
  const router = useRouter();
  const templates = getAllTemplates();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/signin');
        return;
      }
    };
    checkAuth();
  }, [router]);

  const handleSelectTemplate = (templateId: string) => {
    router.push(`/editor?template=${templateId}`);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'free', label: 'Free' },
    { id: 'pro', label: 'Pro' },
    { id: 'finance', label: 'Finance' },
    { id: 'product', label: 'Product' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'advanced', label: 'Advanced' },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template.category.toLowerCase() === selectedCategory;
    return matchesCategory;
  });

  const getTemplatePreviewImage = (templateId: string) => {
    switch (templateId) {
      case 'portfolio':
        return '/portflio.png';
      case 'portfolio-modern-dark':
        return '/Portfolio - Modern Dark.png';
      case 'saas-landing':
        return '/SaaS.png';
      case 'saas-vibrant-gradient':
        return '/SaaS - Vibrant Gradient.png';
      case 'agency':
        return '/Agency.png';
      case 'ai-photo-studio':
        return '/AI photo studio.png';
      case 'cat-food':
        return '/Cat Food Product.png';
      case 'grocery-delivery':
        return '/Grocery Delivery.png';
      case 'loan-landing':
        return '/Loan Landing.png';
      case 'samsung-product':
        return '/Samsung Product Page.png';
      case 'furniture-store':
        return '/Furniture Store.png';
      case 'meditation-app':
        return '/Meditation App.png';
      case 'phone-fun':
        return '/Phone Fun.png';
      case 'creative-community':
        return '/Creative Community Hub.png';
      case 'general-content':
        return '/General Content Page.png';
      case 'squpage-promo':
        return '/Squpage Promotion.png';
      case 'legal-center':
        return '/Legal Center.png';
      case 'flash-sale':
        return '/Flash sale landing.png';
      case 'mega-discount':
        return '/Mega Discount Sale.png';
      case 'festival-sale':
        return '/Festival Sale Poster.png';
      case 'mobile-shop':
        return '/Mobile Shop.png';
      case 'gadget-deals':
        return '/Gadget Deals.png';
      case 'galaxy-phone':
        return '/Galaxy Phone Product.png';
      case 'glassmorphism-product':
        return '/Glassmorphism Product.png';
      case 'photofolio':
        return '/PhotoFolio.png';
      case 'quiz-new':
        return '/quiz-new.png';
      case 'energy-revolution':
        return '/Energy Revolution.png';
      case 'super-clips-ai':
        return '/SuperClipsAI.png';
      default:
        return null;
    }
  };


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      {/* Top Bar */}
      <Box sx={{ py: 2.5, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e5e5' }}>
        <Button
          startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
          onClick={() => router.push('/dashboard')}
          sx={{
            color: '#525252',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: 14,
            '&:hover': { bgcolor: 'transparent', color: '#000' }
          }}
        >
          Back to Dashboard
        </Button>
        <Typography sx={{ color: '#525252', fontWeight: 500, fontSize: 14 }}>
          Squpage
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 1.5, fontSize: 40 }}>
            Choose Your Template
          </Typography>
          <Typography sx={{ color: '#737373', mb: 4, fontSize: 15, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
            Start with a professionally designed template and customize every element to match your vision
          </Typography>

          {/* Dashboard Button */}
          <Button
            variant="outlined"
            onClick={() => router.push('/dashboard')}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 14,
              px: 3,
              py: 1,
              borderRadius: 2,
              borderColor: '#e5e5e5',
              color: '#525252',
              mb: 5,
              '&:hover': {
                borderColor: '#d4d4d4',
                bgcolor: '#fafafa',
              },
            }}
          >
            Go to Dashboard
          </Button>

          {/* Category Pills */}
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mb: 6 }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: 14,
                  px: 3,
                  py: 0.75,
                  borderRadius: 20,
                  minWidth: 'auto',
                  bgcolor: selectedCategory === category.id ? '#000' : 'transparent',
                  color: selectedCategory === category.id ? '#fff' : '#525252',
                  border: selectedCategory === category.id ? 'none' : '1px solid #e5e5e5',
                  '&:hover': {
                    bgcolor: selectedCategory === category.id ? '#000' : '#f5f5f5',
                  },
                }}
              >
                {category.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Templates Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {filteredTemplates.map((template) => {
            const isCustomHtml = template.id === 'custom-html';

            if (isCustomHtml) {
              // ========== UNIQUE Custom HTML Card ==========
              return (
                <Box key={template.id} sx={{ gridColumn: { xs: '1', sm: '1 / -1', md: '1 / -1' } }}>
                  <Card
                    elevation={0}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      borderRadius: 3,
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 20px 60px rgba(99, 102, 241, 0.25)',
                        borderColor: 'rgba(99, 102, 241, 0.6)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {/* Left side - Visual */}
                    <Box
                      sx={{
                        width: { xs: '100%', md: '45%' },
                        minHeight: { xs: 200, md: 260 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.15) 100%)',
                      }}
                    >
                      {/* Animated code lines decoration */}
                      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.15, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 4, gap: 1.5 }}>
                        {[75, 55, 85, 40, 70, 60, 45, 80, 50, 65].map((w, i) => (
                          <Box key={i} sx={{ height: 6, bgcolor: '#818cf8', borderRadius: 3, width: `${w}%`, opacity: 0.3 + (i % 3) * 0.2 }} />
                        ))}
                      </Box>
                      {/* Center icon */}
                      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        <Box sx={{
                          width: 80, height: 80, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                          mb: 2,
                          mx: 'auto',
                        }}>
                          <Typography sx={{ fontSize: 36 }}>{'</>'}</Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: '"Fira Code", monospace', letterSpacing: 2 }}>
                          HTML • CSS • JS
                        </Typography>
                      </Box>
                    </Box>

                    {/* Right side - Info */}
                    <Box sx={{ flex: 1, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip label="⚡ Advanced" size="small" sx={{ bgcolor: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', fontWeight: 600, fontSize: 11, height: 24, border: '1px solid rgba(99, 102, 241, 0.3)' }} />
                        <Chip label="Full Control" size="small" sx={{ bgcolor: 'rgba(168, 85, 247, 0.2)', color: '#c4b5fd', fontWeight: 600, fontSize: 11, height: 24, border: '1px solid rgba(168, 85, 247, 0.3)' }} />
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 1.5, fontSize: { xs: 24, md: 28 }, lineHeight: 1.2 }}>
                        Custom HTML
                      </Typography>
                      <Typography sx={{ color: '#94a3b8', mb: 3, fontSize: 15, lineHeight: 1.7, maxWidth: 400 }}>
                        Import your own HTML file or write code from scratch. Full side-by-side editor with live preview, visual editing, and instant URL generation.
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                          variant="contained"
                          onClick={() => handleSelectTemplate('custom-html')}
                          sx={{
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            '&:hover': { background: 'linear-gradient(135deg, #4f46e5, #9333ea)', transform: 'scale(1.02)' },
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1.5,
                            px: 4,
                            borderRadius: 2,
                            fontSize: 15,
                            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Start Building →
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              );
            }

            // ========== Standard Template Card ==========
            return (
              <Box key={template.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    border: '1px solid #e5e5e5',
                    transition: 'all 0.2s',
                    bgcolor: '#fff',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      borderColor: '#d4d4d4',
                    },
                  }}
                >
                  {/* Template Preview */}
                  <Box
                    sx={{
                      height: 240,
                      bgcolor: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {getTemplatePreviewImage(template.id) ? (
                      <img
                        src={getTemplatePreviewImage(template.id)!}
                        alt={template.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Typography sx={{ fontSize: 64, opacity: 0.3 }}>📄</Typography>
                    )}
                    <Chip
                      label={template.category}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: '#fff',
                        fontWeight: 500,
                        fontSize: 11,
                        height: 24,
                        border: '1px solid #e5e5e5',
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#000', fontSize: 18 }}>
                      {template.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#737373', lineHeight: 1.5, fontSize: 14 }}>
                      {template.description}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleSelectTemplate(template.id)}
                      sx={{
                        bgcolor: '#000',
                        '&:hover': { bgcolor: '#262626' },
                        textTransform: 'none',
                        fontWeight: 500,
                        py: 1.25,
                        borderRadius: 1.5,
                        fontSize: 14,
                        boxShadow: 'none',
                      }}
                    >
                      Start Editing
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          })}
        </Box>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ color: '#999', mb: 2 }}>
              No templates found
            </Typography>
            <Typography variant="body1" sx={{ color: '#999' }}>
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
