'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/definitions';
import ProductCard from '@/components/product/product-card';
import ProductFilters from '@/components/product/product-filters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
  });

  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-section');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesRating = product.rating >= filters.rating;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });
  }, [searchQuery, filters]);

  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], []);

  return (
    <div className="bg-background">
      <section className="relative h-96 w-full bg-primary/10">
        {heroImage && (
             <Image
             src={heroImage.imageUrl}
             alt={heroImage.description}
             fill
             className="object-cover"
             data-ai-hint={heroImage.imageHint}
           />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="font-headline text-4xl font-bold tracking-tighter md:text-6xl">
            Discover Your Style
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Browse our curated collection of high-quality products.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center gap-4 md:flex-row">
          <div className="relative w-full md:flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full rounded-full bg-card py-6 pl-12 pr-4 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <ProductFilters
            categories={categories}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="font-headline text-2xl font-semibold">No Products Found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
