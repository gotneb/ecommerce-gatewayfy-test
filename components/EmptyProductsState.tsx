"use client";

import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyProductsStateProps {
  onAddProduct: () => void;
}

export default function EmptyProductsState({ onAddProduct }: EmptyProductsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg">
          <ShoppingCart className="w-12 h-12 text-white" />
        </div>
        {/* Plus icon overlay */}
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center shadow-md">
          <Plus className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Seus produtos aparecerão aqui
      </h2>

      {/* Description */}
      <p className="text-gray-400 text-center mb-8 max-w-md leading-relaxed">
        Comece adicionando seu primeiro produto para vê-lo no seu dashboard.
      </p>

      {/* Add Product Button */}
      <Button
        onClick={onAddProduct}
        className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
      >
        Adicionar novo produto
      </Button>
    </div>
  );
}
