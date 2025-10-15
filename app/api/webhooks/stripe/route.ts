import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!webhookSecret || !signature) {
      console.error('Missing webhook secret or signature');
      return NextResponse.json({ error: 'Webhook configuration error' }, { status: 400 });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle successful payment
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const metadata = paymentIntent.metadata;

      console.log('Payment succeeded:', paymentIntent.id);

      // Create order in database
      try {
        const supabase = await createClient();
        
        // Get the product details
        const { data: product } = await supabase
          .from('products')
          .select('user_id')
          .eq('id', metadata.productId)
          .single();

        if (!product) {
          console.error('Product not found for order creation:', metadata.productId);
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Create order record
        const { error: orderError } = await supabase
          .from('orders')
          .insert({
            product_id: metadata.productId,
            user_id: product.user_id, // Seller ID
            customer_name: metadata.buyerName,
            customer_email: metadata.buyerEmail,
            customer_address: metadata.buyerAddress,
            quantity: 1,
            total_amount: paymentIntent.amount / 100, // Convert from cents
            payment_status: 'paid',
            payment_provider: 'stripe',
            payment_reference: paymentIntent.id,
          });

        if (orderError) {
          console.error('Error creating order:', orderError);
          return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
        }

        console.log('Order created successfully for payment:', paymentIntent.id);

      } catch (dbError) {
        console.error('Database error during order creation:', dbError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
