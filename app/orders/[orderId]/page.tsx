import Sidebar from "@/components/sidebar";
import OrderDetailsPage from "@/components/OrderDetailsPage";

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

// TODO: Fetch from database
const sampleOrderDetails: OrderDetails[] = [
  {
    id: "#ORD-12345",
    productName: "Premium SaaS Plan",
    description: "Our most popular plan for growing businesses, offering advanced features and priority support.",
    price: "R$99,00",
    status: "pago",
    customerName: "Olivia Rhye",
    email: "olivia@example.com",
    phone: "(+55) 11 99999-9999",
    shippingAddress: {
      street: "123 Main Street",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      country: "Brasil",
    },
    billingAddress: "Same as shipping address",
  },
  {
    id: "#ORD-12346",
    productName: "Basic SaaS Plan",
    description: "Perfect for small teams getting started with essential features and support.",
    price: "R$49,00",
    status: "pendente",
    customerName: "João Silva",
    email: "joao@example.com",
    phone: "(+55) 21 88888-8888",
    shippingAddress: {
      street: "456 Oak Avenue",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20000-000",
      country: "Brasil",
    },
    billingAddress: "Same as shipping address",
  },
  {
    id: "#ORD-12347",
    productName: "Enterprise SaaS Plan",
    description: "Comprehensive solution for large organizations with advanced needs and dedicated support.",
    price: "R$199,00",
    status: "falhou",
    customerName: "Maria Santos",
    email: "maria@example.com",
    phone: "(+55) 31 77777-7777",
    shippingAddress: {
      street: "789 Pine Street",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "30000-000",
      country: "Brasil",
    },
    billingAddress: "Same as shipping address",
  },
];

interface OrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderDetailsRoute({ params }: OrderDetailsPageProps) {
  const { orderId } = await params;
  
  // Find the order by ID (handle both with and without # symbol)
  const order = sampleOrderDetails.find(o => o.id === orderId || o.id === `#${orderId}`);
  
  // If order not found, show 404
  if (!order) {
    return (
      <div className="bg-slate-950 flex min-h-screen">
        <Sidebar currentPath="/orders" />
        <div className="flex items-center justify-center w-full">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold mb-4">Pedido não encontrado</h1>
            <p className="text-gray-400 text-lg">O pedido que você está procurando não existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 flex">
      <Sidebar currentPath="/orders" />
      <main className="w-full">
        <OrderDetailsPage order={order} />
      </main>
    </div>
  );
}

