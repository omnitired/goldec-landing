/**
 * API Configuration
 * Centralized configuration for all API endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://panel.zarnext.com/public/api/v1';

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  PLATFORMS: `${API_BASE_URL}/platforms`,
} as const;

/**
 * API configuration settings
 */
export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
} as const;

/**
 * Default headers for API requests
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;

/**
 * API response types
 */
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PlatformApiData {
  id: string;
  name: string;
  legal_name: string;
  city: string;
  state: string;
  website_url: string;
  // Future fields that will be added
  image?: string;
  created_at?: string;
}

export interface PlatformsApiResponse {
  status: number;
  message: string;
  data: PlatformApiData[];
}