import Sidebar from "@/components/sidebar";
import OrderDetailsPage from "@/components/OrderDetailsPage";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface OrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

// Map database payment status to component status
function mapPaymentStatus(status: 'pending' | 'paid' | 'failed'): "pago" | "pendente" | "falhou" {
  switch (status) {
    case 'paid':
      return 'pago';
    case 'pending':
      return 'pendente';
    case 'failed':
      return 'falhou';
    default:
      return 'pendente';
  }
}

export default async function OrderDetailsRoute({ params }: OrderDetailsPageProps) {
  const { orderId } = await params;
  
  try {
    // Create server-side Supabase client
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('User not authenticated:', userError);
      notFound();
    }

    // Fetch specific order with product details
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        products!inner(
          name,
          image_url
        )
      `)
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      if (error.code === 'PGRST116') {
        notFound(); // Order not found
      }
      throw new Error(`Failed to fetch order: ${error.message}`);
    }

    // If order not found, show 404
    if (!order) {
      notFound();
    }

    // Convert database order to component interface
    const orderDetails = {
      id: order.id,
      productName: order.products?.name || 'Produto',
      description: 'Produto adquirido através da plataforma',
      price: `R$ ${order.total_amount.toFixed(2).replace('.', ',')}`,
      status: mapPaymentStatus(order.payment_status),
      customerName: order.customer_name || 'Cliente',
      email: order.customer_email || 'email@example.com',
      phone: '(00) 00000-0000', // Not stored in current schema
      shippingAddress: {
        street: order.customer_address || 'Endereço não informado',
        city: 'Cidade',
        state: 'Estado',
        zipCode: '00000-000',
        country: 'Brasil',
      },
      billingAddress: order.customer_address || 'Endereço de cobrança não informado',
    };

    return (
      <div className="bg-slate-950 flex">
        <Sidebar currentPath="/orders" />
        <main className="w-full">
          <OrderDetailsPage order={orderDetails} />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching order:', error);
    notFound();
  }
}

