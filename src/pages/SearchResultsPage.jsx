import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ArticleCard from "../components/blog/ArticleCard";
import Pagination from "../components/ui/Pagination";
import SearchBar from "../components/ui/SearchBar";
import articlesData from "../data/articles.json";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      // Search in title, excerpt, content, category, and tags
      const results = articlesData.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerCaseQuery) ||
          article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
          (article.content &&
            article.content.toLowerCase().includes(lowerCaseQuery)) ||
          article.category.toLowerCase().includes(lowerCaseQuery) ||
          (article.tags &&
            article.tags.some((tag) =>
              tag.toLowerCase().includes(lowerCaseQuery)
            ))
      );

      setSearchResults(results);
      setCurrentPage(1);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewSearch = (searchTerm) => {
    // This will update the URL and trigger the useEffect
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Search Results for "{query}"
        </h1>
        <div className="max-w-lg">
          <SearchBar onSearch={handleNewSearch} />
        </div>
      </div>

      {searchResults.length > 0 ? (
        <>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Found {searchResults.length} result
            {searchResults.length !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentResults.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We couldn't find any articles matching your search term. Please try
            a different search or browse our categories.
          </p>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
