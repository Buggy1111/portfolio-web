import { useState, useReducer, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiInfo, FiX, FiPercent, FiEye } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import ROICaseStudyModal from './ROICaseStudyModal';
import { roiCaseStudies } from '../data/roiCaseStudies';
import ROITestimonials from './ROITestimonials';
import ROIEmailCapture from './ROIEmailCapture';
import ExitIntentPopup from './ExitIntentPopup';
import useExitIntent from '../hooks/useExitIntent';
import ROIPriceTooltip from './ROIPriceTooltip';
import { priceTooltips } from '../data/roiPriceTooltips';

// Project type options with predefined values
const projectTypeOptions = {
  'crm': { 
    name: { cs: 'CRM systém', en: 'CRM System' },
    hours: '10', 
    people: '5', 
    wage: '400' 
  },
  'hr': { 
    name: { cs: 'HR řešení', en: 'HR Solution' },
    hours: '8', 
    people: '3', 
    wage: '350' 
  },
  'fakturace': { 
    name: { cs: 'Fakturace a účetnictví', en: 'Invoicing & Accounting' },
    hours: '12', 
    people: '2', 
    wage: '300' 
  },
  'sklad': { 
    name: { cs: 'Skladové hospodářství', en: 'Warehouse Management' },
    hours: '15', 
    people: '4', 
    wage: '350' 
  },
  'objednavky': { 
    name: { cs: 'Správa objednávek', en: 'Order Management' },
    hours: '6', 
    people: '3', 
    wage: '300' 
  },
  'reporting': { 
    name: { cs: 'Reporting a analýzy', en: 'Reporting & Analytics' },
    hours: '10', 
    people: '4', 
    wage: '400' 
  },
  'integrace': { 
    name: { cs: 'Integrace systémů', en: 'System Integration' },
    hours: '12', 
    people: '4', 
    wage: '450' 
  },
  'automatizace': { 
    name: { cs: 'Automatizace procesů', en: 'Process Automation' },
    hours: '10', 
    people: '5', 
    wage: '450' 
  },
  'finance': { 
    name: { cs: 'Finanční systém', en: 'Financial System' },
    hours: '12', 
    people: '4', 
    wage: '400' 
  },
  'mzdy': { 
    name: { cs: 'Mzdový systém', en: 'Payroll System' },
    hours: '10', 
    people: '2', 
    wage: '350' 
  },
  'projekty': { 
    name: { cs: 'Projektové řízení', en: 'Project Management' },
    hours: '8', 
    people: '5', 
    wage: '400' 
  },
  'komunikace': { 
    name: { cs: 'Interní komunikace', en: 'Internal Communication' },
    hours: '6', 
    people: '8', 
    wage: '350' 
  },
  'dokumenty': { 
    name: { cs: 'Správa dokumentů', en: 'Document Management' },
    hours: '14', 
    people: '6', 
    wage: '380' 
  },
  'jine': { 
    name: { cs: 'Jiný typ projektu', en: 'Other Project Type' },
    hours: '10', 
    people: '5', 
    wage: '400' 
  }
};

