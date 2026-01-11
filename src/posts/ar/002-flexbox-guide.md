---
id: 2
category: CSS
date: 22 يوليو
title: دليل شامل لـ Flexbox
description: أتقن CSS Flexbox مع أمثلة عملية وحالات استخدام واقعية.
---

## مقدمة إلى Flexbox

Flexbox هي طريقة تخطيط أحادية البعد لترتيب العناصر في صفوف أو أعمدة. تجعل التخطيطات المعقدة أسهل في التنفيذ والصيانة.

## خصائص الحاوية الأساسية

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## عناصر Flex

يمكن التحكم في العناصر داخل حاوية flex بشكل فردي باستخدام خصائص مثل flex-grow و flex-shrink و flex-basis.

## الأنماط الشائعة

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```
