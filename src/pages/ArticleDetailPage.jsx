import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleDetail from "../components/blog/ArticleDetail";
import ArticleCard from "../components/blog/ArticleCard";
import articlesData from "../data/articles.json";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    // Find the article with the matching ID
    const articleId = parseInt(id);
    const foundArticle = articlesData.find(
      (article) => article.id === articleId
    );

    if (foundArticle) {
      setArticle(foundArticle);

      // Find related articles (same category, excluding current article)
      const related = articlesData
        .filter(
          (a) => a.category === foundArticle.category && a.id !== articleId
        )
        .slice(0, 3); // Limit to 3 related articles

      setRelatedArticles(related);
    }
  }, [id]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <p className="mb-4">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to="/"
          className="text-blue-600 hover:underline flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Home
        </Link>
      </div>

      <ArticleDetail article={article} />

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailPage;
