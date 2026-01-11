---
id: 8
category: JavaScript
date: February 20
title: React Best Practices
description: Write clean and maintainable React code following best practices.
---

## Component Structure

```javascript
function MyComponent({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

## State Management

```javascript
const [count, setCount] = useState(0);
const increment = () => setCount((prev) => prev + 1);
```

## Performance Tips

Use React.memo for expensive components, useCallback for event handlers, and useMemo for expensive calculations.
