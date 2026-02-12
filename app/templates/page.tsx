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
          {filteredTemplates.map((template) => (
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

                  {/* Tags */}
                  <Box sx={{ display: 'flex', gap: 0.75, mt: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label="Portfolio"
                      size="small"
                      sx={{
                        bgcolor: '#f5f5f5',
                        color: '#525252',
                        fontWeight: 500,
                        fontSize: 11,
                        height: 22,
                      }}
                    />
                    <Chip
                      label="Creative"
                      size="small"
                      sx={{
                        bgcolor: '#f5f5f5',
                        color: '#525252',
                        fontWeight: 500,
                        fontSize: 11,
                        height: 22,
                      }}
                    />
                  </Box>
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
          ))}
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
