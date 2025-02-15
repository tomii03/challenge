import { Middleware } from "@reduxjs/toolkit"
import { RootState } from "../index"

export const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action)
  
  if (action.type.startsWith('favorites/')) {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites))
  }
  
  return result
} 