import { useState } from 'react'
import Card from '../../../components/Card/Card'
import UserInfo from '../../../components/UserInfo/UserInfo'
import styles from './styles.module.css'

const usersData = [
  { id: 1, name: 'Антон Сергеенков', profession: 'Старший фронтенд-разработчик' },
  { id: 2, name: 'Мария', profession: 'Студент' },
  { id: 3, name: 'Иван', profession: 'Дизайнер' },
]

const Users = () => {
  const [showList, setShowList] = useState(true)

  return (
    <section className={styles.section}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Пользователи</h2>
        <button className={styles.toggleBtn} onClick={() => setShowList((prev) => !prev)}>
          {showList ? 'Скрыть список' : 'Показать список'}
        </button>
      </div>

      {showList ? (
        <div className={styles.grid}>
          {usersData.map((user) => (
            <Card key={user.id}>
              <UserInfo name={user.name} profession={user.profession} />
            </Card>
          ))}
        </div>
      ) : (
        <p className={styles.hiddenMessage}>Список скрыт — нажмите кнопку, чтобы отобразить.</p>
      )}
    </section>
  )
}

export default Users
