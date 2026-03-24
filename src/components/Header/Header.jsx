/**
 * Header — top navigation bar with branding and live time/date.
 */

import { useState, useEffect } from 'react'
import styles from './Header.module.css'

function useLiveClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Header() {
  const now = useLiveClock()

  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  })
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">✦</span>
          <span className={styles.brandName}>SmartDash</span>
          <span className={styles.brandTag}>API Widget</span>
        </div>

        {/* Live clock */}
        <div className={styles.clock} aria-label="Current time and date">
          <span className={styles.time}>{timeStr}</span>
          <span className={styles.date}>{dateStr}</span>
        </div>
      </div>
    </header>
  )
}