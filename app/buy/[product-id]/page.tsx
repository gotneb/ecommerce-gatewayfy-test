import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductPurchasePage from "@/components/ProductPurchasePage";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

// TODO: Fetch from database
const sampleProducts: Product[] = [
  {
    id: "analytics-pro",
    title: "Analytics Pro Dashboard",
    description: "Unlock powerful insights with our intuitive and comprehensive analytics dashboard.",
    price: "$49",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: "saas-basic",
    title: "SaaS Basic Plan",
    description: "Perfect for small teams getting started with essential features and support.",
    price: "$29",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: "ecommerce-widget",
    title: "E-commerce Widget",
    description: "Boost your online sales with our powerful e-commerce integration tools.",
    price: "$79",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
];

interface BuyProductPageProps {
  params: Promise<{
    "product-id": string;
  }>;
}

export default async function BuyProductPage({ params }: BuyProductPageProps) {
  const { "product-id": productId } = await params;
  
  // Find the product by ID
  const product = sampleProducts.find(p => p.id === productId);
  
  // If product not found, show 404
  if (!product) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-400 text-lg">The product you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <ProductPurchasePage product={product} />
      <Footer />
    </div>
  );
}
