---
title: "React Native Components and JSX: A Complete Guide"
description: "Learn everything about React Native components, from JSX syntax to lifecycle methods and hooks. Master functional components, props, state management, and component best practices for mobile development."
date: "2024-03-27"
tags: ["react-native", "components", "jsx", "hooks", "props", "state", "mobile-development", "ui-components"]
chapter: 5
section: 2
---

# React Native Components and JSX

React Native uses a component-based architecture where UIs are built from small, reusable pieces. In this chapter, you'll learn how to create, compose, and manage components effectively for your mobile applications.

## Understanding JSX in React Native

JSX is a syntax extension for JavaScript that lets you write HTML-like code in your JavaScript files. In React Native, JSX is used to describe how your UI should look.

### JSX Basics

```jsx
// Basic JSX syntax
const greeting = <Text>Hello, World!</Text>;

// JSX with expressions
const name = 'John';
const greeting2 = <Text>Hello, {name}!</Text>;

// Multi-line JSX
const profile = (
  <View style={styles.container}>
    <Image
      source={{ uri: 'https://example.com/avatar.jpg' }}
      style={styles.avatar}
    />
    <Text style={styles.name}>{name}</Text>
  </View>
);
```

### JSX Rules and Gotchas

```jsx
// 1. Always close tags
<View></View>
// or
<View />

// 2. Use curly braces for JavaScript expressions
<Text>Count: {2 + 2}</Text>

// 3. Style with objects, not strings
<View style={{ marginTop: 20 }} /> // ✅
<View style="margin-top: 20px" />  // ❌

// 4. className becomes style in React Native
<div className="container" />  // ❌ Web
<View style={styles.container} /> // ✅ React Native
```

## Function Components vs Class Components

While class components are still supported, function components with hooks are the modern way to write React Native components.

### Function Components

```typescript
interface GreetingProps {
  name: string;
  style?: StyleProp<TextStyle>;
}

const Greeting: React.FC<GreetingProps> = ({ name, style }) => {
  return (
    <Text style={style}>
      Hello, {name}!
    </Text>
  );
};

// Usage
<Greeting name="Alice" style={styles.greetingText} />
```

### Class Components (Legacy)

```typescript
interface CounterState {
  count: number;
}

class Counter extends React.Component<{}, CounterState> {
  state = {
    count: 0
  };

  increment = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <TouchableOpacity onPress={this.increment}>
        <Text>Count: {this.state.count}</Text>
      </TouchableOpacity>
    );
  }
}
```

## Props: Component Communication

Props are the primary way to pass data between components.

### Basic Props Usage

```typescript
interface CardProps {
  title: string;
  description: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  onPress,
  children
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
    </TouchableOpacity>
  );
};

// Usage
<Card
  title="Welcome"
  description="This is a card component"
  onPress={() => console.log('Card pressed')}
>
  <Button title="Learn More" />
</Card>
```

### Default Props and PropTypes

```typescript
interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium'
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size]
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
```

## State Management with Hooks

Hooks are functions that let you use state and other React features in function components.

### useState Hook

```typescript
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Button
        title={isActive ? 'Pause' : 'Start'}
        onPress={() => setIsActive(!isActive)}
      />
      <Button
        title="Reset"
        onPress={() => setCount(0)}
      />
    </View>
  );
};
```

### useEffect Hook

```typescript
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUser(userId);
        setUser(data);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.profile}>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
    </View>
  );
};
```

## Component Lifecycle

Understanding component lifecycle is crucial for managing side effects and cleanup.

### Mount and Unmount

```typescript
const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Mount: Start the timer
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Unmount: Clean up the timer
    return () => clearInterval(interval);
  }, []);

  return <Text>Seconds: {seconds}</Text>;
};
```

### Updates and Dependencies

```typescript
const AutoSave: React.FC<{ data: FormData }> = ({ data }) => {
  useEffect(() => {
    // Only run when data changes
    const saveData = async () => {
      await api.save(data);
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [data]); // Dependency array

  return null;
};
```

## Best Practices

### Component Organization

```typescript
// 📁 components/Button/index.tsx
export { default } from './Button';

// 📁 components/Button/Button.tsx
import styles from './Button.styles';

const Button: React.FC<ButtonProps> = (props) => {
  // Component logic
};

export default Button;

// 📁 components/Button/Button.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Styles
});
```

### Performance Optimization

```typescript
// Memoize expensive components
const ExpensiveList = React.memo(({ items }: { items: Item[] }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <ItemRow item={item} />}
      keyExtractor={item => item.id}
    />
  );
});

// Memoize callbacks
const ItemRow = ({ item, onPress }: ItemRowProps) => {
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};
```

## Next Steps

Now that you understand React Native components and JSX, you're ready to:
- Create reusable, type-safe components
- Manage component state effectively
- Handle component lifecycle events
- Optimize component performance
- Structure your component hierarchy

In the next chapter, we'll explore styling in React Native, where you'll learn how to make your components look beautiful and consistent across platforms.

## Additional Resources

- [React Native Components Documentation](https://reactnative.dev/docs/components-and-apis)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [TypeScript React Native Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [React Native Performance Guide](https://reactnative.dev/docs/performance) 