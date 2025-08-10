// BUILD VERIFICATION TEST 2025
// Tests production build quality and deployment readiness

console.log('🏗️ BUILD VERIFICATION TEST SUITE');
console.log('=================================');

const buildTests = {
    passed: 0,
    failed: 0,
    warnings: 0,
    critical: []
};

function logBuildTest(name, status, message = '', critical = false) {
    const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
    console.log(`${icon} ${name}${message ? ': ' + message : ''}`);
    
    if (status === 'pass') buildTests.passed++;
    else if (status === 'fail') {
        buildTests.failed++;
        if (critical) buildTests.critical.push({ test: name, error: message });
    }
    else buildTests.warnings++;
}

// 1. BUNDLE SIZE ANALYSIS
async function testBundleSize() {
    console.log('\n📦 TESTING BUNDLE SIZE');
    console.log('----------------------');
    
    try {
        // Check for main bundle
        const jsFiles = Array.from(document.querySelectorAll('script[src]'))
            .map(script => script.src)
            .filter(src => src.includes('.js'));
        
        if (jsFiles.length > 0) {
            logBuildTest('JavaScript bundles found', 'pass', `${jsFiles.length} files`);
            
            // Check for vendor chunk separation
            const hasVendorChunk = jsFiles.some(file => file.includes('vendor') || file.includes('react'));
            if (hasVendorChunk) {
                logBuildTest('Vendor chunk separation', 'pass');
            } else {
                logBuildTest('Vendor chunk separation', 'warning', 'Consider code splitting');
            }
        } else {
            logBuildTest('JavaScript bundles found', 'fail', 'No JS files detected', true);
        }
        
        // Check CSS files
        const cssFiles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map(link => link.href)
            .filter(href => href.includes('.css'));
        
        if (cssFiles.length > 0) {
            logBuildTest('CSS bundles found', 'pass', `${cssFiles.length} files`);
        } else {
            logBuildTest('CSS bundles found', 'warning', 'No external CSS detected');
        }
        
    } catch (error) {
        logBuildTest('Bundle analysis', 'fail', error.message, true);
    }
}

// 2. ASSET OPTIMIZATION
async function testAssetOptimization() {
    console.log('\n🖼️ TESTING ASSET OPTIMIZATION');
    console.log('-----------------------------');
    
    // Check images
    const images = document.querySelectorAll('img');
    let webpCount = 0;
    let lazyCount = 0;
    let missingAlt = 0;
    
    images.forEach(img => {
        if (img.src.includes('.webp')) webpCount++;
        if (img.getAttribute('loading') === 'lazy') lazyCount++;
        if (!img.alt) missingAlt++;
    });
    
    if (images.length > 0) {
        logBuildTest('Images found', 'pass', `${images.length} images`);
        
        const webpPercentage = (webpCount / images.length) * 100;
        if (webpPercentage >= 80) {
            logBuildTest('WebP usage', 'pass', `${webpPercentage.toFixed(1)}%`);
        } else {
            logBuildTest('WebP usage', 'warning', `Only ${webpPercentage.toFixed(1)}% WebP images`);
        }
        
        const lazyPercentage = (lazyCount / images.length) * 100;
        if (lazyPercentage >= 70) {
            logBuildTest('Lazy loading', 'pass', `${lazyPercentage.toFixed(1)}%`);
        } else {
            logBuildTest('Lazy loading', 'warning', `Only ${lazyPercentage.toFixed(1)}% lazy loaded`);
        }
        
        if (missingAlt === 0) {
            logBuildTest('Image alt texts', 'pass');
        } else {
            logBuildTest('Image alt texts', 'fail', `${missingAlt} missing alt texts`);
        }
    }
    
    // Check for critical resources preloading
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    if (preloadLinks.length > 0) {
        logBuildTest('Resource preloading', 'pass', `${preloadLinks.length} preloaded`);
    } else {
        logBuildTest('Resource preloading', 'warning', 'No preload hints found');
    }
}

