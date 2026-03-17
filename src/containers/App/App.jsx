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


  useEffect(() => {
    console.log('Компонент App смонтирован (Монтирование)');
    
    return () => {
      console.log('Компонент App удален (Размонтирование)');
    };
  }, []); 


  useEffect(() => {
    console.log(`Компонент App обновлен. Статус showList: ${showList}`);
  }, [showList]);


  return (
    <div className={styles.wrapper}>
      <h1 className="global-title">Моя первая React-структура</h1>
      
      <img 
        src="https://placehold.co/100x100/3b82f6/white?text=Img" 
        alt="Тестовое изображение" 
        style={{ marginBottom: '10px', borderRadius: '8px' }}
      />

      <div className={styles.bgImage}></div>

      <button 
        className={styles.toggleBtn} 
        onClick={() => setShowList(prev => !prev)}
      >
        {showList ? 'Скрыть список' : 'Показать список'}
      </button>

      <div>
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
    </div>
  );
}

export default App;