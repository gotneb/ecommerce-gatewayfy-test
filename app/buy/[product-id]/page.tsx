import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductPurchasePage from "@/components/ProductPurchasePage";
import { productsService } from "@/lib/products";
import Link from "next/link";

interface BuyProductPageProps {
  params: Promise<{
    "product-id": string;
  }>;
}

export async function generateMetadata({ params }: BuyProductPageProps): Promise<Metadata> {
  const { "product-id": productId } = await params;
  
  try {
    const { products: products } = await productsService.getAllActiveProducts();
    const product = products?.find(p => p.id === productId);
    
    if (product) {
      return {
        title: `${product.name} - Comprar Agora`,
        description: product.description || `Compre ${product.name} por apenas R$ ${product.price.toFixed(2)}. Produto de qualidade com pagamento seguro.`,
        keywords: ["comprar", product.name, "e-commerce", "produto", "pagamento seguro"],
        openGraph: {
          title: `${product.name} - Loja Legal`,
          description: product.description || `Compre ${product.name} por apenas R$ ${product.price.toFixed(2)}.`,
          images: product.image_url ? [product.image_url] : ["/og-product.png"],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return {
    title: "Produto não encontrado",
    description: "O produto que você está procurando não foi encontrado.",
  };
}

export default async function BuyProductPage({ 
  params, 
  searchParams 
}: BuyProductPageProps & { searchParams: Promise<{ success?: string }> }) {
  const { "product-id": productId } = await params;
  const { success } = await searchParams;
  
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

  // Show success message if payment was successful
  if (success === 'true') {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-white text-3xl font-bold mb-4">Pagamento Realizado!</h1>
            <p className="text-gray-400 text-lg mb-6">
              Sua compra do produto <strong>{product.name}</strong> foi processada com sucesso.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Você receberá um email de confirmação em breve.
            </p>
            <div className="space-y-3">
              <Link
                href="/buy"
                className="block bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Ver Mais Produtos
              </Link>
              <Link
                href="/"
                className="block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Voltar ao Início
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <ProductPurchasePage product={productForComponent} />
      <Footer />
    </div>
  );
}
