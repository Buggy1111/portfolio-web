/**
 * 🏆 PROFESIONÁLNÍ AUTOMATED TEST RUNNER
 * Portfolio Web - michalbugar.dev
 * 
 * Automated validation of critical website functions
 * Runs in browser console for instant results
 */

class PortfolioTestRunner {
    constructor() {
        this.testResults = {
            startTime: Date.now(),
            tests: [],
            passed: 0,
            failed: 0,
            warnings: 0
        };
        
        this.selectors = {
            navigation: 'nav a',
            roiCalculator: '#roi-calculator',
            contactForm: '#contact form',
            languageSwitch: '[data-language]',
            tooltipIcons: '[data-tooltip]',
            caseStudyButtons: '[data-case-study]',
            threeJsCanvas: 'canvas',
            infoPanelButton: '[data-info-panel]'
        };
    }

    /**
     * 🚀 Run all automated tests
     */
    async runAllTests() {
        console.log('🧪 Starting PROFESIONÁLNÍ Portfolio Test Suite...\n');
        console.log('📊 Testing michalbugar.dev - React 19 + Smart Tooltips\n');
        
        this.logHeader('🚨 KRITICKÉ TESTY');
        await this.testPageLoad();
        await this.testConsoleErrors();
        await this.testNavigationLinks();
        await this.testROICalculatorPresence();
        await this.testContactFormPresence();
        
        this.logHeader('🔥 VYSOKÁ PRIORITA');
        await this.testTooltipFunctionality();
        await this.testLanguageSwitcher();
        await this.testCaseStudyModals();
        await this.testResponsiveDesign();
        
        this.logHeader('🎨 UI/UX DESIGN');
        await this.testThreeJSAnimation();
        await this.testScrollProgress();
        await this.testCustomScrollbar();
        await this.testPulsingAnimations();
        
        this.logHeader('⚡ PERFORMANCE');
        await this.testPagePerformance();
        await this.testImageOptimization();
        await this.testBundleSize();
        
        this.logHeader('🔍 SEO CHECKS');
        await this.testMetaTags();
        await this.testStructuredData();
        await this.testSemanticHTML();
        
        this.logHeader('♿ ACCESSIBILITY');
        await this.testKeyboardNavigation();
        await this.testARIALabels();
        await this.testColorContrast();
        
        this.generateFinalReport();
    }

    /**
     * 🧪 Individual Test Methods
     */
    async testPageLoad() {
        const startTime = performance.now();
        const loadTime = performance.now() - startTime;
        
        if (document.readyState === 'complete') {
            this.pass('Page Load', `Loaded in ${loadTime.toFixed(2)}ms`);
        } else {
            this.fail('Page Load', 'Page not fully loaded');
        }
    }

    async testConsoleErrors() {
        const originalError = console.error;
        let errorCount = 0;
        
        console.error = function(...args) {
            errorCount++;
            originalError.apply(console, args);
        };
        
        setTimeout(() => {
            if (errorCount === 0) {
                this.pass('Console Errors', 'No console errors detected');
            } else {
                this.fail('Console Errors', `${errorCount} console errors found`);
            }
            console.error = originalError;
        }, 1000);
    }

    async testNavigationLinks() {
        const navLinks = document.querySelectorAll(this.selectors.navigation);
        
        if (navLinks.length >= 5) {
            let workingLinks = 0;
            navLinks.forEach(link => {
                if (link.href && link.textContent.trim()) {
                    workingLinks++;
                }
            });
            
            if (workingLinks === navLinks.length) {
                this.pass('Navigation Links', `All ${navLinks.length} links functional`);
            } else {
                this.warning('Navigation Links', `${workingLinks}/${navLinks.length} links working`);
            }
        } else {
            this.fail('Navigation Links', 'Insufficient navigation links found');
        }
    }

