// Build a lightweight search index at module load time
// Index fields: title, content (headings + text), tags, code blocks

const getKey = (post) => {
  if (post.id != null) return post.id;
  if (post.slug) return post.slug;
  return String(post.title || "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

export const buildIndex = (posts) => {
  return posts.map((post) => {
    const sections = Array.isArray(post.sections) ? post.sections : [];
    const contentText = sections
      .map((s) => `${s.heading || ""}\n${s.content || ""}`)
      .join("\n")
      .toLowerCase();

    const codeText = sections
      .flatMap((s) => (Array.isArray(s.codes) ? s.codes : []))
      .map((c) => (c.code || "").toLowerCase())
      .join("\n");

    const tags = Array.isArray(post.tags)
      ? post.tags.map((t) => t.toLowerCase())
      : [];

    return {
      id: getKey(post),
      title: String(post.title || "").toLowerCase(),
      tags,
      content: contentText,
      codes: codeText,
    };
  });
};

export const searchPosts = (index, posts, query) => {
  const q = String(query || "")
    .trim()
    .toLowerCase();
  if (!q) return posts;

  const byId = new Map(index.map((doc) => [doc.id, doc]));
  return posts.filter((p) => {
    const doc = byId.get(getKey(p));
    if (!doc) return false;
    return (
      doc.title.includes(q) ||
      doc.content.includes(q) ||
      doc.codes.includes(q) ||
      (doc.tags && doc.tags.some((t) => t.includes(q)))
    );
  });
};
