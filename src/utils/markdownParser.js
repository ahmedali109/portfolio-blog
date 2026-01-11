// Simple Markdown parser for blog posts

export const parseMarkdown = (markdown) => {
  // Normalize line endings to \n
  const normalizedMarkdown = markdown.replace(/\r\n/g, "\n");

  // Extract frontmatter
  const frontmatterMatch = normalizedMarkdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error("Invalid markdown: missing frontmatter");
  }

  const frontmatter = {};
  frontmatterMatch[1].split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      const value = valueParts.join(":").trim();
      frontmatter[key.trim()] = isNaN(value) ? value : parseInt(value);
    }
  });

  // Remove frontmatter from content
  const content = normalizedMarkdown.replace(/^---\n[\s\S]*?\n---\n/, "");

  // Parse sections
  const sections = [];
  const parts = content.split(/^## /m).filter(Boolean);

  parts.forEach((part) => {
    const lines = part.split("\n");
    const heading = lines[0].trim();
    const body = lines.slice(1).join("\n").trim();

    const section = { heading };

    // Check for code blocks
    const codeBlockMatch = body.match(/```(?:\w+)?\n([\s\S]*?)```/);
    if (codeBlockMatch) {
      const code = codeBlockMatch[1].trim();
      const textContent = body.replace(/```(?:\w+)?\n[\s\S]*?```/g, "").trim();

      if (textContent) {
        section.content = textContent;
      }
      if (code) {
        section.code = code;
      }
    } else {
      section.content = body;
    }

    sections.push(section);
  });

  return {
    ...frontmatter,
    sections,
  };
};

// Load all markdown files for a language
export const loadMarkdownPosts = async (language) => {
  const posts = [];

  // Dynamically import all markdown files for the language
  const modules = import.meta.glob("/src/posts/**/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });

  for (const [path, content] of Object.entries(modules)) {
    // Check if the file belongs to the current language
    if (path.includes(`/posts/${language}/`)) {
      try {
        const post = parseMarkdown(content);
        posts.push(post);
      } catch (error) {
        console.error(`Error parsing ${path}:`, error);
      }
    }
  }

  // Sort by ID
  return posts.sort((a, b) => a.id - b.id);
};