// 3. PWA VERIFICATION
async function testPWAFeatures() {
    console.log('\n📱 TESTING PWA FEATURES');
    console.log('-----------------------');
    
    // Check manifest
    const manifest = document.querySelector('link[rel="manifest"]');
    if (manifest) {
        logBuildTest('PWA manifest', 'pass');
        
        try {
            const response = await fetch(manifest.href);
            const manifestData = await response.json();
            
            const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons'];
            const missingFields = requiredFields.filter(field => !manifestData[field]);
            
            if (missingFields.length === 0) {
                logBuildTest('Manifest completeness', 'pass');
            } else {
                logBuildTest('Manifest completeness', 'warning', `Missing: ${missingFields.join(', ')}`);
            }
            
            // Check icons
            if (manifestData.icons && manifestData.icons.length >= 2) {
                logBuildTest('Manifest icons', 'pass', `${manifestData.icons.length} icons`);
            } else {
                logBuildTest('Manifest icons', 'warning', 'Insufficient icons');
            }
            
        } catch (error) {
            logBuildTest('Manifest validation', 'fail', 'Cannot parse manifest');
        }
    } else {
        logBuildTest('PWA manifest', 'fail', 'No manifest found');
    }
    
    // Check service worker
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                logBuildTest('Service Worker', 'pass', 'Registered');
            } else {
                logBuildTest('Service Worker', 'warning', 'Not registered');
            }
        } catch (error) {
            logBuildTest('Service Worker', 'fail', error.message);
        }
    } else {
        logBuildTest('Service Worker support', 'fail', 'Not supported in browser');
    }
}

// 4. SEO VERIFICATION
async function testSEOOptimization() {
    console.log('\n🔍 TESTING SEO OPTIMIZATION');
    console.log('---------------------------');
    
    // Check meta tags
    const metaTags = {
        'title': document.title,
        'description': document.querySelector('meta[name="description"]')?.content,
        'keywords': document.querySelector('meta[name="keywords"]')?.content,
        'og:title': document.querySelector('meta[property="og:title"]')?.content,
        'og:description': document.querySelector('meta[property="og:description"]')?.content,
        'og:image': document.querySelector('meta[property="og:image"]')?.content,
        'twitter:card': document.querySelector('meta[name="twitter:card"]')?.content
    };
    
    let metaScore = 0;
    Object.entries(metaTags).forEach(([key, value]) => {
        if (value && value.length > 10) {
            metaScore++;
        }
    });
    
    const metaPercentage = (metaScore / Object.keys(metaTags).length) * 100;
    if (metaPercentage >= 80) {
        logBuildTest('Meta tags completeness', 'pass', `${metaPercentage.toFixed(1)}%`);
    } else {
        logBuildTest('Meta tags completeness', 'warning', `Only ${metaPercentage.toFixed(1)}% complete`);
    }
    
    // Check structured data
    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
        try {
            const data = JSON.parse(structuredData.textContent);
            if (data['@context'] && data['@type']) {
                logBuildTest('Structured data', 'pass', `Type: ${data['@type']}`);
            } else {
                logBuildTest('Structured data', 'fail', 'Invalid format');
            }
        } catch (error) {
            logBuildTest('Structured data', 'fail', 'JSON parse error');
        }
    } else {
        logBuildTest('Structured data', 'fail', 'Not found');
    }
    
    // Check hreflang tags
    const hreflangTags = document.querySelectorAll('link[hreflang]');
    if (hreflangTags.length >= 2) {
        logBuildTest('Hreflang tags', 'pass', `${hreflangTags.length} languages`);
    } else {
        logBuildTest('Hreflang tags', 'warning', 'Missing multilingual support');
    }
    
    // Check robots.txt and sitemap
    try {
        const robotsResponse = await fetch('/robots.txt');
        if (robotsResponse.ok) {
            logBuildTest('Robots.txt', 'pass');
        } else {
            logBuildTest('Robots.txt', 'warning', 'Not found or inaccessible');
        }
    } catch (error) {
        logBuildTest('Robots.txt', 'warning', 'Cannot verify');
    }
    
    try {
        const sitemapResponse = await fetch('/sitemap.xml');
        if (sitemapResponse.ok) {
            logBuildTest('Sitemap.xml', 'pass');
        } else {
            logBuildTest('Sitemap.xml', 'warning', 'Not found or inaccessible');
        }
    } catch (error) {
        logBuildTest('Sitemap.xml', 'warning', 'Cannot verify');
    }
}

