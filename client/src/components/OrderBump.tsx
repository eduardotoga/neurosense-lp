import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type BumpOption = null | "joelho1" | "joelho2";

interface OrderBumpProps {
  selectedBump: BumpOption;
  onSelect: (bump: BumpOption) => void;
  joelhoImage?: string;
}

/**
 * OrderBump Component
 * Exibe oferta complementar do Massageador de Joelho antes do checkout.
 * Aparece após o cliente selecionar a quantidade do produto principal.
 */
export default function OrderBump({
  selectedBump,
  onSelect,
  joelhoImage,
}: OrderBumpProps) {
  const toggle = (option: "joelho1" | "joelho2") => {
    onSelect(selectedBump === option ? null : option);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-xl border-2 border-green-500 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-green-600 px-5 py-3">
        <p className="text-white font-bold text-sm uppercase tracking-wider text-center">
          ⚡ Oferta Especial — Adicione antes de finalizar
        </p>
      </div>

      {/* Body */}
      <div className="bg-yellow-50 p-6">
        {/* Product presentation */}
        <div className="flex gap-4 mb-5">
          {joelhoImage ? (
            <img
              src={joelhoImage}
              alt="Massageador de Joelho"
              className="w-20 h-20 object-contain rounded-lg bg-white border border-orange-200 flex-shrink-0"
            />
          ) : (
            // Placeholder até receber a imagem real
            <div className="w-20 h-20 rounded-lg bg-white border border-orange-200 flex-shrink-0 flex items-center justify-center text-orange-300 text-xs text-center leading-tight p-1">
              imagem joelho
            </div>
          )}
          <div>
            <h3 className="font-display font-bold text-foreground text-lg leading-tight mb-1">
              Massageador de Joelho
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Complemento Anti-Dor. A mesma tecnologia que alivia seus pés —
              vibração + calor + ativação muscular — agora para os joelhos.
            </p>
            <p className="text-xs font-medium text-green-700">
              ✓ Trate as 3 principais áreas afetadas pela má circulação de uma vez
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 1 Joelho */}
          <div
            onClick={() => toggle("joelho1")}
            className={cn(
              "relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200",
              selectedBump === "joelho1"
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-white hover:border-primary/40"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-foreground text-sm">
                  1 Unidade
                </p>
                <p className="font-display font-bold text-primary text-2xl mt-0.5">
                  R$ 197,00
                </p>
              </div>
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  selectedBump === "joelho1"
                    ? "border-primary bg-primary"
                    : "border-border"
                )}
              >
                {selectedBump === "joelho1" && (
                  <Check size={14} className="text-white" />
                )}
              </div>
            </div>
          </div>

          {/* 2 Joelhos */}
          <div
            onClick={() => toggle("joelho2")}
            className={cn(
              "relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200",
              selectedBump === "joelho2"
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-white hover:border-primary/40"
            )}
          >
            {/* Badge */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
              <span className="bg-green-600 text-white text-xs px-3 py-0.5 rounded-full font-semibold whitespace-nowrap">
                Melhor Valor
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-foreground text-sm">
                  2 Unidades
                </p>
                <p className="font-display font-bold text-primary text-2xl mt-0.5">
                  R$ 277,00
                </p>
                <p className="text-xs text-muted-foreground">
                  R$ 138,50 cada
                </p>
              </div>
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  selectedBump === "joelho2"
                    ? "border-primary bg-primary"
                    : "border-border"
                )}
              >
                {selectedBump === "joelho2" && (
                  <Check size={14} className="text-white" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skip link — aparece apenas se algo estiver selecionado */}
        {selectedBump && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => onSelect(null)}
            className="mt-3 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Não, obrigado — seguir sem o complemento
          </motion.button>
        )}
      </div>
    </motion.section>
  );
}
