'use client';

import { useState, useEffect } from 'react';

export default function StatusIndicator() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching status:', error);
        setStatus('Error');
      }
    }

    fetchStatus();
    // Optionally set up an interval to refresh status periodically
    const intervalId = setInterval(fetchStatus, 60000); // every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className="mt-6 flex items-center gap-2 small-caps font-mono font-light text-xs text-green-200 px-2.5 py-0 bg-green-950/50 rounded-full outline outline-2 outline-green-950/30 -outline-offset-1">
      <div className="animate-pulse bg-green-500 rounded-full h-2 w-2 outline outline-2 -outline-offset-1 outline-green-700/50" />{' '}
      {status}
    </span>
  );
}
