import Link from 'next/link';
import { Store } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">GoShop</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground md:mt-0">
            &copy; {currentYear} GoShop, Inc. All rights reserved.
          </p>
          <nav className="mt-4 flex gap-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
