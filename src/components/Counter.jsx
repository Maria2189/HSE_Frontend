import styles from './Counter.module.css'

function Counter() {
  const [count, setCount] = useState(0);

  // Произвольная функция, которая будет вызываться при клике
  const handleIncrement = () => {
    // ВАЖНО: Обновление на основе предыдущего состояния (требование ДЗ)
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className={styles.counterWrapper}>
      <p>Счетчик кликов: {count}</p>
      
      {/* Вешаем обработчик события onClick на кнопку */}
      <button onClick={handleIncrement}>
        Увеличить
      </button>
    </div>
  );
}

export default Counter;