export const legalCenterConfig = {
  id: 'legal-center',
  name: 'Legal Center',
  description: 'Professional legal page with Terms of Service and Privacy Policy sections',
  category: 'legal',
  thumbnail: '/legal-center.png',
  editableFields: [
    // Navigation
    { id: 'nav_brand', type: 'text', label: 'Brand Name' },
    { id: 'nav_link_1', type: 'text', label: 'Nav Link 1' },
    { id: 'nav_link_2', type: 'text', label: 'Nav Link 2' },
    { id: 'nav_link_3', type: 'text', label: 'Nav Link 3' },
    { id: 'nav_link_4', type: 'text', label: 'Nav Link 4' },
    { id: 'nav_login_btn', type: 'button', label: 'Login Button' },
    { id: 'nav_signup_btn', type: 'button', label: 'Sign Up Button' },

    // Hero Section
    { id: 'hero_title', type: 'text', label: 'Page Title' },
    { id: 'hero_description', type: 'text', label: 'Page Description' },
    { id: 'hero_last_updated', type: 'text', label: 'Last Updated' },

    // Terms of Service
    { id: 'tos_title', type: 'text', label: 'ToS Section Title' },
    { id: 'tos_subtitle', type: 'text', label: 'ToS Section Subtitle' },
    { id: 'tos_section1_title', type: 'text', label: 'ToS Section 1 Title' },
    { id: 'tos_section1_content', type: 'text', label: 'ToS Section 1 Content' },
    { id: 'tos_section2_title', type: 'text', label: 'ToS Section 2 Title' },
    { id: 'tos_section2_content', type: 'text', label: 'ToS Section 2 Content' },
    { id: 'tos_section2_bullet1', type: 'text', label: 'ToS Section 2 Bullet 1' },
    { id: 'tos_section2_bullet2', type: 'text', label: 'ToS Section 2 Bullet 2' },
    { id: 'tos_section2_bullet3', type: 'text', label: 'ToS Section 2 Bullet 3' },
    { id: 'tos_section3_title', type: 'text', label: 'ToS Section 3 Title' },
    { id: 'tos_section3_content', type: 'text', label: 'ToS Section 3 Content' },

    // Privacy Policy
    { id: 'privacy_title', type: 'text', label: 'Privacy Section Title' },
    { id: 'privacy_subtitle', type: 'text', label: 'Privacy Section Subtitle' },
    { id: 'privacy_section1_title', type: 'text', label: 'Privacy Section 1 Title' },
    { id: 'privacy_section1_content1', type: 'text', label: 'Privacy Section 1 Content 1' },
    { id: 'privacy_section1_content2', type: 'text', label: 'Privacy Section 1 Content 2' },
    { id: 'privacy_section2_title', type: 'text', label: 'Privacy Section 2 Title' },
    { id: 'privacy_section2_content', type: 'text', label: 'Privacy Section 2 Content' },
    { id: 'privacy_section3_title', type: 'text', label: 'Privacy Section 3 Title' },
    { id: 'privacy_section3_content', type: 'text', label: 'Privacy Section 3 Content' },

    // CTA Section
    { id: 'cta_title', type: 'text', label: 'CTA Title' },
    { id: 'cta_description', type: 'text', label: 'CTA Description' },
    { id: 'cta_button', type: 'button', label: 'CTA Button' },

    // Footer
    { id: 'footer_copyright', type: 'text', label: 'Copyright Text' },
    { id: 'footer_link_1', type: 'text', label: 'Footer Link 1' },
    { id: 'footer_link_2', type: 'text', label: 'Footer Link 2' },
  ],
};
