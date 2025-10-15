"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/buy";
  };

  const displayName = user?.user_metadata?.full_name || 
                     user?.user_metadata?.name || 
                     (user?.email ? user.email.split('@')[0] : '') || 
                     'Usuário';

  return (
    <header className="bg-slate-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/buy" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold">Loja Legal</span>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="text-gray-400 text-sm">Carregando...</div>
            ) : user ? (
              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {displayName}
                  </span>
                </div>
                
                {/* Dashboard Link */}
                <Link href="/products">
                  <Button
                    variant="secondary"
                    className="bg-gray-800 hover:bg-gray-700 text-white border-0"
                  >
                    Dashboard
                  </Button>
                </Link>

                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  className="bg-red-600 hover:bg-red-700 text-white border-0 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <Button
                    variant="secondary"
                    className="bg-gray-800 hover:bg-gray-700 text-white border-0"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white border-0">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
