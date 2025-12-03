export const flashSaleConfig = {
  id: 'flash-sale',
  name: 'Flash Sale Landing',
  description: 'High-converting flash sale landing page with countdown timer, urgency elements, and product showcase',
  category: 'product',
  thumbnail: '/flash-sale.png',
  editableFields: [
    // Top Banner
    { id: 'top_banner_text', type: 'text', label: 'Top Banner Text' },
    { id: 'top_banner_code', type: 'text', label: 'Discount Code' },
    
    // Hero Section
    { id: 'hero_title', type: 'text', label: 'Hero Title' },
    { id: 'hero_description', type: 'text', label: 'Hero Description' },
    { id: 'hero_timer_hours', type: 'text', label: 'Timer Hours' },
    { id: 'hero_timer_mins', type: 'text', label: 'Timer Minutes' },
    { id: 'hero_timer_secs', type: 'text', label: 'Timer Seconds' },
    { id: 'hero_cta', type: 'button', label: 'Hero CTA Button' },
    { id: 'hero_badge_1', type: 'text', label: 'Hero Badge 1' },
    { id: 'hero_badge_2', type: 'text', label: 'Hero Badge 2' },
    { id: 'hero_badge_3', type: 'text', label: 'Hero Badge 3' },
    { id: 'hero_image', type: 'image', label: 'Hero Product Image' },
    
    // Urgency Bar
    { id: 'urgency_bar_text', type: 'text', label: 'Urgency Bar Text' },
    
    // Quick Offers Section
    { id: 'offers_title', type: 'text', label: 'Offers Section Title' },
    { id: 'offer_1_title', type: 'text', label: 'Offer 1 Title' },
    { id: 'offer_1_description', type: 'text', label: 'Offer 1 Description' },
    { id: 'offer_2_title', type: 'text', label: 'Offer 2 Title' },
    { id: 'offer_2_description', type: 'text', label: 'Offer 2 Description' },
    { id: 'offer_3_title', type: 'text', label: 'Offer 3 Title' },
    { id: 'offer_3_description', type: 'text', label: 'Offer 3 Description' },
    
    // Product Benefits Section
    { id: 'benefits_title', type: 'text', label: 'Benefits Section Title' },
    { id: 'benefit_1_title', type: 'text', label: 'Benefit 1 Title' },
    { id: 'benefit_1_description', type: 'text', label: 'Benefit 1 Description' },
    { id: 'benefit_2_title', type: 'text', label: 'Benefit 2 Title' },
    { id: 'benefit_2_description', type: 'text', label: 'Benefit 2 Description' },
    { id: 'benefit_3_title', type: 'text', label: 'Benefit 3 Title' },
    { id: 'benefit_3_description', type: 'text', label: 'Benefit 3 Description' },
    { id: 'benefit_4_title', type: 'text', label: 'Benefit 4 Title' },
    { id: 'benefit_4_description', type: 'text', label: 'Benefit 4 Description' },
    
    // Detailed Features Section
    { id: 'features_title', type: 'text', label: 'Features Section Title' },
    { id: 'feature_1_image', type: 'image', label: 'Feature 1 Image' },
    { id: 'feature_1_title', type: 'text', label: 'Feature 1 Title' },
    { id: 'feature_1_description', type: 'text', label: 'Feature 1 Description' },
    { id: 'feature_1_bullet_1', type: 'text', label: 'Feature 1 Bullet 1' },
    { id: 'feature_1_bullet_2', type: 'text', label: 'Feature 1 Bullet 2' },
    { id: 'feature_2_image', type: 'image', label: 'Feature 2 Image' },
    { id: 'feature_2_title', type: 'text', label: 'Feature 2 Title' },
    { id: 'feature_2_description', type: 'text', label: 'Feature 2 Description' },
    { id: 'feature_2_bullet_1', type: 'text', label: 'Feature 2 Bullet 1' },
    { id: 'feature_2_bullet_2', type: 'text', label: 'Feature 2 Bullet 2' },
    
    // Gallery Section
    { id: 'gallery_title', type: 'text', label: 'Gallery Section Title' },
    { id: 'gallery_1', type: 'image', label: 'Gallery Image 1 (Large)' },
    { id: 'gallery_2', type: 'image', label: 'Gallery Image 2' },
    { id: 'gallery_3', type: 'image', label: 'Gallery Image 3' },
    { id: 'gallery_4', type: 'image', label: 'Gallery Image 4' },
    { id: 'gallery_5', type: 'image', label: 'Gallery Image 5' },
    
    // Stock & Pricing Section
    { id: 'stock_percentage', type: 'text', label: 'Stock Sold Percentage' },
    { id: 'stock_message', type: 'text', label: 'Stock Urgency Message' },
    { id: 'pricing_badge', type: 'text', label: 'Pricing Badge' },
    { id: 'pricing_label', type: 'text', label: 'Pricing Label' },
    { id: 'pricing_original', type: 'text', label: 'Original Price' },
    { id: 'pricing_sale', type: 'text', label: 'Sale Price' },
    { id: 'pricing_cta', type: 'button', label: 'Pricing CTA Button' },
    
    // Reviews Section
    { id: 'reviews_title', type: 'text', label: 'Reviews Section Title' },
    { id: 'reviews_subtitle', type: 'text', label: 'Reviews Subtitle' },
    { id: 'review_1_text', type: 'text', label: 'Review 1 Text' },
    { id: 'review_1_author', type: 'text', label: 'Review 1 Author' },
    { id: 'review_1_image', type: 'image', label: 'Review 1 Avatar' },
    { id: 'review_2_text', type: 'text', label: 'Review 2 Text' },
    { id: 'review_2_author', type: 'text', label: 'Review 2 Author' },
    { id: 'review_2_image', type: 'image', label: 'Review 2 Avatar' },
    { id: 'review_3_text', type: 'text', label: 'Review 3 Text' },
    { id: 'review_3_author', type: 'text', label: 'Review 3 Author' },
    { id: 'review_3_image', type: 'image', label: 'Review 3 Avatar' },
    
    // How It Works Section
    { id: 'how_it_works_title', type: 'text', label: 'How It Works Title' },
    { id: 'step_1_title', type: 'text', label: 'Step 1 Title' },
    { id: 'step_1_description', type: 'text', label: 'Step 1 Description' },
    { id: 'step_2_title', type: 'text', label: 'Step 2 Title' },
    { id: 'step_2_description', type: 'text', label: 'Step 2 Description' },
    { id: 'step_3_title', type: 'text', label: 'Step 3 Title' },
    { id: 'step_3_description', type: 'text', label: 'Step 3 Description' },
    
    // FAQ Section
    { id: 'faq_title', type: 'text', label: 'FAQ Section Title' },
    { id: 'faq_1_question', type: 'text', label: 'FAQ 1 Question' },
    { id: 'faq_1_answer', type: 'text', label: 'FAQ 1 Answer' },
    { id: 'faq_2_question', type: 'text', label: 'FAQ 2 Question' },
    { id: 'faq_2_answer', type: 'text', label: 'FAQ 2 Answer' },
    { id: 'faq_3_question', type: 'text', label: 'FAQ 3 Question' },
    { id: 'faq_3_answer', type: 'text', label: 'FAQ 3 Answer' },
    
    // Footer
    { id: 'footer_cta_title', type: 'text', label: 'Footer CTA Title' },
    { id: 'footer_cta_button', type: 'button', label: 'Footer CTA Button' },
    { id: 'footer_link_1', type: 'text', label: 'Footer Link 1' },
    { id: 'footer_link_2', type: 'text', label: 'Footer Link 2' },
    { id: 'footer_link_3', type: 'text', label: 'Footer Link 3' },
    { id: 'footer_link_4', type: 'text', label: 'Footer Link 4' },
    { id: 'footer_copyright', type: 'text', label: 'Footer Copyright' },
  ],
};
