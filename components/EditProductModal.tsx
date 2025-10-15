"use client";

import { useState, useEffect, useRef } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productsService, CreateProductData } from "@/lib/products";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: () => void;
}

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onSave,
}: EditProductModalProps) {
  const [formData, setFormData] = useState<CreateProductData>({
    name: "",
    description: "",
    price: 0,
    image_url: "",
    status: "active",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.title,
        description: product.description,
        price: parseFloat(product.price) || 0,
        image_url: product.imageUrl || "",
        status: "active",
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const { product: updatedProduct, error } = await productsService.updateProduct(product.id, formData);
      
      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }

      if (updatedProduct) {
        onSave();
        onClose();
      }
    } catch {
      setError("Erro inesperado ao atualizar produto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateProductData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handlePriceChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    handleInputChange("price", numericValue);
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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const { url, error } = await productsService.uploadImage(file);
      
      if (error) {
        setError(error);
      } else if (url) {
        handleInputChange("image_url", url);
      }
    } catch {
      setError("Erro inesperado ao fazer upload da imagem");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border border-gray-700 rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Editar produto</h2>
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
              {formData.image_url ? (
                <div className="relative w-full h-48">
                  <Image
                    src={formData.image_url}
                    alt="Product preview"
                    width={300}
                    height={192}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleInputChange("image_url", "")}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
              placeholder="Nome do produto"
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
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
              placeholder="Preço (ex: 29.99)"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
              className="bg-gray-700 hover:bg-gray-600 text-white border-0 disabled:opacity-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-violet-600 hover:bg-violet-700 text-white border-0 disabled:opacity-50"
            >
              {isLoading ? "Salvando..." : "Salvar mudanças"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
