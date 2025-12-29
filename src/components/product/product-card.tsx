'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import placeholderImages from '@/lib/placeholder-images.json';
import RatingStars from './rating-stars';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const productImage = placeholderImages.placeholderImages.find(p => p.id === product.image);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, 1);
  };
  
  const handleAddToWishlist = () => {
    toast({
        title: 'Added to Wishlist',
        description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/products/${product.slug}`);
    toast({
        title: 'Link Copied',
        description: 'Product link copied to clipboard.',
    });
  };

  return (
    <Card className="group flex h-full transform flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
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
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button size="icon" variant="outline" className="rounded-full bg-background/80 hover:bg-background" onClick={handleAddToWishlist}>
                <Heart className="h-5 w-5 text-primary"/>
            </Button>
            <Button size="icon" variant="outline" className="rounded-full bg-background/80 hover:bg-background" onClick={handleShare}>
                <Share2 className="h-5 w-5 text-primary"/>
            </Button>
        </div>
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
