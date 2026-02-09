"use client";

import { Checkout } from "@moneydevkit/nextjs";
import { use } from "react";

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          🪙 Coin Flip
        </h1>
        <p className="text-zinc-400 text-center mb-8">
          Pay ₿50 to flip. Heads or tails — 50/50 shot.
        </p>
        <Checkout id={id} />
      </div>
    </main>
  );
}
