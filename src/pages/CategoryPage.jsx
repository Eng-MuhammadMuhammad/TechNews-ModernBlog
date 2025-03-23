import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleCard from "../components/blog/ArticleCard";
import CategoryFilter from "../components/ui/CategoryFilter";
import Pagination from "../components/ui/Pagination";
import articlesData from "../data/articles.json";
import categoriesData from "../data/categories.json";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    if (categoryId) {
      const parsedId = parseInt(categoryId);
      setSelectedCategory(parsedId);
    } else {
      setSelectedCategory(null);
    }
    setCurrentPage(1);
  }, [categoryId]);

  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      navigate(`/categories/${categoryId}`);
    } else {
      navigate("/categories");
    }
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // Filter articles based on selected category
  const filteredArticles = selectedCategory
    ? articlesData.filter((article) => {
        const category = categoriesData.find(
          (cat) => cat.id === selectedCategory
        );
        return category && article.category === category.name;
      })
    : articlesData;

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCategoryName = () => {
    if (!selectedCategory) return "All Categories";
    const category = categoriesData.find((cat) => cat.id === selectedCategory);
    return category ? category.name : "Category";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {getCategoryName()}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="md:w-3/4">
          {currentArticles.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                There are no articles in this category yet. Please check back
                later or explore other categories.
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
  );
};

export default CategoryPage;
