import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pago" | "pendente" | "falhou";
  children: React.ReactNode;
}

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusStyles = {
    pago: "bg-green-600 text-white",
    pendente: "bg-orange-500 text-white", 
    falhou: "bg-red-600 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusStyles[status]
      )}
    >
      {children}
    </span>
  );
}
