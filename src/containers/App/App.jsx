import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import UserInfo from '../../components/UserInfo/UserInfo';
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

  const [persons, setPersons] = useState([]);
  const [isLoadingPersons, setIsLoadingPersons] = useState(false);
  const [personsError, setPersonsError] = useState(null);

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
    const fetchPersons = async () => {
      setIsLoadingPersons(true);
      setPersonsError(null);
      try {
        const response = await fetch('https://kinopoiskapiunofficial.tech/api/v1/persons?name=Том', {
          method: 'GET',
          headers: {
            'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY, 
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка при получении данных: статус ${response.status}`);
        }

        const data = await response.json();
        setPersons(data.items.slice(0, 8)); // Берем первые 8 результатов
      } catch (err) {
        setPersonsError(err.message);
      } finally {
        setIsLoadingPersons(false);
      }
    };
    fetchPersons();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className="global-title">Моя первая React-структура</h1>
      
      <section className={styles.section}>
        <h2>Актеры и режиссеры (API Кинопоиска)</h2>
        
        {isLoadingPersons && <p className={styles.loadingMessage}>Ищем в базе...</p>}
        {personsError && <p className={styles.errorMessage}>Ошибка Кинопоиска: {personsError}</p>}
        
        {!isLoadingPersons && !personsError && persons.length > 0 && (
          <div className={styles.personsGrid}>
            {persons.map((person) => (
              <Card key={person.kinopoiskId}>
                <div className={styles.personContent}>
                  <img 
                    src={person.posterUrl} 
                    alt={person.nameRu || person.nameEn} 
                    className={styles.personImage} 
                  />
                  <h3 className={styles.personName}>{person.nameRu || person.nameEn}</h3>
                  {person.nameEn && <p className={styles.personNameEn}>{person.nameEn}</p>}
                </div>
              </Card>
            ))}
          </div>
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