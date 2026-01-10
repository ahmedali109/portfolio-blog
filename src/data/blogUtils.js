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

    if (section.code) {
      htmlContent += `<pre><code>${section.code
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</code></pre>`;
    }
  });

  return htmlContent;
};

// Helper to format blog posts from structured data
export const formatBlogPosts = (blogs) => {
  return blogs.map((blog) => ({
    ...blog,
    content: convertBlogDataToContent(blog),
  }));
};
