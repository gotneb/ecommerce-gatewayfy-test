"use client";

import Sidebar from "@/components/sidebar";
import ProductCard from "@/components/ProductCard";
import { SquarePlus } from "lucide-react";

// TODO: Fetch from database
const sampleProducts = [
  {
    id: "1",
    title: "Basic Plan",
    description: "Ideal for small teams and startups getting off the ground.",
    price: "$29/mo",
    imageUrl: undefined, // Will show placeholder icon
  },
  {
    id: "2",
    title: "Premium Product",
    description: "Perfect for established businesses looking to scale their operations.",
    price: "$99/mo",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Enterprise Solution",
    description: "Comprehensive solution for large organizations with advanced needs.",
    price: "$299/mo",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
  },
];

export default function ProductsPage() {
  const handleEdit = (id: string) => {
    console.log("Edit product:", id);
    // TODO: Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log("Delete product:", id);
    // TODO: Implement delete functionality
  };

  return (
    <div className="bg-slate-950 flex">
      <Sidebar currentPath="/seller/products" />
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
            <button className="text-white flex gap-2 bg-blue-500 px-6 py-4 rounded-xl hover:bg-blue-600 transition-colors">
              <SquarePlus />
              <h4 className="text-md">Add produto</h4>
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
