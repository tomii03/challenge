"use client"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const handlePageClick = (pageNumber: number) => {
    console.log('Pagination: handlePageClick', { pageNumber, currentPage })
    if (pageNumber !== currentPage && pageNumber >= 1 && pageNumber <= totalPages) {
      console.log('Pagination: calling onPageChange with:', pageNumber)
      onPageChange(pageNumber)
    }
  }

  return (
    <div className="pagination-container">
     
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`pagination-button ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "pagination-button-inactive"
        }`}
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`pagination-button ${
              currentPage === pageNumber
                ? "pagination-button-active"
                : "pagination-button-inactive"
            }`}
            type="button"
          >
            {pageNumber}
          </button>
        )
      })}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`pagination-button ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "pagination-button-inactive"
        }`}
      >
        Siguiente
      </button>
    </div>
  )
} 