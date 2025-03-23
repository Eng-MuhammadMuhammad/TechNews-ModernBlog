import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        About TechNews
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          At TechNews, our mission is to provide accurate, insightful, and
          timely coverage of the technology industry. We believe that technology
          is reshaping our world in profound ways, and our goal is to help our
          readers understand these changes and their implications for business,
          society, and everyday life.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Our Story
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          TechNews was founded in 2023 by a group of technology enthusiasts and
          journalists who saw the need for in-depth, thoughtful coverage of the
          rapidly evolving tech landscape. What began as a small blog has grown
          into a comprehensive news platform covering everything from artificial
          intelligence and software development to hardware innovations and
          cybersecurity.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Our Team
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Our team consists of experienced journalists, industry experts, and
          technology professionals who bring diverse perspectives and deep
          knowledge to our coverage. We're committed to maintaining the highest
          standards of journalistic integrity and technical accuracy in
          everything we publish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Accurate Reporting
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We verify facts and consult multiple sources to ensure our reporting
            is accurate and reliable.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Expert Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Our team of industry experts provides insightful analysis to help
            you understand complex tech topics.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              ></path>
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Timely Updates
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We deliver the latest tech news as it happens, keeping you informed
            about important developments.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Our Editorial Policy
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          At TechNews, we adhere to strict editorial standards to ensure the
          quality and integrity of our content:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li>
            We maintain editorial independence and disclose any potential
            conflicts of interest.
          </li>
          <li>
            We verify information from multiple sources before publication.
          </li>
          <li>We correct errors promptly and transparently.</li>
          <li>
            We distinguish clearly between news reporting and opinion content.
          </li>
          <li>We respect privacy and confidentiality when appropriate.</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          If you have questions about our editorial policy or would like to
          report an error, please
          <a href="/contact" className="text-blue-600 hover:underline">
            {" "}
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
