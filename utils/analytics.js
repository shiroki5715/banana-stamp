/**
 * GA4 Event Tracking Utility
 * Sends events to Google Analytics 4 via gtag.
 */

/**
 * Sends a custom event to GA4.
 * @param {string} action - The event name (e.g., 'generate_complete', 'download_zip').
 * @param {object} params - Optional parameters to include with the event.
 */
export const sendGAEvent = (action, params = {}) => {
    try {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', action, params);
        } else {
            console.log(`[GA4-DEV] Event: ${action}`, params);
        }
    } catch (err) {
        console.warn("[GA4] Failed to send event:", err);
    }
};
