/* eslint-disable @next/next/no-img-element */
"use client"

import "@/styles/components/favorites.css"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { useState } from "react"
import { toggleFavorite } from "@/store/features/favorites-slice"
import { useCart } from "@/context/cart-context"
import { Heart, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Toast } from "@/components/ui/toast"

export function Favorites() {
  const { items } = useAppSelector(state => state.favorites)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { addItem } = useCart()
  const [notification, setNotification] = useState<{
    message: string;
    type: "cart" | "favorite" | null;
  }>({ message: "", type: null })

  const handleAddToCart = (item: typeof items[0]) => {
    addItem(item)
    setNotification({
      message: `${item.titulo} agregado al carrito`,
      type: "cart"
    })
    setTimeout(() => {
      setNotification({ message: "", type: null })
    }, 3000)
  }

  const handleRemoveFavorite = (item: typeof items[0]) => {
    dispatch(toggleFavorite(item))
    setNotification({
      message: `${item.titulo} eliminado de favoritos`,
      type: "favorite"
    })
    setTimeout(() => {
      setNotification({ message: "", type: null })
    }, 3000)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="favorites-trigger">
            <Heart className="w-5 h-5" />
            {items.length > 0 && (
              <Badge variant="secondary" className="favorites-badge">
                {items.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Favoritos</SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="favorites-empty">
              <Heart className="favorites-empty-icon" />
              <p>No tienes favoritos guardados</p>
            </div>
          ) : (
            <ScrollArea className="favorites-items-container">
              <div className="space-y-6">
                {items.map((item: { id: string; imagen: string; titulo: string }) => (
                  <div key={item.id} className="favorites-item">
                    <img src={item.imagen} alt={item.titulo} className="favorites-item-image" />
                    <div className="favorites-item-content">
                      <h3 className="favorites-item-title">{item.titulo}</h3>
                      <div className="favorites-item-actions flex items-center gap-4 mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          className="favorites-item-button gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Agregar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFavorite(item)}
                          className="favorites-item-remove gap-2 text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>

      {notification.type && (
        <Toast
          message={notification.message}
          variant={notification.type}
          onClose={() => setNotification({ message: "", type: null })}
        />
      )}
    </>
  )
} 