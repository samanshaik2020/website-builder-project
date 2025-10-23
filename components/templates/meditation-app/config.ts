export const meditationAppConfig = {
  id: 'meditation-app',
  name: 'Meditation App',
  category: 'App Landing',
  description: 'Beautiful meditation and sleep app landing page with features showcase',
  thumbnail: '/meditation-app.png',
  editableFields: [
    // Hero Section
    { id: 'hero_brand', type: 'text', label: 'Brand Name', section: 'Hero' },
    { id: 'hero_title', type: 'text', label: 'Hero Title', section: 'Hero' },
    { id: 'hero_description', type: 'text', label: 'Hero Description', section: 'Hero' },
    { id: 'hero_cta', type: 'button', label: 'Hero CTA', section: 'Hero' },
    { id: 'hero_app_preview', type: 'image', label: 'Hero App Preview Image', section: 'Hero' },
    
    // Features Section
    { id: 'features_title', type: 'text', label: 'Features Title', section: 'Features' },
    { id: 'features_app_image', type: 'image', label: 'Features App Image', section: 'Features' },
    { id: 'feature1_title', type: 'text', label: 'Feature 1 Title', section: 'Features' },
    { id: 'feature1_description', type: 'text', label: 'Feature 1 Description', section: 'Features' },
    { id: 'feature2_title', type: 'text', label: 'Feature 2 Title', section: 'Features' },
    { id: 'feature2_description', type: 'text', label: 'Feature 2 Description', section: 'Features' },
    { id: 'feature3_title', type: 'text', label: 'Feature 3 Title', section: 'Features' },
    { id: 'feature3_description', type: 'text', label: 'Feature 3 Description', section: 'Features' },
    { id: 'feature4_title', type: 'text', label: 'Feature 4 Title', section: 'Features' },
    { id: 'feature4_description', type: 'text', label: 'Feature 4 Description', section: 'Features' },
    { id: 'features_cta', type: 'button', label: 'Features CTA', section: 'Features' },
    
    // Sleep Stories Section
    { id: 'stories_title', type: 'text', label: 'Stories Title', section: 'Sleep Stories' },
    { id: 'stories_subtitle', type: 'text', label: 'Stories Subtitle', section: 'Sleep Stories' },
    { id: 'story_category', type: 'text', label: 'Story Category', section: 'Sleep Stories' },
    { id: 'story_author', type: 'text', label: 'Story Author', section: 'Sleep Stories' },
    { id: 'story_description', type: 'text', label: 'Story Description', section: 'Sleep Stories' },
    { id: 'story_narrator', type: 'text', label: 'Narrator Name', section: 'Sleep Stories' },
    { id: 'story_image', type: 'image', label: 'Story Image', section: 'Sleep Stories' },
    
    // Testimonials Section
    { id: 'testimonials_title', type: 'text', label: 'Testimonials Title', section: 'Testimonials' },
    { id: 'testimonial1_logo', type: 'text', label: 'Testimonial 1 Logo', section: 'Testimonials' },
    { id: 'testimonial1_text', type: 'text', label: 'Testimonial 1 Text', section: 'Testimonials' },
    { id: 'testimonial2_logo', type: 'text', label: 'Testimonial 2 Logo', section: 'Testimonials' },
    { id: 'testimonial2_text', type: 'text', label: 'Testimonial 2 Text', section: 'Testimonials' },
    { id: 'testimonial3_logo', type: 'text', label: 'Testimonial 3 Logo', section: 'Testimonials' },
    { id: 'testimonial3_text', type: 'text', label: 'Testimonial 3 Text', section: 'Testimonials' },
    
    // CTA Section
    { id: 'cta_button', type: 'button', label: 'CTA Button', section: 'CTA' },
    
    // Footer
    { id: 'footer_col1_title', type: 'text', label: 'Footer Column 1 Title', section: 'Footer' },
    { id: 'footer_col1_link1', type: 'text', label: 'Footer Link 1', section: 'Footer' },
    { id: 'footer_col1_link2', type: 'text', label: 'Footer Link 2', section: 'Footer' },
    { id: 'footer_col1_link3', type: 'text', label: 'Footer Link 3', section: 'Footer' },
    { id: 'footer_col1_link4', type: 'text', label: 'Footer Link 4', section: 'Footer' },
    { id: 'footer_col2_title', type: 'text', label: 'Footer Column 2 Title', section: 'Footer' },
    { id: 'footer_col2_link1', type: 'text', label: 'Footer Link 1', section: 'Footer' },
    { id: 'footer_col2_link2', type: 'text', label: 'Footer Link 2', section: 'Footer' },
    { id: 'footer_col2_link3', type: 'text', label: 'Footer Link 3', section: 'Footer' },
    { id: 'footer_col2_link4', type: 'text', label: 'Footer Link 4', section: 'Footer' },
    { id: 'footer_col3_title', type: 'text', label: 'Footer Column 3 Title', section: 'Footer' },
    { id: 'footer_col3_link1', type: 'text', label: 'Footer Link 1', section: 'Footer' },
    { id: 'footer_col3_link2', type: 'text', label: 'Footer Link 2', section: 'Footer' },
    { id: 'footer_col3_link3', type: 'text', label: 'Footer Link 3', section: 'Footer' },
    { id: 'footer_facebook', type: 'button', label: 'Facebook URL', section: 'Footer' },
    { id: 'footer_twitter', type: 'button', label: 'Twitter URL', section: 'Footer' },
    { id: 'footer_copyright', type: 'text', label: 'Copyright Text', section: 'Footer' },
  ],
} as const;

export type MeditationAppConfig = typeof meditationAppConfig;
