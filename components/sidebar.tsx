"use client";

import { FolderClock, Package, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

type SidebarProps = {
  currentPath: string;
};

export default function Sidebar({ currentPath }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, [supabase]);

  const options = [
    { name: "Produtos", icon: Package, path: "/products" },
    { name: "Pedidos", icon: FolderClock, path: "/orders" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const displayName = user?.user_metadata?.full_name || 
                     user?.user_metadata?.name || 
                     (user?.email ? user.email.split('@')[0] : '') || 
                     'Usuário';

  return (
    <aside className="flex flex-col w-64 min-h-dvh border-r border-gray-700 bg-slate-950">
      {/* Header / User info */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-800">
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <img 
            src="https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="truncate text-md font-semibold text-white">
            {displayName}
          </h2>
          <p className="truncate text-sm text-gray-400">
            {user?.email || 'Carregando...'}
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto text-gray-400">
        <ul className="flex flex-col">
          {options.map(({ name, icon: Icon, path }) => {
            const isActive = path === currentPath;

            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`flex items-center gap-3 p-4 font-semibold text-md transition-colors ${
                    isActive
                      ? "bg-violet-600 text-white"
                      : "hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="shrink-0" />
                  <span className="truncate">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer & Logout */}
      <footer 
        onClick={handleLogout}
        className="flex items-center gap-4 p-4 mt-auto border-t border-gray-800 hover:bg-red-600 hover:text-white cursor-pointer transition-colors"
      >
        <LogOut />
        <button className="font-medium">Sair</button>
      </footer>
    </aside>
  );
}
