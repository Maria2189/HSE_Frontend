import { useSelector, useDispatch } from 'react-redux'
import { addToFavorite, removeFromFavorite } from '../../store/favoritesSlice'
import styles from './styles.module.css'

const MovieCard = ({ film }) => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)
  const isFavorite = favorites.some((f) => f.filmId === film.filmId)

  const handleToggle = () => {
    isFavorite ? dispatch(removeFromFavorite(film.filmId)) : dispatch(addToFavorite(film))
  }

  return (
    <article className={styles.card}>
      <div className={styles.posterWrap}>
        <img src={film.posterUrlPreview} alt={film.nameRu} className={styles.poster} />
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
