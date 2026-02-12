export const superClipsAIConfig = {
    id: 'super-clips-ai',
    name: 'SuperClipsAI',
    category: 'Landing Page',
    description: 'A sleek, dark-themed SaaS landing page for an AI video clipping tool with vibrant blue accents',
    thumbnail: '/SuperClipsAI.png',
    editableFields: [
        // Navbar
        { id: 'nav_brand', type: 'text', label: 'Brand Name', section: 'Navbar' },
        { id: 'nav_cta', type: 'button', label: 'Nav CTA Button', section: 'Navbar' },

        // Hero
        { id: 'hero_badge', type: 'text', label: 'Hero Badge', section: 'Hero' },
        { id: 'hero_headline', type: 'text', label: 'Hero Headline', section: 'Hero' },
        { id: 'hero_description', type: 'text', label: 'Hero Description', section: 'Hero' },
        { id: 'hero_cta_primary', type: 'button', label: 'Primary CTA', section: 'Hero' },
        { id: 'hero_cta_secondary', type: 'button', label: 'Secondary CTA', section: 'Hero' },
        { id: 'hero_social_proof', type: 'text', label: 'Hero Social Proof', section: 'Hero' },
        { id: 'hero_image', type: 'image', label: 'Hero Dashboard Image', section: 'Hero' },

        // Social Proof Strip
        { id: 'social_strip_heading', type: 'text', label: 'Social Proof Heading', section: 'Social Proof' },

        // Features (Pain vs Gain)
        { id: 'features_heading', type: 'text', label: 'Features Section Heading', section: 'Features' },
        { id: 'features_description', type: 'text', label: 'Features Section Description', section: 'Features' },
        { id: 'pain_title', type: 'text', label: 'Pain Card Title', section: 'Features' },
        { id: 'pain_1', type: 'text', label: 'Pain Point 1', section: 'Features' },
        { id: 'pain_2', type: 'text', label: 'Pain Point 2', section: 'Features' },
        { id: 'pain_3', type: 'text', label: 'Pain Point 3', section: 'Features' },
        { id: 'pain_4', type: 'text', label: 'Pain Point 4', section: 'Features' },
        { id: 'gain_title', type: 'text', label: 'Gain Card Title', section: 'Features' },
        { id: 'gain_1', type: 'text', label: 'Gain Point 1', section: 'Features' },
        { id: 'gain_2', type: 'text', label: 'Gain Point 2', section: 'Features' },
        { id: 'gain_3', type: 'text', label: 'Gain Point 3', section: 'Features' },
        { id: 'gain_4', type: 'text', label: 'Gain Point 4', section: 'Features' },

        // How It Works
        { id: 'hiw_heading', type: 'text', label: 'How It Works Heading', section: 'How It Works' },
        { id: 'hiw_step_1_title', type: 'text', label: 'Step 1 Title', section: 'How It Works' },
        { id: 'hiw_step_1_desc', type: 'text', label: 'Step 1 Description', section: 'How It Works' },
        { id: 'hiw_step_2_title', type: 'text', label: 'Step 2 Title', section: 'How It Works' },
        { id: 'hiw_step_2_desc', type: 'text', label: 'Step 2 Description', section: 'How It Works' },
        { id: 'hiw_step_3_title', type: 'text', label: 'Step 3 Title', section: 'How It Works' },
        { id: 'hiw_step_3_desc', type: 'text', label: 'Step 3 Description', section: 'How It Works' },

        // Use Cases
        { id: 'use_cases_heading', type: 'text', label: 'Use Cases Heading', section: 'Use Cases' },
        { id: 'use_case_1_title', type: 'text', label: 'Use Case 1 Title', section: 'Use Cases' },
        { id: 'use_case_1_desc', type: 'text', label: 'Use Case 1 Description', section: 'Use Cases' },
        { id: 'use_case_1_image', type: 'image', label: 'Use Case 1 Image', section: 'Use Cases' },
        { id: 'use_case_2_title', type: 'text', label: 'Use Case 2 Title', section: 'Use Cases' },
        { id: 'use_case_2_desc', type: 'text', label: 'Use Case 2 Description', section: 'Use Cases' },
        { id: 'use_case_2_image', type: 'image', label: 'Use Case 2 Image', section: 'Use Cases' },
        { id: 'use_case_3_title', type: 'text', label: 'Use Case 3 Title', section: 'Use Cases' },
        { id: 'use_case_3_desc', type: 'text', label: 'Use Case 3 Description', section: 'Use Cases' },
        { id: 'use_case_3_image', type: 'image', label: 'Use Case 3 Image', section: 'Use Cases' },

        // Testimonials
        { id: 'testimonials_heading', type: 'text', label: 'Testimonials Heading', section: 'Testimonials' },
        { id: 'testimonial_1_name', type: 'text', label: 'Testimonial 1 Name', section: 'Testimonials' },
        { id: 'testimonial_1_handle', type: 'text', label: 'Testimonial 1 Handle', section: 'Testimonials' },
        { id: 'testimonial_1_text', type: 'text', label: 'Testimonial 1 Text', section: 'Testimonials' },
        { id: 'testimonial_1_photo', type: 'image', label: 'Testimonial 1 Photo', section: 'Testimonials' },
        { id: 'testimonial_2_name', type: 'text', label: 'Testimonial 2 Name', section: 'Testimonials' },
        { id: 'testimonial_2_handle', type: 'text', label: 'Testimonial 2 Handle', section: 'Testimonials' },
        { id: 'testimonial_2_text', type: 'text', label: 'Testimonial 2 Text', section: 'Testimonials' },
        { id: 'testimonial_2_photo', type: 'image', label: 'Testimonial 2 Photo', section: 'Testimonials' },
        { id: 'testimonial_3_name', type: 'text', label: 'Testimonial 3 Name', section: 'Testimonials' },
        { id: 'testimonial_3_handle', type: 'text', label: 'Testimonial 3 Handle', section: 'Testimonials' },
        { id: 'testimonial_3_text', type: 'text', label: 'Testimonial 3 Text', section: 'Testimonials' },
        { id: 'testimonial_3_photo', type: 'image', label: 'Testimonial 3 Photo', section: 'Testimonials' },
        { id: 'testimonial_4_name', type: 'text', label: 'Testimonial 4 Name', section: 'Testimonials' },
        { id: 'testimonial_4_handle', type: 'text', label: 'Testimonial 4 Handle', section: 'Testimonials' },
        { id: 'testimonial_4_text', type: 'text', label: 'Testimonial 4 Text', section: 'Testimonials' },
        { id: 'testimonial_4_photo', type: 'image', label: 'Testimonial 4 Photo', section: 'Testimonials' },

        // Pricing
        { id: 'pricing_heading', type: 'text', label: 'Pricing Heading', section: 'Pricing' },
        { id: 'starter_name', type: 'text', label: 'Starter Plan Name', section: 'Pricing' },
        { id: 'starter_price', type: 'text', label: 'Starter Plan Price', section: 'Pricing' },
        { id: 'starter_desc', type: 'text', label: 'Starter Plan Description', section: 'Pricing' },
        { id: 'starter_cta', type: 'button', label: 'Starter CTA', section: 'Pricing' },
        { id: 'pro_name', type: 'text', label: 'Pro Plan Name', section: 'Pricing' },
        { id: 'pro_price', type: 'text', label: 'Pro Plan Price', section: 'Pricing' },
        { id: 'pro_desc', type: 'text', label: 'Pro Plan Description', section: 'Pricing' },
        { id: 'pro_cta', type: 'button', label: 'Pro CTA', section: 'Pricing' },
        { id: 'agency_name', type: 'text', label: 'Agency Plan Name', section: 'Pricing' },
        { id: 'agency_price', type: 'text', label: 'Agency Plan Price', section: 'Pricing' },
        { id: 'agency_desc', type: 'text', label: 'Agency Plan Description', section: 'Pricing' },
        { id: 'agency_cta', type: 'button', label: 'Agency CTA', section: 'Pricing' },

        // FAQ
        { id: 'faq_heading', type: 'text', label: 'FAQ Heading', section: 'FAQ' },
        { id: 'faq_1_question', type: 'text', label: 'FAQ 1 Question', section: 'FAQ' },
        { id: 'faq_1_answer', type: 'text', label: 'FAQ 1 Answer', section: 'FAQ' },
        { id: 'faq_2_question', type: 'text', label: 'FAQ 2 Question', section: 'FAQ' },
        { id: 'faq_2_answer', type: 'text', label: 'FAQ 2 Answer', section: 'FAQ' },
        { id: 'faq_3_question', type: 'text', label: 'FAQ 3 Question', section: 'FAQ' },
        { id: 'faq_3_answer', type: 'text', label: 'FAQ 3 Answer', section: 'FAQ' },

        // Footer CTA
        { id: 'footer_cta_heading', type: 'text', label: 'Footer CTA Heading', section: 'Footer CTA' },
        { id: 'footer_cta_desc', type: 'text', label: 'Footer CTA Description', section: 'Footer CTA' },
        { id: 'footer_cta_button', type: 'button', label: 'Footer CTA Button', section: 'Footer CTA' },
        { id: 'footer_cta_note', type: 'text', label: 'Footer CTA Note', section: 'Footer CTA' },

        // Footer
        { id: 'footer_brand', type: 'text', label: 'Footer Brand', section: 'Footer' },
        { id: 'footer_copyright', type: 'text', label: 'Footer Copyright', section: 'Footer' },
    ],
} as const;

export type SuperClipsAIConfig = typeof superClipsAIConfig;
