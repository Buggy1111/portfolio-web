// Automatická kontrola zdraví webu
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== 🔍 WEB HEALTH CHECK ===\n');

// 1. Kontrola existujících komponent
const componentsToCheck = [
  'Navigation',
  'Hero', 
  'About',
  'Projects',
  'CaseStudies',
  'Skills',
  'ROICalculator',
  'Contact',
  'ErrorBoundary'
];

console.log('📂 Kontrola komponent:');
let allComponentsExist = true;

componentsToCheck.forEach(component => {
  const componentPath = path.join(__dirname, '..', 'components', `${component}.jsx`);
  const exists = fs.existsSync(componentPath);
  console.log(`  ${exists ? '✅' : '❌'} ${component}.jsx`);
  if (!exists) allComponentsExist = false;
});

// 2. Kontrola ROI konfigurace
console.log('\n🧮 Kontrola ROI kalkulátoru:');
try {
  const roiPath = path.join(__dirname, '..', 'components', 'ROICalculator.jsx');
  const roiContent = fs.readFileSync(roiPath, 'utf8');
  
  const checks = [
    { name: 'projectConfigs objekt', pattern: /const projectConfigs = {/ },
    { name: 'production sekce', pattern: /production: {/ },
    { name: 'services sekce', pattern: /services: {/ },
    { name: 'Skladový systém (85000)', pattern: /'85000': {/ },
    { name: 'Rezervační systém (45000)', pattern: /'45000': {/ },
    { name: 'calculateROI funkce', pattern: /const calculateROI = \(/ },
    { name: 'validateInputs funkce', pattern: /const validateInputs = \(/ }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(roiContent);
    console.log(`  ${found ? '✅' : '❌'} ${check.name}`);
  });
  
} catch (error) {
  console.log('  ❌ Chyba při načítání ROI kalkulátoru:', error.message);
}

// 3. Kontrola case studies dat
console.log('\n📊 Kontrola case studies:');
try {
  const caseStudiesPath = path.join(__dirname, '..', 'data', 'roiCaseStudies.js');
  const caseStudiesContent = fs.readFileSync(caseStudiesPath, 'utf8');
  
  const hasProduction = /production: \[/.test(caseStudiesContent);
  const hasServices = /services: \[/.test(caseStudiesContent);
  
  console.log(`  ${hasProduction ? '✅' : '❌'} Production case studies`);
  console.log(`  ${hasServices ? '✅' : '❌'} Services case studies`);
  
} catch (error) {
  console.log('  ❌ Chyba při načítání case studies:', error.message);
}

// 4. Kontrola language context
console.log('\n🌐 Kontrola překladů:');
try {
  const langPath = path.join(__dirname, '..', 'context', 'LanguageContext.jsx');
  const langContent = fs.readFileSync(langPath, 'utf8');
  
  const hasTranslations = /const translations = {/.test(langContent);
  const hasCzech = /cs: {/.test(langContent);
  const hasEnglish = /en: {/.test(langContent);
  
  console.log(`  ${hasTranslations ? '✅' : '❌'} Translations objekt`);
  console.log(`  ${hasCzech ? '✅' : '❌'} České překlady`);
  console.log(`  ${hasEnglish ? '✅' : '❌'} Anglické překlady`);
  
} catch (error) {
  console.log('  ❌ Chyba při načítání překladů:', error.message);
}

// 5. Výsledek
console.log('\n=== 📋 SHRNUTÍ ===');
if (allComponentsExist) {
  console.log('✅ Všechny komponenty existují');
  console.log('✅ Web by měl fungovat správně');
  console.log('🌍 Otevři: http://localhost:5175');
  console.log('📖 Checklist: manual-test.md');
} else {
  console.log('❌ Chybí některé komponenty');
  console.log('⚠️  Web nemusí fungovat správně');
}

console.log('\n🔧 Pro test spusť: npm run dev');
console.log('🧪 Pro build test: npm run build');

export default true;