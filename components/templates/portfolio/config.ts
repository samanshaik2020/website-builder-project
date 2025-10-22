export const portfolioConfig = {
  id: 'portfolio',
  name: 'Portfolio',
  category: 'Personal',
  description: 'Showcase your work and skills with a professional portfolio',
  thumbnail: '/portfolio-preview.png',
  editableFields: [
    { id: 'hero_name', type: 'text', label: 'Name', section: 'Hero' },
    { id: 'hero_title', type: 'text', label: 'Title', section: 'Hero' },
    { id: 'hero_description', type: 'text', label: 'Description', section: 'Hero' },
    { id: 'hero_cta', type: 'button', label: 'CTA Button', section: 'Hero' },
    { id: 'about_heading', type: 'text', label: 'About Heading', section: 'About' },
    { id: 'about_text', type: 'text', label: 'About Text', section: 'About' },
    { id: 'project_1_title', type: 'text', label: 'Project 1 Title', section: 'Projects' },
    { id: 'project_1_description', type: 'text', label: 'Project 1 Description', section: 'Projects' },
    { id: 'project_1_image', type: 'image', label: 'Project 1 Image', section: 'Projects' },
    { id: 'project_2_title', type: 'text', label: 'Project 2 Title', section: 'Projects' },
    { id: 'project_2_description', type: 'text', label: 'Project 2 Description', section: 'Projects' },
    { id: 'project_2_image', type: 'image', label: 'Project 2 Image', section: 'Projects' },
    { id: 'project_3_title', type: 'text', label: 'Project 3 Title', section: 'Projects' },
    { id: 'project_3_description', type: 'text', label: 'Project 3 Description', section: 'Projects' },
    { id: 'project_3_image', type: 'image', label: 'Project 3 Image', section: 'Projects' },
    { id: 'contact_heading', type: 'text', label: 'Contact Heading', section: 'Contact' },
    { id: 'contact_email', type: 'text', label: 'Email', section: 'Contact' },
    { id: 'contact_cta', type: 'button', label: 'Contact Button', section: 'Contact' },
  ],
} as const;

export type PortfolioConfig = typeof portfolioConfig;
