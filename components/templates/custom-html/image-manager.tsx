'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import { createClient } from '@/lib/supabase/client';

export interface ImageEntry {
  id: string;
  name: string;
  url: string;
  altText: string;
  width: string;
  height: string;
  alignment: 'left' | 'center' | 'right';
  uploadedAt: string;
}

export const defaultImageLibrary = [] as ImageEntry[];

interface ImageManagerProps {
  imageLibrary: ImageEntry[];
  onLibraryChange: (library: ImageEntry[]) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function generateImgTag(entry: {
  url: string;
  altText?: string;
  width?: string;
  height?: string;
  alignment?: 'left' | 'center' | 'right';
}): string {
  const { url, altText = '', width, height, alignment = 'center' } = entry;
  let style = 'display:block;';
  if (alignment === 'center') style += 'margin-left:auto;margin-right:auto;';
  if (alignment === 'right') style += 'margin-left:auto;';

  const wAttr = width && width !== 'auto' ? ` width="${width}"` : '';
  const hAttr = height && height !== 'auto' ? ` height="${height}"` : '';

  return `<img src="${url}" alt="${altText}"${wAttr}${hAttr} style="${style}">`;
}

export default function ImageManager({
  imageLibrary,
  onLibraryChange,
}: ImageManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [externalUrl, setExternalUrl] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleFileUpload = async (files: FileList | File[]) => {
    setUploading(true);
    setUploadError('');
    try {
      const supabase = createClient();
      const newEntries: ImageEntry[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;
        // Generate a unique file path to avoid collisions
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error } = await supabase.storage
          .from('project-images')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (error) {
          console.error('Upload error:', error);
          setUploadError(`Failed to upload ${file.name}: ${error.message}`);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(filePath);

        newEntries.push({
          id: generateId(),
          name: file.name,
          url: urlData.publicUrl,
          altText: file.name.replace(/\.[^/.]+$/, ''),
          width: 'auto',
          height: 'auto',
          alignment: 'center',
          uploadedAt: new Date().toISOString(),
        });
      }
      if (newEntries.length > 0) {
        onLibraryChange([...newEntries, ...imageLibrary]);
      }
    } catch {
      setUploadError('One or more uploads failed. Please try again or use an external URL.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const imageFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      if (imageFiles.length > 0) {
        handleFileUpload(imageFiles);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddFromUrl = () => {
    if (!externalUrl.trim()) return;
    const urlParts = externalUrl.trim().split('/');
    const fileName = urlParts[urlParts.length - 1] || 'external-image';
    
    const newEntry: ImageEntry = {
      id: generateId(),
      name: fileName,
      url: externalUrl.trim(),
      altText: fileName.replace(/\.[^/.]+$/, ''),
      width: 'auto',
      height: 'auto',
      alignment: 'center',
      uploadedAt: new Date().toISOString(),
    };
    onLibraryChange([newEntry, ...imageLibrary]);
    setExternalUrl('');
  };

  const handleDeleteEntry = (id: string) => {
    onLibraryChange(imageLibrary.filter((entry) => entry.id !== id));
  };

  const colors = {
    bg: '#0f172a',
    card: '#1e293b',
    border: '#334155',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#f59e0b',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <ImageIcon sx={{ color: colors.accent, fontSize: 28 }} />
        <Box>
          <Typography
            variant="h6"
            sx={{ color: colors.text, fontWeight: 700, lineHeight: 1.2 }}
          >
            Image Manager
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textMuted }}>
            Upload multiple images, get public URLs, and manage your library
          </Typography>
        </Box>
      </Box>

      {/* Upload Card */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: colors.text, fontWeight: 600, mb: 2 }}
        >
          Upload Images
        </Typography>

        {/* File Upload Zone */}
        <Box
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: `2px dashed ${isDragging ? colors.accent : colors.border}`,
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease',
            '&:hover': {
              borderColor: colors.accent,
            },
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <CircularProgress size={40} sx={{ color: colors.accent }} />
          ) : (
            <>
              <CloudUploadIcon
                sx={{ fontSize: 48, color: colors.textMuted, mb: 1 }}
              />
              <Typography variant="body1" sx={{ color: colors.textMuted }}>
                Drag &amp; drop multiple images here, or click to browse
              </Typography>
            </>
          )}
        </Box>

        {uploadError && (
          <Typography
            variant="body2"
            sx={{ color: '#ef4444', mt: 1.5 }}
          >
            {uploadError}
          </Typography>
        )}

