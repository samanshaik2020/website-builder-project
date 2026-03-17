'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  IconButton,
  Tooltip,
  Chip,

} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ContentCopy as ContentCopyIcon,
  AutoAwesome as AutoAwesomeIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Check as CheckIcon,
  Dashboard as DashboardIcon,
  ColorLens as ColorLensIcon,
  SmartToy as SmartToyIcon,
  Stars as StarsIcon,
} from '@mui/icons-material';

type PromptData = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
  isMaster?: boolean;
};

const MASTER_PROMPTS: PromptData[] = [
  {
    id: 'master-landing',
    title: 'Master Prompt: The Ultimate Landing Page',
    description: 'Use this massive, detailed prompt to generate a complete, premium, responsive landing page with sections, mock data, stunning Tailwind styling, and smooth animations all in one go.',
    icon: <AutoAwesomeIcon sx={{ fontSize: 28, color: '#f59e0b' }} />,
    isMaster: true,
    prompt: `Act as a world-class Frontend Architect and UI/UX Designer. Create a breathtaking, modern, and highly responsive landing page for a [INSERT YOUR PRODUCT/SERVICE NAME].

Requirements:
1. STRICTLY use semantic HTML5.
2. Style entirely using Tailwind CSS (include the CDN script <script src="https://cdn.tailwindcss.com"></script> inside the <head>).
3. Do NOT use any external CSS files. All custom styling, if absolutely necessary, must be inside a <style> tag.
4. Structure the page with the following sections:
   - Floating Glassmorphism Navbar: Sticky top, translucent background (backdrop-blur), logo, nav links, and a primary CTA button.
   - Hero Section: Center-aligned, massive gradient text headline, compelling subheading, two CTA buttons (Primary solid, Secondary outlined), and a beautiful floating hero illustration/image placeholder.
   - Social Proof: "Trusted by" section with 4-5 company brand placeholders.
   - Features Grid: A 3-column bento-box style grid. Cards should have subtle 1px borders, smooth hover effects (translate-y-[-4px], increased shadow), and modern icons (use SVG strings or FontAwesome via CDN).
   - Testimonials: 2-3 clean, modern review cards.
   - CTA Section: A bold, colorful banner at the bottom preparing them to sign up.
   - Minimal Footer: Links, copyright, and social icons.
5. Aesthetics:
   - Use 'Inter' or 'Plus Jakarta Sans' font from Google Fonts.
   - Color palette should feel premium, trustworthy, and vibrant.
   - Use ample negative space (p-12, gap-8).
6. Interactivity:
   - Add Vanilla JS at the bottom to create an IntersectionObserver. As the user scrolls, elements should smoothly fade-in and slide up (opacity: 0 to 1, transform: translateY(20px) to 0).
7. Return ONLY the HTML code starting with <!DOCTYPE html>. Do not add markdown explanations before or after.`,
  },
  {
    id: 'master-dashboard',
    title: 'Master Prompt: The Modern Web App Dashboard',
    description: 'Use this prompt to generate a complex web application dashboard layout with a sidebar, stat cards, and data tables.',
    icon: <DashboardIcon sx={{ fontSize: 28, color: '#ec4899' }} />,
    isMaster: true,
    prompt: `Act as a Senior Frontend React/Tailwind Developer. Create a beautiful, responsive Admin Dashboard UI for a [INSERT NICHE/INDUSTRY] application.

Requirements:
1. Use semantic HTML5 and Tailwind CSS via CDN.
2. Layout Structure:
   - A left-side collapsible Sidebar containing navigation links with SVG icons, a user profile snippet at the bottom, and a sleek dark theme (bg-slate-900).
   - A Main Content Area with a light/gray background (bg-slate-50).
   - A Top Navbar inside the main content area with a search bar, notification bell, and breadcrumbs.
3. Dashboard Content:
   - A row of 4 KPI/Stat Cards (e.g., Total Revenue, Active Users). Incorporate small trend indicators (e.g., "+12% ↑" in green).
   - A main "Recent Activity" or "Recent Transactions" Table. Ensure the table is responsive, has a clean white background, rounded corners, subtle shadow, and stylized status badges (e.g., 'Completed' in green-100/green-800, 'Pending' in yellow).
4. Aesthetics:
   - Font: Use 'Inter' via Google Fonts.
   - Buttons and interactive elements must have clear hover states.
   - Use rounded-xl or rounded-2xl for modern, soft corners.
5. Return ONLY the complete, working HTML code starting with <!DOCTYPE html>.`,
  },
];

