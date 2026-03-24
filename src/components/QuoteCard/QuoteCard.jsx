/**
 * QuoteCard — displays a motivational quote fetched from the API.
 * Accepts: { quote, loading, error, onFetch }
 */

import styles from './QuoteCard.module.css'

export default function QuoteCard({ quote, loading, error, onFetch }) {
  return (
    <section className={styles.card} aria-label="Motivational Quote">
      {/* Card Header */}
      <div className={styles.header}>
        <div className={styles.iconWrap} aria-hidden="true">✦</div>
        <div>
          <h2 className={styles.title}>Daily Spark</h2>
          <p className={styles.subtitle}>Motivational Quote</p>
        </div>
      </div>

      {/* Quote Body */}
      <div className={styles.body}>
        {loading && (
          <div className={styles.skeleton}>
            <div className={styles.skeletonLine} style={{ width: '90%' }} />
            <div className={styles.skeletonLine} style={{ width: '75%' }} />
            <div className={styles.skeletonLine} style={{ width: '60%' }} />
          </div>
        )}

        {!loading && error && (
          <div className={styles.errorState} role="alert">
            <span className={styles.errorIcon}>⚠</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !quote && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              Click <em>Generate</em> to receive today's spark of wisdom.
            </p>
          </div>
        )}

        {!loading && !error && quote && (
          <figure className={styles.quoteWrap}>
            <blockquote className={styles.quoteText}>
              <span className={styles.openMark}>"</span>
              {quote.content}
              <span className={styles.closeMark}>"</span>
            </blockquote>
            <figcaption className={styles.author}>— {quote.author}</figcaption>
          </figure>
        )}
      </div>

      {/* Action */}
      <div className={styles.footer}>
        <button
          className={styles.btn}
          onClick={onFetch}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className={styles.spinner} aria-hidden="true" /> Fetching…
            </>
          ) : (
            <>✦ Generate Quote</>
          )}
        </button>
      </div>
    </section>
  )
}