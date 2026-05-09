/**
 * SmartCart API Configuration File
 * 
 * This file provides easy configuration for switching between environments.
 * You can optionally use this file instead of updating BASE_URL in each HTML file.
 * 
 * USAGE INSTRUCTIONS:
 * ==================
 * Option 1: Use individual BASE_URL constants (Current approach - recommended)
 *   - Update BASE_URL in: script.js, login.html, signup.html, cart.html
 *   - This is already implemented and working
 * 
 * Option 2: Use this config file (Future enhancement)
 *   - Add <script src="config.js"></script> to all HTML files before other scripts
 *   - Update BASE_URL below once
 *   - All pages will use this constant automatically
 */

// ============================================
// Environment Configuration
// ============================================

// DEVELOPMENT (Local Testing)
// const BASE_URL = "http://localhost:5000";

// PRODUCTION (Render Backend)
const BASE_URL = "https://your-render-url.onrender.com";
// Example: const BASE_URL = "https://smartcart-backend.onrender.com";

// ============================================
// Automatic Environment Detection (Optional)
// ============================================
// Uncomment below for automatic environment switching

/*
const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000'
  : 'https://your-render-url.onrender.com';
*/

// ============================================
// Export for Module Systems (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BASE_URL };
}
