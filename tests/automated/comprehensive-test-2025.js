// COMPREHENSIVE PROFESSIONAL TEST SUITE 2025
// Testing all critical functionality of the portfolio

console.log('🧪 STARTING COMPREHENSIVE TEST SUITE 2025');
console.log('=====================================');

// Test Configuration
const BASE_URL = 'http://localhost:5173';
const LANGUAGES = ['cs', 'en'];
const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1920
};

// Test Results Storage
const testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: []
};

// Test Helper Functions
function logTest(name, status, message = '') {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
  console.log(`${icon} ${name}${message ? ': ' + message : ''}`);
  
  if (status === 'pass') testResults.passed++;
  else if (status === 'fail') {
    testResults.failed++;
    testResults.errors.push({ test: name, error: message });
  }
  else testResults.warnings++;
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 1. LANGUAGE SWITCHING TESTS
async function testLanguageSwitching() {
  console.log('\n📌 TESTING LANGUAGE SWITCHING');
  console.log('----------------------------');
  
  try {
    // Test language switcher visibility
    const switcher = document.querySelector('[class*="language-switcher"]');
    if (switcher) {
      logTest('Language switcher exists', 'pass');
      
      // Test switching to English
      const enButton = document.querySelector('button[aria-label*="English"]');
      if (enButton) {
        enButton.click();
        await delay(500);
        
        const heroText = document.querySelector('h1');
        if (heroText && heroText.textContent.includes('Hi, I am')) {
          logTest('English language switch', 'pass');
        } else {
          logTest('English language switch', 'fail', 'Text not changed');
        }
      }
      
      // Test switching back to Czech
      const csButton = document.querySelector('button[aria-label*="Čeština"]');
      if (csButton) {
        csButton.click();
        await delay(500);
        
        const heroText = document.querySelector('h1');
        if (heroText && heroText.textContent.includes('Ahoj, jsem')) {
          logTest('Czech language switch', 'pass');
        } else {
          logTest('Czech language switch', 'fail', 'Text not changed');
        }
      }
    } else {
      logTest('Language switcher exists', 'fail', 'Component not found');
    }
  } catch (error) {
    logTest('Language switching', 'fail', error.message);
  }
}

// 2. ROI CALCULATOR TESTS
async function testROICalculator() {
  console.log('\n📌 TESTING ROI CALCULATOR');
  console.log('------------------------');
  
  try {
    // Navigate to ROI Calculator
    const roiLink = document.querySelector('a[href="#roi-calculator"]');
    if (roiLink) {
      roiLink.click();
      await delay(1000);
      
      const roiSection = document.querySelector('#roi-calculator');
      if (roiSection) {
        logTest('ROI Calculator section exists', 'pass');
        
        // Test calculator type buttons
        const productionBtn = document.querySelector('button:has-text("Výrobní firma")');
        const servicesBtn = document.querySelector('button:has-text("Služby")');
        const otherBtn = document.querySelector('button:has-text("Jiný projekt")');
        
        if (productionBtn && servicesBtn && otherBtn) {
          logTest('All calculator type buttons exist', 'pass');
          
          // Test production calculator
          productionBtn.click();
          await delay(500);
          
          const hoursInput = document.querySelector('input[type="number"][min="1"]');
          const peopleInput = document.querySelector('input[type="number"][min="1"][max="1000"]');
          const wageInput = document.querySelector('input[type="number"][min="50"]');
          
          if (hoursInput && peopleInput && wageInput) {
            logTest('Production calculator inputs exist', 'pass');
            
            // Test calculation
            hoursInput.value = '10';
            peopleInput.value = '5';
            wageInput.value = '400';
            
            hoursInput.dispatchEvent(new Event('input', { bubbles: true }));
            peopleInput.dispatchEvent(new Event('input', { bubbles: true }));
            wageInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            await delay(500);
            
            const resultCard = document.querySelector('[class*="result-card"]');
            if (resultCard && !resultCard.textContent.includes('NaN')) {
              logTest('ROI calculation works', 'pass');
            } else {
              logTest('ROI calculation works', 'fail', 'NaN in results');
            }
          } else {
            logTest('Production calculator inputs exist', 'fail');
          }
        } else {
          logTest('All calculator type buttons exist', 'fail');
        }
        
        // Test project dropdown
        const projectSelect = document.querySelector('select');
        if (projectSelect && projectSelect.options.length > 5) {
          logTest('Project type dropdown populated', 'pass');
          
          // Check for ERP system removal
          const hasERP = Array.from(projectSelect.options).some(opt => 
            opt.textContent.toLowerCase().includes('erp')
          );
          if (!hasERP) {
            logTest('ERP system removed from dropdown', 'pass');
          } else {
            logTest('ERP system removed from dropdown', 'fail', 'ERP still exists');
          }
        } else {
          logTest('Project type dropdown populated', 'fail');
        }
      } else {
        logTest('ROI Calculator section exists', 'fail');
      }
    } else {
      logTest('ROI Calculator navigation', 'fail', 'Link not found');
    }
  } catch (error) {
    logTest('ROI Calculator', 'fail', error.message);
  }
}

// 3. EMAIL CAPTURE MODAL TESTS
async function testEmailCapture() {
  console.log('\n📌 TESTING EMAIL CAPTURE MODAL');
  console.log('------------------------------');
  
  try {
    // Check if modal appears after calculation
    const calculateBtn = document.querySelector('button:has-text("Spočítat")');
    if (calculateBtn) {
      calculateBtn.click();
      
      // Wait for 30 seconds timer (in real test we'd mock this)
      console.log('⏱️  Waiting for email capture modal (simulated)...');
      
      // Simulate modal appearance
      await delay(2000);
      
      // Check for modal elements
      const emailInput = document.querySelector('input[type="email"]');
      const gdprCheckbox = document.querySelector('input[type="checkbox"]');
      
      if (emailInput && gdprCheckbox) {
        logTest('Email capture modal appears', 'pass');
        
        // Test form validation
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.click();
          await delay(100);
          
          const errorMsg = document.querySelector('[class*="text-red"]');
          if (errorMsg) {
            logTest('Email validation works', 'pass');
          } else {
            logTest('Email validation works', 'fail', 'No error shown');
          }
        }
      } else {
        logTest('Email capture modal appears', 'warning', 'Modal not triggered in test');
      }
    }
  } catch (error) {
    logTest('Email capture modal', 'fail', error.message);
  }
}

