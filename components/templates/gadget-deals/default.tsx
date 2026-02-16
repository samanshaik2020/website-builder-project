'use client';


import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { TiptapEditableText } from '@/components/editor/tiptap-editable-text';

interface GadgetDealsTemplateProps {
  editable?: boolean;
  data?: Record<string, any>;
  onContentChange?: (elementId: string, value: any) => void;
}

function GadgetDealsTemplate({
  editable = false,
  data = {},
  onContentChange,
}: GadgetDealsTemplateProps) {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string = '#') => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  const handleImageChange = (eid: string, data: { image: string; linkUrl?: string | undefined }) => {
    if (onContentChange) {
      onContentChange(eid, data);
    }
  };

  const handleTextChange = (eid: string, content: string) => {
    if (onContentChange) {
      onContentChange(eid, { text: content });
    }
  };

  // Default product data for 12 items (manageable number)
  const defaultProductData = [
    { name: 'Aura Wireless Headphones', description: 'Bluetooth 5.3 · 40hr Battery', price: '$149', originalPrice: '$199', discount: '25% OFF' },
    { name: 'Explorer Action Camera', description: '4K Video · Waterproof to 50m', price: '$255', originalPrice: '$300', discount: '15% OFF' },
    { name: 'Nova Smartwatch Series 8', description: '45mm Retina Display · GPS', price: '$359', originalPrice: '$399', discount: '10% OFF' },
    { name: 'SoundWave Portable Speaker', description: 'IP67 Waterproof · 12hr Playtime', price: '$69', originalPrice: '$99', discount: '30% OFF' },
    { name: 'Quantum Earbuds Pro', description: 'Active Noise Cancellation', price: '$119', originalPrice: '$149', discount: '20% OFF' },
    { name: 'PowerUp 20000mAh Bank', description: 'Dual USB-C Fast Charging', price: '$32', originalPrice: '$50', discount: '35% OFF' },
    { name: 'Zenith Over-Ear Headphones', description: 'Hi-Fi Audio · Premium Comfort', price: '$195', originalPrice: '$250', discount: '22% OFF' },
    { name: 'AquaShot Waterproof Camera', description: '20MP Sensor · Image Stabilization', price: '$287', originalPrice: '$350', discount: '18% OFF' },
    { name: 'PulseFit Smart Tracker', description: 'Heart Rate & SpO2 Monitor', price: '$89', originalPrice: '$119', discount: '25% OFF' },
    { name: 'MegaBlast Bluetooth Speaker', description: '360° Sound · Rich Bass', price: '$99', originalPrice: '$149', discount: '33% OFF' },
    { name: 'Stealth Noise-Cancelling Buds', description: 'Secure Fit · 8hr Battery', price: '$126', originalPrice: '$149', discount: '15% OFF' },
    { name: 'ChargeFast Power Bank', description: 'Slim Design · 18W PD Output', price: '$29', originalPrice: '$49', discount: '40% OFF' },
  ];

  // Product images
  const productImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
  ];

  // Generate 12 products dynamically
  const products = defaultProductData.map((productData, i) => {
    const defaultImg = productImages[i] ?? productImages[0]!;
    return {
      id: i + 1,
      imageId: `product_${i + 1}_image`,
      discountId: `product_${i + 1}_discount`,
      nameId: `product_${i + 1}_name`,
      descriptionId: `product_${i + 1}_description`,
      priceId: `product_${i + 1}_price`,
      originalPriceId: `product_${i + 1}_original_price`,
      ctaId: `product_${i + 1}_cta`,
      defaultImage: defaultImg,
      defaultDiscount: productData.discount,
      defaultName: productData.name,
      defaultDescription: productData.description,
      defaultPrice: productData.price,
      defaultOriginalPrice: productData.originalPrice,
    };
  });

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <TiptapEditableText
                eid="nav_brand"
                defaultText={getText('nav_brand', 'GadgetStore')}
                className="text-xl font-bold text-gray-900 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <TiptapEditableText
                eid="nav_link_1"
                defaultText={getText('nav_link_1', 'Deals')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
              <TiptapEditableText
                eid="nav_link_2"
                defaultText={getText('nav_link_2', 'New Arrivals')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
              <TiptapEditableText
                eid="nav_link_3"
                defaultText={getText('nav_link_3', 'Categories')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
              <TiptapEditableText
                eid="nav_link_4"
                defaultText={getText('nav_link_4', 'Support')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
            </nav>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Title */}
        <div className="mb-8">
          <TiptapEditableText
            eid="hero_title"
            defaultText={getText('hero_title', 'Top Deals on Gadgets — Big Discounts Live!')}
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 whitespace-pre-wrap break-words"
            editable={editable}
            onChange={handleTextChange}
            as="h1"
          />
          <TiptapEditableText
            eid="hero_subtitle"
            defaultText={getText('hero_subtitle', 'Shop the best tech deals before they\'re gone')}
            className="text-gray-600 whitespace-pre-wrap break-words"
            editable={editable}
            onChange={handleTextChange}
            as="p"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            <TiptapEditableText
              eid="filter_1"
              defaultText={getText('filter_1', 'Category')}
              className="text-sm font-medium text-gray-700"
              editable={editable}
              onChange={handleTextChange}
              as="span"
            />
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            <TiptapEditableText
              eid="filter_2"
              defaultText={getText('filter_2', 'Price')}
              className="text-sm font-medium text-gray-700"
              editable={editable}
              onChange={handleTextChange}
              as="span"
            />
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            <TiptapEditableText
              eid="filter_3"
              defaultText={getText('filter_3', 'Discount')}
              className="text-sm font-medium text-gray-700"
              editable={editable}
              onChange={handleTextChange}
              as="span"
            />
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            <TiptapEditableText
              eid="filter_4"
              defaultText={getText('filter_4', 'Popularity')}
              className="text-sm font-medium text-gray-700"
              editable={editable}
              onChange={handleTextChange}
              as="span"
            />
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden">
                <EditableImage
                  eid={product.imageId}
                  defaultSrc={getImage(product.imageId, product.defaultImage)}
                  alt={getText(product.nameId, product.defaultName)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  editable={editable}
                  onChange={handleImageChange}
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  <TiptapEditableText
                    eid={product.discountId}
                    defaultText={getText(product.discountId, product.defaultDiscount)}
                    editable={editable}
                    onChange={handleTextChange}
                    as="span"
                  />
                </div>
              </div>
              <div className="p-4">
                <TiptapEditableText
                  eid={product.nameId}
                  defaultText={getText(product.nameId, product.defaultName)}
                  className="font-bold text-gray-900 mb-1 whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
                <TiptapEditableText
                  eid={product.descriptionId}
                  defaultText={getText(product.descriptionId, product.defaultDescription)}
                  className="text-sm text-gray-500 mb-3 whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
                <div className="flex items-baseline gap-2 mb-4">
                  <TiptapEditableText
                    eid={product.priceId}
                    defaultText={getText(product.priceId, product.defaultPrice)}
                    className="text-xl font-bold text-gray-900"
                    editable={editable}
                    onChange={handleTextChange}
                    as="span"
                  />
                  <TiptapEditableText
                    eid={product.originalPriceId}
                    defaultText={getText(product.originalPriceId, product.defaultOriginalPrice)}
                    className="text-sm text-gray-400 line-through"
                    editable={editable}
                    onChange={handleTextChange}
                    as="span"
                  />
                </div>
                <EditableButton
                  eid={product.ctaId}
                  defaultText={getButton(product.ctaId, 'Add to Cart', '#').text}
                  defaultUrl={getButton(product.ctaId, 'Add to Cart', '#').url}
                  className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700">3</button>
          <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700">10</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default GadgetDealsTemplate;
