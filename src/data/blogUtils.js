import { blogDataByLanguage } from "./blogData";

// Utility to convert structured blog data to content format
export const convertBlogDataToContent = (blog) => {
  let htmlContent = "";

  blog.sections.forEach((section) => {
    htmlContent += `<h2>${section.heading}</h2>`;

    if (section.content) {
      const paragraphs = section.content.split("\n").filter((p) => p.trim());
      paragraphs.forEach((para) => {
        htmlContent += `<p>${para}</p>`;
      });
    }

    // Render all code blocks within the section if present
    if (Array.isArray(section.codes) && section.codes.length) {
      section.codes.forEach((codeBlock) => {
        const safeCode = (codeBlock.code || "")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        const lang = (codeBlock.language || "text").toLowerCase();
        htmlContent += `<pre data-lang="${lang}"><code>${safeCode}</code></pre>`;
      });
    }
  });

  return htmlContent;
};

// Compute reading metrics (word count and estimated minutes)
const computeReadingMetrics = (blog) => {
  const textParts = [];
  (blog.sections || []).forEach((section) => {
    if (section.heading) textParts.push(String(section.heading));
    if (section.content) textParts.push(String(section.content));
    // Also count code as content for reading time
    if (Array.isArray(section.codes)) {
      section.codes.forEach((codeBlock) => {
        if (codeBlock.code) {
          // Count code at a slower rate (about 50% of normal reading)
          textParts.push(String(codeBlock.code));
        }
      });
    }
  });

  const text = textParts.join(" ");
  const words = text.match(/\S+/g) || [];
  const wordCount = words.length;
  // Use 150 words/min for more realistic reading time (includes code comprehension)
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 150));

  return { wordCount, readingMinutes };
};

// Helper to format blog posts from structured data
export const formatBlogPosts = (blogs) => {
  return blogs.map((blog) => {
    const { wordCount, readingMinutes } = computeReadingMetrics(blog);
    return {
      ...blog,
      content: convertBlogDataToContent(blog),
      wordCount,
      readingMinutes,
    };
  });
};

// Get blog data by language
export const getBlogDataByLanguage = (language) => {
  return blogDataByLanguage[language] || blogDataByLanguage.en;
};
