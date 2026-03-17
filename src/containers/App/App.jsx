import { Outlet } from 'react-router';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      
      <h1 className="global-title">Моя первая React-структура</h1>
      
      <Outlet /> 
    </div>
  );
}

export default App;