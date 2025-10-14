"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import OrdersTable from "@/components/OrdersTable";
import Pagination from "@/components/ui/pagination";
import { Search, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  productName: string;
  productType: string;
  buyerName: string;
  totalPrice: string;
  paymentStatus: "pago" | "pendente" | "falhou";
}

// TODO: Fetch orders from database, this is just sample data
const sampleOrders: Order[] = [
  {
    id: "#ORD-12345",
    productName: "SaaS Pro Plan",
    productType: "saas",
    buyerName: "John Doe",
    totalPrice: "$99.99",
    paymentStatus: "pago",
  },
  {
    id: "#ORD-12346",
    productName: "E-commerce Widget",
    productType: "widget",
    buyerName: "Jane Smith",
    totalPrice: "$49.99",
    paymentStatus: "pendente",
  },
  {
    id: "#ORD-12347",
    productName: "Analytics Plugin",
    productType: "plugin",
    buyerName: "Mike Johnson",
    totalPrice: "$149.99",
    paymentStatus: "falhou",
  },
  {
    id: "#ORD-12348",
    productName: "SaaS Basic Plan",
    productType: "saas",
    buyerName: "Sarah Wilson",
    totalPrice: "$29.99",
    paymentStatus: "pago",
  },
  {
    id: "#ORD-12349",
    productName: "Marketing Widget",
    productType: "widget",
    buyerName: "David Brown",
    totalPrice: "$79.99",
    paymentStatus: "pendente",
  },
];

export default function OrdersPage() {
  const [orders] = useState<Order[]>(sampleOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const resultsPerPage = 5;
  const totalResults = 100; // This would come from your API
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleOrderSelect = (orderIds: string[]) => {
    setSelectedOrders(orderIds);
  };

  const handleExport = () => {
    console.log("Exporting orders:", selectedOrders);
    // TODO: Implement export functionality
  };

  const handleAddNewOrder = () => {
    console.log("Adding new order");
    // TODO: Implement add new order functionality
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.buyerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-950 flex">
      <Sidebar currentPath="/seller/orders" />
      <main className="text-gray-400 w-full">
        {/* Header */}
        <div className="border-b border-gray-800 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-lg font-bold">
                Pedidos dos clientes
              </h1>
              <p className="text-sm mt-2">
                Gerencie e visualize todos os pedidos dos clientes.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleExport}
                className="bg-gray-700 hover:bg-gray-600 text-white border-0"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button
                onClick={handleAddNewOrder}
                className="bg-violet-600 hover:bg-violet-700 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar novo pedido
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-8 py-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Pesquisar pedidos por ID, produto, ou nome do comprador..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="px-8 pb-8">
          <OrdersTable
            orders={filteredOrders}
            onOrderSelect={handleOrderSelect}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
