import { configureStore } from "@reduxjs/toolkit"
import favoritesReducer from "./features/favorites-slice"
import { localStorageMiddleware } from "./middleware/localStorage"

// Cargar estado inicial de localStorage
let preloadedState = {}
if (typeof window !== 'undefined') {
  const savedFavorites = localStorage.getItem('favorites')
  if (savedFavorites) {
    preloadedState = {
      favorites: JSON.parse(savedFavorites)
    }
  }
}

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 