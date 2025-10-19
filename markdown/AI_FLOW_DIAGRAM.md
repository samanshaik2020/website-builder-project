# AI Generation Flow

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   USER SELECTS TEMPLATE                      │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Portfolio │  │  SaaS    │  │  Event   │  │ SaaS Pro │   │
│  │  (Free)  │  │ (Free)   │  │  (Free)  │  │  (PRO)   │   │
│  └──────────┘  └──────────┘  └──────────┘  └────┬─────┘   │
│                                                   │          │
└───────────────────────────────────────────────────┼─────────┘
                                                    │
                            ┌───────────────────────▼─────────────────────┐
                            │    IS IT A PRO TEMPLATE?                    │
                            │    (agency-pro, saas-pro, ecommerce-pro)    │
                            └───────────────┬─────────────────────────────┘
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    │ YES                                      NO   │
                    ▼                                               ▼
    ┌───────────────────────────────────┐         ┌────────────────────────────┐
    │   OPEN AI GENERATION MODAL        │         │  LOAD TEMPLATE DIRECTLY    │
    │                                   │         │  (No AI Generation)        │
    │  ┌─────────────────────────────┐ │         └────────────────────────────┘
    │  │ 1. TOPIC INPUT              │ │
    │  │                             │ │
    │  │ "An innovative iPhone       │ │
    │  │ repair service..."          │ │
    │  └─────────────────────────────┘ │
    │                                   │
    │  ┌─────────────────────────────┐ │
    │  │ 2. THEME SELECTION          │ │
    │  │                             │ │
    │  │ ○ Modern & Minimal          │ │
    │  │ ● Vibrant & Playful  ✓     │ │
    │  │ ○ Corporate & Blue          │ │
    │  │ ○ Elegant & Dark            │ │
    │  │ ○ Creative & Bold           │ │
    │  │ ○ Nature & Calm             │ │
    │  └─────────────────────────────┘ │
    │                                   │
    │  [ ✨ Generate My Website ]      │
    └───────────────┬───────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────┐
    │   GEMINI API CALL                 │
    │                                   │
    │  Prompt: "You are a professional  │
    │  marketing copywriter..."         │
    │                                   │
    │  Context:                         │
    │  - Topic: iPhone repair           │
    │  - Theme: Vibrant & Playful       │
    │  - Tone: Fun, energetic           │
    │                                   │
    │  Request: Generate JSON for       │
    │  70+ elements                     │
    └───────────────┬───────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────┐
    │   GEMINI GENERATES JSON           │
    │                                   │
    │  {                                │
    │    "brand": "iFixFast",          │
    │    "hero_headline": "Screen      │
    │      Cracked? We Fix That!",     │
    │    "hero_subheadline": "Same-    │
    │      day iPhone repairs...",     │
    │    "feature_1_title": "Fast      │
    │      as Lightning",              │
    │    "feature_1_description":      │
    │      "Most repairs done in       │
    │       under 30 minutes",         │
    │    ...                           │
    │  }                               │
    └───────────────┬───────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────┐
    │   CONTENT MAPPING                 │
    │                                   │
    │  Map JSON to element IDs:         │
    │                                   │
    │  saas_pro_brand                  │
    │    ← "iFixFast"                  │
    │                                   │
    │  saas_pro_hero_headline          │
    │    ← "Screen Cracked? We Fix     │
    │        That!"                     │
    │                                   │
    │  saas_pro_feature_1_title        │
    │    ← "Fast as Lightning"         │
    │                                   │
    │  ... (70+ mappings)              │
    └───────────────┬───────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────┐
    │   LOAD TEMPLATE                   │
    │                                   │
    │  <SaaSProTemplate />              │
    │                                   │
    │  Renders with default content     │
    └───────────────┬───────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────┐
    │   AUTO-POPULATE CONTENT           │
    │                                   │
    │  For each element:                │
    │    1. Find DOM element by         │
    │       data-eid="saas_pro_brand"   │
    │    2. Update textContent with     │
    │       generated value             │
    │                                   │
    │  Result: All 70+ elements are     │
    │  filled with AI-generated content │
    └───────────────┬───────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────┐
    │   ✅ COMPLETE PAGE READY          │
    │                                   │
    │  User sees fully populated page:  │
    │  - Custom brand name              │
    │  - Topic-specific headlines       │
    │  - Relevant features              │
    │  - Authentic testimonials         │
    │  - Appropriate pricing            │
    │                                   │
    │  All editable with floating       │
    │  text toolbar!                    │
    └───────────────────────────────────┘
```

## Key Benefits

1. **Single API Call** - All content generated in one request
2. **Context-Aware** - Every element relates to the user's topic
3. **Theme Consistency** - Tone matches selected theme throughout
4. **Instant Results** - Complete page in ~5-10 seconds
5. **Fully Editable** - Users can refine any generated content
6. **No Coding Required** - Users just describe what they want

## Example Output

### Input
- **Topic**: "iPhone repair service"  
- **Theme**: "Vibrant & Playful"

### Generated Elements (Sample)
```
Brand: "iFixFast"
Hero Headline: "Screen Cracked? We Fix That! ⚡"
Hero Subheadline: "Same-day iPhone repairs by certified techs. Your phone, good as new—or better!"
Feature 1: "⚡ Lightning-Fast Service"
Feature 2: "🔧 Expert Technicians"
Feature 3: "💎 Lifetime Warranty"
Testimonial 1: "Dropped my phone in the pool. They saved it! Amazing service and super friendly staff."
Pricing 1 Name: "Quick Fix"
Pricing 1 Price: "$79"
```

All content is topic-specific, uses a playful tone, and creates a cohesive landing page!
