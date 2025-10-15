"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product, productsService } from "@/lib/products";
import Link from "next/link";

export default function BuyPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { products: fetchedProducts, error } = await productsService.getAllActiveProducts();
      
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

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nossos Produtos
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Escolha um plano que funcione para você
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    onClick={loadAllProducts}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">Nenhum produto disponível</h3>
                  <p className="text-gray-400">Não há produtos ativos no momento.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/buy/${product.id}`}
                    className="group"
                  >
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl transition-all duration-300 hover:shadow-violet-500/20 hover:border-violet-500/50 hover:scale-105">
                      {/* Product Image */}
                      <div className="mb-6">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="text-sm opacity-80">Sem imagem</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                          {product.name}
                        </h3>
                        
                        {product.description && (
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <span className="text-gray-400 ml-1">/mês</span>
                        </div>

                        <div className="mt-6">
                          <div className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors group-hover:bg-violet-500">
                            Comprar Agora
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
