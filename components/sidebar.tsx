import { FolderClock, Package, User, LogOut } from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  currentPath: string;
};

export default function Sidebar({ currentPath }: SidebarProps) {
  const options = [
    { name: "Produtos", icon: Package, path: "/seller/products" },
    { name: "Pedidos", icon: FolderClock, path: "/seller/orders" },
  ];

  return (
    <aside className="flex flex-col w-64 min-h-dvh border-r border-gray-800 bg-gray-950">
      {/* Header / User info */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-800">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="truncate text-md font-semibold">Gabriel Bento</h2>
          <p className="truncate text-sm text-gray-500">
            gabrielorigenstdb@gmail.com
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
                      ? "bg-white text-blue-500"
                      : "hover:bg-white hover:text-blue-500"
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
      <footer className="flex items-center gap-4 p-4 mt-auto border-t border-gray-800 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors">
        <LogOut />
        <button className="font-medium">Sair</button>
      </footer>
    </aside>
  );
}
