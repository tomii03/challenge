"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full" type="scroll">
      <div className="flex space-x-4 pb-4">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => onChange("all")}
          className="shrink-0"
        >
          Todas las categorías
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onChange(category)}
            className="shrink-0"
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar
        orientation="horizontal"
        className="opacity-0 sm:opacity-100"
      />
    </ScrollArea>
  );
}
