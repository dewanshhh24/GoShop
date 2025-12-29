'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { products } from '@/lib/data';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(p => p.category));
    return Array.from(categorySet).map(category => ({
      name: category,
      productCount: products.filter(p => p.category === category).length
    }));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        Product Categories
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`} className="group">
            <Card className="flex h-full transform flex-col justify-between overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <div className="flex items-center justify-between p-6 pt-0">
                <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                <ArrowRight className="h-5 w-5 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
