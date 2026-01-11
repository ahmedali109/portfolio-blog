---
id: 1
category: CSS
date: 18. August
title: Animierte Link-Unterstreichungen
description: Lernen Sie sanfte und elegante Link-Unterstreichungsanimationen mit CSS-Übergängen und -Transformationen.
---

## Einführung

Link-Unterstreichungen sind ein fester Bestandteil des Webdesigns, aber das standardmäßige Browser-Styling kann statisch und uninspiriert wirken. Lassen Sie uns erkunden, wie man sanfte und elegante Link-Unterstreichungsanimationen mit CSS-Übergängen und -Transformationen erstellt.

## HTML-Struktur

Zuerst richten wir unser HTML ein:

```html
<a href="#" class="animated-link">Fahren Sie mit der Maus darüber</a>
```

## CSS-Implementierung

Hier ist der CSS-Code zur Erstellung der Animation:

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

## Erweiterte Variationen

Sie können mehrere Variationen erstellen, indem Sie die Übergangseigenschaften ändern:

```css
/* Gleiten-Animation */
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

## Browser-Unterstützung

Diese Technik funktioniert in allen modernen Browsern einschließlich Chrome, Firefox, Safari und Edge. Für ältere Browser sollten Sie Fallback-Stile hinzufügen.

## Leistungstipps

Verwenden Sie transform und opacity für bessere Leistung anstelle von Änderungen an Breite oder Höhe. Dies stellt sicher, dass die Animation auf der GPU läuft und eine flüssige 60fps-Leistung liefert.
