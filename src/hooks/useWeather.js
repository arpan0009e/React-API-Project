/**
 * useWeather — custom hook for fetching live weather data
 *
 * Uses Open-Meteo (https://open-meteo.com) — completely FREE, no API key,
 * full HTTPS support, no rate limit issues.
 *
 * Flow:
 *   1. Geocode city name → lat/lon  (geocoding-api.open-meteo.com)
 *   2. Fetch current weather        (api.open-meteo.com)
 *
 * Returns: { weather, loading, error, fetchWeather }
 */

import { useState, useCallback } from 'react'

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * WMO weather interpretation codes → emoji + description
 * https://open-meteo.com/en/docs#weathervariables
 */
const WMO_MAP = {
  0:  { icon: '☀️',  desc: 'Clear Sky' },
  1:  { icon: '🌤️', desc: 'Mainly Clear' },
  2:  { icon: '⛅',  desc: 'Partly Cloudy' },
  3:  { icon: '☁️',  desc: 'Overcast' },
  45: { icon: '🌫️', desc: 'Foggy' },
  48: { icon: '🌫️', desc: 'Icy Fog' },
  51: { icon: '🌦️', desc: 'Light Drizzle' },
  53: { icon: '🌦️', desc: 'Drizzle' },
  55: { icon: '🌧️', desc: 'Heavy Drizzle' },
  61: { icon: '🌧️', desc: 'Slight Rain' },
  63: { icon: '🌧️', desc: 'Rain' },
  65: { icon: '🌧️', desc: 'Heavy Rain' },
  71: { icon: '❄️',  desc: 'Slight Snow' },
  73: { icon: '❄️',  desc: 'Snow' },
  75: { icon: '❄️',  desc: 'Heavy Snow' },
  77: { icon: '🌨️', desc: 'Snow Grains' },
  80: { icon: '🌦️', desc: 'Slight Showers' },
  81: { icon: '🌧️', desc: 'Showers' },
  82: { icon: '🌧️', desc: 'Heavy Showers' },
  85: { icon: '🌨️', desc: 'Snow Showers' },
  86: { icon: '🌨️', desc: 'Heavy Snow Showers' },
  95: { icon: '⛈️',  desc: 'Thunderstorm' },
  96: { icon: '⛈️',  desc: 'Thunderstorm with Hail' },
  99: { icon: '⛈️',  desc: 'Thunderstorm with Heavy Hail' },
}

const getWmo = (code) => WMO_MAP[code] ?? { icon: '🌡️', desc: 'Unknown' }

/** Celsius to Fahrenheit */
const toF = (c) => Math.round((c * 9) / 5 + 32)

/** m/s to km/h */
const msToKmh = (ms) => Math.round(ms * 3.6)

/** Wind degree → compass direction */
const windDirection = (deg) => {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const fetchWeather = useCallback(async (city) => {
    if (!city || !city.trim()) {
      setError('Please enter a city name.')
      return
    }
    setLoading(true)
    setError(null)

    try {
      // ── Step 1: Geocode city name → coordinates ──────────────────────────
      const geoRes = await fetch(
        `${GEOCODE_URL}?name=${encodeURIComponent(city.trim())}&count=1&language=en&format=json`
      )
      if (!geoRes.ok) throw new Error(`Geocoding failed: ${geoRes.status}`)

      const geoData = await geoRes.json()

      if (!geoData.results || geoData.results.length === 0) {
        setError('City not found. Please check the spelling and try again.')
        return
      }

      const place = geoData.results[0]
      const { latitude, longitude, name, country } = place

      // ── Step 2: Fetch current weather using lat/lon ───────────────────────
      const weatherRes = await fetch(
        `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,` +
        `weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index` +
        `&wind_speed_unit=kmh&timezone=auto`
      )
      if (!weatherRes.ok) throw new Error(`Weather fetch failed: ${weatherRes.status}`)

      const wData = await weatherRes.json()
      const cur   = wData.current
      const units = wData.current_units
      const { icon, desc } = getWmo(cur.weather_code)
      const tempC = Math.round(cur.temperature_2m)

      setWeather({
        city:        name,
        country:     country ?? '',
        tempC,
        tempF:       toF(tempC),
        feelsLikeC:  Math.round(cur.apparent_temperature),
        humidity:    cur.relative_humidity_2m,
        windKph:     Math.round(cur.wind_speed_10m),
        windDir:     windDirection(cur.wind_direction_10m),
        description: desc,
        icon,
        visibility:  cur.visibility != null
                       ? (cur.visibility / 1000).toFixed(1)
                       : 'N/A',
        pressure:    cur.surface_pressure != null
                       ? Math.round(cur.surface_pressure)
                       : 'N/A',
        uvIndex:     cur.uv_index ?? 'N/A',
      })
    } catch (err) {
      setError('Could not fetch weather. Please check your connection.')
      console.error('[useWeather]', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { weather, loading, error, fetchWeather }
}