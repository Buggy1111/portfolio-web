// ERROR MONITORING AND REPORTING SYSTEM 2025
// Monitors console errors, React errors, and runtime issues

console.log('🔍 ERROR MONITORING SYSTEM ACTIVATED');
console.log('=====================================');

// Error tracking storage
const errorTracker = {
    errors: [],
    warnings: [],
    performance: [],
    startTime: Date.now()
};

// Override console methods to track errors
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

console.error = function(...args) {
    const error = {
        type: 'error',
        message: args.join(' '),
        timestamp: new Date().toISOString(),
        stack: new Error().stack
    };
    errorTracker.errors.push(error);
    
    // Log with visual indicator
    originalError.apply(console, ['❌ ERROR DETECTED:', ...args]);
    
    // Report if critical
    if (args.some(arg => typeof arg === 'string' && (
        arg.includes('React') || 
        arg.includes('Uncaught') || 
        arg.includes('TypeError') ||
        arg.includes('ReferenceError')
    ))) {
        reportCriticalError(error);
    }
};

console.warn = function(...args) {
    const warning = {
        type: 'warning',
        message: args.join(' '),
        timestamp: new Date().toISOString()
    };
    errorTracker.warnings.push(warning);
    
    originalWarn.apply(console, ['⚠️  WARNING:', ...args]);
};

// Window error handler
window.addEventListener('error', (event) => {
    const error = {
        type: 'runtime_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: new Date().toISOString()
    };
    
    errorTracker.errors.push(error);
    console.error('🚨 RUNTIME ERROR:', error);
});

// Promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    const error = {
        type: 'promise_rejection',
        reason: event.reason,
        timestamp: new Date().toISOString()
    };
    
    errorTracker.errors.push(error);
    console.error('🚨 UNHANDLED PROMISE REJECTION:', error);
});

// Performance monitoring
function trackPerformance() {
    if (!window.performance) return;
    
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    
    const perfData = {
        loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
        resourceCount: resources.length,
        totalResourceSize: resources.reduce((total, resource) => total + (resource.transferSize || 0), 0)
    };
    
    errorTracker.performance.push(perfData);
    
    // Log performance issues
    if (perfData.loadTime > 3000) {
        console.warn(`Slow load time: ${perfData.loadTime}ms`);
    }
    
    if (perfData.totalResourceSize > 2000000) { // 2MB
        console.warn(`Large resource size: ${(perfData.totalResourceSize / 1024 / 1024).toFixed(2)}MB`);
    }
}

// Component error boundary simulation
function trackReactErrors() {
    // Check for React DevTools
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        console.log('✅ React DevTools detected');
        
        // Monitor for React errors in console
        const reactErrorRegex = /Warning:|Error:|Failed/;
        
        // Override React's error logging (if accessible)
        if (window.React && window.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
            console.log('✅ React internals accessible for error monitoring');
        }
    }
}

// Network error monitoring
function trackNetworkErrors() {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name.includes('404') || entry.name.includes('500')) {
                const error = {
                    type: 'network_error',
                    url: entry.name,
                    status: 'failed',
                    timestamp: new Date().toISOString()
                };
                errorTracker.errors.push(error);
                console.error('🌐 NETWORK ERROR:', error);
            }
        }
    });
    
    observer.observe({ entryTypes: ['resource'] });
}

// Memory leak detection
function trackMemoryUsage() {
    if (!performance.memory) return;
    
    const memoryInfo = {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
        timestamp: Date.now()
    };
    
    // Check for memory leaks (simplified)
    if (memoryInfo.used > memoryInfo.limit * 0.8) {
        console.warn('🧠 HIGH MEMORY USAGE:', `${(memoryInfo.used / 1024 / 1024).toFixed(2)}MB`);
    }
}

// Critical error reporting
function reportCriticalError(error) {
    console.error('🚨 CRITICAL ERROR DETECTED:');
    console.error('Type:', error.type);
    console.error('Message:', error.message);
    console.error('Timestamp:', error.timestamp);
    
    // Could integrate with error tracking service here
    // e.g., Sentry, LogRocket, etc.
}

