import { useMemo, useState, useCallback } from "react"
import { searchInText } from "@/utils/search"
import articles from "../../articles.json"

interface UseProductsProps {
  itemsPerPage: number
  categories: string[]
}

export function useProducts({ itemsPerPage }: UseProductsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {

      if (selectedCategory !== "all" && article.categoria !== selectedCategory) {
        return false
      }

      if (!searchTerm) return true

      const matchTitle = searchInText(searchTerm, article.titulo)
      if (matchTitle) return true


      return false
    })
  }, [searchTerm, selectedCategory])

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage)

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [totalPages])

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }, [])

  return {
    searchTerm,
    currentPage,
    totalPages,
    filteredArticles,
    displayedArticles,
    selectedCategory,
    handleSearch,
    handlePageChange,
    handleCategoryChange
  }
} 