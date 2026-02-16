---
title: "JavaScript and TypeScript Fundamentals for React Native Development"
description: "Master the essential JavaScript and TypeScript concepts needed for React Native development. Learn about modern ES6+ features, TypeScript types, async programming, and React-specific patterns."
date: "2024-03-27"
tags: ["react-native", "javascript", "typescript", "es6", "async-await", "hooks", "mobile-development", "web-development"]
chapter: 4
section: 2
---

# JavaScript and TypeScript Fundamentals for React Native

Understanding JavaScript and TypeScript fundamentals is crucial for successful React Native development. This guide covers essential concepts, modern features, and best practices that you'll use daily in your React Native projects.

## Modern JavaScript Essentials (ES6+)

### Arrow Functions
Arrow functions provide a concise syntax for writing function expressions:

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Use in React Native components
const MyComponent = () => {
  return <Text>Hello World</Text>;
};
```

### Destructuring
Extract values from objects and arrays efficiently:

```javascript
// Object destructuring
const user = { name: 'John', age: 30 };
const { name, age } = user;

// Array destructuring
const [first, second] = ['Hello', 'World'];

// Common in React Native
const { width, height } = useWindowDimensions();
```

### Spread and Rest Operators
Spread objects and arrays, collect remaining elements:

```typescript
// Spread operator
const baseStyles = { color: 'black', fontSize: 16 };
const styles = {
  ...baseStyles,
  fontWeight: 'bold',
};

// Rest parameters
const logAll = (...args) => {
  args.forEach(arg => console.log(arg));
};
```

## TypeScript in React Native

### Basic Types
Essential TypeScript types you'll use in React Native:

```typescript
// Basic types
const title: string = 'My App';
const count: number = 42;
const isActive: boolean = true;

// Arrays
const items: string[] = ['apple', 'banana'];
const numbers: Array<number> = [1, 2, 3];

// Objects
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

const user: User = {
  id: 1,
  name: 'John',
};
```

### Component Props
Define type-safe props for your components:

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
```

### Type Assertions and Unions
Handle flexible types and type conversions:

```typescript
// Type assertions
const input = event.target as TextInput;

// Union types
type Status = 'idle' | 'loading' | 'success' | 'error';
const [status, setStatus] = useState<Status>('idle');
```

## Asynchronous Programming

### Promises
Handle asynchronous operations elegantly:

```typescript
// Creating a promise
const fetchUserData = (userId: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Async operation
    api.getUser(userId)
      .then(user => resolve(user))
      .catch(error => reject(error));
  });
};

// Using promises
fetchUserData('123')
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

### Async/Await
Write cleaner asynchronous code:

```typescript
// Async function
async function loadData() {
  try {
    const user = await fetchUserData('123');
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error('Failed to load data:', error);
  }
}

// In React Native components
const ProfileScreen = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await loadData();
      setData(result);
    };
    fetchData();
  }, []);

  // ...
};
```

## React-Specific Patterns

### Hooks with TypeScript
Type-safe hooks in React Native:

```typescript
// useState with types
const [count, setCount] = useState<number>(0);

// useRef with types
const inputRef = useRef<TextInput>(null);

// Custom hook
interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounter = (initial: number = 0): UseCounterResult => {
  const [count, setCount] = useState(initial);

  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
  };
};
```

### Event Handling
Properly typed event handlers:

```typescript
interface TouchEvent {
  nativeEvent: {
    locationX: number;
    locationY: number;
  };
}

const handleTouch = (event: TouchEvent) => {
  const { locationX, locationY } = event.nativeEvent;
  console.log(`Touched at: ${locationX}, ${locationY}`);
};
```

## Best Practices and Common Patterns

### Null Checking
Safe handling of nullable values:

```typescript
// Optional chaining
const userName = user?.profile?.name;

// Nullish coalescing
const displayName = userName ?? 'Anonymous';
```

### Type Guards
Ensure type safety with custom type guards:

```typescript
interface User {
  id: string;
  name: string;
}

interface Error {
  code: number;
  message: string;
}

function isError(value: User | Error): value is Error {
  return 'code' in value;
}

const handleResponse = (response: User | Error) => {
  if (isError(response)) {
    console.error(response.message);
    return;
  }
  
  // TypeScript knows response is User here
  console.log(response.name);
};
```

### Constants and Enums
Organize your constants:

```typescript
// Enums for fixed values
enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  ERROR = 500,
}

// Const assertions for literal types
const THEME = {
  primary: '#FF6B2B',
  secondary: '#1a365d',
  background: '#ffffff',
} as const;

type ThemeColors = typeof THEME;
```

## Next Steps

Now that you understand the fundamental JavaScript and TypeScript concepts used in React Native development, you're ready to:
- Build type-safe components
- Handle asynchronous operations properly
- Write maintainable and scalable code
- Use modern JavaScript features effectively

In the next chapter, we'll explore React Native components in detail, where you'll apply these concepts to create robust mobile UIs.

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Native TypeScript Template](https://github.com/react-native-community/react-native-template-typescript)
- [JavaScript MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) 