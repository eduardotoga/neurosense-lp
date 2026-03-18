import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BumpItem {
  label: string;
  price: number;
}

interface OrderSummaryProps {
  productLabel: string;
  productPrice: number;
  bumpItems: BumpItem[];
  total: number;
  onContinue: () => void;
  isLoading?: boolean;
}

/**
 * OrderSummary — rodapé fixo compacto.
 * Mostra apenas o nome do produto selecionado e o botão CTA.
 * Mantém presença mínima para não cobrir o Order Bump.
 */
export default function OrderSummary({
  productLabel,
  productPrice,
  bumpItems,
  total,
  onContinue,
  isLoading = false,
}: OrderSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-xl"
    >
      <div className="container py-3 flex items-center gap-4">
        {/* Linha do produto — compacta */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {productLabel}
            {bumpItems.length > 0 && (
              <span className="text-muted-foreground font-normal">
                {" "}+ {bumpItems.length === 1 ? "Joelho" : "Joelhos"}
              </span>
            )}
          </p>
          <p className="text-xs text-primary font-bold">
            R$ {total.toFixed(2).replace(".", ",")}
          </p>
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          disabled={isLoading}
          className={cn(
            "flex-shrink-0 px-5 py-2.5 rounded-lg font-display font-bold text-sm transition-all duration-300",
            "bg-primary text-primary-foreground shadow-md shadow-primary/30",
            "hover:shadow-lg hover:shadow-primary/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center gap-2"
          )}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Finalizar Compra
              <ArrowRight size={16} />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
