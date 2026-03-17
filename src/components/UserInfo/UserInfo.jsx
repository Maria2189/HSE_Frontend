import { useState } from 'react';
import styles from './styles.module.css'; 

function UserInfo({ name, profession }) {
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <div className={styles.info}>
      <h2>{name}</h2>
      <p>Профессия: {profession}</p>
      <button onClick={handleLikeClick}>Лайки: {likes}</button>
    </div>
  );
}

export default UserInfo;