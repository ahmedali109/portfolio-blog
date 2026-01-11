---
id: 6
category: CSS
date: 3 ديسمبر
title: تقنيات CSS المتقدمة
description: انتقل بمهاراتك في CSS إلى المستوى التالي مع التقنيات المتقدمة.
---

## تخطيط CSS Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## الخصائص المخصصة

```css
:root {
  --primary-color: #3b82f6;
}

.element {
  color: var(--primary-color);
}
```

## الرسوم المتحركة

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
