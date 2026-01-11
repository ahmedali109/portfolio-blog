export default function BlogCard({ category, date, title }) {
  return (
    <article className="relative border border-gray-300 dark:border-gray-700/50 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white dark:bg-linear-to-br dark:from-gray-800 dark:to-gray-900 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col group overflow-hidden backdrop-blur-sm">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-linear-to-r from-blue-500/20 to-cyan-500/20 px-3 py-1.5 rounded-full border border-blue-500/30 shadow-sm w-fit">
            {category}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {date}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bebas text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 flex-1 leading-tight mb-3">
          {title}
        </h3>

        {/* Read more indicator */}
        <div className="flex items-center text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto pt-3 border-t border-gray-300 dark:border-gray-700/50">
          <span className="font-medium">Read article</span>
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
