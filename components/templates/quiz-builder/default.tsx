'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PaletteIcon from '@mui/icons-material/Palette';
import PreviewIcon from '@mui/icons-material/Preview';
import PublishIcon from '@mui/icons-material/Publish';
import QuizIcon from '@mui/icons-material/Quiz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';

type BuilderStep = 'setup' | 'questions' | 'results' | 'publish';
type QuizScreen = 'intro' | 'quiz' | 'results';

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
}

interface QuizOffer {
  id: string;
  title: string;
  url: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

interface LegalLink {
  id: string;
  label: string;
  url: string;
}

interface QuizConfig {
  title: string;
  description: string;
  coverImageUrl: string;
  themeId: string;
  primaryColor: string;
  accentColor: string;
  cornerRadius: number;
  startButtonText: string;
  continueButtonText: string;
  resultsHeadline: string;
  resultsSubheadline: string;
  showConfetti: boolean;
  footerText: string;
  questions: QuizQuestion[];
  offers: QuizOffer[];
  legalLinks: LegalLink[];
}

interface QuizBuilderTemplateProps {
  editable?: boolean;
  data?: Record<string, unknown>;
  onContentChange?: (eid: string, value: unknown) => void;
}

const themeOptions = [
  { id: 'emerald', name: 'Emerald', primaryColor: '#2f6f5e', accentColor: '#7c6fd6', cornerRadius: 22 },
  { id: 'sunset', name: 'Sunset', primaryColor: '#c2542c', accentColor: '#e2a13a', cornerRadius: 22 },
  { id: 'berry', name: 'Berry', primaryColor: '#b8456f', accentColor: '#7c3f56', cornerRadius: 22 },
  { id: 'ocean', name: 'Ocean', primaryColor: '#2f73b8', accentColor: '#2f9e7e', cornerRadius: 22 },
  { id: 'royal', name: 'Royal', primaryColor: '#4d44a8', accentColor: '#b8456f', cornerRadius: 10 },
  { id: 'mono', name: 'Mono', primaryColor: '#2b2b29', accentColor: '#7a7972', cornerRadius: 4 },
  { id: 'gold', name: 'Gold', primaryColor: '#7a5212', accentColor: '#2f8e6e', cornerRadius: 10 },
  { id: 'bold-red', name: 'Bold Red', primaryColor: '#c0392f', accentColor: '#2b2b29', cornerRadius: 4 },
] as const;

let idSequence = 0;

function createId(prefix: string): string {
  idSequence += 1;
  return `${prefix}-${Date.now().toString(36)}-${idSequence}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function safeColor(value: unknown, fallback: string): string {
  return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

function safeUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function getDefaultConfig(): QuizConfig {
  return {
    title: "What's Your Health Type?",
    description: 'Answer a few quick questions to uncover your personalized result.',
    coverImageUrl: '',
    themeId: 'emerald',
    primaryColor: '#2f6f5e',
    accentColor: '#7c6fd6',
    cornerRadius: 22,
    startButtonText: 'Start Evaluation →',
    continueButtonText: 'See My Result →',
    resultsHeadline: 'Congratulations! You are qualified.',
    resultsSubheadline: 'Your personalized recommendations are ready.',
    showConfetti: true,
    footerText: 'This page may contain affiliate links. We may earn a small commission at no extra cost to you.',
    questions: [
      { id: 'question-1', text: 'Which wellness goal matters most to you right now?', options: ['More daily energy', 'Better sleep', 'Healthy weight', 'Sharper focus'] },
      { id: 'question-2', text: 'How would you describe your current routine?', options: ['Very consistent', 'Mostly consistent', 'I am getting started'] },
      { id: 'question-3', text: 'How quickly would you like to see progress?', options: ['As soon as possible', 'Over the next month', 'I am planning ahead'] },
    ],
    offers: [
      {
        id: 'offer-1',
        title: 'Your personalized next step',
        url: '',
        description: 'Add your recommended product, service, booking page, or affiliate offer here.',
        buttonText: 'Explore recommendation →',
        imageUrl: '',
      },
    ],
    legalLinks: [
      { id: 'legal-1', label: 'Privacy Policy', url: '' },
      { id: 'legal-2', label: 'Disclaimer', url: '' },
    ],
  };
}

function asString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

function normalizeConfig(value: unknown): QuizConfig {
  const fallback = getDefaultConfig();
  if (!isRecord(value)) return fallback;

  const questions = Array.isArray(value.questions)
    ? value.questions.map((question, index) => {
        const item = isRecord(question) ? question : {};
        const options = Array.isArray(item.options)
          ? item.options.map((option) => asString(option, '')).slice(0, 5)
          : [];

        while (options.length < 2) options.push('');

        return {
          id: asString(item.id, `question-${index + 1}`),
          text: asString(item.text, ''),
          options,
        };
      })
    : fallback.questions;

  const offers = Array.isArray(value.offers)
    ? value.offers.map((offer, index) => {
        const item = isRecord(offer) ? offer : {};
        return {
          id: asString(item.id, `offer-${index + 1}`),
          title: asString(item.title, ''),
          url: asString(item.url, ''),
          description: asString(item.description, ''),
          buttonText: asString(item.buttonText, 'Explore recommendation →'),
          imageUrl: asString(item.imageUrl, ''),
        };
      })
    : fallback.offers;

  const legalLinks = Array.isArray(value.legalLinks)
    ? value.legalLinks.map((link, index) => {
        const item = isRecord(link) ? link : {};
        return {
          id: asString(item.id, `legal-${index + 1}`),
          label: asString(item.label, ''),
          url: asString(item.url, ''),
        };
      })
    : fallback.legalLinks;

  return {
    title: asString(value.title, fallback.title),
    description: asString(value.description, fallback.description),
    coverImageUrl: asString(value.coverImageUrl, fallback.coverImageUrl),
    themeId: asString(value.themeId, fallback.themeId),
    primaryColor: safeColor(value.primaryColor, fallback.primaryColor),
    accentColor: safeColor(value.accentColor, fallback.accentColor),
    cornerRadius: typeof value.cornerRadius === 'number' && [4, 10, 22].includes(value.cornerRadius) ? value.cornerRadius : fallback.cornerRadius,
    startButtonText: asString(value.startButtonText, fallback.startButtonText),
    continueButtonText: asString(value.continueButtonText, fallback.continueButtonText),
    resultsHeadline: asString(value.resultsHeadline, fallback.resultsHeadline),
    resultsSubheadline: asString(value.resultsSubheadline, fallback.resultsSubheadline),
    showConfetti: typeof value.showConfetti === 'boolean' ? value.showConfetti : fallback.showConfetti,
    footerText: asString(value.footerText, fallback.footerText),
    questions: questions.length > 0 ? questions : fallback.questions,
    offers,
    legalLinks,
  };
}

function getGradient(config: QuizConfig): string {
  return `linear-gradient(90deg, ${config.primaryColor}, ${config.accentColor})`;
}

function StepButton({ active, complete, label, number, onClick }: { active: boolean; complete: boolean; label: string; number: number; onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      startIcon={complete ? <CheckCircleIcon sx={{ fontSize: 17 }} /> : undefined}
      sx={{
        color: active ? '#1c1b19' : complete ? '#1d4a3d' : '#6b6a64',
        minWidth: 'max-content',
        textTransform: 'none',
        fontWeight: 700,
        fontSize: 13,
        p: 0,
        '&:hover': { bgcolor: 'transparent', color: '#1c1b19' },
      }}
    >
      {!complete && (
        <Box sx={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', mr: 1, bgcolor: active ? '#1c1b19' : '#fff', color: active ? '#fff' : '#9b9a93', border: '1.5px solid', borderColor: active ? '#1c1b19' : '#d8d4c8', fontSize: 13 }}>
          {number}
        </Box>
      )}
      {label}
    </Button>
  );
}

function QuizBuilderEditor({ config, onChange }: { config: QuizConfig; onChange: (config: QuizConfig) => void }) {
  const [activeStep, setActiveStep] = useState<BuilderStep>('setup');
  const [showPreview, setShowPreview] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const importRef = useRef<HTMLInputElement>(null);

  const updateQuestion = (id: string, update: Partial<QuizQuestion>) => {
    onChange({ ...config, questions: config.questions.map((question) => question.id === id ? { ...question, ...update } : question) });
  };

  const updateOffer = (id: string, update: Partial<QuizOffer>) => {
    onChange({ ...config, offers: config.offers.map((offer) => offer.id === id ? { ...offer, ...update } : offer) });
  };

  const updateLegalLink = (id: string, update: Partial<LegalLink>) => {
    onChange({ ...config, legalLinks: config.legalLinks.map((link) => link.id === id ? { ...link, ...update } : link) });
  };

  const applyTheme = (themeId: string) => {
    const theme = themeOptions.find((item) => item.id === themeId);
    if (!theme) return;
    onChange({ ...config, themeId: theme.id, primaryColor: theme.primaryColor, accentColor: theme.accentColor, cornerRadius: theme.cornerRadius });
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${config.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'quiz'}-config.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    setNotice('Quiz configuration downloaded.');
  };

  const importJson = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        onChange(normalizeConfig(JSON.parse(String(reader.result))));
        setNotice('Quiz configuration imported.');
      } catch {
        setNotice('That file is not a valid quiz configuration.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  if (showPreview) {
    return (
      <Box sx={{ minHeight: 'calc(100vh - 72px)', bgcolor: '#0f172a' }}>
        <Box sx={{ px: { xs: 2, md: 4 }, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#1e293b', borderBottom: '1px solid #334155' }}>
          <Typography sx={{ color: '#f8fafc', fontWeight: 700 }}>Live quiz preview</Typography>
          <Button startIcon={<EditIcon />} onClick={() => setShowPreview(false)} sx={{ color: '#cbd5e1', textTransform: 'none', fontWeight: 700 }}>
            Back to builder
          </Button>
        </Box>
        <QuizPlayer config={config} />
      </Box>
    );
  }

  const steps: { id: BuilderStep; label: string; number: number }[] = [
    { id: 'setup', label: 'Setup', number: 1 },
    { id: 'questions', label: 'Questions', number: 2 },
    { id: 'results', label: 'Results', number: 3 },
    { id: 'publish', label: 'Publish', number: 4 },
  ];
  const activeIndex = steps.findIndex((step) => step.id === activeStep);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px)', bgcolor: '#f6f5f2', color: '#1c1b19', py: { xs: 2, md: 4 }, px: { xs: 1.5, md: 3 } }}>
      <Box sx={{ width: '100%', maxWidth: 920, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 42, height: 42, borderRadius: '11px', display: 'grid', placeItems: 'center', bgcolor: config.primaryColor, color: '#fff' }}><QuizIcon /></Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.2px' }}>Quiz Builder Studio</Typography>
              <Typography variant="body2" sx={{ color: '#9b9a93', fontSize: 12.5 }}>Build a branded qualifying quiz and publish it with your project.</Typography>
            </Box>
          </Box>
          <Chip icon={<CheckCircleIcon sx={{ color: `${config.primaryColor} !important` }} />} label={config.title || 'Untitled quiz'} sx={{ bgcolor: '#fff', border: '1px solid #e7e4dc', color: '#1c1b19', fontWeight: 600, px: 0.5 }} />
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 3 }}>
          <Button variant="outlined" startIcon={<PreviewIcon />} onClick={() => setShowPreview(true)} sx={{ textTransform: 'none', borderColor: '#d8d4c8', color: '#1c1b19', fontWeight: 700, bgcolor: '#fff' }}>Preview quiz</Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadJson} sx={{ textTransform: 'none', borderColor: '#d8d4c8', color: '#1c1b19', fontWeight: 700, bgcolor: '#fff' }}>Export JSON</Button>
          <Button component="label" variant="outlined" startIcon={<UploadFileIcon />} sx={{ textTransform: 'none', borderColor: '#d8d4c8', color: '#1c1b19', fontWeight: 700, bgcolor: '#fff' }}>
            Import JSON
            <input ref={importRef} hidden type="file" accept="application/json,.json" onChange={importJson} />
          </Button>
        </Stack>

        {notice && <Alert severity={notice.startsWith('That') ? 'error' : 'success'} onClose={() => setNotice(null)} sx={{ mb: 2 }}>{notice}</Alert>}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.75 }, overflowX: 'auto', pb: 1, mb: 3 }}>
          {steps.map((step, index) => (
            <Box key={step.id} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.75 } }}>
              <StepButton active={activeStep === step.id} complete={index < activeIndex} number={step.number} label={step.label} onClick={() => setActiveStep(step.id)} />
              {index < steps.length - 1 && <Box sx={{ width: { xs: 18, md: 52 }, height: 1.5, bgcolor: '#d8d4c8', flexShrink: 0 }} />}
            </Box>
          ))}
        </Box>

        {activeStep === 'setup' && (
          <Stack spacing={2}>
            <BuilderPanel title="Choose a visual theme" icon={<PaletteIcon sx={{ color: '#1d4a3d' }} />}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1.25 }}>
                {themeOptions.map((theme) => (
                  <Button key={theme.id} onClick={() => applyTheme(theme.id)} sx={{ display: 'block', p: 1.25, border: '2px solid', borderColor: config.themeId === theme.id ? '#1c1b19' : '#d8d4c8', borderRadius: 1.5, bgcolor: config.themeId === theme.id ? '#fff' : '#fbfaf7', textTransform: 'none', color: '#6b6a64', '&:hover': { borderColor: '#6b6a64', bgcolor: '#fff' } }}>
                    <Box sx={{ height: 28, borderRadius: 1, background: `linear-gradient(135deg, ${theme.primaryColor} 50%, ${theme.accentColor} 50%)`, mb: 0.75 }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{theme.name}</Typography>
                  </Button>
                ))}
              </Box>
            </BuilderPanel>

            <BuilderPanel title="Quiz details" icon={<QuizIcon sx={{ color: '#1d4a3d' }} />}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField fullWidth label="Quiz title" value={config.title} onChange={(event) => onChange({ ...config, title: event.target.value })} />
                <TextField fullWidth label="Short description" value={config.description} onChange={(event) => onChange({ ...config, description: event.target.value })} />
              </Box>
              <TextField fullWidth label="Intro cover image URL (optional)" value={config.coverImageUrl} onChange={(event) => onChange({ ...config, coverImageUrl: event.target.value })} placeholder="https://example.com/cover.jpg" sx={{ mt: 2 }} helperText="You can copy a saved image URL from Image Library." />
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2, mt: 2 }}>
                <TextField label="Primary color" type="color" value={config.primaryColor} onChange={(event) => onChange({ ...config, themeId: 'custom', primaryColor: safeColor(event.target.value, config.primaryColor) })} InputLabelProps={{ shrink: true }} />
                <TextField label="Accent color" type="color" value={config.accentColor} onChange={(event) => onChange({ ...config, themeId: 'custom', accentColor: safeColor(event.target.value, config.accentColor) })} InputLabelProps={{ shrink: true }} />
                <TextField select label="Corner style" value={config.cornerRadius} onChange={(event) => onChange({ ...config, themeId: 'custom', cornerRadius: Number(event.target.value) })}>
                  <MenuItem value={22}>Rounded (soft)</MenuItem>
                  <MenuItem value={10}>Subtle</MenuItem>
                  <MenuItem value={4}>Sharp</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2 }}>
                <TextField label="Start button text" value={config.startButtonText} onChange={(event) => onChange({ ...config, startButtonText: event.target.value })} />
                <TextField label="Results button text" value={config.continueButtonText} onChange={(event) => onChange({ ...config, continueButtonText: event.target.value })} />
              </Box>
              <Button onClick={() => onChange({ ...config, showConfetti: !config.showConfetti })} startIcon={<CheckCircleIcon />} sx={{ mt: 1.5, textTransform: 'none', color: config.showConfetti ? '#1d4a3d' : '#6b6a64', fontWeight: 700 }}>
                {config.showConfetti ? 'Confetti is on for the results page' : 'Turn on results confetti'}
              </Button>
            </BuilderPanel>
            <BuilderNavigation onNext={() => setActiveStep('questions')} />
          </Stack>
        )}

        {activeStep === 'questions' && (
          <Stack spacing={2}>
            <BuilderPanel title="Questions" icon={<QuizIcon sx={{ color: '#1d4a3d' }} />} count={config.questions.length}>
              <Stack spacing={1.5}>
                {config.questions.map((question, questionIndex) => (
                  <Paper key={question.id} elevation={0} sx={{ p: { xs: 1.5, md: 2 }, bgcolor: '#fbfaf7', border: '1.5px solid #e7e4dc', borderRadius: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1.5 }}>
                      <Typography sx={{ color: '#6b6a64', fontWeight: 800, fontSize: 13 }}>Question {questionIndex + 1}</Typography>
                      {config.questions.length > 1 && <Tooltip title="Remove question"><IconButton aria-label={`Remove question ${questionIndex + 1}`} onClick={() => onChange({ ...config, questions: config.questions.filter((item) => item.id !== question.id) })} size="small" sx={{ color: '#b3473f' }}><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>}
                    </Box>
                    <TextField fullWidth label="Question" value={question.text} onChange={(event) => updateQuestion(question.id, { text: event.target.value })} placeholder="Enter your question" />
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#6b6a64', mt: 1.75, mb: 0.75 }}>Answer options</Typography>
                    <Stack spacing={1}>
                      {question.options.map((option, optionIndex) => (
                        <Box key={`${question.id}-option-${optionIndex}`} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <TextField fullWidth size="small" value={option} onChange={(event) => updateQuestion(question.id, { options: question.options.map((item, index) => index === optionIndex ? event.target.value : item) })} placeholder={`Option ${optionIndex + 1}`} />
                          {question.options.length > 2 && <Tooltip title="Remove option"><IconButton aria-label={`Remove option ${optionIndex + 1}`} onClick={() => updateQuestion(question.id, { options: question.options.filter((_, index) => index !== optionIndex) })} size="small" sx={{ color: '#9b9a93' }}><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>}
                        </Box>
                      ))}
                    </Stack>
                    {question.options.length < 5 && <Button startIcon={<AddIcon />} onClick={() => updateQuestion(question.id, { options: [...question.options, ''] })} sx={{ mt: 1, textTransform: 'none', color: '#1d4a3d', fontWeight: 700, fontSize: 12.5 }}>Add option</Button>}
                  </Paper>
                ))}
              </Stack>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={() => onChange({ ...config, questions: [...config.questions, { id: createId('question'), text: '', options: ['', ''] }] })} sx={{ mt: 2, textTransform: 'none', borderColor: '#d8d4c8', color: '#1c1b19', fontWeight: 700 }}>Add question</Button>
              <Alert icon={<QuizIcon fontSize="inherit" />} severity="info" sx={{ mt: 2, bgcolor: '#fbfaf7', color: '#6b6a64', border: '1px solid #e7e4dc' }}>Every answer continues the visitor to the result page, just like the supplied qualification quiz.</Alert>
            </BuilderPanel>
            <BuilderNavigation onBack={() => setActiveStep('setup')} onNext={() => setActiveStep('results')} />
          </Stack>
        )}

        {activeStep === 'results' && (
          <Stack spacing={2}>
            <BuilderPanel title="Results page and offer cards" icon={<CheckCircleIcon sx={{ color: '#1d4a3d' }} />}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                <TextField fullWidth label="Results headline" value={config.resultsHeadline} onChange={(event) => onChange({ ...config, resultsHeadline: event.target.value })} />
                <TextField fullWidth label="Results subheadline" value={config.resultsSubheadline} onChange={(event) => onChange({ ...config, resultsSubheadline: event.target.value })} />
              </Box>
              <Stack spacing={1.5}>
                {config.offers.map((offer, offerIndex) => (
                  <Paper key={offer.id} elevation={0} sx={{ p: { xs: 1.5, md: 2 }, bgcolor: '#fbfaf7', border: '1.5px solid #e7e4dc', borderRadius: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1.5 }}>
                      <Typography sx={{ color: '#6b6a64', fontWeight: 800, fontSize: 13 }}>Offer card {offerIndex + 1}</Typography>
                      <Tooltip title="Remove offer"><IconButton aria-label={`Remove offer ${offerIndex + 1}`} onClick={() => onChange({ ...config, offers: config.offers.filter((item) => item.id !== offer.id) })} size="small" sx={{ color: '#b3473f' }}><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.5 }}>
                      <TextField label="Product or service name" value={offer.title} onChange={(event) => updateOffer(offer.id, { title: event.target.value })} />
                      <TextField label="Affiliate / destination URL" value={offer.url} onChange={(event) => updateOffer(offer.id, { url: event.target.value })} placeholder="https://..." />
                    </Box>
                    <TextField fullWidth label="Short description" value={offer.description} onChange={(event) => updateOffer(offer.id, { description: event.target.value })} sx={{ mt: 1.5 }} />
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.5, mt: 1.5 }}>
                      <TextField label="Button text" value={offer.buttonText} onChange={(event) => updateOffer(offer.id, { buttonText: event.target.value })} />
                      <TextField label="Image URL (optional)" value={offer.imageUrl} onChange={(event) => updateOffer(offer.id, { imageUrl: event.target.value })} placeholder="https://..." />
                    </Box>
                  </Paper>
                ))}
              </Stack>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={() => onChange({ ...config, offers: [...config.offers, { id: createId('offer'), title: '', url: '', description: '', buttonText: 'Explore recommendation →', imageUrl: '' }] })} sx={{ mt: 2, textTransform: 'none', borderColor: '#d8d4c8', color: '#1c1b19', fontWeight: 700 }}>Add offer card</Button>
            </BuilderPanel>

            <BuilderPanel title="Footer and legal links" icon={<OpenInNewIcon sx={{ color: '#1d4a3d' }} />}>
              <TextField fullWidth multiline minRows={2} label="Footer / disclaimer text" value={config.footerText} onChange={(event) => onChange({ ...config, footerText: event.target.value })} />
              <Stack spacing={1.25} sx={{ mt: 2 }}>
                {config.legalLinks.map((link) => (
                  <Box key={link.id} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '180px 1fr auto' }, gap: 1, alignItems: 'center' }}>
                    <TextField size="small" label="Label" value={link.label} onChange={(event) => updateLegalLink(link.id, { label: event.target.value })} />
                    <TextField size="small" label="URL" value={link.url} onChange={(event) => updateLegalLink(link.id, { url: event.target.value })} placeholder="https://..." />
                    <Tooltip title="Remove link"><IconButton aria-label={`Remove ${link.label || 'legal'} link`} onClick={() => onChange({ ...config, legalLinks: config.legalLinks.filter((item) => item.id !== link.id) })} size="small" sx={{ color: '#9b9a93' }}><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>
                  </Box>
                ))}
              </Stack>
              <Button startIcon={<AddIcon />} onClick={() => onChange({ ...config, legalLinks: [...config.legalLinks, { id: createId('legal'), label: '', url: '' }] })} sx={{ mt: 1, textTransform: 'none', color: '#1d4a3d', fontWeight: 700, fontSize: 12.5 }}>Add legal link</Button>
            </BuilderPanel>
            <BuilderNavigation onBack={() => setActiveStep('questions')} onNext={() => setActiveStep('publish')} />
          </Stack>
        )}

        {activeStep === 'publish' && (
          <Stack spacing={2}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', border: '1.5px solid #e7e4dc', borderRadius: 2.5, background: `linear-gradient(135deg, ${config.primaryColor}16, #fff 65%)` }}>
              <PublishIcon sx={{ fontSize: 42, color: config.primaryColor, mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Your quiz is ready to publish</Typography>
              <Typography sx={{ color: '#6b6a64', mt: 0.75, maxWidth: 520, mx: 'auto' }}>Save & Publish from the top toolbar. Squpage will save this interactive quiz and make it available on your project link.</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} justifyContent="center" sx={{ mt: 2.5 }}>
                <Button variant="contained" startIcon={<PreviewIcon />} onClick={() => setShowPreview(true)} sx={{ background: getGradient(config), textTransform: 'none', fontWeight: 800, px: 2.5 }}>Preview final quiz</Button>
                <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadJson} sx={{ textTransform: 'none', borderColor: '#d8d4c8', color: '#1c1b19', fontWeight: 700 }}>Download backup JSON</Button>
              </Stack>
            </Paper>
            <Paper elevation={0} sx={{ p: 2, border: '1px solid #e7e4dc', borderRadius: 1.5, bgcolor: '#fbfaf7' }}>
              <Typography sx={{ fontSize: 13, color: '#6b6a64' }}><strong style={{ color: '#1c1b19' }}>Included:</strong> {config.questions.length} question{config.questions.length === 1 ? '' : 's'}, {config.offers.length} offer card{config.offers.length === 1 ? '' : 's'}, your chosen colors, a result screen, and safe external offer links.</Typography>
            </Paper>
            <BuilderNavigation onBack={() => setActiveStep('results')} />
          </Stack>
        )}
      </Box>
    </Box>
  );
}

