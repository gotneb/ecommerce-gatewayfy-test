import { loadStripe } from '@stripe/stripe-js';
import { getStripePublishableKey } from './stripe';

// Initialize Stripe on the client side
export const getStripe = () => {
  return loadStripe(getStripePublishableKey());
};
