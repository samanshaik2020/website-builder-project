// Generate product fields dynamically
const generateProductFields = () => {
  const fields: Array<{ id: string; type: string; label: string }> = [];
  for (let i = 1; i <= 30; i++) {
    fields.push(
      { id: `product_${i}_image`, type: 'image', label: `Product ${i} Image` },
      { id: `product_${i}_discount`, type: 'text', label: `Product ${i} Discount` },
      { id: `product_${i}_name`, type: 'text', label: `Product ${i} Name` },
      { id: `product_${i}_price`, type: 'text', label: `Product ${i} Price` },
      { id: `product_${i}_cta`, type: 'button', label: `Product ${i} CTA` }
    );
  }
  return fields;
};

export const mobileShopConfig = {
  id: 'mobile-shop',
  name: 'Mobile Shop',
  description: 'E-commerce mobile phone listing page with 30 product cards, filters, and discount badges',
  category: 'ecommerce',
  thumbnail: '/mobile-shop.png',
  editableFields: [
    // Header
    { id: 'nav_brand', type: 'text', label: 'Brand Name' },
    { id: 'nav_link_1', type: 'text', label: 'Nav Link 1' },
    { id: 'nav_link_2', type: 'text', label: 'Nav Link 2' },
    { id: 'nav_link_3', type: 'text', label: 'Nav Link 3' },
    
    // Hero Section
    { id: 'hero_title', type: 'text', label: 'Hero Title' },
    { id: 'hero_description', type: 'text', label: 'Hero Description' },
    
    // Filter Buttons
    { id: 'filter_1', type: 'text', label: 'Filter 1' },
    { id: 'filter_2', type: 'text', label: 'Filter 2' },
    { id: 'filter_3', type: 'text', label: 'Filter 3' },
    
    // Products (30 items)
    ...generateProductFields(),
  ],
};
