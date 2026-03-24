/**
 * App.jsx — Root application component.
 *
 * Composes:
 *  - Header (sticky nav with live clock)
 *  - QuoteCard (motivational quote via Quotable API)
 *  - WeatherCard (live weather via wttr.in)
 *  - Footer (attribution + tech stack)
 *
 * State lives in App and is passed down as props (lifting state up pattern).
 * All async logic is encapsulated in custom hooks (src/hooks/).
 */

import Header    from './components/Header'
import QuoteCard from './components/QuoteCard'
import WeatherCard from './components/WeatherCard'
import Footer    from './components/Footer'

import { useQuote }   from './hooks/useQuote'
import { useWeather } from './hooks/useWeather'

import styles from './App.module.css'

export default function App() {
  const { quote, loading: quoteLoading, error: quoteError, fetchQuote }     = useQuote()
  const { weather, loading: weatherLoading, error: weatherError, fetchWeather } = useWeather()

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        {/* Page heading */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Smart Info Dashboard</h1>
          <p className={styles.heroSubtitle}>
            Real-time quotes &amp; live weather — powered by public APIs
          </p>
        </div>

        {/* Widget grid */}
        <div className={styles.grid}>
          <QuoteCard
            quote={quote}
            loading={quoteLoading}
            error={quoteError}
            onFetch={fetchQuote}
          />
          <WeatherCard
            weather={weather}
            loading={weatherLoading}
            error={weatherError}
            onFetch={fetchWeather}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}