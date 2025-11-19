export const generalContentConfig = {
  id: 'general-content',
  name: 'General Content Page',
  category: 'Content',
  description: 'Clean split-screen layout with image and text content, perfect for landing pages and content-focused pages',
  thumbnail: '/general-content.png',
  editableFields: [
    // Content
    { id: 'headline', type: 'text', label: 'Headline', section: 'Content' },
    { id: 'paragraph1', type: 'text', label: 'Paragraph 1', section: 'Content' },
    { id: 'paragraph2', type: 'text', label: 'Paragraph 2', section: 'Content' },
    { id: 'cta_button', type: 'button', label: 'CTA Button', section: 'Content' },
    
    // Image
    { id: 'hero_image', type: 'image', label: 'Hero Image', section: 'Image' },
  ],
} as const;

export type GeneralContentConfig = typeof generalContentConfig;