// Project type configurations
const projectConfigs = {
  production: {
    '45000': {
      name: { cs: 'Základní skladový systém', en: 'Basic Warehouse System' },
      fields: ['employees', 'averageSalary', 'paperworkHoursPerDay', 'inventoryErrorsPerMonth'],
      labels: {
        paperworkHoursPerDay: { cs: 'Hodiny papírování denně', en: 'Daily paperwork hours' },
        inventoryErrorsPerMonth: { cs: 'Chyby ve skladu měsíčně', en: 'Monthly inventory errors' }
      },
      placeholders: {
        paperworkHoursPerDay: { cs: 'např. 3', en: 'e.g. 3' },
        inventoryErrorsPerMonth: { cs: 'např. 5', en: 'e.g. 5' }
      }
    },
    '80000': {
      name: { cs: 'Pokročilý WMS systém', en: 'Advanced WMS System' },
      fields: ['employees', 'averageSalary', 'warehouseOperationsPerDay', 'pickingErrorsPerMonth'],
      labels: {
        warehouseOperationsPerDay: { cs: 'Skladové operace denně', en: 'Daily warehouse operations' },
        pickingErrorsPerMonth: { cs: 'Chyby při kompletaci měsíčně', en: 'Monthly picking errors' }
      },
      placeholders: {
        warehouseOperationsPerDay: { cs: 'např. 150', en: 'e.g. 150' },
        pickingErrorsPerMonth: { cs: 'např. 10', en: 'e.g. 10' }
      }
    },
    '150000': {
      name: { cs: 'Enterprise skladové řešení', en: 'Enterprise Warehouse Solution' },
      fields: ['employees', 'averageSalary', 'manualDataEntryHours', 'dataInconsistencies'],
      labels: {
        manualDataEntryHours: { cs: 'Hodiny manuálního zadávání denně', en: 'Daily manual data entry hours' },
        dataInconsistencies: { cs: 'Nesrovnalosti v datech měsíčně', en: 'Monthly data inconsistencies' }
      },
      placeholders: {
        manualDataEntryHours: { cs: 'např. 5', en: 'e.g. 5' },
        dataInconsistencies: { cs: 'např. 8', en: 'e.g. 8' }
      }
    },
    '250000': {
      name: { cs: 'Komplexní výrobní systém', en: 'Complex Production System' },
      fields: ['employees', 'averageSalary', 'productionDowntimeHours', 'qualityIssuesPerMonth'],
      labels: {
        productionDowntimeHours: { cs: 'Hodiny prostojů měsíčně', en: 'Monthly downtime hours' },
        qualityIssuesPerMonth: { cs: 'Kvalitativní problémy měsíčně', en: 'Monthly quality issues' }
      },
      placeholders: {
        productionDowntimeHours: { cs: 'např. 15', en: 'e.g. 15' },
        qualityIssuesPerMonth: { cs: 'např. 4', en: 'e.g. 4' }
      }
    }
  },
  services: {
    '45000': {
      name: { cs: 'Rezervační systém', en: 'Booking System' },
      fields: ['currentMonthlyRevenue', 'lostBookingsPerMonth', 'averageBookingValue'],
      labels: {
        lostBookingsPerMonth: { cs: 'Ztracené rezervace měsíčně', en: 'Lost bookings per month' },
        averageBookingValue: { cs: 'Průměrná hodnota rezervace', en: 'Average booking value' }
      },
      placeholders: {
        lostBookingsPerMonth: { cs: 'např. 15', en: 'e.g. 15' },
        averageBookingValue: { cs: 'např. 2500', en: 'e.g. 2500' }
      }
    },
    '80000': {
      name: { cs: 'Pokročilý WMS systém', en: 'Advanced WMS System' },  
      fields: ['currentMonthlyRevenue', 'lostOrdersPerMonth', 'averageOrderValue'],
      labels: {
        lostOrdersPerMonth: { cs: 'Ztracené objednávky měsíčně', en: 'Lost orders per month' },
        averageOrderValue: { cs: 'Průměrná hodnota objednávky', en: 'Average order value' }
      },
      placeholders: {
        lostOrdersPerMonth: { cs: 'např. 10', en: 'e.g. 10' },
        averageOrderValue: { cs: 'např. 15000', en: 'e.g. 15000' }
      }
    },
    '140000': {
      name: { cs: 'Business aplikace', en: 'Business Application' },
      fields: ['currentMonthlyRevenue', 'manualProcessHours', 'inefficiencyCostPerMonth'],
      labels: {
        manualProcessHours: { cs: 'Hodiny manuálních procesů denně', en: 'Daily manual process hours' },
        inefficiencyCostPerMonth: { cs: 'Náklady na neefektivitu měsíčně', en: 'Monthly inefficiency costs' }
      },
      placeholders: {
        manualProcessHours: { cs: 'např. 8', en: 'e.g. 8' },
        inefficiencyCostPerMonth: { cs: 'např. 25000', en: 'e.g. 25000' }
      }
    },
    '220000': {
      name: { cs: 'Komplexní řešení', en: 'Complex Solution' },
      fields: ['currentMonthlyRevenue', 'systemIntegrationIssues', 'lostOpportunitiesValue'],
      labels: {
        systemIntegrationIssues: { cs: 'Problémy s integrací měsíčně', en: 'Monthly integration issues' },
        lostOpportunitiesValue: { cs: 'Hodnota ztracených příležitostí', en: 'Lost opportunities value' }
      },
      placeholders: {
        systemIntegrationIssues: { cs: 'např. 10', en: 'e.g. 10' },
        lostOpportunitiesValue: { cs: 'např. 50000', en: 'e.g. 50000' }
      }
    }
  },
  other: {
    '45000': {
      name: { cs: 'Základní custom řešení', en: 'Basic Custom Solution' },
      fields: ['projectType', 'hoursWastedWeekly', 'peopleAffected', 'averageHourlyWage'],
      labels: {
        projectType: { cs: 'Typ vašeho projektu', en: 'Your project type' },
        hoursWastedWeekly: { cs: 'Kolik hodin týdně tratíte neefektivitou?', en: 'How many hours per week do you waste on inefficiency?' },
        peopleAffected: { cs: 'Kolik lidí to ovlivňuje?', en: 'How many people does it affect?' },
        averageHourlyWage: { cs: 'Průměrná hodinová mzda (Kč)?', en: 'Average hourly wage (CZK)?' }
      },
      placeholders: {
        projectType: { cs: 'Vyberte typ projektu...', en: 'Select project type...' },
        hoursWastedWeekly: '',
        peopleAffected: '',
        averageHourlyWage: ''
      }
    },
    '80000': {
      name: { cs: 'Standardní custom řešení', en: 'Standard Custom Solution' },
      fields: ['projectType', 'hoursWastedWeekly', 'peopleAffected', 'averageHourlyWage'],
      labels: {
        projectType: { cs: 'Typ vašeho projektu', en: 'Your project type' },
        hoursWastedWeekly: { cs: 'Kolik hodin týdně tratíte neefektivitou?', en: 'How many hours per week do you waste on inefficiency?' },
        peopleAffected: { cs: 'Kolik lidí to ovlivňuje?', en: 'How many people does it affect?' },
        averageHourlyWage: { cs: 'Průměrná hodinová mzda (Kč)?', en: 'Average hourly wage (CZK)?' }
      },
      placeholders: {
        projectDescription: { cs: 'např. pokročilý CRM, integrace systémů...', en: 'e.g. advanced CRM, system integration...' },
        hoursWastedWeekly: { cs: 'např. 12', en: 'e.g. 12' },
        peopleAffected: { cs: 'např. 5', en: 'e.g. 5' },
        averageHourlyWage: { cs: 'např. 400', en: 'e.g. 400' }
      }
    },
    '140000': {
      name: { cs: 'Pokročilý custom řešení', en: 'Advanced Custom Solution' },
      fields: ['projectType', 'hoursWastedWeekly', 'peopleAffected', 'averageHourlyWage'],
      labels: {
        projectType: { cs: 'Typ vašeho projektu', en: 'Your project type' },
        hoursWastedWeekly: { cs: 'Kolik hodin týdně tratíte neefektivitou?', en: 'How many hours per week do you waste on inefficiency?' },
        peopleAffected: { cs: 'Kolik lidí to ovlivňuje?', en: 'How many people does it affect?' },
        averageHourlyWage: { cs: 'Průměrná hodinová mzda (Kč)?', en: 'Average hourly wage (CZK)?' }
      },
      placeholders: {
        projectDescription: { cs: 'např. automatizace procesů, enterprise řešení...', en: 'e.g. process automation, enterprise solutions...' },
        hoursWastedWeekly: { cs: 'např. 18', en: 'e.g. 18' },
        peopleAffected: { cs: 'např. 8', en: 'e.g. 8' },
        averageHourlyWage: { cs: 'např. 450', en: 'e.g. 450' }
      }
    },
    '220000': {
      name: { cs: 'Enterprise custom řešení', en: 'Enterprise Custom Solution' },
      fields: ['projectType', 'hoursWastedWeekly', 'peopleAffected', 'averageHourlyWage'],
      labels: {
        projectType: { cs: 'Typ vašeho projektu', en: 'Your project type' },
        hoursWastedWeekly: { cs: 'Kolik hodin týdně tratíte neefektivitou?', en: 'How many hours per week do you waste on inefficiency?' },
        peopleAffected: { cs: 'Kolik lidí to ovlivňuje?', en: 'How many people does it affect?' },
        averageHourlyWage: { cs: 'Průměrná hodinová mzda (Kč)?', en: 'Average hourly wage (CZK)?' }
      },
      placeholders: {
        projectDescription: { cs: 'např. komplexní ERP, enterprise integrace...', en: 'e.g. complex ERP, enterprise integration...' },
        hoursWastedWeekly: { cs: 'např. 25', en: 'e.g. 25' },
        peopleAffected: { cs: 'např. 12', en: 'e.g. 12' },
        averageHourlyWage: { cs: 'např. 500', en: 'e.g. 500' }
      }
    }
  }
};

// ROI Calculator State Reducer
const initialState = {
  calculatorType: 'production', // production | services | other
  calculationMode: 'calendar', // calendar | business
  inputs: {
    employees: '',
    averageSalary: '',
    adminTimePercentage: '',
    currentMonthlyRevenue: '',
    averageOrderValue: '',
    lostOrdersPerMonth: '',
    projectCost: '100000'
  },
  results: null,
  showPresets: false,
  errors: {}
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CALCULATOR_TYPE':
      return {
        ...state,
        calculatorType: action.payload,
        inputs: { 
          ...initialState.inputs, 
          projectCost: action.payload === 'production' ? '150000' : action.payload === 'services' ? '80000' : '80000'
        },
        results: null,
        errors: {}
      };
    case 'SET_CALCULATION_MODE':
      return {
        ...state,
        calculationMode: action.payload,
        results: null // Recalculate when mode changes
      };
    case 'UPDATE_INPUT':
      return {
        ...state,
        inputs: { ...state.inputs, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: null }
      };
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'TOGGLE_PRESETS':
      return { ...state, showPresets: !state.showPresets };
    case 'APPLY_PRESET':
      return {
        ...state,
        inputs: { ...state.inputs, ...action.payload },
        showPresets: false,
        results: null
      };
    case 'RESET':
      return { 
        ...initialState, 
        calculatorType: state.calculatorType, 
        calculationMode: state.calculationMode
      };
    default:
      return state;
  }
};

// Validation function
const validateInputs = (inputs, calculatorType, currentConfig, currentLanguage) => {
  const errors = {};
  
  if (!inputs.projectCost || inputs.projectCost <= 0) {
    errors.projectCost = currentLanguage === 'cs' ? 'Zadejte cenu projektu' : 'Enter project cost';
  }
  
  if (currentConfig) {
    // Validate all fields defined in the current configuration
    currentConfig.fields.forEach(field => {
      if (!inputs[field] || parseFloat(inputs[field]) <= 0) {
        const fieldLabel = currentConfig.labels[field] || field;
        errors[field] = currentLanguage === 'cs' 
          ? `Zadejte ${fieldLabel.toLowerCase()}` 
          : `Enter ${fieldLabel.toLowerCase()}`;
      }
    });
  }
  
  return errors;
};

