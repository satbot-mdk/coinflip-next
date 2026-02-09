'use client';

import { useCheckoutSuccess } from '@moneydevkit/nextjs';

export default function SuccessPage() {
  const { isCheckoutPaidLoading, isCheckoutPaid, metadata } = useCheckoutSuccess();

  if (isCheckoutPaidLoading || isCheckoutPaid === null) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">🪙</h1>
          <p className="text-zinc-400 text-lg">Verifying payment...</p>
        </div>
      </main>
    );
  }

  if (!isCheckoutPaid) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Payment not confirmed</h1>
          <p className="text-zinc-400 text-lg">Your payment could not be verified.</p>
        </div>
      </main>
    );
  }

  const flipId = metadata?.flipId as string | undefined;
  const hash = flipId
    ? flipId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : Math.floor(Math.random() * 2);
  const result = hash % 2 === 0 ? 'HEADS' : 'TAILS';

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          {result === 'HEADS' ? '🪙 HEADS!' : '🎯 TAILS!'}
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          The coin landed on {result}
        </p>
        {flipId && (
          <p className="text-zinc-500 text-sm">
            Flip ID: {flipId}
          </p>
        )}
      </div>
    </main>
  );
}