// 5. SECURITY HEADERS
async function testSecurityHeaders() {
    console.log('\n🔒 TESTING SECURITY HEADERS');
    console.log('---------------------------');
    
    try {
        const response = await fetch(window.location.href, { method: 'HEAD' });
        const headers = response.headers;
        
        const securityHeaders = {
            'Content-Security-Policy': headers.get('content-security-policy'),
            'X-Frame-Options': headers.get('x-frame-options'),
            'X-Content-Type-Options': headers.get('x-content-type-options'),
            'Referrer-Policy': headers.get('referrer-policy'),
            'Permissions-Policy': headers.get('permissions-policy')
        };
        
        let securityScore = 0;
        Object.entries(securityHeaders).forEach(([key, value]) => {
            if (value) {
                securityScore++;
                logBuildTest(key, 'pass');
            } else {
                logBuildTest(key, 'warning', 'Header not set');
            }
        });
        
        if (securityScore >= 3) {
            logBuildTest('Security headers overall', 'pass', `${securityScore}/5 headers`);
        } else {
            logBuildTest('Security headers overall', 'warning', `Only ${securityScore}/5 headers`);
        }
        
    } catch (error) {
        logBuildTest('Security headers check', 'warning', 'Cannot verify headers');
    }
}

// 6. ACCESSIBILITY COMPLIANCE
async function testAccessibilityCompliance() {
    console.log('\n♿ TESTING ACCESSIBILITY COMPLIANCE');
    console.log('----------------------------------');
    
    // Check ARIA landmarks
    const landmarks = document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer');
    if (landmarks.length >= 3) {
        logBuildTest('ARIA landmarks', 'pass', `${landmarks.length} landmarks`);
    } else {
        logBuildTest('ARIA landmarks', 'warning', 'Insufficient landmarks');
    }
    
    // Check heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const hasH1 = document.querySelector('h1');
    
    if (hasH1 && headings.length >= 5) {
        logBuildTest('Heading hierarchy', 'pass', `${headings.length} headings`);
    } else {
        logBuildTest('Heading hierarchy', 'warning', 'Improve heading structure');
    }
    
    // Check skip navigation
    const skipNav = document.querySelector('a[href="#main-content"], a[href="#main"]');
    if (skipNav) {
        logBuildTest('Skip navigation', 'pass');
    } else {
        logBuildTest('Skip navigation', 'fail', 'Not implemented');
    }
    
    // Check color contrast (basic)
    const elementsWithBackground = document.querySelectorAll('*');
    let contrastIssues = 0;
    
    // This is a simplified check - in real scenarios you'd use proper contrast ratio calculation
    elementsWithBackground.forEach(el => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const textColor = styles.color;
        
        // Basic check for very light text on light background (simplified)
        if (bgColor.includes('255, 255, 255') && textColor.includes('200, 200, 200')) {
            contrastIssues++;
        }
    });
    
    if (contrastIssues === 0) {
        logBuildTest('Color contrast (basic)', 'pass');
    } else {
        logBuildTest('Color contrast (basic)', 'warning', `${contrastIssues} potential issues`);
    }
}