const SUB_PROMPTS: PromptData[] = [
  {
    id: 'sub-aesthetic',
    title: 'Sub-Prompt: The "Apple-Like" Premium Redesign',
    description: 'Push an existing design to look like a high-tier tech company website. Paste this AFTER your first generation.',
    icon: <ColorLensIcon sx={{ fontSize: 28, color: '#8b5cf6' }} />,
    prompt: `Redesign the current UI to have an 'Apple-like' premium aesthetic.

1. Change the background to a pure dark mode (e.g., bg-zinc-950 or bg-black).
2. Make text subtle (white and gray shades, no harsh pure whites for long text).
3. Add subtle 1px borders (border-white/10) to cards with radial gradients highlighting the top-left edges.
4. Keep the design minimalist, with lots of negative space.
5. Apply a subtle text-glow to the main header using CSS drop-shadow.
Return the updated complete HTML file.`,
  },
  {
    id: 'sub-animations',
    title: 'Sub-Prompt: Smooth JS Animations',
    description: 'Make the page feel alive with fluid scroll animations.',
    icon: <SpeedIcon sx={{ fontSize: 28, color: '#3b82f6' }} />,
    prompt: `Enhance the previous HTML with premium, fluid animations.

1. Add a Vanilla JavaScript intersection observer at the bottom of the <body>.
2. Have the Hero text fade-in and slide-up on load.
3. Make the Feature cards fade-in sequentially (staggered delay) as the user scrolls down the page.
4. Add interactive hover states to all buttons (scale up slightly).
Return the updated complete HTML file.`,
  },
  {
    id: 'sub-forms',
    title: 'Sub-Prompt: Interactive Forms & Logic',
    description: 'Turn static form fields into interactive elements with validation.',
    icon: <CodeIcon sx={{ fontSize: 28, color: '#10b981' }} />,
    prompt: `Add functional logic to the contact/signup form.

1. Improve the form UI with sleek input states (focus:ring-2, focus:border-transparent).
2. Write Vanilla JS to handle the form submission event.
3. Prevent default submission, show a spinning loading state on the button for 2 seconds.
4. Hide the form and show a beautifully designed "Success / Thank You" message box.
Return the updated complete HTML file.`,
  },
];

