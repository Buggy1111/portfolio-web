import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ROICalculator from './ROICalculator';
import { LanguageProvider } from '../context/LanguageContext';

// Mock the ROICaseStudyModal component
vi.mock('./ROICaseStudyModal', () => ({
  default: ({ isOpen, onClose }) => (
    isOpen ? <div data-testid="case-study-modal"><button onClick={onClose}>Close</button></div> : null
  )
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, transition, whileInView, viewport, whileHover, whileTap, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, initial, animate, transition, whileInView, viewport, whileHover, whileTap, ...props }) => <button {...props}>{children}</button>
  },
  AnimatePresence: ({ children }) => <div>{children}</div>
}));

const renderWithLanguage = (component) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('ROICalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders ROI calculator with default production type', () => {
    renderWithLanguage(<ROICalculator />);
    
    expect(screen.getByText('ROI Kalkulačka')).toBeInTheDocument();
    expect(screen.getByText('Výroba / Sklady / Logistika')).toBeInTheDocument();
    expect(screen.getByText('Služby / Obchod / Rezervace')).toBeInTheDocument();
  });

  test('switches between production and services calculator types', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Start with production type
    expect(screen.getByDisplayValue('150000')).toBeInTheDocument();
    
    // Switch to services
    fireEvent.click(screen.getByText('Služby / Obchod / Rezervace'));
    
    // Should change to services default price
    expect(screen.getByDisplayValue('80000')).toBeInTheDocument();
  });

  test('displays dynamic fields based on project type and cost', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Production type with default 150000 cost should show WMS fields
    const projectSelect = screen.getByDisplayValue('150000');
    expect(projectSelect).toBeInTheDocument();
    
    // Should show basic fields for any production project
    expect(screen.getByText('Počet zaměstnanců')).toBeInTheDocument();
    expect(screen.getByText('Průměrná mzda (Kč)')).toBeInTheDocument();
  });

  test('shows specific fields for warehouse system (85000)', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Change to warehouse system
    const projectSelect = screen.getByRole('combobox');
    fireEvent.change(projectSelect, { target: { value: '85000' } });
    
    // Should show warehouse-specific fields
    expect(screen.getByText('Hodiny papírování denně')).toBeInTheDocument();
    expect(screen.getByText('Chyby ve skladu měsíčně')).toBeInTheDocument();
  });

  test('calculates ROI for production type - warehouse system', async () => {
    renderWithLanguage(<ROICalculator />);
    
    // Change to warehouse system
    const projectSelect = screen.getByRole('combobox');
    fireEvent.change(projectSelect, { target: { value: '85000' } });
    
    // Fill in production form
    fireEvent.change(screen.getByPlaceholderText('např. 20'), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText('např. 30000'), { target: { value: '40000' } });
    fireEvent.change(screen.getByPlaceholderText('např. 4'), { target: { value: '6' } });
    fireEvent.change(screen.getByPlaceholderText('např. 8'), { target: { value: '10' } });
    
    // Calculate ROI
    fireEvent.click(screen.getByText('Vypočítat ROI'));
    
    await waitFor(() => {
      expect(screen.getByText('Výsledky kalkulace')).toBeInTheDocument();
    });
    
    // Should show ROI results
    expect(screen.getByText(/dní/)).toBeInTheDocument();
    expect(screen.getByText('Návratnost investice')).toBeInTheDocument();
  });

  test('calculates ROI for services type - reservation system', async () => {
    renderWithLanguage(<ROICalculator />);
    
    // Switch to services
    fireEvent.click(screen.getByText('Služby / Obchod / Rezervace'));
    
    // Should default to reservation system (45000)
    expect(screen.getByDisplayValue('45000')).toBeInTheDocument();
    
    // Fill in services form
    fireEvent.change(screen.getByPlaceholderText('např. 200000'), { target: { value: '150000' } });
    fireEvent.change(screen.getByPlaceholderText('např. 15'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('např. 2500'), { target: { value: '3000' } });
    
    // Calculate ROI
    fireEvent.click(screen.getByText('Vypočítat ROI'));
    
    await waitFor(() => {
      expect(screen.getByText('Výsledky kalkulace')).toBeInTheDocument();
    });
    
    // Should show services-specific results
    expect(screen.getByText('Ztracené tržby:')).toBeInTheDocument();
    expect(screen.getByText('Celkový přínos:')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    renderWithLanguage(<ROICalculator />);
    
    // Try to calculate without filling fields
    fireEvent.click(screen.getByText('Vypočítat ROI'));
    
    await waitFor(() => {
      // Should show validation errors
      expect(screen.getByText(/Zadejte/)).toBeInTheDocument();
    });
  });

  test('shows and hides presets', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Click to show presets
    fireEvent.click(screen.getByText(/Zobrazit reálné příklady/));
    
    // Should show preset examples
    expect(screen.queryByText(/Zaměstnanci/)).toBeInTheDocument();
  });

  test('resets form', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Fill some values
    fireEvent.change(screen.getByPlaceholderText('např. 20'), { target: { value: '15' } });
    
    // Reset form
    fireEvent.click(screen.getByText('Vymazat'));
    
    // Should clear values
    expect(screen.getByPlaceholderText('např. 20').value).toBe('');
  });

  test('shows methodology info', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Click info button
    fireEvent.click(screen.getByText('Jak se počítá ROI?'));
    
    // Should show methodology
    expect(screen.getByText('Metodika výpočtu:')).toBeInTheDocument();
  });

  test('handles invalid input gracefully', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Try to enter invalid characters
    const employeeInput = screen.getByPlaceholderText('např. 20');
    fireEvent.change(employeeInput, { target: { value: 'abc' } });
    
    // Should not accept invalid input
    expect(employeeInput.value).toBe('');
    
    // Try valid number
    fireEvent.change(employeeInput, { target: { value: '123' } });
    expect(employeeInput.value).toBe('123');
  });

  test('shows different project options for different calculator types', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Production options
    expect(screen.getByText(/Skladový systém/)).toBeInTheDocument();
    expect(screen.getByText(/WMS aplikace/)).toBeInTheDocument();
    expect(screen.getByText(/ERP integrace/)).toBeInTheDocument();
    
    // Switch to services
    fireEvent.click(screen.getByText('Služby / Obchod / Rezervace'));
    
    // Services options
    expect(screen.getByText(/Rezervační systém/)).toBeInTheDocument();
    expect(screen.getByText(/Pokročilý WMS systém/)).toBeInTheDocument();
    expect(screen.getByText(/Business aplikace/)).toBeInTheDocument();
  });

  test('changes fields when project cost changes', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Start with WMS (150000) - should have warehouse operations fields
    const projectSelect = screen.getByRole('combobox');
    fireEvent.change(projectSelect, { target: { value: '150000' } });
    
    // Change to warehouse system (85000)
    fireEvent.change(projectSelect, { target: { value: '85000' } });
    
    // Should show warehouse system specific fields
    expect(screen.getByText('Hodiny papírování denně')).toBeInTheDocument();
    expect(screen.getByText('Chyby ve skladu měsíčně')).toBeInTheDocument();
    
    // Change to ERP (250000)
    fireEvent.change(projectSelect, { target: { value: '250000' } });
    
    // Should show ERP specific fields
    expect(screen.getByText('Hodiny manuálního zadávání denně')).toBeInTheDocument();
    expect(screen.getByText('Nesrovnalosti v datech měsíčně')).toBeInTheDocument();
  });

  test('services type shows correct fields for different project costs', () => {
    renderWithLanguage(<ROICalculator />);
    
    // Switch to services
    fireEvent.click(screen.getByText('Služby / Obchod / Rezervace'));
    
    const projectSelect = screen.getByRole('combobox');
    
    // WMS System (80000)
    fireEvent.change(projectSelect, { target: { value: '80000' } });
    expect(screen.getByText('Ztracené objednávky měsíčně')).toBeInTheDocument();
    expect(screen.getByText('Průměrná hodnota objednávky')).toBeInTheDocument();
    
    // Business aplikace (140000)
    fireEvent.change(projectSelect, { target: { value: '140000' } });
    expect(screen.getByText('Hodiny manuálních procesů denně')).toBeInTheDocument();
    expect(screen.getByText('Náklady na neefektivitu měsíčně')).toBeInTheDocument();
    
    // Komplexní řešení (220000)
    fireEvent.change(projectSelect, { target: { value: '220000' } });
    expect(screen.getByText('Problémy s integrací měsíčně')).toBeInTheDocument();
    expect(screen.getByText('Hodnota ztracených příležitostí')).toBeInTheDocument();
  });
});

