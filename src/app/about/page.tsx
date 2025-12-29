import { Building, Users, Target } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function AboutPage() {
  const aboutImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-section');
  
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            About GoShop
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Your destination for curated products that inspire and elevate your lifestyle.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
             {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt="Our Team"
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight">Our Story</h2>
            <p className="text-foreground/80">
              GoShop started with a simple idea: to make online shopping a delightful and seamless experience. We believe that finding the perfect product shouldn't be a chore. Our team of experts carefully curates each item in our collection, ensuring it meets our high standards of quality, style, and value.
            </p>
            <p className="text-foreground/80">
              From the latest trends to timeless classics, we're passionate about bringing you products that you'll love. We are more than just a retailer; we are a community of style enthusiasts and savvy shoppers.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Building className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-headline text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-muted-foreground">
              To provide an unparalleled shopping experience by offering a curated selection of high-quality products, exceptional customer service, and a seamless online platform.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-headline text-xl font-semibold">Our Team</h3>
            <p className="mt-2 text-muted-foreground">
              A diverse group of passionate individuals dedicated to finding and sharing the best products with you. We are designers, writers, and tech enthusiasts united by our love for great products.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-headline text-xl font-semibold">Our Vision</h3>
            <p className="mt-2 text-muted-foreground">
              To be the most trusted and inspiring online shopping destination, continuously innovating to meet the evolving needs of our customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
