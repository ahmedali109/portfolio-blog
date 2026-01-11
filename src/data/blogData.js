// Import markdown parser
import { loadMarkdownPosts } from "../utils/markdownParser";

// Load posts synchronously using eager import
const en = await loadMarkdownPosts("en");
const ar = await loadMarkdownPosts("ar");
const de = await loadMarkdownPosts("de");

// Export blog data by language
export const blogDataByLanguage = {
  en,
  ar,
  de,
};
