---
id: 1
category: CSS
date: August 18
title: Animating Link Underlines
description: Learn smooth and elegant link underline animations using CSS transitions and transforms.
---

## Introduction

Link underlines are a staple of web design, but the default browser styling can feel static and uninspired. Let's explore how to create smooth and elegant link underline animations using CSS transitions and transforms.

## HTML Structure

First, let's set up our HTML:

```html
<a href="#" class="animated-link">Hover over me</a>
```

## CSS Implementation

Here's the CSS code to create the animation:

```css
.animated-link {
  position: relative;
  text-decoration: none;
  color: #3b82f6;
}

.animated-link::after {
  content: "";
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
}
```

## Advanced Variations

You can create multiple variations by changing the transition properties:

```css
/* Sliding animation */
.slide-link::after {
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.slide-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

## Browser Support

This technique works in all modern browsers including Chrome, Firefox, Safari, and Edge. For older browsers, consider adding fallback styles.

## Performance Tips

Use transform and opacity for better performance instead of width or height changes. This ensures the animation runs on the GPU and delivers smooth 60fps performance.
