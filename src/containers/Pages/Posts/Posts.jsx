import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import styles from './styles.module.css'

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY

const MONTH_NAMES = [
  'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
  'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER',
]

const ACTOR_SOURCE_FILMS = [301, 435, 258687, 714888, 326, 447301]

const TABS = [
  { id: 'top',     label: 'Топ фильмов' },
  { id: 'new',     label: 'Премьеры' },
  { id: 'actors',  label: 'Актёры' },
]

const getRatingColor = (r) => {
  const n = parseFloat(r)
  if (isNaN(n)) return 'var(--muted)'
  if (n >= 7) return '#4a9e7a'
  if (n >= 5) return 'var(--amber)'
  return '#d45a4a'
}

// ── Skeleton ──
const Skeleton = ({ h = '14px', w = '100%', r = '4px' }) => (
  <div className={styles.skeleton} style={{ height: h, width: w, borderRadius: r }} />
)

// ── Hero card (first film in top) ──
const HeroCard = ({ film, onClick }) => {
  const rating = film.ratingKinopoisk || film.rating
  return (
    <article className={styles.heroCard} onClick={onClick}>
      <div className={styles.heroPoster}>
        <img src={film.posterUrl || film.posterUrlPreview} alt={film.nameRu} className={styles.heroPosterImg} />
        <div className={styles.heroOverlay} />
        {rating && (
          <div className={styles.heroRating} style={{ background: getRatingColor(rating) }}>
            {rating}
          </div>
        )}
      </div>
      <div className={styles.heroBody}>
        <span className={styles.heroTag}>Редакционный выбор</span>
        <h2 className={styles.heroTitle}>{film.nameRu || film.nameEn}</h2>
        {film.nameEn && film.nameEn !== film.nameRu && (
          <p className={styles.heroOrig}>{film.nameEn}</p>
        )}
        <div className={styles.heroMeta}>
          {film.year && <span>{film.year}</span>}
          {film.genres?.[0] && <span>{film.genres[0].genre}</span>}
          {film.filmLength && <span>{film.filmLength} мин</span>}
        </div>
        {film.description && (
          <p className={styles.heroDesc}>{film.description.slice(0, 220)}…</p>
        )}
        <span className={styles.readMore}>Читать подробнее →</span>
      </div>
    </article>
  )
}

// ── Editorial film card ──
const FilmPost = ({ film, index, onClick }) => {
  const rating = film.ratingKinopoisk || film.rating
  return (
    <article className={styles.filmPost} onClick={onClick}>
      <div className={styles.filmPostPoster}>
        <img
          src={film.posterUrlPreview || film.posterUrl}
          alt={film.nameRu}
          className={styles.filmPostImg}
        />
        {rating && (
          <div className={styles.filmPostRating} style={{ background: getRatingColor(rating) }}>
            {rating}
          </div>
        )}
      </div>
      <div className={styles.filmPostBody}>
        <span className={styles.filmPostNum}>#{String(index + 1).padStart(2, '0')}</span>
        <h3 className={styles.filmPostTitle}>{film.nameRu || film.nameEn}</h3>
        <div className={styles.filmPostMeta}>
          {film.year && <span>{film.year}</span>}
          {film.genres?.slice(0, 2).map((g) => (
            <span key={g.genre} className={styles.filmPostGenre}>{g.genre}</span>
          ))}
        </div>
        {film.description && (
          <p className={styles.filmPostDesc}>{film.description.slice(0, 120)}…</p>
        )}
      </div>
    </article>
  )
}

// ── Actor card ──
const ActorCard = ({ person }) => {
  const profMap = {
    DIRECTOR: 'Режиссёр', ACTOR: 'Актёр', PRODUCER: 'Продюсер',
    WRITER: 'Сценарист', COMPOSER: 'Композитор', OPERATOR: 'Оператор',
  }
  return (
    <article className={styles.actorCard}>
      <div className={styles.actorPhoto}>
        {person.posterUrl ? (
          <img src={person.posterUrl} alt={person.nameRu || person.nameEn} className={styles.actorImg} />
        ) : (
          <div className={styles.actorNoPhoto}>
            {(person.nameRu || person.nameEn || '?')[0]}
          </div>
        )}
      </div>
      <div className={styles.actorInfo}>
        <h3 className={styles.actorName}>{person.nameRu || person.nameEn}</h3>
        {person.nameEn && person.nameRu && (
          <p className={styles.actorNameEn}>{person.nameEn}</p>
        )}
        <span className={styles.actorRole}>
          {profMap[person.professionKey] || person.professionText}
        </span>
        {person.description && (
          <p className={styles.actorDesc}>{person.description}</p>
        )}
      </div>
    </article>
  )
}

