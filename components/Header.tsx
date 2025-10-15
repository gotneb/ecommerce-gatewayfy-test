"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-slate-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold">Loja Legal</span>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              className="bg-gray-800 hover:bg-gray-700 text-white border-0"
            >
              Entrar
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white border-0">
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
