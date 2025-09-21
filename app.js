/**
 * Project: weblinker
 * Author: gildsant
 * File: app.js
 * Description: Loading animation for social links on personal webpage
 * Date: 2024-10-01
 */

// Function to create loading overlay
function createLoadingOverlay(linkType = 'default') {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Loading container
    const loadingContainer = document.createElement('div');
    loadingContainer.style.cssText = `
        text-align: center;
        color: #fff;
    `;

    // Animated spinner
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid #333;
        border-top: 3px solid #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    `;

    // Loading text
    const loadingText = document.createElement('div');
    loadingText.style.cssText = `
        font-family: 'Space Mono', monospace;
        font-size: 16px;
        color: #fff;
        margin-bottom: 10px;
    `;
    loadingText.textContent = 'Connecting';

    // Link system info
    const linkInfo = document.createElement('div');
    linkInfo.style.cssText = `
        font-family: 'Space Mono', monospace;
        font-size: 12px;
        color: #fff;
        opacity: 1;
    `;
    
    // Get specific text for each link
    const linkTexts = {
        'github': 'github.projects',
        'linkedin': 'linkedin.profile',
        'instagram': 'instagram.social',
        'twitter': 'twitter.updates',
        'email': 'email.contact',
        'spotify': 'spotify.profile',
        'default': 'system.redirect'
    };
    
    linkInfo.textContent = linkTexts[linkType] || linkTexts['default'];

    // Assembly overlay
    loadingContainer.appendChild(spinner);
    loadingContainer.appendChild(loadingText);
    loadingContainer.appendChild(linkInfo);
    overlay.appendChild(loadingContainer);

    return overlay;
}

// Function to add CSS animations
function addLoadingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .loading-fade-in {
            animation: fadeIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Main loading function
function showLoadingAndRedirect(url) {
    // Detect link type from URL
    let linkType = 'default';
    if (url.includes('github.com')) linkType = 'github';
    else if (url.includes('linkedin.com')) linkType = 'linkedin';
    else if (url.includes('instagram.com')) linkType = 'instagram';
    else if (url.includes('twitter.com') || url.includes('x.com')) linkType = 'twitter';
    else if (url.includes('mailto:')) linkType = 'email';
    else if (url.includes('spotify.com')) linkType = 'spotify';
    
    // Create and show overlay with specific link type
    const overlay = createLoadingOverlay(linkType);
    document.body.appendChild(overlay);
    
    // Show with fade in
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.classList.add('loading-fade-in');
    }, 10);
    
    // Simulate loading for 3 seconds
    setTimeout(() => {
        // Fade out
        overlay.style.opacity = '0';
        
        // Redirect after fade out
        setTimeout(() => {
            window.open(url, '_blank');
            document.body.removeChild(overlay);
        }, 300);
    }, 3000);
}

// Function to intercept link clicks
function setupLinkHandlers() {
    // Select all social links
    const socialLinks = document.querySelectorAll('footer a[href^="http"], footer a[href^="mailto:"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent immediate redirect
            const url = this.getAttribute('href');
            showLoadingAndRedirect(url);
        });
    });
}

// Initialization function
function init() {
    // Add CSS styles
    addLoadingStyles();
    
    // Wait for DOM to load completely for link handlers
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupLinkHandlers);
    } else {
        setupLinkHandlers();
    }
}

// Initialize when script loads
init();

// Debug log
console.log('🔗 Link loading system ready!');