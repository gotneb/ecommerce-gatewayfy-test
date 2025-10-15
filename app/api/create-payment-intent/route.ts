import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { productsService } from '@/lib/products';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, buyerInfo } = body;

    // Validate required fields
    if (!productId || !buyerInfo) {
      return NextResponse.json(
        { error: 'Product ID and buyer info are required' },
        { status: 400 }
      );
    }

    // Fetch product details
    const { product, error: productError } = await productsService.getProductById(productId);
    
    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(product.price * 100), // Convert to cents
      currency: 'brl', // Brazilian Real
      metadata: {
        productId: product.id,
        productName: product.name,
        buyerEmail: buyerInfo.email,
        buyerName: buyerInfo.fullName,
        buyerAddress: buyerInfo.streetAddress,
        buyerCity: buyerInfo.city,
        buyerState: buyerInfo.state,
        buyerZipCode: buyerInfo.zipCode,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
