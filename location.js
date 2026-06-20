/**
 * Location Utility for Kidora1
 * Handles IP-based location detection and user selection
 */

export async function detectLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const locationStr = `${data.city}, ${data.country_name}`;
        localStorage.setItem('detected_location', locationStr);
        return locationStr;
    } catch (error) {
        console.warn('Location detection failed:', error);
        return 'Lagos, Nigeria'; // Fallback
    }
}

export function getCurrentLocation() {
    return localStorage.getItem('detected_location') || 'Lagos, Nigeria';
}

export function setManualLocation(location) {
    localStorage.setItem('detected_location', location);
}
