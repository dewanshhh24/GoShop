'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { orders as allOrders } from '@/lib/data';
import type { Order } from '@/lib/definitions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const userOrders = useMemo(() => {
    if (!user) return [];
    return allOrders.filter(order => order.userId === user.id);
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        My Orders
      </h1>
      {userOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center">
          <Package className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-semibold tracking-tight">
            You have no orders yet
          </h2>
          <p className="text-muted-foreground">
            All your future orders will be displayed here.
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order: Order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Order {order.id}</CardTitle>
                  <CardDescription>
                    Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}
                  </CardDescription>
                </div>
                <Badge variant={order.status === 'Delivered' ? 'default' : (order.status === 'Cancelled' ? 'destructive' : 'secondary')}>
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <ul className="divide-y">
                  {order.items.map(item => {
                    const itemImage = placeholderImages.placeholderImages.find(p => p.id === item.image);
                    return(
                      <li key={item.id} className="flex items-center gap-4 py-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                          {itemImage && (
                            <Image src={itemImage.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={itemImage.imageHint} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-between p-6">
                <p className="font-semibold">Total</p>
                <p className="font-bold text-primary">₹{order.total.toFixed(2)}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