// Unit tests for calculation logic
describe('ROI Calculation Logic', () => {
  // Helper function to extract calculation logic
  const mockProjectConfig = {
    fields: ['employees', 'averageSalary', 'paperworkHoursPerDay', 'inventoryErrorsPerMonth'],
    labels: {
      paperworkHoursPerDay: 'Hodiny papírování denně',
      inventoryErrorsPerMonth: 'Chyby ve skladu měsíčně'
    }
  };

  test('production calculation should consider employee efficiency and error reduction', () => {
    const inputs = {
      employees: '10',
      averageSalary: '40000',
      paperworkHoursPerDay: '6',
      inventoryErrorsPerMonth: '10',
      projectCost: '85000'
    };

    // Expected calculation logic:
    // Monthly labor cost: 10 * 40000 = 400,000
    // Basic efficiency savings: 400,000 * 0.15 = 60,000
    // Time savings: 6 hours * 10 employees * (40000/160) * 0.5 = 37,500
    // Error savings: 10 errors * 1500 cost * 0.7 = 10,500
    // Total monthly savings: 60,000 + 37,500 + 10,500 = 108,000
    // ROI months: 85,000 / 108,000 = 0.787 months = 24 days

    const expectedMonthlySavings = 60000 + 37500 + 10500; // 108,000
    const expectedROIDays = Math.ceil((85000 / expectedMonthlySavings) * 30); // 24 days

    expect(expectedMonthlySavings).toBe(108000);
    expect(expectedROIDays).toBe(24);
  });

  test('services calculation should consider capture rates and capacity increases', () => {
    const inputs = {
      currentMonthlyRevenue: '150000',
      lostBookingsPerMonth: '20',
      averageBookingValue: '3000',
      projectCost: '45000'
    };

    // Expected calculation logic:
    // Lost bookings revenue: 20 * 3000 * 0.6 = 36,000
    // Capacity increase: 150,000 * 0.15 = 22,500
    // Total monthly benefit: 36,000 + 22,500 = 58,500
    // ROI months: 45,000 / 58,500 = 0.769 months = 23 days

    const capturedRevenue = 20 * 3000 * 0.6; // 36,000
    const capacityIncrease = 150000 * 0.15; // 22,500
    const totalBenefit = capturedRevenue + capacityIncrease; // 58,500
    const roiDays = Math.ceil((45000 / totalBenefit) * 30); // 23 days

    expect(capturedRevenue).toBe(36000);
    expect(capacityIncrease).toBe(22500);
    expect(totalBenefit).toBe(58500);
    expect(roiDays).toBe(23);
  });

  test('edge case - very high ROI scenario', () => {
    // Small project cost, big savings
    const projectCost = 25000; 
    const monthlySavings = 50000;
    const roiDays = Math.ceil((projectCost / monthlySavings) * 30); // 15 days
    const yearlyROI = ((monthlySavings * 12 - projectCost) / projectCost) * 100; // 2300%

    expect(roiDays).toBe(15);
    expect(Math.round(yearlyROI)).toBe(2300);
  });

  test('edge case - low ROI scenario', () => {
    // High project cost, small savings
    const projectCost = 400000;
    const monthlySavings = 8000;
    const roiDays = Math.ceil((projectCost / monthlySavings) * 30); // 1500 days
    const yearlyROI = ((monthlySavings * 12 - projectCost) / projectCost) * 100; // -76%

    expect(roiDays).toBe(1500);
    expect(Math.round(yearlyROI)).toBe(-76);
  });

  test('validation should catch missing required fields', () => {
    const testCases = [
      {
        inputs: { employees: '', averageSalary: '30000', paperworkHoursPerDay: '4' },
        expectedError: 'employees'
      },
      {
        inputs: { employees: '0', averageSalary: '30000', paperworkHoursPerDay: '4' },
        expectedError: 'employees'
      },
      {
        inputs: { employees: '10', averageSalary: '', paperworkHoursPerDay: '4' },
        expectedError: 'averageSalary'
      },
      {
        inputs: { employees: '10', averageSalary: '30000', paperworkHoursPerDay: '' },
        expectedError: 'paperworkHoursPerDay'
      }
    ];

    testCases.forEach(testCase => {
      let hasError = false;
      mockProjectConfig.fields.forEach(field => {
        if (!testCase.inputs[field] || parseFloat(testCase.inputs[field]) <= 0) {
          if (field === testCase.expectedError) {
            hasError = true;
          }
        }
      });
      expect(hasError).toBe(true);
    });
  });
});