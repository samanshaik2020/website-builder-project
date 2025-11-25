'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  TouchApp as TouchAppIcon,
  TrendingUp as TrendingUpIcon,
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';
import { getAllTemplates } from '@/lib/templates';
import { exportToHTML, downloadHTML } from '@/lib/export-html';
import type { TemplateId } from '@/lib/templates';
import { getCurrentUser, signOut as authSignOut } from '@/lib/services/auth-service';
import { getUserProjects, deleteProject as deleteProjectService, updateProject, isCustomUrlAvailable } from '@/lib/services/project-service';

interface Project {
  id: string;
  name: string;
  template: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  views?: number;
  clicks?: number;
  lastViewedAt?: string;
  lastClickedAt?: string;
  customUrl?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customUrlError, setCustomUrlError] = useState('');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customUrlSaved, setCustomUrlSaved] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentDialogProject, setCurrentDialogProject] = useState<Project | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Check authentication and load data
    const initDashboard = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          router.push('/signin');
          return;
        }
        
        setCurrentUser(user);
        await loadProjects();
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        router.push('/signin');
      }
    };
    
    initDashboard();

    // Auto-refresh analytics when window gains focus (user returns from share page)
    const handleFocus = () => {
      loadProjects();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [router]);

  // Debug: Track selectedProject changes
  useEffect(() => {
    console.log('selectedProject changed to:', selectedProject);
  }, [selectedProject]);

  const loadProjects = async () => {
    try {
      const projectsData = await getUserProjects();
      
      // Transform Supabase data to match our Project interface
      const transformedProjects = projectsData.map((p: any) => ({
        id: p.id,
        name: p.name,
        template: p.template,
        data: p.data,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        views: p.analytics?.views || 0,
        clicks: p.analytics?.clicks || 0,
        lastViewedAt: p.analytics?.last_viewed_at,
        lastClickedAt: p.analytics?.last_clicked_at,
        customUrl: p.custom_url,
      }));
      
      setProjects(transformedProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  // Old localStorage-based loadProjects function has been removed
  // All project data now comes from Supabase via getUserProjects()

  const handleEdit = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      router.push(`/editor?template=${project.template}&projectId=${projectId}`);
    }
  };

  const handlePreview = (projectId: string) => {
    router.push(`/preview/${projectId}`);
  };

  const handleShare = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) {
      console.error('Project not found:', projectId);
      return;
    }
    
    const baseUrl = window.location.origin;
    const urlSlug = project.customUrl || projectId;
    const link = `${baseUrl}/share/${urlSlug}`;
    
    // Store all dialog state
    setCurrentDialogProject(project);
    setSelectedProject(projectId);
    setShareableLink(link);
    setCustomUrl(project.customUrl || '');
    setCustomUrlError('');
    setIsEditingUrl(false);
    setCustomUrlSaved(false);
    setShowShareDialog(true);
    handleMenuClose();
    
    console.log('Share dialog opened for project:', projectId);
  };

  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setShowDeleteDialog(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      try {
        await deleteProjectService(projectToDelete);
        const savedProjects = projects.filter(p => p.id !== projectToDelete);
        setProjects(savedProjects);
        setShowDeleteDialog(false);
        setProjectToDelete(null);
      } catch (error) {
        console.error('Failed to delete project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleExport = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const html = exportToHTML({
        template: project.template as TemplateId,
        data: project.data,
        projectName: project.name,
      });
      downloadHTML(html, project.name);
    }
    handleMenuClose();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
  };

  const handleCloseShareDialog = () => {
    setShowShareDialog(false);
    // Don't clear state immediately to allow any pending operations
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentDialogProject(null);
      setIsEditingUrl(false);
      setCustomUrlError('');
      setCustomUrlSaved(false);
    }, 100);
  };

  const validateCustomUrl = (url: string): boolean => {
    // Allow alphanumeric, hyphens, and underscores
    const urlRegex = /^[a-zA-Z0-9-_]+$/;
    return urlRegex.test(url);
  };

  const handleSaveCustomUrl = async () => {
    console.log('=== SAVE CUSTOM URL STARTED ===');
    console.log('Selected Project ID:', selectedProject);
    console.log('Current Dialog Project:', currentDialogProject?.id);
    console.log('Custom URL Input:', customUrl);
    
    // Use currentDialogProject as fallback if selectedProject is null
    const projectId = selectedProject || currentDialogProject?.id;
    
    if (!projectId) {
      console.error('No project selected - this should not happen!');
      return;
    }

    const trimmedUrl = customUrl.trim();
    console.log('Trimmed URL:', trimmedUrl);

    // Validate custom URL (only if not empty)
    if (trimmedUrl && !validateCustomUrl(trimmedUrl)) {
      console.log('Validation failed');
      setCustomUrlError('Only letters, numbers, hyphens, and underscores are allowed');
      return;
    }

    // Check if custom URL is already taken by another project (only if not empty)
    if (trimmedUrl) {
      try {
        const available = await isCustomUrlAvailable(trimmedUrl, projectId);
        if (!available) {
          console.log('URL already taken');
          setCustomUrlError('This URL is already taken by another project');
          return;
        }
      } catch (error) {
        console.error('Failed to check URL availability:', error);
        setCustomUrlError('Failed to validate URL. Please try again.');
        return;
      }
    }

    try {
      // Update project in Supabase
      const updateData: any = {};
      if (trimmedUrl) {
        updateData.customUrl = trimmedUrl;
      } else {
        updateData.customUrl = '';
      }
      await updateProject(projectId, updateData);

      // Update local state
      const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
          const updated = { ...p };
          if (trimmedUrl) {
            updated.customUrl = trimmedUrl;
          } else {
            delete updated.customUrl;
          }
          console.log('Updated project:', updated);
          return updated;
        }
        return p;
      });

      setProjects(updatedProjects);

      // Update shareable link
      const baseUrl = window.location.origin;
      const urlSlug = trimmedUrl || projectId;
      const link = `${baseUrl}/share/${urlSlug}`;
      console.log('New shareable link:', link);
      
      setShareableLink(link);
      setCustomUrl(trimmedUrl);
      setIsEditingUrl(false);
      setCustomUrlError('');
      setCustomUrlSaved(true);
      
      console.log('✓ Custom URL saved successfully:', trimmedUrl || '(removed)');
      console.log('=== SAVE COMPLETE ===');
      
      // Hide success message after 2 seconds
      setTimeout(() => setCustomUrlSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save custom URL:', error);
      setCustomUrlError('Failed to save URL. Please try again.');
    }
  };

  const handleCancelEditUrl = () => {
    const project = projects.find(p => p.id === selectedProject);
    setCustomUrl(project?.customUrl || '');
    setIsEditingUrl(false);
    setCustomUrlError('');
  };

  const getTemplateName = (templateId: string) => {
    const templates = getAllTemplates();
    const template = templates.find(t => t.id === templateId);
    return template?.name || templateId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Calculate monthly statistics
  const getMonthlyStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyProjects = projects.filter(p => {
      const createdDate = new Date(p.createdAt);
      return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
    });

    const monthlyViews = monthlyProjects.reduce((sum, p) => sum + (p.views || 0), 0);
    const monthlyClicks = monthlyProjects.reduce((sum, p) => sum + (p.clicks || 0), 0);
    const monthlyConversion = monthlyViews > 0 ? Math.round((monthlyClicks / monthlyViews) * 100) : 0;

    return {
      websitesCreated: monthlyProjects.length,
      totalVisitors: monthlyViews,
      conversionRate: monthlyConversion,
      leadsGenerated: monthlyClicks,
    };
  };

  const monthlyStats = getMonthlyStats();


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, projectId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSignOut = async () => {
    handleUserMenuClose();
    try {
      await authSignOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const getUserInitials = () => {
    if (currentUser?.fullName) {
      return currentUser.fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return currentUser?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  if (!isClient) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }} suppressHydrationWarning>
      {/* Header */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(8px)' }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.push('/')}>
              <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 700 }}>S</Typography>
              </Box>
              <Typography sx={{ ml: 1.5, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Squpage</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push('/templates')}
                sx={{ textTransform: 'none', bgcolor: '#6366f1', fontWeight: 600, fontSize: 14, px: 2, py: 1, borderRadius: '8px', boxShadow: 'none', '&:hover': { bgcolor: '#4f46e5' } }}>
                New Website
              </Button>
              <IconButton sx={{ color: '#64748b' }}><NotificationsIcon /></IconButton>
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#6366f1', fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={handleUserMenuOpen}>
                {getUserInitials()}
              </Avatar>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
        {/* Welcome Header */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography sx={{ fontSize: { xs: 28, sm: 32, lg: 36 }, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Welcome to your Dashboard!
            </Typography>
            <Typography sx={{ mt: 1, fontSize: { xs: 16, lg: 18 }, color: '#64748b' }}>
              Your launchpad for creating amazing websites.
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<LanguageIcon />} onClick={() => router.push('/templates')}
            sx={{ mt: { xs: 2, sm: 0 }, textTransform: 'none', borderColor: '#e2e8f0', color: '#475569', fontWeight: 500, fontSize: 14, px: 2, py: 1, borderRadius: '8px', bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' } }}>
            Explore Templates
          </Button>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 6 }}>
          {/* Websites */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LanguageIcon sx={{ color: '#6366f1', fontSize: 24 }} />
              </Box>
              <TrendingUpIcon sx={{ color: '#22c55e', fontSize: 20 }} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WEBSITES</Typography>
              <Typography sx={{ fontSize: 30, fontWeight: 700, color: '#0f172a', mt: 0.5 }}>{projects.length}</Typography>
            </Box>
          </Card>

          {/* Total Views */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RemoveRedEyeIcon sx={{ color: '#10b981', fontSize: 24 }} />
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#22c55e' }}>+{monthlyStats.totalVisitors}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOTAL VIEWS</Typography>
              <Typography sx={{ fontSize: 30, fontWeight: 700, color: '#0f172a', mt: 0.5 }}>{projects.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString()}</Typography>
            </Box>
          </Card>

          {/* Total Clicks */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TouchAppIcon sx={{ color: '#ec4899', fontSize: 24 }} />
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#ef4444' }}>+{monthlyStats.leadsGenerated}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOTAL CLICKS</Typography>
              <Typography sx={{ fontSize: 30, fontWeight: 700, color: '#0f172a', mt: 0.5 }}>{projects.reduce((sum, p) => sum + (p.clicks || 0), 0).toLocaleString()}</Typography>
            </Box>
          </Card>

          {/* Conversion */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUpIcon sx={{ color: '#f97316', fontSize: 24 }} />
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#f97316' }}>{monthlyStats.conversionRate}%</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CONVERSION</Typography>
              <Typography sx={{ fontSize: 30, fontWeight: 700, color: '#0f172a', mt: 0.5 }}>{projects.length > 0 ? Math.round((projects.reduce((sum, p) => sum + (p.clicks || 0), 0) / Math.max(projects.reduce((sum, p) => sum + (p.views || 0), 0), 1)) * 100) : 0}%</Typography>
            </Box>
          </Card>
        </Box>

        {/* Empty State - Beautiful Gradient CTA */}
        {projects.length === 0 ? (
          <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 450px)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.9 }} />
            <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 4, sm: 6, md: 8, lg: 12 }, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'inherit' }}>
              <Typography sx={{ fontSize: { xs: 28, sm: 36, lg: 48 }, fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                Let's Build Something Amazing!
              </Typography>
              <Typography sx={{ mt: 3, maxWidth: 600, fontSize: { xs: 16, sm: 18, lg: 20 }, color: 'white', opacity: 0.9, fontWeight: 300, lineHeight: 1.6, textShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                Ready to bring your ideas to life? Create your first website project in minutes, no coding required.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => router.push('/templates')}
                sx={{
                  mt: 5,
                  bgcolor: 'white',
                  color: '#6366f1',
                  fontWeight: 700,
                  fontSize: 18,
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#f8fafc', transform: 'scale(1.05)', boxShadow: '0 15px 50px rgba(0,0,0,0.25)' },
                  transition: 'all 0.3s ease',
                }}
              >
                Launch Your First Project!
              </Button>
              <Typography sx={{ mt: 4, fontSize: 14, color: 'white', opacity: 0.8 }}>
                It's fast, intuitive, and fun.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box>
            {projects.map((project) => (
              <Card
                key={project.id}
                elevation={0}
                sx={{
                  mb: 2,
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  bgcolor: 'white',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    borderColor: '#d1d5db',
                  },
                }}
              >
                <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                  {/* Large Project Icon */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
                    }}
                  >
                    <LanguageIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />
                  </Box>

                  {/* Project Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#111827', mb: 1, lineHeight: 1.2 }}>
                      {project.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: '#6b7280', mb: 1.5 }}>
                      {getTemplateName(project.template)} - Modern Dark
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{ fontSize: 13, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarIcon sx={{ fontSize: 14 }} />
                        {formatDate(project.updatedAt)}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {project.views || 0}
                        <RemoveRedEyeIcon sx={{ fontSize: 14, ml: 0.5 }} />
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {project.clicks || 0}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Buttons - Clean Circle Buttons */}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconButton 
                      onClick={() => handleEdit(project.id)}
                      sx={{ 
                        width: 44, 
                        height: 44,
                        bgcolor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        '&:hover': { bgcolor: '#f3f4f6', borderColor: '#d1d5db' },
                        transition: 'all 0.2s',
                      }}
                      title="Edit"
                    >
                      <EditIcon sx={{ fontSize: 20, color: '#6b7280' }} />
                    </IconButton>
                    <IconButton 
                      onClick={() => handlePreview(project.id)}
                      sx={{ 
                        width: 44, 
                        height: 44,
                        bgcolor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        '&:hover': { bgcolor: '#f3f4f6', borderColor: '#d1d5db' },
                        transition: 'all 0.2s',
                      }}
                      title="Preview"
                    >
                      <VisibilityIcon sx={{ fontSize: 20, color: '#6b7280' }} />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleShare(project.id)}
                      sx={{ 
                        width: 44, 
                        height: 44,
                        bgcolor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        '&:hover': { bgcolor: '#f3f4f6', borderColor: '#d1d5db' },
                        transition: 'all 0.2s',
                      }}
                      title="Share"
                    >
                      <ShareIcon sx={{ fontSize: 20, color: '#6b7280' }} />
                    </IconButton>
                    <IconButton 
                      onClick={(e) => handleMenuOpen(e, project.id)}
                      sx={{ 
                        width: 44, 
                        height: 44,
                        bgcolor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        '&:hover': { bgcolor: '#f3f4f6', borderColor: '#d1d5db' },
                        transition: 'all 0.2s',
                      }}
                      title="More"
                    >
                      <MoreVertIcon sx={{ fontSize: 20, color: '#6b7280' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 180 },
        }}
      >
        <MenuItem onClick={() => selectedProject && handleShare(selectedProject)}>
          <ShareIcon sx={{ mr: 2, fontSize: 20 }} />
          Share
        </MenuItem>
        <MenuItem onClick={() => selectedProject && handleExport(selectedProject)}>
          <DownloadIcon sx={{ mr: 2, fontSize: 20 }} />
          Export HTML
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => selectedProject && handleDeleteClick(selectedProject)}
          sx={{ color: '#ef4444' }}
        >
          <DeleteIcon sx={{ mr: 2, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Project?</DialogTitle>
        <DialogContent>
          <Typography>
            This action cannot be undone. The project will be permanently deleted.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setShowDeleteDialog(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog */}
      <Dialog
        open={showShareDialog}
        onClose={handleCloseShareDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Share Your Project</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 3, color: '#666', fontSize: 14 }}>
            Anyone with this link can view your project
          </Typography>

          {/* Custom URL Section */}
          <Box sx={{ mb: 3, p: 2.5, bgcolor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                Custom URL
              </Typography>
              {!isEditingUrl && (
                <Button
                  size="small"
                  onClick={() => setIsEditingUrl(true)}
                  sx={{
                    textTransform: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#8b5cf6',
                    minWidth: 'auto',
                    px: 1.5,
                    py: 0.5,
                    '&:hover': { bgcolor: '#f3e8ff' },
                  }}
                >
                  {customUrl ? 'Edit' : 'Add Custom URL'}
                </Button>
              )}
            </Box>

            {isEditingUrl ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  <Typography sx={{ fontSize: 13, color: '#6b7280', pt: 1.5 }}>
                    {window.location.origin}/share/
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      setCustomUrlError('');
                    }}
                    placeholder="my-awesome-website"
                    error={!!customUrlError}
                    helperText={customUrlError || 'Use letters, numbers, hyphens, and underscores'}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'white',
                        fontSize: 13,
                        fontFamily: 'monospace',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    size="small"
                    onClick={handleSaveCustomUrl}
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      fontSize: 12,
                      fontWeight: 600,
                      bgcolor: '#8b5cf6',
                      '&:hover': { bgcolor: '#7c3aed' },
                      boxShadow: 'none',
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={handleCancelEditUrl}
                    sx={{
                      textTransform: 'none',
                      fontSize: 12,
                      color: '#6b7280',
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: 13, color: '#6b7280' }}>
                    {window.location.origin}/share/
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#111827', fontWeight: 600, fontFamily: 'monospace' }}>
                    {customUrl || selectedProject?.substring(0, 8) + '...'}
                  </Typography>
                </Box>
                {customUrlSaved && (
                  <Typography sx={{ fontSize: 12, color: '#10b981', fontWeight: 600, mt: 1 }}>
                    ✓ Custom URL saved successfully!
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          {/* Shareable Link */}
          <Typography sx={{ mb: 1, fontSize: 13, fontWeight: 600, color: '#374151' }}>
            Shareable Link
          </Typography>
          <TextField
            fullWidth
            value={shareableLink}
            InputProps={{
              readOnly: true,
              sx: { 
                bgcolor: '#f9fafb', 
                fontFamily: 'monospace', 
                fontSize: 13,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e5e7eb',
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={copyToClipboard}
                    sx={{ color: '#6b7280' }}
                  >
                    <ContentCopyIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseShareDialog} sx={{ textTransform: 'none', color: '#6b7280' }}>
            Close
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{
              bgcolor: '#8b5cf6',
              '&:hover': { bgcolor: '#7c3aed' },
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
            }}
          >
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Profile Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 220, mt: 1, borderRadius: '12px' },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e5e7eb' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>
            {currentUser?.fullName || 'User'}
          </Typography>
          <Typography sx={{ fontSize: 12, color: '#6b7280' }}>
            {currentUser?.email || 'user@example.com'}
          </Typography>
        </Box>
        <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5 }}>
          <SettingsIcon sx={{ mr: 2, fontSize: 20, color: '#6b7280' }} />
          <Typography sx={{ fontSize: 14 }}>Profile Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5 }}>
          <CreditCardIcon sx={{ mr: 2, fontSize: 20, color: '#6b7280' }} />
          <Typography sx={{ fontSize: 14 }}>Billing</Typography>
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5 }}>
          <HelpIcon sx={{ mr: 2, fontSize: 20, color: '#6b7280' }} />
          <Typography sx={{ fontSize: 14 }}>Help & Support</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut} sx={{ py: 1.5, color: '#ef4444' }}>
          <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
