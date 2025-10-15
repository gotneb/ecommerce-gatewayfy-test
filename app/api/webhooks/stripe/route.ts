import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

const webhookSecret = process.env.NEXT_STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    console.log('Webhook received - Body length:', body.length);
    console.log('Webhook received - Signature present:', !!signature);
    console.log('Webhook secret present:', !!webhookSecret);
    console.log('Webhook secret starts with:', webhookSecret?.substring(0, 10) + '...');

    if (!webhookSecret || !signature) {
      console.error('Missing webhook secret or signature');
      console.error('Webhook secret exists:', !!webhookSecret);
      console.error('Signature exists:', !!signature);
      return NextResponse.json({ error: 'Webhook configuration error' }, { status: 400 });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('Webhook event constructed successfully:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle successful payment
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const metadata = paymentIntent.metadata;

      console.log('Payment succeeded:', paymentIntent.id);
      console.log('Payment metadata:', JSON.stringify(metadata, null, 2));

      // Create order in database
      try {
        const supabase = await createClient();
        
        console.log('Supabase client created, fetching product:', metadata.productId);
        
        // Get the product details
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('user_id')
          .eq('id', metadata.productId)
          .single();

        if (productError) {
          console.error('Error fetching product:', productError);
          return NextResponse.json({ error: `Product fetch error: ${productError.message}` }, { status: 500 });
        }

        if (!product) {
          console.error('Product not found for order creation:', metadata.productId);
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        console.log('Product found, user_id:', product.user_id);

        // Prepare order data
        const orderData = {
          product_id: metadata.productId,
          user_id: product.user_id, // Seller ID
          customer_name: metadata.buyerName,
          customer_email: metadata.buyerEmail,
          customer_address: metadata.buyerAddress,
          quantity: 1,
          total_amount: paymentIntent.amount / 100, // Convert from cents
          payment_status: 'paid' as const,
          payment_provider: 'stripe',
          payment_reference: paymentIntent.id,
        };

        console.log('Creating order with data:', JSON.stringify(orderData, null, 2));

        // Create order record
        const { error: orderError } = await supabase
          .from('orders')
          .insert(orderData);

        if (orderError) {
          console.error('Error creating order:', orderError);
          return NextResponse.json({ error: `Failed to create order: ${orderError.message}` }, { status: 500 });
        }

        console.log('Order created successfully for payment:', paymentIntent.id);

      } catch (dbError) {
        console.error('Database error during order creation:', dbError);
        const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error';
        return NextResponse.json({ error: `Database error: ${errorMessage}` }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Internal server error: ${errorMessage}` }, { status: 500 });
  }
}
