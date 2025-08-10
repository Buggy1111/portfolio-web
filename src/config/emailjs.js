// EmailJS konfigurace
// Pro aktivaci emailů:
// 1. Jděte na https://www.emailjs.com/ a vytvořte si účet
// 2. Vytvořte emailovou službu (např. Gmail)
// 3. Vytvořte emailovou šablonu
// 4. Zkopírujte své ID a nahraďte níže

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', 
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'
};

// Příklad šablony pro EmailJS:
// Subject: Nová zpráva z portfolia od {{from_name}}
// 
// Jméno: {{from_name}}
// Email: {{from_email}}
// 
// Zpráva:
// {{message}}