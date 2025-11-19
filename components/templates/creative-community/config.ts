export const creativeCommunityConfig = {
  id: 'creative-community',
  name: 'Creative Community Hub',
  category: 'Community',
  description: 'Vibrant community platform for creators to connect, collaborate, and monetize',
  thumbnail: '/creative-community.png',
  editableFields: [
    // Navigation
    { id: 'nav_brand', type: 'text', label: 'Brand Name', section: 'Navigation' },
    { id: 'nav_login_link', type: 'text', label: 'Login Link Text', section: 'Navigation' },
    { id: 'nav_cta', type: 'button', label: 'Nav CTA Button', section: 'Navigation' },
    
    // Hero Section
    { id: 'hero_title', type: 'text', label: 'Hero Title', section: 'Hero' },
    { id: 'hero_description', type: 'text', label: 'Hero Description', section: 'Hero' },
    { id: 'hero_cta_primary', type: 'button', label: 'Primary CTA', section: 'Hero' },
    { id: 'hero_cta_secondary', type: 'button', label: 'Secondary CTA', section: 'Hero' },
    
    // Features
    { id: 'feature1_title', type: 'text', label: 'Feature 1 Title', section: 'Features' },
    { id: 'feature1_description', type: 'text', label: 'Feature 1 Description', section: 'Features' },
    { id: 'feature2_title', type: 'text', label: 'Feature 2 Title', section: 'Features' },
    { id: 'feature2_description', type: 'text', label: 'Feature 2 Description', section: 'Features' },
    { id: 'feature3_title', type: 'text', label: 'Feature 3 Title', section: 'Features' },
    { id: 'feature3_description', type: 'text', label: 'Feature 3 Description', section: 'Features' },
    { id: 'feature4_title', type: 'text', label: 'Feature 4 Title', section: 'Features' },
    { id: 'feature4_description', type: 'text', label: 'Feature 4 Description', section: 'Features' },
    
    // Images
    { id: 'hero_image', type: 'image', label: 'Hero Image', section: 'Images' },
    { id: 'testimonial_avatar', type: 'image', label: 'Testimonial Avatar', section: 'Images' },
    
    // Testimonial
    { id: 'testimonial_quote', type: 'text', label: 'Testimonial Quote', section: 'Testimonial' },
    { id: 'testimonial_author', type: 'text', label: 'Testimonial Author', section: 'Testimonial' },
    
    // Stats
    { id: 'stats_text', type: 'text', label: 'Stats Text', section: 'Stats' },
  ],
} as const;

export type CreativeCommunityConfig = typeof creativeCommunityConfig;
