import { useState } from 'react';
import styles from './styles.module.css'; 

function UserInfo({ name, profession }) {
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.profession}>Профессия: {profession}</p>
      <button className={styles.likeBtn} onClick={handleLikeClick}>
        Лайки: {likes}
      </button>
    </div>
  );
}

export default UserInfo;