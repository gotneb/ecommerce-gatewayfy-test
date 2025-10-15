"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ProductCard from "@/components/ProductCard";
import EditProductModal from "@/components/EditProductModal";
import DeleteProductModal from "@/components/DeleteProductModal";
import AddProductModal from "@/components/AddProductModal";
import EmptyProductsState from "@/components/EmptyProductsState";
import { SquarePlus } from "lucide-react";
import { Product, CreateProductData, productsService } from "@/lib/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { products: fetchedProducts, error } = await productsService.getProducts();
      
      if (error) {
        setError(error);
        console.error('Error loading products:', error);
      } else {
        setProducts(fetchedProducts || []);
      }
    } catch (err) {
      setError('Erro inesperado ao carregar produtos');
      console.error('Unexpected error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveProduct = (updatedProduct: any) => {
    // Refresh products list from database to get the updated product
    loadProducts();
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
    // Refresh products list from database after successful deletion
    loadProducts();
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = (product: Product) => {
    // Refresh products list from database to get the real product with ID
    loadProducts();
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
        
        {/* Products Grid, Loading, Error, or Empty State */}
        <div className="p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
                <p className="text-gray-400">Carregando produtos...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={loadProducts}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          ) : products.length === 0 ? (
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
        productId={selectedProduct?.id}
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
