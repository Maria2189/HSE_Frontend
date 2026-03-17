import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserName } from '../../../store/userSlice'
import styles from './styles.module.css'

const Profile = () => {
  const [inputValue, setInputValue] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const dispatch = useDispatch()
  const currentName = useSelector((state) => state.user.name)

  const handleSave = () => {
    if (inputValue.trim() === '') return
    dispatch(setUserName(inputValue))
    setInputValue('')
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
  }

  return (
    <div className={styles.section}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Профиль</h1>
        <p className={styles.pageSubtitle}>Настройте своё отображаемое имя</p>
      </div>

      {currentName && (
        <div className={styles.currentName}>
          <span>Текущее имя:</span>
          <strong>{currentName}</strong>
        </div>
      )}

      <label className={styles.label}>Имя пользователя</label>
      <div className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Введите ваше имя..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.button} onClick={handleSave}>
          Сохранить
        </button>
      </div>

      {isSaved && (
        <div className={styles.successMessage}>
          ✓ Имя сохранено — загляните в шапку сайта
        </div>
      )}
    </div>
  )
}

export default Profile