        {/* External URL */}
        <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5, alignItems: 'center' }}>
          <LinkIcon sx={{ color: colors.textMuted }} />
          <TextField
            fullWidth
            size="small"
            placeholder="Paste an image URL..."
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddFromUrl();
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: colors.text,
                bgcolor: colors.bg,
                '& fieldset': { borderColor: colors.border },
                '&:hover fieldset': { borderColor: colors.textMuted },
                '&.Mui-focused fieldset': { borderColor: colors.accent },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddFromUrl}
            disabled={!externalUrl.trim()}
            sx={{
              bgcolor: colors.accent,
              color: '#000',
              fontWeight: 600,
              textTransform: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: '#d97706' },
              '&.Mui-disabled': {
                bgcolor: colors.border,
                color: colors.textMuted,
              },
            }}
          >
            Add from URL
          </Button>
        </Box>
      </Paper>

      {/* Image Library Card */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: colors.text, fontWeight: 600 }}
            >
              Image Library
            </Typography>
            <Box
              sx={{
                bgcolor: colors.bg,
                color: colors.text,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                fontSize: '0.75rem',
                fontWeight: 700,
                border: `1px solid ${colors.border}`,
              }}
            >
              {imageLibrary.length}
            </Box>
          </Box>
        </Box>

        {imageLibrary.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              bgcolor: colors.bg,
              borderRadius: 2,
              border: `1px dashed ${colors.border}`,
            }}
          >
            <ImageIcon sx={{ fontSize: 48, color: colors.textMuted, mb: 2 }} />
            <Typography variant="body1" sx={{ color: colors.textMuted }}>
              No images yet. Upload your first image above.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 2.5,
            }}
          >
            {imageLibrary.map((entry) => {
              const currentImgTag = generateImgTag(entry);
              return (
                <Box
                  key={entry.id}
                  sx={{
                    bgcolor: colors.bg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: colors.textMuted },
                  }}
                >
                  {/* Thumbnail */}
                  <Box
                    sx={{
                      height: 140,
                      width: '100%',
                      bgcolor: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <Box
                      component="img"
                      src={entry.url}
                      alt={entry.altText || entry.name}
                      sx={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>

                  {/* Details */}
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="body2"
                      title={entry.name}
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        mb: 0.5,
                      }}
                    >
                      {entry.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: colors.textMuted, display: 'block', mb: 0.5 }}
                    >
                      {new Date(entry.uploadedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: colors.textMuted,
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.7rem',
                      }}
                    >
                      {entry.url}
                    </Typography>

                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 0.5,
                        mt: 1.5,
                      }}
                    >
                      <Tooltip
                        title={
                          copiedId === `url-${entry.id}` ? 'Copied!' : 'Copy URL'
                        }
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            copyToClipboard(entry.url, `url-${entry.id}`)
                          }
                          sx={{
                            color:
                              copiedId === `url-${entry.id}`
                                ? '#22c55e'
                                : colors.textMuted,
                            '&:hover': { color: colors.accent },
                          }}
                        >
                          {copiedId === `url-${entry.id}` ? (
                            <CheckCircleIcon fontSize="small" />
                          ) : (
                            <LinkIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title={
                          copiedId === `tag-${entry.id}` ? 'Copied!' : 'Copy HTML Tag'
                        }
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            copyToClipboard(currentImgTag, `tag-${entry.id}`)
                          }
                          sx={{
                            color:
                              copiedId === `tag-${entry.id}`
                                ? '#22c55e'
                                : colors.textMuted,
                            '&:hover': { color: colors.accent },
                          }}
                        >
                          {copiedId === `tag-${entry.id}` ? (
                            <CheckCircleIcon fontSize="small" />
                          ) : (
                            <ContentCopyIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Image">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteEntry(entry.id)}
                          sx={{
                            color: colors.textMuted,
                            '&:hover': { color: '#ef4444' },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Paper>
      
      {/* Info Note */}
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          p: 2,
          bgcolor: 'rgba(34, 197, 94, 0.08)',
          borderLeft: `4px solid #22c55e`,
          borderRadius: 1,
        }}
      >
        <CheckIcon
          sx={{ color: '#22c55e', fontSize: 20, flexShrink: 0, mt: 0.2 }}
        />
        <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
          <strong style={{ color: '#22c55e' }}>Supabase Storage:</strong> Images
          are permanently hosted on your Supabase cloud bucket. URLs will never
          expire and are ready to use in your landing pages.
        </Typography>
      </Box>
    </Box>
  );
}
