/* eslint-disable @next/next/no-img-element */
"use client";

import "@/styles/components/product-card.css";
import { Heart, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductDetailModal } from "./product-detail-modal";
import { Toast } from "@/components/ui/toast";
import { useProductCard } from "@/hooks/use-product-card";

interface ProductCardProps {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  rating: number;
  categoria: string;
}

export function ProductCard({
  id,
  titulo,
  descripcion,
  precio,
  imagen,
  rating,
  categoria,
}: ProductCardProps) {
  const {
    notification,
    showDetail,
    isFavorite,
    setShowDetail,
    handleAddToCart,
    handleToggleFavorite,
    clearNotification,
  } = useProductCard({ id, titulo, precio, imagen });

  return (
    <>
      <Card className="product-card">
        <CardHeader className="p-0">
          <div className="product-card-image-container">
            <img src={imagen} alt={titulo} className="product-card-image" />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className="product-card-favorite-button"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
                }`}
              />
            </Button>
            <div className="product-card-category-container">
              <Badge
                variant="secondary"
                className="product-card-category-badge"
              >
                {categoria}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="product-card-content">
          <h3
            className="product-card-title cursor-pointer hover:text-blue-600"
            onClick={() => setShowDetail(true)}
          >
            {titulo}
          </h3>
          <div className="product-card-description">
            <p className="product-card-description">{descripcion}</p>
          </div>

          <div className="product-card-footer">
            <p className="product-card-price">${precio.toFixed(2)}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        product={{ titulo, descripcion, precio, imagen, rating, categoria }}
        handleAddToCart={handleAddToCart}
      />

      {notification.type && (
        <Toast
          message={notification.message}
          variant={notification.type}
          onClose={clearNotification}
        />
      )}
    </>
  );
}
