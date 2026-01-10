export default function FilterButtons({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold transition-all duration-200 text-xs sm:text-sm tracking-wide uppercase ${
            activeCategory === category
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
