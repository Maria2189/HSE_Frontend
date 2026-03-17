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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error(`Ошибка при получении данных: статус ${response.status}`);
        }

        const data = await response.json();
        setPosts(data.slice(0, 10)); // Берем только первые 10 постов для компактности
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className="global-title">Моя первая React-структура</h1>
      
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
        
        {isLoading && <p className={styles.loadingMessage}>Загрузка постов...</p>}
        
        {error && <p className={styles.errorMessage}>Упс! Произошла ошибка: {error}</p>}
        
        {!isLoading && !error && posts.length > 0 && (
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