// ROI Calculation logic
const calculateROI = (inputs, calculatorType, currentConfig, calculationMode = 'calendar') => {
  const projectCost = parseFloat(inputs.projectCost);
  
  // Calculation constants based on mode
  const DAYS_PER_YEAR = calculationMode === 'business' ? 251 : 365;
  const DAYS_PER_MONTH = calculationMode === 'business' ? 21 : 30.4;
  const MONTHS_PER_YEAR = 12;
  const WORK_HOURS_PER_MONTH = 160; // Always use business hours for hourly calculations
  
  if (calculatorType === 'production') {
    const employees = parseFloat(inputs.employees);
    const avgSalary = parseFloat(inputs.averageSalary);
    
    // General calculation for production - could be refined based on specific fields
    let monthlySavings = 0;
    
    // Basic efficiency calculation
    const monthlyLaborCost = employees * avgSalary;
    const savingsPercent = 0.15; // 15% efficiency improvement
    monthlySavings = monthlyLaborCost * savingsPercent;
    
    // Additional savings based on specific fields in config
    currentConfig.fields.forEach(field => {
      const value = parseFloat(inputs[field]);
      
      // Custom project specific calculations
      if (field === 'monthlyLosses') {
        monthlySavings += value * 0.8; // Can prevent 80% of current losses
      } else if (field === 'estimatedSavings') {
        monthlySavings = value; // Direct monthly savings input
      } else if (field === 'hoursWastedDaily') {
        const hourlyCost = avgSalary / WORK_HOURS_PER_MONTH;
        const dailyWaste = value * employees * hourlyCost;
        monthlySavings += dailyWaste * 22 * 0.7; // Save 70% of wasted time, 22 work days
      } else if (field.includes('Hours') || field.includes('Time')) {
        // Time-based savings: hours * average hourly cost * efficiency
        const hourlyCost = avgSalary / WORK_HOURS_PER_MONTH;
        monthlySavings += value * employees * hourlyCost * 0.5; // 50% time savings
      } else if (field.includes('Error') || field.includes('Issues')) {
        // Error-based savings: reduce error costs
        const errorCost = 1500; // average cost per error
        monthlySavings += value * errorCost * 0.7; // 70% error reduction
      }
    });
    
    // Adjust monthly savings for business days calculation if needed
    if (calculationMode === 'business') {
      // Monthly savings are already based on work time, no adjustment needed
    }
    
    // Prevent division by zero
    const roiMonths = monthlySavings > 0 ? projectCost / monthlySavings : 0;
    const roiDays = monthlySavings > 0 ? Math.ceil(roiMonths * DAYS_PER_MONTH) : 0;
    
    return {
      monthlyAdminCost: monthlyLaborCost,
      monthlySavings,
      roiMonths,
      roiDays,
      yearlyROI: projectCost > 0 && monthlySavings > 0 ? (monthlySavings * MONTHS_PER_YEAR - projectCost) / projectCost * 100 : 0,
      calculationMode,
      daysPerYear: DAYS_PER_YEAR,
      additionalBenefits: {
        fasterDelivery: true,
        fewerErrors: true,
        betterPlanning: true
      }
    };
  } else if (calculatorType === 'services') {
    // Services calculation
    const monthlyRevenue = parseFloat(inputs.currentMonthlyRevenue);
    let totalBenefit = 0;
    
    // Calculate benefits based on specific service fields
    currentConfig.fields.forEach(field => {
      const value = parseFloat(inputs[field]);
      
      // Custom project specific calculations
      if (field === 'monthlyLostRevenue') {
        totalBenefit += value * 0.75; // Can capture 75% of lost revenue
      } else if (field === 'estimatedImprovement') {
        const improvementValue = monthlyRevenue * (value / 100);
        totalBenefit += improvementValue * 0.8; // 80% of estimated improvement
      } else if (field === 'inefficiencyPercentage') {
        const inefficiencyCost = monthlyRevenue * (value / 100);
        totalBenefit += inefficiencyCost * 0.6; // Reduce inefficiency by 60%
      } else if (field.includes('lost') || field.includes('Lost') || field.includes('abandoned')) {
        // Lost opportunities - capture rate
        const captureRate = 0.6; // 60% capture rate
        if (field.includes('Bookings') || field.includes('booking')) {
          const avgBookingValue = parseFloat(inputs.averageBookingValue) || 2000;
          totalBenefit += value * avgBookingValue * captureRate;
        } else if (field.includes('Cart') || field.includes('cart')) {
          const avgCartValue = parseFloat(inputs.averageCartValue) || 1200;
          totalBenefit += value * avgCartValue * captureRate;
        } else if (field.includes('Opportunities') || field.includes('opportunities')) {
          totalBenefit += value * captureRate;
        }
      } else if (field.includes('Process') || field.includes('process') || field.includes('Hours')) {
        // Process improvement savings
        const hourlyCost = 500; // average hourly cost for business processes
        totalBenefit += value * hourlyCost * 0.6; // 60% time savings
      } else if (field.includes('Cost') || field.includes('cost')) {
        // Direct cost savings
        totalBenefit += value * 0.4; // 40% cost reduction
      }
    });
    
    // Add capacity increase benefit
    const capacityIncrease = monthlyRevenue * 0.15; // 15% capacity increase
    totalBenefit += capacityIncrease;
    
    // Prevent division by zero
    const roiMonths = totalBenefit > 0 ? projectCost / totalBenefit : 0;
    const roiDays = totalBenefit > 0 ? Math.ceil(roiMonths * DAYS_PER_MONTH) : 0;
    
    return {
      lostRevenue: totalBenefit - capacityIncrease,
      capturedRevenue: totalBenefit - capacityIncrease,
      capacityIncrease,
      totalBenefit,
      roiMonths,
      roiDays,
      yearlyROI: projectCost > 0 && totalBenefit > 0 ? (totalBenefit * MONTHS_PER_YEAR - projectCost) / projectCost * 100 : 0,
      calculationMode,
      daysPerYear: DAYS_PER_YEAR
    };
  } else {
    // Other projects calculation - based on time waste
    const hoursWeekly = parseFloat(inputs.hoursWastedWeekly) || 0;
    const people = parseFloat(inputs.peopleAffected) || 0;
    const hourlyWage = parseFloat(inputs.averageHourlyWage) || 0;
    
    // Calculate monthly savings: hours * people * wage * 4.3 weeks * 70% efficiency gain
    const weeklyCost = hoursWeekly * people * hourlyWage;
    const monthlySavings = weeklyCost * 4.3 * 0.7; // 70% of waste can be eliminated
    const actualProjectCost = projectCost; // Use selected project cost from dropdown
    
    // Prevent division by zero and ensure valid numbers
    const roiMonths = monthlySavings > 0 ? actualProjectCost / monthlySavings : 0;
    const roiDays = monthlySavings > 0 ? Math.ceil(roiMonths * DAYS_PER_MONTH) : 0;
    
    return {
      weeklyCost,
      monthlySavings,
      roiMonths,
      roiDays,
      yearlyROI: actualProjectCost > 0 && monthlySavings > 0 ? (monthlySavings * MONTHS_PER_YEAR - actualProjectCost) / actualProjectCost * 100 : 0,
      calculationMode,
      daysPerYear: DAYS_PER_YEAR,
      projectCost: actualProjectCost,
      hoursWeekly,
      people,
      hourlyWage
    };
  }
};

