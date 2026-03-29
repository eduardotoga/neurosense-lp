import { useState } from "react";
import { motion } from "motion/react";
import OfferCard from "@/components/OfferCard";
import OrderBump, { BumpOption } from "@/components/OrderBump";
import OrderSummary from "@/components/OrderSummary";

// ─── Links do checkout Yampi ──────────────────────────────────────────────────
// Base: https://seguro.neurosenseloja.com/checkout?skipToCheckout=1&tokenReference=
//
// Produtos sem order bump (Pés apenas):
//   1un → F4VSJMQXAN | 2un → SXT5SPLO8S | 3un → RCC2IF9U05
//
// TODO: adicionar tokenReference dos kits com joelho quando criados na Yampi
const YAMPI_BASE = "https://seguro.neurosenseloja.com/checkout?skipToCheckout=1&tokenReference=";

const CHECKOUT_LINKS: Record<string, string> = {
  // ── Sem order bump ──────────────────────────────────────────────────────────
  "1_none":    YAMPI_BASE + "F4VSJMQXAN",
  "2_none":    YAMPI_BASE + "SXT5SPLO8S",
  "3_none":    YAMPI_BASE + "RCC2IF9U05",

  // ── Com Order Bump Joelho — TODO: substituir pelo tokenReference correto ────
  "1_joelho1": YAMPI_BASE + "F4VSJMQXAN", // TODO: kit 1un Pés + 1 Joelho
  "2_joelho1": YAMPI_BASE + "SXT5SPLO8S", // TODO: kit 2un Pés + 1 Joelho
  "3_joelho1": YAMPI_BASE + "RCC2IF9U05", // TODO: kit 3un Pés + 1 Joelho
  "1_joelho2": YAMPI_BASE + "F4VSJMQXAN", // TODO: kit 1un Pés + 2 Joelhos
  "2_joelho2": YAMPI_BASE + "SXT5SPLO8S", // TODO: kit 2un Pés + 2 Joelhos
  "3_joelho2": YAMPI_BASE + "RCC2IF9U05", // TODO: kit 3un Pés + 2 Joelhos
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

// ─── Preços do order bump ─────────────────────────────────────────────────────
const BUMP_PRICES: Record<string, number> = {
  joelho1: 197.00,
  joelho2: 277.00,
};

export default function Home() {
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [selectedBump, setSelectedBump] = useState<BumpOption>(null);

  const selectedOffer = mainOffers.find((o) => o.quantity === selectedQuantity);
  const bumpPrice = selectedBump ? BUMP_PRICES[selectedBump] : 0;
  const total = (selectedOffer?.price ?? 0) + bumpPrice;

  const handleContinue = () => {
    if (!selectedQuantity) return;
    const bumpKey = selectedBump ?? "none";
    sessionStorage.setItem("neurosense_bump", bumpKey);
    sessionStorage.setItem("neurosense_qty", String(selectedQuantity));
    window.location.href = CHECKOUT_LINKS[`${selectedQuantity}_${bumpKey}`];
  };

  const summaryLabel = selectedOffer
    ? `Massageador de Pés — ${selectedOffer.quantity} ${selectedOffer.quantity === 1 ? "Unidade" : "Unidades"}`
    : "";

  const bumpSummaryItems =
    selectedBump === "joelho1"
      ? [{ label: "Massageador de Joelho — 1 Unidade", price: 197.00 }]
      : selectedBump === "joelho2"
      ? [{ label: "Massageador de Joelho — 2 Unidades", price: 277.00 }]
      : [];

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
            <img src="/images/logo.png" alt="Neuro Sense" className="h-8 object-contain" />
            <h1 className="font-display text-xl font-bold text-foreground">
              Complete Seu Pedido
            </h1>
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

        {/* Order Bump */}
        {selectedQuantity && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <OrderBump
              selectedBump={selectedBump}
              onSelect={setSelectedBump}
              joelhoImage="/images/joelho-1x.png"
            />
          </motion.div>
        )}

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
          bumpItems={bumpSummaryItems}
          total={total}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
