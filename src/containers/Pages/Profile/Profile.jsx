// src/containers/Pages/Profile/Profile.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../../store/userSlice';
import styles from './styles.module.css';

const Profile = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSaved, setIsSaved] = useState(false); // Состояние для показа уведомления
  const dispatch = useDispatch();

  // Получаем текущее имя из стора, чтобы показать его в профиле
  const currentName = useSelector((state) => state.user.name);

  const handleSave = () => {
    if (inputValue.trim() === '') return; // Защита от сохранения пустой строки

    dispatch(setUserName(inputValue));
    setInputValue('');

    // Показываем сообщение об успехе на 3 секунды
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Профиль</h1>

      {currentName && (
        <p style={{ marginBottom: '20px' }}>
          Текущее имя в системе: <strong>{currentName}</strong>
        </p>
      )}

      <div className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Введите ваше имя"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={styles.button} onClick={handleSave}>
          Сохранить
        </button>
      </div>

      {isSaved && (
        <div className={styles.successMessage}>
          Имя успешно сохранено! Обратите внимание на шапку сайта.
        </div>
      )}
    </div>
  );
};

export default Profile;