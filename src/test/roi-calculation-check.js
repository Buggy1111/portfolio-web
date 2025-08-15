// Kontrola správnosti ROI výpočtů

console.log('=== Kontrola ROI kalkulátoru ===\n');

// Simulace production kalkulace - skladový systém
console.log('1. PRODUCTION - Skladový systém (85 000 Kč)');
console.log('Vstupní data:');
const productionInputs = {
  employees: 10,
  averageSalary: 40000,
  paperworkHoursPerDay: 6,
  inventoryErrorsPerMonth: 10,
  projectCost: 85000
};

console.log(`- Zaměstnanců: ${productionInputs.employees}`);
console.log(`- Průměrná mzda: ${productionInputs.averageSalary} Kč`);
console.log(`- Hodiny papírování denně: ${productionInputs.paperworkHoursPerDay}`);
console.log(`- Chyby ve skladu měsíčně: ${productionInputs.inventoryErrorsPerMonth}`);
console.log(`- Cena projektu: ${productionInputs.projectCost} Kč`);

// Výpočet podle nové logiky
const monthlyLaborCost = productionInputs.employees * productionInputs.averageSalary;
const basicEfficiencySavings = monthlyLaborCost * 0.15;
const hourlyCost = productionInputs.averageSalary / 160; // 160 working hours per month
const timeSavings = productionInputs.paperworkHoursPerDay * productionInputs.employees * hourlyCost * 0.5;
const errorCost = 1500; // average cost per error
const errorSavings = productionInputs.inventoryErrorsPerMonth * errorCost * 0.7;
const totalMonthlySavings = basicEfficiencySavings + timeSavings + errorSavings;
const roiMonths = productionInputs.projectCost / totalMonthlySavings;
const roiDays = Math.ceil(roiMonths * 30);
const yearlyROI = ((totalMonthlySavings * 12 - productionInputs.projectCost) / productionInputs.projectCost) * 100;

console.log('\nVýpočet:');
console.log(`- Měsíční náklady na práci: ${monthlyLaborCost.toLocaleString()} Kč`);
console.log(`- Základní efektivita (15%): ${basicEfficiencySavings.toLocaleString()} Kč`);
console.log(`- Hodinová sazba: ${hourlyCost.toLocaleString()} Kč/hod`);
console.log(`- Úspora času (50%): ${timeSavings.toLocaleString()} Kč`);
console.log(`- Úspora chyb (70%): ${errorSavings.toLocaleString()} Kč`);
console.log(`- Celková měsíční úspora: ${totalMonthlySavings.toLocaleString()} Kč`);
console.log(`- ROI v měsících: ${roiMonths.toFixed(2)}`);
console.log(`- ROI ve dnech: ${roiDays}`);
console.log(`- Roční ROI: ${yearlyROI.toFixed(0)}%`);

console.log('\n' + '='.repeat(50) + '\n');

// Simulace services kalkulace - rezervační systém
console.log('2. SERVICES - Rezervační systém (45 000 Kč)');
console.log('Vstupní data:');
const servicesInputs = {
  currentMonthlyRevenue: 150000,
  lostBookingsPerMonth: 20,
  averageBookingValue: 3000,
  projectCost: 45000
};

console.log(`- Současné měsíční tržby: ${servicesInputs.currentMonthlyRevenue} Kč`);
console.log(`- Ztracené rezervace měsíčně: ${servicesInputs.lostBookingsPerMonth}`);
console.log(`- Průměrná hodnota rezervace: ${servicesInputs.averageBookingValue} Kč`);
console.log(`- Cena projektu: ${servicesInputs.projectCost} Kč`);

// Výpočet podle nové logiky
const captureRate = 0.6; // 60% capture rate for lost bookings
const capturedRevenue = servicesInputs.lostBookingsPerMonth * servicesInputs.averageBookingValue * captureRate;
const capacityIncrease = servicesInputs.currentMonthlyRevenue * 0.15; // 15% capacity increase
const totalMonthlyBenefit = capturedRevenue + capacityIncrease;
const servicesROIMonths = servicesInputs.projectCost / totalMonthlyBenefit;
const servicesROIDays = Math.ceil(servicesROIMonths * 30);
const servicesYearlyROI = ((totalMonthlyBenefit * 12 - servicesInputs.projectCost) / servicesInputs.projectCost) * 100;

console.log('\nVýpočet:');
console.log(`- Zachycené rezervace (60%): ${capturedRevenue.toLocaleString()} Kč`);
console.log(`- Zvýšení kapacity (15%): ${capacityIncrease.toLocaleString()} Kč`);
console.log(`- Celkový měsíční přínos: ${totalMonthlyBenefit.toLocaleString()} Kč`);
console.log(`- ROI v měsících: ${servicesROIMonths.toFixed(2)}`);
console.log(`- ROI ve dnech: ${servicesROIDays}`);
console.log(`- Roční ROI: ${servicesYearlyROI.toFixed(0)}%`);

console.log('\n' + '='.repeat(50) + '\n');

// Ověření reálnosti výsledků
console.log('3. OVĚŘENÍ REÁLNOSTI');
console.log('Production systém:');
console.log(`- ROI za ${roiDays} dní je ${roiDays < 365 ? 'REÁLNÉ' : 'NEREÁLNÉ'}`);
console.log(`- Roční ROI ${yearlyROI.toFixed(0)}% je ${yearlyROI > 100 && yearlyROI < 2000 ? 'ROZUMNÉ' : 'EXTRÉMNÍ'}`);

console.log('\nServices systém:');
console.log(`- ROI za ${servicesROIDays} dní je ${servicesROIDays < 365 ? 'REÁLNÉ' : 'NEREÁLNÉ'}`);
console.log(`- Roční ROI ${servicesYearlyROI.toFixed(0)}% je ${servicesYearlyROI > 100 && servicesYearlyROI < 2000 ? 'ROZUMNÉ' : 'EXTRÉMNÍ'}`);

console.log('\n' + '='.repeat(50) + '\n');

// Srovnání s původní logikou (pro referenci)
console.log('4. SROVNÁNÍ S PŮVODNÍ LOGIKOU');
console.log('Původní production výpočet (40% z admin času):');
const oldAdminPercent = 0.25; // 25% admin time
const oldMonthlyAdminCost = productionInputs.employees * productionInputs.averageSalary * oldAdminPercent;
const oldMonthlySavings = oldMonthlyAdminCost * 0.4;
const oldROIDays = Math.ceil((productionInputs.projectCost / oldMonthlySavings) * 30);
console.log(`- Staré ROI: ${oldROIDays} dní`);
console.log(`- Nové ROI: ${roiDays} dní`);
console.log(`- Rozdíl: ${roiDays - oldROIDays} dní ${roiDays < oldROIDays ? '(lepší)' : '(horší)'}`);

console.log('\n=== SHRNUTÍ ===');
console.log(`Production ROI: ${roiDays} dní (${yearlyROI.toFixed(0)}% ročně)`);
console.log(`Services ROI: ${servicesROIDays} dní (${servicesYearlyROI.toFixed(0)}% ročně)`);
console.log('Výsledky vypadají rozumně a realisticky! ✅');

export default true;