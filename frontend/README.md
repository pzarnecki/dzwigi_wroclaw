# DŹWIGI PL - Nowoczesna strona React

## 🎨 Design Concept
**Industrial/Safety Modern**
- Ciemne tło (charcoal/black) z żółto-pomarańczowymi akcentami (safety colors)
- Typography: Bebas Neue (display) + Inter (body)
- Animacje: mocne, solidne - jak maszyny budowlane
- Layout: asymetryczny, z dużą przestrzenią

## 📦 Struktura projektu
```
dzwigi-react/
├── src/
│   ├── App.jsx           # Główny komponent
│   ├── main.jsx          # Entry point
│   └── styles/
│       └── App.css       # Style aplikacji
├── index.html            # HTML template
├── package.json          # Zależności
└── vite.config.js        # Konfiguracja Vite
```

## 🚀 Uruchomienie

### 1. Instalacja zależności
```bash
cd dzwigi-react
npm install
```

### 2. Uruchomienie dev server
```bash
npm run dev
```

### 3. Build produkcyjny
```bash
npm run build
```

## ✨ Co zostało zrobione (v1.0)

### ✅ Gotowe
- [x] Nowoczesny design industrialny z safety colors
- [x] Header z nawigacją i CTA (telefony)
- [x] Hero section z gradientami i animacjami
- [x] Stats bar z kluczowymi liczbami
- [x] Sekcja z dźwigami (3 przykładowe)
- [x] O firmie
- [x] Footer z kontaktem
- [x] Responsive design (mobile, tablet, desktop)
- [x] Smooth scroll
- [x] Hover effects i animacje
- [x] CSS Variables dla łatwej personalizacji

### 🎯 Następne kroki (w kolejnych iteracjach)
- [ ] Pełna lista dźwigów (12 modeli) z prawdziwymi zdjęciami
- [ ] System zarządzania treścią (CMS z JSON)
- [ ] Optymalizacja SEO (meta tags, schema.org)
- [ ] Podstrony dla lokalizacji (local SEO)
- [ ] Lazy loading obrazów
- [ ] WebP support
- [ ] Contact form
- [ ] Google Maps integration
- [ ] Mobile menu (hamburger)

## 🎨 Kolory projektu
- Background: `#0a0a0a` (primary), `#1a1a1a` (secondary)
- Safety Yellow: `#FFC107`
- Safety Orange: `#FF6F00`
- Text: `#ffffff` (primary), `#b0b0b0` (secondary)

## 📝 Notatki techniczne
- React 18
- Vite (szybszy build)
- CSS Variables (łatwa personalizacja)
- Mobile-first approach
- Semantic HTML

## 🔧 Personalizacja
Wszystkie zmienne kolorów i spacingu znajdziesz w `:root` w pliku `src/styles/App.css`