// 7. PERFORMANCE METRICS
async function testPerformanceMetrics() {
    console.log('\n⚡ TESTING PERFORMANCE METRICS');
    console.log('-----------------------------');
    
    if (!window.performance) {
        logBuildTest('Performance API', 'fail', 'Not supported');
        return;
    }
    
    // Navigation timing
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        
        if (loadTime < 3000) {
            logBuildTest('Page load time', 'pass', `${loadTime}ms`);
        } else {
            logBuildTest('Page load time', 'warning', `${loadTime}ms - slow`);
        }
        
        if (domContentLoaded < 1500) {
            logBuildTest('DOM Content Loaded', 'pass', `${domContentLoaded}ms`);
        } else {
            logBuildTest('DOM Content Loaded', 'warning', `${domContentLoaded}ms - slow`);
        }
    }
    
    // Resource timing
    const resources = performance.getEntriesByType('resource');
    const totalSize = resources.reduce((total, resource) => total + (resource.transferSize || 0), 0);
    
    if (totalSize < 2000000) { // 2MB
        logBuildTest('Total resource size', 'pass', `${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    } else {
        logBuildTest('Total resource size', 'warning', `${(totalSize / 1024 / 1024).toFixed(2)}MB - large`);
    }
    
    // First Paint metrics
    const firstPaint = performance.getEntriesByName('first-paint')[0];
    const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0];
    
    if (firstPaint && firstPaint.startTime < 1000) {
        logBuildTest('First Paint', 'pass', `${firstPaint.startTime.toFixed(0)}ms`);
    } else if (firstPaint) {
        logBuildTest('First Paint', 'warning', `${firstPaint.startTime.toFixed(0)}ms - slow`);
    }
    
    if (firstContentfulPaint && firstContentfulPaint.startTime < 1500) {
        logBuildTest('First Contentful Paint', 'pass', `${firstContentfulPaint.startTime.toFixed(0)}ms`);
    } else if (firstContentfulPaint) {
        logBuildTest('First Contentful Paint', 'warning', `${firstContentfulPaint.startTime.toFixed(0)}ms - slow`);
    }
}

// RUN BUILD VERIFICATION
async function runBuildVerification() {
    console.log('🚀 BUILD VERIFICATION STARTED');
    console.log('=============================');
    console.log(`📅 Date: ${new Date().toLocaleString()}`);
    console.log(`🌐 URL: ${window.location.href}`);
    console.log(`📱 User Agent: ${navigator.userAgent.substring(0, 50)}...`);
    
    await testBundleSize();
    await testAssetOptimization();
    await testPWAFeatures();
    await testSEOOptimization();
    await testSecurityHeaders();
    await testAccessibilityCompliance();
    await testPerformanceMetrics();
    
    // Final Report
    console.log('\n📊 BUILD VERIFICATION RESULTS');
    console.log('=============================');
    console.log(`✅ Passed: ${buildTests.passed}`);
    console.log(`❌ Failed: ${buildTests.failed}`);
    console.log(`⚠️  Warnings: ${buildTests.warnings}`);
    
    const total = buildTests.passed + buildTests.failed + buildTests.warnings;
    const successRate = total > 0 ? (buildTests.passed / total) * 100 : 0;
    console.log(`📈 Success Rate: ${successRate.toFixed(1)}%`);
    
    if (buildTests.critical.length > 0) {
        console.log('\n🚨 CRITICAL ISSUES:');
        buildTests.critical.forEach(issue => {
            console.log(`   - ${issue.test}: ${issue.error}`);
        });
    }
    
    // Deployment readiness
    if (buildTests.critical.length === 0 && successRate >= 75) {
        console.log('\n🎉 BUILD IS READY FOR DEPLOYMENT! ✅');
    } else if (buildTests.critical.length > 0) {
        console.log('\n⛔ BUILD HAS CRITICAL ISSUES - FIX BEFORE DEPLOYMENT!');
    } else {
        console.log('\n⚠️  BUILD HAS WARNINGS - CONSIDER IMPROVEMENTS BEFORE DEPLOYMENT');
    }
    
    console.log('\n✨ BUILD VERIFICATION COMPLETED!');
    return buildTests;
}

// Export for manual use
window.runBuildVerification = runBuildVerification;

// Auto-run if in production environment
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('🔄 Auto-running build verification for production...');
            runBuildVerification();
        }, 2000);
    });
}