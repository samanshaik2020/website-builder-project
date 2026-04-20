'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Email as EmailIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { getProjectLeads, exportLeadsToCsv, deleteLead, type Lead } from '@/lib/services/lead-service';

interface LeadsDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  totalViews: number;
}

export default function LeadsDialog({
  open,
  onClose,
  projectId,
  projectName,
  totalViews,
}: LeadsDialogProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (open && projectId) {
      loadLeads();
    }
  }, [open, projectId]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await getProjectLeads(projectId);
      setLeads(data);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const csv = exportLeadsToCsv(leads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${projectName.replace(/\s+/g, '-')}-leads.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteLead = async (leadId: string) => {
    setDeletingId(leadId);
    try {
      await deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    } catch (err) {
      console.error('Failed to delete lead:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyEmails = () => {
    const emails = leads.map((l) => l.email).join(', ');
    navigator.clipboard.writeText(emails);
  };

  const conversionRate = totalViews > 0 ? ((leads.length / totalViews) * 100).toFixed(1) : '0';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '16px', overflow: 'hidden' },
      }}
    >
      {/* Header with gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
          p: 3,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
              📧 Email Campaign Leads
            </Typography>
            <Typography sx={{ fontSize: 14, opacity: 0.85, mt: 0.5 }}>
              {projectName}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Stats bar */}
        <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 12, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Leads
            </Typography>
            <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
              {leads.length}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Page Views
            </Typography>
            <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
              {totalViews}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Conversion
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
                {conversionRate}%
              </Typography>
              <TrendingUpIcon sx={{ fontSize: 20, opacity: 0.8 }} />
            </Box>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {/* Action bar */}
        <Box sx={{ display: 'flex', gap: 1, p: 2, borderBottom: '1px solid #e5e7eb', bgcolor: '#f9fafb' }}>
          <Button
            size="small"
            startIcon={<DownloadIcon />}
            onClick={handleExportCsv}
            disabled={leads.length === 0}
            sx={{
              textTransform: 'none',
              fontSize: 13,
              fontWeight: 600,
              color: '#374151',
              bgcolor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              '&:hover': { bgcolor: '#f3f4f6' },
            }}
          >
            Export CSV
          </Button>
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyEmails}
            disabled={leads.length === 0}
            sx={{
              textTransform: 'none',
              fontSize: 13,
              fontWeight: 600,
              color: '#374151',
              bgcolor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              '&:hover': { bgcolor: '#f3f4f6' },
            }}
          >
            Copy All Emails
          </Button>
        </Box>

        {/* Leads list */}
        <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
              <CircularProgress size={32} sx={{ color: '#6366f1' }} />
            </Box>
          ) : leads.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6, px: 3 }}>
              <EmailIcon sx={{ fontSize: 48, color: '#d1d5db', mb: 2 }} />
              <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#6b7280' }}>
                No leads yet
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#9ca3af', mt: 0.5 }}>
                Leads will appear here once visitors submit their emails.
              </Typography>
            </Box>
          ) : (
            leads.map((lead, index) => (
              <Box
                key={lead.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                  py: 2,
                  borderBottom: index < leads.length - 1 ? '1px solid #f3f4f6' : 'none',
                  '&:hover': { bgcolor: '#f9fafb' },
                  transition: 'background-color 0.15s',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
                  {/* Avatar */}
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #e0e7ff, #ede9fe)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 18, color: '#6366f1' }} />
                  </Box>

                  {/* Email & date */}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#111827',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {lead.email}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>
                      {formatDate(lead.created_at)}
                    </Typography>
                  </Box>
                </Box>

                {/* Source badge */}
                {lead.referrer && (
                  <Chip
                    label={new URL(lead.referrer).hostname.replace('www.', '')}
                    size="small"
                    sx={{
                      fontSize: 11,
                      height: 24,
                      bgcolor: '#f3f4f6',
                      color: '#6b7280',
                      mr: 1,
                    }}
                  />
                )}

                {/* Delete */}
                <Tooltip title="Delete lead" arrow>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteLead(lead.id)}
                    disabled={deletingId === lead.id}
                    sx={{ color: '#d1d5db', '&:hover': { color: '#ef4444' } }}
                  >
                    {deletingId === lead.id ? (
                      <CircularProgress size={16} />
                    ) : (
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            ))
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e5e7eb' }}>
        <Typography sx={{ flex: 1, fontSize: 12, color: '#9ca3af' }}>
          {leads.length} lead{leads.length !== 1 ? 's' : ''} collected
        </Typography>
        <Button onClick={onClose} sx={{ textTransform: 'none', color: '#6b7280' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
