import { useState, useMemo, useEffect } from "react";
import { ProfileHeader, BlogGrid, BlogDetailsPage } from "./components";
import { LanguageSwitcher, ThemeSwitcher } from "./components";
import { blogDataByLanguage } from "./data/blogData";
import { formatBlogPosts } from "./data/blogUtils";
import { useI18n } from "./context/useI18n";

function App() {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Get blog posts based on current language
  const BLOG_POSTS = useMemo(() => {
    const posts = blogDataByLanguage[language] || blogDataByLanguage.en;
    return formatBlogPosts(posts);
  }, [language]);

  // Get the current post in the current language
  const selectedPost = useMemo(() => {
    if (!selectedPostId) return null;
    return BLOG_POSTS.find((post) => post.id === selectedPostId) || null;
  }, [selectedPostId, BLOG_POSTS]);

  const CATEGORIES = [
    { key: "all", label: t("categories.all") },
    { key: "HTML", label: "HTML" },
    { key: "CSS", label: "CSS" },
    { key: "JavaScript", label: "JS" },
  ];

  // Handle post click with smooth scroll to top
  const handlePostClick = (post) => {
    setSelectedPostId(post.id);
    // Scroll to top smoothly
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 0);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Always visible: Theme and Language switchers */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      {selectedPost ? (
        <BlogDetailsPage
          post={selectedPost}
          allPosts={BLOG_POSTS}
          onBack={() => setSelectedPostId(null)}
          onPostClick={handlePostClick}
        />
      ) : (
        <>
          <ProfileHeader
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-6 transition-colors duration-200">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bebas text-gray-900 dark:text-white mb-8">
                {t("blog.latestArticles")}
              </h2>
              <BlogGrid
                posts={BLOG_POSTS}
                activeCategory={activeCategory}
                onPostClick={handlePostClick}
              />
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
