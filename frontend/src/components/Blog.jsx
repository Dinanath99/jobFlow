import React from "react";
import Navbar from "./shared/Navbar";

// Sample blog data (this can be fetched from an API)
const blogPosts = [
  {
    id: 1,
    title: "Breaking into the Tech Industry: A Guide for Job Seekers",
    author: "Jane Doe",
    date: "August 25, 2024",
    description:
      "Learn how to navigate the tech job market and land your dream job with our comprehensive guide.",
    link: "/blog/tech-industry-guide",
  },
  {
    id: 2,
    title: "Top Skills Employers Look for in 2024",
    author: "John Smith",
    date: "August 18, 2024",
    description:
      "Stay ahead of the curve by mastering the top skills that employers are seeking this year.",
    link: "/blog/top-skills-2024",
  },
  {
    id: 3,
    title: "How to Build an Impressive Tech Portfolio",
    author: "Alex Johnson",
    date: "August 10, 2024",
    description:
      "Discover the key elements of a strong tech portfolio and how to make yours stand out.",
    link: "/blog/build-tech-portfolio",
  },
];

const Blog = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  By {post.author} on {post.date}
                </p>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <a
                  href={post.link}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
