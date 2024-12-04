'use client';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('./Chat'), {
  loading: () => (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  )
});

export default function ClientChat() {
  return <Chat />;
}
