# Sklad směsí PROFILY – DEMO

Tato aplikace slouží pro **evidenci skladových směsí, zásob a odpadů** ve firmě PROFILY, s.r.o.  
Je navržena tak, aby ji mohli používat všichni zaměstnanci jednoduše a bez složitého školení.

---

## Jak aplikaci spustit

1. **Zkopírujte složku projektu** do počítače, kde chcete aplikaci používat.  
   (Složku `node_modules` není nutné kopírovat!)

2. **Otevřete složku projektu v příkazové řádce (CMD nebo PowerShell).**

3. **Nainstalujte závislosti:**

Aplikace se automaticky otevře v prohlížeči na adrese [http://localhost:3001](http://localhost:3001).

---

## Důležité informace

- **Data se ukládají automaticky na tomto počítači** (do prohlížeče – localStorage).
- Pokud aplikaci spustíte na jiném počítači, budou data oddělená.
- **Při smazání historie prohlížeče můžete o data přijít** – doporučujeme pravidelně zálohovat (návod níže).
- Pokud potřebujete obnovit nebo přenést data mezi počítači, kontaktujte správce nebo autora aplikace.

---

## Záloha a obnova dat

Pro zálohu dat:
1. Otevřete aplikaci v prohlížeči a stiskněte klávesu **F12**.
2. V menu devtools najděte **Application** → **Local Storage** → vyberte vaši adresu.
3. Zkopírujte hodnoty klíčů (například `vmq-sklad`, `vmq-odpady`, `vmq-odepsane`) a uložte do textového souboru.
4. Pro obnovení vložte hodnotu zpět stejným způsobem.

Pokud si nevíte rady, ozvěte se autorovi aplikace.

---

## Podpora a kontakt

Autor: Michal (operátor PROFILY, s.r.o.)  
Telefon: **605 954 429**

---

## Poznámka pro IT/externí správce

Tato aplikace je demo řešení, které lze rozšířit o:
- Síťové sdílení dat
- Cloudové zálohování
- Uživatelské účty
- Firemní hosting

V případě zájmu lze připravit nabídku na plně produkční řešení.

---

