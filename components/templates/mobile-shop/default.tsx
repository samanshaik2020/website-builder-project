'use client';


import { SlateEditableText } from '@/components/editor/slate-editable-text';
import { EditableButton } from '@/components/editor/editable-button';
import { EditableImage } from '@/components/editor/editable-image';

interface MobileShopTemplateProps {
  editable?: boolean;
  data?: Record<string, any>;
  onContentChange?: (elementId: string, value: any) => void;
}

function MobileShopTemplate({
  editable = false,
  data = {},
  onContentChange,
}: MobileShopTemplateProps) {
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

  const handleTextChange = (elementId: string, value: any) => {
    if (onContentChange) {
      onContentChange(elementId, value);
    }
  };

  const handleImageChange = (elementId: string, value: any) => {
    if (onContentChange) {
      onContentChange(elementId, value);
    }
  };

  // Default product data for 30 items
  const defaultProductData = [
    { name: 'Smartphone Pro X', price: '$799', discount: '15% OFF' },
    { name: 'Galaxy Z-Flip 12', price: '$999', discount: '20% OFF' },
    { name: 'Pixel 9 Ultra', price: '$849', discount: '10% OFF' },
    { name: 'AuraPhone Max', price: '$649', discount: '25% OFF' },
    { name: 'Nova T1', price: '$499', discount: '30% OFF' },
    { name: 'Quantum Edge', price: '$1199', discount: '10% OFF' },
    { name: 'Stellar P50', price: '$599', discount: '15% OFF' },
    { name: 'Zenith Z', price: '$749', discount: '20% OFF' },
    { name: 'Orbit X Pro', price: '$899', discount: '18% OFF' },
    { name: 'Fusion Elite', price: '$1099', discount: '12% OFF' },
    { name: 'Nexus Prime', price: '$679', discount: '22% OFF' },
    { name: 'Velocity V8', price: '$549', discount: '35% OFF' },
    { name: 'Eclipse Ultra', price: '$1299', discount: '8% OFF' },
    { name: 'Titan Max Pro', price: '$959', discount: '16% OFF' },
    { name: 'Pulse 5G', price: '$449', discount: '40% OFF' },
    { name: 'Horizon X1', price: '$799', discount: '20% OFF' },
    { name: 'Apex Plus', price: '$629', discount: '28% OFF' },
    { name: 'Storm Edge', price: '$879', discount: '14% OFF' },
    { name: 'Blaze Pro Max', price: '$1149', discount: '10% OFF' },
    { name: 'Spark Lite', price: '$349', discount: '45% OFF' },
    { name: 'Thunder X', price: '$699', discount: '25% OFF' },
    { name: 'Vortex Ultra', price: '$929', discount: '18% OFF' },
    { name: 'Radiant Pro', price: '$579', discount: '32% OFF' },
    { name: 'Cosmos Z', price: '$1049', discount: '12% OFF' },
    { name: 'Phoenix Rise', price: '$759', discount: '22% OFF' },
    { name: 'Matrix Neo', price: '$489', discount: '38% OFF' },
    { name: 'Infinity Edge', price: '$1199', discount: '15% OFF' },
    { name: 'Surge Pro', price: '$649', discount: '28% OFF' },
    { name: 'Nova Ultra', price: '$899', discount: '20% OFF' },
    { name: 'Zenith Pro Max', price: '$1399', discount: '10% OFF' },
  ];

  // Product images (cycle through these for variety)
  const productImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCBhuHLIPLOsU92_yMCVxS-z7pTtY6ROFbTyaABmgwOzzY7XIxKI9uc4yScgw6Pkc-iZ5PJiCphna_mg3mJaa0gOXvjr9_9HUsfeXeS6Vf0IEUvgOGNdh7EjaI4Z9W0mMfrOpcB9l4KUlP47DGmMNaKbEYWPkG1Rr57GTj_zpu5pMJoBSoT25PhVjrmwwkzH1ynOKb8Mgx3IEWsRBjB77huJgkKfOSNjN6U_croyx6z2OZrxi5Toj7e70ACH_gsaHo5UUh47fPqHw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB_nPNqnjNS2MICRX8--ijpnORrNDbm2HQ2q3fLVySuACgLSc7ixFPv7DAF85xlXIgSeNr26wYg_0B3MwyHjL357lrk4yx4HDViQzJVCLwZP1whaHL3uPKjb6U5APfLMzXp1alQ1vLf-8miT0UxrHfPSwNwRixe1XHkBB469sawuCJrVGL3MAcqxnv2kw_GDSEbTlFRzNvVjrqqHA5G6br9K1qKgZc-T7OdxtcA_5UMhPGZOaq17n0rDt8985qdyWs8adT2Vz-hAA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBGzu5hh3PmDlBfT3tZvg6y1yEwEyn9xppye8WEQssFaYW9A1LUIDWFtF588-QABIY8GyAw8uQrhEsM6V9-UIee8sgbl7UhILUOwvSrA6TJp40ZbPFK13zCTBSQIuEe7swZ_pp9mS-EXgpfajzU0kdaRAPg3ZmIe1-hlgA9k-4RkS9ntfMoCdmZRy5rz5ND8kmwQTjqpdcRxkbImaXq7f179csyiyU9wnu0vNRBXPMkgTSprmK6PjXjjdSCe5Mda4WgZMjFijurdg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBGuaDx0WU07_aSACatEzZIbjSkZYnJpW4Q7Vaez6cALrMPdfLXzPbj8npekeSC-F2mKn69cThqTfLJazRN77fs4vm6uFFudd_Gj74j5p6NYclnqMwJ0fdQMU8NcGFQa7w-UtoaOixVsV20CMDvmumd5eoe72KhE0-XD8xgCgv4nOyoxvWY8FOeoFAqZlYRFlfZV31cQA8FP2LJJM4lk4YYzrI0vvZi67sIChMNpqA872rniNfg7yNxDKYN3bYGp5oRvgFzcrUA6Q',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCq-ZVdQM6af_cFPmaxHO1_O8RnKqPmJJCCXJheDN4jpto6O87hwloXc4bBKt5JghtKD_HVb0YqOUhRssbLSifD8qW0rU3dcvdjBS-PWJ_Qsh4zrnYeoFgf3R5FHhKgll06jQTOEIIFbdOJzy4jzzb-KiMTlLxyRhbLzx1QXboYAmbfEsxV7Y2bJvUZWabIK_VqbbKQiqhVIuWWVdiOlo_xgWGNLVf40YAKtCCWNZH-SnBsCnBU2rCazebTQyt5uY4tWrSGx0u_Ew',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAhx5YQr9UqaMkKhsMpkCJ4JHIjpBm_5m5yBrmckWe15bkutzaQyuNtT-2k8Hk2ouASw1WJT6nJCr-7pVJ-dZc-hdDwx03cKc-6QMWVRs-D6cqn09Hd6mBdAn7YP389GLqqN-AVS8cXDznc__B0vICM5HrqCxXapYgaS_VyubtVxvoJ6vHvdrxNNQ0phN070IxHEN9aX0qTYLOcNnB85dECI1Ae71pb-1DEcuXvyrPZPzp3PyEjze7-0IJXJh9y4Le1xiKsVYBrgQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnmzmTJjX-4RMHjzA6HYeSlJB81WC6PiLA1NBEJeQK2zQnHU5LarCPyrwYZMXTdlPeF6-buqPxYAdGyFuvYg8jlSiiRj6-2oLWfXAFT6nVhNDuXpMc1tEf5GYrwBssGC45M799eYRRM8E9GKBd_hNZ--JM8DeA3pLGUH8cvB1qrt6Pz-TOSWinFHpJF_CJQfQ55sjWjXvwaczdrNCO4mNiZH3cYYLIVGZWT0I3xcq6ghfYVRqeIR__r1uxc27ZMpn7TDsgk8jMUQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuACneFm_ynOhmiYaaYCgKvm6i3ZPmZR8UaWBfxbCB1yA6skNfhOAjcRfZGveqHyW-JH2-3hV0VtHufGUFC65lHMp7HXzr_AVqNqpOYZaFqkPKGeokZI1iu2XFP3yZEDoXI7kgSey_zPeerUz6oYUM_38hG4lmj6dicGAPNR2xBOaA-JyRx1gVTn2WDLfIqQHwUs2ty9BhHiJ7pOZuLYoV95SeR4GMcUS9pWUR-CRjA3rYk4N9TNfbPvHZg9JbLkgvMbld999V8nQg',
  ];

  // Default fallback image
  const fallbackImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBhuHLIPLOsU92_yMCVxS-z7pTtY6ROFbTyaABmgwOzzY7XIxKI9uc4yScgw6Pkc-iZ5PJiCphna_mg3mJaa0gOXvjr9_9HUsfeXeS6Vf0IEUvgOGNdh7EjaI4Z9W0mMfrOpcB9l4KUlP47DGmMNaKbEYWPkG1Rr57GTj_zpu5pMJoBSoT25PhVjrmwwkzH1ynOKb8Mgx3IEWsRBjB77huJgkKfOSNjN6U_croyx6z2OZrxi5Toj7e70ACH_gsaHo5UUh47fPqHw';

  // Generate 30 products dynamically
  const products = Array.from({ length: 30 }, (_, i) => {
    const productData = defaultProductData[i] || { name: `Phone ${i + 1}`, price: '$599', discount: '15% OFF' };
    const defaultImg = productImages[i % productImages.length] ?? fallbackImage;
    return {
      id: i + 1,
      imageId: `product_${i + 1}_image`,
      discountId: `product_${i + 1}_discount`,
      nameId: `product_${i + 1}_name`,
      priceId: `product_${i + 1}_price`,
      ctaId: `product_${i + 1}_cta`,
      defaultImage: defaultImg,
      defaultDiscount: productData.discount,
      defaultName: productData.name,
      defaultPrice: productData.price,
    };
  });

  return (
    <div className="font-['Inter',sans-serif] bg-[#f6f7f8] text-[#111418] min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f2f4] px-4 sm:px-10 lg:px-20 py-3 bg-white">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-6 text-[#137fec]">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_330)">
                  <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fillRule="evenodd"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_330">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <SlateEditableText
              eid="nav_brand"
              defaultText={getText('nav_brand', 'MobileShop')}
              className="text-lg font-bold leading-tight tracking-[-0.015em] whitespace-pre-wrap break-words"
              editable={editable}
              onChange={handleTextChange}
            />
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center gap-4">
          <div className="hidden md:flex items-center gap-9">
            <SlateEditableText
              eid="nav_link_1"
              defaultText={getText('nav_link_1', 'Deals')}
              className="text-sm font-medium leading-normal cursor-pointer hover:text-[#137fec]"
              editable={editable}
              onChange={handleTextChange}
            />
            <SlateEditableText
              eid="nav_link_2"
              defaultText={getText('nav_link_2', 'New Arrivals')}
              className="text-sm font-medium leading-normal cursor-pointer hover:text-[#137fec]"
              editable={editable}
              onChange={handleTextChange}
            />
            <SlateEditableText
              eid="nav_link_3"
              defaultText={getText('nav_link_3', 'Best Sellers')}
              className="text-sm font-medium leading-normal cursor-pointer hover:text-[#137fec]"
              editable={editable}
              onChange={handleTextChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f6f7f8] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f6f7f8] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face")' }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col w-full flex-1">
          {/* Hero Section */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex w-full flex-col gap-3">
              <SlateEditableText
                eid="hero_title"
                defaultText={getText('hero_title', 'Top 50 Best-Selling Mobiles – Big Discounts Live!')}
                className="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em] whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="hero_description"
                defaultText={getText('hero_description', 'Explore our curated list of the best-selling phones with unbeatable discounts.')}
                className="text-[#617589] text-base font-normal leading-normal whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 p-3 overflow-x-auto">
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-[#f0f2f4] px-4 hover:bg-gray-50 transition-colors">
              <SlateEditableText
                eid="filter_1"
                defaultText={getText('filter_1', 'Brand')}
                className="text-sm font-medium leading-normal"
                editable={editable}
                onChange={handleTextChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-[#f0f2f4] px-4 hover:bg-gray-50 transition-colors">
              <SlateEditableText
                eid="filter_2"
                defaultText={getText('filter_2', 'Price Range')}
                className="text-sm font-medium leading-normal"
                editable={editable}
                onChange={handleTextChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-[#f0f2f4] px-4 hover:bg-gray-50 transition-colors">
              <SlateEditableText
                eid="filter_3"
                defaultText={getText('filter_3', 'Discount')}
                className="text-sm font-medium leading-normal"
                editable={editable}
                onChange={handleTextChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-3 pb-3 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
                  <EditableImage
                    eid={product.imageId}
                    defaultSrc={getImage(product.imageId, product.defaultImage)}
                    alt={getText(product.nameId, product.defaultName)}
                    className="w-full h-full object-cover"
                    editable={editable}
                    onChange={handleImageChange}
                  />
                  <div className="absolute top-3 right-3 bg-[#FF4500] text-white text-xs font-bold px-2 py-1 rounded-full">
                    <SlateEditableText
                      eid={product.discountId}
                      defaultText={getText(product.discountId, product.defaultDiscount)}
                      className="text-xs font-bold"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                </div>
                <div className="px-4 flex flex-col gap-3">
                  <div className="flex flex-col">
                    <SlateEditableText
                      eid={product.nameId}
                      defaultText={getText(product.nameId, product.defaultName)}
                      className="text-base font-bold leading-normal whitespace-pre-wrap break-words"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                    <SlateEditableText
                      eid={product.priceId}
                      defaultText={getText(product.priceId, product.defaultPrice)}
                      className="text-lg font-black text-[#FF4500] leading-normal whitespace-pre-wrap break-words"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                  <EditableButton
                    eid={product.ctaId}
                    defaultText={getButton(product.ctaId, 'Buy Now', '#').text}
                    defaultUrl={getButton(product.ctaId, 'Buy Now', '#').url}
                    className="w-full h-10 bg-[#137fec] text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center p-4">
            <a className="flex size-10 items-center justify-center text-[#111418]" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </a>
            <a className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-[#137fec]" href="#">1</a>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center rounded-full hover:bg-[#137fec]/20" href="#">2</a>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center rounded-full hover:bg-[#137fec]/20" href="#">3</a>
            <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center rounded-full">...</span>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center rounded-full hover:bg-[#137fec]/20" href="#">8</a>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center rounded-full hover:bg-[#137fec]/20" href="#">9</a>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center rounded-full hover:bg-[#137fec]/20" href="#">10</a>
            <a className="flex size-10 items-center justify-center" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MobileShopTemplate;
