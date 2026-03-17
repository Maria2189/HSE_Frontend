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

  const [films, setFilms] = useState([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(false);
  const [filmsError, setFilmsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Матрица');

  const [filterQuery, setFilterQuery] = useState('');

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

        if (!response.ok) throw new Error(`Ошибка: статус ${response.status}`);

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

  const handleFilterChange = (e) => setFilterQuery(e.target.value);

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
    user.profession.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <h1 className="global-title">Моя первая React-структура</h1>

      <section className={styles.section}>
        <h2>Поиск фильмов (API Кинопоиска)</h2>
        
        <Input 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Введите название фильма..." 
        />
        
        {isLoadingFilms && <p className={styles.loadingMessage}>Ищем фильмы...</p>}
        {filmsError && <p className={styles.errorMessage}>Ошибка: {filmsError}</p>}
        
        {!isLoadingFilms && !filmsError && films.length > 0 && (
          <div className={styles.personsGrid}>
            {films.map((film) => (
              <Card key={film.filmId}>
                <div className={styles.personContent}>
                  <img 
                    src={film.posterUrlPreview} 
                    alt={film.nameRu} 
                    className={styles.personImage} 
                  />
                  <h3 className={styles.personName}>{film.nameRu}</h3>
                  <p className={styles.personNameEn}>{film.year} год</p>
                </div>
              </Card>
            ))}
          </div>
        )}
        {!isLoadingFilms && !filmsError && films.length === 0 && searchQuery && (
           <p>Фильмы не найдены.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2>Список пользователей (Локальный фильтр)</h2>
        
        <Input 
          value={filterQuery} 
          onChange={handleFilterChange} 
          placeholder="Фильтр по имени или профессии..." 
        />

        <button 
          className={styles.toggleBtn} 
          onClick={() => setShowList(prev => !prev)}
        >
          {showList ? 'Скрыть список' : 'Показать список'}
        </button>

        <div className={styles.usersContainer}>
          {showList ? (
            filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Card key={user.id}>
                  <UserInfo name={user.name} profession={user.profession} />
                </Card>
              ))
            ) : (
              <p>Пользователи не найдены.</p>
            )
          ) : (
            <p>Список скрыт. Нажмите кнопку, чтобы отобразить элементы.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;