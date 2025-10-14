"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

interface ProductPurchasePageProps {
  product: Product;
}

// Zod validation schema
const buyerInfoSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  streetAddress: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  zipCode: z.string().min(5, "CEP deve ter pelo menos 5 caracteres"),
});

type BuyerInfo = z.infer<typeof buyerInfoSchema>;

export default function ProductPurchasePage({ product }: ProductPurchasePageProps) {
  const [formData, setFormData] = useState<BuyerInfo>({
    fullName: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BuyerInfo, string>>>({});

  const handleInputChange = (field: keyof BuyerInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleBuyNow = () => {
    try {
      // Validate form data
      const validatedData = buyerInfoSchema.parse(formData);
      
      console.log("Processing purchase for:", product.id);
      console.log("Validated buyer info:", validatedData);
      
      // TODO: Implement payment processing
      alert("Compra processada com sucesso!");
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof BuyerInfo, string>> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof BuyerInfo] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Display - Left Section */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Image */}
              <div className="flex-1">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p>Product Image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
                <div className="text-3xl font-bold">
                  {product.price}
                  <span className="text-xl font-normal text-gray-400">/month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Information Form - Right Section */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
            <h2 className="text-white text-2xl font-bold mb-6">Informações do comprador</h2>
            
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                    errors.fullName 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-gray-600 focus:border-violet-500"
                  }`}
                  placeholder="Digite seu nome completo"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Endereço de email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                    errors.email 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-gray-600 focus:border-violet-500"
                  }`}
                  placeholder="Digite seu endereço de email"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                  className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                    errors.streetAddress 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-gray-600 focus:border-violet-500"
                  }`}
                  placeholder="Digite seu endereço"
                />
                {errors.streetAddress && (
                  <p className="text-red-400 text-xs mt-1">{errors.streetAddress}</p>
                )}
              </div>

              {/* City and State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                      errors.city 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-600 focus:border-violet-500"
                    }`}
                    placeholder="Digite sua cidade"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                      errors.state 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-600 focus:border-violet-500"
                    }`}
                    placeholder="Digite seu estado"
                  />
                  {errors.state && (
                    <p className="text-red-400 text-xs mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  CEP
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                    errors.zipCode 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-gray-600 focus:border-violet-500"
                  }`}
                  placeholder="Digite seu CEP"
                />
                {errors.zipCode && (
                  <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>
                )}
              </div>

              {/* Buy Now Button */}
              <Button
                onClick={handleBuyNow}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 text-lg font-medium rounded-lg"
              >
                Comprar agora
              </Button>

              {/* Security Message */}
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>Pagamento seguro via Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
