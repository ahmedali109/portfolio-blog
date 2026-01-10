import BlogCard from "./BlogCard";

export default function BlogGrid({ posts, activeCategory, onPostClick }) {
  const filteredPosts =
    activeCategory === "All posts"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          onClick={() => onPostClick(post)}
          className="cursor-pointer"
        >
          <BlogCard
            category={post.category}
            date={post.date}
            title={post.title}
          />
        </div>
      ))}
    </div>
  );
}
