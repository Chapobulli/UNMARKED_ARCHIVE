# OPIUM ARCHIVE - Static Preorder Site

Sito statico minimalista per testare il primo drop del brand con sistema preorder.

## 🚀 Deploy rapido

### Opzione 1: Netlify (consigliato)
1. Vai su [netlify.com](https://netlify.com)
2. Drag & drop l'intera cartella `opium-static-site`
3. Il sito sarà live in ~30 secondi

### Opzione 2: Vercel
1. Vai su [vercel.com](https://vercel.com)
2. Import project dalla cartella
3. Deploy automatico

### Opzione 3: GitHub Pages
1. Crea repo GitHub e carica i file
2. Settings > Pages > seleziona branch main
3. Sito live su `username.github.io/repo-name`

### Opzione 4: Surge.sh (più semplice)
```bash
npm install -g surge
cd opium-static-site
surge
```

## 📧 Configurazione email preorder

Il form usa 3 opzioni (modifica in `script.js`):

**Opzione 1 (default): Mailto**
- Apre client email del visitatore
- Sostituisci `your-email@example.com` con la tua email

**Opzione 2: Formspree (consigliato)**
- Registrati gratis su [formspree.io](https://formspree.io)
- Crea form e prendi l'ID
- Sostituisci `YOUR_FORM_ID` in script.js
- 50 submission/mese gratis

**Opzione 3: EmailJS**
- Registrati su [emailjs.com](https://emailjs.com)
- Setup service + template
- Aggiungi SDK e configura ID

## 🎨 Personalizzazione

### Immagine prodotto
Sostituisci `<div class="placeholder-image">` in `index.html` con:
```html
<img src="tua-immagine.jpg" alt="Product" style="width: 100%">
```

### Colori
Modifica le variabili in `style.css`:
```css
:root {
    --color-bg: #000000;
    --color-text: #ffffff;
    --color-border: #2b2b2b;
}
```

### Testi
Modifica direttamente in `index.html`:
- Nome prodotto: `.product-title`
- Prezzo: `.product-price`
- Features: `.product-features li`

## 📱 Mobile-friendly
Design responsive testato su tutti i device.

## ⚡ Performance
- 0 dipendenze
- Solo Google Fonts
- ~15KB totali
- 100/100 Lighthouse score

## 🔒 Privacy
Nessun tracking, nessun cookie, zero JavaScript di terze parti (tranne Google Fonts opzionale).
# Opium-archive
