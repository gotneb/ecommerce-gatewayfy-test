"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Package, Monitor, BarChart3, Box } from "lucide-react";
import StatusBadge from "@/components/ui/status-badge";

interface Order {
  id: string;
  productName: string;
  productType: string;
  buyerName: string;
  totalPrice: string;
  paymentStatus: "pago" | "pendente" | "falhou";
}

interface OrdersTableProps {
  orders: Order[];
  onOrderSelect: (orderIds: string[]) => void;
}

const getProductIcon = (type: string) => {
  switch (type) {
    case "saas":
      return <Box className="w-4 h-4 text-blue-400" />;
    case "widget":
      return <Monitor className="w-4 h-4 text-green-400" />;
    case "plugin":
      return <BarChart3 className="w-4 h-4 text-purple-400" />;
    default:
      return <Package className="w-4 h-4 text-gray-400" />;
  }
};

export default function OrdersTable({ orders, onOrderSelect }: OrdersTableProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allOrderIds = orders.map(order => order.id);
      setSelectedOrders(allOrderIds);
      onOrderSelect(allOrderIds);
    } else {
      setSelectedOrders([]);
      onOrderSelect([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    let newSelected;
    if (checked) {
      newSelected = [...selectedOrders, orderId];
    } else {
      newSelected = selectedOrders.filter(id => id !== orderId);
    }
    setSelectedOrders(newSelected);
    onOrderSelect(newSelected);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === orders.length && orders.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-violet-600 bg-gray-700 border-gray-600 rounded focus:ring-violet-500 focus:ring-2"
                />
              </th>
              <th className="px-6 py-4 text-left text-white font-medium">ID do pedido</th>
              <th className="px-6 py-4 text-left text-white font-medium">Produto</th>
              <th className="px-6 py-4 text-left text-white font-medium">Nome do comprador</th>
              <th className="px-6 py-4 text-left text-white font-medium">Preço total</th>
              <th className="px-6 py-4 text-left text-white font-medium">Status de pagamento</th>
              <th className="px-6 py-4 text-left text-white font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                    className="w-4 h-4 text-violet-600 bg-gray-700 border-gray-600 rounded focus:ring-violet-500 focus:ring-2"
                  />
                </td>
                <td className="px-6 py-4">
                  <Link 
                    href={`/seller/orders/${order.id.replace('#', '')}`}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    {order.id}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {getProductIcon(order.productType)}
                    <span className="text-white">{order.productName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">{order.buyerName}</td>
                <td className="px-6 py-4 text-white">R${order.totalPrice}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.paymentStatus}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </StatusBadge>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
