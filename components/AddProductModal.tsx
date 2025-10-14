"use client";

import { useState, useRef } from "react";
import { X, Upload, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (productData: {
    title: string;
    description: string;
    price: string;
    quantity: number;
    imageUrl?: string;
  }) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "0.00",
    quantity: 1,
    imageUrl: "",
  });

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuantityChange = (operation: "increase" | "decrease") => {
    setFormData(prev => ({
      ...prev,
      quantity: operation === "increase" 
        ? prev.quantity + 1 
        : Math.max(1, prev.quantity - 1)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulate file handling
      console.log("File dropped:", e.dataTransfer.files[0]);
      // TODO: Implement actual file upload
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0]);
      // TODO: Implement actual file upload
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(formData);
    onClose();
    // Reset form
    setFormData({
      title: "",
      description: "",
      price: "0.00",
      quantity: 1,
      imageUrl: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Adicionar novo produto</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="text-white text-sm font-medium">
              Imagem do produto
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? "border-violet-400 bg-violet-900/20" 
                  : "border-gray-600"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-white text-sm mb-2">
                Arraste e solte a imagem do produto aqui, ou clique para navegar.
              </p>
              <p className="text-gray-400 text-xs mb-4">
                PNG, JPG, GIF up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-700 hover:bg-gray-600 text-white border-0"
              >
                Upload de imagem
              </Button>
            </div>
          </div>

          {/* Product Title */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
              placeholder="Título do produto"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 resize-none"
              placeholder="Descrição do produto"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Preço
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Quantidade
            </label>
            <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg">
              <button
                type="button"
                onClick={() => handleQuantityChange("decrease")}
                className="p-3 text-white hover:bg-gray-700 rounded-l-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center py-3 text-white font-medium">
                {formData.quantity}
              </div>
              <button
                type="button"
                onClick={() => handleQuantityChange("increase")}
                className="p-3 text-white hover:bg-gray-700 rounded-r-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white border-0"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white border-0"
            >
              Adicionar Produto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
