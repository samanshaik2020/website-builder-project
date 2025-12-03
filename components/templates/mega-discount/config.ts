export const megaDiscountConfig = {
  id: 'mega-discount',
  name: 'Mega Discount Sale',
  description: 'Clean, modern flash sale landing page with lime green and cyan accents',
  category: 'product',
  thumbnail: '/Mega Discount Sale.png',
  editableFields: [
    // Flash Sale Banner
    { id: 'flash_banner_text', type: 'text', label: 'Flash Banner Text' },
    
    // Hero Section
    { id: 'hero_title', type: 'text', label: 'Hero Title' },
    { id: 'hero_description', type: 'text', label: 'Hero Description' },
    
    // Countdown Timer
    { id: 'timer_title', type: 'text', label: 'Timer Title' },
    { id: 'timer_days', type: 'text', label: 'Days' },
    { id: 'timer_hours', type: 'text', label: 'Hours' },
    { id: 'timer_minutes', type: 'text', label: 'Minutes' },
    { id: 'timer_seconds', type: 'text', label: 'Seconds' },
    
    // Key Features
    { id: 'features_title', type: 'text', label: 'Features Title' },
    { id: 'feature_1_label', type: 'text', label: 'Feature 1 Label' },
    { id: 'feature_1_value', type: 'text', label: 'Feature 1 Value' },
    { id: 'feature_2_label', type: 'text', label: 'Feature 2 Label' },
    { id: 'feature_2_value', type: 'text', label: 'Feature 2 Value' },
    { id: 'feature_3_label', type: 'text', label: 'Feature 3 Label' },
    { id: 'feature_3_value', type: 'text', label: 'Feature 3 Value' },
    { id: 'feature_4_label', type: 'text', label: 'Feature 4 Label' },
    { id: 'feature_4_value', type: 'text', label: 'Feature 4 Value' },
    
    // CTA Section
    { id: 'cta_button', type: 'button', label: 'CTA Button' },
    { id: 'cta_subtext', type: 'text', label: 'CTA Subtext' },
    
    // Product Image
    { id: 'product_image', type: 'image', label: 'Product Image' },
    { id: 'discount_badge', type: 'text', label: 'Discount Badge' },
  ],
};
