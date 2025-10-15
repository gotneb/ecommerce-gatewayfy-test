"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productsService } from "@/lib/products";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
  productId?: string;
  onConfirm: () => void;
}

export default function DeleteProductModal({
  isOpen,
  onClose,
  productTitle,
  productId,
  onConfirm,
}: DeleteProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!productId) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await productsService.deleteProduct(productId);
      
      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }

      // Success - call the parent's onConfirm to refresh the list
      onConfirm();
      onClose();
    } catch (err) {
      setError("Erro inesperado ao excluir produto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md mx-4">
        {/* Warning Icon */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="w-16 h-16 bg-violet-800 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center px-6 pb-4">
          <h2 className="text-xl font-bold text-white mb-3">
            Confirmar Deleção
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Você tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.
          </p>
          {productTitle && (
            <p className="text-violet-400 text-sm mt-2 font-medium">
              "{productTitle}"
            </p>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-6 mb-4">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-6 pb-8 space-y-3">
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white border-0 disabled:opacity-50"
          >
            {isLoading ? "Excluindo..." : "Confirmar"}
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
            disabled={isLoading}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white border-0 disabled:opacity-50"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
