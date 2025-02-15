/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../styles/components/product-modal.css";
import pagosImg from "../img/pagos.png";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    rating: number;
    categoria: string;
  };
  handleAddToCart: () => void;
}

export function ProductDetailModal({
  isOpen,
  onClose,
  product,
  handleAddToCart,
}: ProductDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="product-detail-modal">
        <DialogHeader>
          <DialogTitle>{product.titulo}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="product-image">
            <img
              src={product.imagen}
              alt={product.titulo}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="product-info">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                Categoría:
              </span>
              <span className="text-sm">{product.categoria}</span>
            </div>

            <p className="text-gray-600">{product.descripcion}</p>

            <div className="product-rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < product.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">
                ({product.rating} de 5)
              </span>
            </div>

            <div className="product-price">${product.precio.toFixed(2)}</div>

            <div className="extra-description">
              <p className="text-sm text-gray-600">Métodos de pago aceptados</p>
              <img
                src={pagosImg.src}
                alt="Medios de Pago"
                className="mx-auto w-32"
              />
              <div>
                <p className="text-sm text-green-600">Llega gratis hoy</p>
              </div>
            </div>
            
            <Button onClick={handleAddToCart} size="sm" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Agregar</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
