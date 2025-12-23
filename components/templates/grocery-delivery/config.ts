export const groceryDeliveryConfig = {
  id: 'grocery-delivery',
  name: 'Grocery Delivery',
  category: 'E-commerce',
  description: 'Modern grocery and food delivery service landing page',
  thumbnail: '/placeholder.jpg',
  editableFields: [
    { id: 'nav_logo', type: 'text', label: 'Logo Text', section: 'Navigation' },
    { id: 'nav_link_1', type: 'text', label: 'Nav Link 1', section: 'Navigation' },
    { id: 'nav_link_2', type: 'text', label: 'Nav Link 2', section: 'Navigation' },
    { id: 'nav_link_3', type: 'text', label: 'Nav Link 3', section: 'Navigation' },
    { id: 'nav_cta', type: 'button', label: 'Nav CTA', section: 'Navigation' },
    { id: 'logo', type: 'image', label: 'Logo', section: 'Hero' },
    { id: 'hero_background', type: 'image', label: 'Hero Background', section: 'Hero' },
    { id: 'hero_title', type: 'text', label: 'Hero Title', section: 'Hero' },
    { id: 'hero_subtitle', type: 'text', label: 'Hero Subtitle', section: 'Hero' },
    { id: 'hero_cta', type: 'button', label: 'Hero CTA', section: 'Hero' },
    { id: 'features_cta', type: 'button', label: 'Features CTA', section: 'Features' },
    { id: 'testimonials_title', type: 'text', label: 'Testimonials Title', section: 'Testimonials' },
    { id: 'footer_logo', type: 'image', label: 'Footer Logo', section: 'Footer' },
    { id: 'footer_copyright', type: 'text', label: 'Copyright', section: 'Footer' },
  ],
} as const;

export type GroceryDeliveryConfig = typeof groceryDeliveryConfig;
