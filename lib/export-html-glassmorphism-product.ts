export function generateGlassmorphismProductHTML(data: Record<string, any>): string {
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>${getText('product_title', 'AuraWave Speaker')} - ${getText('nav_brand', 'Glassify')}</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            "primary": "#3670e2",
          },
          fontFamily: {
            "display": ["Manrope", "sans-serif"]
          },
        },
      },
    }
  </script>
</head>
<body class="font-display bg-gradient-to-br from-orange-50 via-purple-50 to-cyan-50 text-[#0e121b]">
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
    <!-- Header -->
    <header class="sticky top-0 z-50 px-4 md:px-10 lg:px-20 py-3 backdrop-blur-md bg-white/30 border-b border-white/50">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3 text-[#0e121b]">
            <div class="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6_330)">
                  <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
                </g>
              </svg>
            </div>
            <h2 class="text-[#0e121b] text-xl font-bold tracking-tighter">${getText('nav_brand', 'Glassify')}</h2>
          </div>
          <nav class="hidden md:flex items-center gap-9">
            <a class="text-[#0e121b] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">${getText('nav_link_1', 'Shop')}</a>
            <a class="text-[#0e121b] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">${getText('nav_link_2', 'Collections')}</a>
            <a class="text-[#0e121b] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">${getText('nav_link_3', 'About Us')}</a>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <label class="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
            <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div class="text-slate-500 flex border-none bg-white/50 items-center justify-center pl-4 rounded-l-xl border-r-0">
                <span class="material-symbols-outlined">search</span>
              </div>
              <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e121b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white/50 h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search" value=""/>
            </div>
          </label>
          <a href="${getButton('nav_cta', 'Sign In').url}" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
            <span class="truncate">${getButton('nav_cta', 'Sign In').text}</span>
          </a>
          <button class="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-3 bg-white/50 text-[#0e121b] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/80 transition-colors">
            <span class="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
      </div>
    </header>

    <main class="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div class="flex w-full max-w-5xl flex-col items-center gap-8">
        <!-- Product Image Gallery -->
        <section class="w-full flex flex-col items-center gap-6 p-4 md:p-8 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
          <div class="relative w-full aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-lg overflow-hidden" style="background-image: url('${getImage('product_main_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkFx7ER4trLy1yHXohHVkUIRM8ZpGc3e8E6HlyEMeQZ6VQmcWS7W_Wu3v6q_hGaraWENwTJ47nr4J6i1T-tHqNcqUNxRKhDT-Caz-PldvUSG3jm3W0DMF_XuaKpT1ytsc5qOEG8HZ6Tq2VhAWnHOv13hhzio1ByipKAvkMoUueoWoQ30icslCclccMRNQipclzmgFzWfY3dVfPJQ2uO9wzXbITJxxn7YCTN5mNwObjUoj_i5_LtIsxRKz5VRKsxz8E_lLbW2z5K4AJ')}');">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="absolute top-4 right-4 flex items-center gap-2">
              <button class="grid place-content-center size-10 rounded-full bg-white/50 backdrop-blur-sm text-slate-800 hover:bg-white/80 transition-colors"><span class="material-symbols-outlined">zoom_in</span></button>
              <button class="grid place-content-center size-10 rounded-full bg-white/50 backdrop-blur-sm text-slate-800 hover:bg-white/80 transition-colors"><span class="material-symbols-outlined">autoplay</span></button>
            </div>
            <button class="absolute top-1/2 left-4 -translate-y-1/2 grid place-content-center size-10 rounded-full bg-white/50 backdrop-blur-sm text-slate-800 hover:bg-white/80 transition-colors"><span class="material-symbols-outlined">arrow_back_ios_new</span></button>
            <button class="absolute top-1/2 right-4 -translate-y-1/2 grid place-content-center size-10 rounded-full bg-white/50 backdrop-blur-sm text-slate-800 hover:bg-white/80 transition-colors"><span class="material-symbols-outlined">arrow_forward_ios</span></button>
          </div>
          
          <!-- Thumbnails -->
          <div class="w-full overflow-x-auto">
            <div class="flex items-stretch p-2 gap-4">
              <div class="flex-shrink-0 w-24 h-24 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer ring-2 ring-primary ring-offset-2 ring-offset-white/50 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg" style="background-image: url('${getImage('product_thumb_1', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5aSanECYlp-V-bUucBBX1nTlAUBGMOXKoTGL5eGzryh-D2VSouVeOzxuBxaWVBEcigi06sTbWkDBCPydqL42fQBkIplqkgSE5m5l82ZETdOUvWz6mta6slo4in8EQnt_VrdTi4fvTuEY8AKPfotBS3Ep4kOC9KotQnv9mEKDbTL43-oIWHvDt3YkW-xN6l1kL5bSkubXyrCWITk6p5xXh0dh9tzn3oTlJ2R5uI00rL6xDe3aEKxMJH36TnkKyBrFJ_cC1GBv9MZdv')}');"></div>
              <div class="flex-shrink-0 w-24 h-24 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer opacity-70 transition-all hover:opacity-100 hover:-translate-y-1 hover:shadow-lg" style="background-image: url('${getImage('product_thumb_2', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4Y5g7ATbrH9T6OtEft-UL5mkvm69s0RYaC6nWzSKIzMktTPeoJABV_TVp_gM1zYLmMu01X7HxXr7mQrSVVxCRPOFcww5J3ooJNHSnKtAWx3ANk2pJocAxVUmbRfpAWE-kHoA1zHDOXjz0w3Gvc6Ub_jmpPTGx-GeYkMsdpzHEH_HXSjuYEsHaIabFagBPMOvOd2rd90QjOqtySgIZ7If2Lg48qigMpOxhtJH0BxBDLxN72PdAn4GDRcy8JYXjQrcxGxgOQs7CgWX-')}');"></div>
              <div class="flex-shrink-0 w-24 h-24 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer opacity-70 transition-all hover:opacity-100 hover:-translate-y-1 hover:shadow-lg" style="background-image: url('${getImage('product_thumb_3', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1bxEv5ohqQyVRplMYHe4eO8mEw8f2oWbFQN7O6rkY58BhKaNY9pK40HT2rL4zK3SRk2nWaALkYmJLkMdROgWVSEePpWbe5ZfMsy9W18a6VTYv_XmOoy-To3OcSoJNZrf69KjQE1J3lCHLqdYzkm0Z8P86wgMRtDuz2yhDCTCpsjCB2RBtB5t0G0jkXmVJCrzYfshqFmNOYBeAIBkQeI10yENO3LH99jnw4aT5cZeg3nfsSSC26s6rZMloeGJwDmA8_o7kKO8SSKHN')}');"></div>
              <div class="flex-shrink-0 w-24 h-24 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer opacity-70 transition-all hover:opacity-100 hover:-translate-y-1 hover:shadow-lg" style="background-image: url('${getImage('product_thumb_4', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9UqMa5h9VYIceIzq8Xu3_cfjWelOZuyUtbVO5tE-cX9DspWau5fSMA5Gumf_A6bRB8QOQeMn_bIjUTQy3cmnlUDOdyzt1UA5uXpOum2K8xT_Or15FtFr1yt9M_XuwXW022RSF35vaizRPjX0zCG9YtrKqSgjauOZPug_abY53uQw6gKjddMqVD3muhyKYmQir_vaB8634VogvytAqLPOgU3x85eZIXT5M--xoTUcGPp7a6pJKAm0HcgosKKMrseowIUikUTlKCXzl')}');"></div>
              <div class="flex-shrink-0 w-24 h-24 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer opacity-70 transition-all hover:opacity-100 hover:-translate-y-1 hover:shadow-lg" style="background-image: url('${getImage('product_thumb_5', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj9OFWjMT7ymbkr_cl-P5BGyuLN5fruAp5ITyG6gaK69Tg-0GQy46KUPJ_Zzh4WcmFqjtYJ_dkRVlan1Nfy_DsMSpmWlvtL8rKzmO2wuPh_VC-WL5ZdhJ3gvhfV24RFmp_MfZ0HIufdBbcIU3mLvLfStbH9ym5NCIeDp1oq-gvqoiZM9R1mQ0uO3s387mhGBKTXOnar6QzWaTJO9YZU-PxkpyDYZI0vmnnCLHGyCwA4kqbuVttmts6T1G-iJ_noj9HONSmpGLsU6dO')}');"></div>
              <div class="flex-shrink-0 w-24 h-24 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer opacity-70 transition-all hover:opacity-100 hover:-translate-y-1 hover:shadow-lg" style="background-image: url('${getImage('product_thumb_6', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKgSybZ_yxO6rJJ3DxMP5qBmRlqgG11UhMWrLKq-3tLhkkvDyeKJ_6pd5RtuBxIIkcv5bSE8HGGbXc7TKyYZYJXDK1t2KuX9AXgKmJHFQlPJw3axYkezoFa3lXb341H3fME3Oj02YF-ctvk69-HJJJu3nweaDzOHSLt2r4ra5YVbieGN6WqyKfrZhr5MaYZF6VSQdsx0UyvbbPT-5ABCOkcnaqHg5iTy22g6jH-AIRVjrRjJaFi3t71OOtmhNHScI3auxUroWrXZJo')}');"></div>
              <div class="flex-shrink-0 w-24 h-24 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer opacity-70 transition-all hover:opacity-100 hover:-translate-y-1 hover:shadow-lg" style="background-image: url('${getImage('product_thumb_7', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMxpr4KH8EgHjJ4fi5dRg-xBA8SKgMy78R1z6nnEyGsNJDkb5vErrQ4YC0h0nKOjyqgfKkG15qI43hqD7jPOjCshheXZcR9mD89Yht7wy1zmybjRiYWiSevMo5QZ5n9TVrSyjOadjqwlYzIukoiX9Hh2hP7bImetZSFN9C14WSG9qzQdS-0KGRGAdE5Ybuz-ozQ-WY7Mj0dymT1mHh0t3444wC2qr8FJF-uwlq9yHDvJDEPFrZNl7Wl3Aa5JyM3Z04TxB_4LE7RRRI')}');"></div>
            </div>
          </div>
        </section>

        <!-- Product Info & CTAs -->
        <section class="w-full flex flex-col gap-6 p-4 md:p-8 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
          <div class="flex flex-col md:flex-row justify-between items-start gap-4">
            <div class="flex flex-col gap-2">
              <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-[#0e121b]">${getText('product_title', 'AuraWave Speaker')}</h1>
              <p class="text-slate-600">${getText('product_subtitle', 'Experience sound in its purest form. Visually stunning, acoustically brilliant.')}</p>
            </div>
            <div class="flex-shrink-0 text-3xl md:text-4xl font-bold text-primary">${getText('product_price', '$249.00')}</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Color Selection -->
            <div class="flex flex-col gap-4">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-700">${getText('color_label', 'Color')}</h3>
              <div class="flex items-center gap-3">
                <button class="size-9 rounded-full bg-slate-200 ring-2 ring-offset-2 ring-primary ring-offset-white/50"></button>
                <button class="size-9 rounded-full bg-slate-800"></button>
                <button class="size-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"></button>
                <button class="size-9 rounded-full bg-gradient-to-br from-pink-400 to-red-500"></button>
              </div>
            </div>
            <!-- Size Selection -->
            <div class="flex flex-col gap-4">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-700">${getText('size_label', 'Size')}</h3>
              <div class="flex items-center gap-3">
                <button class="px-4 py-2 rounded-lg border border-primary bg-primary/20 text-primary font-semibold text-sm">${getText('size_option_1', 'Standard')}</button>
                <button class="px-4 py-2 rounded-lg border border-slate-300 bg-white/50 text-slate-600 font-semibold text-sm">${getText('size_option_2', 'Mini')}</button>
              </div>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/60">
            <a href="${getButton('cta_primary', 'Add to Cart').url}" class="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-base font-bold shadow-lg hover:shadow-xl transition-shadow">
              <span class="truncate">${getButton('cta_primary', 'Add to Cart').text}</span>
            </a>
            <a href="${getButton('cta_secondary', 'Buy Now').url}" class="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-white/50 border border-primary text-primary text-base font-bold backdrop-blur-sm hover:bg-white/80 transition-colors">
              <span class="truncate">${getButton('cta_secondary', 'Buy Now').text}</span>
            </a>
          </div>

          <!-- Highlights -->
          <ul class="flex flex-col gap-2 pt-4 text-slate-700 text-sm">
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">check_circle</span> ${getText('highlight_1', '360° Immersive Sound')}</li>
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">check_circle</span> ${getText('highlight_2', '24-Hour Battery Life')}</li>
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">check_circle</span> ${getText('highlight_3', 'Bluetooth 5.2 & Ambient Lighting')}</li>
          </ul>
        </section>

        <!-- Detailed Info -->
        <section class="w-full flex flex-col gap-6 p-4 md:p-8 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
          <!-- Tabs -->
          <div class="border-b border-white/60">
            <nav class="-mb-px flex gap-6">
              <a class="whitespace-nowrap border-b-2 border-primary px-1 py-4 text-sm font-medium text-primary" href="#">${getText('tab_1', 'Description')}</a>
              <a class="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700" href="#">${getText('tab_2', 'Specifications')}</a>
              <a class="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700" href="#">${getText('tab_3', 'Reviews')}</a>
              <a class="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700" href="#">${getText('tab_4', 'FAQ')}</a>
            </nav>
          </div>
          <div class="prose prose-slate max-w-none text-slate-700">
            <p>${getText('product_description', 'The AuraWave Speaker is not just a device; it\'s an experience. Crafted with a unique transparent casing, it reveals the intricate technology within. Our proprietary sound engine delivers crystal-clear highs and deep, resonant bass, filling any room with rich, multi-dimensional audio. Sync the ambient LED lights to your music for a mesmerizing visual spectacle that moves with the beat.')}</p>
          </div>
        </section>

        <!-- Gallery Section -->
        <section class="w-full flex flex-col gap-4 p-4 md:p-8 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
          <h2 class="text-2xl font-bold tracking-tight text-[#0e121b]">${getText('gallery_title', 'Gallery')}</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" style="background-image: url('${getImage('gallery_image_1', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKMTUcPJQIpjBw618VINL6-3vSHgBTRX-WZVokT5hctfIzSI9IpFEMxQkx0Eb6VmDuak4_UhPVU61brwySd0GEfdWct7zDHUDmP15cwy5s5pZKzmPNqHaGPVW8xR9Q5RZeBJnZB_mFlOIyixXrdaYE2fG5jcstHc4uYyVqPB-7JPRA5-QjXa66ybJwi2syjoKxsOt7BxWRDUICFouwPCb8fyKw7ZtHYQi7GjNvBjfxjOEqs01DCLcnz80BKsEqGD53WnwW_-_ibTTh')}');"></div>
            <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" style="background-image: url('${getImage('gallery_image_2', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPH5MKcQ0HSY526LNknBxtNe1iSc3zyFtLhsot8rPx2iWghH6d3U8EII5ZZqtmwTBVlCQSXmHt7I7YxemT2VTQqwCEE3ejAiLPSoIPghYD9csXK7kfCQpgFxvcwShSKjMLRkkBllexcrMwEi3OMCbK7_bOm4FBgfRpxhkMI7eAzHUrRHm0iWyXMAn50gucUxfIiajgKqpkArkEV3IBzKOeao1SfxGowzsCuE3WcSer5AWcDbaPSVJSgA27Ed7SsIIGD5Vvj2pB9KF4')}');"></div>
            <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" style="background-image: url('${getImage('gallery_image_3', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwQ_N9xn8E51ROWQhZIcPbcUutkK9r25_8fgtxeH8Mix8W-IrcU96-dFddf4XD3-1FS8UdxyzbeWLJNcz0gZZCOrPCWhX4Ewdu6V3xJy89SgO0LjrF1yXhlxT3g7yiUHQbgutOMIcjBDFILECp2shTZF-pcIgvmBz-G10ruzds5hXC-OHtooNolVZrr_kAsPFFS6hPoJvTjAukOppxp8Z9OmDCS8ShjLYrzIIWZvysZ3Eha31gGXaZe2ubVMUh9HbEWLibOG6--wTc')}');"></div>
            <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" style="background-image: url('${getImage('gallery_image_4', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKryVSHZJQ9fPzhEZlwHPn1Ao3f2g518OKI7g3JIdStYQY7kgrwdt1aAT3G3lOEfsJm1n9vMzGOrzJSX9iji9mUNt9wA62ml6_hugFjBIP5rlnAvDjElomHgLlJSM87oC3i5BHTwyVjEbmpkskF5cegJh0UGHrgCca5b981VPno8fM54aSZh2-GfpM6WApZZEQHZtGzML5Zoz8VNPnUpgxJvELmiR9oW6OBs1haYKpIOWaV0r47M_QchSCfKTrsW-DhKIroJj8nWYq')}');"></div>
          </div>
        </section>

        <!-- Reviews Section -->
        <section class="w-full flex flex-col gap-6 p-4 md:p-8 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
          <h2 class="text-2xl font-bold tracking-tight text-[#0e121b]">${getText('reviews_title', 'Customer Reviews')}</h2>
          <div class="flex flex-col gap-6">
            <!-- Review 1 -->
            <div class="flex flex-col sm:flex-row gap-4 border-b border-white/60 pb-6">
              <div class="flex-shrink-0 w-12 h-12 bg-center bg-no-repeat aspect-square bg-cover rounded-full" style="background-image: url('${getImage('review_1_avatar', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAajtCXcEKsFTvQ_gjDyWSDLVKP4udrMrS60EeXjRh62lmR_IT2P30gSYJL_srkTAJQ3zDjy_qCMqrz1NQIJfvqiUi-eLrioXGx2CQqwtln2UgPWyEhkG0r8AWYQw3KZHHUcOfGz85m0ubLJ3HmjADdr_JUewk6qxQ4dMfJC7N1q_AhuMQBGZuQXdvp_ODRvXdMgQVqSuxLPhkJc80cdbJOYX68_lyaLb54nHCgs67CWXbp4ccqdTa8QvLnMaxX1RbtzCOOSoTcqCxF')}');"></div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <h4 class="font-semibold">${getText('review_1_name', 'Sarah J.')}</h4>
                  <div class="flex text-amber-400">
                    <span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span>
                  </div>
                </div>
                <p class="text-sm text-slate-700">${getText('review_1_text', '"Absolutely blown away by the sound quality and the design is a conversation starter. It looks like a piece of art on my shelf. Highly recommend!"')}</p>
              </div>
            </div>
            <!-- Review 2 -->
            <div class="flex flex-col sm:flex-row gap-4 border-b border-white/60 pb-6">
              <div class="flex-shrink-0 w-12 h-12 bg-center bg-no-repeat aspect-square bg-cover rounded-full" style="background-image: url('${getImage('review_2_avatar', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgNNh4CoGEmexBGLU7DdKou-nyK9maj9QheG0BCxhH-DMt_w7lo4rI3nLjpfJaYyz5rjfXbEx1Bq3m9xTjJF7GYF1Sz3rRXSLfIZmQM3wACvw-85YJyYPYQZV2ITlL5cFiVKxvCnpQpoL0QUckOQruqecQSZQsAWdWMkmkXtoddwxqmjmYOr4SjytJAPZgGFyQ0Q7NW1ytZeyE68qA25yxD-nGU2rhGehj1viTqwrYZnb1NEoJrJZ6J6vhhX6r7MBcybZSQWm_MLQb')}');"></div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <h4 class="font-semibold">${getText('review_2_name', 'Mike T.')}</h4>
                  <div class="flex text-amber-400">
                    <span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star_half</span>
                  </div>
                </div>
                <p class="text-sm text-slate-700">${getText('review_2_text', '"Great speaker, the sound is crisp and the bass is surprisingly deep for its size. The battery life is also excellent. The app could use a few more features, but overall a solid 4.5/5."')}</p>
              </div>
            </div>
            <!-- Review 3 -->
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-center bg-no-repeat aspect-square bg-cover rounded-full" style="background-image: url('${getImage('review_3_avatar', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJiMnhgqtV9SYvaz0PADP5_sQyROwP9kUUi5pKPGV1FNYejXBTAo-EnSOaMuw1VOICg9rZaGcpvOFyZCU8qdi9rLWv1qv2K7HkRDuvZ0JvfONsZeVTYu1_8PMNYhJmZruY6SiXuJY3rifSxpzAnniaYmbxesHNH3xcfrviu4cGpAl6O65qSAC_0rWo8YvV2Wd1hHMJ2OABVOuyJbz1WMOURRSnoJ5qGGC8-PaSi4FV-EkngreoWrzOO4au1NeEj4njL4EdjPJPYrro')}');"></div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <h4 class="font-semibold">${getText('review_3_name', 'Chloe L.')}</h4>
                  <div class="flex text-amber-400">
                    <span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span><span class="material-symbols-outlined !text-base">star</span>
                  </div>
                </div>
                <p class="text-sm text-slate-700">${getText('review_3_text', '"The ambient lighting is my favorite feature! It creates such a cool vibe for parties. Connecting via Bluetooth was seamless. A perfect blend of style and function."')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</body>
</html>`;
}
