import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface OfferCardProps {
  quantity: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  features: string[];
  isSelected: boolean;
  onSelect: (quantity: number) => void;
  isPopular?: boolean;
  productImage?: string;
  productVideo?: string; // URL do vídeo — tem prioridade sobre productImage quando fornecido
}

/**
 * OfferCard Component
 * Design Philosophy: Minimalismo Moderno - Cards limpos com foco em conversão
 * - Tipografia clara (Poppins para títulos, Inter para corpo)
 * - Sombra sutil e borda suave
 * - Animações suaves ao hover e seleção
 * - Feedback visual imediato
 * - Imagens de produtos com gradiente animado
 */
export default function OfferCard({
  quantity,
  price,
  originalPrice,
  discount,
  description,
  features,
  isSelected,
  onSelect,
  isPopular = false,
  productImage,
  productVideo,
}: OfferCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(quantity)}
      className={cn(
        "relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 flex flex-col",
        isSelected
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
          : "border-border bg-card hover:border-primary/50 shadow-sm"
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
        >
          <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold">
            Mais Popular
          </span>
        </motion.div>
      )}

      {/* Selection Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          initial={false}
          animate={{
            scale: isSelected ? 1 : 0,
            opacity: isSelected ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <Check size={16} className="text-primary-foreground" />
        </motion.div>
      </div>

      {/* Product Media — vídeo tem prioridade sobre imagem */}
      {(productVideo || productImage) && (
        <div className="mb-6 -mx-6 -mt-6">
          <BackgroundGradient
            containerClassName="rounded-t-xl overflow-hidden"
            className="rounded-t-xl p-4 bg-white/80 backdrop-blur-sm"
            animate={true}
          >
            <div className="w-full overflow-hidden rounded-lg bg-gray-50">
              {productVideo ? (
                <video
                  src={productVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block"
                />
              ) : (
                <img
                  src={productImage}
                  alt={`${quantity} unidade${quantity > 1 ? "s" : ""}`}
                  className="w-full h-auto block"
                />
              )}
            </div>
          </BackgroundGradient>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-4">
        <h3 className="font-display text-3xl font-bold text-foreground">
          {quantity} {quantity === 1 ? "Unidade" : "Unidades"}
        </h3>
      </div>

      {/* Price Section */}
      <div className="mb-4 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold text-primary">
            R$ {price.toFixed(2).replace(".", ",")}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>
        {discount && (
          <p className="text-sm font-semibold text-primary">
            Economize {discount}%
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-1 flex-shrink-0">✓</span>
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        whileHover={{ backgroundColor: isSelected ? undefined : "rgba(82, 99, 204, 0.1)" }}
        className={cn(
          "w-full py-3 rounded-lg font-semibold transition-all duration-300 mt-auto",
          isSelected
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        {isSelected ? "Selecionado ✓" : "Selecionar"}
      </motion.button>
    </motion.div>
  );
}
