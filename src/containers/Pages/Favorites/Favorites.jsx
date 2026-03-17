import { useSelector, useDispatch } from 'react-redux';
import Card from '../../../components/Card/Card';
import { removeFromFavorite } from '../../../store/favoritesSlice';
import styles from '../Movies/styles.module.css';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <section className={styles.section}>
      <h2>Ваши избранные фильмы</h2>
      
      {favorites.length === 0 ? (
        <p>В вашем списке пока нет избранных фильмов.</p>
      ) : (
        <div className={styles.personsGrid}>
          {favorites.map((film) => (
            <Card key={film.filmId}>
              <div className={styles.personContent} style={{ position: 'relative' }}>
                
                <button
                  onClick={() => dispatch(removeFromFavorite(film.filmId))}
                  title="Удалить из избранного"
                  style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: 'rgba(255,255,255,0.8)', border: 'none',
                    borderRadius: '50%', cursor: 'pointer', fontSize: '20px',
                    padding: '5px', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  ❤️
                </button>

                <img 
                  src={film.posterUrlPreview} 
                  alt={film.nameRu} 
                  className={styles.personImage} 
                />
                <h3 className={styles.personName}>{film.nameRu}</h3>
                <p className={styles.personNameEn}>{film.year} год</p>
                <p style={{fontSize: '12px', color: '#888', marginTop: '8px'}}>
                  Жанры: {film.genres?.map(g => g.genre).join(', ')}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;