export const superclipsConfig = {
    id: 'superclips',
    name: 'SuperClips AI',
    category: 'SaaS',
    description: 'Viral video creator landing page with dark mode aesthetic',
    thumbnail: '/SuperClips%20AI.png',
    editableFields: [
        { id: 'nav_logo', type: 'text', label: 'Logo Text', section: 'Navigation' },
        { id: 'nav_login', type: 'text', label: 'Login Text', section: 'Navigation' },
        { id: 'nav_signup', type: 'button', label: 'Sign Up Button', section: 'Navigation' },
        { id: 'hero_badge', type: 'text', label: 'Hero Badge', section: 'Hero' },
        { id: 'hero_headline', type: 'text', label: 'Headline', section: 'Hero' },
        { id: 'hero_subheadline', type: 'text', label: 'Subheadline', section: 'Hero' },
        { id: 'hero_cta', type: 'button', label: 'Primary CTA', section: 'Hero' },
        { id: 'hero_stats_virality', type: 'text', label: 'Virality Score', section: 'Hero' },
        { id: 'trusted_text', type: 'text', label: 'Trusted By Text', section: 'Social Proof' },
        { id: 'struggle_title', type: 'text', label: 'Struggle Section Title', section: 'Features' },
        { id: 'struggle_desc', type: 'text', label: 'Struggle Section Desc', section: 'Features' },
        { id: 'smart_title', type: 'text', label: 'Smart Way Title', section: 'Features' },
        { id: 'steps_title', type: 'text', label: 'Steps Title', section: 'How It Works' },
        { id: 'guarantee_title', type: 'text', label: 'Guarantee Title', section: 'Pricing' },
        { id: 'guarantee_text', type: 'text', label: 'Guarantee Text', section: 'Pricing' },
        { id: 'sticky_cta', type: 'button', label: 'Sticky CTA', section: 'Footer' },
    ],
} as const;

export type SuperClipsConfig = typeof superclipsConfig;
