# API Integration Documentation

## Overview

The Partners Section has been successfully migrated from static JSON data to dynamic API integration using the Zarnext platform API.

## API Configuration

### Environment Variables

The API base URL is configured via environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://panel.zarnext.com/public/api/v1
```

### API Endpoints

- **Platforms API**: `GET /platforms`
  - URL: `https://panel.zarnext.com/public/api/v1/platforms`
  - Response format:
    ```json
    {
      "status": 200,
      "message": "Platforms retrieved successfully",
      "data": [
        {
          "id": "661c5766-fa91-46f2-a324-b7ab9baa5a24",
          "name": "اینوی",
          "legal_name": "اینوی",
          "city": "",
          "state": "",
          "website_url": ""
        }
      ]
    }
    ```

## Implementation Details

### Files Created/Modified

1. **`src/lib/api-config.ts`** - API configuration and types
2. **`src/lib/api-service.ts`** - API service with error handling and retry logic
3. **`src/components/sections/PartnersSection.tsx`** - Updated to use API data
4. **`.env.local`** - Environment configuration

### Files Removed

1. **`src/app/admin/page.tsx`** - Admin panel (no longer needed)
2. **`src/app/api/partners/route.ts`** - Local API route (replaced by external API)
3. **`src/components/ui/AdminNavLink.tsx`** - Admin navigation link
4. **Updated `src/app/page.tsx`** - Removed admin link

### Key Features

#### API Service (`src/lib/api-service.ts`)

- **Retry Logic**: Automatically retries failed requests up to 3 times
- **Timeout Handling**: 10-second timeout for API calls
- **Error Handling**: Graceful fallback to empty array on API failures
- **Data Transformation**: Converts API response to internal Partner format
- **Type Safety**: Full TypeScript support with proper interfaces

#### Component Updates (`src/components/sections/PartnersSection.tsx`)

- **Loading State**: Shows spinner while fetching data
- **Error State**: Displays error message with retry button
- **Dynamic Data**: Real-time data from external API
- **Fallback Handling**: Graceful degradation on API failures

### Data Transformation

The API data is transformed from the external format to the internal Partner interface:

```typescript
// API Response
interface PlatformApiData {
  id: string;
  name: string;
  legal_name: string;
  city: string;
  state: string;
  website_url: string;
}

// Internal Format
interface Partner {
  id: number;
  name: string;
  url: string;
  logo: string;
  addedDate: string;
}
```

### Future Enhancements

The implementation is prepared for future API enhancements:

1. **Image Support**: Ready to use `image` field when added to API
2. **Creation Date**: Ready to use `created_at` field for proper date handling
3. **Additional Fields**: Easy to extend with new platform properties

## Configuration Options

### API Settings

```typescript
export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
} as const;
```

### Display Settings

The component maintains the same display settings as before:

- Initial display: 12 partners
- Load more step: 12 partners
- Search and sorting functionality preserved

## Error Handling

### API Failures

1. **Network Errors**: Automatic retry with exponential backoff
2. **Timeout Errors**: Graceful fallback to empty state
3. **Invalid Response**: Error logging and empty array fallback
4. **User Interface**: Clear error messages with retry options

### Fallback Strategy

- On API failure: Display error state with retry button
- On timeout: Show loading state with timeout message
- On invalid data: Log error and show empty state

## Testing

### Manual Testing

1. **Normal Operation**: Visit the partners section to see live data
2. **Error Handling**: Disconnect internet to test error states
3. **Loading States**: Refresh page to see loading spinner
4. **Retry Functionality**: Click retry button on error state

### API Testing

Test the API directly:

```bash
curl -X GET "https://panel.zarnext.com/public/api/v1/platforms" \
  -H "Accept: application/json"
```

## Deployment Notes

1. **Environment Variables**: Ensure `NEXT_PUBLIC_API_BASE_URL` is set in production
2. **CORS**: API should allow requests from your domain
3. **Rate Limiting**: Consider API rate limits in production
4. **Monitoring**: Monitor API response times and error rates

## Migration Benefits

1. **Real-time Data**: Partners data is always up-to-date
2. **Reduced Maintenance**: No need to manually update JSON files
3. **Scalability**: Can handle unlimited partners from API
4. **Centralized Management**: Partners managed through Zarnext platform
5. **Better Performance**: No large JSON files in the bundle

## Support

For API-related issues:

1. Check network connectivity
2. Verify API endpoint availability
3. Check browser console for error messages
4. Test API directly using curl or Postman
5. Verify environment variables are set correctly