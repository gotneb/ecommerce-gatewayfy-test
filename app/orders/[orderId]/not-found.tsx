import Sidebar from "@/components/sidebar";
import { Link } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-slate-950 flex min-h-screen">
      <Sidebar currentPath="/orders" />
      <div className="flex items-center justify-center w-full">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-4">Pedido não encontrado</h1>
          <p className="text-gray-400 text-lg mb-8">O pedido que você está procurando não existe ou foi removido.</p>
          <Link
            href="/orders" 
            className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
          >
            Voltar para Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}
