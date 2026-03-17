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
        setPosts(data.slice(0, 4)) // Берем 4 поста для компактности
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
      <h2>Список постов (JSONPlaceholder)</h2>
      {isLoadingPosts && <p className={styles.loadingMessage}>Загрузка постов...</p>}
      {postsError && <p className={styles.errorMessage}>Ошибка: {postsError}</p>}
      {!isLoadingPosts && !postsError && posts.length > 0 && (
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <Card key={post.id}>
              <div className={styles.postContent}>
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