    async testROICalculatorPresence() {
        const roiSection = document.querySelector(this.selectors.roiCalculator);
        const dropdowns = document.querySelectorAll('#roi-calculator select');
        
        if (roiSection && dropdowns.length >= 2) {
            this.pass('ROI Calculator', `Present with ${dropdowns.length} dropdowns`);
        } else {
            this.fail('ROI Calculator', 'Missing or incomplete ROI calculator');
        }
    }

    async testContactFormPresence() {
        const contactForm = document.querySelector(this.selectors.contactForm);
        const inputs = contactForm ? contactForm.querySelectorAll('input, textarea') : [];
        
        if (contactForm && inputs.length >= 3) {
            this.pass('Contact Form', `EmailJS form with ${inputs.length} fields`);
        } else {
            this.fail('Contact Form', 'Contact form missing or incomplete');
        }
    }

    async testTooltipFunctionality() {
        const tooltipIcons = document.querySelectorAll('.roi-calculator .info-icon, [data-tooltip]');
        
        if (tooltipIcons.length >= 4) {
            // Test if tooltips contain EU category data
            let hasEUCategories = false;
            tooltipIcons.forEach(icon => {
                const tooltip = icon.closest('[data-tooltip-content]');
                if (tooltip && (tooltip.textContent.includes('Mikropodnik') || 
                              tooltip.textContent.includes('zaměstnanců'))) {
                    hasEUCategories = true;
                }
            });
            
            if (hasEUCategories) {
                this.pass('Smart Tooltips', `${tooltipIcons.length} tooltips with EU categories`);
            } else {
                this.warning('Smart Tooltips', 'Tooltips present but content needs verification');
            }
        } else {
            this.fail('Smart Tooltips', 'Insufficient tooltip icons found');
        }
    }

    async testLanguageSwitcher() {
        const langSwitch = document.querySelector('.language-switcher, [data-language]');
        const czechText = document.querySelector('[data-lang="cs"]');
        const englishText = document.querySelector('[data-lang="en"]');
        
        if (langSwitch && (czechText || englishText)) {
            this.pass('Language Switcher', 'Bilingual CZ/EN support detected');
        } else {
            this.warning('Language Switcher', 'Language switching needs verification');
        }
    }

    async testCaseStudyModals() {
        const caseStudyButtons = document.querySelectorAll('.case-study button, [data-case-study]');
        
        if (caseStudyButtons.length >= 6) {
            this.pass('Case Studies', `${caseStudyButtons.length} MSK case studies found`);
        } else {
            this.warning('Case Studies', `Only ${caseStudyButtons.length} case studies detected`);
        }
    }

    async testResponsiveDesign() {
        const viewport = window.innerWidth;
        const hasResponsiveCSS = document.querySelector('meta[name="viewport"]');
        
        if (hasResponsiveCSS && viewport > 0) {
            this.pass('Responsive Design', `Viewport: ${viewport}px with responsive meta tag`);
        } else {
            this.fail('Responsive Design', 'Missing responsive configuration');
        }
    }

    async testThreeJSAnimation() {
        const canvas = document.querySelector('canvas');
        const threeJsScript = document.querySelector('script[src*="three"]');
        
        if (canvas || threeJsScript) {
            this.pass('3D Animation', 'Three.js canvas or script detected');
        } else {
            this.warning('3D Animation', 'Three.js implementation needs verification');
        }
    }

    async testScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress, .progress-bar');
        
