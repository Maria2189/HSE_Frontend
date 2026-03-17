import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import favoritesReducer from './favoritesSlice'

const USER_KEY = 'userName'
const FAVORITES_KEY = 'favoriteMovies'

const loadUser = () => {
  try {
    const serializedUser = localStorage.getItem(USER_KEY)
    if (serializedUser === null) {
      return { name: '' }
    }
    return JSON.parse(serializedUser)
  } catch (err) {
    return { name: '' }
  }
}

const saveUser = (user) => {
  try {
    const serializedUser = JSON.stringify(user)
    localStorage.setItem(USER_KEY, serializedUser)
  } catch (err) {
    // Игнорируем ошибки записи
  }
}

const loadFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem(FAVORITES_KEY)
    if (serializedFavorites === null) {
      return []
    }
    return JSON.parse(serializedFavorites)
  } catch (err) {
    return []
  }
}

const saveFavorites = (favorites) => {
  try {
    const serializedFavorites = JSON.stringify(favorites)
    localStorage.setItem(FAVORITES_KEY, serializedFavorites)
  } catch (err) {
    // Игнорируем ошибки записи
  }
}

const preloadedState = {
  user: loadUser(),
  favorites: loadFavorites(),
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveUser(store.getState().user)
})

store.subscribe(() => {
  saveFavorites(store.getState().favorites)
})
