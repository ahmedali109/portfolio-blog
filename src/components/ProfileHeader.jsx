import FilterButtons from "./FilterButtons";

export default function ProfileHeader({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <section className="bg-gray-900 text-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
        {/* Left Side: Profile Image, Name and Role */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto">
          {/* Profile Image */}
          <div className="shrink-0">
            <img
              src="/assets/profile.webp"
              alt="Ahmed Aly"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg object-cover border-4 border-blue-400"
            />
          </div>

          {/* Name and Role */}
          <div className="text-center sm:text-left">
            <h1 className="font-bebas text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Ahmed Aly
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light">
              Software Engineer
            </p>
          </div>
        </div>

        {/* Right Side: Filter Buttons */}
        <div className="w-full lg:flex-1 lg:flex lg:justify-end">
          <FilterButtons
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </section>
  );
}
