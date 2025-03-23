import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <img
        src={article.coverImage}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex items-center mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {article.category}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-3">
            {article.readTime} min read
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          <Link
            to={`/article/${article.id}`}
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {article.author.name}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {article.publishDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