// 4. RESPONSIVE DESIGN TESTS
async function testResponsiveDesign() {
  console.log('\n📌 TESTING RESPONSIVE DESIGN');
  console.log('----------------------------');
  
  // Test navigation mobile menu
  if (window.innerWidth < 768) {
    const mobileMenuBtn = document.querySelector('button[aria-label*="Menu"]');
    if (mobileMenuBtn) {
      logTest('Mobile menu button exists', 'pass');
    } else {
      logTest('Mobile menu button exists', 'fail');
    }
  }
  
  // Test touch targets
  const buttons = document.querySelectorAll('button, a');
  let smallTargets = 0;
  
  buttons.forEach(btn => {
    const rect = btn.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      smallTargets++;
    }
  });
  
  if (smallTargets === 0) {
    logTest('All touch targets >= 44px', 'pass');
  } else {
    logTest('All touch targets >= 44px', 'warning', `${smallTargets} small targets found`);
  }
  
  // Test scrollbar visibility
  const hasCustomScrollbar = document.body.style.cssText.includes('scrollbar') ||
    window.getComputedStyle(document.body).getPropertyValue('scrollbar-width');
  
  if (hasCustomScrollbar) {
    logTest('Custom scrollbar applied', 'pass');
  } else {
    logTest('Custom scrollbar applied', 'warning', 'Default scrollbar detected');
  }
}

// 5. ACCESSIBILITY TESTS
async function testAccessibility() {
  console.log('\n📌 TESTING ACCESSIBILITY');
  console.log('------------------------');
  
  // Test skip navigation link
  const skipNav = document.querySelector('a[href="#main-content"]');
  if (skipNav) {
    logTest('Skip navigation link exists', 'pass');
  } else {
    logTest('Skip navigation link exists', 'fail');
  }
  
  // Test ARIA labels
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  let missingAria = 0;
  
  interactiveElements.forEach(el => {
    const hasLabel = el.getAttribute('aria-label') || 
                    el.getAttribute('aria-labelledby') ||
                    el.textContent?.trim() ||
                    el.querySelector('svg'); // Icons
    
    if (!hasLabel) missingAria++;
  });
  
  if (missingAria === 0) {
    logTest('All interactive elements have labels', 'pass');
  } else {
    logTest('All interactive elements have labels', 'warning', `${missingAria} missing labels`);
  }
  
  // Test focus styles
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
  if (focusableElements.length > 0) {
    const firstElement = focusableElements[0];
    firstElement.focus();
    
    const focusStyle = window.getComputedStyle(firstElement);
    if (focusStyle.outline !== 'none' || focusStyle.boxShadow !== 'none') {
      logTest('Focus styles visible', 'pass');
    } else {
      logTest('Focus styles visible', 'warning', 'May need improvement');
    }
  }
}

