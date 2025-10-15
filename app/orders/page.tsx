"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import OrdersTable from "@/components/OrdersTable";
import Pagination from "@/components/ui/pagination";
import { Search, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order, ordersService } from "@/lib/orders";

interface TableOrder {
  id: string;
  productName: string;
  productType: string;
  buyerName: string;
  totalPrice: string;
  paymentStatus: "pago" | "pendente" | "falhou";
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const resultsPerPage = 5;

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedOrders = await ordersService.getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar pedidos');
      console.error('Error loading orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert database orders to table format
  const convertOrdersToTableFormat = (orders: Order[]): TableOrder[] => {
    return orders.map(order => ({
      id: `#${order.id}`,
      productName: order.product_name || 'Produto não encontrado',
      productType: 'product', // Default type since we don't have product types in our schema
      buyerName: order.customer_name,
      totalPrice: `R$ ${order.total_amount.toFixed(2)}`,
      paymentStatus: order.payment_status === 'paid' ? 'pago' : 
                    order.payment_status === 'pending' ? 'pendente' : 'falhou'
    }));
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.product_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tableOrders = convertOrdersToTableFormat(filteredOrders);
  const totalResults = filteredOrders.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedOrders = tableOrders.slice(startIndex, endIndex);

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

  return (
    <div className="bg-slate-950 flex">
      <Sidebar currentPath="/orders" />
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
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-400">Carregando pedidos...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-red-400">Erro: {error}</div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-400">Nenhum pedido encontrado</div>
            </div>
          ) : (
            <>
              <OrdersTable
                orders={paginatedOrders}
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}
