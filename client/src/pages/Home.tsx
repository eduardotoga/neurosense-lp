import { useState } from "react";
import { motion } from "motion/react";
import OfferCard from "@/components/OfferCard";
import OrderSummary from "@/components/OrderSummary";

const CHECKOUT_LINKS: Record<number, string> = {
  1: "https://pagamento.neurosenseloja.com/checkout?product=cbf7ea28-2cce-11f1-b2a5-46da4690ad53",
  2: "https://pagamento.neurosenseloja.com/checkout?product=ca6e2ff6-2cce-11f1-b2a5-46da4690ad53",
  3: "https://pagamento.neurosenseloja.com/checkout?product=c89fbaca-2cce-11f1-b2a5-46da4690ad53",
};

// ─── Features compartilhadas entre todos os cards ────────────────────────────
const PRODUCT_FEATURES = [
  "Terapia tripla: vibração + calor + ativação muscular",
  "Alívio de neuropatia e fascite plantar",
  "3 intensidades ajustáveis",
  "Garantia de satisfação de 30 dias",
];

// ─── Produtos principais — Massageador de Pés ─────────────────────────────────
const mainOffers = [
  {
    quantity: 1,
    price: 179.90,
    originalPrice: 299.90,
    discount: 40,
    description: "Ideal para começar seu tratamento",
    features: PRODUCT_FEATURES,
    isPopular: false,
    productImage: "/images/pes-1x.png",
  },
  {
    quantity: 2,
    price: 239.90,
    originalPrice: 479.80,
    discount: 50,
    description: "Economize R$ 119,90 vs. comprar separado",
    features: PRODUCT_FEATURES,
    isPopular: true,
    productImage: "/images/pes-2x.png",
  },
  {
    quantity: 3,
    price: 327.00,
    originalPrice: 539.70,
    discount: 39,
    description: "Economize R$ 212,70 — melhor custo-benefício",
    features: PRODUCT_FEATURES,
    isPopular: false,
    productImage: "/images/pes-3x.png",
  },
];

// ─── Selos de confiança ───────────────────────────────────────────────────────
const trustSeals = [
  {
    image: "/images/qualidade.png",
    title: "CERTIFICADO DE GARANTIA DE QUALIDADE",
  },
  {
    image: "/images/30dias.png",
    title: "SELO DE APROVAÇÃO E CONFORMIDADE PROCON",
  },
  {
    image: "/images/70k.png",
    title: "EXCELÊNCIA EM ATENDIMENTO — +70 MIL CLIENTES",
  },
];

export default function Home() {
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);

  const selectedOffer = mainOffers.find((o) => o.quantity === selectedQuantity);

  const handleContinue = () => {
    if (!selectedQuantity) return;
    window.location.href = CHECKOUT_LINKS[selectedQuantity];
  };

  const summaryLabel = selectedOffer
    ? `Massageador de Pés — ${selectedOffer.quantity} ${selectedOffer.quantity === 1 ? "Unidade" : "Unidades"}`
    : "";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container py-3">
          <div className="flex flex-col items-center gap-1">
            <img src="/images/pix-neuro.svg" alt="Neuro Sense" className="h-8 object-contain" />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container pb-28 pt-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Escolha Seu Kit de Tratamento
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Quanto maior o kit, maior a economia. Todos incluem garantia de
            satisfação e frete para todo o Brasil.
          </p>
        </motion.section>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {mainOffers.map((offer) => (
            <OfferCard
              key={offer.quantity}
              quantity={offer.quantity}
              price={offer.price}
              originalPrice={offer.originalPrice}
              discount={offer.discount}
              description={offer.description}
              features={offer.features}
              isSelected={selectedQuantity === offer.quantity}
              onSelect={setSelectedQuantity}
              isPopular={offer.isPopular}
              productImage={offer.productImage}
            />
          ))}
        </div>

        {/* Selos de Confiança */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 border-t border-border pt-10 space-y-10"
        >
          {trustSeals.map((seal) => (
            <div key={seal.title} className="flex flex-col items-center gap-3">
              <p className="font-display font-bold text-sm text-foreground uppercase tracking-wide text-center">
                {seal.title}
              </p>
              <img
                src={seal.image}
                alt={seal.title}
                className="max-w-xs w-full object-contain"
              />
            </div>
          ))}
        </motion.section>

        {/* Bandeiras de Pagamento */}
        <div className="mt-10 pb-4 flex justify-center">
          <img
            src="/images/bandeiras.png"
            alt="Formas de pagamento aceitas"
            className="max-w-sm w-full object-contain"
          />
        </div>
      </main>

      {/* Sticky Order Summary */}
      {selectedQuantity && (
        <OrderSummary
          productLabel={summaryLabel}
          productPrice={selectedOffer?.price ?? 0}
          bumpItems={[]}
          total={selectedOffer?.price ?? 0}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
