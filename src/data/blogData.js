// Blog data structure for easy CRUD operations
export const blogData = [
  {
    id: 1,
    category: "CSS",
    date: "August 18",
    title: "Animating Link Underlines",
    description:
      "Learn smooth and elegant link underline animations using CSS transitions and transforms.",
    sections: [
      {
        heading: "Introduction",
        content:
          "Link underlines are a staple of web design, but the default browser styling can feel static and uninspired. Let's explore how to create smooth and elegant link underline animations using CSS transitions and transforms.",
      },
      {
        heading: "HTML Structure",
        content: "First, let's set up our HTML:",
        code: `<a href="#" class="animated-link">Hover over me</a>`,
      },
      {
        heading: "CSS Implementation",
        content: "Here's the CSS code to create the animation:",
        code: `.animated-link {
  position: relative;
  text-decoration: none;
  color: #3b82f6;
}

.animated-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
}

.animated-link:hover::after {
  width: 100%;
}`,
      },
      {
        heading: "Advanced Variations",
        content:
          "You can create multiple variations by changing the transition properties:",
        code: `/* Sliding animation */
.slide-link::after {
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.slide-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}`,
      },
      {
        heading: "Browser Support",
        content:
          "This technique works in all modern browsers including Chrome, Firefox, Safari, and Edge. For older browsers, consider adding fallback styles.",
      },
      {
        heading: "Performance Tips",
        content:
          "Use transform and opacity for better performance instead of width or height changes. This ensures the animation runs on the GPU and delivers smooth 60fps performance.",
      },
    ],
  },
  {
    id: 2,
    category: "CSS",
    date: "August 3",
    title: "Breaking to a new row with flexbox",
    description:
      "Master flexbox wrapping behavior and create responsive layouts.",
    sections: [
      {
        heading: "Understanding Flexbox Wrapping",
        content:
          "Flexbox is a powerful layout tool, but many developers don't fully understand how to control wrapping behavior. Let's dive into the best practices.",
      },
      {
        heading: "Setting Up Flexbox",
        code: `.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1 1 200px; /* Grow, Shrink, Basis */
}`,
      },
      {
        heading: "Flex Properties Explained",
        content:
          "flex-grow: How much the item grows relative to other items\nflex-shrink: How much the item shrinks relative to other items\nflex-basis: The default size of an item before free space is distributed",
      },
      {
        heading: "Complete Example",
        code: `/* Grid-like layout with flexbox */
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.gallery-item {
  flex: 1 1 250px;
  min-height: 250px;
  background: #1f2937;
  border-radius: 8px;
  overflow: hidden;
}`,
      },
      {
        heading: "Responsive Design",
        content:
          "You can adjust flex-basis at different breakpoints to create responsive layouts without media queries.",
      },
      {
        heading: "Common Pitfalls",
        content:
          "Avoid mixing flexbox with float or inline-block display properties. This can cause unexpected wrapping behavior.",
      },
    ],
  },
  {
    id: 3,
    category: "JS",
    date: "June 29",
    title: "Set Video Playback Speed with JavaScript",
    description:
      "Control video playback speed programmatically using the HTML5 video API.",
    sections: [
      {
        heading: "HTML5 Video API Basics",
        content:
          "Modern browsers provide the HTML5 video API which allows complete control over video playback, including speed.",
      },
      {
        heading: "HTML Setup",
        code: `<video id="myVideo" width="320" height="240">
  <source src="movie.mp4" type="video/mp4">
</video>

<div class="controls">
  <button onclick="setSpeed(0.5)">0.5x</button>
  <button onclick="setSpeed(1)">1x</button>
  <button onclick="setSpeed(1.5)">1.5x</button>
  <button onclick="setSpeed(2)">2x</button>
</div>`,
      },
      {
        heading: "JavaScript Implementation",
        code: `const video = document.getElementById('myVideo');

function setSpeed(speed) {
  video.playbackRate = speed;
  console.log(\`Playing at \${speed}x speed\`);
}

// Programmatic control
video.play();
video.pause();
video.currentTime = 30; // Seek to 30 seconds`,
      },
      {
        heading: "Advanced Features",
        content:
          "You can also change volume, get current time, and detect when video ends.",
        code: `// Change volume
video.volume = 0.5;

// Get current time
console.log(video.currentTime);

// Detect when video ends
video.addEventListener('ended', function() {
  console.log('Video finished playing');
});`,
      },
      {
        heading: "Browser Compatibility",
        content:
          "The HTML5 video API is supported in all modern browsers. Check caniuse.com for specific features.",
      },
      {
        heading: "Best Practices",
        content:
          "Always provide fallback content and test on multiple devices to ensure smooth playback.",
      },
    ],
  },
  {
    id: 4,
    category: "HTML",
    date: "May 9",
    title: "The Ultimate HTML Cheat Sheet For Beginners",
    description:
      "A comprehensive guide to essential HTML elements and best practices.",
    sections: [
      {
        heading: "HTML Document Structure",
        content: "Every HTML document should follow this basic structure:",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
</head>
<body>
  <!-- Content goes here -->
</body>
</html>`,
      },
      {
        heading: "Common HTML Elements",
        content:
          "Text Elements: <p>, <h1>-<h6>, <strong>, <em>, <span>\nStructure Elements: <header>, <nav>, <main>, <article>, <aside>, <footer>\nList Elements: <ul>, <ol>, <li>, <dl>, <dt>, <dd>",
      },
      {
        heading: "Semantic HTML",
        code: `<article>
  <header>
    <h1>Article Title</h1>
    <p>By Author on Date</p>
  </header>
  <p>Article content...</p>
  <footer>
    <p>Article metadata</p>
  </footer>
</article>`,
      },
      {
        heading: "Forms and Input",
        code: `<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  
  <button type="submit">Submit</button>
</form>`,
      },
      {
        heading: "Accessibility Tips",
        content:
          "Always use proper semantic HTML and provide alt text for images. Use headings in logical order and ensure good color contrast.",
      },
    ],
  },
  {
    id: 5,
    category: "HTML",
    date: "May 1",
    title: "HTML Tutorial",
    description:
      "Start your HTML journey with this beginner-friendly tutorial.",
    sections: [
      {
        heading: "What is HTML?",
        content:
          "HTML (HyperText Markup Language) is the standard markup language used to create web pages. It provides the structure and content of websites.",
      },
      {
        heading: "Installation",
        content:
          "You don't need to install anything! HTML works in any text editor and browser.",
        code: `1. Open any text editor (VSCode, Sublime, Notepad)
2. Create a file named index.html
3. Write your HTML code
4. Open the file in a web browser`,
      },
      {
        heading: "First HTML Page",
        code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first HTML page.</p>
</body>
</html>`,
      },
      {
        heading: "Key Concepts",
        content:
          "Tags: Enclosed in angle brackets <>\nElements: Opening tag, content, and closing tag\nAttributes: Provide additional information about elements",
      },
      {
        heading: "Learning Path",
        content:
          "1. Learn basic HTML structure\n2. Practice with common elements\n3. Create semantic markup\n4. Combine with CSS for styling\n5. Add JavaScript for interactivity",
      },
    ],
  },
  {
    id: 6,
    category: "CSS",
    date: "April 20",
    title: "CSS Advanced Techniques",
    description: "Explore modern CSS features for powerful styling.",
    sections: [
      {
        heading: "CSS Grid Layout",
        content:
          "CSS Grid is a powerful two-dimensional layout system for the web.",
        code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.grid-item {
  background: #1f2937;
  padding: 20px;
  border-radius: 8px;
}`,
      },
      {
        heading: "CSS Custom Properties (Variables)",
        code: `:root {
  --primary-color: #3b82f6;
  --secondary-color: #06b6d4;
  --spacing: 1rem;
}

body {
  background: var(--primary-color);
  padding: var(--spacing);
}`,
      },
      {
        heading: "Animations and Transitions",
        code: `@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.element {
  animation: slideIn 0.5s ease-out;
}`,
      },
      {
        heading: "Modern CSS Features",
        content:
          ":is() Selector: Simplify complex selectors\nContainer Queries: Style based on container size, not viewport\nCascade Layers: Manage CSS specificity better",
      },
    ],
  },
  {
    id: 7,
    category: "JS",
    date: "April 12",
    title: "JavaScript Fundamentals",
    description: "Build a solid foundation in JavaScript basics.",
    sections: [
      {
        heading: "Variables and Data Types",
        code: `// String
const name = "John";

// Number
const age = 25;

// Boolean
const isStudent = true;

// Array
const hobbies = ["coding", "reading", "gaming"];

// Object
const person = {
  name: "John",
  age: 25,
  city: "New York"
};`,
      },
      {
        heading: "Functions",
        code: `// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a, b) => a + b;

// Calling functions
console.log(greet("Alice"));
console.log(add(5, 3));`,
      },
      {
        heading: "Control Flow",
        code: `// If statement
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// For loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Array methods
const numbers = [1, 2, 3, 4];
numbers.forEach(num => console.log(num * 2));`,
      },
      {
        heading: "DOM Manipulation",
        code: `// Select elements
const element = document.getElementById("myId");
const elements = document.querySelectorAll(".myClass");

// Modify content
element.textContent = "New content";
element.innerHTML = "<p>HTML content</p>";

// Add event listener
element.addEventListener("click", () => {
  console.log("Clicked!");
});`,
      },
    ],
  },
  {
    id: 8,
    category: "JS",
    date: "April 9",
    title: "React Best Practices",
    description:
      "Learn industry-standard best practices for React development.",
    sections: [
      {
        heading: "Component Structure",
        code: `import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default MyComponent;`,
      },
      {
        heading: "State Management",
        content:
          "Keep state as local as possible. Only lift state when multiple components need it.",
      },
      {
        heading: "Props and Drilling",
        code: `// Parent Component
<ChildComponent title="Hello" onClick={handleClick} />

// Child Component
function ChildComponent({ title, onClick }) {
  return <button onClick={onClick}>{title}</button>;
}`,
      },
      {
        heading: "Key Principles",
        content:
          "1. Component composition over inheritance\n2. One responsibility per component\n3. Use hooks for side effects\n4. Memoize expensive computations\n5. Write testable components",
      },
      {
        heading: "Performance Optimization",
        code: `import { memo, useCallback } from 'react';

const OptimizedComponent = memo(function Component({ onClick }) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return <button onClick={handleClick}>Click me</button>;
});`,
      },
    ],
  },
];
