// Generate product fields dynamically for 12 products
const generateProductFields = () => {
  const fields: Array<{ id: string; type: string; label: string }> = [];
  for (let i = 1; i <= 12; i++) {
    fields.push(
      { id: `product_${i}_image`, type: 'image', label: `Product ${i} Image` },
      { id: `product_${i}_discount`, type: 'text', label: `Product ${i} Discount` },
      { id: `product_${i}_name`, type: 'text', label: `Product ${i} Name` },
      { id: `product_${i}_description`, type: 'text', label: `Product ${i} Description` },
      { id: `product_${i}_price`, type: 'text', label: `Product ${i} Price` },
      { id: `product_${i}_original_price`, type: 'text', label: `Product ${i} Original Price` },
      { id: `product_${i}_cta`, type: 'button', label: `Product ${i} CTA` }
    );
  }
  return fields;
};

export const gadgetDealsConfig = {
  id: 'gadget-deals',
  name: 'Gadget Deals',
  description: 'E-commerce gadget deals listing page with product cards, filters, and discount badges',
  category: 'ecommerce',
  thumbnail: '/Gadget Deals.png',
  editableFields: [
    // Header
    { id: 'nav_brand', type: 'text', label: 'Brand Name' },
    { id: 'nav_link_1', type: 'text', label: 'Nav Link 1' },
    { id: 'nav_link_2', type: 'text', label: 'Nav Link 2' },
    { id: 'nav_link_3', type: 'text', label: 'Nav Link 3' },
    { id: 'nav_link_4', type: 'text', label: 'Nav Link 4' },
    // Hero
    { id: 'hero_title', type: 'text', label: 'Hero Title' },
    { id: 'hero_subtitle', type: 'text', label: 'Hero Subtitle' },
    // Filters
    { id: 'filter_1', type: 'text', label: 'Filter 1' },
    { id: 'filter_2', type: 'text', label: 'Filter 2' },
    { id: 'filter_3', type: 'text', label: 'Filter 3' },
    { id: 'filter_4', type: 'text', label: 'Filter 4' },
    // Products (12 items)
    ...generateProductFields(),
  ],
};
