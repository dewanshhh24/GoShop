'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
  };
  setFilters: (filters: ProductFiltersProps['filters']) => void;
}

export default function ProductFilters({
  categories,
  filters,
  setFilters,
}: ProductFiltersProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Refine your product search.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters({ ...filters, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
                <div className="flex justify-between">
                    <Label>Price Range</Label>
                    <span className="text-sm text-muted-foreground">₹{filters.minPrice} - ₹{filters.maxPrice}</span>
                </div>
                <Slider
                    defaultValue={[0, 1000]}
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={([min, max]) => setFilters({...filters, minPrice: min, maxPrice: max})}
                />
            </div>
            
            <div className="grid gap-2">
                <div className="flex justify-between">
                    <Label>Minimum Rating</Label>
                    <span className="text-sm text-muted-foreground">{filters.rating} stars</span>
                </div>
                <Slider
                    defaultValue={[0]}
                    min={0}
                    max={5}
                    step={0.5}
                    onValueChange={([rating]) => setFilters({...filters, rating})}
                />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
