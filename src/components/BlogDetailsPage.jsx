import { useState } from "react";
import { highlightCode } from "../utils/syntaxHighlight";
import { useI18n } from "../context/useI18n";

export default function BlogDetailsPage({
  post,
  allPosts,
  onBack,
  onPostClick,
}) {
  const { t } = useI18n();
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Get related articles from the same category
  const relatedArticles = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  // Copy to clipboard function
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(index);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  // Parse content if it's HTML string or render as is
  const renderContent = (content) => {
    // Remove code blocks from content to render separately
    const contentWithoutCode = content.replace(
      /<pre><code>[\s\S]*?<\/code><\/pre>/g,
      ""
    );

    return contentWithoutCode.split("<h2>").map((section, idx) => {
      if (idx === 0) {
        return (
          <div key={idx}>
            {section.split("\n").map((line, lineIdx) => {
              if (line.trim().startsWith("<p>")) {
                return (
                  <p
                    key={lineIdx}
                    className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4"
                  >
                    {line
                      .replace(/<\/?p>/g, "")
                      .replace(/<\/?strong>/g, "")
                      .replace(/<\/?code>/g, "")}
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      }
      return (
        <div key={idx}>
          <h2 className="text-2xl font-bebas text-gray-900 dark:text-white mt-8 mb-4">
            {section.split("</h2>")[0]}
          </h2>
          {section
            .split("</h2>")[1]
            ?.split("<p>")
            .map((para, pIdx) => {
              if (para.includes("</p>")) {
                const text = para.split("</p>")[0];
                return (
                  <p
                    key={pIdx}
                    className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4"
                  >
                    {text
                      .replace(/<strong>/g, "")
                      .replace(/<\/strong>/g, "")
                      .replace(/<code>/g, "")
                      .replace(/<\/code>/g, "")
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">")}
                  </p>
                );
              }
              return null;
            })}
        </div>
      );
    });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <section className="bg-white dark:bg-gray-900 py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8 mt-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl">←</span> {t("blog.back")}
          </button>
        </div>

        {/* Main Layout: Social Links + Post Content */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Side: Social Links */}
          <aside className="lg:w-20 flex flex-col lg:flex-col gap-4 justify-start lg:sticky lg:top-8 lg:self-start">
            <a
              href="https://github.com/ahmedali109"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-blue-500 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-200 border border-gray-300 dark:border-gray-700"
              title="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/ahmedalynaguib"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-blue-500 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-200 border border-gray-300 dark:border-gray-700"
              title="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </aside>

          {/* Right Side: Post Content */}
          <div className="flex-1 max-w-4xl">
            {/* Article Header */}
            <article className="border-b border-gray-300 dark:border-gray-700 pb-6 sm:pb-8 mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded inline-block">
                  {post.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bebas text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">
                {post.date}
              </p>
            </article>

            {/* Article Content */}
            <div className="prose prose-sm sm:prose md:prose-base prose-invert max-w-none mb-8 sm:mb-12">
              {renderContent(post.content)}
            </div>

            {/* Code Blocks Rendered Properly */}
            <div className="my-12 space-y-6">
              {post.content
                .match(/<pre><code>[\s\S]*?<\/code><\/pre>/g)
                ?.map((block, idx) => {
                  // Extract code without tags but keep entities
                  const codeWithEntities = block
                    .replace(/<pre><code>/g, "")
                    .replace(/<\/code><\/pre>/g, "")
                    .replace(/\\/g, "");

                  // Decode entities for copying to clipboard
                  const codeForClipboard = codeWithEntities
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&");

                  return (
                    <div key={idx} className="relative group" dir="ltr">
                      {/* Code block header */}
                      <div className="flex items-center justify-between bg-linear-to-r from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 rounded-t-lg px-4 py-2 border-b-0">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                          </div>
                          <span className="text-xs text-gray-300 dark:text-gray-400 font-mono ml-2">
                            code
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(codeForClipboard, idx)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-all duration-200 ${
                            copiedIdx === idx
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30"
                          }`}
                        >
                          {copiedIdx === idx ? (
                            <span className="flex items-center gap-1">
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
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {t("blog.copied")}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
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
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                              {t("blog.copy")}
                            </span>
                          )}
                        </button>
                      </div>
                      <pre
                        className="bg-linear-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-800 border border-gray-300 dark:border-gray-700 border-t-0 rounded-b-lg p-3 sm:p-5 overflow-x-auto shadow-lg text-xs sm:text-sm text-gray-100 dark:text-gray-100"
                        dir="ltr"
                      >
                        <code
                          className="font-mono leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: highlightCode(codeWithEntities),
                          }}
                        />
                      </pre>
                    </div>
                  );
                })}
            </div>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-300 dark:border-gray-700">
                <h3 className="text-xl sm:text-2xl font-bebas text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {t("blog.moreIn")} {post.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {relatedArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => onPostClick(article)}
                      className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 sm:p-6 bg-gray-100 dark:bg-gray-800/50 hover:border-blue-500 hover:bg-gray-200 dark:hover:bg-gray-800/80 transition-all duration-300 cursor-pointer group"
                    >
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded inline-block mb-3">
                        {article.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-bebas text-gray-900 dark:text-white group-hover:text-blue-300 mt-3">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-500 text-xs sm:text-sm mt-2">
                        {article.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
