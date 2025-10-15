import { createClient } from "@/lib/supabase/client";

export interface Order {
  id: string;
  product_id: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  customer_address: string | null;
  quantity: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed';
  payment_provider: string | null;
  payment_reference: string | null;
  created_at: string;
  // Joined data from products table
  product_name?: string;
  product_image_url?: string;
}

class OrdersService {
  private supabase = createClient();

  async getOrders(): Promise<Order[]> {
    console.log('OrdersService: Fetching orders for authenticated user');
    
    try {
      // Get authenticated user
      const { data: { user }, error: userError } = await this.supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('OrdersService: User not authenticated:', userError);
        throw new Error('User not authenticated');
      }

      console.log('OrdersService: User authenticated:', user.id);

      // Fetch orders with product details
      const { data: orders, error } = await this.supabase
        .from('orders')
        .select(`
          *,
          products!inner(
            name,
            image_url
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('OrdersService: Error fetching orders:', error);
        throw new Error(`Failed to fetch orders: ${error.message}`);
      }

      console.log('OrdersService: Orders fetched successfully:', orders?.length || 0);

      // Transform the data to include product details
      const transformedOrders = orders?.map(order => ({
        ...order,
        product_name: order.products?.name,
        product_image_url: order.products?.image_url,
      })) || [];

      return transformedOrders;
    } catch (error) {
      console.error('OrdersService: Unexpected error:', error);
      throw error;
    }
  }

  async getOrderById(id: string): Promise<Order | null> {
    console.log('OrdersService: Fetching order by ID:', id);
    
    try {
      // Get authenticated user
      const { data: { user }, error: userError } = await this.supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('OrdersService: User not authenticated:', userError);
        throw new Error('User not authenticated');
      }

      // Fetch specific order with product details
      const { data: order, error } = await this.supabase
        .from('orders')
        .select(`
          *,
          products!inner(
            name,
            image_url
          )
        `)
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('OrdersService: Error fetching order:', error);
        if (error.code === 'PGRST116') {
          return null; // Order not found
        }
        throw new Error(`Failed to fetch order: ${error.message}`);
      }

      console.log('OrdersService: Order fetched successfully:', order?.id);

      // Transform the data to include product details
      const transformedOrder = {
        ...order,
        product_name: order.products?.name,
        product_image_url: order.products?.image_url,
      };

      return transformedOrder;
    } catch (error) {
      console.error('OrdersService: Unexpected error:', error);
      throw error;
    }
  }

  async updateOrderStatus(id: string, status: 'pending' | 'paid' | 'failed'): Promise<void> {
    console.log('OrdersService: Updating order status:', id, status);
    
    try {
      // Get authenticated user
      const { data: { user }, error: userError } = await this.supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('OrdersService: User not authenticated:', userError);
        throw new Error('User not authenticated');
      }

      const { error } = await this.supabase
        .from('orders')
        .update({ payment_status: status })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('OrdersService: Error updating order status:', error);
        throw new Error(`Failed to update order status: ${error.message}`);
      }

      console.log('OrdersService: Order status updated successfully');
    } catch (error) {
      console.error('OrdersService: Unexpected error:', error);
      throw error;
    }
  }
}

export const ordersService = new OrdersService();
