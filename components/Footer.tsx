import { Facebook, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © 2025 Loja Legal. Todos os direitos reservados.
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
