"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-4">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => onChange("all")}
          className="whitespace-nowrap"
        >
          Todas las categorías
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onChange(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
} 