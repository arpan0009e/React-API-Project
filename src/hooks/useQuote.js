/**
 * useQuote — custom hook for fetching motivational quotes
 *
 * Uses dummyjson.com/quotes — free, no API key, CORS-enabled, 100 quotes.
 * Picks a random quote by generating a random ID (1–100) each call.
 * Returns: { quote, loading, error, fetchQuote }
 */

import { useState, useCallback } from 'react'

const getRandomQuoteUrl = () => {
  const id = Math.floor(Math.random() * 100) + 1
  return `https://dummyjson.com/quotes/${id}`
}

export function useQuote() {
  const [quote, setQuote]     = useState(null)  // { content, author }
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const fetchQuote = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(getRandomQuoteUrl())
      if (!res.ok) throw new Error(`API responded with ${res.status}`)
      const data = await res.json()
      // dummyjson returns { id, quote, author }
      setQuote({ content: data.quote, author: data.author })
    } catch (err) {
      setError('Could not fetch quote. Please check your connection and try again.')
      console.error('[useQuote]', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { quote, loading, error, fetchQuote }
}