# Goldec Landing Page - Project Structure

## 🏗️ Modern Architecture Overview

This project has been restructured to follow modern React/Next.js best practices with a scalable, component-based architecture.

## 📁 Project Structure

```
goldec-landing/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout (Persian/RTL)
│   │   ├── page.tsx           # Home page (composition of components)
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx    # Navigation header with mobile menu
│   │   │   ├── Footer.tsx    # Footer with links and social media
│   │   │   └── Layout.tsx    # Main layout wrapper
│   │   ├── sections/         # Page sections
│   │   │   ├── HeroSection.tsx       # Hero banner
│   │   │   ├── FeaturesSection.tsx   # Features grid
│   │   │   ├── HowItWorksSection.tsx # Process steps
│   │   │   ├── StatsSection.tsx      # Statistics display
│   │   │   ├── PartnersSection.tsx   # Partners showcase
│   │   │   └── CTASection.tsx        # Call-to-action
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.tsx    # Button with variants
│   │   │   └── Icons.tsx     # SVG icon components
│   │   └── index.ts          # Component exports
│   ├── data/                 # Static data
│   │   └── content.json      # All text content (Persian)
│   ├── hooks/                # Custom React hooks
│   │   └── useContent.ts     # Content management hook
│   ├── lib/                  # Utility functions
│   │   └── utils.ts          # Common utilities (cn, debounce, etc.)
│   └── types/                # TypeScript definitions
│       └── content.ts        # Content type interfaces
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── next.config.ts           # Next.js configuration
```

## 🧩 Component Architecture

### Layout Components (`/layout`)
- **Header**: Responsive navigation with mobile menu
- **Footer**: Links, contact info, and social media
- **Layout**: Main wrapper combining header + content + footer

### Section Components (`/sections`)
- **HeroSection**: Landing banner with CTAs
- **FeaturesSection**: Feature cards with icons
- **HowItWorksSection**: Step-by-step process
- **StatsSection**: Statistics with animations
- **PartnersSection**: Partner logos grid
- **CTASection**: Final call-to-action

### UI Components (`/ui`)
- **Button**: Configurable button with variants (primary, secondary, outline, ghost)
- **Icons**: SVG icon components for consistency

## 🎯 Key Features

### 🔧 Modern React Patterns
- **Component Composition**: Small, focused components
- **Custom Hooks**: `useContent()` for data management
- **TypeScript**: Full type safety with interfaces
- **Client Components**: Proper `"use client"` directives

### 🎨 Design System
- **Consistent Styling**: Tailwind CSS with utility classes
- **Reusable Components**: Button variants, icon system
- **Responsive Design**: Mobile-first approach
- **Persian/RTL Support**: Proper RTL layout and spacing

### 📊 Content Management
- **JSON-based**: All text in `content.json`
- **Type-safe**: TypeScript interfaces for content
- **Easy Updates**: Change text without touching code
- **Structured Data**: Organized by sections and features

## 🚀 Scalability Benefits

### ✅ Easy Maintenance
- **Single Responsibility**: Each component has one job
- **Predictable Structure**: Clear organization
- **Type Safety**: Catch errors at compile time
- **Consistent Patterns**: Similar component structure

### ✅ Developer Experience
- **Auto-completion**: TypeScript intellisense
- **Component Discovery**: Clear import/export system
- **Hot Reload**: Fast development cycle
- **ESLint Integration**: Code quality enforcement

### ✅ Future Growth
- **Easy to Add**: New sections follow same pattern
- **Component Reuse**: UI components across pages
- **Testing Ready**: Components are unit-testable
- **Performance**: Code splitting by component

## 🛠️ Usage Examples

### Adding a New Section
```tsx
// 1. Create component in /sections
'use client';
import { useContent } from '@/hooks/useContent';

const NewSection = () => {
  const content = useContent();
  return <div>{content.newSection.title}</div>;
};

// 2. Add to content.json
{
  "newSection": {
    "title": "عنوان جدید"
  }
}

// 3. Add to page.tsx
import { NewSection } from '@/components';
// ... add <NewSection /> to JSX
```

### Using UI Components
```tsx
import { Button } from '@/components';

<Button variant="primary" size="lg">
  متن دکمه
</Button>
```

### Content Updates
```json
// Just edit content.json - no code changes needed
{
  "hero": {
    "title1": "عنوان جدید"
  }
}
```

## 📱 Responsive & Accessible

- Mobile-first design approach
- Touch-friendly interactions
- Keyboard navigation support
- Screen reader friendly
- Persian/RTL text support

## 🔧 Development Scripts

```bash
npm run dev     # Development server
npm run build   # Production build
npm run start   # Production server
npm run lint    # Code linting
```

This structure provides a solid foundation for scaling the application while maintaining code quality and developer productivity.