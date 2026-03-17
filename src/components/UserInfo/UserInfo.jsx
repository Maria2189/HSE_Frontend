import { useState } from 'react'
import styles from './styles.module.css'

function UserInfo({ name, profession }) {
  const [likes, setLikes] = useState(0)

  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.profession}>{profession}</p>
      <button className={styles.likeBtn} onClick={() => setLikes((n) => n + 1)}>
        ♥ {likes > 0 ? likes : 'Нравится'}
      </button>
    </div>
  )
}

export default UserInfo
