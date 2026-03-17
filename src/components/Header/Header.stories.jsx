import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Header from './Header'
import favoritesReducer from '../../store/favoritesSlice'
import userReducer from '../../store/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
})

export default {
  title: 'My Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
}

export const Default = {}