const ROICalculator = () => {
  const { currentLanguage } = useLanguage();
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [hasCalculatedOnce, setHasCalculatedOnce] = useState(false);
  const [emailCaptureDisabled, setEmailCaptureDisabled] = useState(false);

  
  // Check if email capture was dismissed in current session
  useEffect(() => {
    const emailCaptureDisabledSession = sessionStorage.getItem('emailCaptureDisabled');
    
    if (emailCaptureDisabledSession === 'true') {
      setEmailCaptureDisabled(true);
      console.log('ROI Calculator: Email capture disabled for current session');
    }
  }, []);
  
  // Exit intent hook
  const { showExitIntent, dismissExitIntent } = useExitIntent({
    onExit: () => {
      // Track exit intent
      if (window.gtag) {
        window.gtag('event', 'exit_intent_triggered', {
          event_category: 'engagement',
          has_calculated: hasCalculatedOnce
        });
      }
    },
    timeOnPage: 15000, // 15 seconds minimum - more time to read
    cookieDays: 7 // Don't show again for 7 days
  });
  
  // Auto-show email capture after calculation  
  useEffect(() => {
    if (state.results && hasCalculatedOnce && !emailCaptureDisabled && !showEmailCapture) {
      console.log('🕐 ROI Email modal bude otevřen za 25 sekund...');
      const timer = setTimeout(() => {
        console.log('📧 Otevírám ROI Email capture modal!');
        setShowEmailCapture(true);
      }, 25000); // 25 sekund po výpočtu
      
      return () => {
        console.log('⏹️ ROI Timer zrušen');
        clearTimeout(timer);
      };
    }
  }, [state.results, hasCalculatedOnce, emailCaptureDisabled, showEmailCapture]);
  
  // Handle email capture close with per-session persistence
  const handleEmailCaptureClose = () => {
    console.log('ROI Calculator: Email capture dismissed by user for current session');
    setShowEmailCapture(false);
    setEmailCaptureDisabled(true);
    sessionStorage.setItem('emailCaptureDisabled', 'true');
  };


  // Debug function to reset all modal suppressions (accessible via console)
  window.resetROIModals = () => {
    sessionStorage.removeItem('emailCaptureDisabled');
    localStorage.removeItem('exitIntentShown');
    setEmailCaptureDisabled(false);
    console.log('ROI Calculator: All modal suppressions reset for current session');
  };

  // Get current project configuration
  const getCurrentProjectConfig = () => {
    const { calculatorType, inputs } = state;
    
    const projectCost = inputs.projectCost || '150000';
    return projectConfigs[calculatorType]?.[projectCost] || null;
  };
  
  const currentConfig = getCurrentProjectConfig();
  
  const handleInputChange = (field, value) => {
    // Handle project type selection with auto-prefill
    if (field === 'projectType') {
      dispatch({ type: 'UPDATE_INPUT', field, value });
      
      // Auto-prefill values based on selected project type
      if (state.calculatorType === 'other' && value && projectTypeOptions[value]) {
        const projectData = projectTypeOptions[value];
        dispatch({ type: 'UPDATE_INPUT', field: 'hoursWastedWeekly', value: projectData.hours });
        dispatch({ type: 'UPDATE_INPUT', field: 'peopleAffected', value: projectData.people });
        dispatch({ type: 'UPDATE_INPUT', field: 'averageHourlyWage', value: projectData.wage });
      }
    } else {
      // For numeric fields, allow only numbers and empty string
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        dispatch({ type: 'UPDATE_INPUT', field, value });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCalculate();
    }
  };
  
  const handleCalculate = useCallback(() => {
    const errors = validateInputs(state.inputs, state.calculatorType, currentConfig);
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }
    
    const results = calculateROI(state.inputs, state.calculatorType, currentConfig, state.calculationMode);
    dispatch({ type: 'SET_RESULTS', payload: results });
    
    // Track calculation
    setHasCalculatedOnce(true);
    
    if (window.gtag) {
      window.gtag('event', 'roi_calculated', {
        event_category: 'engagement',
        calculator_type: state.calculatorType,
        calculation_mode: state.calculationMode,
        roi_days: results.roiDays,
        project_cost: state.inputs.projectCost
      });
    }
    
    // Save to localStorage for retargeting
    const calculations = JSON.parse(localStorage.getItem('roiCalculations') || '[]');
    calculations.push({
      type: state.calculatorType,
      mode: state.calculationMode,
      roiDays: results.roiDays,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('roiCalculations', JSON.stringify(calculations));
  }, [state.inputs, state.calculatorType, currentConfig, state.calculationMode]);
  
  const presets = {
    production: roiCaseStudies.production.map(cs => ({
      name: currentLanguage === 'cs' ? cs.title.cs : cs.title.en,
      employees: cs.employees.toString(),
      averageSalary: cs.averageSalary.toString(),
      adminTimePercentage: cs.adminTimePercentage.toString(),
      caseStudy: cs
    })),
    services: roiCaseStudies.services.map(cs => ({
      name: currentLanguage === 'cs' ? cs.title.cs : cs.title.en,
      currentMonthlyRevenue: cs.monthlyRevenue.toString(),
      lostOrdersPerMonth: cs.lostOrdersPerMonth.toString(),
      averageOrderValue: cs.averageOrderValue.toString(),
      caseStudy: cs
    })),
    other: roiCaseStudies.other.map(cs => ({
      name: currentLanguage === 'cs' ? cs.title.cs : cs.title.en,
      projectType: cs.projectType || 'custom',
      hoursWastedWeekly: cs.hoursWastedWeekly.toString(),
      peopleAffected: cs.peopleAffected.toString(),
      averageHourlyWage: cs.averageHourlyWage.toString(),
      caseStudy: cs
    }))
  };
  
  const formatCurrency = (value) => {
    // Handle undefined, null, NaN, or invalid values - also parse strings
    const numValue = typeof value === 'string' ? parseFloat(value) : 
                     typeof value === 'number' && !isNaN(value) ? value : 0;
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numValue);
  };
  
  // Removed unused formatPercent function
  
  return (
    <>
    <section id="roi-calculator" className="py-16 md:py-24 bg-gray-50 dark:bg-dark-surface">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Attention-grabbing badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full mb-6 border border-emerald-200 dark:border-emerald-400/20"
          >
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              ⚡ {currentLanguage === 'cs' ? 'Zdarma • Bez závazků • 2 minuty' : 'Free • No obligations • 2 minutes'}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-gray-900 dark:text-white">
              {currentLanguage === 'cs' ? 'Zjistěte, za kolik dní se vám' : 'Find out in how many days'}
            </span>
            <br />
            <span className="gradient-text text-4xl md:text-6xl">
              {currentLanguage === 'cs' ? 'investice vrátí' : 'your investment pays off'}
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            {currentLanguage === 'cs' 
              ? 'Přesná kalkulace návratnosti investice na základě reálných dat z více než 50 projektů. Objevte, kolik peněz můžete ušetřit nebo vydělat.'
              : 'Precise ROI calculation based on real data from 50+ projects. Discover how much money you can save or earn.'}
          </p>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>{currentLanguage === 'cs' ? '50+ spokojených klientů' : '50+ satisfied clients'}</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
              <span>{currentLanguage === 'cs' ? '4.9/5 hodnocení' : '4.9/5 rating'}</span>
            </div>
            <div className="flex items-center">
              <span className="text-emerald-500 mr-2">✓</span>
              <span>{currentLanguage === 'cs' ? 'Rychlá návratnost investice' : 'Fast return on investment'}</span>
            </div>
          </div>

          {/* Value proposition */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 max-w-4xl mx-auto border border-blue-200/30 dark:border-blue-400/20"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-blue-700 dark:text-blue-300">
                  {currentLanguage === 'cs' ? 'Přesné výpočty' : 'Precise calculations'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'cs' ? 'Založené na reálných datech' : 'Based on real data'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {currentLanguage === 'cs' ? 'Ušetřené náklady' : 'Saved costs'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'cs' ? 'Viditelné již první měsíc' : 'Visible in first month'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📈</div>
                <div className="font-semibold text-purple-700 dark:text-purple-300">
                  {currentLanguage === 'cs' ? 'Růst efektivity' : 'Efficiency growth'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'cs' ? 'Dlouhodobé výhody' : 'Long-term benefits'}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-6 md:p-8"
          >
            {/* Calculator Type Selector */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                {currentLanguage === 'cs' 
                  ? 'Vyberte typ vašeho podnikání:' 
                  : 'Select your business type:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => dispatch({ type: 'SET_CALCULATOR_TYPE', payload: 'production' })}
                  className={`py-4 px-6 rounded-lg transition-all text-left ${
                    state.calculatorType === 'production'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium flex items-center">
                        <FiTrendingUp className="inline mr-2" />
                        {currentLanguage === 'cs' ? 'Výroba' : 'Manufacturing'}
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        {currentLanguage === 'cs' 
                          ? 'Sklady, logistika, výroba' 
                          : 'Warehouses, logistics, manufacturing'}
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_CALCULATOR_TYPE', payload: 'services' })}
                  className={`py-4 px-6 rounded-lg transition-all text-left ${
                    state.calculatorType === 'services'
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium flex items-center">
                        <FiDollarSign className="inline mr-2" />
                        {currentLanguage === 'cs' ? 'Služby' : 'Services'}
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        {currentLanguage === 'cs' 
                          ? 'Obchod, rezervace, klientél' 
                          : 'Retail, bookings, customer service'}
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_CALCULATOR_TYPE', payload: 'other' })}
                  className={`py-4 px-6 rounded-lg transition-all text-left ${
                    state.calculatorType === 'other'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium flex items-center">
                        <FiInfo className="inline mr-2" />
                        {currentLanguage === 'cs' ? 'Jiný projekt' : 'Other Project'}
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        {currentLanguage === 'cs' 
                          ? 'CRM, HR, finance, nebo jiné' 
                          : 'CRM, HR, finance, or custom'}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Calculation Mode Toggle - Business vs Calendar Days */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center font-medium">
                  {currentLanguage === 'cs' 
                    ? '🗓️ Typ výpočtu ROI:' 
                    : '🗓️ ROI Calculation Type:'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => dispatch({ type: 'SET_CALCULATION_MODE', payload: 'calendar' })}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                      state.calculationMode === 'calendar'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="text-sm">
                      <div className="font-medium mb-1">
                        {currentLanguage === 'cs' ? '📅 Kalendářní rok (365 dní)' : '📅 Calendar Year (365 days)'}
                      </div>
                      <div className="text-xs opacity-80">
                        {currentLanguage === 'cs' 
                          ? 'Včetně víkendů a svátků' 
                          : 'Including weekends and holidays'}
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'SET_CALCULATION_MODE', payload: 'business' })}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                      state.calculationMode === 'business'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="text-sm">
                      <div className="font-medium mb-1">
                        {currentLanguage === 'cs' ? '💼 Pracovní rok (251 dní)' : '💼 Business Year (251 days)'}
                      </div>
                      <div className="text-xs opacity-80">
                        {currentLanguage === 'cs' 
                          ? 'Pouze pracovní dny' 
                          : 'Business days only'}
                      </div>
                    </div>
                  </button>
                </div>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                  <span className="inline-flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {currentLanguage === 'cs' 
                      ? 'Pracovní režim poskytuje přesnější výpočet pro B2B klienty' 
                      : 'Business mode provides more accurate calculation for B2B clients'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Input Form - Dynamic based on project type */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {currentConfig ? (
                currentConfig.fields.map((field) => {
                  const isWideField = field.includes('Hours') || field.includes('Cost') || field.includes('Value') || field.includes('Revenue');
                  
                  // Get field label
                  const getFieldLabel = (field) => {
                    if (currentConfig.labels[field]) {
                      const label = currentConfig.labels[field];
                      return typeof label === 'object' 
                        ? (currentLanguage === 'cs' ? label.cs : label.en)
                        : label;
                    }
                    
                    const defaultLabels = {
                      employees: currentLanguage === 'cs' ? 'Počet zaměstnanců' : 'Number of Employees',
                      averageSalary: currentLanguage === 'cs' ? 'Průměrná mzda (Kč)' : 'Average Salary (CZK)',
                      currentMonthlyRevenue: currentLanguage === 'cs' ? 'Současné měsíční tržby (Kč)' : 'Current Monthly Revenue (CZK)'
                    };
                    
                    return defaultLabels[field] || field;
                  };
                  
                  // Get field placeholder
                  const getFieldPlaceholder = (field) => {
                    if (currentConfig.placeholders[field]) {
                      const placeholder = currentConfig.placeholders[field];
                      return typeof placeholder === 'object' 
                        ? (currentLanguage === 'cs' ? placeholder.cs : placeholder.en)
                        : placeholder;
                    }
                    
                    const defaultPlaceholders = {
                      employees: currentLanguage === 'cs' ? 'např. 20' : 'e.g. 20',
                      averageSalary: currentLanguage === 'cs' ? 'např. 30000' : 'e.g. 30000',
                      currentMonthlyRevenue: currentLanguage === 'cs' ? 'např. 200000' : 'e.g. 200000'
                    };
                    
                    return defaultPlaceholders[field] || '';
                  };
                  
                  return (
                    <div key={field} className={isWideField ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium mb-2">
                        {getFieldLabel(field)}
                      </label>
                      {field === 'projectType' ? (
                        <>
                          <select
                            value={state.inputs[field] || ''}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border max-h-48 overflow-y-auto ${
                              state.errors[field] 
                                ? 'border-red-500 dark:border-red-400' 
                                : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
                            style={{
                              scrollbarWidth: 'thin',
                              scrollbarColor: '#10b981 #f1f1f1'
                            }}
                          >
                            <option value="">{getFieldPlaceholder(field)}</option>
                            {Object.entries(projectTypeOptions).map(([key, option]) => (
                              <option key={key} value={key}>
                                {currentLanguage === 'cs' ? option.name.cs : option.name.en}
                              </option>
                            ))}
                          </select>
                          {/* Fallback message for custom projects */}
                          <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50 dark:border-blue-400/20">
                            <p className="text-sm text-blue-700 dark:text-blue-300 flex items-start">
                              <span className="mr-2 flex-shrink-0">💡</span>
                              <span>
                                {currentLanguage === 'cs' 
                                  ? 'Nenašli jste svůj typ projektu? Napište nám na '
                                  : 'Can\'t find your project type? Write to us at '}
                                <a 
                                  href="mailto:michal@michalbugar.dev" 
                                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
                                >
                                  michal@michalbugar.dev
                                </a>
                                {currentLanguage === 'cs'
                                  ? ' s popisem vašeho projektu a my vám ROI spočítáme na míru!'
                                  : ' with your project description and we\'ll calculate a custom ROI for you!'}
                              </span>
                            </p>
                          </div>
                        </>
                      ) : (
                        <input
                          type={field.includes('Cost') || field.includes('Savings') || field.includes('Revenue') ? 'number' : 'text'}
                          value={state.inputs[field] || ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          onKeyPress={handleKeyPress}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            state.errors[field] 
                              ? 'border-red-500 dark:border-red-400' 
                              : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
                          placeholder={getFieldPlaceholder(field)}
                        />
                      )}
                      {state.errors[field] && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{state.errors[field]}</p>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="md:col-span-2 text-center text-gray-500 dark:text-gray-400">
                  {currentLanguage === 'cs' ? 'Vyberte typ projektu' : 'Please select project type'}
                </div>
              )}
              
              {/* Project Cost Field - Always visible */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  {currentLanguage === 'cs' ? 'Cena projektu (Kč)' : 'Project Cost (CZK)'}
                  <span className="text-xs text-red-500 dark:text-red-400 ml-2">
                    ({currentLanguage === 'cs' ? 'pouze orientační' : 'estimates only'})
                  </span>
                </label>
                <div className="relative">
                  <select
                    value={state.inputs.projectCost}
                    onChange={(e) => handleInputChange('projectCost', e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-4 pr-12 py-2 rounded-lg border ${
                      state.errors.projectCost 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
                  >
                    {state.calculatorType === 'production' ? (
                      <>
                        <option value="45000">
                          45 000 CZK - {currentLanguage === 'cs' ? 'Základní skladový systém' : 'Basic Warehouse System'}
                        </option>
                        <option value="80000">
                          80 000 CZK - {currentLanguage === 'cs' ? 'Pokročilý WMS systém' : 'Advanced WMS System'}
                        </option>
                        <option value="150000">
                          150 000 CZK - {currentLanguage === 'cs' ? 'Enterprise skladové řešení' : 'Enterprise Warehouse Solution'}
                        </option>
                        <option value="250000">
                          250 000 CZK - {currentLanguage === 'cs' ? 'Komplexní výrobní systém' : 'Complex Production System'}
                        </option>
                      </>
                    ) : state.calculatorType === 'services' ? (
                      <>
                        <option value="45000">
                          45 000 CZK - {currentLanguage === 'cs' ? 'Rezervační systém' : 'Booking System'}
                        </option>
                        <option value="80000">
                          80 000 CZK - {currentLanguage === 'cs' ? 'Pokročilý WMS systém' : 'Advanced WMS System'}
                        </option>
                        <option value="140000">
                          140 000 CZK - {currentLanguage === 'cs' ? 'Business aplikace' : 'Business Application'}
                        </option>
                        <option value="220000">
                          220 000 CZK - {currentLanguage === 'cs' ? 'Komplexní řešení' : 'Complex Solution'}
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="45000">
                          45 000 CZK - {currentLanguage === 'cs' ? 'Základní custom řešení' : 'Basic Custom Solution'}
                        </option>
                        <option value="80000">
                          80 000 CZK - {currentLanguage === 'cs' ? 'Standardní custom řešení' : 'Standard Custom Solution'}
                        </option>
                        <option value="140000">
                          140 000 CZK - {currentLanguage === 'cs' ? 'Pokročilý custom řešení' : 'Advanced Custom Solution'}
                        </option>
                        <option value="220000">
                          220 000 CZK - {currentLanguage === 'cs' ? 'Enterprise custom řešení' : 'Enterprise Custom Solution'}
                        </option>
                      </>
                    )}
                  </select>
                  {/* Price Tooltip - Always visible when calculator type is selected */}
                  {state.calculatorType && priceTooltips[state.calculatorType] && (
                    <ROIPriceTooltip
                      content={state.inputs.projectCost && priceTooltips[state.calculatorType][state.inputs.projectCost] 
                        ? priceTooltips[state.calculatorType][state.inputs.projectCost][currentLanguage]
                        : {
                            category: currentLanguage === 'cs' ? '💡 Vyberte cenu pro zobrazení detailů' : '💡 Select price to see details',
                            employees: '',
                            features: [
                              currentLanguage === 'cs' ? 'Vyberte cenu z dropdown menu' : 'Select price from dropdown menu',
                              currentLanguage === 'cs' ? 'Zobrazí se informace o kategorii firmy' : 'Company category info will appear',
                              currentLanguage === 'cs' ? 'Včetně obsahu balíčku' : 'Including package contents'
                            ],
                            priceNote: currentLanguage === 'cs' ? 'Ceny jsou bez DPH.' : 'Prices without VAT.'
                          }
                      }
                      price={state.inputs.projectCost}
                    >
                      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-help hover:scale-110 transition-transform">
                        <FiInfo className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      </div>
                    </ROIPriceTooltip>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <FiPercent className="inline mr-2" />
                {currentLanguage === 'cs' ? 'Vypočítat ROI' : 'Calculate ROI'}
              </button>
              
              <motion.button
                onClick={() => dispatch({ type: 'TOGGLE_PRESETS' })}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.5)",
                    "0 0 0 6px rgba(16, 185, 129, 0)",
                    "0 0 0 0 rgba(16, 185, 129, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨ {currentLanguage === 'cs' ? 'Zobrazit reálné příklady' : 'Show Real Examples'} ✨
              </motion.button>
              
              <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-all"
              >
                {currentLanguage === 'cs' ? 'Vymazat' : 'Clear'}
              </button>
            </div>
            
            {/* Presets */}
            <AnimatePresence>
              {state.showPresets && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="text-center mb-4">
                    <p className="text-xs text-red-600 dark:text-red-400 italic font-medium">
                      {currentLanguage === 'cs' 
                        ? '* Všechny příklady firem jsou fiktivní a vytvořené pouze pro demonstrační účely'
                        : '* All company examples are fictional and created for demonstration purposes only'
                      }
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {presets[state.calculatorType].map((preset, index) => (
                      <motion.div 
                        key={index} 
                        className="relative"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(16, 185, 129, 0.4)",
                            "0 0 0 8px rgba(16, 185, 129, 0)",
                            "0 0 0 0 rgba(16, 185, 129, 0)"
                          ]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3 // Postupné pulzování
                        }}
                      >
                        <motion.button
                          onClick={() => {
                            const presetData = { ...preset };
                            delete presetData.caseStudy;
                            dispatch({ type: 'APPLY_PRESET', payload: presetData });
                          }}
                          className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-left border-2 border-transparent hover:border-emerald-300"
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.15)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <h4 className="font-medium mb-2 pr-8">{preset.name}</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {Object.entries(preset)
                              .filter(([key]) => key !== 'name' && key !== 'caseStudy')
                              .map(([key, value]) => (
                                <div key={key}>
                                  {key === 'employees' && `${currentLanguage === 'cs' ? 'Zaměstnanci' : 'Employees'}: ${value}`}
                                  {key === 'averageSalary' && `${currentLanguage === 'cs' ? 'Mzda' : 'Salary'}: ${formatCurrency(value)}`}
                                  {key === 'adminTimePercentage' && `${currentLanguage === 'cs' ? 'Admin' : 'Admin'}: ${value}%`}
                                  {key === 'currentMonthlyRevenue' && `${currentLanguage === 'cs' ? 'Tržby' : 'Revenue'}: ${formatCurrency(value)}`}
                                  {key === 'lostOrdersPerMonth' && `${currentLanguage === 'cs' ? 'Ztráty' : 'Lost'}: ${value}`}
                                  {key === 'averageOrderValue' && `${currentLanguage === 'cs' ? 'Zakázka' : 'Order'}: ${formatCurrency(value)}`}
                                  {key === 'projectType' && `${currentLanguage === 'cs' ? 'Typ' : 'Type'}: ${projectTypeOptions[value]?.name?.[currentLanguage] || value}`}
                                  {key === 'hoursWastedWeekly' && `${currentLanguage === 'cs' ? 'Hodiny/týden' : 'Hours/week'}: ${value}`}
                                  {key === 'peopleAffected' && `${currentLanguage === 'cs' ? 'Lidé' : 'People'}: ${value}`}
                                  {key === 'averageHourlyWage' && `${currentLanguage === 'cs' ? 'Mzda/hod' : 'Wage/hour'}: ${formatCurrency(value)}`}
                                </div>
                              ))}
                          </div>
                        </motion.button>
                        
                        {/* Case Study Button - Pulzující oko - pouze pokud existuje */}
                        {preset.caseStudy && (
                          <motion.button
                            onClick={() => setSelectedCaseStudy(preset.caseStudy)}
                            className="absolute top-3 right-3 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all group shadow-lg"
                            title={currentLanguage === 'cs' ? 'Zobrazit detailní case study' : 'View detailed case study'}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              boxShadow: [
                                "0 0 0 0 rgba(59, 130, 246, 0.7)",
                                "0 0 0 10px rgba(59, 130, 246, 0)",
                                "0 0 0 0 rgba(59, 130, 246, 0)"
                              ]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <FiEye size={16} />
                            </motion.div>
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            

            {/* Results - PREMIUM VERSION */}
            <AnimatePresence>
              {state.results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-400/20">
                    
                    {/* Header with success indicator */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mb-4 shadow-lg"
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>
                      <h3 className="text-2xl font-bold gradient-text mb-2">
                        {currentLanguage === 'cs' ? '🎉 Skvělá investice!' : '🎉 Excellent Investment!'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {currentLanguage === 'cs' 
                          ? 'Zde jsou výsledky vaší ROI analýzy'
                          : 'Here are your ROI analysis results'}
                      </p>
                      
                      {/* Calculation Mode Indicator */}
                      <div className="mt-2 inline-flex items-center px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-xs">
                        <span className={`mr-2 ${state.results.calculationMode === 'business' ? '💼' : '📅'}`}>
                          {state.results.calculationMode === 'business' 
                            ? (currentLanguage === 'cs' ? 'Pracovní dny (251 dní/rok)' : 'Business days (251 days/year)')
                            : (currentLanguage === 'cs' ? 'Kalendářní dny (365 dní/rok)' : 'Calendar days (365 days/year)')}
                        </span>
                      </div>
                    </div>

                    {/* Main ROI Metrics - HERO NUMBERS */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {/* ROI Days - BIG NUMBER */}
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl border border-emerald-200/30 dark:border-emerald-400/20"
                      >
                        <div className="text-5xl font-black gradient-text mb-2">
                          {state.results.roiDays}
                        </div>
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                          {currentLanguage === 'cs' ? 'dní do návratu' : 'days to break-even'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {currentLanguage === 'cs' ? 'Velmi rychlé!' : 'Very fast!'}
                        </div>
                      </motion.div>

                      {/* Yearly Savings - MONEY FOCUS */}
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/30 dark:border-blue-400/20"
                      >
                        <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mb-2 break-words">
                          {formatCurrency(
                            state.calculatorType === 'production' 
                              ? state.results.monthlySavings * 12 
                              : state.calculatorType === 'services'
                                ? state.results.totalBenefit * 12
                                : state.results.monthlySavings * 12
                          )}
                        </div>
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                          {currentLanguage === 'cs' ? 'roční úspora' : 'yearly savings'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {currentLanguage === 'cs' ? 'za první rok' : 'in first year'}
                        </div>
                      </motion.div>

                      {/* ROI Percentage - GROWTH FOCUS */}
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/30 dark:border-purple-400/20"
                      >
                        <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                          {Math.round(state.results.yearlyROI)}%
                        </div>
                        <div className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                          {currentLanguage === 'cs' ? 'roční ROI' : 'yearly ROI'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {currentLanguage === 'cs' ? 'návratnost' : 'return rate'}
                        </div>
                      </motion.div>
                    </div>

                    {/* Timeline Visualization */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                    >
                      <h4 className="text-lg font-semibold mb-4 text-center">
                        {currentLanguage === 'cs' ? '📈 Timeline návratnosti' : '📈 ROI Timeline'}
                      </h4>
                      <div className="relative">
                        {/* Progress bar */}
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${state.results.roiDays > 0 ? Math.min(100, (state.results.daysPerYear / state.results.roiDays) * 100) : 0}%` }}
                            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                          />
                        </div>
                        {/* Timeline markers */}
                        <div className="flex justify-between mt-2 text-xs">
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {currentLanguage === 'cs' ? 'Dnes' : 'Today'}
                          </span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                            {state.results.roiDays} {currentLanguage === 'cs' ? 'dní' : 'days'}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {state.results.daysPerYear} {currentLanguage === 'cs' ? 'dní' : 'days'}
                          </span>
                        </div>
                      </div>
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                        {state.results.roiDays > 0 ? (currentLanguage === 'cs' 
                          ? `Investice se vrátí za pouhých ${state.results.roiDays} ${state.results.calculationMode === 'business' ? 'pracovních' : ''} dní! To je ${Math.round(state.results.daysPerYear/state.results.roiDays)}x rychleji než za rok.`
                          : `Investment pays back in just ${state.results.roiDays} ${state.results.calculationMode === 'business' ? 'business' : ''} days! That's ${Math.round(state.results.daysPerYear/state.results.roiDays)}x faster than a year.`)
                        : (currentLanguage === 'cs' 
                          ? 'Vyplňte všechna pole pro výpočet ROI.'
                          : 'Fill in all fields to calculate ROI.')}
                      </p>
                    </motion.div>
                    
                    {/* Comparison with Industry Standards */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200/30 dark:border-yellow-400/20"
                    >
                      <h4 className="text-lg font-semibold mb-4 text-center text-yellow-800 dark:text-yellow-300 flex items-center justify-center">
                        <span className="mr-2">🏆</span>
                        {currentLanguage === 'cs' ? 'Srovnání s průměrem odvětví' : 'Industry Comparison'}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 mb-1 break-words">
                            {state.results.daysPerYear}+ {currentLanguage === 'cs' ? 'dní' : 'days'}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {currentLanguage === 'cs' ? 'Průměrný ROI v odvětví' : 'Industry average ROI'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1 break-words">
                            {state.results.roiDays} {currentLanguage === 'cs' ? 'dní' : 'days'}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {currentLanguage === 'cs' ? 'Váš projekt' : 'Your project'}
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <span className="text-emerald-800 dark:text-emerald-300 font-medium">
                          🚀 {state.results.roiDays > 0 ? Math.round(state.results.daysPerYear/state.results.roiDays) : 0}x {currentLanguage === 'cs' ? 'rychlejší než průměr!' : 'faster than average!'}
                        </span>
                      </div>
                    </motion.div>

                    {/* Investment Breakdown */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mb-8"
                    >
                      <h4 className="text-lg font-semibold mb-4 text-center">
                        {currentLanguage === 'cs' ? '💰 Finanční přehled' : '💰 Financial Overview'}
                      </h4>
                      <div className="space-y-3">
                        {state.calculatorType === 'production' ? (
                          <>
                            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              <span className="text-gray-600 dark:text-gray-400">
                                {currentLanguage === 'cs' ? 'Měsíční náklady na práci:' : 'Monthly labor costs:'}
                              </span>
                              <span className="font-medium">{formatCurrency(state.results.monthlyAdminCost)}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                              <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                                {currentLanguage === 'cs' ? 'Měsíční úspora:' : 'Monthly savings:'}
                              </span>
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(state.results.monthlySavings)}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <span className="text-blue-700 dark:text-blue-300 font-medium">
                                {currentLanguage === 'cs' ? 'Roční úspora:' : 'Yearly savings:'}
                              </span>
                              <span className="font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(state.results.monthlySavings * 12)}
                              </span>
                            </div>
                            
                            {state.results.additionalBenefits && (
                              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                                <h5 className="font-medium mb-3 text-blue-700 dark:text-blue-400 flex items-center">
                                  <span className="mr-2">🎁</span>
                                  {currentLanguage === 'cs' ? 'Bonusové výhody (nezapočítané):' : 'Bonus benefits (not calculated):'}
                                </h5>
                                <div className="grid md:grid-cols-2 gap-2">
                                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-300">
                                    <span className="mr-2">✨</span>
                                    {currentLanguage === 'cs' ? 'Rychlejší procesy' : 'Faster processes'}
                                  </div>
                                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-300">
                                    <span className="mr-2">🛠️</span>
                                    {currentLanguage === 'cs' ? '3 měsíce podpory zdarma' : '3 months free support'}
                                  </div>
                                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-300">
                                    <span className="mr-2">🔗</span>
                                    {currentLanguage === 'cs' ? 'Systémové integrace' : 'System integrations'}
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : state.calculatorType === 'services' ? (
                          <>
                            <div className="flex justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                              <span className="text-red-700 dark:text-red-300">
                                {currentLanguage === 'cs' ? 'Měsíční ztráty:' : 'Monthly losses:'}
                              </span>
                              <span className="font-medium text-red-600 dark:text-red-400">
                                -{formatCurrency(state.results.lostRevenue)}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                              <span className="text-emerald-700 dark:text-emerald-300">
                                {currentLanguage === 'cs' ? 'Zachycené příjmy:' : 'Captured revenue:'}
                              </span>
                              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                +{formatCurrency(state.results.capturedRevenue)}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <span className="text-blue-700 dark:text-blue-300">
                                {currentLanguage === 'cs' ? 'Zvýšení kapacity:' : 'Capacity increase:'}
                              </span>
                              <span className="font-medium text-blue-600 dark:text-blue-400">
                                +{formatCurrency(state.results.capacityIncrease)}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg border-2 border-emerald-200 dark:border-emerald-400/30">
                              <span className="font-bold text-emerald-800 dark:text-emerald-200">
                                {currentLanguage === 'cs' ? 'Celkový měsíční přínos:' : 'Total monthly benefit:'}
                              </span>
                              <span className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">
                                +{formatCurrency(state.results.totalBenefit)}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              <span className="text-gray-600 dark:text-gray-400">
                                {currentLanguage === 'cs' ? 'Týdenní náklady na neefektivitu:' : 'Weekly inefficiency costs:'}
                              </span>
                              <span className="font-medium">{formatCurrency(state.results.weeklyCost)}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                              <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                                {currentLanguage === 'cs' ? 'Měsíční úspora:' : 'Monthly savings:'}
                              </span>
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(state.results.monthlySavings)}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <span className="text-blue-700 dark:text-blue-300 font-medium">
                                {currentLanguage === 'cs' ? 'Roční úspora:' : 'Yearly savings:'}
                              </span>
                              <span className="font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(state.results.monthlySavings * 12)}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                              <span className="text-orange-700 dark:text-orange-300 font-medium">
                                {currentLanguage === 'cs' ? 'Cena projektu:' : 'Project cost:'}
                              </span>
                              <span className="font-medium text-orange-600 dark:text-orange-400">
                                {formatCurrency(state.results.projectCost)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>

                    {/* Urgency & CTA Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="text-center bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 p-8 rounded-xl border border-emerald-200/50 dark:border-emerald-400/20"
                    >
                      <div className="mb-4">
                        <div className="text-2xl mb-2">⏰</div>
                        <h4 className="text-xl font-bold gradient-text mb-2">
                          {currentLanguage === 'cs' ? 'Každý den čekání = ztracené peníze!' : 'Every day of waiting = lost money!'}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {currentLanguage === 'cs' 
                            ? `Za každý měsíc odkládání přicházíte o ${formatCurrency(
                                state.calculatorType === 'production' 
                                  ? state.results.monthlySavings 
                                  : state.calculatorType === 'services'
                                    ? state.results.totalBenefit
                                    : state.results.monthlySavings
                              )}`
                            : `Every month of delay costs you ${formatCurrency(
                                state.calculatorType === 'production' 
                                  ? state.results.monthlySavings 
                                  : state.calculatorType === 'services'
                                    ? state.results.totalBenefit
                                    : state.results.monthlySavings
                              )}`}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <motion.a
                          href="#contact"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                          🚀 {currentLanguage === 'cs' ? 'Chci začít hned!' : 'I want to start now!'}
                        </motion.a>
                        
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {currentLanguage === 'cs' 
                            ? 'Bezplatná konzultace • Bez závazků • Rychlá odpověď'
                            : 'Free consultation • No obligations • Quick response'}
                        </div>
                        
                        <div className="flex items-center justify-center text-xs text-gray-400">
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {currentLanguage === 'cs' ? 'Garance kvality' : 'Quality guarantee'}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Price Note */}
            <div className="mt-6 text-center text-sm text-red-500 dark:text-red-400">
              <p className="italic">
                {currentLanguage === 'cs' 
                  ? '* Uvedené ceny jsou pouze orientační. Finální cena bude stanovena na základě vašich konkrétních požadavků.'
                  : '* Listed prices are estimates only. Final price will be determined based on your specific requirements.'}
              </p>
            </div>
            
            {/* Info Button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="mt-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <FiInfo className="inline mr-1" />
              {currentLanguage === 'cs' ? 'Jak se počítá ROI?' : 'How is ROI calculated?'}
            </button>
            
            {/* Info Panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400"
                >
                  <button
                    onClick={() => setShowInfo(false)}
                    className="float-right text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <FiX />
                  </button>
                  <h4 className="font-medium mb-2">
                    {currentLanguage === 'cs' ? 'Metodika výpočtu:' : 'Calculation methodology:'}
                  </h4>
                  <ul className="space-y-2">
                    {state.calculatorType === 'production' ? (
                      <>
                        <li>• {currentLanguage === 'cs' 
                          ? 'Náklady na administrativu = počet zaměstnanců × průměrná mzda × % času'
                          : 'Admin costs = employees × average salary × time %'}</li>
                        <li className="text-red-500 dark:text-red-400">• {currentLanguage === 'cs' 
                          ? 'Úspora = 40% z administrativních nákladů (průměr z reálných projektů)'
                          : 'Savings = 40% of admin costs (average from real projects)'}</li>
                        <li>• {currentLanguage === 'cs' 
                          ? 'ROI = cena projektu ÷ měsíční úspora'
                          : 'ROI = project cost ÷ monthly savings'}</li>
                      </>
                    ) : (
                      <>
                        <li>• {currentLanguage === 'cs' 
                          ? 'Zachycené zakázky = 80% ze ztracených (rezervační systém)'
                          : 'Captured orders = 80% of lost orders (booking system)'}</li>
                        <li>• {currentLanguage === 'cs' 
                          ? 'Zvýšení kapacity = 20% z aktuálních tržeb (optimalizace)'
                          : 'Capacity increase = 20% of current revenue (optimization)'}</li>
                        <li>• {currentLanguage === 'cs' 
                          ? 'ROI = cena projektu ÷ celkový měsíční přínos'
                          : 'ROI = project cost ÷ total monthly benefit'}</li>
                      </>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Testimonials Section */}
          {/* Grant Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
                  <FiPercent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {currentLanguage === 'cs' ? 'Dotační možnosti pro IT projekty' : 'Grant Opportunities for IT Projects'}
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {currentLanguage === 'cs' 
                    ? 'Vaše investice do digitalizace může být z 30-60% hrazena z evropských dotací. Informujte se o aktuálních možnostech financování.'
                    : 'Your digitalization investment can be 30-60% funded by European grants. Learn about current financing opportunities.'
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {currentLanguage === 'cs' ? 'Digitální podnik (OP TAK)' : 'Digital Enterprise (OP TAK)'}
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {currentLanguage === 'cs' ? 'Dotace 0,6 - 30 mil. Kč' : 'Grants 0.6 - 30 million CZK'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {currentLanguage === 'cs' ? 'Pokrytí 30-60% nákladů' : '30-60% cost coverage'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {currentLanguage === 'cs' ? 'ERP, WMS, business aplikace' : 'ERP, WMS, business applications'}
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    {currentLanguage === 'cs' ? 'Aplikace II/III' : 'Applications II/III'}
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {currentLanguage === 'cs' ? 'Dotace 3 - 125 mil. Kč' : 'Grants 3 - 125 million CZK'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {currentLanguage === 'cs' ? 'Pokrytí 25-80% nákladů' : '25-80% cost coverage'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {currentLanguage === 'cs' ? 'Inovativní AI a deep tech' : 'Innovative AI and deep tech'}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {currentLanguage === 'cs' 
                    ? 'Nezávislé informace o dotačních možnostech najdete na oficiálních stránkách:'
                    : 'Independent information about grant opportunities can be found on official websites:'
                  }
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://optak.gov.cz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    OP TAK
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="https://www.prehleddotaci.cz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {currentLanguage === 'cs' ? 'Přehled dotací' : 'Grant Overview'}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="https://www.businessinfo.cz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    BusinessInfo.cz
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <ROITestimonials />
          </motion.div>
        </div>
      </div>
      
      {/* Modals */}
      <ROICaseStudyModal
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        caseStudy={selectedCaseStudy}
      />
    </section>
    
    {/* Portaled Modals - Rendered to document.body for proper z-index */}
    {typeof window !== 'undefined' && createPortal(
      <ROIEmailCapture
        isOpen={showEmailCapture}
        onClose={handleEmailCaptureClose}
        roiResults={state.results}
      />,
      document.body
    )}
    
    {typeof window !== 'undefined' && createPortal(
      <ExitIntentPopup
        isOpen={showExitIntent}
        onClose={dismissExitIntent}
        roiData={state.results}
      />,
      document.body
    )}
    </>
  );
};

export default ROICalculator;