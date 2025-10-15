import Stripe from 'stripe';

if (!process.env.NEXT_STRIPE_SECRET_KEY) {
  throw new Error('NEXT_STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
});

export const getStripePublishableKey = () => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set in environment variables');
  }
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};
