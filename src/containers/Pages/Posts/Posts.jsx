import { useState, useEffect } from 'react'
import Card from '../../../components/Card/Card'
import styles from './styles.module.css'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [postsError, setPostsError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true)
      setPostsError(null)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`)
        const data = await response.json()
        setPosts(data.slice(0, 4))
      } catch (err) {
        setPostsError(err.message)
      } finally {
        setIsLoadingPosts(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Посты</h2>
        <p className={styles.pageSubtitle}>JSONPlaceholder · демо-данные</p>
      </div>

      {isLoadingPosts && <p className={styles.loadingMessage}>Загрузка...</p>}
      {postsError && <p className={styles.errorMessage}>Ошибка: {postsError}</p>}

      {!isLoadingPosts && !postsError && posts.length > 0 && (
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <Card key={post.id}>
              <div className={styles.postContent}>
                <span className={styles.postIndex}>#{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postBody}>{post.body}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

export default Posts
