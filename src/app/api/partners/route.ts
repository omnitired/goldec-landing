/**
 * API Route for Partners Data
 * Proxies requests to external API for SSR compatibility
 */

import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/api-config';

export async function GET() {
  try {
    // Get the external API URL
    const apiUrl = API_ENDPOINTS.PLATFORMS;
    
    // Forward the request to the external API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add any required headers for the external API
      },
      // Add cache control for better performance
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the data with proper headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch partners data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Enable static generation for this route
export const dynamic = 'force-dynamic'; // This ensures SSR for real-time data