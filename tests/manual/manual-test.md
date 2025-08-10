# Manuální test webu - checklist

## 🌐 **Server běží na:** http://localhost:5175

## ✅ **Základní funkce k otestování:**

### 1. **Navigation & Scrolling**
- [ ] Logo a menu se zobrazuje správně
- [ ] Smooth scroll mezi sekcemi funguje
- [ ] Aktivní sekce se zvýrazňuje v menu
- [ ] Mobilní menu se otevírá/zavírá
- [ ] Přepínač jazyků (CZ/EN) funguje v pravém rohu

### 2. **Hero sekce**
- [ ] 3D koule se načítá a rotuje
- [ ] Text a tlačítka jsou responzivní
- [ ] CTA tlačítka fungují (scroll na sekce)

### 3. **ROI Kalkulátor - KLÍČOVÁ FUNKCE**
- [ ] **Přepínání typů:** Výroba ↔ Služby
- [ ] **Dynamická pole:**
  - Skladový systém (85k): "Hodiny papírování denně", "Chyby ve skladu měsíčně"
  - WMS aplikace (150k): "Skladové operace denně", "Chyby při kompletaci měsíčně"
  - E-shop (80k): "Opuštěné košíky měsíčně", "Průměrná hodnota košíku"
- [ ] **Výpočet ROI:** Zadání hodnot → Vypočítat → Zobrazí výsledky
- [ ] **Reálné příklady:** Tlačítko "Zobrazit reálné příklady" → Presets
- [ ] **Case studies:** Oko ikona → Modal s detaily
- [ ] **Validace:** Prázdná pole × chybové hlášky
- [ ] **Reset:** Vymazat → Pole se vymažou

### 4. **Ostatní sekce**
- [ ] About - informace se zobrazují
- [ ] Projects - portfolio projektů
- [ ] Case Studies - reálné příklady
- [ ] Skills - technologie
- [ ] Contact - kontaktní formulář

### 5. **Responsivita & Tema**
- [ ] Desktop (1920px+)
- [ ] Tablet (768px-1024px)
- [ ] Mobile (320px-768px)
- [ ] Automatické přepínání den/noc tématu (20:00-6:00)

### 6. **Konzole - ŽÁDNÉ CHYBY**
- [ ] Žádné červené chyby v konzoli
- [ ] Žádné 404 chyby pro soubory
- [ ] Žádné React warnings

---

## 🧪 **Test ROI kalkulátoru - data:**

### Production test:
- Typ: Výroba → Skladový systém (85 000 Kč)
- Zaměstnanci: 10
- Mzda: 40000
- Papírování: 6
- Chyby: 10
- **Očekávané ROI: ~33 dní**

### Services test:
- Typ: Služby → Rezervační systém (45 000 Kč)
- Tržby: 150000
- Ztracené rezervace: 20
- Hodnota rezervace: 3000
- **Očekávané ROI: ~24 dní**