'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-white text-xl font-bold">AI Assistant</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`${isActive('/')} text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/chat"
              className={`${isActive('/chat')} text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors`}
            >
              Chat
            </Link>
            <Link
              href="/about"
              className={`${isActive('/about')} text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
