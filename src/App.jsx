import { useState } from "react";
import { ProfileHeader, BlogGrid, BlogDetailsPage } from "./components";
import { blogData } from "./data/blogData";
import { formatBlogPosts } from "./data/blogUtils";

// Format blog data for display
const BLOG_POSTS = formatBlogPosts(blogData);

const CATEGORIES = ["All posts", "HTML", "CSS", "JavaScript"];

function App() {
  const [activeCategory, setActiveCategory] = useState("All posts");
  const [selectedPost, setSelectedPost] = useState(null);

  // Handle post click with smooth scroll to top
  const handlePostClick = (post) => {
    setSelectedPost(post);
    // Scroll to top smoothly
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 0);
  };

  if (selectedPost) {
    return (
      <BlogDetailsPage
        post={selectedPost}
        allPosts={BLOG_POSTS}
        onBack={() => setSelectedPost(null)}
        onPostClick={handlePostClick}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <ProfileHeader
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <section className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bebas text-white mb-8">
            Latest Articles
          </h2>
          <BlogGrid
            posts={BLOG_POSTS}
            activeCategory={activeCategory}
            onPostClick={handlePostClick}
          />
        </div>
      </section>
    </main>
  );
}

export default App;