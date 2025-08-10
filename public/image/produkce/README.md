# VMQ Výrobní Aplikace

Moderní React aplikace pro řízení výroby a správu materiálů v oblasti extruze VMQ (silikonových) materiálů.

## 🎯 Popis Aplikace

VMQ Výrobní Aplikace je kompletní systém pro:
- Řízení výrobních procesů extruze
- Správu skladových zásob materiálů
- Sledování vývojových projektů
- Analýzu odpadů a efektivity
- Real-time dashboardy a reporting

## 🚀 Aktuální Stav - Co je Hotové

### ✅ Dashboard (100% CZ)
- **Lokalizace:** Kompletně v češtině
- **KPI Karty:** Efektivita, odpady, výroba, sklad s animacemi
- **Grafy:** Výrobní trendy, měsíční analýzy, materiály (Recharts)
- **Real-time:** Živé údaje s moderními animacemi
- **Design:** Enterprise dark theme s glass morphism efekty

### ✅ Výroba (Production) - Kompletní
- **Import z Excel:** VMQ_Ztráty_Extruze_2025.xls (list Extruze)
- **Kompletní data:** Všech 45 sloupců z Excel souboru (100% coverage)
- **Rychlosti:** m/min i m/h hodnoty přesně dle Excel struktury
- **Detail View:** Krásně barevně odladěné sekce
- **Formuláře:** Kompletní editace všech polí
- **Export:** Do Excel s českými hlavičkami
- **Personál:** Správné pořadí Předák/Operátor dle Excel

### ✅ Vývoj (Development) - Kompletní
- **Import z Excel:** VMQ_Ztráty_Extruze_2025.xls (list Vývoje)
- **Rychlosti:** Všechny rychlostní pole m/min i m/h
- **Detail View:** Specializované pro vývojové projekty
- **Formuláře:** Vývojové parametry, hubice, rozměry

### ✅ Sklad (Inventory) - S Historií
- **Import z Excel:** VMQ_Sklad_materiálu_2025.xls
- **Záložky:** 
  - Aktivní skladové zásoby
  - **Historie směsí** (nová funkce)
- **Archivace:** Místo mazání se směsi archivují s důvodem
- **Expirační kontrola:** Automatické sledování datum expirace
- **Modal archivace:** S povinným vyplněním důvodu

### ✅ Odpady (Waste)
- **Kategorie:** Vulkanizované/Nevulkanizované extruze a konfekce
- **Měsíční přehledy:** Analýzy podle období

## Instalace a spuštění

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev

