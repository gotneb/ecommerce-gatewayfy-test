"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import ProductCard from "@/components/ProductCard";
import EditProductModal from "@/components/EditProductModal";
import DeleteProductModal from "@/components/DeleteProductModal";
import AddProductModal from "@/components/AddProductModal";
import EmptyProductsState from "@/components/EmptyProductsState";
import { SquarePlus } from "lucide-react";
import { Product, CreateProductData } from "@/lib/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveProduct = (updatedProduct: any) => {
    // Convert the old Product interface to our new Product interface
    const mappedProduct: Product = {
      id: updatedProduct.id,
            user_id: selectedProduct?.user_id || "",
      name: updatedProduct.title,
      description: updatedProduct.description,
      price: parseFloat(updatedProduct.price),
      image_url: updatedProduct.imageUrl,
      status: selectedProduct?.status || 'active'
    };
    
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? mappedProduct : product
      )
    );
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(product => product.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleAddProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-slate-950 flex">
      <Sidebar currentPath="/products" />
      <main className="text-gray-400 w-full">
        <div className="border-b border-gray-800 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-lg font-bold">
                Meus Produtos
              </h1>
              <p className="text-sm mt-2">
                Aqui é possível criar novos produtos para a sua loja, editá-los
                ou até mesmo excluir.
              </p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 text-lg font-medium rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              <SquarePlus />
            </button>
          </div>
        </div>
        
        {/* Products Grid or Empty State */}
        <div className="p-8">
          {products.length === 0 ? (
            <EmptyProductsState onAddProduct={() => setIsAddModalOpen(true)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  description={product.description || ""}
                  price={product.price.toString()}
                  imageUrl={product.image_url}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct ? {
          id: selectedProduct.id,
          title: selectedProduct.name,
          description: selectedProduct.description || "",
          price: selectedProduct.price.toString(),
          imageUrl: selectedProduct.image_url
        } : null}
        onSave={handleSaveProduct}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        productTitle={selectedProduct?.name}
        onConfirm={handleConfirmDelete}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={(productData) => {
          // Convert CreateProductData to Product-like object for local state
          const newProduct: Product = {
            id: Date.now().toString(), // Temporary ID until we get real one
            user_id: "", // Will be set by service
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image_url: productData.image_url,
            status: productData.status || 'active'
          };
          handleAddProduct(newProduct);
        }}
      />
    </div>
  );
}
