'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function FlipResult() {
  const searchParams = useSearchParams();
  const flipId = searchParams.get('flipId');
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (flipId) {
      // Generate deterministic result based on flipId
      const hash = flipId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      setResult(hash % 2 === 0 ? 'HEADS' : 'TAILS');
    }
  }, [flipId]);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">
        {result === 'HEADS' ? '🪙 HEADS!' : result === 'TAILS' ? '🎯 TAILS!' : '...'}
      </h1>
      <p className="text-zinc-400 text-lg mb-8">
        {result ? `The coin landed on ${result}` : 'Flipping...'}
      </p>
      <p className="text-zinc-500 text-sm">
        Flip ID: {flipId}
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <FlipResult />
      </Suspense>
    </main>
  );
}
