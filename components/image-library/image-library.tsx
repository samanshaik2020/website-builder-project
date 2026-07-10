'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import RefreshIcon from '@mui/icons-material/Refresh';
import { createClient } from '@/lib/supabase/client';

interface ImageEntry {
  id: string;
  name: string;
  url: string;
  altText: string;
  storagePath: string | null;
  createdAt: string;
}

type Feedback = {
  severity: 'success' | 'error' | 'warning';
  message: string;
} | null;

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const colors = {
  bg: '#0f172a',
  card: '#1e293b',
  border: '#334155',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  accent: '#38bdf8',
};

function escapeHtmlAttribute(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character] ?? character;
  });
}

function generateImgTag(entry: Pick<ImageEntry, 'url' | 'altText'>): string {
  return `<img src="${escapeHtmlAttribute(entry.url)}" alt="${escapeHtmlAttribute(entry.altText)}" style="display:block;max-width:100%;height:auto;">`;
}

function getImageName(url: string): string {
  try {
    const path = new URL(url).pathname;
    const segment = path.split('/').filter(Boolean).pop();
    return segment ? decodeURIComponent(segment) : 'external-image';
  } catch {
    return 'external-image';
  }
}

function isSupportedImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

async function writeToClipboard(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement('textarea');
  input.value = value;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(input);

  if (!copied) {
    throw new Error('Clipboard access was unavailable.');
  }
}

