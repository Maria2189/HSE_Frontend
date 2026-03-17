// src/containers/Pages/Movies/Movies.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../../store/favoritesSlice';

import Card from '../../../components/Card/Card';
import Input from '../../../components/Input/Input';
import styles from './styles.module.css';

const Movies = () => {
  const [films, setFilms] = useState([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(false);
  const [filmsError, setFilmsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Матрица'); 
  const [genreFilter, setGenreFilter] = useState('');        

  // Получаем список избранного из Redux и функцию dispatch для отправки действий
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilms([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoadingFilms(true);
      setFilmsError(null);
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
        );

        if (!response.ok) throw new Error(`Ошибка при получении данных: статус ${response.status}`);

        const data = await response.json();
        setFilms(data.films ? data.films.slice(0, 8) : []);
      } catch (err) {
        setFilmsError(err.message);
      } finally {
        setIsLoadingFilms(false);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setGenreFilter(e.target.value);

  // Функция добавления/удаления из избранного
  const handleToggleFavorite = (film) => {
    // Проверяем, есть ли фильм в избранном по его уникальному filmId
    const isFavorite = favorites.some((fav) => fav.filmId === film.filmId);

    if (isFavorite) {
      dispatch(removeFromFavorite(film.filmId));
    } else {
      // Отправляем весь объект фильма целиком
      dispatch(addToFavorite(film)); 
    }
  };

  const filteredFilms = films.filter(film => {
    if (!genreFilter.trim()) return true;
    return film.genres?.some(g => 
      g.genre.toLowerCase().includes(genreFilter.toLowerCase())
    );
  });

  return (
    <section className={styles.section}>
      <h2>Поиск и фильтры (API Кинопоиска)</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <Input 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Поиск по названию (например, Матрица)..." 
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Input 
          value={genreFilter} 
          onChange={handleFilterChange} 
          placeholder="Фильтр по жанру (например, боевик)..." 
        />
      </div>
      
      {isLoadingFilms && <p className={styles.loadingMessage}>Ищем в базе...</p>}
      {filmsError && <p className={styles.errorMessage}>Ошибка Кинопоиска: {filmsError}</p>}
      
      {!isLoadingFilms && !filmsError && filteredFilms.length > 0 && (
        <div className={styles.personsGrid}>
          {filteredFilms.map((film) => {
            // Проверяем текущий фильм в цикле: добавлен ли он в Избранное
            const isFavorite = favorites.some((fav) => fav.filmId === film.filmId);

            return (
              <Card key={film.filmId}>
                <div className={styles.personContent} style={{ position: 'relative' }}>
                  
                  {/* Кнопка-сердечко */}
                  <button
                    onClick={() => handleToggleFavorite(film)}
                    title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
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
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {isFavorite ? '❤️' : '🤍'}
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
            );
          })}
        </div>
      )}

      {!isLoadingFilms && !filmsError && films.length > 0 && filteredFilms.length === 0 && (
        <p>Среди найденных фильмов нет жанра «{genreFilter}».</p>
      )}
      {!isLoadingFilms && !filmsError && films.length === 0 && searchQuery && (
        <p>Фильмы по запросу «{searchQuery}» не найдены.</p>
      )}
    </section>
  );
};

export default Movies;