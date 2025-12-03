export const festivalSaleConfig = {
  id: 'festival-sale',
  name: 'Festival Sale Poster',
  description: 'High-impact festival sale product poster with countdown timer, urgency elements, and bold discounts',
  category: 'product',
  thumbnail: '/festival-sale.png',
  editableFields: [
    // Top Banner
    { id: 'top_banner_text', type: 'text', label: 'Top Banner Text' },
    
    // Hero Section
    { id: 'hero_title', type: 'text', label: 'Hero Title' },
    { id: 'hero_subtitle', type: 'text', label: 'Hero Subtitle' },
    { id: 'hero_image', type: 'image', label: 'Product Image' },
    { id: 'discount_percentage', type: 'text', label: 'Discount Percentage' },
    
    // Product Info
    { id: 'product_name', type: 'text', label: 'Product Name' },
    { id: 'product_tagline', type: 'text', label: 'Product Tagline' },
    
    // Features
    { id: 'feature_1_text', type: 'text', label: 'Feature 1 Text' },
    { id: 'feature_2_text', type: 'text', label: 'Feature 2 Text' },
    { id: 'feature_3_text', type: 'text', label: 'Feature 3 Text' },
    { id: 'feature_4_text', type: 'text', label: 'Feature 4 Text' },
    
    // CTA
    { id: 'cta_button', type: 'button', label: 'CTA Button' },
    { id: 'meta_text', type: 'text', label: 'Meta Text (delivery info)' },
    
    // Urgency Section
    { id: 'urgency_text', type: 'text', label: 'Urgency Text' },
    { id: 'timer_hours', type: 'text', label: 'Timer Hours' },
    { id: 'timer_minutes', type: 'text', label: 'Timer Minutes' },
    { id: 'timer_seconds', type: 'text', label: 'Timer Seconds' },
  ],
};
