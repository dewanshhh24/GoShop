'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import placeholderImages from '@/lib/placeholder-images.json';
import RatingStars from '@/components/product/rating-stars';
import { ShoppingCart, Heart, Share2, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/product/product-card';
import Link from 'next/link';
import type { Product } from '@/lib/definitions';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const product = products.find((p) => p.slug === params.slug);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    notFound();
  }

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
    navigator.clipboard.writeText(window.location.href);
    toast({
        title: 'Link Copied',
        description: 'Product link copied to clipboard.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/products">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>
      </Button>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
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
        <div className="flex flex-col gap-4">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="text-sm text-muted-foreground">({product.rating.toFixed(1)})</span>
          </div>
          <p className="font-headline text-3xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
          <p className="text-foreground/80">{product.description}</p>
          
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={handleAddToCart} size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button onClick={handleAddToWishlist} size="lg" variant="outline">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
            <Button onClick={handleShare} size="icon" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <Separator className="my-4" />
          <div>
            <p><span className="font-semibold">Stock:</span> {product.stock > 0 ? `${product.stock} items left` : 'Out of Stock'}</p>
          </div>
        </div>
      </div>
      <Separator className="my-12" />
      <div>
        <h2 className="mb-6 font-headline text-2xl font-bold tracking-tighter sm:text-3xl">Related Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