// Component lifecycle monitoring
function trackComponentLifecycle() {
    // Monitor DOM mutations for component mount/unmount
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Track component additions/removals
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.classList.contains('error-boundary')) {
                        console.warn('⚠️ Error boundary component detected');
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Accessibility error monitoring
function trackAccessibilityErrors() {
    // Check for missing alt texts
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
        console.warn(`♿ ACCESSIBILITY: ${images.length} images missing alt text`);
    }
    
    // Check for missing form labels
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    const unlabeledInputs = Array.from(inputs).filter(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        return !label && input.type !== 'hidden';
    });
    
    if (unlabeledInputs.length > 0) {
        console.warn(`♿ ACCESSIBILITY: ${unlabeledInputs.length} inputs missing labels`);
    }
    
    // Check for low contrast (basic check)
    const elements = document.querySelectorAll('*');
    let lowContrastCount = 0;
    
    elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const textColor = styles.color;
        
        // Basic contrast check (simplified)
        if (bgColor !== 'rgba(0, 0, 0, 0)' && textColor !== 'rgba(0, 0, 0, 0)') {
            // Could implement proper contrast ratio calculation here
        }
    });
}

// Generate error report
function generateErrorReport() {
    const report = {
        summary: {
            totalErrors: errorTracker.errors.length,
            totalWarnings: errorTracker.warnings.length,
            sessionDuration: Date.now() - errorTracker.startTime,
            timestamp: new Date().toISOString()
        },
        errors: errorTracker.errors,
        warnings: errorTracker.warnings,
        performance: errorTracker.performance,
        environment: {
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            url: window.location.href,
            referrer: document.referrer
        }
    };
    
    return report;
}

// Periodic monitoring
function startPeriodicMonitoring() {
    setInterval(() => {
        trackMemoryUsage();
        trackAccessibilityErrors();
        
        // Log current status
        if (errorTracker.errors.length > 0 || errorTracker.warnings.length > 0) {
            console.log(`📊 Current Status: ${errorTracker.errors.length} errors, ${errorTracker.warnings.length} warnings`);
        }
    }, 30000); // Every 30 seconds
}

// Manual test functions
window.testErrorHandling = function() {
    console.log('🧪 Testing error handling...');
    
    // Test 1: Trigger a console error
    try {
        throw new Error('Test error for monitoring');
    } catch (e) {
        console.error('Test error:', e.message);
    }
    
    // Test 2: Trigger a warning
    console.warn('Test warning for monitoring');
    
    // Test 3: Test network error (will fail)
    fetch('/nonexistent-endpoint').catch(err => {
        console.error('Network test error:', err.message);
    });
    
    console.log('✅ Error handling tests completed');
};

window.getErrorReport = function() {
    const report = generateErrorReport();
    console.log('📋 ERROR REPORT:');
    console.log(JSON.stringify(report, null, 2));
    return report;
};

window.clearErrorLog = function() {
    errorTracker.errors = [];
    errorTracker.warnings = [];
    errorTracker.performance = [];
    console.log('🗑️ Error log cleared');
};

// Initialize monitoring
function initializeErrorMonitoring() {
    console.log('🚀 Initializing error monitoring...');
    
    trackPerformance();
    trackReactErrors();
    trackNetworkErrors();
    trackComponentLifecycle();
    startPeriodicMonitoring();
    
    console.log('✅ Error monitoring initialized');
    console.log('📘 Available commands:');
    console.log('   - testErrorHandling() - Test error detection');
    console.log('   - getErrorReport() - Generate full report');
    console.log('   - clearErrorLog() - Clear error history');
}

// Auto-initialize when loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeErrorMonitoring);
} else {
    initializeErrorMonitoring();
}

// Performance monitoring after load
window.addEventListener('load', () => {
    setTimeout(trackPerformance, 1000);
});

export { errorTracker, generateErrorReport };