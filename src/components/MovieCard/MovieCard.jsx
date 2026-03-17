import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { addToFavorite, removeFromFavorite } from '../../store/favoritesSlice'
import styles from './styles.module.css'

const getRatingClass = (rating) => {
  const num = parseFloat(rating)
  if (isNaN(num)) return styles.ratingNeutral
  if (num >= 7) return styles.ratingGood
  if (num >= 5) return styles.ratingMid
  return styles.ratingBad
}

const MovieCard = ({ film }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const favorites = useSelector((state) => state.favorites)
  const isFavorite = favorites.some((f) => f.filmId === film.filmId)

  const handleToggle = (e) => {
    e.stopPropagation()
    isFavorite ? dispatch(removeFromFavorite(film.filmId)) : dispatch(addToFavorite(film))
  }

  const handleClick = () => navigate(`/film/${film.filmId}`)

  const rating = film.rating && film.rating !== 'null' ? film.rating : null

  return (
    <article className={styles.card} onClick={handleClick}>
      <div className={styles.posterWrap}>
        <img src={film.posterUrlPreview} alt={film.nameRu} className={styles.poster} />

        {rating && (
          <div className={`${styles.rating} ${getRatingClass(rating)}`}>
            {rating}
          </div>
        )}

        <button
          onClick={handleToggle}
          className={`${styles.favBtn} ${isFavorite ? styles.favActive : ''}`}
          title={isFavorite ? 'Убрать из избранного' : 'В избранное'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{film.nameRu}</h3>
        <span className={styles.year}>{film.year}</span>
        {film.genres?.length > 0 && (
          <p className={styles.genres}>{film.genres.map((g) => g.genre).join(' · ')}</p>
        )}
      </div>
    </article>
  )
}

export default MovieCard
