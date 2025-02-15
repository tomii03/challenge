"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface CartItem {
  id: number
  titulo: string
  precio: number
  imagen: string
  cantidad: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "cantidad">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, cantidad: number) => void
  clearCart: () => void
  total: number
}

const CART_STORAGE_KEY = 'shopping-cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error al cargar el carrito:', error)
      }
    }
    setIsLoading(false)
  }, [])


  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoading])

  const addItem = (newItem: Omit<CartItem, "cantidad">) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id)
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...currentItems, { ...newItem, cantidad: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, cantidad: number) => {
    setItems(currentItems => {
      if (cantidad <= 0) {
        return currentItems.filter(item => item.id !== id)
      }
      return currentItems.map(item =>
        item.id === id ? { ...item, cantidad } : item
      )
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  if (isLoading) {
    return null 
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 