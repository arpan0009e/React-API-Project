/**
 * Footer — minimal footer with attribution and tech stack tags.
 */

import styles from './Footer.module.css'

const TECH = ['React 18', 'Vite', 'CSS Modules', 'Quotable API', 'wttr.in']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.credit}>
          Built with <span aria-label="love">♥</span> · Practical 7 — API Integration
        </p>
        <div className={styles.tags}>
          {TECH.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}