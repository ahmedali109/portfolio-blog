// Simple syntax highlighter for code blocks
export const highlightCode = (code) => {
  // Create an array to store replacements and their positions
  const replacements = [];

  // Helper function to add a replacement
  const addReplacement = (pattern, className, replacement) => {
    let match;
    const regex = new RegExp(pattern, "gm");
    while ((match = regex.exec(code)) !== null) {
      replacements.push({
        start: match.index,
        end: match.index + match[0].length,
        replacement: `<span class="${className}">${replacement(match)}</span>`,
      });
    }
  };

  // Keywords
  addReplacement(
    /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|extends|async|await|new|try|catch|throw|typeof|instanceof|switch|case|break|continue|default|do|in|of|this|super|static|get|set|null|undefined|true|false|void|delete)\b/g,
    "text-purple-400 font-semibold",
    (m) => m[0]
  );

  // Numbers
  addReplacement(/\b(\d+\.?\d*)\b/g, "text-orange-400", (m) => m[0]);

  // HTML tags
  addReplacement(
    /(&lt;\/?\w+[^&]*?&gt;|<\/?[\w\s="/.':;#-\/]+>)/g,
    "text-pink-400",
    (m) => m[0]
  );

  // CSS properties
  addReplacement(
    /\b(display|position|color|background|padding|margin|border|width|height|flex|grid|font|text|animation|transition|transform|opacity|z-index|top|left|right|bottom|content|overflow|cursor)\s*:/g,
    "text-cyan-400",
    (m) => m[0]
  );

  // Comments (should be after keywords to avoid highlighting keywords in comments)
  addReplacement(
    /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    "text-gray-500 italic",
    (m) => m[0]
  );

  // Strings (should be last to avoid highlighting special chars inside strings)
  addReplacement(/(".*?"|'.*?'|`.*?`)/g, "text-green-400", (m) => m[0]);

  // Sort replacements by start position (descending) to replace from end to start
  replacements.sort((a, b) => b.start - a.start);

  // Remove overlapping replacements
  const finalReplacements = [];
  replacements.forEach((replacement) => {
    const overlaps = finalReplacements.some(
      (r) => replacement.start < r.end && replacement.end > r.start
    );
    if (!overlaps) {
      finalReplacements.push(replacement);
    }
  });

  // Apply replacements from end to start to maintain correct positions
  let highlighted = code;
  finalReplacements.forEach((replacement) => {
    highlighted =
      highlighted.substring(0, replacement.start) +
      replacement.replacement +
      highlighted.substring(replacement.end);
  });

  return highlighted;
};
