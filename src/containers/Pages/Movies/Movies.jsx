import { useState, useEffect } from 'react'
import Input from '../../../components/Input/Input'
import MovieCard from '../../../components/MovieCard/MovieCard'
import styles from './styles.module.css'

const Movies = () => {
  const [films, setFilms] = useState([])
  const [isLoadingFilms, setIsLoadingFilms] = useState(false)
  const [filmsError, setFilmsError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('Матрица')
  const [genreFilter, setGenreFilter] = useState('')

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilms([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoadingFilms(true)
      setFilmsError(null)
      try {
        const response = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchQuery}`,
          {
            method: 'GET',
            headers: {
              'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) throw new Error(`Ошибка при получении данных: статус ${response.status}`)

        const data = await response.json()
        setFilms(data.films ? data.films.slice(0, 8) : [])
      } catch (err) {
        setFilmsError(err.message)
      } finally {
        setIsLoadingFilms(false)
      }
    }, 800)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const handleSearchChange = (e) => setSearchQuery(e.target.value)
  const handleFilterChange = (e) => setGenreFilter(e.target.value)

  const filteredFilms = films.filter((film) => {
    if (!genreFilter.trim()) return true
    return film.genres?.some((g) => g.genre.toLowerCase().includes(genreFilter.toLowerCase()))
  })

  return (
    <section className={styles.section}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Поиск фильмов</h2>
        <p className={styles.pageSubtitle}>База Кинопоиска · введите название или жанр</p>
      </div>

      <div className={styles.searchRow}>
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Название фильма..."
        />
        <Input
          value={genreFilter}
          onChange={handleFilterChange}
          placeholder="Жанр (например: боевик)..."
        />
      </div>

      {isLoadingFilms && <p className={styles.loadingMessage}>Поиск...</p>}
      {filmsError && <p className={styles.errorMessage}>Ошибка: {filmsError}</p>}

      {!isLoadingFilms && !filmsError && filteredFilms.length > 0 && (
        <div className={styles.grid}>
          {filteredFilms.map((film) => (
            <MovieCard key={film.filmId} film={film} />
          ))}
        </div>
      )}

      {!isLoadingFilms && !filmsError && films.length > 0 && filteredFilms.length === 0 && (
        <p className={styles.emptyMessage}>Нет фильмов жанра «{genreFilter}» в результатах.</p>
      )}
      {!isLoadingFilms && !filmsError && films.length === 0 && searchQuery && (
        <p className={styles.emptyMessage}>По запросу «{searchQuery}» ничего не найдено.</p>
      )}
    </section>
  )
}

export default Movies
