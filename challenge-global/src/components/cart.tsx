"use client"

import "@/styles/components/cart.css"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="cart-trigger">
          <ShoppingCart className="w-5 h-5" />
          {items.length > 0 && (
            <Badge variant="secondary" className="cart-badge">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrito</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart className="cart-empty-icon" />
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <ScrollArea className="cart-items-container">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.imagen} alt={item.titulo} className="cart-item-image" />
                    <div className="cart-item-content">
                      <h3 className="cart-item-title">{item.titulo}</h3>
                      <p className="cart-item-price">${item.precio}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.cantidad - 1))}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-600">
                            {item.cantidad}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total</span>
                <span className="text-lg font-medium text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Button 
                className="w-full"
                onClick={() => {
                  alert("Procesando compra...")
                }}
              >
                Proceder al pago
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
} 