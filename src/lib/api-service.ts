/**
 * API Service
 * Handles all API calls with error handling, retries, and type safety
 */

import { API_CONFIG, API_ENDPOINTS, DEFAULT_HEADERS, PlatformsApiResponse, PlatformApiData } from './api-config';
import { Partner } from '@/types/content';
import moment from 'moment-jalaali';

/**
 * Generic API fetch function with retry logic
 */
async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  retries: number = API_CONFIG.retries
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (retries > 0 && error instanceof Error && !error.name.includes('AbortError')) {
      console.warn(`API call failed, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay));
      return apiFetch<T>(url, options, retries - 1);
    }
    
    throw error;
  }
}

/**
 * Transform API platform data to internal Partner format
 */
function transformPlatformToPartner(platform: PlatformApiData): Partner {
  // Use the logo from API, with fallback to default
  let logo = '/logos/default-gold.svg'; // Default fallback
  
  if (platform.logo) {
    // If logo starts with /uploads, it's from the API server
    if (platform.logo.startsWith('/uploads')) {
      logo = `https://staging.panel.zarnext.com${platform.logo}`;
    } else {
      logo = platform.logo;
    }
  } else {
    // Fallback to local logos based on platform name
    const platformLogoMap: { [key: string]: string } = {
      'اینوی': '/logos/اینوی-(سرویس-طلای-آپ).svg',
      'گلدیکا': '/logos/goldika-gold.svg',
      'طلاسی': '/logos/talasea-gold.svg',
    };
    
    if (platformLogoMap[platform.name]) {
      logo = platformLogoMap[platform.name];
    } else {
      // Try to find a matching logo by converting name to lowercase and removing spaces
      const logoName = platform.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'default';
      logo = `/logos/${logoName}-gold.svg`;
    }
  }
  
  return {
    id: platform.id,
    name: platform.name || platform.legal_name || 'نام نامشخص',
    url: platform.website_url || `https://example.com/${platform.name}`,
    logo,
    addedDate: platform.created_at ? formatApiDateToJalali(platform.created_at) : moment().format('jYYYY/jMM/jDD'),
  };
}

/**
 * Convert API date to Jalali format
 */
function formatApiDateToJalali(apiDate: string): string {
  try {
    // Parse the API date (assuming it's in ISO format or similar)
    const date = moment(apiDate);
    
    if (!date.isValid()) {
      // Fallback to current Jalali date if parsing fails
      const now = moment();
      return now.format('jYYYY/jMM/jDD');
    }
    
    // Convert to Jalali format
    return date.format('jYYYY/jMM/jDD');
  } catch (error) {
    console.error('Error converting API date to Jalali:', error);
    // Fallback to current Jalali date
    const now = moment();
    return now.format('jYYYY/jMM/jDD');
  }
}

/**
 * Fetch platforms from the API
 */
export async function fetchPlatforms(): Promise<Partner[]> {
  try {
    const response = await apiFetch<PlatformsApiResponse>(API_ENDPOINTS.PLATFORMS);
    
    if (response.status !== 200) {
      throw new Error(`API returned status ${response.status}: ${response.message}`);
    }

    if (!Array.isArray(response.data)) {
      throw new Error('Invalid API response: data is not an array');
    }

    return response.data.map(transformPlatformToPartner);
  } catch (error) {
    console.error('Failed to fetch platforms:', error);
    
    // Return empty array as fallback
    return [];
  }
}

/**
 * Get partners data from API (SSR compatible)
 */
export async function getPartnersData(): Promise<{ partners: Partner[]; settings: { initialDisplayCount: number; expandStep: number } }> {
  try {
    // Use external API directly for static export compatibility
    const apiUrl = API_ENDPOINTS.PLATFORMS;
    
    console.log('Fetching partners data from:', apiUrl);
    const response = await apiFetch<PlatformsApiResponse>(apiUrl);
    
    console.log('API Response:', response);
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid API response structure');
    }
    
    if (response.status !== 200) {
      throw new Error(`API returned status ${response.status}: ${response.message || 'Unknown error'}`);
    }

    if (!response.data || !Array.isArray(response.data)) {
      console.warn('API response data is not an array:', response.data);
      throw new Error('Invalid API response format - expected array of platforms');
    }

    // Transform API data to Partner format using the transform function
    const partners: Partner[] = response.data.map(transformPlatformToPartner);
    
    console.log(`Successfully loaded ${partners.length} partners`);

    return {
      partners,
      settings: {
        initialDisplayCount: 12,
        expandStep: 12,
      },
    };
  } catch (error) {
    console.error('Error fetching partners data:', error);
    
    // Provide more specific error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error - please check your internet connection');
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch partners data');
  }
}