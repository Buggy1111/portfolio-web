# 💰 Financial Tracker

Moderní aplikace pro sledování osobních financí s Firebase backendem, real-time synchronizací a pokročilými vizuálními efekty.

## 🚀 Rychlý start

```bash
# Instalace závislostí
npm install

# Vytvoření .env souboru (viz Firebase Setup níže)
# Spuštění aplikace
npm start

# Aplikace běží na
http://localhost:3000
```

## ✨ Hlavní funkce

### 🔥 Firebase Backend
- **Authentication** - Email/Password a Google přihlášení
- **Firestore Database** - Real-time synchronizace dat
- **Security Rules** - Každý uživatel vidí pouze svá data
- **Offline Support** - Data se ukládají i offline

### 🎯 Premium Dashboard s WOW efekty
- **3D karty s magnetickým hover efektem** - sledují pozici kurzoru
- **Animované pozadí** - 6 plovoucích gradientových koulí
- **Dark/Light mode** - přepínač tématu s plynulým přechodem
- **Zvukové efekty** - Web Audio API pro interakce
- **Achievement systém** - odměny za úspěchy
- **Konfety a částicové efekty** - oslavy při synchronizaci

### 💓 Exkluzivní Denní Rozpočet
- **Pulzující srdce** - zdravotní monitor rozpočtu
  - 💚 Zelené = výborný stav (>10k Kč)
  - 💛 Žluté = dobrý stav (>5k Kč) 
  - 🧡 Oranžové = pozor (>0 Kč)
  - 💔 Zlomené = rozpočet překročen
- **EKG monitor** - vizuální indikátor vitality
- **Money rain** - padající peníze při vysokém rozpočtu
- **Glitch efekt** - varování při záporných hodnotách

### 📊 Pokročilé funkce
- Měsíční přehled příjmů a výdajů
- Analýza výdajů podle kategorií
- Export dat do CSV/PDF
- Historie všech transakcí s filtrováním

## 🔧 Firebase Setup

