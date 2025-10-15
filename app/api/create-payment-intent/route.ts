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

    // Validate amount
    const amountInCents = Math.round(product.price * 100);
    if (amountInCents < 50) { // Minimum $0.50
      return NextResponse.json(
        { error: 'Amount too small. Minimum amount is $0.50' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'brl',
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
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
