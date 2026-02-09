'use client';

import { useState } from 'react';
import { useCheckout } from '@moneydevkit/nextjs';

export default function Home() {
  const { createCheckout, isLoading } = useCheckout();
  const [error, setError] = useState<string | null>(null);

  const handleFlip = async () => {
    setError(null);
    const flipId = crypto.randomUUID();
    
    const result = await createCheckout({
      type: 'PRODUCTS',
      product: 'cmldyov0w00ddad0yoi2t2iav',
      successUrl: `/success?flipId=${flipId}`,
      metadata: { flipId },
    });

    if (result.error) {
      setError(result.error.message);
      return;
    }

    window.location.href = result.data.checkoutUrl;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-white mb-4">🪙</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Coin Flip</h2>
        <p className="text-zinc-400 mb-8">
          Pay ₿50. Get a 50/50 coin flip. Heads or tails.
        </p>
        
        <button
          onClick={handleFlip}
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          {isLoading ? 'Creating flip...' : 'Flip for ₿50'}
        </button>

        {error && (
          <p className="text-red-400 mt-4">{error}</p>
        )}

        <p className="text-zinc-600 text-sm mt-8">
          Powered by moneydevkit
        </p>
      </div>
    </main>
  );
}
