'use client';

import React from 'react';
import { SlateEditableText } from '@/components/editor/slate-editable-text';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';

interface GadgetDealsTemplateProps {
  editable?: boolean;
  data?: Record<string, any>;
  onContentChange?: (elementId: string, value: any) => void;
}

const GadgetDealsTemplate: React.FC<GadgetDealsTemplateProps> = ({
  editable = false,
  data = {},
  onContentChange,
}) => {
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
    { name: 'VisionPro VR Headset', description: '4K Display · 120Hz Refresh', price: '$449', originalPrice: '$599', discount: '25% OFF' },
    { name: 'TechFit Smart Scale', description: 'Body Composition Analysis', price: '$45', originalPrice: '$65', discount: '30% OFF' },
    { name: 'AirPods Max Clone', description: 'Premium Sound · ANC', price: '$199', originalPrice: '$279', discount: '28% OFF' },
    { name: 'DroneX Pro 4K', description: '30min Flight · GPS Return', price: '$399', originalPrice: '$549', discount: '27% OFF' },
    { name: 'Gaming Mouse RGB', description: '16000 DPI · Wireless', price: '$59', originalPrice: '$89', discount: '33% OFF' },
    { name: 'Mechanical Keyboard', description: 'Cherry MX · RGB Backlit', price: '$129', originalPrice: '$169', discount: '23% OFF' },
    { name: 'Webcam 4K Pro', description: 'Auto Focus · Low Light', price: '$89', originalPrice: '$129', discount: '31% OFF' },
    { name: 'USB-C Hub 10-in-1', description: 'HDMI · SD Card · Ethernet', price: '$39', originalPrice: '$59', discount: '33% OFF' },
    { name: 'Wireless Charger Pad', description: '15W Fast Charge · MagSafe', price: '$25', originalPrice: '$39', discount: '35% OFF' },
    { name: 'Smart Home Hub', description: 'Alexa · Google · HomeKit', price: '$79', originalPrice: '$119', discount: '33% OFF' },
    { name: 'LED Desk Lamp', description: 'Wireless Charging · Touch', price: '$49', originalPrice: '$69', discount: '28% OFF' },
    { name: 'Portable SSD 1TB', description: 'USB 3.2 · 1050MB/s', price: '$89', originalPrice: '$129', discount: '31% OFF' },
    { name: 'Smart Doorbell Camera', description: '2K Video · Night Vision', price: '$99', originalPrice: '$149', discount: '33% OFF' },
    { name: 'Robot Vacuum Cleaner', description: 'LiDAR · Auto Empty', price: '$299', originalPrice: '$449', discount: '33% OFF' },
    { name: 'Air Purifier HEPA', description: 'Smart Sensor · Quiet Mode', price: '$149', originalPrice: '$199', discount: '25% OFF' },
    { name: 'Electric Toothbrush', description: 'Sonic · 5 Modes · Timer', price: '$49', originalPrice: '$79', discount: '37% OFF' },
    { name: 'Smart Thermostat', description: 'Energy Saving · App Control', price: '$129', originalPrice: '$179', discount: '27% OFF' },
    { name: 'Security Camera System', description: '4 Cameras · NVR · 2TB', price: '$299', originalPrice: '$449', discount: '33% OFF' },
  ];

  // Product images (cycle through these for variety)
  const productImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAIiIs8mg1OT0y8D-jr2tOwr_bWp6UvdF3R6duMgRiNsZ1foiYD805DltUYE62PikJOOIlSdQbSEJ2gDh66mZQx7TGM3XB4hc5c-2Ctw1UikOuCwsFDpKHSOx-UN05EcyVg-N6oCWDQZEwMYvvLeY4if_ftmLnbGRurB8F6GOBdFxPASZdCDm6rFvcb103KoSg1_ojXDxcf8ia2hXg21vPdARgbkqFeX-EJLc3pjyEbBzDhoaXHktbPUmHdFMD8FrycKaN9UdEGYAA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBX8SYtfnRlRKfw3s44AIZkfqlK4DDwXjSMdqthHqqGYOcTvYsVLF9vCNaHAp78YjFJUd-gbmM9bzYBUcLGE9gb13xxFJQd3jGuc1-vNXAcd_23ca6jHYKorQDyzgK_NiwxQESfz6YTTMK9UBAQ4mqzRJeGQUFxbSU16FEFtvsksvuHa7C7sEHPgxLlhV9oc0eAm4YSreTwB_knVzIVc4pCeF6HEel4i0YQlbsHq-FZzSe1jmQ_OqVlB4LbDjW9blGJDrLEfI1eo40',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDvxWSspAi-zTTLg05TY_PC-ME-zZ99bVUiqc8J1ExjY8nlInRAem3cV1Zklx8BXBeyPaXL-b0C-bkmGH_hTKqmqqJNxyPs64iUgrL1t_wJbhBQbNfUrJ-CC8nNSY731PvLkjVb6p9nwZ9aygHV8cHaDHxjm9aVUof72H5r1-m4cDQW9A9Uge1bsP5JnRQ911lNdZNQzwuEcqbrnPKBDwmLWvWjcWvXwwETWiYOkK45BnvnVqxg2iQLCm5UBnWrzsjBL5CaOU3IXHM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBUbAiqdM1ISDdviIUp0snyhHmgIQxCOWaWYfbToKdlRCv-HqLmR0BkdWQObwLKuQm7Y9qfbnvkjbRNZcR6ow-5zfsejpmSSo4duv195J5LULDI9bsiAsk3Gf45uMQr6-R2cGyDTjrSKYjGSojHb3wNj1NJpYDeKuk3NOP7XKq4fQGvrPbmAp1nyF0c8-ihLYluZVkOaVdLjeHK0VA6bwE51-CWuxYs1r5XwJb7Z_iHS3QMb6A3cJu2339UZGDBEjbVlFcYMREk1-s',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDAjgmWyaET_FCtm89ZKpwBspNaO9nkBb6k6eo8UZsrc1F2GEp34L0KF6iZuJnIB2t1NTonE0rPFRkoJh8YSOpbeVB_HhVEtRzFChHjdY4GVpNBXfy8meQxXHEi9f3wqsqc3JSpuUdn207VUcZIVEYeL846Fv-n8tIBoqaaxf9w_-HvC_i8D2HKuzMZC_n_7yNJxDj5MOjgyy5L78Ip-VeWlCLY7nTpshJNVuEMicBo4fHwX7u9HaRRcNBceoiQQTW5RUBG5ffbRME',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBy3NxO5HzIRNLU1prOXUlU22f8KwRJVbHP8adjUYxCTsM2pwhPrW3dPfNPOGCVCbz6vVdDl18aiRFp5meJXrEnWggxzC_Slp6EzxGHZ05FZWD-1JYDTO_T9BXwrWWStTjBVZ5_CqI2QmFoQ0XBTwciFu8f6WO6aOn99_am9FOoexqlugKWak5hx34YYcXzOQxcmdUaGG5w7EcPEyZB65VAkCOxDodYGzqeznTxqAJFRY3K2ceMmQPsQaBWAfI1nFGfVE9pxiTDvtI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCWTbdvYQ3XS30taZwKJrefzdidQFupxiZS_5iGVRU0rBEZoPf7gqH9k9-PmI2NSOKbOFl2J2Dq97QMHy4Kh5p5CwSEyIcS3W4cFd4usAn4LU8rXxu6X6VQ-RV84e90KJlEtEk5Yc7pyI1cg8FeIBahEVumdkhwA8QtKemt89xEIUkL2TvzkCihcTEi7-XJtHzeuxK5ZZ4kJkywvZJWyWSRBQSno0h9LxVQPde8NAIzG-7M_md8rR7VkjJ3mUoqgJvnkaBq_SyUOSE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZdAbEad6sAnc_ETmt8jaFZK_m8nX26vfI0qEhKblIE_oHr0riTeNqq1hTGIHkd0v7iD-xF5yZBi6fFgSX4rTC804iDlbTxybbL-w2CV7-urdDC6L7c37PN0n5RUbidbtH8bF6meKAH4IJHBkzZeMolnPHvlEfkaN-GuKRM03nErAzy8jIEmJ9nqZ4dPvEutfGSonVStPkUAa4_GJwIMwso_K53mXnBTt5XHNqpzgBv_rp2NMQldCqdAYh5hH8Sqj_-3uJxjOhdbc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuApmNAs0W73e55Go8sNURJ6ON35OBdaIjPeai_guY23rvSz6IpOzeXgJTRNl91GGz_f58ZUht3DO3LUAly5xDVlBmTzcboAB1VkZLYdfEWdgl8-aPwjq4tCU3UhuhABpXae8GPzPd4XicrYER2671VfT2ZHA6XKVsWfNMsdelXpjeYb3dC94a1Itvm9DFdGcEE7X-m4ftch9G3RoXrQ9gtGNOK3MSkeVSFjn_9i-bz1uOf-BZhk-huU0krzFtlr2u1rdCeqzlXfIqo',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB1FVvz4BpcNCxyStPqp4BAS8VG0X5j0pKNVESVh1_7Zv7aOCPewZQFuQevCbBhuYHHj2o9fGwPo70qhavhhGm5ya_SRafJZL0m8uRhIQ8WquwtnbD-cRN1tsIJTe7-e9LegaQclkAwGXCIUSp98h_oOr_AJVY0ZGckH66D4O_029LfGv_oOQ2z_pnfadl9-7yBTK8xFEzwtUdjeQhDiZI8MSYdaaotmwWZFUUU42Jdxhmykj5CwdbITpjiVZj5zQ6D4M6VCT15IvM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCb03XEwoPHhyjYl3XLyzO8qNAfUYggtNx0GWXPjZTWtLX5kuwIqkceMe2DvVYkTCezqlnMbgJSMl9Oa-Z8N4F5iHwJjcIBjX4xBrQvI8igN-5nvd7l87jTxD2c3o1rJshWZ21lrc2eINYJgf3ZRHyJUE884TV5sJmDT5q5uzToY0RQDAIaKcduppqiyrEtnEbHFC-kss8FRxzbwdIh8ik9UbmZJR6f_bu0r-D3AhUGKhmpZ8d5sV7St8dUEBZ3OjMm9E_vOBXgAHg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDSi0wlLqg7i9MUlCljuaFyAEQsuHGyhM7ExGQQ4eoviD_EFn5PESZ4NWHI2HjMgauqMOxF8B5Q3OpvPKFb9rWrHsbklNnNyDfwu5m2m_knLLKm3PebD-gDiLMLNUjzajuAW68Szeu9WDcWqRX2Sj3Xdu_8fiCmDJ_LreSWfgU1ONDPSSGmDdeY2Vcj-0k5bKYjHIauv7xzDo__Pvv8ola49W8_9Yf8us9VFwzZxb4jXt1D6dz0HNFIM9kgJ9SwexrYQmgd0eY0-jQ',
  ];

  // Default fallback image
  const fallbackImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIiIs8mg1OT0y8D-jr2tOwr_bWp6UvdF3R6duMgRiNsZ1foiYD805DltUYE62PikJOOIlSdQbSEJ2gDh66mZQx7TGM3XB4hc5c-2Ctw1UikOuCwsFDpKHSOx-UN05EcyVg-N6oCWDQZEwMYvvLeY4if_ftmLnbGRurB8F6GOBdFxPASZdCDm6rFvcb103KoSg1_ojXDxcf8ia2hXg21vPdARgbkqFeX-EJLc3pjyEbBzDhoaXHktbPUmHdFMD8FrycKaN9UdEGYAA';

  // Generate 30 products dynamically
  const products = Array.from({ length: 30 }, (_, i) => {
    const productData = defaultProductData[i] || { name: `Gadget ${i + 1}`, description: 'Premium Quality', price: '$99', originalPrice: '$149', discount: '33% OFF' };
    const defaultImg = productImages[i % productImages.length] ?? fallbackImage;
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
    <div className="font-['Inter',sans-serif] bg-[#f6f6f8] text-gray-900 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-center whitespace-nowrap border-b border-solid border-gray-200 bg-white sticky top-0 z-20 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-gray-900">
              <span className="material-symbols-outlined text-[#135bec] text-3xl">devices</span>
              <SlateEditableText
                eid="nav_brand"
                defaultText={getText('nav_brand', 'GadgetStore')}
                className="text-xl font-bold leading-tight tracking-[-0.015em]"
                editable={editable}
                onChange={handleTextChange}
              />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <SlateEditableText
                eid="nav_link_1"
                defaultText={getText('nav_link_1', 'Deals')}
                className="text-gray-800 text-sm font-medium leading-normal cursor-pointer hover:text-[#135bec]"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="nav_link_2"
                defaultText={getText('nav_link_2', 'New Arrivals')}
                className="text-gray-800 text-sm font-medium leading-normal cursor-pointer hover:text-[#135bec]"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="nav_link_3"
                defaultText={getText('nav_link_3', 'Categories')}
                className="text-gray-800 text-sm font-medium leading-normal cursor-pointer hover:text-[#135bec]"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="nav_link_4"
                defaultText={getText('nav_link_4', 'Support')}
                className="text-gray-800 text-sm font-medium leading-normal cursor-pointer hover:text-[#135bec]"
                editable={editable}
                onChange={handleTextChange}
              />
            </div>
          </div>
          <div className="flex flex-1 justify-end items-center gap-2">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-gray-800 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#135bec]/10">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-gray-800 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#135bec]/10">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-gray-800 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#135bec]/10">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-ba9q40n4A3azUV3DbJ7hnPsPT76CYEIJ3IZZg5q3jnC4jtzCXSsIrK6l7m9F_wYTyHQITA_y5lvYscMXbp369HtJU-fqow6WsCAChnDIXLp5g1-_KGFx93YvmzVCBegUy9sdvQufq0ql9LoQk7H6YSQqzS9oKq3VWNbkfuxnZ0_4sq-eBwEjokQ0wt79LRFe-QmepxMuoTx0cMGkvobnfxyAbwQgV2eYEvAdKD08Qjb665a-fgFy6LEcSSBO3eewqtaU9MkI0L4")' }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center py-5 sm:py-8 lg:py-12">
        <div className="flex flex-col max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
          {/* Hero Title */}
          <div className="flex flex-wrap justify-between items-baseline gap-4 mb-6">
            <SlateEditableText
              eid="hero_title"
              defaultText={getText('hero_title', 'Top Deals on Gadgets — Big Discounts Live!')}
              className="text-gray-900 text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em] min-w-72"
              editable={editable}
              onChange={handleTextChange}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 sm:gap-3 p-1 mb-6 sm:mb-8 overflow-x-auto">
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white shadow-sm pl-4 pr-3 hover:bg-gray-50 transition-colors">
              <SlateEditableText
                eid="filter_1"
                defaultText={getText('filter_1', 'Category')}
                className="text-gray-800 text-sm font-medium leading-normal"
                editable={editable}
                onChange={handleTextChange}
              />
              <span className="material-symbols-outlined text-gray-600 !text-xl">expand_more</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white shadow-sm pl-4 pr-3 hover:bg-gray-50 transition-colors">
              <SlateEditableText
                eid="filter_2"
                defaultText={getText('filter_2', 'Price')}
                className="text-gray-800 text-sm font-medium leading-normal"
                editable={editable}
                onChange={handleTextChange}
              />
              <span className="material-symbols-outlined text-gray-600 !text-xl">expand_more</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white shadow-sm pl-4 pr-3 hover:bg-gray-50 transition-colors">
              <SlateEditableText
                eid="filter_3"
                defaultText={getText('filter_3', 'Discount')}
                className="text-gray-800 text-sm font-medium leading-normal"
                editable={editable}
                onChange={handleTextChange}
              />
              <span className="material-symbols-outlined text-gray-600 !text-xl">expand_more</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white shadow-sm pl-4 pr-3 hover:bg-gray-50 transition-colors">
              <SlateEditableText
                eid="filter_4"
                defaultText={getText('filter_4', 'Popularity')}
                className="text-gray-800 text-sm font-medium leading-normal"
                editable={editable}
                onChange={handleTextChange}
              />
              <span className="material-symbols-outlined text-gray-600 !text-xl">expand_more</span>
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex flex-col gap-3 rounded-xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
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
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    <SlateEditableText
                      eid={product.discountId}
                      defaultText={getText(product.discountId, product.defaultDiscount)}
                      className="text-xs font-bold"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <SlateEditableText
                    eid={product.nameId}
                    defaultText={getText(product.nameId, product.defaultName)}
                    className="text-gray-900 text-base font-bold leading-normal"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                  <SlateEditableText
                    eid={product.descriptionId}
                    defaultText={getText(product.descriptionId, product.defaultDescription)}
                    className="text-gray-500 text-sm font-normal leading-normal"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                  <div className="flex items-baseline gap-2 mt-2">
                    <SlateEditableText
                      eid={product.priceId}
                      defaultText={getText(product.priceId, product.defaultPrice)}
                      className="text-gray-900 text-xl font-bold"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                    <SlateEditableText
                      eid={product.originalPriceId}
                      defaultText={getText(product.originalPriceId, product.defaultOriginalPrice)}
                      className="text-gray-400 text-sm font-normal leading-normal line-through"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                  <EditableButton
                    eid={product.ctaId}
                    defaultText={getButton(product.ctaId, 'Add to Cart').text}
                    defaultUrl={getButton(product.ctaId, 'Add to Cart').url}
                    className="w-full h-10 bg-[#135bec] text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors mt-3"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center p-4 mt-8">
            <a className="flex size-10 items-center justify-center text-gray-600 hover:text-[#135bec]" href="#">
              <span className="material-symbols-outlined">chevron_left</span>
            </a>
            <a className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-[#135bec]" href="#">1</a>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-800 rounded-full hover:bg-[#135bec]/10" href="#">2</a>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-800 rounded-full hover:bg-[#135bec]/10" href="#">3</a>
            <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-800 rounded-full">...</span>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-800 rounded-full hover:bg-[#135bec]/10" href="#">8</a>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-800 rounded-full hover:bg-[#135bec]/10" href="#">9</a>
            <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-800 rounded-full hover:bg-[#135bec]/10" href="#">10</a>
            <a className="flex size-10 items-center justify-center text-gray-600 hover:text-[#135bec]" href="#">
              <span className="material-symbols-outlined">chevron_right</span>
            </a>
          </div>
        </div>
      </main>

      {/* Material Symbols Font */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    </div>
  );
};

export default GadgetDealsTemplate;
