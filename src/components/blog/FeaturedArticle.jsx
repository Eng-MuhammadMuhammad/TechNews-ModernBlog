import React from "react";

const FeaturedArticle = ({ article }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:w-2/3 relative">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded">
              Featured
            </span>
          </div>
        </div>
        <div className="md:w-1/3 p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {article.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-3">
              {article.readTime} min read
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            <a
              href={`/article/${article.id}`}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {article.title}
            </a>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 md:line-clamp-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <span className="block text-sm font-medium text-gray-900 dark:text-white">
                  {article.author.name}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {article.publishDate}
                </span>
              </div>
            </div>
            <a
              href={`/article/${article.id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Read More
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
