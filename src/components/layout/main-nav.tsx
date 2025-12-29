'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { products } from '@/lib/data';

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const categories = [...new Set(products.map(p => p.category))];

  const routes = [
    {
      href: `/`,
      label: 'Home',
      active: pathname === `/`,
    },
    {
      href: `/products`,
      label: 'All Products',
      active: pathname === `/products`,
    },
    {
      href: `/categories`,
      label: 'Categories',
      active: pathname.startsWith(`/categories`),
    },
    {
      href: `/about`,
      label: 'About Us',
      active: pathname === `/about`,
    },
    {
      href: `/contact`,
      label: 'Contact',
      active: pathname === `/contact`,
    },
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
