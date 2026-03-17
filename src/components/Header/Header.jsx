import { NavLink } from 'react-router';
import styles from './styles.module.css';

const Header = () => {
  const linkClass = ({ isActive, isPending, isTransitioning }) => {
    return [
      styles.link,
      isActive ? styles.active : '',
      isPending ? styles.pending : '',
      isTransitioning ? styles.transitioning : ''
    ].join(' ');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={linkClass}>Главная (Фильмы)</NavLink>
        <NavLink to="/users" className={linkClass}>Пользователи</NavLink>
        <NavLink to="/posts" className={linkClass}>Посты</NavLink>
      </nav>
    </header>
  );
};

export default Header;