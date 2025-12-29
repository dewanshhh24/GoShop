'use client';

import { useMemo } from 'react';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/product-card';
import type { Product } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  
  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
  }, [params.category]);

  if (categoryProducts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/categories">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          {categoryName}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
