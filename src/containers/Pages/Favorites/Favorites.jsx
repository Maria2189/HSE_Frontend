import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import MovieCard from '../../../components/MovieCard/MovieCard'

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites)

  return (
    <section className={styles.section}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Избранное</h2>
        <p className={styles.pageSubtitle}>
          {favorites.length > 0
            ? `${favorites.length} ${favorites.length === 1 ? 'фильм' : favorites.length < 5 ? 'фильма' : 'фильмов'} в коллекции`
            : 'Ваша личная коллекция'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>♡</div>
          <p className={styles.emptyText}>Добавляйте фильмы в избранное, нажав на сердечко</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((film) => (
            <MovieCard key={film.filmId} film={film} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites
