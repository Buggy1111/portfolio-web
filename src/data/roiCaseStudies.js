// Case studies for ROI Calculator examples
// Note: All company examples are fictional and created for demonstration purposes only.
// Any resemblance to real companies is purely coincidental.
export const roiCaseStudies = {
  production: [
    {
      id: 'basic-warehouse',
      type: 'production',
      title: {
        cs: 'Malá skladová firma - Základní WMS systém',
        en: 'Small Warehouse Company - Basic WMS System'
      },
      location: {
        cs: 'Třinec, MSK',
        en: 'Třinec, Czech Republic'
      },
      employees: 12,
      averageSalary: 32000,
      adminTimePercentage: 30,
      industry: 'Sklady',
      projectInfo: {
        cs: {
          plan: 'Základní skladový systém',
          price: '45 000 Kč',
          duration: '4 týdny',
          description: 'Cloudový WMS systém pro malé firmy s čárovými kódy a základní evidencí, inspirováno Lokia WMS'
        },
        en: {
          plan: 'Basic Warehouse System', 
          price: '45,000 CZK',
          duration: '4 weeks',
          description: 'Cloud WMS system for small companies with barcodes and basic records, inspired by Lokia WMS'
        }
      },
      description: {
        cs: 'Malá skladová firma se specializuje na distribuci stavebního materiálu a nářadí pro lokální řemeslníky a malé stavební firmy v regionu.',
        en: 'Small warehouse company specializing in building materials and tools distribution for local craftsmen and small construction companies in the region.'
      },
      problemQuote: {
        cs: 'Denně nám zmizí nějaké zboží ze skladu. Ruční evidence v sešitech nefunguje, často nevíme co máme na skladě. Zákazníci čekají a my hledáme...',
        en: 'Every day some goods disappear from our warehouse. Manual records in notebooks don\'t work, we often don\'t know what we have in stock. Customers wait and we search...'
      },
      problems: {
        cs: [
          'Ztracené zboží a nesrovnalosti v evidenci',
          'Ruční vypisování skladních karet',
          'Dlouhé hledání zboží ve skladu',
          'Chyby při výdeji materiálu',
          'Nemáme přehled o stavu zásob'
        ],
        en: [
          'Lost goods and inventory discrepancies',
          'Manual warehouse card writing',
          'Long goods searching in warehouse',
          'Errors during material dispatch',
          'No stock level overview'
        ]
      },
      solution: {
        cs: 'Implementovali jsme základní WMS systém s čárovými kódy pro rychlou evidenci příjmů, výdejů a lokalizaci zboží ve skladu.',
        en: 'We implemented basic WMS system with barcodes for quick recording of receipts, dispatches and goods localization in warehouse.'
      },
      features: {
        cs: [
          'Čárové kódy pro rychlou identifikaci',
          'Skladové pozice a lokalizace zboží',
          'Mobilní aplikace pro skladníky',
          'Automatické aktualizace stavu zásob',
          'Jednoduché reporty a inventury',
          'Propojení s účetním systémem'
        ],
        en: [
          'Barcodes for quick identification',
          'Warehouse positions and goods localization',
          'Mobile app for warehouse workers',
          'Automatic stock level updates',
          'Simple reports and inventories',
          'Accounting system integration'
        ]
      },
      results: {
        roiDays: 25,
        monthlySavings: 38000,
        yearlyROI: 1013,
        benefits: {
          cs: [
            'Zboží se už neztrácí díky lokalizaci',
            'Rychlejší vydávání objednávek',
            'Přesná evidence stavu zásob',
            'Méně chyb při inventurách',
            'Úspora času skladníků o 40%'
          ],
          en: [
            'Goods no longer lost thanks to localization',
            'Faster order dispatch',
            'Accurate stock level records',
            'Fewer inventory errors',
            '40% warehouse workers time savings'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Konečně máme pořádek ve skladu! Díky čárovým kódům najdeme každé zboží za minutu. Zákazníci jsou spokojení a my ušetříme spoustu času.',
          en: 'Finally we have order in the warehouse! Thanks to barcodes we find any goods in a minute. Customers are satisfied and we save a lot of time.'
        },
        author: 'Pavel Novák',
        position: {
          cs: 'Jednatel, Stavebniny Třinec s.r.o.',
          en: 'CEO, Building Materials Třinec s.r.o.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Analýza skladu',
            en: 'Warehouse Analysis'
          },
          duration: '3 dny',
          description: {
            cs: 'Zmapování skladových pozic a procesů',
            en: 'Mapping warehouse positions and processes'
          }
        },
        {
          phase: {
            cs: 'Vývoj WMS systému',
            en: 'WMS System Development'
          },
          duration: '2.5 týdne',
          description: {
            cs: 'React aplikace s mobilní podporou',
            en: 'React application with mobile support'
          }
        },
        {
          phase: {
            cs: 'Označení zboží',
            en: 'Goods Labeling'
          },
          duration: '2 dny',
          description: {
            cs: 'Vytištění a nalepení čárových kódů',
            en: 'Printing and applying barcodes'
          }
        },
        {
          phase: {
            cs: 'Školení a spuštění',
            en: 'Training & Launch'
          },
          duration: '2 dny',
          description: {
            cs: 'Školení skladníků a ostré nasazení',
            en: 'Warehouse workers training and live deployment'
          }
        }
      ]
    },
    {
      id: 'advanced-wms',
      type: 'production',
      title: {
        cs: 'Střední firma - Pokročilý WMS systém',
        en: 'Medium Company - Advanced WMS System'
      },
      location: {
        cs: 'Karviná, MSK',
        en: 'Karviná, Czech Republic'
      },
      employees: 28,
      averageSalary: 35000,
      adminTimePercentage: 25,
      industry: 'Logistika',
      projectInfo: {
        cs: {
          plan: 'Pokročilý WMS systém',
          price: '80 000 Kč',
          duration: '5 týdnů',
          description: 'Pokročilý WMS s mobilní aplikací, reporty a integrací, inspirováno Elasticr WMS'
        },
        en: {
          plan: 'Advanced WMS System',
          price: '80,000 CZK',
          duration: '5 weeks',
          description: 'Advanced WMS with mobile app, reports and integration, inspired by Elasticr WMS'
        }
      },
      description: {
        cs: 'Střední logistická firma poskytuje skladovací a distribuční služby pro retail firmy a výrobní podniky s komplexními požadavky na správu zásob.',
        en: 'Medium logistics company provides warehousing and distribution services for retail companies and manufacturing enterprises with complex inventory management requirements.'
      },
      problemQuote: {
        cs: 'Máme složité skladové operace s více zákazníky. Kompletace objednávek trvá dlouho, děláme chyby a zákazníci si stěžují na špatné dodávky...',
        en: 'We have complex warehouse operations with multiple customers. Order picking takes long, we make errors and customers complain about wrong deliveries...'
      },
      problems: {
        cs: [
          'Složité skladové operace pro více klientů',
          'Chyby při kompletaci objednávek',
          'Dlouhé zpracování příjmů a výdejů',
          'Nemáme přehled o výkonnosti skladu',
          'Klienti požadují detailní reporty'
        ],
        en: [
          'Complex warehouse operations for multiple clients',
          'Errors during order picking',
          'Long processing of receipts and dispatches',
          'No warehouse performance overview',
          'Clients require detailed reports'
        ]
      },
      solution: {
        cs: 'Nasadili jsme pokročilý WMS systém s optimalizací tras skladníků, kontrolou kvality a pokročilými reporty pro klienty.',
        en: 'We implemented advanced WMS system with warehouse worker route optimization, quality control and advanced client reports.'
      },
      features: {
        cs: [
          'Optimalizace tras při kompletaci',
          'Kontrola kvality pomocí čárových kódů',
          'Pokročilé reporty pro klienty',
          'Multi-tenant architektura',
          'Dashboardy s KPI metrikami',
          'API integrace s klientskými systémy'
        ],
        en: [
          'Route optimization during picking',
          'Quality control via barcodes',
          'Advanced client reports',
          'Multi-tenant architecture',
          'KPI metrics dashboards',
          'API integration with client systems'
        ]
      },
      results: {
        roiDays: 30,
        monthlySavings: 55000,
        yearlyROI: 825,
        benefits: {
          cs: [
            'O 60% rychlejší kompletace objednávek',
            'Snížení chybovosti na 0.2%',
            'Automatické reporty pro klienty',
            'Lepší využití skladových kapacit',
            'Spokojenější zákazníci a nové kontrakty'
          ],
          en: [
            '60% faster order picking',
            'Error rate reduced to 0.2%',
            'Automatic client reports',
            'Better warehouse capacity utilization',
            'Happier customers and new contracts'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Pokročilý WMS systém nám změnil způsob práce. Skladníci mají optimalizované trasy, klienti dostávají automatické reporty a chybovost je minimální.',
          en: 'Advanced WMS system changed our way of working. Warehouse workers have optimized routes, clients get automatic reports and error rate is minimal.'
        },
        author: 'Ing. Marie Svobodová',
        position: {
          cs: 'Ředitelka, LogiCenter Karviná a.s.',
          en: 'Director, LogiCenter Karviná a.s.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Analýza procesů',
            en: 'Process Analysis'
          },
          duration: '1 týden',
          description: {
            cs: 'Detailní analýza skladových operací',
            en: 'Detailed warehouse operations analysis'
          }
        },
        {
          phase: {
            cs: 'Vývoj WMS platformy',
            en: 'WMS Platform Development'
          },
          duration: '3 týdny',
          description: {
            cs: 'Pokročilá React aplikace s optimalizacemi',
            en: 'Advanced React application with optimizations'
          }
        },
        {
          phase: {
            cs: 'Integrace systémů',
            en: 'Systems Integration'
          },
          duration: '4 dny',
          description: {
            cs: 'Napojení na ERP a klientské systémy',
            en: 'Connection to ERP and client systems'
          }
        },
        {
          phase: {
            cs: 'Testování a školení',
            en: 'Testing & Training'
          },
          duration: '3 dny',
          description: {
            cs: 'Výkonnostní testy a školení týmu',
            en: 'Performance testing and team training'
          }
        }
      ]
    },
    {
      id: 'enterprise-warehouse',
      type: 'production',
      title: {
        cs: 'Velká firma - Enterprise skladové řešení',
        en: 'Large Company - Enterprise Warehouse Solution'
      },
      location: {
        cs: 'Ostrava, MSK',
        en: 'Ostrava, Czech Republic'
      },
      employees: 52,
      averageSalary: 38000,
      adminTimePercentage: 20,
      industry: 'Distribuce',
      projectInfo: {
        cs: {
          plan: 'Enterprise skladové řešení',
          price: '150 000 Kč',
          duration: '8 týdnů',
          description: 'Komplexní WMS s automatizací, AI funkcemi a integrací, inspirováno K2 WMS'
        },
        en: {
          plan: 'Enterprise Warehouse Solution',
          price: '150,000 CZK',
          duration: '8 weeks',
          description: 'Comprehensive WMS with automation, AI features and integration, inspired by K2 WMS'
        }
      },
      description: {
        cs: 'Velká distribuční firma obsluhuje celonárodní trh s několika sklady, tisíci produktů a stovkami dodavatelů s vysokými nároky na efektivitu.',
        en: 'Large distribution company serves nationwide market with multiple warehouses, thousands of products and hundreds of suppliers with high efficiency requirements.'
      },
      problemQuote: {
        cs: 'Manuální zadávání dat nás zabíjí. Máme nesrovnalosti mezi sklady, zdlouhavé inventury a zákazníci si stěžují na dostupnost zboží...',
        en: 'Manual data entry is killing us. We have discrepancies between warehouses, lengthy inventories and customers complain about product availability...'
      },
      problems: {
        cs: [
          'Manuální zadávání dat zabírá hodiny',
          'Nesrovnalosti mezi více sklady',
          'Zdlouhavé inventury a audity',
          'Špatné plánování nákupů',
          'Nedostatečná analytika prodejů'
        ],
        en: [
          'Manual data entry takes hours',
          'Discrepancies between multiple warehouses',
          'Lengthy inventories and audits',
          'Poor purchasing planning',
          'Insufficient sales analytics'
        ]
      },
      solution: {
        cs: 'Implementovali jsme enterprise WMS s automatizací procesů, AI predikci poptávky a pokročilou analytikou pro optimalizaci zásob.',
        en: 'We implemented enterprise WMS with process automation, AI demand prediction and advanced analytics for inventory optimization.'
      },
      features: {
        cs: [
          'Automatizace příjmů a výdejů',
          'AI predikce poptávky a doplňování',
          'Multi-warehouse management',
          'Pokročilá analytika a BI reporty',
          'Automatické objednávání od dodavatelů',
          'Real-time synchronizace mezi sklady'
        ],
        en: [
          'Receipt and dispatch automation',
          'AI demand prediction and replenishment',
          'Multi-warehouse management',
          'Advanced analytics and BI reports',
          'Automatic supplier ordering',
          'Real-time warehouse synchronization'
        ]
      },
      results: {
        roiDays: 35,
        monthlySavings: 120000,
        yearlyROI: 960,
        benefits: {
          cs: [
            'Automatizace ušetří 200 hodin měsíčně',
            'AI snížila překapitalizování o 30%',
            'Inventury trvají 3x rychleji',
            'Dostupnost zboží se zlepšila na 98%',
            'ROI ze snížení zásob: 2.5 milionu'
          ],
          en: [
            'Automation saves 200 hours monthly',
            'AI reduced overcapitalization by 30%',
            'Inventories are 3x faster',
            'Product availability improved to 98%',
            'ROI from inventory reduction: 2.5 million'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Enterprise WMS s AI funkcemi revolucionizovalo naše skladování. Automatické doplňování zásob a predikce nám ušetří miliony na mrtvých zásobách.',
          en: 'Enterprise WMS with AI features revolutionized our warehousing. Automatic replenishment and prediction save us millions on dead stock.'
        },
        author: 'Ing. Tomáš Krejčí, MBA',
        position: {
          cs: 'COO, DistribMax Group a.s.',
          en: 'COO, DistribMax Group a.s.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Strategická analýza',
            en: 'Strategic Analysis'
          },
          duration: '2 týdny',
          description: {
            cs: 'Komplexní audit všech skladových procesů',
            en: 'Comprehensive audit of all warehouse processes'
          }
        },
        {
          phase: {
            cs: 'Architektura řešení',
            en: 'Solution Architecture'
          },
          duration: '1 týden',
          description: {
            cs: 'Návrh enterprise architektury s AI',
            en: 'Enterprise architecture design with AI'
          }
        },
        {
          phase: {
            cs: 'Vývoj WMS platformy',
            en: 'WMS Platform Development'
          },
          duration: '4 týdny',
          description: {
            cs: 'Vývoj škálovatelné WMS platformy',
            en: 'Scalable WMS platform development'
          }
        },
        {
          phase: {
            cs: 'AI implementace',
            en: 'AI Implementation'
          },
          duration: '1 týden',
          description: {
            cs: 'Trénink AI modelů na historických datech',
            en: 'AI model training on historical data'
          }
        }
      ]
    },
    {
      id: 'manufacturing-system',
      type: 'production',
      title: {
        cs: 'Výrobní podnik - Komplexní výrobní systém',
        en: 'Manufacturing Company - Complex Production System'
      },
      location: {
        cs: 'Frýdek-Místek, MSK',
        en: 'Frýdek-Místek, Czech Republic'
      },
      employees: 85,
      averageSalary: 42000,
      adminTimePercentage: 15,
      industry: 'Výroba',
      projectInfo: {
        cs: {
          plan: 'Komplexní výrobní systém',
          price: '250 000 Kč',
          duration: '12 týdnů',
          description: 'Custom výrobní řešení s IoT senzory, prediktivní analytikou a automatizací'
        },
        en: {
          plan: 'Complex Production System',
          price: '250,000 CZK',
          duration: '12 weeks',
          description: 'Custom manufacturing solution with IoT sensors, predictive analytics and automation'
        }
      },
      description: {
        cs: 'Velký výrobní podnik specializující se na přesné strojírenské komponenty pro automobilový průmysl s vysokými požadavky na kvalitu a efektivitu.',
        en: 'Large manufacturing company specializing in precision engineering components for automotive industry with high quality and efficiency requirements.'
      },
      problemQuote: {
        cs: 'Prostoje výroby nás stojí miliony. Nemáme včasnou signalizaci problémů a kvalitativní problémy objevujeme až u zákazníka...',
        en: 'Production downtime costs us millions. We have no early problem signaling and quality issues are discovered only at customer...'
      },
      problems: {
        cs: [
          'Neplánované prostoje výrobních linek',
          'Pozdní detekce kvalitativních problémů',
          'Ruční sběr výrobních dat',
          'Špatné plánování údržby strojů',
          'Vysoké zmetkovitosti a reklamace'
        ],
        en: [
          'Unplanned production line downtime',
          'Late quality problem detection',
          'Manual production data collection',
          'Poor machine maintenance planning',
          'High defect rates and complaints'
        ]
      },
      solution: {
        cs: 'Nasadili jsme komplexní výrobní systém s IoT senzory, prediktivní údržbou a real-time kontrolou kvality s okamžitými upozorněními.',
        en: 'We implemented comprehensive production system with IoT sensors, predictive maintenance and real-time quality control with instant alerts.'
      },
      features: {
        cs: [
          'IoT senzory na všech výrobních linkách',
          'Prediktivní údržba strojů pomocí AI',
          'Real-time kontrola kvality',
          'Automatické plánování výroby',
          'Dashboardy pro management',
          'Integrace s ERP a CRM systémy'
        ],
        en: [
          'IoT sensors on all production lines',
          'AI-powered predictive machine maintenance',
          'Real-time quality control',
          'Automatic production planning',
          'Management dashboards',
          'ERP and CRM systems integration'
        ]
      },
      results: {
        roiDays: 45,
        monthlySavings: 180000,
        yearlyROI: 864,
        benefits: {
          cs: [
            'Snížení prostojů o 70%',
            'Prediktivní údržba ušetří 3 miliony ročně',
            'Zmetkovitost klesla z 2.1% na 0.3%',
            'OEE vzrostlo z 65% na 89%',
            'Zero neplánovaných prostojů za Q4'
          ],
          en: [
            '70% downtime reduction',
            'Predictive maintenance saves 3 million annually',
            'Defect rate dropped from 2.1% to 0.3%',
            'OEE increased from 65% to 89%',
            'Zero unplanned downtime in Q4'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Komplexní systém s IoT a AI predikci změnil naši výrobu na Smart Factory. Víme o problémech dřív než nastanou a kvalita je na špičkové úrovni.',
          en: 'Complex system with IoT and AI prediction transformed our production into Smart Factory. We know about problems before they happen and quality is at top level.'
        },
        author: 'Ing. Jan Dvořák, Ph.D.',
        position: {
          cs: 'Výrobní ředitel, TechComponents a.s.',
          en: 'Production Director, TechComponents a.s.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Výrobní audit',
            en: 'Production Audit'
          },
          duration: '2 týdny',
          description: {
            cs: 'Detailní analýza výrobních procesů a strojů',
            en: 'Detailed production processes and machines analysis'
          }
        },
        {
          phase: {
            cs: 'IoT infrastruktura',
            en: 'IoT Infrastructure'
          },
          duration: '3 týdny',
          description: {
            cs: 'Instalace senzorů a komunikačních systémů',
            en: 'Sensors and communication systems installation'
          }
        },
        {
          phase: {
            cs: 'Vývoj platformy',
            en: 'Platform Development'
          },
          duration: '5 týdnů',
          description: {
            cs: 'Custom výrobní systém s AI algoritmy',
            en: 'Custom production system with AI algorithms'
          }
        },
        {
          phase: {
            cs: 'AI trénink',
            en: 'AI Training'
          },
          duration: '1 týden',
          description: {
            cs: 'Trénink prediktivních modelů na data',
            en: 'Predictive models training on data'
          }
        },
        {
          phase: {
            cs: 'Ostrý provoz',
            en: 'Live Operation'
          },
          duration: '1 týden',
          description: {
            cs: 'Postupné spuštění na všech linkách',
            en: 'Gradual launch on all production lines'
          }
        }
      ]
    }
  ],
  services: [
    {
      id: 'craftsman-services',
      type: 'services',
      title: {
        cs: 'Řemeslník - Instalatérské služby',
        en: 'Craftsman - Plumbing Services'
      },
      location: {
        cs: 'Havířov, MSK',
        en: 'Havířov, Czech Republic'
      },
      employees: 3,
      monthlyRevenue: 120000,
      lostOrdersPerMonth: 3,
      averageOrderValue: 8000,
      industry: 'Služby',
      projectInfo: {
        cs: {
          plan: 'Rezervační systém',
          price: '45 000 Kč',
          duration: '3 týdny',
          description: 'Jednoduchý rezervační systém s online kalendářem a SMS notifikacemi pro malé řemeslníky'
        },
        en: {
          plan: 'Booking System',
          price: '45,000 CZK',
          duration: '3 weeks', 
          description: 'Simple booking system with online calendar and SMS notifications for small craftsmen'
        }
      },
      description: {
        cs: 'Poskytujeme instalatérské služby pro domácnosti i firmy. Specializujeme se na opravy, rekonstrukce koupelen a montáže topení.',
        en: 'We provide plumbing services for households and companies. We specialize in repairs, bathroom renovations and heating installations.'
      },
      problemQuote: {
        cs: 'Zákazníci volají, ale my jsme na montáži a nemůžeme zvedat. Když se ozvu večer, už si našli někoho jiného. Ztratím tak spoustu práce...',
        en: 'Customers call, but we\'re on installation and can\'t answer. When I call back in the evening, they already found someone else. I lose so much work...'
      },
      problems: {
        cs: [
          'Propásnuté zakázky kvůli nedostupnosti',
          'Žádný online rezervační systém',
          'Zákazníci neví kdy přijedeme',
          'Komplikované domlouvání termínů',
          'Konkurence je dostupnější online'
        ],
        en: [
          'Missed orders due to unavailability',
          'No online booking system',
          'Customers don\'t know when we\'ll arrive',
          'Complicated appointment scheduling',
          'Competition is more accessible online'
        ]
      },
      solution: {
        cs: 'Vytvořili jsme rezervační systém s online kalendářem, automatickými SMS a možností objednat službu 24/7.',
        en: 'We created a booking system with online calendar, automatic SMS and 24/7 service ordering capability.'
      },
      features: {
        cs: [
          'Online rezervační kalendář',
          'Automatické SMS potvrzení a připomínky',
          'Ceník služeb s okamžitou cenou',
          'Fotogalerie realizovaných prací',
          'Zákaznické recenze a hodnocení',
          'Mobilní aplikace pro techniky'
        ],
        en: [
          'Online booking calendar',
          'Automatic SMS confirmation and reminders',
          'Service price list with instant pricing',
          'Photo gallery of completed work',
          'Customer reviews and ratings',
          'Mobile app for technicians'
        ]
      },
      results: {
        roiDays: 25,
        monthlySavings: 28000,
        yearlyROI: 647,
        benefits: {
          cs: [
            'Žádné propásnuté zakázky',
            'Rezervace i v noci a o víkendech',
            'Spokojení zákazníci díky przypomínkám',
            'Vyšší hodinová sazba díky profesionálnímu image',
            'Možnost expandovat bez dalších zaměstnanců'
          ],
          en: [
            'No missed orders',
            'Bookings even at night and weekends',
            'Happy customers thanks to reminders',
            'Higher hourly rate due to professional image',
            'Expansion opportunity without additional staff'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Dřív jsme odmítli spoustu práce jen proto, že jsme nebyli dostupní. Teď si lidé rezervují sami a já vidím plný kalendář na týden dopředu!',
          en: 'We used to refuse a lot of work just because we weren\'t available. Now people book themselves and I see a full calendar a week ahead!'
        },
        author: 'Pavel Novotný',
        position: {
          cs: 'Majitel, Instalatér Novotný',
          en: 'Owner, Plumber Novotný'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Návrh systému',
            en: 'System Design'
          },
          duration: '3 dny',
          description: {
            cs: 'Návrh rezervačního systému a cenové kalkulačky',
            en: 'Design of booking system and pricing calculator'
          }
        },
        {
          phase: {
            cs: 'Vývoj a integrace',
            en: 'Development & Integration'
          },
          duration: '2 týdny',
          description: {
            cs: 'Programování rezervačního systému a SMS brány',
            en: 'Programming booking system and SMS gateway'
          }
        },
        {
          phase: {
            cs: 'Testování',
            en: 'Testing'
          },
          duration: '3 dny',
          description: {
            cs: 'Testování rezervací a SMS notifikací',
            en: 'Testing bookings and SMS notifications'
          }
        },
        {
          phase: {
            cs: 'Spuštění',
            en: 'Launch'
          },
          duration: '2 dny',
          description: {
            cs: 'Spuštění systému a školení obsluhy',
            en: 'System launch and operator training'
          }
        }
      ]
    },
    {
      id: 'service-company',
      type: 'services',
      title: {
        cs: 'Střední firma - Sportovní potřeby',
        en: 'Medium Company - Sports Equipment'
      },
      location: {
        cs: 'Frýdek-Místek, MSK',
        en: 'Frýdek-Místek, Czech Republic'
      },
      employees: 8,
      monthlyRevenue: 180000,
      lostOrdersPerMonth: 6,
      averageOrderValue: 12000,
      industry: 'Sport',
      projectInfo: {
        cs: {
          plan: 'Pokročilý WMS systém',
          price: '80 000 Kč',
          duration: '6 týdnů',
          description: 'Pokročilý skladový systém se správou zásob, objednávek a integrací s dodavateli'
        },
        en: {
          plan: 'Advanced WMS System',
          price: '80,000 CZK', 
          duration: '6 weeks',
          description: 'Advanced warehouse system with inventory management, orders and supplier integration'
        }
      },
      description: {
        cs: 'Kamenný obchod se sportovními potřebami specializující se na outdoor vybavení, běžecké potřeby a fitness doplňky pro aktivní životní styl.',
        en: 'Physical sports equipment store specializing in outdoor gear, running equipment and fitness accessories for active lifestyle.'
      },
      problemQuote: {
        cs: 'Máme 3 prodejny a centrální sklad, ale nevíme co kde máme. Zboží často chybí v jedné prodejně, zatímco jinde přebývá. Zákazníci odcházejí ke konkurenci...',
        en: 'We have 3 stores and central warehouse, but we don\'t know what we have where. Goods are often missing in one store while excess in another. Customers go to competitors...'
      },
      problems: {
        cs: [
          'Žádný real-time přehled mezi prodejnami',
          'Ztracené prodeje kvůli chybějícímu zboží',
          'Přebytečné zásoby = 500k Kč mrtvý kapitál',
          'Inventury trvají 3 dny a zavíráme',
          'Chaos při přesunech mezi prodejnami'
        ],
        en: [
          'No real-time overview between stores',
          'Lost sales due to missing goods',
          'Excess inventory = 500k CZK dead capital',
          'Inventories take 3 days and we close',
          'Chaos during transfers between stores'
        ]
      },
      solution: {
        cs: 'Implementovali jsme pokročilý WMS systém s real-time přehledem zásob napříč všemi prodejnami a automatizací přesunů.',
        en: 'We implemented advanced WMS system with real-time inventory overview across all stores and automated transfers.'
      },
      features: {
        cs: [
          'Real-time přehled zásob všech 3 prodejen',
          'Automatické přesuny mezi lokalitami',
          'Čárové kódy pro rychlou inventuru',
          'Mobilní aplikace pro prodavače',
          'Predikce poptávky podle sezóny',
          'Integrace s dodavateli běžeckého vybavení'
        ],
        en: [
          'Real-time inventory overview of all 3 stores',
          'Automated transfers between locations',
          'Barcodes for quick inventory',
          'Mobile app for salespeople',
          'Seasonal demand prediction',
          'Running equipment supplier integration'
        ]
      },
      results: {
        roiDays: 40,
        monthlySavings: 64000,
        yearlyROI: 860,
        benefits: {
          cs: [
            'Žádné výpadky zboží = +30% spokojených zákazníků',
            'Snížení zásob o 35% = 175k Kč uvolněného kapitálu',
            'Inventury za 4 hodiny místo 3 dnů',
            'Automatické přesuny = 20 hodin/měsíc úspory',
            'Predikce sezónních trendů pro běžky'
          ],
          en: [
            'No stock-outs = +30% satisfied customers',
            '35% inventory reduction = 175k CZK freed capital',
            'Inventories in 4 hours instead of 3 days',
            'Automated transfers = 20 hours/month savings',
            'Seasonal trends prediction for running gear'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'WMS systém změnil náš business! Konečně víme co kde máme a zákazníci neodcházejí kvůli chybějícímu zboží. Ušetřili jsme 175 tisíc na zásobách.',
          en: 'WMS system changed our business! Finally we know what we have where and customers don\'t leave due to missing goods. We saved 175 thousand on inventory.'
        },
        author: 'Tomáš Krejčí',
        position: {
          cs: 'Majitel, SportWorld Frýdek s.r.o.',
          en: 'Owner, SportWorld Frýdek s.r.o.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Analýza skladů',
            en: 'Warehouse Analysis'
          },
          duration: '1 týden',
          description: {
            cs: 'Zmapování zásob všech 3 prodejen a skladu',
            en: 'Mapping inventory of all 3 stores and warehouse'
          }
        },
        {
          phase: {
            cs: 'Vývoj WMS systému',
            en: 'WMS Development'
          },
          duration: '4 týdny',
          description: {
            cs: 'React aplikace s real-time přehledem a mobilní app',
            en: 'React application with real-time overview and mobile app'
          }
        },
        {
          phase: {
            cs: 'Označení čárovými kódy',
            en: 'Barcode Labeling'
          },
          duration: '1 týden',
          description: {
            cs: 'Vytištění a označení všech 500+ produktů',
            en: 'Printing and labeling all 500+ products'
          }
        },
        {
          phase: {
            cs: 'Školení a spuštění',
            en: 'Training & Launch'
          },
          duration: '1 týden',
          description: {
            cs: 'Školení prodavačů a ostrý provoz všech prodejen',
            en: 'Training salespeople and live operation in all stores'
          }
        }
      ]
    },
    {
      id: 'micro-services',
      type: 'services',
      title: {
        cs: 'Střední služba - Květinářství a dekorace',
        en: 'Medium Service - Floristry & Decoration'
      },
      location: {
        cs: 'Bohumín, MSK',
        en: 'Bohumín, Czech Republic'
      },
      employees: 12,
      monthlyRevenue: 250000,
      lostOrdersPerMonth: 12,
      averageOrderValue: 8500,
      industry: 'Květiny',
      projectInfo: {
        cs: {
          plan: 'Business aplikace',
          price: '140 000 Kč',
          duration: '4 týdny',
          description: 'Pokročilá business aplikace s CRM systémem, rezervacemi a mobilní aplikací pro kurýry'
        },
        en: {
          plan: 'Business Application',
          price: '140,000 CZK',
          duration: '4 weeks',
          description: 'Advanced business application with CRM system, reservations and mobile app for couriers'
        }
      },
      description: {
        cs: 'Střední květinářská firma poskytující komplexní floristické služby včetně výzdoby událostí, svateb a firemních akcí po celém Moravskoslezském kraji.',
        en: 'Medium floristry company providing comprehensive floristic services including event decoration, weddings and corporate events throughout Moravian-Silesian region.'
      },
      problemQuote: {
        cs: 'Lidé volají hlavně večer nebo o víkendech, když potřebují květiny na zítra. Já jsem v obchodě, nemůžu zvedat a oni si pak objednají online jinde...',
        en: 'People call mainly in the evening or on weekends when they need flowers for tomorrow. I\'m in the store, can\'t answer and they order online elsewhere...'
      },
      problems: {
        cs: [
          'Propásnuté objednávky mimo pracovní dobu',
          'Žádný online katalog s cenami',
          'Komplikované domluvání dodávky',
          'Konkurence má online systém, my ne',
          'Mladí zákazníci preferují online'
        ],
        en: [
          'Missed orders outside working hours',
          'No online catalog with prices',
          'Complicated delivery arrangements',
          'Competition has online system, we don\'t',
          'Young customers prefer online'
        ]
      },
      solution: {
        cs: 'Vyvinuli jsme pokročilou business aplikaci s online katalogem, rezervačním systémem, CRM pro zákazníky a mobilní aplikací pro kurýry.',
        en: 'We developed advanced business application with online catalog, booking system, customer CRM and mobile app for couriers.'
      },
      features: {
        cs: [
          'Online katalog s tisíci produktů',
          'CRM systém pro správu zákazníků',
          'Mobilní aplikace pro kurýry',
          'Rezervační systém pro konzultace',
          'Automatizované marketingové kampaně',
          'Analytics a reporting'
        ],
        en: [
          'Online catalog with thousands of products',
          'CRM system for customer management',
          'Mobile app for couriers',
          'Booking system for consultations',
          'Automated marketing campaigns',
          'Analytics and reporting'
        ]
      },
      results: {
        roiDays: 65,
        monthlySavings: 95000,
        yearlyROI: 714,
        benefits: {
          cs: [
            'Expandovali jsme do 5 měst v kraji',
            'Online objednávky tvoří 70% tržeb',
            'CRM pomáhá udržet stálé zákazníky',
            'Kurýři mají lepší přehled o doručování',
            'Automatické kampaně zvyšují prodeje'
          ],
          en: [
            'Expanded to 5 cities in the region',
            'Online orders make up 70% of revenue',
            'CRM helps retain regular customers',
            'Couriers have better delivery overview',
            'Automated campaigns increase sales'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Business aplikace nám umožnila expandovat do více měst. CRM nám pomáhá udržet kontakt se zákazníky a kurýři díky mobilní aplikaci nikdy nebloudí.',
          en: 'Business application allowed us to expand to more cities. CRM helps us stay in touch with customers and couriers never get lost thanks to mobile app.'
        },
        author: 'Anna Svobodová',
        position: {
          cs: 'Ředitelka, Květiny Svoboda s.r.o.',
          en: 'Director, Flowers Svoboda s.r.o.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Fotografie katalog',
            en: 'Photography Catalog'
          },
          duration: '2 dny',
          description: {
            cs: 'Profesionální focení všech aranžmá',
            en: 'Professional photography of all arrangements'
          }
        },
        {
          phase: {
            cs: 'Web a platby',
            en: 'Website & Payments'
          },
          duration: '1 týden',
          description: {
            cs: 'Jednoduchý web s online platbami',
            en: 'Simple website with online payments'
          }
        },
        {
          phase: {
            cs: 'Spuštění a školení',
            en: 'Launch & Training'
          },
          duration: '1 den',
          description: {
            cs: 'Školení majitelky a testování',
            en: 'Owner training and testing'
          }
        }
      ]
    },
    {
      id: 'large-services',
      type: 'services',
      title: {
        cs: 'Velká servisní firma - Facility Management',
        en: 'Large Service Company - Facility Management'
      },
      location: {
        cs: 'Ostrava, MSK',
        en: 'Ostrava, Czech Republic'
      },
      employees: 45,
      monthlyRevenue: 800000,
      lostOrdersPerMonth: 15,
      averageOrderValue: 35000,
      industry: 'FM',
      projectInfo: {
        cs: {
          plan: 'Komplexní řešení',
          price: '220 000 Kč',
          duration: '27 týdnů',
          description: 'Enterprise FM platforma s IoT senzory, AI optimalizací a automatizovaným reportingem pro klienty'
        },
        en: {
          plan: 'Complex Solution', 
          price: '220,000 CZK',
          duration: '27 weeks',
          description: 'Enterprise FM platform with IoT sensors, AI optimization and automated client reporting'
        }
      },
      description: {
        cs: 'Velká facility management společnost poskytující komplexní služby údržby, úklidu, bezpečnosti a technické správy pro korporátní klienty v celé ČR.',
        en: 'Large facility management company providing comprehensive maintenance, cleaning, security and technical management services for corporate clients throughout Czech Republic.'
      },
      problemQuote: {
        cs: 'Spravujeme desítky budov pro různé klienty, ale koordinace mezi týmy je chaos. Klienti si stěžují na pomalé reakce a my ztrácíme velké kontrakty...',
        en: 'We manage dozens of buildings for various clients, but coordination between teams is chaos. Clients complain about slow responses and we\'re losing big contracts...'
      },
      problems: {
        cs: [
          'Složitá koordinace více týmů napříč kraji',
          'Pomalé reakce na urgentní požadavky',
          'Nejednotné procesy pro různé klienty',
          'Ztracené velké kontrakty kvůli chybám',
          'Vysoké náklady na komunikaci'
        ],
        en: [
          'Complex coordination of multiple teams across region',
          'Slow response to urgent requests',
          'Inconsistent processes for different clients',
          'Lost big contracts due to errors',
          'High communication costs'
        ]
      },
      solution: {
        cs: 'Vyvinuli jsme komplexní FM platformu s IoT senzory, AI optimalizací tras, real-time komunikací a automatizovaným reportingem pro klienty.',
        en: 'We developed comprehensive FM platform with IoT sensors, AI route optimization, real-time communication and automated client reporting.'
      },
      features: {
        cs: [
          'IoT senzory pro monitoring budov',
          'AI optimalizace rozvrhu a tras',
          'Real-time komunikace mezi týmy',
          'Automatizované reporty pro klienty',
          'Prediktivní údržba zařízení',
          'Mobilní aplikace pro všechny profese'
        ],
        en: [
          'IoT sensors for building monitoring',
          'AI optimization of schedules and routes',
          'Real-time team communication',
          'Automated client reports',
          'Predictive equipment maintenance',
          'Mobile apps for all professions'
        ]
      },
      results: {
        roiDays: 95,
        monthlySavings: 280000,
        yearlyROI: 1436,
        benefits: {
          cs: [
            'Koordinace 200+ techniků v reálném čase',
            'O 60% rychlejší reakce na problémy',
            'Prediktivní údržba šetří miliony',
            'Automatické reporty = spokojení klienti',
            'Získali jsme 5 nových velkých kontraktů'
          ],
          en: [
            'Real-time coordination of 200+ technicians',
            '60% faster response to problems',
            'Predictive maintenance saves millions',
            'Automated reports = happy clients',
            'Won 5 new major contracts'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Komplexní řešení změnilo celou naši firmu. Díky AI optimalizaci a IoT senzorům jsme začali předcházet problémům místo jejich řešení. Klienti jsou nadšení.',
          en: 'Comprehensive solution transformed our entire company. Thanks to AI optimization and IoT sensors, we started preventing problems instead of solving them. Clients are thrilled.'
        },
        author: 'Ing. Martin Dvořák',
        position: {
          cs: 'CEO, FacilityPro Group a.s.',
          en: 'CEO, FacilityPro Group a.s.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Strategická analýza',
            en: 'Strategic Analysis'
          },
          duration: '2 týdny',
          description: {
            cs: 'Komplexní analýza procesů všech divizí',
            en: 'Comprehensive analysis of all division processes'
          }
        },
        {
          phase: {
            cs: 'IoT infrastruktura',
            en: 'IoT Infrastructure'
          },
          duration: '4 týdny',
          description: {
            cs: 'Instalace senzorů a komunikační infrastruktury',
            en: 'Sensor installation and communication infrastructure'
          }
        },
        {
          phase: {
            cs: 'Platform development',
            en: 'Platform Development'
          },
          duration: '10 týdnů',
          description: {
            cs: 'Vývoj centrální platformy s AI algoritmy',
            en: 'Central platform development with AI algorithms'
          }
        },
        {
          phase: {
            cs: 'Pilotní testování',
            en: 'Pilot Testing'
          },
          duration: '3 týdny',
          description: {
            cs: 'Beta testování na vybraných objektech',
            en: 'Beta testing on selected facilities'
          }
        },
        {
          phase: {
            cs: 'Celostátní rollout',
            en: 'Nationwide Rollout'
          },
          duration: '8 týdnů',
          description: {
            cs: 'Postupné nasazení ve všech pobočkách',
            en: 'Gradual deployment in all branches'
          }
        }
      ]
    }
  ],
  other: [
    {
      id: 'crm-accounting',
      type: 'other',
      title: {
        cs: 'Účetní kancelář - CRM systém',
        en: 'Accounting Office - CRM System'
      },
      location: {
        cs: 'Opava, MSK',
        en: 'Opava, Czech Republic'
      },
      employees: 8,
      projectType: 'CRM systém',
      hoursWastedWeekly: 12,
      peopleAffected: 5,
      averageHourlyWage: 400,
      industry: 'Účetnictví',
      projectInfo: {
        cs: {
          plan: 'Základní custom řešení',
          price: '45 000 Kč',
          duration: '4 týdny',
          description: 'CRM systém pro správu klientů, zakázek a fakturace s automatizací rutinních úkolů'
        },
        en: {
          plan: 'Basic Custom Solution',
          price: '45,000 CZK',
          duration: '4 weeks',
          description: 'CRM system for client management, orders and invoicing with routine task automation'
        }
      },
      description: {
        cs: 'Střední účetní kancelář poskytující služby pro 150+ klientů z MSK regionu včetně vedení účetnictví, daňových poradců a zpracování mezd.',
        en: 'Medium accounting office providing services for 150+ clients from MSK region including bookkeeping, tax consulting and payroll processing.'
      },
      problemQuote: {
        cs: 'Ztráčíme přehled o klientech a jejich požadavcích. V Excelu máme chaos, termíny se nám míjejí a klienti volají kde mají faktury...',
        en: 'We lose track of clients and their requirements. Excel is chaos, deadlines are missed and clients call asking where their invoices are...'
      },
      problems: {
        cs: [
          'Žádný centrální přehled o klientech',
          'Manuální evidence zakázek v Excelu',
          'Propásnuté termíny daňových přiznání',
          'Chaos v komunikaci s klienty',
          'Zdlouhavé hledání dokumentů'
        ],
        en: [
          'No central client overview',
          'Manual order tracking in Excel',
          'Missed tax return deadlines',
          'Chaotic client communication',
          'Time-consuming document search'
        ]
      },
      solution: {
        cs: 'Vyvinuli jsme CRM systém s automatickou správou klientů, termínů, komunikace a generováním dokumentů přímo z databáze.',
        en: 'We developed CRM system with automatic client management, deadlines, communication and document generation directly from database.'
      },
      features: {
        cs: [
          'Centrální databáze všech klientů',
          'Automatické připomínky termínů',
          'Generování faktur a dokumentů',
          'Evidence komunikace s klienty',
          'Kalendář s deadline notifikacemi',
          'Mobilní aplikace pro účetní'
        ],
        en: [
          'Central database of all clients',
          'Automatic deadline reminders',
          'Invoice and document generation',
          'Client communication tracking',
          'Calendar with deadline notifications',
          'Mobile app for accountants'
        ]
      },
      results: {
        roiDays: 30,
        monthlySavings: 48000,
        yearlyROI: 1280,
        benefits: {
          cs: [
            'Žádné propásnuté termíny = spokojení klienti',
            'Automatické faktury ušetří 12h týdně',
            'Rychlé vyhledání dokumentů za 10 sekund',
            'Přehled o všech klientech na jeden pohled',
            'Možnost růstu bez dalších zaměstnanců'
          ],
          en: [
            'No missed deadlines = happy clients',
            'Automatic invoices save 12h weekly',
            'Quick document search in 10 seconds',
            'All clients overview at a glance',
            'Growth possibility without additional staff'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'CRM nám změnil život! Konečně máme pořádek v klientech a už nevoláme v panice den před termínem. Vše máme pod kontrolou.',
          en: 'CRM changed our life! Finally we have order in clients and don\'t call in panic day before deadline. Everything is under control.'
        },
        author: 'Ing. Jana Krásná',
        position: {
          cs: 'Majitelka, Účetní Opava s.r.o.',
          en: 'Owner, Accounting Opava s.r.o.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Analýza procesů',
            en: 'Process Analysis'
          },
          duration: '1 týden',
          description: {
            cs: 'Zmapování klientů a workflow účetní kanceláře',
            en: 'Mapping clients and accounting office workflow'
          }
        },
        {
          phase: {
            cs: 'Vývoj CRM',
            en: 'CRM Development'
          },
          duration: '2.5 týdne',
          description: {
            cs: 'React aplikace s databází klientů a automatizací',
            en: 'React application with client database and automation'
          }
        },
        {
          phase: {
            cs: 'Import dat',
            en: 'Data Import'
          },
          duration: '2 dny',
          description: {
            cs: 'Přenos stávajících klientů z Excelu',
            en: 'Transfer existing clients from Excel'
          }
        },
        {
          phase: {
            cs: 'Školení a spuštění',
            en: 'Training & Launch'
          },
          duration: '1 den',
          description: {
            cs: 'Školení účetních a ostrý provoz',
            en: 'Accountant training and live operation'
          }
        }
      ]
    },
    {
      id: 'hr-manufacturing',
      type: 'other',
      title: {
        cs: 'Výrobní firma - HR systém',
        en: 'Manufacturing Company - HR System'
      },
      location: {
        cs: 'Karviná, MSK',
        en: 'Karviná, Czech Republic'
      },
      employees: 45,
      projectType: 'HR řešení',
      hoursWastedWeekly: 8,
      peopleAffected: 3,
      averageHourlyWage: 350,
      industry: 'Výroba',
      projectInfo: {
        cs: {
          plan: 'Standardní custom řešení',
          price: '80 000 Kč',
          duration: '5 týdnů',
          description: 'HR systém pro správu zaměstnanců, docházky, dovolených a hodnocení s automatizací'
        },
        en: {
          plan: 'Standard Custom Solution',
          price: '80,000 CZK',
          duration: '5 weeks',
          description: 'HR system for employee management, attendance, vacation and evaluation with automation'
        }
      },
      description: {
        cs: 'Střední výrobní firma vyrábějící komponenty pro automobilový průmysl s 45 zaměstnanci ve třech směnách.',
        en: 'Medium manufacturing company producing automotive components with 45 employees in three shifts.'
      },
      problemQuote: {
        cs: 'Personalistka tráví celé dny vyplňováním tabulek a počítáním dovolených. Zaměstnanci se ptají kdy můžou na dovolenou a my nevíme...',
        en: 'HR spends whole days filling tables and calculating vacation days. Employees ask when they can take vacation and we don\'t know...'
      },
      problems: {
        cs: [
          'Ruční evidence docházky a dovolených',
          'Chaos ve směnném provozu',
          'Složité počítání přesčasů',
          'Papírové žádosti o dovolenou',
          'Žádný přehled o kapacitách směn'
        ],
        en: [
          'Manual attendance and vacation tracking',
          'Chaos in shift operations',
          'Complex overtime calculations',
          'Paper vacation requests',
          'No shift capacity overview'
        ]
      },
      solution: {
        cs: 'Implementovali jsme HR systém s automatickou evidencí docházky, správou směn a samoobslužným portálem pro zaměstnance.',
        en: 'We implemented HR system with automatic attendance tracking, shift management and self-service portal for employees.'
      },
      features: {
        cs: [
          'Automatická evidence docházky (karty)',
          'Správa směn a kapacit',
          'Samoobslužný portál zaměstnanců',
          'Automatické počítání mezd',
          'Schvalování dovolených online',
          'Reporty pro vedení'
        ],
        en: [
          'Automatic attendance tracking (cards)',
          'Shift and capacity management',
          'Employee self-service portal',
          'Automatic payroll calculation',
          'Online vacation approval',
          'Management reports'
        ]
      },
      results: {
        roiDays: 45,
        monthlySavings: 24000,
        yearlyROI: 360,
        benefits: {
          cs: [
            'Personalistka ušetří 8 hodin týdně',
            'Zaměstnanci si sami plánují dovolenou',
            'Automatické mzdy bez chyb',
            'Přehled o kapacitách směn',
            'Digitalizace všech HR procesů'
          ],
          en: [
            'HR saves 8 hours weekly',
            'Employees plan vacation themselves',
            'Automatic error-free payroll',
            'Shift capacity overview',
            'Digitalization of all HR processes'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'HR systém nám ušetřil spoustu času a nervů. Zaměstnanci si sami žádají o dovolenou a já mám čas na důležitější věci.',
          en: 'HR system saved us a lot of time and nerves. Employees request vacation themselves and I have time for more important things.'
        },
        author: 'Bc. Petra Nová',
        position: {
          cs: 'Personalistka, AutoParts Karviná s.r.o.',
          en: 'HR Manager, AutoParts Karviná s.r.o.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'HR audit',
            en: 'HR Audit'
          },
          duration: '1 týden',
          description: {
            cs: 'Analýza současných HR procesů a směn',
            en: 'Analysis of current HR processes and shifts'
          }
        },
        {
          phase: {
            cs: 'Vývoj HR systému',
            en: 'HR System Development'
          },
          duration: '3 týdny',
          description: {
            cs: 'React aplikace s docházkou a samoobsluhou',
            en: 'React application with attendance and self-service'
          }
        },
        {
          phase: {
            cs: 'Integrace karet',
            en: 'Card Integration'
          },
          duration: '3 dny',
          description: {
            cs: 'Napojení čteček karet na systém',
            en: 'Connecting card readers to system'
          }
        },
        {
          phase: {
            cs: 'Rollout',
            en: 'Rollout'
          },
          duration: '4 dny',
          description: {
            cs: 'Postupné nasazení a školení zaměstnanců',
            en: 'Gradual deployment and employee training'
          }
        }
      ]
    },
    {
      id: 'invoicing-services',
      type: 'other', 
      title: {
        cs: 'Služby MSK - Fakturační systém',
        en: 'MSK Services - Invoicing System'
      },
      location: {
        cs: 'Havířov, MSK',
        en: 'Havířov, Czech Republic'
      },
      employees: 6,
      projectType: 'Fakturace a účetnictví',
      hoursWastedWeekly: 15,
      peopleAffected: 2,
      averageHourlyWage: 300,
      industry: 'Služby',
      projectInfo: {
        cs: {
          plan: 'Pokročilý custom řešení',
          price: '140 000 Kč',
          duration: '6 týdnů',
          description: 'Kompletní fakturační a účetní systém s automatizací, DPH a napojením na banku'
        },
        en: {
          plan: 'Advanced Custom Solution',
          price: '140,000 CZK',
          duration: '6 weeks',
          description: 'Complete invoicing and accounting system with automation, VAT and bank integration'
        }
      },
      description: {
        cs: 'Malá firma poskytující komplexní služby údržby, úklidu a facility managementu pro kanceláře a obchodní centra v MSK.',
        en: 'Small company providing comprehensive maintenance, cleaning and facility management services for offices and shopping centers in MSK.'
      },
      problemQuote: {
        cs: 'Fakturace nás zabíjí! Musíme vystavit 200+ faktur měsíčně ručně v Excelu. Často se spleteme a klienti reklamují částky...',
        en: 'Invoicing is killing us! We have to issue 200+ invoices monthly by hand in Excel. We often make mistakes and clients complain about amounts...'
      },
      problems: {
        cs: [
          'Ruční vystavování 200+ faktur měsíčně',
          'Časté chyby v částkách a DPH',
          'Složité sledování plateb',
          'Chaos v účetních dokladech',
          'Zdlouhavé měsíční uzávěrky'
        ],
        en: [
          'Manual issuing of 200+ invoices monthly',
          'Frequent errors in amounts and VAT',
          'Complex payment tracking',
          'Chaos in accounting documents',
          'Lengthy monthly closings'
        ]
      },
      solution: {
        cs: 'Vytvořili jsme automatizovaný fakturační systém s šablonami, DPH výpočty, bankovním propojením a elektronickou archivací.',
        en: 'We created automated invoicing system with templates, VAT calculations, bank integration and electronic archiving.'
      },
      features: {
        cs: [
          'Automatické fakturace ze smluv',
          'Šablony pro různé typy služeb',
          'Propojení s bankovním účtem',
          'Automatické DPH výpočty',
          'Sledování plateb a upomínky',
          'Elektronická archivace dokumentů'
        ],
        en: [
          'Automatic invoicing from contracts',
          'Templates for different service types',
          'Bank account integration',
          'Automatic VAT calculations',
          'Payment tracking and reminders',
          'Electronic document archiving'
        ]
      },
      results: {
        roiDays: 35,
        monthlySavings: 36000,
        yearlyROI: 309,
        benefits: {
          cs: [
            'Fakturace za 2 hodiny místo 2 dnů',
            'Nulové chyby v DPH výpočtech',
            'Automatické párování plateb',
            'Digitální archiv všech dokladů',
            'Měsíční uzávěrka za 1 den'
          ],
          en: [
            'Invoicing in 2 hours instead of 2 days',
            'Zero errors in VAT calculations',
            'Automatic payment matching',
            'Digital archive of all documents',
            'Monthly closing in 1 day'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Fakturační systém nám změnil život! Z týdne práce na fakturách máme pár hodin. Konečně máme čas na rozvoj firmy.',
          en: 'Invoicing system changed our life! From week of work on invoices we have few hours. Finally we have time for company development.'
        },
        author: 'Pavel Svoboda',
        position: {
          cs: 'Majitel, CleanService Havířov s.r.o.',
          en: 'Owner, CleanService Havířov s.r.o.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Analýza fakturace',
            en: 'Invoicing Analysis'
          },
          duration: '1 týden',
          description: {
            cs: 'Zmapování všech typů služeb a cen',
            en: 'Mapping all service types and prices'
          }
        },
        {
          phase: {
            cs: 'Vývoj systému',
            en: 'System Development'
          },
          duration: '4 týdny',
          description: {
            cs: 'React aplikace s účetními funkcemi',
            en: 'React application with accounting functions'
          }
        },
        {
          phase: {
            cs: 'Bankovní integrace',
            en: 'Bank Integration'
          },
          duration: '3 dny',
          description: {
            cs: 'Napojení na API banky pro platby',
            en: 'Connecting to bank API for payments'
          }
        },
        {
          phase: {
            cs: 'Spuštění',
            en: 'Launch'
          },
          duration: '4 dny',
          description: {
            cs: 'Migrace dat a školení uživatelů',
            en: 'Data migration and user training'
          }
        }
      ]
    },
    {
      id: 'automation-it',
      type: 'other',
      title: {
        cs: 'IT firma - Automatizace procesů',
        en: 'IT Company - Process Automation'
      },
      location: {
        cs: 'Ostrava, MSK',
        en: 'Ostrava, Czech Republic'
      },
      employees: 15,
      projectType: 'Automatizace procesů',
      hoursWastedWeekly: 10,
      peopleAffected: 8,
      averageHourlyWage: 450,
      industry: 'IT',
      projectInfo: {
        cs: {
          plan: 'Komplexní automatizační řešení',
          price: '250 000 Kč',
          duration: '8 týdnů',
          description: 'Automatizace interních procesů s AI, workflow enginem a integracemi třetích stran'
        },
        en: {
          plan: 'Complex Automation Solution',
          price: '250,000 CZK',
          duration: '8 weeks',
          description: 'Internal process automation with AI, workflow engine and third-party integrations'
        }
      },
      description: {
        cs: 'Rostoucí IT firma specializující se na vývoj mobilních aplikací pro klienty s týmem 15 vývojářů a projektových manažerů.',
        en: 'Growing IT company specializing in mobile app development for clients with team of 15 developers and project managers.'
      },
      problemQuote: {
        cs: 'Trávíme půl dne reporting, time tracking a administrativou místo programování. Chceme automatizovat všechno co jde...',
        en: 'We spend half day on reporting, time tracking and administration instead of programming. We want to automate everything possible...'
      },
      problems: {
        cs: [
          'Ruční time tracking a reporty',
          'Zdlouhavé projektové administraci',
          'Neefektivní komunikace s klienty',
          'Manuální fakturace z odpracovaných hodin',
          'Chaos v úkolech a deadline'
        ],
        en: [
          'Manual time tracking and reports',
          'Lengthy project administration',
          'Inefficient client communication',
          'Manual invoicing from worked hours',
          'Chaos in tasks and deadlines'
        ]
      },
      solution: {
        cs: 'Implementovali jsme komplexní automatizační platformu s AI asistenty, workflow automation a integrací všech firemních nástrojů.',
        en: 'We implemented comprehensive automation platform with AI assistants, workflow automation and integration of all company tools.'
      },
      features: {
        cs: [
          'AI asistent pro automatické reporty',
          'Workflow engine pro schvalovací procesy',
          'Automatické time tracking z VS Code',
          'Integrace Slack, Jira, GitLab',
          'Generování faktur z projektů',
          'Prediktivní analýzy kapacit'
        ],
        en: [
          'AI assistant for automatic reports',
          'Workflow engine for approval processes',
          'Automatic time tracking from VS Code',
          'Slack, Jira, GitLab integration',
          'Invoice generation from projects',
          'Predictive capacity analytics'
        ]
      },
      results: {
        roiDays: 25,
        monthlySavings: 144000,
        yearlyROI: 691,
        benefits: {
          cs: [
            'Automatizace ušetří 10h týdně každému',
            'AI generuje reporty za 5 minut',
            'Nulové chyby v time trackingu',
            'Predikce vytížení týmu na měsíc dopředu',
            'Vývojáři se soustředí jen na kód'
          ],
          en: [
            'Automation saves 10h weekly per person',
            'AI generates reports in 5 minutes',
            'Zero errors in time tracking',
            'Team workload prediction month ahead',
            'Developers focus only on code'
          ]
        }
      },
      testimonial: {
        quote: {
          cs: 'Automatizace nám dala svobodu! Místo administrativy programujeme. AI asistent dělá reporty za nás a my máme čas na inovace.',
          en: 'Automation gave us freedom! Instead of administration we program. AI assistant does reports for us and we have time for innovation.'
        },
        author: 'Ing. Martin Krejčí',
        position: {
          cs: 'CTO, DevStudio Ostrava s.r.o.',
          en: 'CTO, DevStudio Ostrava s.r.o.'
        }
      },
      timeline: [
        {
          phase: {
            cs: 'Process mining',
            en: 'Process Mining'
          },
          duration: '1 týden',
          description: {
            cs: 'Analýza všech interních procesů a workflow',
            en: 'Analysis of all internal processes and workflows'
          }
        },
        {
          phase: {
            cs: 'AI development',
            en: 'AI Development'
          },
          duration: '3 týdny',
          description: {
            cs: 'Vývoj AI asistentů a automatizačních skriptů',
            en: 'Development of AI assistants and automation scripts'
          }
        },
        {
          phase: {
            cs: 'Integrace nástrojů',
            en: 'Tool Integration'
          },
          duration: '2 týdny',
          description: {
            cs: 'Napojení Slack, Jira, GitLab, VS Code',
            en: 'Connecting Slack, Jira, GitLab, VS Code'
          }
        },
        {
          phase: {
            cs: 'Beta testing',
            en: 'Beta Testing'
          },
          duration: '1 týden',
          description: {
            cs: 'Testování na reálných projektech',
            en: 'Testing on real projects'
          }
        },
        {
          phase: {
            cs: 'Full rollout',
            en: 'Full Rollout'
          },
          duration: '1 týden',
          description: {
            cs: 'Nasazení pro celý tým a školení',
            en: 'Deployment for entire team and training'
          }
        }
      ]
    }
  ]
};