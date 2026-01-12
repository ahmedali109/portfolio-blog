// ===============================
// Simple Markdown Parser
// ===============================

export const parseMarkdown = (markdown) => {
  // Normalize line endings
  const normalizedMarkdown = markdown.replace(/\r\n/g, "\n");

  // -------------------------------
  // Extract frontmatter
  // -------------------------------
  const frontmatterMatch = normalizedMarkdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error("Invalid markdown: missing frontmatter");
  }

  const frontmatter = {};

  frontmatterMatch[1].split("\n").forEach((line) => {
    if (!line.trim()) return;

    const index = line.indexOf(":");
    if (index === -1) return;

    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();

    // Parse value types
    if (/^\d+$/.test(value)) {
      value = Number(value);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      value = new Date(value);
    } else if (value.startsWith("[") && value.endsWith("]")) {
      // Simple array support: [a, b, c]
      value = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim());
    }

    frontmatter[key] = value;
  });

  // -------------------------------
  // Remove frontmatter
  // -------------------------------
  const content = normalizedMarkdown.replace(/^---\n[\s\S]*?\n---\n?/, "");

  // -------------------------------
  // Parse sections (## headings)
  // -------------------------------
  const sections = [];
  const parts = content.split(/^## /m).filter(Boolean);

  parts.forEach((part) => {
    const lines = part.split("\n");
    const heading = lines[0].trim();
    const body = lines.slice(1).join("\n").trim();

    const section = {
      heading,
      content: "",
      codes: [],
    };

    // -------------------------------
    // Extract multiple code blocks
    // -------------------------------
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeRegex.exec(body)) !== null) {
      section.codes.push({
        language: match[1] || "text",
        code: match[2].trim(),
      });
    }

    // Remove code blocks from text content
    section.content = body
      .replace(codeRegex, "")
      .replace(/\n{2,}/g, "\n\n")
      .trim();

    sections.push(section);
  });

  return {
    ...frontmatter,
    sections,
  };
};

// ===============================
// Load markdown posts by language
// ===============================

export const loadMarkdownPosts = async (language) => {
  const posts = [];

  const modules = import.meta.glob("/src/posts/**/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });

  for (const [path, content] of Object.entries(modules)) {
    if (!path.includes(`/posts/${language}/`)) continue;

    try {
      const post = parseMarkdown(content);

      // Auto-generate slug from filename
      post.slug = path.split("/").pop().replace(".md", "");

      posts.push(post);
    } catch (error) {
      console.error(`Error parsing ${path}:`, error);
    }
  }

  // Sort by date (fallback to id if exists)
  return posts.sort((a, b) => {
    if (a.date && b.date) return b.date - a.date;
    if (a.id && b.id) return a.id - b.id;
    return 0;
  });
};