export default function CustomHtmlTour() {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderPromptCard = (item: PromptData) => (
    <Card
      key={item.id}
      elevation={0}
      sx={{
        bgcolor: item.isMaster ? 'rgba(15, 23, 42, 0.6)' : 'rgba(30, 41, 59, 0.5)',
        border: item.isMaster ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255,255,255,0.05)',
        borderRadius: 4,
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: item.isMaster ? '0 10px 40px -10px rgba(245, 158, 11, 0.15)' : 'none',
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, h: '100%', bgcolor: item.isMaster ? '#f59e0b' : '#3b82f6', width: 4 }} />
      
      <Box sx={{ p: { xs: 4, md: 5 } }}>
        <Box sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'flex-start' }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {item.icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: 20, md: 24 } }}>
                {item.title}
              </Typography>
              {item.isMaster && (
                <Chip 
                  label="MASTER PROMPT" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(245, 158, 11, 0.2)', 
                    color: '#fcd34d', 
                    fontWeight: 800, 
                    fontSize: 10,
                    letterSpacing: 1,
                    border: '1px solid rgba(245, 158, 11, 0.5)'
                  }} 
                />
              )}
            </Box>
            <Typography sx={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>
              {item.description}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 3,
              pt: 4,
              bgcolor: '#020617',
              borderRadius: 2,
              border: item.isMaster ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid rgba(255,255,255,0.1)',
              color: '#cbd5e1',
              fontSize: 14,
              fontFamily: '"Fira Code", "JetBrains Mono", monospace',
              whiteSpace: 'pre-wrap',
              overflowX: 'auto',
              lineHeight: 1.6
            }}
          >
            {item.prompt}
          </Box>
          <Tooltip title={copiedId === item.id ? "Copied!" : "Copy Prompt"}>
            <IconButton
              onClick={() => handleCopy(item.id, item.prompt)}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                bgcolor: 'rgba(255,255,255,0.1)',
                color: copiedId === item.id ? '#4ade80' : '#fff',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                transition: 'all 0.2s ease',
              }}
            >
              {copiedId === item.id ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', color: '#f8fafc', pb: 12 }}>
      {/* Top Bar */}
      <Box sx={{ py: 2.5, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, bgcolor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <Button
          startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
          onClick={() => router.push('/templates')}
          sx={{
            color: '#cbd5e1',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: 14,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff' }
          }}
        >
          Back to Templates
        </Button>
        <Typography sx={{ color: '#cbd5e1', fontWeight: 600, fontSize: 14, letterSpacing: 1 }}>
          PROMPT ENGINEERING TOUR
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 10 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 2, 
            borderRadius: '20px', 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            mb: 3
          }}>
            <AutoAwesomeIcon sx={{ fontSize: 40, color: '#c084fc' }} />
          </Box>
          <Typography variant="h2" sx={{ 
            fontWeight: 900, 
            fontSize: { xs: 36, md: 52 }, 
            mb: 3,
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1
          }}>
            Master Custom HTML
          </Typography>
          <Typography sx={{ color: '#94a3b8', fontSize: { xs: 16, md: 18 }, maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            The Custom HTML block gives you infinite design freedom. Use these expertly crafted prompts with an AI assistant, then copy the generated code directly into the Squpage editor!
          </Typography>
        </Box>

        {/* AI Recommendations Section */}
        <Card sx={{ 
          bgcolor: 'rgba(99, 102, 241, 0.05)', 
          border: '1px solid rgba(99, 102, 241, 0.2)', 
          borderRadius: 4, 
          p: { xs: 4, md: 5 },
          mb: 10
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <SmartToyIcon sx={{ color: '#818cf8', fontSize: 32 }} />
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontSize: 24 }}>
              Which AI Tool is Best for This?
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ p: 3, border: '1px solid rgba(220, 194, 150, 0.3)', bgcolor: 'rgba(220, 194, 150, 0.05)', borderRadius: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ color: '#fcd34d', fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarsIcon fontSize="small" /> 1st Choice: Claude 3.7 Sonnet
                </Typography>
                <Typography sx={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
                  <strong>Highly Recommended.</strong> Claude (by Anthropic) is the undisputed king of frontend code generation. It perfectly understands Tailwind CSS, writes clean semantic HTML, and creates beautiful designs with excellent typography and spacing out of the box. 
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ p: 3, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                  2nd Choice: ChatGPT (GPT-4o)
                </Typography>
                <Typography sx={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                  A solid alternative. GPT-4o is fast and can follow the instructions well, but you may occasionally need to ask it to fix missing Tailwind styling or script tags. Gemini 2.0 Pro also works great for logic-heavy dashboards.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* Master Prompts Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, fontSize: 32, mb: 2 }}>
            Phase 1: The Master Prompts
          </Typography>
          <Typography sx={{ color: '#94a3b8', fontSize: 16, mb: 5, maxWidth: 800 }}>
            Start new chat. Copy and paste ONE of these master prompts to generate your entire foundation in one go. You must replace the [BRACKETED] text with your actual product details before sending!
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {MASTER_PROMPTS.map((item) => renderPromptCard(item))}
          </Box>
        </Box>

        <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', mb: 10 }} />

        {/* Sub Prompts Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, fontSize: 32, mb: 2 }}>
            Phase 2: Refinement & Polish
          </Typography>
          <Typography sx={{ color: '#94a3b8', fontSize: 16, mb: 5, maxWidth: 800 }}>
            After the AI generates the initial page, do NOT start a new chat. Reply to the AI with these sub-prompts to iterate, refine, and add premium features to your code.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {SUB_PROMPTS.map((item) => renderPromptCard(item))}
          </Box>
        </Box>

        {/* Closing CTA */}
        <Box sx={{ textAlign: 'center', mt: 10, p: { xs: 4, md: 8 }, borderRadius: 6, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, mb: 3, fontSize: { xs: 24, md: 36 } }}>
            Ready to Build Your Custom Page?
          </Typography>
          <Typography sx={{ color: '#e2e8f0', mb: 5, maxWidth: 600, mx: 'auto', fontSize: 18, lineHeight: 1.6 }}>
            Paste these prompts into Claude or ChatGPT, copy the HTML it generates, and drop it directly into our live Custom HTML editor.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/editor?template=custom-html')}
            sx={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              '&:hover': { background: 'linear-gradient(135deg, #4f46e5, #9333ea)', transform: 'scale(1.05)' },
              textTransform: 'none',
              fontWeight: 700,
              py: 2.5,
              px: { xs: 4, md: 8 },
              borderRadius: 4,
              fontSize: 18,
              boxShadow: '0 10px 30px -10px rgba(168, 85, 247, 0.6)',
              transition: 'all 0.3s ease',
            }}
          >
            Open HTML Editor 🚀
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
