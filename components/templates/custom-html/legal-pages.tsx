'use client';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
  InputLabel,
  FormControl,
} from '@mui/material';

// ─── Types & Defaults ────────────────────────────────────────────────────────

export interface LegalSettings {
  brandName: string;
  contactEmail: string;
  jurisdiction: string;
  siteType: 'affiliate' | 'health' | 'finance' | 'general';
  aboutUs: { useExternal: boolean; externalUrl: string; content: string };
  privacyPolicy: { useExternal: boolean; externalUrl: string; content: string };
  disclaimer: { useExternal: boolean; externalUrl: string; content: string };
  autoInjectLegal: boolean;
}

export const defaultLegalSettings: LegalSettings = {
  brandName: '',
  contactEmail: '',
  jurisdiction: '',
  siteType: 'general',
  aboutUs: { useExternal: false, externalUrl: '', content: '' },
  privacyPolicy: { useExternal: false, externalUrl: '', content: '' },
  disclaimer: { useExternal: false, externalUrl: '', content: '' },
  autoInjectLegal: false,
};

interface LegalPagesProps {
  legalSettings: LegalSettings;
  onSettingsChange: (settings: LegalSettings) => void;
  onInjectLegal: () => void;
}

// ─── Content Generator ───────────────────────────────────────────────────────

