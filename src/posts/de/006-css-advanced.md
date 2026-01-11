---
id: 6
category: CSS
date: 3. Dezember
title: Fortgeschrittene CSS-Techniken
description: Bringen Sie Ihre CSS-Fähigkeiten mit fortgeschrittenen Techniken auf die nächste Stufe.
---

## CSS Grid Layout

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## Benutzerdefinierte Eigenschaften

```css
:root {
  --primary-color: #3b82f6;
}

.element {
  color: var(--primary-color);
}
```

## Animationen

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
