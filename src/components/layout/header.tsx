'use client';

import Link from 'next/link';
import { ShoppingBag, Store } from 'lucide-react';
import MainNav from './main-nav';
import UserNav from './user-nav';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

export default function Header() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">GoShop</span>
        </Link>
        <div className="hidden flex-1 items-center justify-center md:flex">
          <MainNav className="mx-6" />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" aria-label={`Shopping cart with ${totalItems} items`}>
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </Button>
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
