"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/ui/status-badge";

interface OrderDetails {
  id: string;
  productName: string;
  description: string;
  price: string;
  status: "pago" | "pendente" | "falhou";
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: string;
}

interface OrderDetailsPageProps {
  order: OrderDetails;
}

export default function OrderDetailsPage({ order }: OrderDetailsPageProps) {
  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/seller/orders" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para pedidos
          </Link>
          
          <h1 className="text-white text-3xl font-bold mb-2">
            Detalhes do pedido
          </h1>
          <p className="text-gray-400 text-lg">
            {order.id}
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Details Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">
              Detalhes do produto
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-white text-lg font-bold mb-2">
                  {order.productName}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {order.description}
                </p>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Preço</p>
                    <span className="text-white text-lg font-bold">
                      {order.price}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Status</p>
                    <StatusBadge status={order.status}>
                      {order.status === "pago" ? "Pago" : 
                       order.status === "pendente" ? "Pendente" : "Falhou"}
                    </StatusBadge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">
              Informações do cliente
            </h2>
            
            <div className="space-y-6">
              {/* Customer Basic Info */}
              <div>
                <h3 className="text-white text-lg font-bold mb-2">
                  {order.customerName}
                </h3>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">{order.email}</p>
                  <p className="text-gray-300 text-sm">{order.phone}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-white font-bold mb-2">
                  Endereço de entrega
                </h4>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h4 className="text-white font-bold mb-2">
                  Endereço de cobrança
                </h4>
                <p className="text-gray-300 text-sm">
                  {order.billingAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