export function generateLegalContent(settings: LegalSettings): LegalSettings {
  const { brandName, contactEmail, jurisdiction, siteType } = settings;
  const brand = brandName || 'Our Company';
  const email = contactEmail || 'contact@example.com';
  const region = jurisdiction || 'the applicable jurisdiction';

  // ── About Us ───────────────────────────────────────────────────────────────

  let aboutUs = `Welcome to ${brand}. We are dedicated to providing high-quality content, resources, and services to our valued visitors and customers. Our mission is to deliver accurate, up-to-date information that helps you make informed decisions.\n\n`;
  aboutUs += `Founded with a commitment to excellence, ${brand} strives to be a trusted source in our industry. Our team of experienced professionals works diligently to research, curate, and present content that meets the highest standards of quality and reliability.\n\n`;
  aboutUs += `We believe in transparency, integrity, and putting our audience first. Every piece of content we publish is carefully reviewed to ensure it provides genuine value. We welcome feedback and are always looking for ways to improve our offerings.\n\n`;
  aboutUs += `If you have any questions, suggestions, or concerns, please do not hesitate to reach out to us at ${email}. We are based in ${region} and operate in compliance with all applicable local and international regulations.\n\n`;
  aboutUs += `Thank you for choosing ${brand}. We look forward to serving you and building a lasting relationship based on trust and mutual respect.`;

  // ── Privacy Policy ─────────────────────────────────────────────────────────

  let privacyPolicy = `Privacy Policy for ${brand}\nEffective Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;
  privacyPolicy += `At ${brand}, we take your privacy seriously. This Privacy Policy describes how we collect, use, store, and protect your personal information when you visit our website or use our services. By accessing or using our website, you agree to the terms outlined in this policy.\n\n`;
  privacyPolicy += `Information We Collect: We may collect personal information that you voluntarily provide to us, such as your name, email address, and any other details you submit through contact forms or account registration. We also automatically collect certain technical information, including your IP address, browser type, operating system, referring URLs, pages visited, and the dates and times of your visits. We may use cookies, web beacons, and similar tracking technologies to enhance your browsing experience and gather analytical data.\n\n`;
  privacyPolicy += `How We Use Your Information: The information we collect is used to operate, maintain, and improve our website and services; to respond to your inquiries and provide customer support; to send periodic communications such as newsletters or updates (with your consent); to analyze usage trends and optimize our content; and to comply with legal obligations and enforce our terms of service. We do not sell, trade, or rent your personal information to third parties. We may share aggregated, non-personally identifiable information with partners for analytical purposes.\n\n`;
  privacyPolicy += `Data Security and Retention: We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security. We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.\n\n`;
  privacyPolicy += `Your Rights: Depending on your location and applicable laws in ${region}, you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise these rights or for any privacy-related concerns, please contact us at ${email}.\n\n`;
  privacyPolicy += `Changes to This Policy: We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with a revised effective date. We encourage you to review this policy periodically.`;

  // ── Disclaimer ─────────────────────────────────────────────────────────────

  let disclaimer = `Disclaimer for ${brand}\n\n`;
  disclaimer += `The information provided on this website is for general informational purposes only. While we strive to keep the content accurate and up to date, ${brand} makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this website.\n\n`;
  disclaimer += `Any reliance you place on such information is strictly at your own risk. In no event will ${brand} be liable for any loss or damage, including without limitation indirect or consequential loss or damage, arising out of or in connection with the use of this website.\n\n`;
  disclaimer += `This website may contain links to external websites that are not provided or maintained by ${brand}. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.\n\n`;
  disclaimer += `Every effort is made to keep the website running smoothly. However, ${brand} takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.\n\n`;
  disclaimer += `This disclaimer is governed by the laws of ${region}. If you have any questions regarding this disclaimer, please contact us at ${email}.`;

  // ── Site-Type Specific Additions ───────────────────────────────────────────

  if (siteType === 'affiliate') {
    const ftcDisclosure = `\n\nFTC Affiliate Disclosure: ${brand} participates in various affiliate marketing programs, which means we may earn commissions on qualifying purchases made through links on this website. These affiliate partnerships do not influence our editorial content, and we only recommend products and services that we genuinely believe provide value to our audience. The Federal Trade Commission (FTC) requires us to disclose these relationships. When you click on an affiliate link and make a purchase, we may receive a small commission at no additional cost to you. This compensation helps us maintain and improve our website. All opinions expressed on this site are our own and are not influenced by any affiliate relationships.`;
    aboutUs += ftcDisclosure;
    disclaimer += ftcDisclosure;
  }

  if (siteType === 'health') {
    const medicalDisclaimer = `\n\nMedical Disclaimer: The content on this website is provided for informational and educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. ${brand} does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on this site. If you think you may have a medical emergency, call your doctor, go to the nearest emergency department, or call emergency services immediately. Reliance on any information provided by ${brand} is solely at your own risk.`;
    aboutUs += medicalDisclaimer;
    disclaimer += medicalDisclaimer;
  }

  if (siteType === 'finance') {
    const financialDisclaimer = `\n\nFinancial Disclaimer: The content published on this website is for informational and educational purposes only and should not be construed as professional financial advice, investment recommendations, or an offer to buy or sell any securities or financial instruments. ${brand} is not a registered investment advisor, broker-dealer, or financial planner. All financial decisions should be made after conducting your own research and consulting with a licensed financial professional. Past performance of any investment is not indicative of future results. Investing involves risk, including the possible loss of principal. ${brand} shall not be held liable for any financial losses or damages arising from the use of information provided on this website. Always consider your individual financial situation, risk tolerance, and investment objectives before making any financial decisions.`;
    aboutUs += financialDisclaimer;
    disclaimer += financialDisclaimer;
  }

  return {
    ...settings,
    aboutUs: { ...settings.aboutUs, content: aboutUs },
    privacyPolicy: { ...settings.privacyPolicy, content: privacyPolicy },
    disclaimer: { ...settings.disclaimer, content: disclaimer },
  };
}

// ─── Footer HTML Builder ─────────────────────────────────────────────────────

export function buildLegalFooterHtml(settings: LegalSettings): string {
  const { aboutUs, privacyPolicy, disclaimer, brandName } = settings;
  const brand = brandName || 'Our Company';
  const year = new Date().getFullYear();

  const sections = [
    { id: 'about-us', label: 'About Us', config: aboutUs },
    { id: 'privacy-policy', label: 'Privacy Policy', config: privacyPolicy },
    { id: 'disclaimer', label: 'Disclaimer', config: disclaimer },
  ];

  const linkElements = sections
    .map((s) => {
      if (s.config.useExternal && s.config.externalUrl) {
        return `<a href="${s.config.externalUrl}" target="_blank" rel="noopener noreferrer" style="color:#e2e8f0;text-decoration:none;padding:0 12px;transition:color 0.2s;" onmouseover="this.style.color='#10b981'" onmouseout="this.style.color='#e2e8f0'">${s.label}</a>`;
      }
      return `<a href="#" onclick="openLegalModal('${s.id}');return false;" style="color:#e2e8f0;text-decoration:none;padding:0 12px;transition:color 0.2s;" onmouseover="this.style.color='#10b981'" onmouseout="this.style.color='#e2e8f0'">${s.label}</a>`;
    })
    .join('<span style="color:#475569;">|</span>');

  const modals = sections
    .filter((s) => !(s.config.useExternal && s.config.externalUrl))
    .map(
      (s) => `
  <div id="legal-modal-${s.id}" class="legal-modal-overlay" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;justify-content:center;align-items:center;">
    <div style="background:#ffffff;border-radius:12px;max-width:680px;width:90%;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 25px 50px rgba(0,0,0,0.3);position:relative;">
      <div style="padding:24px 28px 16px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
        <h2 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:22px;color:#1a1a2e;font-weight:700;">${s.label}</h2>
        <button onclick="closeLegalModal('${s.id}')" style="background:none;border:none;font-size:28px;color:#64748b;cursor:pointer;padding:0 4px;line-height:1;transition:color 0.2s;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#64748b'">&times;</button>
      </div>
      <div style="padding:20px 28px 28px;overflow-y:auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.7;color:#334155;white-space:pre-wrap;">${s.config.content}</div>
    </div>
  </div>`
    )
    .join('\n');

  return `<!-- Legal Footer - Auto Generated -->
<style>
  .legal-footer-bar { background:#1a1a2e; padding:20px 0; text-align:center; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; }
  .legal-footer-links { display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:4px; margin-bottom:10px; }
  .legal-footer-copy { color:#64748b; font-size:13px; margin:0; }
  .legal-modal-overlay { display:flex !important; }
  .legal-modal-overlay[style*="display:none"] { display:none !important; }
</style>

<footer class="legal-footer-bar">
  <div class="legal-footer-links">
    ${linkElements}
  </div>
  <p class="legal-footer-copy">&copy; ${year} ${brand}. All rights reserved.</p>
</footer>

${modals}

<script>
  function openLegalModal(id) {
    var modal = document.getElementById('legal-modal-' + id);
    if (modal) { modal.style.display = 'flex'; }
  }
  function closeLegalModal(id) {
    var modal = document.getElementById('legal-modal-' + id);
    if (modal) { modal.style.display = 'none'; }
  }
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList && e.target.classList.contains('legal-modal-overlay')) {
      e.target.style.display = 'none';
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var modals = document.querySelectorAll('.legal-modal-overlay');
      modals.forEach(function(m) { m.style.display = 'none'; });
    }
  });