export default function ImageLibrary() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [externalUrl, setExternalUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    setFeedback(null);

    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setFeedback({ severity: 'error', message: 'Your session has expired. Please sign in again.' });
        return;
      }

      const { data, error } = await supabase
        .from('project_images')
        .select('id, name, url, alt_text, storage_path, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load image library:', error);
        setFeedback({
          severity: 'error',
          message: 'Your image library could not be loaded. Run the Image Library setup SQL if this is the first time using it.',
        });
        return;
      }

      setImages((data ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        url: row.url,
        altText: row.alt_text ?? '',
        storagePath: row.storage_path,
        createdAt: row.created_at,
      })));
    } catch (error) {
      console.error('Failed to load image library:', error);
      setFeedback({ severity: 'error', message: 'Your image library could not be loaded. Please try again.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadImages();
  }, [loadImages]);

  const copyToClipboard = useCallback(async (value: string, id: string) => {
    try {
      await writeToClipboard(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 2000);
    } catch (error) {
      console.error('Failed to copy image value:', error);
      setFeedback({ severity: 'error', message: 'Could not copy to your clipboard. Please copy it manually.' });
    }
  }, []);

  const handleFileUpload = async (files: FileList | File[]) => {
    const selectedFiles = Array.from(files).filter(Boolean);
    if (selectedFiles.length === 0) return;

    const validFiles = selectedFiles.filter((file) => ALLOWED_IMAGE_TYPES.has(file.type) && file.size <= MAX_FILE_SIZE);
    const rejectedCount = selectedFiles.length - validFiles.length;

    if (validFiles.length === 0) {
      setFeedback({ severity: 'error', message: 'Choose PNG, JPG, GIF, or WEBP images up to 10 MB.' });
      return;
    }

    setUploading(true);
    setFeedback(null);

    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setFeedback({ severity: 'error', message: 'You must be signed in to upload images.' });
        return;
      }

      const uploadedImages: ImageEntry[] = [];
      let failedCount = rejectedCount;

      for (const file of validFiles) {
        const extension = file.name.split('.').pop() || 'image';
        const storagePath = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
        const altText = file.name.replace(/\.[^/.]+$/, '');

        const { error: storageError } = await supabase.storage
          .from('project-images')
          .upload(storagePath, file, {
            cacheControl: '3600',
            contentType: file.type,
            upsert: false,
          });

        if (storageError) {
          console.error(`Failed to upload ${file.name}:`, storageError);
          failedCount += 1;
          continue;
        }

        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(storagePath);

        const { data: row, error: insertError } = await supabase
          .from('project_images')
          .insert({
            project_id: null,
            user_id: user.id,
            name: file.name,
            url: urlData.publicUrl,
            alt_text: altText,
            storage_path: storagePath,
          })
          .select('id, name, url, alt_text, storage_path, created_at')
          .single();

        if (insertError || !row) {
          console.error(`Failed to save ${file.name}:`, insertError);
          await supabase.storage.from('project-images').remove([storagePath]);
          failedCount += 1;
          continue;
        }

        uploadedImages.push({
          id: row.id,
          name: row.name,
          url: row.url,
          altText: row.alt_text ?? '',
          storagePath: row.storage_path,
          createdAt: row.created_at,
        });
      }

      if (uploadedImages.length > 0) {
        setImages((current) => [...uploadedImages, ...current]);
      }

      if (failedCount > 0) {
        setFeedback({
          severity: uploadedImages.length > 0 ? 'warning' : 'error',
          message: uploadedImages.length > 0
            ? `${uploadedImages.length} image${uploadedImages.length === 1 ? '' : 's'} saved. ${failedCount} could not be uploaded.`
            : 'The images could not be uploaded. Check the Image Library setup and try again.',
        });
      } else {
        setFeedback({ severity: 'success', message: `${uploadedImages.length} image${uploadedImages.length === 1 ? '' : 's'} saved to your library.` });
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setFeedback({ severity: 'error', message: 'The upload failed. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  const handleAddFromUrl = async () => {
    const url = externalUrl.trim();
    if (!isSupportedImageUrl(url)) {
      setFeedback({ severity: 'error', message: 'Enter a valid public HTTP or HTTPS image URL.' });
      return;
    }

    setUploading(true);
    setFeedback(null);

    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setFeedback({ severity: 'error', message: 'You must be signed in to save an image URL.' });
        return;
      }

      const name = getImageName(url);
      const { data: row, error } = await supabase
        .from('project_images')
        .insert({
          project_id: null,
          user_id: user.id,
          name,
          url,
          alt_text: name.replace(/\.[^/.]+$/, ''),
          storage_path: null,
        })
        .select('id, name, url, alt_text, storage_path, created_at')
        .single();

      if (error || !row) {
        console.error('Failed to save image URL:', error);
        setFeedback({ severity: 'error', message: 'The image URL could not be saved. Please try again.' });
        return;
      }

      setImages((current) => [{
        id: row.id,
        name: row.name,
        url: row.url,
        altText: row.alt_text ?? '',
        storagePath: row.storage_path,
        createdAt: row.created_at,
      }, ...current]);
      setExternalUrl('');
      setFeedback({ severity: 'success', message: 'Image URL saved to your library.' });
    } catch (error) {
      console.error('Failed to save image URL:', error);
      setFeedback({ severity: 'error', message: 'The image URL could not be saved. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (entry: ImageEntry) => {
    setDeletingId(entry.id);
    setFeedback(null);

    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setFeedback({ severity: 'error', message: 'You must be signed in to delete an image.' });
        return;
      }

      const { error: deleteError } = await supabase
        .from('project_images')
        .delete()
        .eq('id', entry.id)
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Failed to delete image:', deleteError);
        setFeedback({ severity: 'error', message: 'The image could not be deleted. Please try again.' });
        return;
      }

      setImages((current) => current.filter((image) => image.id !== entry.id));

      if (entry.storagePath) {
        const { error: storageError } = await supabase.storage
          .from('project-images')
          .remove([entry.storagePath]);

        if (storageError) {
          console.error('Image record deleted but storage cleanup failed:', storageError);
          setFeedback({ severity: 'warning', message: 'The library record was deleted, but the uploaded file could not be cleaned up.' });
          return;
        }
      }

      setFeedback({ severity: 'success', message: 'Image deleted from your library.' });
    } catch (error) {
      console.error('Failed to delete image:', error);
      setFeedback({ severity: 'error', message: 'The image could not be deleted. Please try again.' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {feedback && <Alert severity={feedback.severity} onClose={() => setFeedback(null)}>{feedback.message}</Alert>}

      <Paper elevation={0} sx={{ bgcolor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 3, p: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box sx={{ width: 42, height: 42, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'rgba(56, 189, 248, 0.14)' }}>
            <CloudUploadIcon sx={{ color: colors.accent }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: colors.text, fontWeight: 700 }}>Add images</Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted }}>Saved to your account, ready to reuse in any project.</Typography>
          </Box>
        </Box>

        <Box
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            void handleFileUpload(event.dataTransfer.files);
          }}
          sx={{
            minHeight: 170,
            border: `2px dashed ${isDragging ? colors.accent : colors.border}`,
            borderRadius: 2.5,
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            cursor: uploading ? 'wait' : 'pointer',
            outline: 'none',
            transition: 'border-color 0.2s ease, background-color 0.2s ease',
            bgcolor: isDragging ? 'rgba(56, 189, 248, 0.06)' : colors.bg,
            '&:hover, &:focus-visible': { borderColor: colors.accent, bgcolor: 'rgba(56, 189, 248, 0.06)' },
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            disabled={uploading}
            onChange={(event) => {
              if (event.target.files) void handleFileUpload(event.target.files);
              event.target.value = '';
            }}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <Box>
              <CircularProgress size={38} sx={{ color: colors.accent, mb: 1.5 }} />
              <Typography sx={{ color: colors.textMuted }}>Saving your images…</Typography>
            </Box>
          ) : (
            <Box>
              <CloudUploadIcon sx={{ fontSize: 42, color: colors.textMuted, mb: 1 }} />
              <Typography sx={{ color: colors.text, fontWeight: 600 }}>Drag and drop images here, or click to browse</Typography>
              <Typography variant="body2" sx={{ color: colors.textMuted, mt: 0.75 }}>PNG, JPG, GIF, and WEBP up to 10 MB each</Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: { xs: 'stretch', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 1.25, mt: 2.5 }}>
          <LinkIcon sx={{ color: colors.textMuted, ml: { sm: 0.5 }, display: { xs: 'none', sm: 'block' } }} />
          <TextField
            fullWidth
            size="small"
            type="url"
            label="Or save an image from a public URL"
            placeholder="https://example.com/image.png"
            value={externalUrl}
            disabled={uploading}
            onChange={(event) => setExternalUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') void handleAddFromUrl();
            }}
            sx={{
              '& .MuiInputLabel-root': { color: colors.textMuted },
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
            onClick={() => void handleAddFromUrl()}
            disabled={uploading || !externalUrl.trim()}
            sx={{
              minWidth: 132,
              bgcolor: colors.accent,
              color: '#082f49',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#0ea5e9' },
            }}
          >
            Save URL
          </Button>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ bgcolor: colors.card, border: `1px solid ${colors.border}`, borderRadius: 3, p: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <ImageIcon sx={{ color: colors.accent }} />
            <Box>
              <Typography variant="h6" sx={{ color: colors.text, fontWeight: 700 }}>Your saved images</Typography>
              <Typography variant="body2" sx={{ color: colors.textMuted }}>{images.length} {images.length === 1 ? 'image' : 'images'} in your library</Typography>
            </Box>
          </Box>
          <Tooltip title="Refresh image library">
            <span>
              <IconButton aria-label="Refresh image library" onClick={() => void loadImages()} disabled={loading || uploading} sx={{ color: colors.textMuted, '&:hover': { color: colors.accent } }}>
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, py: 8 }}>
            <CircularProgress size={28} sx={{ color: colors.accent }} />
            <Typography sx={{ color: colors.textMuted }}>Loading your saved images…</Typography>
          </Box>
        ) : images.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 9, bgcolor: colors.bg, border: `1px dashed ${colors.border}`, borderRadius: 2.5 }}>
            <ImageIcon sx={{ fontSize: 48, color: colors.textMuted, mb: 1.5 }} />
            <Typography sx={{ color: colors.text, fontWeight: 600 }}>Your image library is empty</Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted, mt: 0.75 }}>Add an image above to use it in any project.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 2 }}>
            {images.map((image) => {
              const urlCopied = copiedId === `url-${image.id}`;
              const tagCopied = copiedId === `tag-${image.id}`;

              return (
                <Box key={image.id} sx={{ overflow: 'hidden', border: `1px solid ${colors.border}`, borderRadius: 2.5, bgcolor: colors.bg }}>
                  <Box sx={{ height: 164, bgcolor: '#020617', display: 'grid', placeItems: 'center', borderBottom: `1px solid ${colors.border}` }}>
                    <Box component="img" src={image.url} alt={image.altText || image.name} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </Box>
                  <Box sx={{ p: 1.75 }}>
                    <Typography title={image.name} sx={{ color: colors.text, fontWeight: 650, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{image.name}</Typography>
                    <Typography variant="caption" sx={{ color: colors.textMuted, display: 'block', mt: 0.25 }}>
                      {new Date(image.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mt: 1.25 }}>
                      <Tooltip title={urlCopied ? 'Copied URL' : 'Copy direct URL'}>
                        <IconButton aria-label="Copy direct image URL" size="small" onClick={() => void copyToClipboard(image.url, `url-${image.id}`)} sx={{ color: urlCopied ? '#4ade80' : colors.textMuted, '&:hover': { color: colors.accent } }}>
                          {urlCopied ? <CheckCircleIcon fontSize="small" /> : <LinkIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={tagCopied ? 'Copied HTML tag' : 'Copy HTML image tag'}>
                        <IconButton aria-label="Copy HTML image tag" size="small" onClick={() => void copyToClipboard(generateImgTag(image), `tag-${image.id}`)} sx={{ color: tagCopied ? '#4ade80' : colors.textMuted, '&:hover': { color: colors.accent } }}>
                          {tagCopied ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      <Box sx={{ flex: 1 }} />
                      <Tooltip title="Delete image">
                        <span>
                          <IconButton aria-label={`Delete ${image.name}`} size="small" disabled={deletingId === image.id} onClick={() => void handleDelete(image)} sx={{ color: colors.textMuted, '&:hover': { color: '#f87171' } }}>
                            {deletingId === image.id ? <CircularProgress size={16} color="inherit" /> : <DeleteIcon fontSize="small" />}
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', gap: 1.25, p: 2, bgcolor: 'rgba(34, 197, 94, 0.08)', borderLeft: '4px solid #22c55e', borderRadius: 1.5 }}>
        <CheckIcon sx={{ color: '#4ade80', mt: 0.15 }} />
        <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.65 }}>
          Images are saved to your account, not inside a Custom HTML project. Copy a direct URL or a safe HTML image tag whenever you want to use one.
        </Typography>
      </Box>
    </Box>
  );
}
