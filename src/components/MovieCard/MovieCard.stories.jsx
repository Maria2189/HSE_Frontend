import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import MovieCard from './MovieCard'
import favoritesReducer from '../../store/favoritesSlice'
import userReducer from '../../store/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
})

const mockFilm = {
  filmId: 1,
  nameRu: 'Матрица',
  year: 1999,
  posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg',
  genres: [{ genre: 'фантастика' }, { genre: 'боевик' }],
}

export default {
  title: 'UI-Kit/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ maxWidth: 300 }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
}

export const Default = {
  args: {
    film: mockFilm,
  },
}

export const WithoutPoster = {
  args: {
    film: {
      ...mockFilm,
      posterUrlPreview: 'https://via.placeholder.com/150x200?text=No+Poster',
      nameRu: 'Фильм без постера',
    },
  },
}
