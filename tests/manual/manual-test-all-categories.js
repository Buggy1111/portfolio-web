// Manual Test Script for All ROI Calculator Categories
// Run this in browser console at http://localhost:5176

console.log('🚀 Starting ROI Calculator Full Test...');

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to simulate click
const clickElement = (element) => {
  if (element) {
    element.click();
    return true;
  }
  return false;
};

async function testCategory(categoryName, buttonText) {
  console.log(`\n📋 Testing ${categoryName} category...`);
  
  // 1. Find and click category button
  const categoryButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
    btn.textContent.includes(buttonText)
  );
  
  if (categoryButtons.length === 0) {
    console.error(`❌ ${categoryName}: Category button "${buttonText}" not found`);
    return false;
  }
  
  clickElement(categoryButtons[0]);
  await wait(1000);
  console.log(`✅ ${categoryName}: Category switched`);
  
  // 2. Find and click "Zobrazit reálné příklady"
  const exampleButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
    btn.textContent.includes('Zobrazit reálné příklady') || btn.textContent.includes('Show Real Examples')
  );
  
  if (exampleButtons.length === 0) {
    console.error(`❌ ${categoryName}: Examples button not found`);
    return false;
  }
  
  clickElement(exampleButtons[0]);
  await wait(1000);
  console.log(`✅ ${categoryName}: Examples shown`);
  
  // 3. Find pulsing eye icons
  const eyeButtons = document.querySelectorAll('[title*="case study"], [title*="Zobrazit detailní"]');
  console.log(`👁️ ${categoryName}: Found ${eyeButtons.length} eye buttons`);
  
  if (eyeButtons.length === 0) {
    console.error(`❌ ${categoryName}: No eye buttons found`);
    return false;
  }
  
  // 4. Test first eye button
  clickElement(eyeButtons[0]);
  await wait(1000);
  
  // 5. Check if modal opened
  const modal = document.querySelector('[class*="fixed"][class*="inset-0"]');
  if (!modal) {
    console.error(`❌ ${categoryName}: Modal did not open`);
    return false;
  }
  
  console.log(`✅ ${categoryName}: Modal opened successfully`);
  
  // 6. Check modal content
  const modalTitle = modal.querySelector('h2');
  const metrics = modal.querySelectorAll('[class*="text-2xl"][class*="font-bold"]');
  
  console.log(`📊 ${categoryName}: Modal title: ${modalTitle?.textContent || 'Not found'}`);
  console.log(`📊 ${categoryName}: Found ${metrics.length} metrics`);
  
  // 7. Close modal
  const closeButton = modal.querySelector('[class*="hover:bg-gray"]');
  if (closeButton) {
    clickElement(closeButton);
    await wait(500);
    console.log(`✅ ${categoryName}: Modal closed`);
  }
  
  console.log(`🎉 ${categoryName}: All tests passed!`);
  return true;
}

async function runAllTests() {
  console.log('🎯 Starting comprehensive test of all categories...\n');
  
  // Test all three categories
  const results = await Promise.all([
    testCategory('Production', 'Výroba'),
    testCategory('Services', 'Služby'),
    testCategory('Other', 'Jiný projekt')
  ]);
  
  const passedTests = results.filter(r => r).length;
  const totalTests = results.length;
  
  console.log(`\n📊 FINAL RESULTS:`);
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`${passedTests === totalTests ? '🎉 ALL TESTS PASSED!' : '❌ Some tests failed'}`);
}

// Auto-run the test
runAllTests();