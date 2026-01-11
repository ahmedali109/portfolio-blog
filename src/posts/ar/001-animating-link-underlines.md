---
id: 1
category: CSS
date: 18 أغسطس
title: تحريك خطوط الروابط
description: تعلم كيفية إنشاء رسوم متحركة سلسة وأنيقة لخطوط الروابط باستخدام CSS.
---

## المقدمة

تعتبر خطوط الروابط عنصرًا أساسيًا في تصميم الويب، ولكن التنسيق الافتراضي للمتصفح قد يبدو ثابتًا وغير ملهم. دعنا نستكشف كيفية إنشاء رسوم متحركة سلسة وأنيقة لخطوط الروابط باستخدام انتقالات وتحويلات CSS.

## بنية HTML

أولاً، دعنا ننشئ هيكل HTML:

```html
<a href="#" class="animated-link">مرر الماوس هنا</a>
```

## تطبيق CSS

إليك كود CSS لإنشاء الرسوم المتحركة:

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

## تنويعات متقدمة

يمكنك إنشاء تنويعات متعددة من خلال تغيير خصائص الانتقال:

```css
/* رسوم متحركة منزلقة */
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

## دعم المتصفحات

تعمل هذه التقنية في جميع المتصفحات الحديثة بما في ذلك Chrome و Firefox و Safari و Edge. بالنسبة للمتصفحات القديمة، فكر في إضافة أنماط احتياطية.

## نصائح للأداء

استخدم transform و opacity لتحسين الأداء بدلاً من تغييرات العرض أو الارتفاع. يضمن هذا تشغيل الرسوم المتحركة على GPU وتقديم أداء سلس بمعدل 60 إطارًا في الثانية.