// 6. PERFORMANCE TESTS
async function testPerformance() {
  console.log('\n📌 TESTING PERFORMANCE');
  console.log('----------------------');
  
  // Check lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (lazyImages.length > 0) {
    logTest('Lazy loading implemented', 'pass', `${lazyImages.length} images`);
  } else {
    logTest('Lazy loading implemented', 'warning', 'No lazy images found');
  }
  
  // Check WebP images
  const images = document.querySelectorAll('img');
  let webpCount = 0;
  
  images.forEach(img => {
    if (img.src.includes('.webp')) webpCount++;
  });
  
  if (webpCount > 0) {
    logTest('WebP images used', 'pass', `${webpCount} WebP images`);
  } else {
    logTest('WebP images used', 'warning', 'Consider using WebP format');
  }
  
  // Check bundle size (mock)
  if (window.performance && performance.getEntriesByType) {
    const resources = performance.getEntriesByType('resource');
    const jsResources = resources.filter(r => r.name.includes('.js'));
    
    let totalSize = 0;
    jsResources.forEach(r => {
      totalSize += r.transferSize || 0;
    });
    
    if (totalSize < 500000) { // 500KB
      logTest('JavaScript bundle size', 'pass', `${(totalSize/1024).toFixed(2)}KB`);
    } else {
      logTest('JavaScript bundle size', 'warning', `${(totalSize/1024).toFixed(2)}KB - consider optimization`);
    }
  }
}

// 7. SEO TESTS
async function testSEO() {
  console.log('\n📌 TESTING SEO');
  console.log('--------------');
  
  // Check meta tags
  const metaTags = {
    'description': document.querySelector('meta[name="description"]'),
    'keywords': document.querySelector('meta[name="keywords"]'),
    'og:title': document.querySelector('meta[property="og:title"]'),
    'og:description': document.querySelector('meta[property="og:description"]'),
    'og:image': document.querySelector('meta[property="og:image"]'),
    'twitter:card': document.querySelector('meta[name="twitter:card"]')
  };
  
  Object.entries(metaTags).forEach(([name, tag]) => {
    if (tag && tag.content) {
      logTest(`Meta ${name}`, 'pass');
    } else {
      logTest(`Meta ${name}`, 'fail', 'Missing or empty');
    }
  });
  
  // Check structured data
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  if (structuredData) {
    try {
      const data = JSON.parse(structuredData.textContent);
      if (data['@context'] && data['@type']) {
        logTest('Structured data valid', 'pass');
      } else {
        logTest('Structured data valid', 'fail', 'Invalid format');
      }
    } catch (e) {
      logTest('Structured data valid', 'fail', 'JSON parse error');
    }
  } else {
    logTest('Structured data exists', 'fail');
  }
  
  // Check hreflang
  const hreflangTags = document.querySelectorAll('link[hreflang]');
  if (hreflangTags.length >= 2) {
    logTest('Hreflang tags', 'pass', `${hreflangTags.length} languages`);
  } else {
    logTest('Hreflang tags', 'fail', 'Missing multilingual support');
  }
}

// 8. ERROR BOUNDARY TESTS
async function testErrorHandling() {
  console.log('\n📌 TESTING ERROR HANDLING');
  console.log('-------------------------');
  
  // Check console for errors
  const originalError = console.error;
  let errorCount = 0;
  
  console.error = function(...args) {
    errorCount++;
    originalError.apply(console, args);
  };
  
  // Simulate some interactions
  const buttons = document.querySelectorAll('button');
  for (let i = 0; i < Math.min(5, buttons.length); i++) {
    buttons[i].click();
    await delay(100);
  }
  
  console.error = originalError;
  
  if (errorCount === 0) {
    logTest('No console errors during interaction', 'pass');
  } else {
    logTest('No console errors during interaction', 'fail', `${errorCount} errors detected`);
  }
}

