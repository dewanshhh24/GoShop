'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/definitions';
import ProductCard from '@/components/product/product-card';
import ProductFilters from '@/components/product/product-filters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
  });

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
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        All Products
      </h1>
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
  );
}
