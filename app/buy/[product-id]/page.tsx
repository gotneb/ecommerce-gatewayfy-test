import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductPurchasePage from "@/components/ProductPurchasePage";
import { productsService } from "@/lib/products";

interface BuyProductPageProps {
  params: Promise<{
    "product-id": string;
  }>;
}

export default async function BuyProductPage({ params }: BuyProductPageProps) {
  const { "product-id": productId } = await params;
  
  // Fetch product from database
  const { product, error } = await productsService.getProductById(productId);
  
  // If product not found or error, show 404
  if (!product || error) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold mb-4">Produto não encontrado</h1>
            <p className="text-gray-400 text-lg">O produto que você está procurando não existe ou não está mais disponível.</p>
            {error && (
              <p className="text-red-400 text-sm mt-2">Erro: {error}</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Convert database product to component interface
  const productForComponent = {
    id: product.id,
    title: product.name,
    description: product.description || "",
    price: `R$ ${product.price.toFixed(2)}`,
    imageUrl: product.image_url
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <ProductPurchasePage product={productForComponent} />
      <Footer />
    </div>
  );
}
