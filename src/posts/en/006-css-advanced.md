---
id: 6
category: CSS
date: December 3
title: Advanced CSS Techniques
description: Take your CSS skills to the next level with advanced techniques.
---

## CSS Grid Layout

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## Custom Properties

```css
:root {
  --primary-color: #3b82f6;
}

.element {
  color: var(--primary-color);
}
```

## Animations

```css
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}
```
