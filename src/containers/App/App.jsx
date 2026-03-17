import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import UserInfo from '../../components/UserInfo/UserInfo';
import Input from '../../components/Input/Input';
import styles from './styles.module.css';

const usersData = [
  { id: 1, name: "Антон Сергеенков", profession: "Старший фронтенд-разработчик" },
  { id: 2, name: "Мария", profession: "Студент" },
  { id: 3, name: "Иван", profession: "Дизайнер" }
];

function App() {
  const [showList, setShowList] = useState(true);

  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(null);

  const [films, setFilms] = useState([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(false);
  const [filmsError, setFilmsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Матрица'); 
  const [genreFilter, setGenreFilter] = useState('');       

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true);
      setPostsError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();
        setPosts(data.slice(0, 4)); // Берем 4 поста для компактности
      } catch (err) {
        setPostsError(err.message);
      } finally {
        setIsLoadingPosts(false); 
      }
    };
    fetchPosts();
  }, []); 

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

  const filteredFilms = films.filter(film => {
    if (!genreFilter.trim()) return true;
    
    return film.genres?.some(g => 
      g.genre.toLowerCase().includes(genreFilter.toLowerCase())
    );
  });

  return (
    <div className={styles.wrapper}>
      <h1 className="global-title">Моя первая React-структура</h1>

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
            {filteredFilms.map((film) => (
              <Card key={film.filmId}>
                <div className={styles.personContent}>
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

        {!isLoadingFilms && !filmsError && films.length > 0 && filteredFilms.length === 0 && (
          <p>Среди найденных фильмов нет жанра «{genreFilter}».</p>
        )}
        {!isLoadingFilms && !filmsError && films.length === 0 && searchQuery && (
          <p>Фильмы по запросу «{searchQuery}» не найдены.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2>Список пользователей</h2>
        <button 
          className={styles.toggleBtn} 
          onClick={() => setShowList(prev => !prev)}
        >
          {showList ? 'Скрыть список' : 'Показать список'}
        </button>

        <div className={styles.usersContainer}>
          {showList ? (
            usersData.map((user) => (
              <Card key={user.id}>
                <UserInfo name={user.name} profession={user.profession} />
              </Card>
            ))
          ) : (
            <p>Список скрыт. Нажмите кнопку, чтобы отобразить элементы.</p>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Список постов (JSONPlaceholder)</h2>
        {isLoadingPosts && <p className={styles.loadingMessage}>Загрузка постов...</p>}
        {postsError && <p className={styles.errorMessage}>Ошибка: {postsError}</p>}
        {!isLoadingPosts && !postsError && posts.length > 0 && (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <Card key={post.id}>
                <div className={styles.postContent}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postBody}>{post.body}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default App;