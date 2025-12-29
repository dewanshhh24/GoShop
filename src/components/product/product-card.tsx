'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import placeholderImages from '@/lib/placeholder-images.json';
import RatingStars from './rating-stars';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const productImage = placeholderImages.placeholderImages.find(p => p.id === product.image);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, 1);
  };

  return (
    <Card className="flex h-full transform flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="relative p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square w-full">
            {productImage && (
                <Image
                    src={productImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={productImage.imageHint}
                />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex items-start justify-between">
            <CardTitle className="mb-2 font-headline text-lg leading-tight">
            <Link href={`/products/${product.slug}`} className="hover:text-primary">
                {product.name}
            </Link>
            </CardTitle>
            <p className="font-headline text-lg font-semibold text-primary">₹{product.price.toFixed(2)}</p>
        </div>
        <p className="mb-2 text-sm text-muted-foreground">{product.category}</p>
        <RatingStars rating={product.rating} />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
