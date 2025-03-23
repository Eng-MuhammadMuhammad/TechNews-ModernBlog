import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/blog/ArticleCard";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import Pagination from "../components/ui/Pagination";
import articlesData from "../data/articles.json";
import categoriesData from "../data/categories.json";

const TrendingPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState("week"); // 'day', 'week', 'month'
  const articlesPerPage = 6;

  // Calculate trending score based on publish date, read time, and comments
  const calculateTrendingScore = (article) => {
    // Convert publish date to timestamp for calculation
    const publishDate = new Date(article.publishDate).getTime();
    const now = new Date().getTime();
    const daysSincePublish = (now - publishDate) / (1000 * 60 * 60 * 24);

    // More recent articles get higher scores
    const recencyScore = Math.max(30 - daysSincePublish, 0);

    // Articles with more comments get higher scores
    const commentScore = article.comments ? article.comments.length * 5 : 0;

    // Longer read times might indicate more substantial content
    const readTimeScore = article.readTime * 2;

    // Calculate final trending score
    return recencyScore + commentScore + readTimeScore;
  };

  // Filter articles based on time period
  const filterArticlesByTime = (articles, filter) => {
    const now = new Date();
    const filterDays = filter === "day" ? 1 : filter === "week" ? 7 : 30;
    const cutoffDate = new Date(now.setDate(now.getDate() - filterDays));

    return articles.filter((article) => {
      const publishDate = new Date(article.publishDate);
      return publishDate >= cutoffDate;
    });
  };

  // Get trending articles
  const getTrendingArticles = () => {
    // First filter by category if selected
    let filteredByCategory = selectedCategory
      ? articlesData.filter((article) => {
          const category = categoriesData.find(
            (cat) => cat.id === selectedCategory
          );
          return category && article.category === category.name;
        })
      : articlesData;

    // Then filter by time period
    const filteredByTime = filterArticlesByTime(filteredByCategory, timeFilter);

    // Calculate trending score for each article and sort
    return filteredByTime
      .map((article) => ({
        ...article,
        trendingScore: calculateTrendingScore(article),
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore);
  };

  const trendingArticles = getTrendingArticles();

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = trendingArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(trendingArticles.length / articlesPerPage);

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

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-12 mb-8 rounded-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Trending Tech News
          </h1>
          <p className="text-xl text-center mb-8">
            Discover what's hot in the tech world right now
          </p>
          <div className="max-w-lg mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Time Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                timeFilter === "day"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              }`}
              onClick={() => handleTimeFilterChange("day")}
            >
              Today
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                timeFilter === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              }`}
              onClick={() => handleTimeFilterChange("week")}
            >
              This Week
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                timeFilter === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              }`}
              onClick={() => handleTimeFilterChange("month")}
            >
              This Month
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content Area */}
          <div className="md:w-3/4">
            {currentArticles.length > 0 ? (
              <>
                {/* Trending Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentArticles.map((article, index) => (
                    <div key={article.id} className="relative">
                      {index < 3 && (
                        <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          #{index + 1}
                        </div>
                      )}
                      <ArticleCard article={article} />
                    </div>
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  No trending articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  There are no trending articles for this time period. Try
                  selecting a different time filter or check back later.
                </p>
              </div>
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
                Trending Tags
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
                  href="/tag/quantum"
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  #quantum
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
                Get the latest trending tech news delivered to your inbox
                weekly.
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

export default TrendingPage;
