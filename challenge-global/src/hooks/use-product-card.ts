import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/features/favorites-slice";

interface ProductCardHookProps {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
}

export function useProductCard({ id, titulo, precio, imagen }: ProductCardHookProps) {
  const { addItem } = useCart();
  const [notification, setNotification] = useState<{
    message: string;
    type: "cart" | "favorite" | null;
  }>({ message: "", type: null });
  const [showDetail, setShowDetail] = useState(false);
  
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item: { id: number }) => item.id === id);

  const handleAddToCart = () => {
    addItem({ id, titulo, precio, imagen });
    setNotification({
      message: `${titulo} agregado al carrito`,
      type: "cart",
    });
    setTimeout(() => {
      setNotification({ message: "", type: null });
    }, 3000);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ id, titulo, imagen }));
    setNotification({
      message: `${titulo} ${isFavorite ? "eliminado de" : "agregado a"} favoritos`,
      type: "favorite",
    });
    setTimeout(() => {
      setNotification({ message: "", type: null });
    }, 3000);
  };

  const clearNotification = () => setNotification({ message: "", type: null });

  return {
    notification,
    showDetail,
    isFavorite,
    setShowDetail,
    handleAddToCart,
    handleToggleFavorite,
    clearNotification,
  };
} 