### 1. Vytvoření Firebase projektu
1. Jdi na [Firebase Console](https://console.firebase.google.com)
2. Vytvoř nový projekt
3. Povol Authentication (Email/Password + Google)
4. Vytvoř Firestore Database

### 2. Konfigurace
Vytvoř `.env` soubor v root složce:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 3. Security Rules
Nastav Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /transactions/{transactionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 📁 Struktura projektu

```
financial-tracker/
├── public/
│   └── index.html          # HTML šablona
├── src/
│   ├── components/         # React komponenty
│   │   ├── auth/           # Autentizační komponenty
│   │   │   ├── LoginForm.jsx      # Přihlašovací formulář
│   │   │   ├── RegisterForm.jsx   # Registrační formulář
│   │   │   └── ProtectedRoute.jsx # Ochrana routes
│   │   ├── common/         # Obecné UI komponenty
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── dashboard/      # Dashboard komponenty
│   │   │   ├── DailyBudget.jsx
│   │   │   ├── MonthOverview.jsx
│   │   │   ├── QuickStats.jsx
│   │   │   └── ExpenseChart.jsx
│   │   ├── effects/        # Vizuální efekty
│   │   │   ├── ParticleEffect.jsx
│   │   │   ├── Confetti.jsx
│   │   │   └── AnimatedBackground.jsx
│   │   ├── transactions/   # Transakční komponenty
│   │   │   ├── CategoryButton.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── TransactionItem.jsx
│   │   └── layout/         # Layout komponenty
│   │       ├── Navigation.jsx
│   │       └── Header.jsx
│   ├── contexts/           # React Contexts
│   │   ├── AuthContext.jsx # Autentizační kontext
│   │   └── AppContext.jsx  # Hlavní aplikační kontext
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js      # Autentizační hook
│   │   ├── useFirestore.js # Firestore operace
│   │   ├── useTransactions.js # Transakční logika
│   │   └── useSettings.js  # Uživatelská nastavení
│   ├── pages/              # Stránky aplikace
│   │   ├── Login.jsx       # Přihlašovací stránka
│   │   ├── Dashboard.jsx   # Hlavní dashboard
│   │   ├── AddPage.jsx     # Přidání transakce
│   │   ├── History.jsx     # Historie transakcí
│   │   └── Settings.jsx    # Nastavení aplikace
│   ├── services/           # Služby a API
│   │   ├── firebase.js     # Firebase konfigurace
│   │   ├── auth.js         # Autentizační služby
│   │   └── firestore.js    # Databázové operace
│   ├── utils/              # Pomocné funkce
│   │   ├── constants.js    # Konstanty aplikace
│   │   ├── formatters.js   # Formátování dat
│   │   ├── dateHelpers.js  # Práce s datumy
│   │   └── validators.js   # Validační funkce
│   ├── App.jsx            # Hlavní komponenta
│   ├── index.js           # Vstupní bod
│   └── index.css          # Globální styly
├── .env                   # Firebase konfigurace (NEZAPOMEŇ na .gitignore!)
├── .env.example           # Příklad .env souboru
├── .gitignore            # Ignorované soubory
├── package.json          # Projekt konfigurace
├── tailwind.config.js    # Tailwind konfigurace
├── postcss.config.js     # PostCSS konfigurace
└── README.md             # Tento soubor
```

## 💾 Datová struktura (Firestore)

```javascript
// users/{userId}
{
  email: "user@example.com",
  displayName: "John Doe",
  settings: {
    monthlyIncome: 50000,
    payday: 25,
    currency: "CZK",
    darkMode: true,
    soundEffects: true
  },
  createdAt: timestamp,
  updatedAt: timestamp
}

// users/{userId}/transactions/{transactionId}
{
  amount: 1500,
  type: "expense", // "income" | "expense"
  category: "food",
  description: "Nákup v Albertu",
  date: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🎨 Kategorie výdajů

- 🏠 **Bydlení** - nájem, energie, opravy
- 🛒 **Jídlo a nákupy** - potraviny, drogerie
- 🚗 **Doprava** - benzín, MHD, servis
- 👶 **Děti** - školka, kroužky, oblečení
- 💊 **Zdraví** - léky, lékař, pojištění
- 🎮 **Zábava** - kino, sport, hry
- 📦 **Ostatní** - různé výdaje

## 🛠️ Technologie

- **React 18** - UI framework
- **Firebase** - Backend as a Service
  - Authentication - přihlašování
  - Firestore - NoSQL databáze
  - Hosting - deployment
- **Tailwind CSS** - styling framework
- **React Router** - navigace
- **Lucide React** - ikony
- **Web Audio API** - zvukové efekty
- **Framer Motion** - animace (volitelné)

## 🚀 Deployment

### Firebase Hosting
```bash
# Instalace Firebase CLI
npm install -g firebase-tools

# Přihlášení
firebase login

# Inicializace
firebase init hosting

# Build aplikace
npm run build

# Deploy
firebase deploy
```

### Vercel / Netlify
1. Push kód na GitHub
2. Připoj repozitář k Vercel/Netlify
3. Nastav environment variables
4. Deploy!

## 🔐 Bezpečnost

- Všechna data jsou přístupná pouze přihlášeným uživatelům
- Každý uživatel vidí pouze svá data
- API klíče jsou uloženy v environment variables
- Firestore security rules chrání data
- HTTPS je vynuceno na produkci

## 📱 Budoucí vylepšení

- [ ] PWA - instalace jako mobilní aplikace
- [ ] Push notifikace
- [ ] Export dat (CSV, PDF)
- [ ] Rozpočtové cíle a limity
- [ ] Sdílení rozpočtu s rodinou
- [ ] Napojení na bankovní API
- [ ] Prediktivní analýza
- [ ] Vícejazyčnost

## 🤝 Přispívání

1. Fork repozitář
2. Vytvoř feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit změny (`git commit -m 'Add some AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Otevři Pull Request

## 📄 Licence

Tento projekt je licencován pod MIT licencí.

---

Vytvořeno s ❤️ pomocí React a Firebase