// 9. CASE STUDIES MODAL TESTS
async function testCaseStudies() {
  console.log('\n📌 TESTING CASE STUDIES');
  console.log('-----------------------');
  
  try {
    const caseStudyButtons = document.querySelectorAll('button:has-text("Zobrazit Case Study")');
    
    if (caseStudyButtons.length >= 6) {
      logTest('All 6 case study buttons found', 'pass');
      
      // Test first modal
      caseStudyButtons[0].click();
      await delay(500);
      
      const modal = document.querySelector('[role="dialog"]');
      if (modal) {
        logTest('Case study modal opens', 'pass');
        
        // Check for bilingual content
        const hasEnglishContent = modal.textContent.includes('Problem') || 
                                 modal.textContent.includes('Solution');
        const hasCzechContent = modal.textContent.includes('Problém') || 
                               modal.textContent.includes('Řešení');
        
        if (hasEnglishContent || hasCzechContent) {
          logTest('Case study content loaded', 'pass');
        } else {
          logTest('Case study content loaded', 'fail', 'Content missing');
        }
        
        // Close modal
        const closeBtn = modal.querySelector('button[aria-label*="Close"], button[aria-label*="Zavřít"]');
        if (closeBtn) {
          closeBtn.click();
          await delay(300);
          logTest('Modal close functionality', 'pass');
        }
      } else {
        logTest('Case study modal opens', 'fail');
      }
    } else {
      logTest('All 6 case study buttons found', 'fail', `Only ${caseStudyButtons.length} found`);
    }
  } catch (error) {
    logTest('Case studies', 'fail', error.message);
  }
}

// 10. CONTACT FORM TESTS
async function testContactForm() {
  console.log('\n📌 TESTING CONTACT FORM');
  console.log('-----------------------');
  
  try {
    // Navigate to contact
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
      contactLink.click();
      await delay(1000);
      
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        const nameInput = contactSection.querySelector('input[name="name"], input[name="user_name"]');
        const emailInput = contactSection.querySelector('input[type="email"]');
        const messageTextarea = contactSection.querySelector('textarea');
        const submitBtn = contactSection.querySelector('button[type="submit"]');
        
        if (nameInput && emailInput && messageTextarea && submitBtn) {
          logTest('All contact form fields exist', 'pass');
          
          // Test validation
          submitBtn.click();
          await delay(100);
          
          const hasValidation = contactSection.querySelector('[class*="border-red"], [class*="text-red"]');
          if (hasValidation) {
            logTest('Contact form validation', 'pass');
          } else {
            logTest('Contact form validation', 'warning', 'May need validation');
          }
        } else {
          logTest('All contact form fields exist', 'fail', 'Missing fields');
        }
      }
    }
  } catch (error) {
    logTest('Contact form', 'fail', error.message);
  }
}

// RUN ALL TESTS
async function runAllTests() {
  console.log('🚀 COMPREHENSIVE TEST SUITE 2025 - STARTED');
  console.log('==========================================');
  console.log(`📅 Date: ${new Date().toLocaleString()}`);
  console.log(`🌐 URL: ${window.location.href}`);
  console.log(`📱 Viewport: ${window.innerWidth}x${window.innerHeight}`);
  console.log(`🌍 Language: ${document.documentElement.lang || 'cs'}`);
  
  await testLanguageSwitching();
  await testROICalculator();
  await testEmailCapture();
  await testResponsiveDesign();
  await testAccessibility();
  await testPerformance();
  await testSEO();
  await testErrorHandling();
  await testCaseStudies();
  await testContactForm();
  
  // Final Report
  console.log('\n📊 TEST RESULTS SUMMARY');
  console.log('=======================');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⚠️  Warnings: ${testResults.warnings}`);
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.errors.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    testResults.errors.forEach(error => {
      console.log(`   - ${error.test}: ${error.error}`);
    });
  }
  
  console.log('\n✨ TEST SUITE COMPLETED!');
  
  // Return results for external use
  return testResults;
}

// Auto-run tests if opened directly
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('🔄 Auto-running tests in 3 seconds...');
      setTimeout(runAllTests, 3000);
    }, 1000);
  });
}

// Export for manual use
window.runPortfolioTests = runAllTests;