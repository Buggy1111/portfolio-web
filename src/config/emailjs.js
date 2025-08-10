// EmailJS konfigurace
// Pro aktivaci emailů:
// 1. Jděte na https://www.emailjs.com/ a vytvořte si účet
// 2. Vytvořte emailovou službu (např. Gmail)
// 3. Vytvořte emailovou šablonu
// 4. Zkopírujte své ID a nahraďte níže

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_portfolio',
  TEMPLATE_ID: 'template_portfolio', 
  PUBLIC_KEY: 'portfolio_public_key_123'
};

// Příklad šablony pro EmailJS:
// Subject: Nová zpráva z portfolia od {{from_name}}
// 
// Jméno: {{from_name}}
// Email: {{from_email}}
// 
// Zpráva:
// {{message}}