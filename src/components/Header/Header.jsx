import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';

const Header = () => {
  const userName = useSelector((state) => state.user.name);
  const favoritesCount = useSelector((state) => state.favorites.length); 

  const linkClass = ({ isActive }) => {
    return [
      styles.link,
      isActive ? styles.active : '',
    ].join(' ');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={linkClass}>Фильмы</NavLink>
        <NavLink to="/users" className={linkClass}>Пользователи</NavLink>
        <NavLink to="/posts" className={linkClass}>Посты</NavLink>
        <NavLink to="/profile" className={linkClass}>Профиль</NavLink>
      </nav>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <NavLink to="/favorites" className={styles.favoritesContainer}>
          <span className={styles.favoritesIcon}>❤️</span>
          <span>Избранное</span>
          {favoritesCount > 0 && (
            <div className={styles.favoritesBadge}>{favoritesCount}</div>
          )}
        </NavLink>

        <div className={styles.greeting}>
          Привет, {userName ? <strong>{userName}</strong> : 'Гость'}!
        </div>
      </div>
    </header>
  );
};

export default Header;