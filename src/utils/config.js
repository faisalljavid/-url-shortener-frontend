// Central configuration file for API URLs

// Base API URL from environment variables
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Base URL for shortened links
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

// Auth endpoints
export const AUTH_ENDPOINTS = {
    SIGNIN: `${API_URL}/auth/signin`,
    SIGNUP: `${API_URL}/auth/signup`,
    VERIFY: `${API_URL}/auth/verify`,
};

// URL shortener endpoints
export const URL_ENDPOINTS = {
    CREATE: `${API_URL}/short-url/new`,
    GET_ALL: `${API_URL}/user/urls`,
};

// Generate full shortened URL
export const getShortenedUrl = (shortCode) => `${BASE_URL}/${shortCode}`;