</script>
<!-- /Legal Footer - Auto Generated -->`;
}

// ─── Standalone HTML Downloader ──────────────────────────────────────────────
export function downloadStandaloneHtml(title: string, content: string) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { color: #111; border-bottom: 1px solid #eaeaea; padding-bottom: 10px; }
    p { margin-bottom: 1em; }
    white-space: pre-wrap;
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div style="white-space: pre-wrap;">${content}</div>
</body>
</html>`;
  
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Theme Tokens ────────────────────────────────────────────────────────────

const theme = {
  bg: '#0f172a',
  card: '#1e293b',
  border: '#334155',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  accent: '#10b981',
  accentGradient: 'linear-gradient(135deg, #10b981, #059669)',
};

// ─── Section Config ──────────────────────────────────────────────────────────

const sectionConfigs: {
  key: 'aboutUs' | 'privacyPolicy' | 'disclaimer';
  label: string;
  icon: string;
}[] = [
  { key: 'aboutUs', label: 'About Us', icon: '🏢' },
  { key: 'privacyPolicy', label: 'Privacy Policy', icon: '🔒' },
  { key: 'disclaimer', label: 'Disclaimer', icon: '⚠️' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function LegalPages({
  legalSettings,
  onSettingsChange,
  onInjectLegal,
}: LegalPagesProps) {
  const handleFieldChange = (field: keyof LegalSettings, value: string) => {
    onSettingsChange({ ...legalSettings, [field]: value });
  };

  const handleSectionChange = (
    section: 'aboutUs' | 'privacyPolicy' | 'disclaimer',
    field: string,
    value: string | boolean
  ) => {
    onSettingsChange({
      ...legalSettings,
      [section]: { ...legalSettings[section], [field]: value },
    });
  };

  const handleGenerate = () => {
    const updated = generateLegalContent(legalSettings);
    onSettingsChange(updated);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      color: theme.text,
      backgroundColor: 'rgba(15,23,42,0.5)',
      '& fieldset': { borderColor: theme.border },
      '&:hover fieldset': { borderColor: theme.accent },
      '&.Mui-focused fieldset': { borderColor: theme.accent },
    },
    '& .MuiInputLabel-root': { color: theme.textMuted },
    '& .MuiInputLabel-root.Mui-focused': { color: theme.accent },
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            color: theme.text,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <span style={{ fontSize: 28 }}>📄</span> Legal Page Generator
        </Typography>
        <Typography variant="body2" sx={{ color: theme.textMuted, mt: 0.5 }}>
          Generate professional legal pages and inject them into your custom HTML
        </Typography>
      </Box>

      {/* ── Brand Settings Card ───────────────────────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 2,
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: theme.text, fontWeight: 600, mb: 2 }}
        >
          Brand Settings
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <TextField
            label="Brand Name"
            size="small"
            fullWidth
            value={legalSettings.brandName}
            onChange={(e) => handleFieldChange('brandName', e.target.value)}
            sx={inputSx}
          />
          <TextField
            label="Contact Email"
            size="small"
            fullWidth
            value={legalSettings.contactEmail}
            onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
            sx={inputSx}
          />
          <TextField
            label="Jurisdiction / Country"
            size="small"
            fullWidth
            value={legalSettings.jurisdiction}
            onChange={(e) => handleFieldChange('jurisdiction', e.target.value)}
            sx={inputSx}
          />
          <FormControl size="small" fullWidth sx={inputSx}>
            <InputLabel>Site Type</InputLabel>
            <Select
              value={legalSettings.siteType}
              label="Site Type"
              onChange={(e) =>
                handleFieldChange('siteType', e.target.value as string)
              }
              sx={{ color: theme.text }}
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="affiliate">Affiliate</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* ── Generate Button ───────────────────────────────────────────────── */}
      <Button
        fullWidth
        variant="contained"
        onClick={handleGenerate}
        sx={{
          background: theme.accentGradient,
          color: '#fff',
          fontWeight: 600,
          textTransform: 'none',
          py: 1.2,
          mb: 3,
          borderRadius: 2,
          fontSize: '0.95rem',
          '&:hover': {
            background: 'linear-gradient(135deg, #059669, #047857)',
          },
        }}
      >
        Generate Legal Content
      </Button>

      {/* ── Section Cards ─────────────────────────────────────────────────── */}
      {sectionConfigs.map(({ key, label, icon }) => {
        const section = legalSettings[key];
        return (
          <Paper
            key={key}
            elevation={0}
            sx={{
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: 2,
              p: 3,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.text,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <span>{icon}</span> {label}
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={section.useExternal}
                    onChange={(e) =>
                      handleSectionChange(key, 'useExternal', e.target.checked)
                    }
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.accent,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                        {
                          backgroundColor: theme.accent,
                        },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: theme.textMuted }}>
                    Use External URL
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            </Box>

            {section.useExternal ? (
              <TextField
                label="External URL"
                size="small"
                fullWidth
                placeholder="https://example.com/privacy-policy"
                value={section.externalUrl}
                onChange={(e) =>
                  handleSectionChange(key, 'externalUrl', e.target.value)
                }
                sx={inputSx}
              />
            ) : (
              <TextField
                label={`${label} Content`}
                size="small"
                fullWidth
                multiline
                rows={6}
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(key, 'content', e.target.value)
                }
                sx={inputSx}
              />
            )}
            
            {!section.useExternal && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={() => downloadStandaloneHtml(label, section.content)}
                  sx={{ color: theme.accent, borderColor: theme.accent, textTransform: 'none', '&:hover': { borderColor: '#059669', bgcolor: 'rgba(16, 185, 129, 0.1)' } }}
                >
                  Download as Standalone HTML
                </Button>
              </Box>
            )}
          </Paper>
        );
      })}

      {/* ── Inject Button ─────────────────────────────────────────────────── */}
      <Button
        fullWidth
        variant="contained"
        onClick={onInjectLegal}
        disabled={!legalSettings.brandName}
        sx={{
          background: legalSettings.brandName
            ? theme.accentGradient
            : undefined,
          color: '#fff',
          fontWeight: 600,
          textTransform: 'none',
          py: 1.2,
          mt: 1,
          mb: 1.5,
          borderRadius: 2,
          fontSize: '0.95rem',
          '&:hover': {
            background: legalSettings.brandName
              ? 'linear-gradient(135deg, #059669, #047857)'
              : undefined,
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(30,41,59,0.7)',
            color: 'rgba(148,163,184,0.5)',
          },
        }}
      >
        Inject Legal Footer into HTML
      </Button>

      {/* ── Auto Inject Toggle ────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={legalSettings.autoInjectLegal}
              onChange={(e) => handleFieldChange('autoInjectLegal', e.target.checked as unknown as string)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: theme.accent },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: theme.accent },
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: theme.text, fontWeight: 500 }}>
              Auto-inject legal footer on HTML upload
            </Typography>
          }
        />
      </Box>

      {/* ── Info Note ─────────────────────────────────────────────────────── */}
      <Typography
        variant="caption"
        sx={{
          color: theme.textMuted,
          display: 'block',
          textAlign: 'center',
          mt: 0.5,
        }}
      >
        Legal content is injected as a footer with popup modals before
        &lt;/body&gt;
      </Typography>
    </Box>
  );
}
