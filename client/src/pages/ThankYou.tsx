import { motion } from "motion/react";
import { Check, Package, Mail } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        {/* Ícone de confirmação */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
        >
          <Check size={40} className="text-green-600" />
        </motion.div>

        <h1 className="font-display text-3xl font-bold text-foreground mb-3">
          Pedido Confirmado!
        </h1>
        <p className="text-muted-foreground mb-8 text-base leading-relaxed">
          Obrigado pela sua compra. Seu tratamento Neuro Sense está a caminho
          e em breve você sentirá a diferença.
        </p>

        {/* Próximos passos */}
        <div className="bg-card border border-border rounded-xl p-6 text-left space-y-4 mb-8">
          <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-wide">
            O que acontece agora?
          </h2>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                Confirmação por e-mail
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Você receberá os detalhes do pedido no e-mail cadastrado no checkout.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Package size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                Envio em até 24h úteis
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Seu pedido será preparado e enviado com código de rastreio.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Dúvidas? Entre em contato pelo e-mail de suporte informado na confirmação.
        </p>
      </motion.div>
    </div>
  );
}
