'use client';


import { EditableButton } from '@/components/editor/editable-button';
import { TiptapEditableText } from '@/components/editor/tiptap-editable-text';
import { EditableLink } from '@/components/editor/editable-link';
import { BaseTemplateProps } from '@/types/template';

interface SaasLandingProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function SaasLandingEnhanced({ editable = false, data = {}, onContentChange }: SaasLandingProps) {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string) => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  const handleTextChange = (eid: string, content: string) => {
    if (onContentChange) {
      onContentChange(eid, { text: content });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-300 ${editable ? 'top-16' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <TiptapEditableText
                eid="nav_logo"
                defaultText={getText('nav_logo', 'SaaSify')}
                className="text-2xl font-bold"
                editorClassName="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
            </div>

            <div className="hidden md:flex items-center gap-8">
              <EditableLink href="#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium relative group" editable={editable}>
                <span data-eid="nav_link_1" contentEditable={editable} suppressContentEditableWarning>
                  {getText('nav_link_1', 'Features')}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </EditableLink>
              <EditableLink href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium relative group" editable={editable}>
                <span data-eid="nav_link_2" contentEditable={editable} suppressContentEditableWarning>
                  {getText('nav_link_2', 'Pricing')}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </EditableLink>
              <EditableLink href="#testimonials" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium relative group" editable={editable}>
                <span data-eid="nav_link_3" contentEditable={editable} suppressContentEditableWarning>
                  {getText('nav_link_3', 'Testimonials')}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </EditableLink>
            </div>

            <div className="flex items-center gap-4">
              <EditableButton
                eid="nav_signin"
                defaultText={getButton('nav_signin', 'Sign In', '#').text}
                defaultUrl={getButton('nav_signin', 'Sign In', '#').url}
                className="hidden md:block px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium"
                editable={editable}
                onChange={onContentChange}
              />
              <EditableButton
                eid="nav_cta"
                defaultText={getButton('nav_cta', 'Get Started', '#').text}
                defaultUrl={getButton('nav_cta', 'Get Started', '#').url}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white px-6 overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/20">
            🚀 Now with AI-powered features
          </div>
          <TiptapEditableText
            eid="hero_headline"
            defaultText={getText('hero_headline', 'Build Something Amazing')}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight pb-2"
            editorClassName="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            editable={editable}
            onChange={handleTextChange}
            as="h1"
          />
          <TiptapEditableText
            eid="hero_subheadline"
            defaultText={getText('hero_subheadline', 'The ultimate platform for building modern SaaS applications. Start your journey today with our powerful tools and intuitive interface.')}
            className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            editable={editable}
            onChange={handleTextChange}
            as="p"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton
              eid="hero_cta_primary"
              defaultText={getButton('hero_cta_primary', 'Start Free Trial', '#pricing').text}
              defaultUrl={getButton('hero_cta_primary', 'Start Free Trial', '#pricing').url}
              className="px-8 py-4 bg-white text-purple-600 hover:bg-blue-50 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform"
              editable={editable}
              onChange={onContentChange}
            />
            <EditableButton
              eid="hero_cta_secondary"
              defaultText={getButton('hero_cta_secondary', 'Watch Demo', '#features').text}
              defaultUrl={getButton('hero_cta_secondary', 'Watch Demo', '#features').url}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 transform"
              editable={editable}
              onChange={onContentChange}
            />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-80">
            <div className="text-sm">✨ No credit card required</div>
            <div className="text-sm">🔒 Enterprise-grade security</div>
            <div className="text-sm">⚡ Setup in 5 minutes</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <TiptapEditableText
                eid="stat_1_number"
                defaultText={getText('stat_1_number', '50K+')}
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                editorClassName="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
              <TiptapEditableText
                eid="stat_1_label"
                defaultText={getText('stat_1_label', 'Active Users')}
                className="text-slate-600 font-medium"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
            </div>
            <div className="text-center group">
              <TiptapEditableText
                eid="stat_2_number"
                defaultText={getText('stat_2_number', '99.9%')}
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                editorClassName="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
              <TiptapEditableText
                eid="stat_2_label"
                defaultText={getText('stat_2_label', 'Uptime')}
                className="text-slate-600 font-medium"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
            </div>
            <div className="text-center group">
              <TiptapEditableText
                eid="stat_3_number"
                defaultText={getText('stat_3_number', '150+')}
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                editorClassName="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
              <TiptapEditableText
                eid="stat_3_label"
                defaultText={getText('stat_3_label', 'Countries')}
                className="text-slate-600 font-medium"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
            </div>
            <div className="text-center group">
              <TiptapEditableText
                eid="stat_4_number"
                defaultText={getText('stat_4_number', '4.9/5')}
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                editorClassName="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
              <TiptapEditableText
                eid="stat_4_label"
                defaultText={getText('stat_4_label', 'Rating')}
                className="text-slate-600 font-medium"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">FEATURES</div>
            <TiptapEditableText
              eid="features_headline"
              defaultText={getText('features_headline', 'Everything you need to succeed')}
              className="text-3xl md:text-5xl font-bold mb-6 text-slate-900"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <TiptapEditableText
              eid="features_subheadline"
              defaultText={getText('features_subheadline', 'Powerful features designed to help you build, launch, and scale your application faster than ever before.')}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
              editable={editable}
              onChange={handleTextChange}
              as="p"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <TiptapEditableText
                eid="feature_1_title"
                defaultText={getText('feature_1_title', 'Lightning Fast')}
                className="text-2xl font-bold text-slate-900 mb-3"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="feature_1_description"
                defaultText={getText('feature_1_description', 'Optimized performance ensures your application runs smoothly at scale.')}
                className="text-slate-600 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🔒</span>
              </div>
              <TiptapEditableText
                eid="feature_2_title"
                defaultText={getText('feature_2_title', 'Secure by Default')}
                className="text-2xl font-bold text-slate-900 mb-3"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="feature_2_description"
                defaultText={getText('feature_2_description', 'Enterprise-grade security with encryption and compliance built-in.')}
                className="text-slate-600 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🎨</span>
              </div>
              <TiptapEditableText
                eid="feature_3_title"
                defaultText={getText('feature_3_title', 'Beautiful Design')}
                className="text-2xl font-bold text-slate-900 mb-3"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="feature_3_description"
                defaultText={getText('feature_3_description', 'Stunning UI components that delight users and boost conversions.')}
                className="text-slate-600 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">TESTIMONIALS</div>
            <TiptapEditableText
              eid="testimonials_heading"
              defaultText={getText('testimonials_heading', 'Loved by Thousands')}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <TiptapEditableText
              eid="testimonials_subheading"
              defaultText={getText('testimonials_subheading', 'See what our customers have to say')}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
              editable={editable}
              onChange={handleTextChange}
              as="p"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <TiptapEditableText
                eid="testimonial_1_quote"
                defaultText={getText('testimonial_1_quote', '"This platform has completely transformed how we build and ship products. The speed and reliability are unmatched!"')}
                className="text-slate-700 mb-6 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">SA</div>
                <div>
                  <TiptapEditableText
                    eid="testimonial_1_name"
                    defaultText={getText('testimonial_1_name', 'Sarah Anderson')}
                    className="font-bold text-slate-900"
                    editable={editable}
                    onChange={handleTextChange}
                    as="div"
                  />
                  <TiptapEditableText
                    eid="testimonial_1_title"
                    defaultText={getText('testimonial_1_title', 'CEO, TechStart')}
                    className="text-sm text-slate-600"
                    editable={editable}
                    onChange={handleTextChange}
                    as="div"
                  />
                </div>
              </div>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <TiptapEditableText
                eid="testimonial_2_quote"
                defaultText={getText('testimonial_2_quote', '"The best investment we\'ve made. Our team productivity has increased by 300% since switching to this platform."')}
                className="text-slate-700 mb-6 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">MC</div>
                <div>
                  <TiptapEditableText
                    eid="testimonial_2_name"
                    defaultText={getText('testimonial_2_name', 'Michael Chen')}
                    className="font-bold text-slate-900"
                    editable={editable}
                    onChange={handleTextChange}
                    as="div"
                  />
                  <TiptapEditableText
                    eid="testimonial_2_title"
                    defaultText={getText('testimonial_2_title', 'CTO, InnovateCo')}
                    className="text-sm text-slate-600"
                    editable={editable}
                    onChange={handleTextChange}
                    as="div"
                  />
                </div>
              </div>
            </div>

            <div className="group p-8 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <TiptapEditableText
                eid="testimonial_3_quote"
                defaultText={getText('testimonial_3_quote', '"Outstanding support and features. This is exactly what we needed to scale our SaaS business globally."')}
                className="text-slate-700 mb-6 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center text-white font-bold">ER</div>
                <div>
                  <TiptapEditableText
                    eid="testimonial_3_name"
                    defaultText={getText('testimonial_3_name', 'Emily Rodriguez')}
                    className="font-bold text-slate-900"
                    editable={editable}
                    onChange={handleTextChange}
                    as="div"
                  />
                  <TiptapEditableText
                    eid="testimonial_3_title"
                    defaultText={getText('testimonial_3_title', 'Founder, GrowthLabs')}
                    className="text-sm text-slate-600"
                    editable={editable}
                    onChange={handleTextChange}
                    as="div"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">PRICING</div>
            <TiptapEditableText
              eid="pricing_heading"
              defaultText={getText('pricing_heading', 'Simple, Transparent Pricing')}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <TiptapEditableText
              eid="pricing_subheading"
              defaultText={getText('pricing_subheading', 'Choose the perfect plan for your business')}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
              editable={editable}
              onChange={handleTextChange}
              as="p"
            />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-200 overflow-hidden group hover:border-purple-400 transition-all duration-300">
              <div className="absolute top-0 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-b-xl text-sm font-bold shadow-lg">MOST POPULAR</div>

              <div className="text-center">
                <TiptapEditableText
                  eid="pricing_plan_name"
                  defaultText={getText('pricing_plan_name', 'Pro Plan')}
                  className="text-3xl font-bold text-slate-900 mb-2"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
                <TiptapEditableText
                  eid="pricing_plan_description"
                  defaultText={getText('pricing_plan_description', 'Perfect for growing teams')}
                  className="text-slate-600 mb-8"
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
                <div className="mb-8">
                  <TiptapEditableText
                    eid="pricing_plan_price"
                    defaultText={getText('pricing_plan_price', '$49')}
                    className="text-6xl font-bold"
                    editorClassName="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    editable={editable}
                    onChange={handleTextChange}
                    as="span"
                  />
                  <span className="text-2xl text-slate-600">/month</span>
                </div>
                <ul className="text-left space-y-4 mb-8 max-w-md mx-auto">
                  <li className="flex items-center text-slate-700">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <TiptapEditableText
                      eid="pricing_feature_1"
                      defaultText={getText('pricing_feature_1', 'Unlimited projects')}
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </li>
                  <li className="flex items-center text-slate-700">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <TiptapEditableText
                      eid="pricing_feature_2"
                      defaultText={getText('pricing_feature_2', 'Advanced analytics')}
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </li>
                  <li className="flex items-center text-slate-700">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <TiptapEditableText
                      eid="pricing_feature_3"
                      defaultText={getText('pricing_feature_3', 'Priority support')}
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </li>
                  <li className="flex items-center text-slate-700">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <TiptapEditableText
                      eid="pricing_feature_4"
                      defaultText={getText('pricing_feature_4', 'Custom integrations')}
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </li>
                </ul>
                <EditableButton
                  eid="pricing_plan_cta"
                  defaultText={getButton('pricing_plan_cta', 'Get Started Now', '#').text}
                  defaultUrl={getButton('pricing_plan_cta', 'Get Started Now', '#').url}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <TiptapEditableText
            eid="cta_heading"
            defaultText={getText('cta_heading', 'Ready to Get Started?')}
            className="text-4xl md:text-5xl font-bold mb-8"
            editable={editable}
            onChange={handleTextChange}
            as="h2"
          />
          <TiptapEditableText
            eid="cta_description"
            defaultText={getText('cta_description', 'Join thousands of companies already using our platform')}
            className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
            editable={editable}
            onChange={handleTextChange}
            as="p"
          />
          <EditableButton
            eid="cta_button"
            defaultText={getButton('cta_button', 'Start Your Free Trial', '#').text}
            defaultUrl={getButton('cta_button', 'Start Your Free Trial', '#').url}
            className="px-10 py-5 bg-white text-purple-600 hover:bg-blue-50 rounded-xl text-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 transform"
            editable={editable}
            onChange={onContentChange}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <TiptapEditableText
              eid="footer_brand"
              defaultText={getText('footer_brand', 'SaaSify')}
              className="text-2xl font-bold"
              editable={editable}
              onChange={handleTextChange}
              as="span"
            />
          </div>
          <TiptapEditableText
            eid="footer_tagline"
            defaultText={getText('footer_tagline', 'Building the future of SaaS, one feature at a time.')}
            className="text-slate-400 mb-6"
            editable={editable}
            onChange={handleTextChange}
            as="p"
          />
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
            <EditableLink href="#" className="hover:text-white transition-colors" editable={editable}>Privacy Policy</EditableLink>
            <EditableLink href="#" className="hover:text-white transition-colors" editable={editable}>Terms of Service</EditableLink>
            <EditableLink href="#" className="hover:text-white transition-colors" editable={editable}>Contact</EditableLink>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-slate-500 text-sm">
            © 2025 SaaSify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
