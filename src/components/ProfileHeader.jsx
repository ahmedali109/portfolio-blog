import FilterButtons from "./FilterButtons";
import { useI18n } from "../context/useI18n";

export default function ProfileHeader({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  const { t } = useI18n();

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 transition-colors duration-200 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto mt-10">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
          {/* Left Side: Profile Image, Name and Role */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto">
            {/* Profile Image */}
            <div className="shrink-0">
              <img
                src={
                  new URL("../../public/assets/profile.webp", import.meta.url)
                    .href
                }
                alt={t("profile.name")}
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg object-cover border-4 border-gray-300 dark:border-gray-700"
              />
            </div>

            {/* Name and Role */}
            <div className="text-center sm:text-start">
              <h1 className="font-bebas text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4">
                {t("profile.name")}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-light">
                {t("profile.role")}
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
      </div>
    </section>
  );
}
