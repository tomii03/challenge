"use client";

import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilter } from "@/components/category-filter";
import { useProducts } from "@/hooks/use-products";
import { NoResults } from "@/components/no-results";
import { Pagination } from "@/components/pagination";
import "@/styles/pages/home.css";
import articles from "../../articles.json";

const ITEMS_PER_PAGE = 8;

// Obtener categorías únicas
const uniqueCategories = Array.from(
  new Set(articles.map((article) => article.categoria))
);

export default function Home() {
  const {
    currentPage,
    totalPages,
    displayedArticles,
    handleSearch,
    handlePageChange,
    selectedCategory,
    handleCategoryChange,
  } = useProducts({
    itemsPerPage: ITEMS_PER_PAGE,
    categories: uniqueCategories,
  });

  console.log("Home: rendering with currentPage:", currentPage);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="search-container">
        <h1 className="page-title">Articulos en linea</h1>
        <h2 className="page-subtitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos optio ab
          suscipit voluptatibus, perferendis ad dolore nesciunt a reprehenderit
          rem sed labore quaerat praesentium necessitatibus, ipsam voluptate
          dicta dolores quia!
        </h2>
        <SearchBar onSearch={handleSearch} className="mt-6"/>
        <div className="mt-6">
          <CategoryFilter
            categories={uniqueCategories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>
      </div>

      {displayedArticles.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <div className="products-grid">
            {displayedArticles.map((article) => (
              <ProductCard key={article.id} {...article} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}
