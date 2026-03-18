import { motion } from "motion/react";
import { ShoppingCart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpsellItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  icon: React.ReactNode;
  badge?: string | null;
}

interface UpsellSectionProps {
  title: string;
  subtitle?: string;
  items: UpsellItem[];
  onAddUpsell: (itemId: string) => void;
  selectedUpsells: Set<string>;
}

/**
 * UpsellSection Component
 * Design Philosophy: Minimalismo Moderno - Seção de upsell limpa e não agressiva
 * - Apresenta produtos complementares de forma elegante
 * - Animações suaves para chamar atenção sem ser intrusivo
 * - Foco em valor agregado, não em pressão de venda
 */
export default function UpsellSection({
  title,
  subtitle,
  items,
  onAddUpsell,
  selectedUpsells,
}: UpsellSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-8 border-t border-border"
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => {
          const isSelected = selectedUpsells.has(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => onAddUpsell(item.id)}
              className={cn(
                "relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-300",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/15"
                  : "border-border bg-card hover:border-primary/30 shadow-sm"
              )}
            >
              {/* Badge */}
              {item.badge && (
                <div className="absolute -top-2 -right-2">
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                    <Zap size={12} />
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Icon and Title */}
              <div className="flex items-start gap-3 mb-2">
                <div className="text-primary mt-1 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground mb-3 ml-7">
                {item.description}
              </p>

              {/* Price and Button */}
              <div className="flex items-center justify-between ml-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-primary">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      R$ {item.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  <ShoppingCart size={16} />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
