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

  // Comments first (to prevent highlighting inside comments)
  addReplacement(
    /(\/\/.*$|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)/gm,
    "text-gray-500 italic",
    (m) => m[0]
  );

  // Strings (early to prevent conflicts)
  addReplacement(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    "text-green-400",
    (m) => m[0]
  );

  // JavaScript/TypeScript keywords
  addReplacement(
    /\b(const|let|var|function|return|if|else|for|while|do|import|export|from|as|default|class|extends|implements|interface|type|enum|async|await|new|try|catch|finally|throw|typeof|instanceof|switch|case|break|continue|in|of|this|super|static|public|private|protected|readonly|get|set|null|undefined|true|false|void|delete|yield|with)\b/g,
    "text-purple-400 font-semibold",
    (m) => m[0]
  );

  // Function calls
  addReplacement(
    /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
    "text-yellow-300",
    (m) => m[0]
  );

  // Numbers (hex, binary, octal, decimal, floats)
  addReplacement(
    /\b(0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/g,
    "text-orange-400",
    (m) => m[0]
  );

  // HTML/XML tags and attributes
  addReplacement(
    /(&lt;\/?)([\w-]+)/g,
    "text-pink-400 font-semibold",
    (m) => m[0]
  );

  addReplacement(/\b([\w-]+)(?==)/g, "text-blue-300", (m) => m[0]);

  // CSS properties (expanded list)
  addReplacement(
    /\b(display|position|color|background|background-color|background-image|padding|margin|border|border-radius|width|height|min-width|max-width|min-height|max-height|flex|flex-direction|flex-wrap|justify-content|align-items|align-content|grid|grid-template|gap|font|font-family|font-size|font-weight|text|text-align|text-decoration|text-transform|animation|transition|transform|opacity|z-index|top|left|right|bottom|content|overflow|overflow-x|overflow-y|cursor|pointer-events|box-shadow|box-sizing|visibility|white-space|line-height|letter-spacing|word-spacing|vertical-align|list-style|outline|resize|user-select)\s*:/g,
    "text-cyan-400",
    (m) => m[0]
  );

  // CSS units and values
  addReplacement(
    /\b(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|deg|rad|turn|s|ms)\b/g,
    "text-orange-400",
    (m) => m[0]
  );

  // CSS color values
  addReplacement(/#[0-9a-fA-F]{3,8}\b/g, "text-yellow-300", (m) => m[0]);

  // Template literals placeholders
  addReplacement(/\$\{[^}]+\}/g, "text-orange-300", (m) => m[0]);

  // Object keys in JSON/JavaScript
  addReplacement(
    /(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
    "text-sky-300",
    (m) => m[0]
  );

  // Special operators
  addReplacement(
    /(\+\+|--|===|!==|==|!=|<=|>=|=>|&&|\|\||!|\?|:)/g,
    "text-purple-300",
    (m) => m[0]
  );

  // Sort replacements by start position (descending) to replace from end to start
  replacements.sort((a, b) => b.start - a.start);

  // Remove overlapping replacements (keep first one found)
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
