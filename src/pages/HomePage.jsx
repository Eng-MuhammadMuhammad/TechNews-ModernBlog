import React, { useState } from "react";
import FeaturedArticle from "../components/blog/FeaturedArticle";
import ArticleCard from "../components/blog/ArticleCard";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import Pagination from "../components/ui/Pagination";
import articlesData from "../data/articles.json";
import categoriesData from "../data/categories.json";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const navigate = useNavigate();

  // Get featured article (first article in the data)
  const featuredArticle = articlesData[0];

  // Filter articles based on selected category
  const filteredArticles = selectedCategory
    ? articlesData.filter((article) => {
        const category = categoriesData.find(
          (cat) => cat.id === selectedCategory
        );
        return category && article.category === category.name;
      })
    : articlesData;

  // Remove featured article from the list if no category is selected
  const displayArticles = selectedCategory
    ? filteredArticles
    : filteredArticles.slice(1);

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = displayArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(displayArticles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-12 mb-8 rounded-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            TechNews
          </h1>
          <p className="text-xl text-center mb-8">
            Your trusted source for the latest technology news and insights
          </p>
          <div className="max-w-lg mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content Area */}
          <div className="md:w-3/4">
            {/* Featured Article */}
            {!selectedCategory && featuredArticle && (
              <FeaturedArticle article={featuredArticle} />
            )}

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentArticles.map((article) => (
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
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4">
            {/* Categories */}
            <CategoryFilter
              categories={categoriesData}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />

            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/tag/ai"
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  #ai
                </a>
                <a
                  href="/tag/webdev"
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  #webdev
                </a>
                <a
                  href="/tag/programming"
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  #programming
                </a>
                <a
                  href="/tag/cloud"
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  #cloud
                </a>
                <a
                  href="/tag/security"
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  #security
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get the latest tech news delivered to your inbox weekly.
              </p>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
