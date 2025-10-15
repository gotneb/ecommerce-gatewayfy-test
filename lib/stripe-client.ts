import { loadStripe } from '@stripe/stripe-js';

// Get the publishable key from the environment
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set in environment variables');
}

// Initialize Stripe on the client side
export const getStripe = () => {
  if (!publishableKey) {
    throw new Error('Stripe configuration error. Please contact support.');
  }
  
  return loadStripe(publishableKey);
};
