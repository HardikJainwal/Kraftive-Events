export const GA_TRACKING_ID = 'AW-18150504620';
export const CONVERSION_ID = 'AW-18150504620/0fH4CK6Ti94cEKzx6s5D';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Tracks a Google Ads lead conversion event.
 */
export const trackLeadConversion = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: CONVERSION_ID,
    });
  }
};