function BuilderPanel({ title, icon, count, children }: { title: string; icon: React.ReactNode; count?: number; children: React.ReactNode }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: '1px solid #e7e4dc', borderRadius: 2.25, bgcolor: '#fff', boxShadow: '0 1px 2px rgba(28,27,25,0.06)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography sx={{ fontSize: 17, fontWeight: 800 }}>{title}</Typography>
        </Box>
        {count !== undefined && <Chip label={count} size="small" sx={{ bgcolor: '#e4efe9', color: '#1d4a3d', fontWeight: 800 }} />}
      </Box>
      {children}
    </Paper>
  );
}

function BuilderNavigation({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
      {onBack ? <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ textTransform: 'none', color: '#1c1b19', fontWeight: 700 }}>Back</Button> : <Box />}
      {onNext && <Button variant="contained" onClick={onNext} sx={{ bgcolor: '#1c1b19', textTransform: 'none', fontWeight: 800, '&:hover': { bgcolor: '#000' } }}>Continue →</Button>}
    </Box>
  );
}

function QuizPlayer({ config }: { config: QuizConfig }) {
  const [screen, setScreen] = useState<QuizScreen>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const questions = config.questions.filter((question) => question.text.trim() && question.options.filter((option) => option.trim()).length >= 2);
  const radius = config.cornerRadius;
  const currentQuestion = questions[currentQuestionIndex];
  const answerOptions = currentQuestion?.options.filter((option) => option.trim()) ?? [];
  const offers = config.offers.filter((offer) => offer.title.trim() || offer.description.trim() || safeUrl(offer.url));

  useEffect(() => {
    setScreen('intro');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
  }, [config]);

  const startQuiz = () => {
    if (questions.length === 0) return;
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScreen('quiz');
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;
    if (currentQuestionIndex === questions.length - 1) {
      setScreen('results');
      return;
    }
    setCurrentQuestionIndex((index) => index + 1);
    setSelectedAnswer(null);
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px)', bgcolor: '#f6f5f2', py: { xs: 3, md: 6 }, px: 1.5, backgroundImage: `linear-gradient(160deg, ${config.primaryColor}12, #f4f4f4 35%)` }}>
      <style>{`@keyframes quiz-builder-confetti { to { transform: translateY(690px) rotate(360deg); opacity: 0.15; } }`}</style>
      <Box sx={{ maxWidth: 560, mx: 'auto', position: 'relative' }}>
        {screen === 'intro' && (
          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: `${radius}px`, position: 'relative', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: getGradient(config) }} />
            {safeUrl(config.coverImageUrl) && <Box component="img" src={safeUrl(config.coverImageUrl) ?? undefined} alt="Quiz cover" sx={{ width: '100%', maxHeight: 220, display: 'block', objectFit: 'cover', borderRadius: `${Math.max(4, Math.round(radius * 0.55))}px`, mb: 3 }} />}
            <Typography component="h1" sx={{ fontSize: { xs: 25, md: 29 }, fontWeight: 800, letterSpacing: '-0.5px', color: '#1a1a1a' }}>{config.title || 'Untitled Quiz'}</Typography>
            <Typography sx={{ color: '#666', mt: 1, mb: 3, lineHeight: 1.6 }}>{config.description || 'Complete the quick evaluation to see your personalized result.'}</Typography>
            <Button fullWidth variant="contained" disabled={questions.length === 0} onClick={startQuiz} sx={{ py: 1.5, borderRadius: `${Math.max(4, Math.round(radius * 0.55))}px`, background: getGradient(config), textTransform: 'none', fontWeight: 800, fontSize: 15, boxShadow: `0 4px 14px ${config.primaryColor}40` }}>
              {questions.length === 0 ? 'Add questions in the builder to start' : config.startButtonText || 'Start Evaluation →'}
            </Button>
          </Paper>
        )}

        {screen === 'quiz' && currentQuestion && (
          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: `${radius}px`, position: 'relative', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: getGradient(config) }} />
            <Box sx={{ mt: 1, mb: 3 }}>
              <Box sx={{ height: 8, borderRadius: 8, bgcolor: '#ececec', overflow: 'hidden' }}><Box sx={{ height: '100%', width: `${Math.round((currentQuestionIndex / questions.length) * 100)}%`, background: getGradient(config), transition: 'width .35s ease' }} /></Box>
              <Typography align="right" sx={{ fontSize: 12, color: '#999', fontWeight: 700, mt: 0.5 }}>{currentQuestionIndex + 1} / {questions.length}</Typography>
            </Box>
            <Typography component="h2" sx={{ fontSize: { xs: 20, md: 22 }, fontWeight: 800, color: '#1a1a1a', mb: 2.25 }}>{currentQuestion.text}</Typography>
            <Stack spacing={1.1}>
              {answerOptions.map((option, index) => {
                const selected = selectedAnswer === index;
                return (
                  <Button key={`${currentQuestion.id}-${option}-${index}`} fullWidth onClick={() => setSelectedAnswer(index)} sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', p: 1.6, gap: 1.5, textTransform: 'none', border: '2px solid', borderColor: selected ? config.primaryColor : '#ececec', color: '#1a1a1a', borderRadius: `${Math.max(4, Math.round(radius * 0.55))}px`, bgcolor: selected ? `${config.primaryColor}12` : '#fff', '&:hover': { borderColor: config.primaryColor, bgcolor: `${config.primaryColor}0a`, transform: 'translateY(-1px)' } }}>
                    <Box sx={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'grid', placeItems: 'center', border: '2px solid', borderColor: selected ? config.primaryColor : '#ddd', bgcolor: selected ? config.primaryColor : 'transparent', color: '#fff', fontSize: 11, fontWeight: 800 }}>{String.fromCharCode(65 + index)}</Box>
                    <Typography sx={{ fontWeight: 650, fontSize: 15 }}>{option}</Typography>
                  </Button>
                );
              })}
            </Stack>
            <Button fullWidth variant="contained" disabled={selectedAnswer === null} onClick={nextQuestion} sx={{ mt: 2, py: 1.5, borderRadius: `${Math.max(4, Math.round(radius * 0.55))}px`, background: getGradient(config), textTransform: 'none', fontWeight: 800, fontSize: 15, '&.Mui-disabled': { bgcolor: '#d1d5db', color: '#fff' } }}>
              {currentQuestionIndex === questions.length - 1 ? config.continueButtonText || 'See My Result →' : 'Continue →'}
            </Button>
          </Paper>
        )}

        {screen === 'results' && (
          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: `${radius}px`, position: 'relative', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: getGradient(config) }} />
            {config.showConfetti && Array.from({ length: 36 }).map((_, index) => (
              <Box key={index} aria-hidden sx={{ position: 'absolute', top: -12, left: `${(index * 37) % 100}%`, width: 7, height: 13, opacity: 0.85, bgcolor: [config.primaryColor, config.accentColor, '#e2a13a', '#5dcaa5'][index % 4], animation: `quiz-builder-confetti ${1.5 + (index % 8) * 0.16}s linear forwards`, animationDelay: `${(index % 10) * 0.04}s` }} />
            ))}
            <Box sx={{ width: 130, height: 130, borderRadius: '50%', mx: 'auto', mt: 1, mb: 2, p: 1.5, background: `conic-gradient(${config.primaryColor} 100%, #ececec 0)` }}><Box sx={{ width: '100%', height: '100%', borderRadius: '50%', bgcolor: '#fff', display: 'grid', placeItems: 'center' }}><Box sx={{ textAlign: 'center' }}><Typography sx={{ color: config.primaryColor, fontSize: 30, fontWeight: 900, lineHeight: 1 }}>100%</Typography><Typography sx={{ color: '#999', fontSize: 11, fontWeight: 700 }}>QUALIFIED</Typography></Box></Box></Box>
            <Typography component="h2" align="center" sx={{ fontSize: { xs: 22, md: 24 }, fontWeight: 900, color: '#1a1a1a' }}>{config.resultsHeadline || 'Congratulations! You are qualified.'}</Typography>
            <Typography align="center" sx={{ color: '#2f8e6e', fontWeight: 700, mt: 0.75, mb: 3 }}>{config.resultsSubheadline || 'Your personalized recommendations are ready.'}</Typography>
            <Stack spacing={1.5}>
              {offers.map((offer) => {
                const offerUrl = safeUrl(offer.url);
                const imageUrl = safeUrl(offer.imageUrl);
                return (
                  <Box key={offer.id} sx={{ overflow: 'hidden', border: '2px solid #ececec', borderRadius: `${Math.max(4, Math.round(radius * 0.55))}px` }}>
                    {imageUrl && <Box component="img" src={imageUrl} alt={offer.title || 'Recommendation'} sx={{ width: '100%', height: 150, display: 'block', objectFit: 'cover' }} />}
                    <Box sx={{ p: 2 }}>
                      {offer.title && <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#1a1a1a' }}>{offer.title}</Typography>}
                      {offer.description && <Typography sx={{ color: '#666', fontSize: 13.5, lineHeight: 1.55, mt: 0.5, mb: offerUrl ? 1.5 : 0 }}>{offer.description}</Typography>}
                      {offerUrl && <Button component="a" href={offerUrl} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNewIcon fontSize="small" />} fullWidth sx={{ mt: 1.5, py: 1.25, borderRadius: `${Math.max(4, Math.round(radius * 0.55))}px`, color: '#fff', background: getGradient(config), textTransform: 'none', fontWeight: 800, '&:hover': { opacity: 0.9 } }}>{offer.buttonText || 'Explore recommendation →'}</Button>}
                    </Box>
                  </Box>
                );
              })}
            </Stack>
            <Button startIcon={<RestartAltIcon />} onClick={() => { setScreen('intro'); setSelectedAnswer(null); setCurrentQuestionIndex(0); }} sx={{ mt: 2, textTransform: 'none', color: '#6b6a64', fontWeight: 700 }}>Take quiz again</Button>
          </Paper>
        )}

        {(config.footerText || config.legalLinks.some((link) => safeUrl(link.url))) && <Box component="footer" sx={{ textAlign: 'center', color: '#999', fontSize: 11, lineHeight: 1.7, mt: 2, px: 2 }}>
          {config.footerText}
          {config.legalLinks.filter((link) => safeUrl(link.url)).map((link, index) => <Box key={link.id} component="span">{index > 0 && ' · '}<Box component="a" href={safeUrl(link.url) ?? '#'} target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', textDecoration: 'underline', ml: config.footerText && index === 0 ? 1 : 0 }}>{link.label || 'Learn more'}</Box></Box>)}
        </Box>}
      </Box>
    </Box>
  );
}

export default function QuizBuilderTemplate({ editable = false, data = {}, onContentChange }: QuizBuilderTemplateProps) {
  const [config, setConfig] = useState<QuizConfig>(() => normalizeConfig(data.quiz_builder));
  const configRef = useRef(config);

  useEffect(() => {
    if (!data.quiz_builder) return;
    const incoming = normalizeConfig(data.quiz_builder);
    if (JSON.stringify(incoming) !== JSON.stringify(configRef.current)) {
      configRef.current = incoming;
      setConfig(incoming);
    }
  }, [data.quiz_builder]);

  const updateConfig = (nextConfig: QuizConfig) => {
    configRef.current = nextConfig;
    setConfig(nextConfig);
    onContentChange?.('quiz_builder', nextConfig);
  };

  return editable ? <QuizBuilderEditor config={config} onChange={updateConfig} /> : <QuizPlayer config={config} />;
}
