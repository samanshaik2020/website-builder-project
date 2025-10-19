# Squpage - AI-Powered Website Builder

Transform your ideas into professional websites in minutes with AI-powered design and an intuitive visual editor.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/squpage)

## Features

- **AI Content Generation** - Generate website content using Google Gemini AI
- **Multiple Templates** - Choose from portfolio, landing page, e-commerce, and more
- **Theme System** - Modern, Minimal, Bold, Professional themes for each template
- **Visual Editor** - Drag-and-drop interface with real-time editing
- **Responsive Design** - All templates are mobile-friendly
- **Project Management** - Save, edit, and manage multiple projects
- **Export to HTML** - Download your website as standalone HTML
- **Share Links** - Generate shareable links for your projects
- **Authentication** - Secure user authentication with Supabase
- **Pricing Plans** - Free, Starter, Professional, and Unlimited tiers

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account (for authentication)
- Google Gemini API key (optional, for AI features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/squpage.git
cd squpage
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**
```bash
# Copy the example env file
cp env.example .env.local

# Edit .env.local with your credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key (optional)
```

4. **Set up Supabase database**
- Run the SQL script in `lib/supabase/schema.sql` in your Supabase SQL editor
- Configure authentication redirect URLs in Supabase dashboard

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Notifications**: Sonner

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── editor/            # Visual editor
│   ├── landing/           # Landing page
│   └── pricing/           # Pricing page
├── components/            # React components
│   ├── templates/         # Website templates
│   ├── ui/               # UI components
│   └── lib/              # Shared utilities
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configs
│   ├── supabase/         # Supabase client & auth
│   ├── export-html.ts    # HTML export logic
│   └── gemini-api.ts     # AI integration
└── public/               # Static assets
```

## Available Templates

### Normal Templates (Free Tier)
- **Portfolio** - Showcase your work
- **Landing Page** - Product/service landing pages
- **Blog** - Content-focused blog layout

### Pro Templates (Paid Tiers)
- **Agency Pro** - Professional agency website
- **SaaS Pro** - SaaS product landing page
- **Portfolio Pro** - Advanced portfolio with animations
- **iPhone Pro** - Apple-style product showcase
- **E-commerce Pro** - Online store template

## Theme System

Each template supports multiple themes:
- **Modern** - Clean, contemporary design
- **Minimal** - Simple, focused layouts
- **Bold** - Vibrant, eye-catching styles
- **Professional** - Corporate, business-ready

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anonymous key |
| `NEXT_PUBLIC_GEMINI_API_KEY` | No | Google Gemini API key for AI features |

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

The project includes a `vercel.json` configuration file for optimal deployment.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, email support@squpage.com or open an issue on GitHub.

---

Built with ❤️ using Next.js and Supabase