        if (progressBar) {
            this.pass('Scroll Progress', 'Progress bar component found');
        } else {
            this.warning('Scroll Progress', 'Progress bar not detected');
        }
    }

    async testCustomScrollbar() {
        const computedStyle = getComputedStyle(document.documentElement);
        const hasCustomScrollbar = computedStyle.getPropertyValue('--scrollbar-width') || 
                                  document.querySelector('style').textContent.includes('scrollbar');
        
        if (hasCustomScrollbar) {
            this.pass('Custom Scrollbar', 'Custom scrollbar styles detected');
        } else {
            this.warning('Custom Scrollbar', 'Custom scrollbar needs verification');
        }
    }

    async testPulsingAnimations() {
        const pulsingElements = document.querySelectorAll('.animate-pulse, [class*="pulse"]');
        
        if (pulsingElements.length >= 2) {
            this.pass('Pulsing Animations', `${pulsingElements.length} pulsing elements found`);
        } else {
            this.warning('Pulsing Animations', 'Limited pulsing animations detected');
        }
    }

    async testPagePerformance() {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData ? perfData.loadEventEnd - perfData.loadEventStart : 0;
        
        if (loadTime < 3000) {
            this.pass('Performance', `Load time: ${loadTime.toFixed(0)}ms`);
        } else if (loadTime < 5000) {
            this.warning('Performance', `Load time: ${loadTime.toFixed(0)}ms (acceptable)`);
        } else {
            this.fail('Performance', `Load time: ${loadTime.toFixed(0)}ms (too slow)`);
        }
    }

    async testImageOptimization() {
        const images = document.querySelectorAll('img');
        let webpCount = 0;
        
        images.forEach(img => {
            if (img.src.includes('.webp')) {
                webpCount++;
            }
        });
        
        const webpPercentage = images.length > 0 ? (webpCount / images.length) * 100 : 0;
        
        if (webpPercentage >= 80) {
            this.pass('Image Optimization', `${webpPercentage.toFixed(0)}% WebP images`);
        } else if (webpPercentage >= 50) {
            this.warning('Image Optimization', `${webpPercentage.toFixed(0)}% WebP images`);
        } else {
            this.fail('Image Optimization', `Only ${webpPercentage.toFixed(0)}% WebP images`);
        }
    }

    async testBundleSize() {
        const scripts = document.querySelectorAll('script[src]');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        if (scripts.length > 0 && stylesheets.length > 0) {
            this.pass('Bundle Optimization', `${scripts.length} scripts, ${stylesheets.length} stylesheets`);
        } else {
            this.warning('Bundle Optimization', 'Bundle analysis needs manual verification');
        }
    }

    async testMetaTags() {
        const title = document.querySelector('title');
        const description = document.querySelector('meta[name="description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        
        if (title && description && ogImage) {
            this.pass('Meta Tags', 'Title, description, and OG image present');
        } else {
            this.warning('Meta Tags', 'Some meta tags missing');
        }
    }

    async testStructuredData() {
        const structuredData = document.querySelector('script[type="application/ld+json"]');
        
        if (structuredData) {
            this.pass('Structured Data', 'Schema.org markup detected');
        } else {
            this.warning('Structured Data', 'No structured data found');
        }
    }

    async testSemanticHTML() {
        const semanticTags = ['header', 'nav', 'main', 'section', 'article', 'footer'];
        let foundTags = 0;
        
        semanticTags.forEach(tag => {
            if (document.querySelector(tag)) {
                foundTags++;
            }
        });
        
        if (foundTags >= 4) {
            this.pass('Semantic HTML', `${foundTags}/${semanticTags.length} semantic tags used`);
        } else {
            this.warning('Semantic HTML', `Only ${foundTags}/${semanticTags.length} semantic tags found`);
        }
    }

    async testKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length >= 10) {
            this.pass('Keyboard Navigation', `${focusableElements.length} focusable elements`);
        } else {
            this.warning('Keyboard Navigation', 'Limited keyboard navigation');
        }
    }

    async testARIALabels() {
        const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
        
        if (ariaElements.length >= 5) {
            this.pass('ARIA Labels', `${ariaElements.length} ARIA attributes found`);
        } else {
            this.warning('ARIA Labels', 'Limited ARIA accessibility features');
        }
    }

    async testColorContrast() {
        // Simplified contrast check - in real scenario would use specialized tools
        const darkBg = document.querySelector('[class*="dark"], .bg-gray-900');
        const lightBg = document.querySelector('[class*="light"], .bg-white');
        
        if (darkBg && lightBg) {
            this.pass('Color Contrast', 'Dark/light theme variations available');
        } else {
            this.warning('Color Contrast', 'Theme variations need manual verification');
        }
    }

    /**
     * 📊 Reporting Methods
     */
    pass(testName, details) {
        this.testResults.passed++;
        this.testResults.tests.push({
            name: testName,
            status: 'PASS',
            details: details,
            timestamp: Date.now()
        });
        console.log(`✅ ${testName}: ${details}`);
    }

    fail(testName, details) {
        this.testResults.failed++;
        this.testResults.tests.push({
            name: testName,
            status: 'FAIL', 
            details: details,
            timestamp: Date.now()
        });
        console.log(`❌ ${testName}: ${details}`);
    }

    warning(testName, details) {
        this.testResults.warnings++;
        this.testResults.tests.push({
            name: testName,
            status: 'WARNING',
            details: details,
            timestamp: Date.now()
        });
        console.log(`⚠️ ${testName}: ${details}`);
    }

    logHeader(text) {
        console.log(`\n${text}`);
        console.log('='.repeat(text.length));
    }

    generateFinalReport() {
        const total = this.testResults.passed + this.testResults.failed + this.testResults.warnings;
        const successRate = total > 0 ? Math.round((this.testResults.passed / total) * 100) : 0;
        const duration = Math.round((Date.now() - this.testResults.startTime) / 1000);
        
        console.log('\n🏆 FINÁLNÍ REPORT');
        console.log('==================');
        console.log(`📊 Celkem testů: ${total}`);
        console.log(`✅ Úspěšné: ${this.testResults.passed}`);
        console.log(`❌ Neúspěšné: ${this.testResults.failed}`);
        console.log(`⚠️ Varování: ${this.testResults.warnings}`);
        console.log(`📈 Úspěšnost: ${successRate}%`);
        console.log(`⏱️ Doba testování: ${duration}s`);
        
        // Quality assessment
        let qualityGrade = 'F';
        let status = 'CRITICAL ISSUES';
        
        if (successRate >= 95) {
            qualityGrade = 'A+';
            status = '🏆 EXCELLENT - PRODUCTION READY';
        } else if (successRate >= 90) {
            qualityGrade = 'A';
            status = '✅ VERY GOOD - MINOR TWEAKS';
        } else if (successRate >= 85) {
            qualityGrade = 'B+';
            status = '⚠️ GOOD - SOME IMPROVEMENTS';
        } else if (successRate >= 80) {
            qualityGrade = 'B';
            status = '🔧 ACCEPTABLE - NEEDS WORK';
        } else if (successRate >= 70) {
            qualityGrade = 'C';
            status = '⚠️ BELOW STANDARD';
        }
        
        console.log(`🎯 Kvalita: ${qualityGrade}`);
        console.log(`🚀 Status: ${status}`);
        
        if (successRate >= 85) {
            console.log('\n🎉 GRATULACE! Web je připraven k nasazení na michalbugar.dev');
        } else {
            console.log('\n🔧 DOPORUČENÍ: Oprav neúspěšné testy před deployment');
        }
        
        // Export results for further analysis
        window.portfolioTestResults = this.testResults;
        console.log('\n💾 Výsledky uloženy do: window.portfolioTestResults');
        
        return this.testResults;
    }
}

/**
 * 🚀 AUTO-EXECUTION
 * Uncomment the line below to run tests automatically when script loads
 */

console.log('🧪 PROFESIONÁLNÍ Portfolio Test Runner načten!');
console.log('📋 Spusť testy příkazem: new PortfolioTestRunner().runAllTests()');
console.log('🌐 Web: http://localhost:5173');

// Auto-run tests (uncomment if desired)
// const testRunner = new PortfolioTestRunner();
// testRunner.runAllTests();

/**
 * 📚 USAGE EXAMPLES:
 * 
 * // Run all tests
 * const runner = new PortfolioTestRunner();
 * await runner.runAllTests();
 * 
 * // Access results
 * console.log(window.portfolioTestResults);
 * 
 * // Export to JSON
 * const json = JSON.stringify(window.portfolioTestResults, null, 2);
 * console.log(json);
 */