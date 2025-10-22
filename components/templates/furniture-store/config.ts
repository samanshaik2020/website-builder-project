export const furnitureStoreConfig = {
  id: 'furniture-store',
  name: 'Furniture Store',
  category: 'ecommerce',
  description: 'Modern furniture and bedding e-commerce store with product showcase',
  thumbnail: '/furniture-store.png',
  editableFields: [
    // Navigation
    { id: 'nav_brand', type: 'text', label: 'Brand Name' },
    { id: 'nav_link1', type: 'text', label: 'Nav Link 1' },
    { id: 'nav_link2', type: 'text', label: 'Nav Link 2' },
    { id: 'nav_link3', type: 'text', label: 'Nav Link 3' },
    { id: 'nav_link4', type: 'text', label: 'Nav Link 4' },
    
    // Hero
    { id: 'hero_badge', type: 'text', label: 'Hero Badge' },
    { id: 'hero_discount', type: 'text', label: 'Discount Amount' },
    { id: 'hero_discount_text', type: 'text', label: 'Discount Text' },
    { id: 'hero_title', type: 'text', label: 'Hero Title' },
    { id: 'hero_description', type: 'text', label: 'Hero Description' },
    { id: 'hero_cta', type: 'button', label: 'Hero CTA' },
    { id: 'hero_image', type: 'image', label: 'Hero Image' },
    
    // Beds Section
    { id: 'beds_title', type: 'text', label: 'Beds Section Title' },
    { id: 'beds_description', type: 'text', label: 'Beds Description' },
    
    // Bed Products (6 items)
    ...Array.from({ length: 6 }, (_, i) => [
      { id: `bed${i + 1}_image`, type: 'image', label: `Bed ${i + 1} Image` },
      { id: `bed${i + 1}_title`, type: 'text', label: `Bed ${i + 1} Title` },
      { id: `bed${i + 1}_price`, type: 'text', label: `Bed ${i + 1} Price` },
      { id: `bed${i + 1}_cta`, type: 'button', label: `Bed ${i + 1} CTA` },
    ]).flat(),
    
    // Bedding Section
    { id: 'bedding_title', type: 'text', label: 'Bedding Section Title' },
    { id: 'bedding_description', type: 'text', label: 'Bedding Description' },
    
    // Bedding Products (4 items)
    ...Array.from({ length: 4 }, (_, i) => [
      { id: `bedding${i + 1}_image`, type: 'image', label: `Bedding ${i + 1} Image` },
      { id: `bedding${i + 1}_title`, type: 'text', label: `Bedding ${i + 1} Title` },
      { id: `bedding${i + 1}_price`, type: 'text', label: `Bedding ${i + 1} Price` },
      { id: `bedding${i + 1}_cta`, type: 'button', label: `Bedding ${i + 1} CTA` },
    ]).flat(),
    
    // Pillows Section
    { id: 'pillows_title', type: 'text', label: 'Pillows Title' },
    { id: 'pillows_subtitle', type: 'text', label: 'Pillows Subtitle' },
    ...Array.from({ length: 8 }, (_, i) => ({
      id: `pillow${i + 1}_image`,
      type: 'image' as const,
      label: `Pillow ${i + 1} Image`,
    })),
    { id: 'pillows_cta', type: 'button', label: 'Pillows CTA' },
    
    // Instagram Section
    ...Array.from({ length: 3 }, (_, i) => [
      { id: `instagram${i + 1}_image`, type: 'image', label: `Instagram ${i + 1} Image` },
      { id: `instagram${i + 1}_handle`, type: 'text', label: `Instagram ${i + 1} Handle` },
    ]).flat(),
    
    // About Section
    { id: 'about_title', type: 'text', label: 'About Title' },
    { id: 'about_description', type: 'text', label: 'About Description' },
    
    // Footer
    { id: 'footer_brand', type: 'text', label: 'Footer Brand' },
    { id: 'footer_copyright', type: 'text', label: 'Footer Copyright' },
  ],
};
