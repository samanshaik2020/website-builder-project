# AI-Powered Website Generation

## Overview

This website builder now includes AI-powered content generation for Pro templates using Google's Gemini API.

## How It Works

### User Flow

1. **Select a Pro Template** - When users select any Pro template (SaaS Pro, Agency Pro, or Ecommerce Pro), the AI Generation Modal opens
2. **Describe Your Topic** - Users enter details about their website (e.g., "An innovative iPhone repair service")
3. **Choose a Theme** - Users select from 6 pre-defined themes:
   - Modern & Minimal
   - Vibrant & Playful
   - Corporate & Blue
   - Elegant & Dark
   - Creative & Bold
   - Nature & Calm
4. **AI Generates Content** - The system:
   - Sends a comprehensive prompt to Gemini API
   - Generates content for 70+ elements in the template
   - Auto-populates all text fields with relevant, theme-appropriate content
5. **Edit & Customize** - Users can then edit any element using the floating text toolbar

### Technical Implementation

#### Components

- **`AIGenerationModal`** (`components/ai-generation-modal.tsx`)
  - Beautiful UI for topic input and theme selection
  - Loading states with progress messages
  - Theme cards with color swatches

- **`generateSaaSProContent`** (`lib/gemini-api.ts`)
  - Integrates with Google Gemini API
  - Sends structured prompts for comprehensive content generation
  - Returns mapped content for all template elements

#### Content Generation

The AI generates content for:
- Navigation links (5 items)
- Hero section (headline, subheadline, CTAs, badge)
- Features (6 features with icons, titles, descriptions)
- Stats/Metrics (4 key metrics)
- Testimonials (3 customer testimonials with names and titles)
- Pricing (3 pricing tiers with descriptions)
- Footer content

Total: **70+ unique text elements** all populated with AI-generated, topic-specific content.

## Setup Instructions

### 1. Add Your Gemini API Key

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

### 2. Install Dependencies

The required package is `@google/generative-ai`:

```bash
npm install @google/generative-ai
```

### 3. Run the Application

```bash
npm run dev
```

## Example Use Cases

### Example 1: iPhone Repair Service

**Topic:** "A professional iPhone repair service offering same-day screen replacements and battery fixes"

**Theme:** Modern & Minimal

**Generated Content:**
- Brand: "iFixPro"
- Headline: "Expert iPhone Repairs in Under an Hour"
- Features: "Lightning-Fast Service", "Certified Technicians", "Lifetime Warranty"
- Testimonials: Real-sounding customer reviews specific to phone repair

### Example 2: Fitness App

**Topic:** "A mobile app that helps users track workouts and nutrition with AI coaching"

**Theme:** Vibrant & Playful

**Generated Content:**
- Brand: "FitSpark"
- Headline: "Your Pocket Personal Trainer"
- Features: "AI Workout Plans", "Nutrition Tracking", "Progress Analytics"
- Tone: Energetic and motivating

## API Usage

The Gemini API is called once per generation with a comprehensive prompt that requests JSON output for all elements. This approach:

- ✅ Ensures consistency across all content
- ✅ Maintains context and coherence
- ✅ Reduces API calls (1 call vs 70+ calls)
- ✅ Faster generation time

## Future Enhancements

- [ ] Add Agency Pro and Ecommerce Pro templates
- [ ] Image generation/selection based on theme
- [ ] Support for custom themes
- [ ] Content regeneration for individual sections
- [ ] Multi-language support
- [ ] Save/load AI generation prompts

## Notes

- All generated content is fully editable after generation
- The floating text toolbar works on all AI-generated elements
- Content is stored in localStorage when saved
- Each generation is unique based on the topic and theme provided
