"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import "@/styles/components/search-bar.css" // Importa el CSS global

interface SearchBarProps {
  onSearch: (term: string) => void
  className?: string
}

export function SearchBar({ onSearch, className = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedValue = useDebounce(searchTerm, 300)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  return (
    <div className={`search-bar-container ${className}`}>
      <div className="search-bar-wrapper">
        <Search className="search-bar-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar productos..."
          className="search-bar-input"
        />
      </div>
    </div>
  )
}
