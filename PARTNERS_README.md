# Partners Management System

## Overview

The Partners Management System is designed to handle 150+ partner platforms with a modern, expandable interface. Partners are managed through a JSON configuration file and displayed with a clean, responsive grid layout.

## Features

- **Scalable Display**: Shows up to 150+ partners with efficient pagination
- **Search Functionality**: Real-time search through partner names and URLs
- **Expandable Interface**: Load more/show less functionality with smooth transitions
- **Modern Design**: Clean cards with hover effects and animations
- **Responsive Grid**: Adapts from 1 column on mobile to 6 columns on desktop
- **Trust Indicators**: Visual indicators for verified partners
- **External Links**: Direct links to partner platforms

## File Structure

```
src/
├── components/sections/PartnersSection.tsx    # Main component
├── data/partners.json                         # Partners configuration
├── types/content.ts                          # TypeScript types
└── public/logos/                             # Partner logo images
```

## Partners Configuration

Partners are configured in `src/data/partners.json`:

```json
{
  "partners": [
    {
      "id": 1,
      "name": "Partner Name",
      "url": "https://partner-website.com",
      "logo": "/logos/partner-logo.png"
    }
  ],
  "settings": {
    "initialDisplayCount": 12,
    "expandStep": 12
  }
}
```

### Partner Object Properties

- `id`: Unique identifier for the partner
- `name`: Display name of the partner platform
- `url`: Partner's website URL
- `logo`: Path to partner's logo image (relative to public directory)

### Settings

- `initialDisplayCount`: Number of partners shown initially (default: 12)
- `expandStep`: Number of additional partners loaded when "Load More" is clicked (default: 12)

## Component Usage

```tsx
import PartnersSection from '@/components/sections/PartnersSection';

// Basic usage
<PartnersSection />

// With custom styling
<PartnersSection className="bg-gray-100" />
```

## Adding New Partners

1. **Add Partner Data**: Update `src/data/partners.json` with new partner information
2. **Add Logo**: Place partner logo in `public/logos/` directory
3. **Update Logo Path**: Reference the logo in the partner's `logo` field

Example:
```json
{
  "id": 151,
  "name": "New Partner Name",
  "url": "https://newpartner.com",
  "logo": "/logos/new-partner.png"
}
```

## Logo Requirements

- **Format**: PNG, JPG, or SVG
- **Size**: Recommended 200x200px minimum
- **Aspect Ratio**: Square (1:1) preferred
- **Background**: Transparent PNG recommended
- **File Size**: Under 100KB for optimal loading

## Responsive Behavior

- **Mobile (< 640px)**: 1 column
- **Small (640px - 768px)**: 2 columns
- **Medium (768px - 1024px)**: 3 columns
- **Large (1024px - 1280px)**: 4 columns
- **Extra Large (> 1280px)**: 6 columns

## Search Functionality

Users can search through partners by:
- Partner name (case-insensitive)
- Website URL (case-insensitive)

Search results update in real-time and maintain the same pagination behavior.

## Performance Considerations

- **Lazy Loading**: Only displays visible partners initially
- **Efficient Filtering**: Search uses memoized filtering for performance
- **Optimized Images**: Use appropriately sized logos
- **Pagination**: Prevents rendering all 150+ partners simultaneously

## Styling Customization

The component uses Tailwind CSS classes and can be customized by:

1. **Component Level**: Pass `className` prop
2. **Card Level**: Modify `PartnerCard` component styling
3. **Global**: Update Tailwind configuration

## Trust Indicators

The component displays trust indicators at the bottom:
- ✅ Verified by Union
- 🔵 Valid Operating License  
- 🟡 Continuous Monitoring

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Dependencies

- React 19+
- Next.js 15+
- Tailwind CSS 4+
- Lucide React (for icons)
- TypeScript 5+

## Future Enhancements

- Partner categories/filtering
- Partner rating system
- Advanced search filters
- Bulk import/export functionality
- Admin interface for partner management
- Analytics integration

## Troubleshooting

### Common Issues

1. **Missing Icons**: Ensure `lucide-react` is installed
2. **Logo Not Loading**: Check file path and public directory structure
3. **Search Not Working**: Verify JSON structure and data integrity
4. **Layout Issues**: Check Tailwind CSS configuration

### Debug Mode

Add `console.log` statements in the component to debug:
- Partner data loading
- Search filtering
- Pagination logic

## Contributing

When adding new features:
1. Update TypeScript types in `src/types/content.ts`
2. Maintain backward compatibility with existing data
3. Add appropriate error handling
4. Update this documentation