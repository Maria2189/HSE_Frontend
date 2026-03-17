import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { addToFavorite, removeFromFavorite } from '../../../store/favoritesSlice'
import styles from './styles.module.css'

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY

const getRatingColor = (rating) => {
  const n = parseFloat(rating)
  if (isNaN(n)) return 'var(--muted)'
  if (n >= 7) return '#4a9e7a'
  if (n >= 5) return 'var(--amber)'
  return '#d45a4a'
}

const Skeleton = ({ w = '100%', h = '18px', radius = '4px' }) => (
  <div className={styles.skeleton} style={{ width: w, height: h, borderRadius: radius }} />
)

const MetaRow = ({ label, value }) =>
  value ? (
    <div className={styles.metaRow}>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  ) : null

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const favorites = useSelector((s) => s.favorites)

  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isFavorite = favorites.some((f) => f.filmId === Number(id))

  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
          headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
          },
        })
        if (!res.ok) throw new Error(`Ошибка ${res.status}`)
        const data = await res.json()
        setFilm(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchFilm()
  }, [id])

  const handleToggleFav = () => {
    if (!film) return
    const filmForStore = {
      filmId: film.kinopoiskId,
      nameRu: film.nameRu,
      nameEn: film.nameEn,
      year: film.year,
      genres: film.genres,
      posterUrlPreview: film.posterUrlPreview,
      rating: film.ratingKinopoisk?.toString() || film.ratingImdb?.toString(),
    }
    isFavorite
      ? dispatch(removeFromFavorite(film.kinopoiskId))
      : dispatch(addToFavorite(filmForStore))
  }

  const rating = film?.ratingKinopoisk || film?.ratingImdb
  const ratingColor = getRatingColor(rating)

  return (
    <div className={styles.page}>
      {/* Back button */}
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      {error && <p className={styles.errorMessage}>Ошибка: {error}</p>}

      <div className={styles.layout}>
        {/* ── Poster column ── */}
        <div className={styles.posterCol}>
          {loading ? (
            <Skeleton w="100%" h="420px" radius="12px" />
          ) : (
            <div className={styles.posterWrap}>
              <img
                src={film?.posterUrl || film?.posterUrlPreview}
                alt={film?.nameRu}
                className={styles.poster}
              />
              {rating && (
                <div className={styles.ratingBadge} style={{ background: ratingColor }}>
                  <span className={styles.ratingNum}>{rating}</span>
                  <span className={styles.ratingLabel}>
                    {film?.ratingKinopoisk ? 'КП' : 'IMDb'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Fav button under poster */}
          {!loading && film && (
            <button
              className={`${styles.favBtn} ${isFavorite ? styles.favActive : ''}`}
              onClick={handleToggleFav}
            >
              {isFavorite ? '♥ В избранном' : '♡ В избранное'}
            </button>
          )}

          {/* Scores block */}
          {!loading && film && (
            <div className={styles.scoresBlock}>
              {film.ratingKinopoisk && (
                <div className={styles.scoreItem}>
                  <span className={styles.scoreNum} style={{ color: getRatingColor(film.ratingKinopoisk) }}>
                    {film.ratingKinopoisk}
                  </span>
                  <span className={styles.scoreLabel}>Кинопоиск</span>
                  {film.ratingKinopoiskVoteCount && (
                    <span className={styles.scoreVotes}>
                      {film.ratingKinopoiskVoteCount.toLocaleString('ru')} оценок
                    </span>
                  )}
                </div>
              )}
              {film.ratingImdb && (
                <div className={styles.scoreItem}>
                  <span className={styles.scoreNum} style={{ color: getRatingColor(film.ratingImdb) }}>
                    {film.ratingImdb}
                  </span>
                  <span className={styles.scoreLabel}>IMDb</span>
                  {film.ratingImdbVoteCount && (
                    <span className={styles.scoreVotes}>
                      {film.ratingImdbVoteCount.toLocaleString('ru')} оценок
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Info column ── */}
        <div className={styles.infoCol}>
          {loading ? (
            <>
              <Skeleton w="70%" h="36px" radius="6px" />
              <div style={{ marginTop: 8 }}><Skeleton w="40%" h="18px" /></div>
              <div style={{ marginTop: 24 }}>
                {[...Array(6)].map((_, i) => <div key={i} style={{ marginBottom: 8 }}><Skeleton w={`${60 + i * 5}%`} h="14px" /></div>)}
              </div>
              <div style={{ marginTop: 24 }}>
                {[...Array(5)].map((_, i) => <div key={i} style={{ marginBottom: 6 }}><Skeleton h="13px" /></div>)}
              </div>
            </>
          ) : film ? (
            <>
              <div className={styles.titleBlock}>
                <h1 className={styles.filmTitle}>{film.nameRu || film.nameEn || film.nameOriginal}</h1>
                {film.nameOriginal && film.nameOriginal !== film.nameRu && (
                  <p className={styles.filmTitleOriginal}>{film.nameOriginal}</p>
                )}
              </div>

              {/* Genres pills */}
              {film.genres?.length > 0 && (
                <div className={styles.genresList}>
                  {film.genres.map((g) => (
                    <span key={g.genre} className={styles.genrePill}>{g.genre}</span>
                  ))}
                </div>
              )}

              {/* Description */}
              {film.description && (
                <p className={styles.description}>{film.description}</p>
              )}

              {/* Meta table */}
              <div className={styles.metaTable}>
                <MetaRow label="Год" value={film.year} />
                <MetaRow label="Страна" value={film.countries?.map((c) => c.country).join(', ')} />
                <MetaRow
                  label="Длительность"
                  value={film.filmLength ? `${film.filmLength} мин` : null}
                />
                <MetaRow label="Слоган" value={film.slogan ? `«${film.slogan}»` : null} />
                <MetaRow label="Возраст" value={film.ratingAgeLimits ? film.ratingAgeLimits.replace('age', '') + '+' : null} />
                <MetaRow label="Статус" value={film.productionStatus} />
              </div>

              {/* Kinopoisk link */}
              {film.webUrl && (
                <a
                  className={styles.kinoLink}
                  href={film.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Открыть на Кинопоиске ↗
                </a>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
