// Simple syntax highlighter for code blocks
export const highlightCode = (code) => {
  // Keywords
  const keywords =
    /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|extends|async|await|new|try|catch|throw|typeof|instanceof|switch|case|break|continue|default|do|in|of|this|super|static|get|set|null|undefined|true|false|void|delete)\b/g;

  // Strings
  const strings = /(".*?"|'.*?'|`.*?`)/g;

  // Comments
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;

  // Numbers
  const numbers = /\b(\d+\.?\d*)\b/g;

  // Functions
  const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;

  // HTML tags
  const htmlTags = /(&lt;\/?\w+[^&]*?&gt;|<\/?[\w\s="/.':;#-\/]+>)/g;

  // CSS properties
  const cssProperties =
    /\b(display|position|color|background|padding|margin|border|width|height|flex|grid|font|text|animation|transition|transform|opacity|z-index|top|left|right|bottom|content|overflow|cursor)\s*:/g;

  let highlighted = code;

  // Apply syntax highlighting
  highlighted = highlighted
    .replace(comments, '<span class="text-gray-500 italic">$1</span>')
    .replace(strings, '<span class="text-green-400">$1</span>')
    .replace(keywords, '<span class="text-purple-400 font-semibold">$1</span>')
    .replace(numbers, '<span class="text-orange-400">$1</span>')
    .replace(functions, '<span class="text-yellow-400">$1</span>(')
    .replace(htmlTags, '<span class="text-pink-400">$1</span>')
    .replace(cssProperties, '<span class="text-cyan-400">$1</span>:');

  return highlighted;
};
