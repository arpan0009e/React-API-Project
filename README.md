# SmartDash — Practical 7 (Industry-Grade Rebuild)

> A React + Vite application that fetches real-time motivational quotes and live weather data from free public APIs.

---

## Project Structure

```
smart-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx          ← Sticky nav with live clock
│   │   │   ├── Header.module.css
│   │   │   └── index.js
│   │   ├── QuoteCard/
│   │   │   ├── QuoteCard.jsx       ← Motivational quote widget
│   │   │   ├── QuoteCard.module.css
│   │   │   └── index.js
│   │   ├── WeatherCard/
│   │   │   ├── WeatherCard.jsx     ← Live weather widget
│   │   │   ├── WeatherCard.module.css
│   │   │   └── index.js
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       ├── Footer.module.css
│   │       └── index.js
│   ├── hooks/
│   │   ├── useQuote.js             ← Custom hook: fetch quote
│   │   └── useWeather.js           ← Custom hook: fetch weather
│   ├── styles/
│   │   └── global.css              ← Design tokens & resets
│   ├── App.jsx                     ← Root component
│   ├── App.module.css              ← Layout (grid, hero)
│   └── main.jsx                    ← React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## APIs Used

| Feature | API | Docs |
|---|---|---|
| Motivational Quotes | `https://api.quotable.io/random` | [quotable.io](https://github.com/lukePeavey/quotable) |
| Live Weather | `https://wttr.in/{city}?format=j1` | [wttr.in](https://wttr.in/:help) |

Both APIs are **free** and **require no API key**.

---

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser at
http://localhost:5173
```

---

## Industry Patterns Used

| Pattern | Location |
|---|---|
| Custom Hooks | `src/hooks/useQuote.js`, `useWeather.js` |
| CSS Modules (scoped styles) | `*.module.css` per component |
| Lifting State Up | `App.jsx` passes state → child cards |
| Barrel Exports | `index.js` in each component folder |
| Loading / Error / Empty states | All cards |
| Accessible markup | `aria-label`, `aria-busy`, `role="alert"` |
| Responsive grid | CSS Grid with `@media` breakpoints |
| Design Tokens | `src/styles/global.css` CSS variables |

---

## Viva Voce Answers

1. **What is an API?** — Application Programming Interface; a contract for how software components communicate. Here we call REST HTTP endpoints.
2. **Asynchronous fetching in React?** — Using `async/await` inside event handlers or `useEffect`, keeping the UI non-blocking while data loads.
3. **useState hook?** — Declares reactive state inside a function component; triggers re-render when state changes.
4. **How does fetch() work?** — Returns a Promise; `.json()` parses the response body; wrapped in `try/catch` for error handling.
5. **Why external APIs?** — Avoid rebuilding existing services; get real-time data; modular, scalable architecture.
6. **What happens on state update?** — React schedules a re-render of the component and its children; DOM is efficiently patched via the virtual DOM diffing algorithm.