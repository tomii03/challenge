import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FavoriteItem {
  id: number
  titulo: string
  imagen: string
}

interface FavoritesState {
  items: FavoriteItem[]
}

const initialState: FavoritesState = {
  items: []
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(action.payload)
      }
    },
    clearFavorites: (state) => {
      state.items = []
    }
  }
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer 