import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  imageUrl?: string;
  title: string;
  description: string;
  price: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ProductCard({
  id,
  imageUrl,
  title,
  description,
  price,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
      {/* Product Image Section */}
      <div className="bg-black h-48 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-violet-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Product Content Section */}
      <div className="p-6 bg-gray-800">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        
        {/* Price */}
        <div className="text-2xl font-bold text-violet-600 mb-6">
          R${price}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 bg-gray-800">
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit?.(id)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-0"
          >
            <Edit className="w-4 h-4" />
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete?.(id)}
            className="flex-1 bg-red-700 hover:bg-red-600 text-white border-0"
          >
            <Trash2 className="w-4 h-4" />
            Deletar
          </Button>
        </div>
      </div>
    </div>
  );
}