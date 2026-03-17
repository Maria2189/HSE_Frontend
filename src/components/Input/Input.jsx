import styles from './styles.module.css'

function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default Input
