export const saasLandingConfig = {
  id: 'saas-landing',
  name: 'SaaS Landing',
  category: 'Business',
  description: 'Modern landing page for SaaS products and services',
  thumbnail: '/saas-landing-preview.png',
  editableFields: [
    { id: 'hero_headline', type: 'text', label: 'Headline', section: 'Hero' },
    { id: 'hero_subheadline', type: 'text', label: 'Subheadline', section: 'Hero' },
    { id: 'hero_cta_primary', type: 'button', label: 'Primary CTA', section: 'Hero' },
    { id: 'hero_cta_secondary', type: 'button', label: 'Secondary CTA', section: 'Hero' },
    { id: 'features_heading', type: 'text', label: 'Features Heading', section: 'Features' },
    { id: 'feature_1_title', type: 'text', label: 'Feature 1 Title', section: 'Features' },
    { id: 'feature_1_description', type: 'text', label: 'Feature 1 Description', section: 'Features' },
    { id: 'feature_2_title', type: 'text', label: 'Feature 2 Title', section: 'Features' },
    { id: 'feature_2_description', type: 'text', label: 'Feature 2 Description', section: 'Features' },
    { id: 'feature_3_title', type: 'text', label: 'Feature 3 Title', section: 'Features' },
    { id: 'feature_3_description', type: 'text', label: 'Feature 3 Description', section: 'Features' },
    { id: 'pricing_heading', type: 'text', label: 'Pricing Heading', section: 'Pricing' },
    { id: 'pricing_plan_name', type: 'text', label: 'Plan Name', section: 'Pricing' },
    { id: 'pricing_plan_price', type: 'text', label: 'Plan Price', section: 'Pricing' },
    { id: 'pricing_plan_cta', type: 'button', label: 'Plan CTA', section: 'Pricing' },
    { id: 'cta_heading', type: 'text', label: 'CTA Heading', section: 'CTA' },
    { id: 'cta_button', type: 'button', label: 'CTA Button', section: 'CTA' },
  ],
} as const;

export type SaasLandingConfig = typeof saasLandingConfig;
