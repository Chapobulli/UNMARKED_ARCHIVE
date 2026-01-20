# UNMARKED ARCHIVE - Static Preorder Site

Sito web statico per preordini del marchio streetwear **UNMARKED ARCHIVE**.

## ✨ Caratteristiche
- Hero con GIF, sezioni con video/GIF di sfondo
- Galleria prodotto con varianti colore (black, white, brown, grey)
- Form preorder con campi obbligatori: nome, email, colore, taglia (S-XXL)
- Invio via Instagram DM: copia messaggio precompilato + link DM
- Size guide modal e social proof counter
- FAQ + sezione Terms & Conditions
- Lookbook page per mostrare le immagini del prodotto

## 🧭 Struttura File
```
/
├── index.html          # Homepage principale
├── faq.html           # FAQ e Terms & Conditions
├── lookbook.html      # Lookbook fotografico
├── privacy.html       # Informativa Privacy GDPR
├── style.css          # Tutti gli stili
├── script.js          # Tutte le funzionalità
└── assets/
    ├── product/       # Immagini prodotto (black, white, brown, grey)
    ├── images/        # Logo, backgrounds, hero GIF
    └── videos/        # Video per sezioni (opzionale)
```

## 🔧 Flusso Instagram DM
- Il form copia negli appunti il messaggio ordine (nome, email, phone, colore, taglia, note, timestamp)
- Mostra il testo copiato e un bottone "APRI INSTAGRAM DM" verso `https://ig.me/m/unmarkedarchive?text=...`
- Se clipboard fallisce, mostra il testo da copiare manualmente

## 🎨 Personalizzazione rapida
- Colori tema: `style.css` variabili `:root`
- Prezzo/nome/feature: `index.html` blocco product-info
- Taglie: select e size guide in `index.html`
- IG handle: cambia `igHandle` in `script.js` (attualmente `unmarked_archive.brand`)
- Aggiungi altre foto colore: aggiorna thumbs + array `productImages` in `script.js`

## 🚀 Deploy rapido
**Netlify (consigliato)**
1) netlify.com → New site from Git o drag&drop cartella
2) Build command: none, Publish dir: root

**Vercel**: Importa repo/cartella, framework "Other", build none, output root.

**GitHub Pages**: Settings → Pages → deploy from branch `main` root.

## 📂 Struttura media
- `assets/product/` - immagini prodotto (product-black.png, product-white.png, etc.)
- `assets/images/` - gif, logo e backgrounds
- `assets/videos/` - video per sezioni (opzionale)

## 📜 Note
- Nessuna email backend: contatto unico via Instagram DM
- Terms link: `faq.html#terms`
- Privacy policy GDPR compliant inclusa

## 🧪 Test rapido
1) Apri index.html in un browser
2) Prova form con colore/taglia → verifica messaggio copiato e link IG
3) Clicca Terms nel footer → scroll a sezione Terms in FAQ
4) Clicca follow CTA → profilo IG

## ⚡ Stack
- HTML + CSS + JS vanilla, nessuna build/dipendenze
- Design system minimale nero/bianco con accent color turchese
- Font: Space Grotesk da Google Fonts
- Responsive mobile-first

## 📧 Integrazione Email (Opzionale)
Se vuoi ricevere le prenotazioni via email invece che solo Instagram, decomenta una delle opzioni in `script.js`:
- **Formspree** (gratis 50 form/mese): https://formspree.io
- **EmailJS** (gratis 200 email/mese): https://emailjs.com

## 📱 Social Media
Ricordati di creare:
- Account Instagram: @unmarked_archive.brand
- Aggiorna tutti i link social in HTML con il tuo handle

## 🎯 TODO prima del lancio
- [ ] Carica tutte le immagini prodotto in `assets/product/`
- [ ] Aggiungi video (opzionale) in `assets/videos/`
- [ ] Crea account Instagram @unmarked_archive.brand
- [ ] Testa form su mobile e desktop
- [ ] Verifica tutti i link
- [ ] Deploy su Netlify/Vercel
- [ ] Test finale su dominio live

---

**Made with ❤️ for UNMARKED ARCHIVE**
