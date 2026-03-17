import { useSelector, useDispatch } from 'react-redux'
import Card from '../Card/Card'
import { addToFavorite, removeFromFavorite } from '../../store/favoritesSlice'
import styles from '../../containers/Pages/Movies/styles.module.css'

const MovieCard = ({ film }) => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)

  const isFavorite = favorites.some((favMovie) => favMovie.filmId === film.filmId)

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(film.filmId))
    } else {
      dispatch(addToFavorite(film))
    }
  }

  return (
    <Card>
      <div className={styles.personContent} style={{ position: 'relative' }}>
        <button
          onClick={handleToggleFavorite}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255,255,255,0.8)',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            padding: '5px',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        <img src={film.posterUrlPreview} alt={film.nameRu} className={styles.personImage} />
        <h3 className={styles.personName}>{film.nameRu}</h3>
        <p className={styles.personNameEn}>{film.year} год</p>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
          Жанры: {film.genres?.map((g) => g.genre).join(', ')}
        </p>
      </div>
    </Card>
  )
}

export default MovieCard
