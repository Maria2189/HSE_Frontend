import { useState, useEffect, useRef } from 'react'
import MovieCard from '../../../components/MovieCard/MovieCard'
import styles from './styles.module.css'

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY

const MODES = [
  { id: 'keyword', label: 'По названию' },
  { id: 'genre',   label: 'По жанру'   },
]

/* --- Hooks --- */

function useGenres() {
  const [genres, setGenres] = useState([])
  useEffect(() => {
    fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/filters', {
      headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
    })
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((d) => setGenres(d.genres || []))
      .catch(() => {})
  }, [])
  return genres
}

/* --- Component --- */

const Movies = () => {
  const [mode, setMode] = useState('keyword')

  const [keyword, setKeyword]       = useState('Матрица')
  const [kwFilms, setKwFilms]       = useState([])
  const [kwLoading, setKwLoading]   = useState(false)
  const [kwError, setKwError]       = useState(null)

  const genres                      = useGenres()
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [genreFilms, setGenreFilms] = useState([])
  const [genreLoading, setGenreLoading] = useState(false)
  const [genreError, setGenreError] = useState(null)
  const [genrePage, setGenrePage]   = useState(1)
  const [genreTotalPages, setGenreTotalPages] = useState(1)

  const debounceRef = useRef(null)

  /* --- Keyword search --- */
  useEffect(() => {
    if (mode !== 'keyword') return
    if (!keyword.trim()) { setKwFilms([]); return }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setKwLoading(true)
      setKwError(null)
      try {
        const res = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}`,
          { headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' } }
        )
        if (!res.ok) throw new Error(`Статус ${res.status}`)
        const data = await res.json()
        setKwFilms(data.films?.slice(0, 12) || [])
      } catch (e) {
        setKwError(e.message)
      } finally {
        setKwLoading(false)
      }
    }, 700)

    return () => clearTimeout(debounceRef.current)
  }, [keyword, mode])

  /* --- Genre search --- */
  useEffect(() => {
    if (mode !== 'genre' || !selectedGenre) return
    setGenreLoading(true)
    setGenreError(null)
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${selectedGenre.id}&order=RATING&type=ALL&page=${genrePage}`,
      { headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' } }
    )
      .then((r) => r.ok ? r.json() : Promise.reject(`Статус ${r.status}`))
      .then((d) => {
        setGenreFilms(d.items || [])
        setGenreTotalPages(d.totalPages || 1)
      })
      .catch((e) => setGenreError(String(e)))
      .finally(() => setGenreLoading(false))
  }, [selectedGenre, genrePage, mode])

  const handleGenreClick = (g) => {
    if (selectedGenre?.id === g.id) return
    setSelectedGenre(g)
    setGenrePage(1)
    setGenreFilms([])
  }

  const handleModeSwitch = (m) => {
    setMode(m)
  }

  const loading = mode === 'keyword' ? kwLoading : genreLoading
  const error   = mode === 'keyword' ? kwError   : genreError
  const films   = mode === 'keyword' ? kwFilms   : genreFilms

  const normalizedFilms = films.map((f) => ({
    filmId:          f.kinopoiskId || f.filmId,
    nameRu:          f.nameRu,
    nameEn:          f.nameEn,
    year:            f.year,
    genres:          f.genres,
    posterUrlPreview: f.posterUrlPreview,
    rating:          f.ratingKinopoisk?.toString() || f.rating,
  }))

  return (
    <section className={styles.section}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Поиск фильмов</h2>
          <p className={styles.pageSubtitle}>База Кинопоиска</p>
        </div>

        <div className={styles.modeToggle}>
          {MODES.map((m) => (
            <button
              key={m.id}
              className={`${styles.modeBtn} ${mode === m.id ? styles.modeBtnActive : ''}`}
              onClick={() => handleModeSwitch(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'keyword' && (
        <div className={styles.keywordRow}>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>⌕</span>
            <input
              className={styles.searchInput}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Название фильма..."
              autoFocus
            />
            {keyword && (
              <button className={styles.clearBtn} onClick={() => setKeyword('')}>✕</button>
            )}
          </div>
        </div>
      )}

      {mode === 'genre' && (
        <div className={styles.genreSection}>
          <p className={styles.genreHint}>Выберите жанр:</p>
          <div className={styles.genrePills}>
            {genres.length === 0 && (
              <span className={styles.genreLoading}>Загрузка жанров...</span>
            )}
            {genres.map((g) => (
              <button
                key={g.id}
                className={`${styles.genrePill} ${selectedGenre?.id === g.id ? styles.genrePillActive : ''}`}
                onClick={() => handleGenreClick(g)}
              >
                {g.genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <p className={styles.loadingMessage}>Поиск...</p>}
      {error   && <p className={styles.errorMessage}>Ошибка: {error}</p>}

      {!loading && !error && normalizedFilms.length > 0 && (
        <>
          {mode === 'genre' && selectedGenre && (
            <div className={styles.resultsHeader}>
              <span className={styles.resultsLabel}>
                Жанр: <strong>{selectedGenre.genre}</strong>
              </span>
              <span className={styles.resultsCount}>
                Страница {genrePage} из {genreTotalPages}
              </span>
            </div>
          )}
          <div className={styles.grid}>
            {normalizedFilms.map((film) => (
              <MovieCard key={film.filmId} film={film} />
            ))}
          </div>
          {mode === 'genre' && genreTotalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                disabled={genrePage === 1}
                onClick={() => setGenrePage((p) => p - 1)}
              >
                ← Назад
              </button>
              <span className={styles.pageInfo}>{genrePage} / {genreTotalPages}</span>
              <button
                className={styles.pageBtn}
                disabled={genrePage >= genreTotalPages}
                onClick={() => setGenrePage((p) => p + 1)}
              >
                Вперёд →
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && mode === 'keyword' && keyword && kwFilms.length === 0 && (
        <p className={styles.emptyMessage}>По запросу «{keyword}» ничего не найдено.</p>
      )}
      {!loading && !error && mode === 'genre' && !selectedGenre && genres.length > 0 && (
        <p className={styles.emptyMessage}>Выберите жанр выше, чтобы увидеть фильмы.</p>
      )}
    </section>
  )
}

export default Movies
