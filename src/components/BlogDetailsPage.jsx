import { useState } from "react";
import { highlightCode } from "../utils/syntaxHighlight";

export default function BlogDetailsPage({
  post,
  allPosts,
  onBack,
  onPostClick,
}) {
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
    let codeBlockCount = 0;
    return content.split("<h2>").map((section, idx) => {
      if (idx === 0) {
        return (
          <div key={idx}>
            {section.split("\n").map((line, lineIdx) => {
              if (line.trim().startsWith("<pre>")) {
                return null; // Handle pre separately
              }
              if (line.trim().startsWith("<p>")) {
                return (
                  <p
                    key={lineIdx}
                    className="text-gray-300 text-lg leading-relaxed mb-4"
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
          <h2 className="text-2xl font-bebas text-white mt-8 mb-4">
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
                    className="text-gray-300 text-lg leading-relaxed mb-4"
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
          {section.includes("<pre>") && (
            <div className="my-6">
              {section.split("<pre><code>").map((block, blockIdx) => {
                if (block.includes("</code></pre>")) {
                  const code = block
                    .split("</code></pre>")[0]
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/\\/g, "");
                  const blockId = `code-${codeBlockCount++}`;
                  return (
                    <div key={blockIdx} className="relative group mb-6">
                      {/* Code block header */}
                      <div className="flex items-center justify-between bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-t-lg px-4 py-2 border-b-0">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                          </div>
                          <span className="text-xs text-gray-400 font-mono ml-2">
                            code
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(code, blockId)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-all duration-200 ${
                            copiedIdx === blockId
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30"
                          }`}
                        >
                          {copiedIdx === blockId ? (
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
                              Copied!
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
                              Copy
                            </span>
                          )}
                        </button>
                      </div>
                      <pre className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 border-t-0 rounded-b-lg p-5 overflow-x-auto shadow-lg">
                        <code
                          className="font-mono text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: highlightCode(code),
                          }}
                        />
                      </pre>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <section className="bg-gray-900 py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-6 sm:mb-8 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl">←</span> Back to Articles
          </button>

          {/* Article Header */}
          <article className="border-b border-gray-700 pb-6 sm:pb-8 mb-6 sm:mb-8">
            <div className="mb-3 sm:mb-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded inline-block">
                {post.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bebas text-white mb-3 sm:mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium">
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
                const code = block
                  .replace(/<pre><code>/g, "")
                  .replace(/<\/code><\/pre>/g, "")
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")
                  .replace(/\\/g, "");
                return (
                  <div key={idx} className="relative group">
                    {/* Code block header */}
                    <div className="flex items-center justify-between bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-t-lg px-4 py-2 border-b-0">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <span className="text-xs text-gray-400 font-mono ml-2">
                          code
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(code, idx)}
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
                            Copied!
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
                            Copy
                          </span>
                        )}
                      </button>
                    </div>
                    <pre className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 border-t-0 rounded-b-lg p-3 sm:p-5 overflow-x-auto shadow-lg text-xs sm:text-sm">
                      <code
                        className="font-mono leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlightCode(code),
                        }}
                      />
                    </pre>
                  </div>
                );
              })}
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bebas text-white mb-4 sm:mb-6">
                More in {post.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {relatedArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onPostClick(article)}
                    className="border border-gray-700 rounded-lg p-4 sm:p-6 bg-gray-800/50 hover:border-blue-500 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded inline-block mb-3">
                      {article.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-bebas text-white group-hover:text-blue-300 mt-3">
                      {article.title}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2">
                      {article.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