# Build pro produkci
npm run build
```

## Použití

1. **Načtení ukázkových dat**: Klikněte na "Ukázková data" v levém menu
2. **Import Excel**: Použijte tlačítko "Import Excel" pro načtení vašich dat
3. **Navigace**: Používejte menu pro přepínání mezi sekcemi
4. **Export**: Exportujte data pomocí tlačítka "Export Excel"

## Struktura dat

### Materiály
- Název materiálu
- Dodavatel
- Stav (Výroba, Testovací, Vývoj)

### Výrobní záznamy
- Datum a čas výroby
- Materiál a LOT číslo
- Operátor a supervizor
- Množství a efektivita
- Odpady (vulkanizované/nevulkanizované)

### Skladové záznamy
- Typ směsi (Extrůzní/Lisovací)
- Datum výroby a expirace
- Množství a odpisy
- Důvody odpisů

### Odpady
- Typ odpadu
- Datum vyvezení
- Váha
- Odpovědná osoba

## Technologie

- **React 18** s TypeScript
- **Vite** jako build tool
- **TailwindCSS** pro styling
- **Zustand** pro state management
- **XLSX** pro Excel import/export
- **Recharts** pro moderní vizualizace s animacemi
- **Lucide React** pro ikony
- **Date-fns** pro práci s datumy

## Automatizované funkce

- ✅ Automatický import z Excel souborů
- ✅ Kalkulace efektivity výroby
- ✅ Upozornění na expiraci materiálů
- ✅ Statistiky a analýzy
- ✅ Responsive design
- ✅ Perzistentní úložiště dat
- ✅ Real-time filtry a vyhledávání
- 🎨 **Pokročilé vizualizace s Recharts a animacemi**
- 📊 **Interaktivní grafy a KPI dashboardy**
- 🎯 **Animované metriky a trendy**
- 📈 **Real-time monitoring výroby**

## 📁 Struktura Projektu

```
src/
├── components/           # React komponenty
│   ├── charts/          # Komponenty grafů a KPI karet
│   │   ├── ModernCharts.tsx      # Moderní grafy (Recharts)
│   │   └── ModernKPICards.tsx    # KPI karty s animacemi
│   ├── Dashboard.tsx           # Hlavní dashboard (CZ)
│   ├── Production.tsx          # Správa výroby
│   ├── Development.tsx         # Správa vývoje
│   ├── Inventory.tsx           # Správa skladu (s historií)
│   ├── Waste.tsx              # Správa odpadů
│   ├── ProductionDetailView.tsx # Detail výrobního záznamu
│   ├── DevelopmentDetailView.tsx # Detail vývojového záznamu
│   ├── ProductionForm.tsx      # Formulář pro výrobu
│   ├── DevelopmentForm.tsx     # Formulář pro vývoj
│   └── RealDataLoader.tsx      # Import dat z Excelu
├── data/
│   └── sampleData.ts           # Ukázková data + archivované
├── stores/
│   └── simpleStore.ts          # Zustand store (archivace funkcionalita)
├── types/
│   └── index.ts               # TypeScript definice (archivace pole)
├── utils/
│   ├── realDataImport.ts      # Import z Excel souborů
│   └── excelUtils.ts          # Export do Excel
└── App.tsx                    # Hlavní komponenta
```

## 📊 Datová Struktura

### ProductionRecord (45 polí)
- **Základní info:** článek, rozměry, datum, zákazník
- **Materiál:** název směsi, dodavatel, LOT číslo
- **Personál:** předák, operátor (správné pořadí dle Excel)
- **Rychlosti:** Real/Calc v m/min i m/h (dle Excel sloupců 13-16)
- **Váhy:** produkty, odpady, celkové hmotnosti
- **Časy:** start/end, reálný/kalkulovaný čas
- **Výkonnost:** hodnocení kg/času

### DevelopmentRecord
- **Vývojové info:** hubice, rozměry
- **Materiál a personál:** stejná struktura jako výroba
- **Rychlosti:** Real/Calc m/min + m/h
- **Váhy:** vývoj specifické parametry
- **Časy:** celkový čas a hmotnost vývoje

### InventoryRecord (s archivací)
- **Skladová data:** typ směsi, množství
- **Expirační kontrola:** automatické upozornění
- **Archivace:** isArchived, archivedBy, archiveReason, archivedDate

## 🔧 Import/Export Funkcionalita

### Import z Excel (Ověřeno)
- **VMQ_Ztráty_Extruze_2025.xls:**
  - List "Extruze" → ProductionRecord (45 sloupců)
  - List "Vývoje" → DevelopmentRecord
- **VMQ_Sklad_materiálu_2025.xls:**
  - List "VMQ sklad směsí" → InventoryRecord

### Export do Excel
- **České hlavičky:** Všechny sloupce v češtině
- **Kompletní data:** Export všech polí včetně rychlostí
- **Archivované položky:** Oddělený export historie

## 🎨 Design System

### Barevné Schéma
- **Production:** Modré/indigo/cyan odstíny (barevně odladěno)
- **Development:** Fialové/purple/indigo odstíny
- **Inventory:** Zelené/orange (archivace)
- **Dashboard:** Gradient dark theme s glass morphism

### Technické Funkce
- **Archivace směsí:** Místo mazání
- **Rychlostní data:** Přesně dle Excel struktury
- **Barevné sekce:** V detail views
- **České lokalizace:** Dashboard kompletně

## 🚀 Spuštění Aplikace

```bash
# Instalace závislostí
npm install

# Spuštění dev serveru
npm run dev

# Build pro produkci
npm run build
```

---

**Verze:** 1.0.0  
**Stav:** Produkční - plně funkční  
**Datum:** Červenec 2025
