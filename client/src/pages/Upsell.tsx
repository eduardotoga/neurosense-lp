import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

// Link do checkout Luna — Massageador de Ombro
const OMBRO_CHECKOUT = "https://checkout.neurosenseloja.com/checkout?product=47755d7c-2251-11f1-b2a5-46da4690ad53";
const THANK_YOU_URL = "/obrigado";

// Timer: 10 minutos em segundos
const TIMER_SECONDS = 10 * 60;

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return { mm, ss, expired: remaining <= 0 };
}

export default function Upsell() {
  const { mm, ss, expired } = useCountdown(TIMER_SECONDS);

  const handleAccept = () => {
    window.location.href = OMBRO_CHECKOUT;
  };

  const handleDecline = () => {
    window.location.href = THANK_YOU_URL;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de confirmação */}
      <div className="bg-green-600 text-white text-center py-3 px-4">
        <p className="font-semibold text-sm">
          ✓ Parabéns! Seu pedido foi confirmado. Verifique a oferta exclusiva abaixo.
        </p>
      </div>

      <main className="container py-10 max-w-2xl mx-auto">
        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {expired ? (
            <p className="text-destructive font-semibold">
              Esta oferta expirou.
            </p>
          ) : (
            <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-6 py-3">
              <span className="text-red-600 font-medium text-sm">
                Esta oferta expira em
              </span>
              <span className="font-display font-bold text-2xl text-red-600 tabular-nums">
                {mm}:{ss}
              </span>
            </div>
          )}
        </motion.div>

        {/* Card da oferta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border-2 border-primary rounded-xl overflow-hidden shadow-lg shadow-primary/10"
        >
          {/* Header */}
          <div className="bg-primary px-6 py-4 text-center">
            <p className="text-primary-foreground text-xs uppercase tracking-widest font-semibold mb-1">
              Oferta Única — Não Será Exibida Novamente
            </p>
            <h2 className="font-display font-bold text-primary-foreground text-2xl">
              Complete Seu Tratamento
            </h2>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="flex gap-5 mb-6">
              <div className="w-28 h-28 rounded-xl bg-gray-100 border border-border overflow-hidden flex-shrink-0">
                <img src="/images/ombro.png" alt="Massageador de Ombro" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-xl mb-1">
                  Massageador de Ombro
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  A mesma tecnologia que alivia neuropatia nos pés — agora para
                  ombros tensos, má postura e compressão nervosa.
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-bold text-primary text-3xl">
                    R$ 197,00
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    R$ 479,80
                  </span>
                </div>
                <p className="text-xs font-semibold text-green-600 mt-1">
                  60% de desconto — somente agora
                </p>
              </div>
            </div>

            {/* Benefícios */}
            <ul className="space-y-2 mb-6">
              {[
                "Pés ✓ (já garantido)",
                "Joelhos — tratamento complementar",
                "Ombros ← complete agora o tratamento completo",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAccept}
                disabled={expired}
                className="w-full py-4 rounded-xl font-display font-bold text-base bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sim, quero adicionar por R$ 197,00 →
              </motion.button>

              <button
                onClick={handleDecline}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
              >
                <X size={14} />
                Não, obrigado — finalizar pedido sem o ombro
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trust */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          ✓ Pagamento 100% seguro &nbsp;|&nbsp; Garantia de 30 dias
        </p>
      </main>
    </div>
  );
}
