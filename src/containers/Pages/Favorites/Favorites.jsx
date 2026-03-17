import { useSelector } from 'react-redux';
import styles from '../Movies/styles.module.css';
import MovieCard from '../../../components/MovieCard/MovieCard';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <section className={styles.section}>
      <h2>Ваши избранные фильмы</h2>
      
      {favorites.length === 0 ? (
        <p>В вашем списке пока нет избранных фильмов.</p>
      ) : (
        <div className={styles.personsGrid}>
          {favorites.map((film) => (
            <MovieCard key={film.filmId} film={film} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;