// ── Main Posts component ──
const Posts = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('top')

  const [topFilms, setTopFilms]     = useState([])
  const [topLoading, setTopLoading] = useState(false)
  const [topError, setTopError]     = useState(null)

  const [newFilms, setNewFilms]     = useState([])
  const [newLoading, setNewLoading] = useState(false)
  const [newError, setNewError]     = useState(null)

  const [actors, setActors]         = useState([])
  const [actLoading, setActLoading] = useState(false)
  const [actError, setActError]     = useState(null)

  // Top 250 
  useEffect(() => {
    if (topFilms.length > 0) return
    setTopLoading(true)
    fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
      headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
    })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then((d) => setTopFilms(d.films?.slice(0, 9) || []))
      .catch((e) => setTopError(e.message))
      .finally(() => setTopLoading(false))
  }, [])

  // Premieres 
  useEffect(() => {
    if (activeTab !== 'new' || newFilms.length > 0) return
    const now = new Date()
    const year = now.getFullYear()
    const month = MONTH_NAMES[now.getMonth()]
    setNewLoading(true)
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`,
      { headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' } }
    )
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then((d) => setNewFilms(d.items?.slice(0, 8) || []))
      .catch((e) => setNewError(e.message))
      .finally(() => setNewLoading(false))
  }, [activeTab])

  // Actors 
  useEffect(() => {
    if (activeTab !== 'actors' || actors.length > 0) return
    setActLoading(true)
    Promise.all(
      ACTOR_SOURCE_FILMS.map((id) =>
        fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`, {
          headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
        }).then((r) => (r.ok ? r.json() : []))
      )
    )
      .then((results) => {
        const seen = new Set()
        const merged = results
          .flat()
          .filter((p) => {
            if (!p.staffId || seen.has(p.staffId)) return false
            seen.add(p.staffId)
            return (
              (p.professionKey === 'ACTOR' || p.professionKey === 'DIRECTOR') &&
              p.posterUrl
            )
          })
          .slice(0, 12)
        setActors(merged)
      })
      .catch((e) => setActError(e.message))
      .finally(() => setActLoading(false))
  }, [activeTab])

  const goToFilm = (id) => navigate(`/film/${id}`)

  const isLoading = activeTab === 'top' ? topLoading : activeTab === 'new' ? newLoading : actLoading
  const error     = activeTab === 'top' ? topError  : activeTab === 'new' ? newError  : actError

  return (
    <section className={styles.section}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Редакция</h2>
          <p className={styles.pageSubtitle}>Кинопоиск · статьи, рейтинги, персоны</p>
        </div>
        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className={styles.skeletonWrap}>
          {activeTab === 'actors' ? (
            <div className={styles.actorsGrid}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={styles.actorCard}>
                  <Skeleton h="80px" w="80px" r="50%" />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Skeleton w="60%" />
                    <Skeleton w="40%" h="11px" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <Skeleton h="300px" r="12px" />
              <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[...Array(4)].map((_, i) => <Skeleton key={i} h="130px" r="10px" />)}
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className={styles.errorMessage}>Ошибка: {error}</p>}

      {!isLoading && !error && activeTab === 'top' && topFilms.length > 0 && (
        <>
          <HeroCard film={topFilms[0]} onClick={() => goToFilm(topFilms[0].kinopoiskId || topFilms[0].filmId)} />
          <div className={styles.filmGrid}>
            {topFilms.slice(1).map((f, i) => (
              <FilmPost
                key={f.kinopoiskId || f.filmId}
                film={f}
                index={i + 1}
                onClick={() => goToFilm(f.kinopoiskId || f.filmId)}
              />
            ))}
          </div>
        </>
      )}

      {!isLoading && !error && activeTab === 'new' && newFilms.length > 0 && (
        <>
          <HeroCard
            film={{ ...newFilms[0], description: `Премьера ${newFilms[0].nameRu || newFilms[0].nameEn} — одна из самых ожидаемых новинок этого месяца.` }}
            onClick={() => goToFilm(newFilms[0].kinopoiskId || newFilms[0].filmId)}
          />
          <div className={styles.filmGrid}>
            {newFilms.slice(1).map((f, i) => (
              <FilmPost
                key={f.kinopoiskId || f.filmId}
                film={{ ...f, description: `Премьера ${new Date().toLocaleString('ru', { month: 'long' })} ${f.year || ''}.` }}
                index={i + 1}
                onClick={() => goToFilm(f.kinopoiskId || f.filmId)}
              />
            ))}
          </div>
        </>
      )}

      {!isLoading && !error && activeTab === 'actors' && actors.length > 0 && (
        <div className={styles.actorsGrid}>
          {actors.map((p) => (
            <ActorCard key={p.staffId} person={p} />
          ))}
        </div>
      )}

      {!isLoading && !error && (
        (activeTab === 'top' && topFilms.length === 0) ||
        (activeTab === 'new' && newFilms.length === 0) ||
        (activeTab === 'actors' && actors.length === 0)
      ) && (
        <p className={styles.emptyMessage}>Нет данных для отображения.</p>
      )}
    </section>
  )
}

export default Posts
