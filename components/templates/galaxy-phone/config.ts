export const galaxyPhoneConfig = {
  id: 'galaxy-phone',
  name: 'Galaxy Phone Product',
  description: 'Modern flagship phone product page with specs, reviews, and purchase options',
  category: 'product',
  thumbnail: '/Galaxy Phone.png',
  editableFields: [
    // Navigation
    { id: 'nav_brand', type: 'text', label: 'Brand Name' },
    { id: 'nav_link_1', type: 'text', label: 'Nav Link 1' },
    { id: 'nav_link_2', type: 'text', label: 'Nav Link 2' },
    { id: 'nav_link_3', type: 'text', label: 'Nav Link 3' },
    { id: 'nav_link_4', type: 'text', label: 'Nav Link 4' },
    
    // Hero Image Slider (4 images required)
    { id: 'hero_image_1', type: 'image', label: 'Slider Image 1 - Front View' },
    { id: 'hero_image_2', type: 'image', label: 'Slider Image 2 - Back View' },
    { id: 'hero_image_3', type: 'image', label: 'Slider Image 3 - Side View' },
    { id: 'hero_image_4', type: 'image', label: 'Slider Image 4 - Camera' },
    { id: 'hero_title', type: 'text', label: 'Product Title' },
    { id: 'hero_rating', type: 'text', label: 'Rating Score' },
    { id: 'hero_reviews_count', type: 'text', label: 'Reviews Count' },
    
    // Pricing
    { id: 'price_current', type: 'text', label: 'Current Price' },
    { id: 'price_original', type: 'text', label: 'Original Price' },
    { id: 'price_discount', type: 'text', label: 'Discount Percentage' },
    { id: 'price_savings', type: 'text', label: 'Savings Text' },
    
    // Color Options
    { id: 'color_label', type: 'text', label: 'Color Label' },
    { id: 'color_name', type: 'text', label: 'Selected Color Name' },
    
    // Storage Options
    { id: 'storage_label', type: 'text', label: 'Storage Label' },
    { id: 'storage_selected', type: 'text', label: 'Selected Storage' },
    { id: 'storage_option_1', type: 'text', label: 'Storage Option 1' },
    { id: 'storage_option_2', type: 'text', label: 'Storage Option 2' },
    { id: 'storage_option_3', type: 'text', label: 'Storage Option 3' },
    
    // CTA Buttons
    { id: 'cta_buy_now', type: 'button', label: 'Buy Now Button' },
    { id: 'cta_add_cart', type: 'button', label: 'Add to Cart Button' },
    
    // Quick Highlights
    { id: 'highlights_title', type: 'text', label: 'Highlights Section Title' },
    { id: 'highlight_1_title', type: 'text', label: 'Highlight 1 Title' },
    { id: 'highlight_1_description', type: 'text', label: 'Highlight 1 Description' },
    { id: 'highlight_2_title', type: 'text', label: 'Highlight 2 Title' },
    { id: 'highlight_2_description', type: 'text', label: 'Highlight 2 Description' },
    { id: 'highlight_3_title', type: 'text', label: 'Highlight 3 Title' },
    { id: 'highlight_3_description', type: 'text', label: 'Highlight 3 Description' },
    { id: 'highlight_4_title', type: 'text', label: 'Highlight 4 Title' },
    { id: 'highlight_4_description', type: 'text', label: 'Highlight 4 Description' },
    
    // Specifications
    { id: 'specs_title', type: 'text', label: 'Specs Section Title' },
    { id: 'spec_1_label', type: 'text', label: 'Spec 1 Label' },
    { id: 'spec_1_value', type: 'text', label: 'Spec 1 Value' },
    { id: 'spec_2_label', type: 'text', label: 'Spec 2 Label' },
    { id: 'spec_2_value', type: 'text', label: 'Spec 2 Value' },
    { id: 'spec_3_label', type: 'text', label: 'Spec 3 Label' },
    { id: 'spec_3_value', type: 'text', label: 'Spec 3 Value' },
    { id: 'spec_4_label', type: 'text', label: 'Spec 4 Label' },
    { id: 'spec_4_value', type: 'text', label: 'Spec 4 Value' },
    { id: 'spec_5_label', type: 'text', label: 'Spec 5 Label' },
    { id: 'spec_5_value', type: 'text', label: 'Spec 5 Value' },
    
    // Reviews Section
    { id: 'reviews_title', type: 'text', label: 'Reviews Section Title' },
    { id: 'reviews_rating', type: 'text', label: 'Overall Rating' },
    { id: 'reviews_total', type: 'text', label: 'Total Reviews Text' },
    { id: 'reviews_5_star', type: 'text', label: '5 Star Percentage' },
    { id: 'reviews_4_star', type: 'text', label: '4 Star Percentage' },
    { id: 'reviews_3_star', type: 'text', label: '3 Star Percentage' },
    { id: 'reviews_2_star', type: 'text', label: '2 Star Percentage' },
    { id: 'reviews_1_star', type: 'text', label: '1 Star Percentage' },
  ],
};
