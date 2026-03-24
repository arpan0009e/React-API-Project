/**
 * WeatherCard — displays live weather data for a searched city.
 * Accepts: { weather, loading, error, onFetch }
 */

import { useState } from 'react'
import styles from './WeatherCard.module.css'

export default function WeatherCard({ weather, loading, error, onFetch }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onFetch(city)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onFetch(city)
  }

  return (
    <section className={styles.card} aria-label="Weather Checker">
      {/* Card Header */}
      <div className={styles.header}>
        <div className={styles.iconWrap} aria-hidden="true">◎</div>
        <div>
          <h2 className={styles.title}>Sky Report</h2>
          <p className={styles.subtitle}>Live Weather Lookup</p>
        </div>
      </div>

      {/* Search Input */}
      <div className={styles.inputRow}>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon} aria-hidden="true">⌖</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter city name…"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="City name"
            disabled={loading}
          />
        </div>
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={loading || !city.trim()}
          aria-busy={loading}
        >
          {loading ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            'Search'
          )}
        </button>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {loading && (
          <div className={styles.skeleton}>
            <div className={styles.skeletonBig} />
            <div className={styles.skeletonRow}>
              <div className={styles.skeletonPill} />
              <div className={styles.skeletonPill} />
              <div className={styles.skeletonPill} />
            </div>
          </div>
        )}

        {!loading && error && (
          <div className={styles.errorState} role="alert">
            <span className={styles.errorIcon}>⚠</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !weather && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              Search any city above to get its current weather conditions.
            </p>
          </div>
        )}

        {!loading && !error && weather && (
          <div className={styles.weatherDisplay} aria-live="polite">
            {/* Main temp */}
            <div className={styles.mainRow}>
              <span className={styles.weatherIcon} role="img" aria-label={weather.label}>
                {weather.icon}
              </span>
              <div className={styles.tempBlock}>
                <span className={styles.tempC}>{weather.tempC}°C</span>
                <span className={styles.tempF}>{weather.tempF}°F</span>
              </div>
            </div>

            {/* Location */}
            <div className={styles.location}>
              <span className={styles.locationPin}>◉</span>
              {weather.city}{weather.region ? `, ${weather.region}` : ''}{weather.country ? `, ${weather.country}` : ''}
            </div>

            {/* Description */}
            <p className={styles.description}>{weather.description}</p>

            {/* Stats grid */}
            <div className={styles.statsGrid}>
              <Stat label="Feels Like"  value={`${weather.feelsLikeC}°C`} />
              <Stat label="Humidity"    value={`${weather.humidity}%`} />
              <Stat label="Wind"        value={`${weather.windKph} km/h ${weather.windDir}`} />
              <Stat label="Visibility"  value={`${weather.visibility} km`} />
              <Stat label="Pressure"    value={`${weather.pressure} hPa`} />
              <Stat label="UV Index"    value={weather.uvIndex} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}