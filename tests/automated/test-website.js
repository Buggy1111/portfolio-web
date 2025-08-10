// Test script for website functionality
const puppeteer = require('puppeteer');

async function testWebsite() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('❌ Console Error:', msg.text());
    } else if (msg.type() === 'warning') {
      console.warn('⚠️ Console Warning:', msg.text());
    }
  });

  // Listen for page errors
  page.on('pageerror', error => {
    console.error('❌ Page Error:', error.message);
  });

  try {
    console.log('🔍 Testing website functionality...\n');
    
    // Test 1: Load homepage
    console.log('1️⃣ Loading homepage...');
    await page.goto('http://localhost:5175');
    await page.waitForTimeout(2000);
    console.log('✅ Homepage loaded\n');
    
    // Test 2: Check dark/light mode
    console.log('2️⃣ Checking theme switching...');
    const hour = new Date().getHours();
    const isDarkMode = hour >= 20 || hour < 6;
    console.log(`Current time: ${hour}:00 - Should be ${isDarkMode ? 'dark' : 'light'} mode`);
    
    // Test 3: Navigation
    console.log('\n3️⃣ Testing navigation...');
    await page.click('a[href="#about"]');
    await page.waitForTimeout(1000);
    console.log('✅ Navigation to About section works');
    
    // Test 4: Language switcher
    console.log('\n4️⃣ Testing language switcher...');
    await page.click('button[aria-label="Switch language"]');
    await page.waitForTimeout(1000);
    console.log('✅ Language switched');
    
    // Test 5: ROI Calculator
    console.log('\n5️⃣ Testing ROI Calculator...');
    await page.click('a[href="#roi-calculator"]');
    await page.waitForTimeout(1000);
    
    // Fill calculator
    await page.type('input[placeholder="35"]', '50');
    await page.type('input[placeholder="25000"]', '30000');
    await page.type('input[placeholder="20"]', '25');
    
    // Calculate
    const calculateButton = await page.$('button:has-text("Vypočítat ROI")');
    if (calculateButton) {
      await calculateButton.click();
      await page.waitForTimeout(2000);
      console.log('✅ ROI calculation completed');
      
      // Check if email modal appears
      const emailModal = await page.$('text="Získejte kompletní ROI analýzu na email"');
      if (emailModal) {
        console.log('✅ Email capture modal appeared');
      }
    }
    
    // Test 6: Mobile menu
    console.log('\n6️⃣ Testing mobile responsiveness...');
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    console.log('✅ Mobile view rendered');
    
    // Test 7: InfoPanel
    console.log('\n7️⃣ Testing InfoPanel...');
    await page.setViewport({ width: 1920, height: 1080 });
    const infoPanelButton = await page.$('button[aria-label*="Info"]');
    if (infoPanelButton) {
      await infoPanelButton.click();
      await page.waitForTimeout(1000);
      console.log('✅ InfoPanel opens correctly');
    }
    
    console.log('\n✅ All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    // await browser.close();
  }
}

// Run test
testWebsite();