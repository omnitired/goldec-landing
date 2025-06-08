# SSR Implementation Guide

This document explains how Server-Side Rendering (SSR) has been enabled in the Goldec Landing project while maintaining compatibility with the existing API usage patterns.

## Changes Made

### 1. Next.js Configuration (`next.config.ts`)

- **Removed** `output: 'export'` to enable SSR
- **Removed** `distDir: 'build'` (using default `.next` directory)
- **Updated** image configuration to enable optimization
- **Added** API rewrites configuration
- **Added** experimental optimizations for better SSR performance

### 2. API Route Proxy (`/src/app/api/partners/route.ts`)

- Created an internal API route that proxies requests to the external API
- Enables SSR compatibility by avoiding direct external API calls from server components
- Includes caching strategies for better performance
- Handles errors gracefully

### 3. API Service Updates (`/src/lib/api-service.ts`)

- Modified `getPartnersData()` to use the internal API route
- Added SSR detection (`typeof window === 'undefined'`)
- Maintains the same interface and functionality as before
- Uses environment variables for proper URL resolution

### 4. Environment Variables

- Added `NEXT_PUBLIC_SITE_URL` for SSR API calls
- Updated `.env.example` with SSR-specific variables
- Added new npm scripts for SSR development

## Usage

### Development with SSR

```bash
# Standard development (SSR enabled)
npm run dev

# Development with explicit SSR environment
npm run dev:ssr
```

### Building for Production

```bash
# Build for SSR deployment
npm run build

# Start production server
npm run start
```

### Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the environment variables:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000  # For development
   NEXT_PUBLIC_API_BASE_URL=https://panel.zarnext.com/public/api/v1
   ```

3. For production, set:
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

## API Usage Patterns

The existing API usage patterns remain unchanged:

```typescript
// This still works the same way
import { getPartnersData } from '@/lib/api-service';

const data = await getPartnersData();
```

### How It Works

1. **Client-side**: API calls go to `/api/partners` (internal route)
2. **Server-side**: API calls go to `NEXT_PUBLIC_SITE_URL/api/partners`
3. **Internal route**: Proxies to external API at `https://panel.zarnext.com/public/api/v1/platforms`

## Benefits of SSR Implementation

1. **SEO Improvement**: Content is rendered on the server, improving search engine indexing
2. **Faster Initial Load**: Users see content faster as HTML is pre-rendered
3. **Better Performance**: Reduced client-side JavaScript execution
4. **API Security**: External API calls are proxied through internal routes
5. **Caching**: Built-in caching strategies for API responses

## Deployment Considerations

### Vercel (Recommended)

```bash
# Deploy with SSR
vercel --prod
```

Environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SITE_URL`: Your production domain
- `NEXT_PUBLIC_API_BASE_URL`: External API URL

### Other Platforms

Ensure your hosting platform supports:
- Node.js runtime
- Server-side rendering
- Environment variables

## Troubleshooting

### Common Issues

1. **API calls failing in SSR**:
   - Check `NEXT_PUBLIC_SITE_URL` is set correctly
   - Ensure the internal API route is accessible

2. **Hydration mismatches**:
   - Verify data consistency between server and client
   - Check for client-only code in server components

3. **Image optimization errors**:
   - Ensure image domains are configured in `next.config.ts`
   - Check image URLs are accessible

### Debug Mode

```bash
# Enable Next.js debug mode
DEBUG=next:* npm run dev
```

## Migration from Static Export

If you need to revert to static export:

1. Add back to `next.config.ts`:
   ```typescript
   output: 'export',
   distDir: 'build',
   images: { unoptimized: true }
   ```

2. Update API service to use direct external calls
3. Remove the internal API route

## Performance Monitoring

- Use Next.js built-in analytics
- Monitor API response times
- Check server-side rendering performance
- Implement proper caching strategies

---

**Note**: This implementation maintains full backward compatibility with existing code while enabling SSR capabilities.