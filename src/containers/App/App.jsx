import { Outlet } from 'react-router'
import Header from '../../components/Header/Header'
import styles from './styles.module.css'

function App() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default App

