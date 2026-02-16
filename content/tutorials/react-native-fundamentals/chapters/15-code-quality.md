---
title: "Code Quality and Best Practices in React Native"
description: "Learn how to maintain high code quality in React Native applications. Master TypeScript, ESLint, code organization, documentation, and industry best practices."
date: "2024-03-27"
tags: ["react-native", "code-quality", "typescript", "eslint", "documentation", "best-practices", "mobile-development"]
chapter: 15
section: 7
---

# Code Quality and Best Practices in React Native

Writing high-quality, maintainable code is crucial for long-term project success. In this chapter, you'll learn how to implement code quality standards and best practices in your React Native applications.

## Project Structure

### Directory Organization

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── screens/
│   │   ├── Home/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── Profile/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── index.tsx
│   └── navigation/
│       ├── AppNavigator.tsx
│       └── types.ts
├── hooks/
│   ├── useAuth.ts
│   └── useTheme.ts
├── services/
│   ├── api/
│   │   ├── client.ts
│   │   └── endpoints.ts
│   └── storage/
│       └── asyncStorage.ts
├── store/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── userSlice.ts
│   └── store.ts
├── utils/
│   ├── validation.ts
│   └── formatting.ts
└── types/
    └── index.ts
```

### Component Organization

```typescript
// src/components/common/Button/index.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { ButtonProps } from './types';
import { styles } from './styles';
import { useButtonLogic } from './hooks';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  const { handlePress, isLoading } = useButtonLogic({ onPress });

  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      onPress={handlePress}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {isLoading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

// src/components/common/Button/types.ts
export interface ButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

// src/components/common/Button/styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  // ... other styles
});

// src/components/common/Button/hooks.ts
import { useState } from 'react';

export function useButtonLogic({ onPress }: Pick<ButtonProps, 'onPress'>) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    try {
      setIsLoading(true);
      await onPress();
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePress, isLoading };
}
```

## TypeScript Configuration

### Strong Type Definitions

```typescript
// src/types/api.ts
export interface User {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

// Usage with strict typing
function updateUser(user: Partial<User>): Promise<User> {
  // Implementation
}

// Utility types for API responses
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

type ApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
};
```

### Type Guards and Assertions

```typescript
// src/utils/typeGuards.ts
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}

export function assertNonNull<T>(
  value: T | null | undefined,
  message: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

// Usage
try {
  const response = await api.getUser(userId);
  assertNonNull(response.data, 'User data is required');
  
  // TypeScript knows response.data is non-null here
  updateUserProfile(response.data);
} catch (error) {
  if (isApiError(error)) {
    // TypeScript knows error has code and message
    handleApiError(error);
  }
}
```

## ESLint Configuration

### Custom ESLint Rules

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    // Enforce import order
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    
    // Enforce naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
    ],
    
    // Prevent prop drilling
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'enforce',
      explicitSpread: 'ignore',
    }],
    
    // Enforce hook dependencies
    'react-hooks/exhaustive-deps': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
```

## Documentation Standards

### Component Documentation

```typescript
// src/components/common/Form/TextField.tsx
import React from 'react';
import { TextInput, View, Text } from 'react-native';

interface TextFieldProps {
  /** The label text displayed above the input */
  label: string;
  /** The current value of the input */
  value: string;
  /** Callback fired when the input value changes */
  onChangeText: (text: string) => void;
  /** Error message to display below the input */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** The type of keyboard to display */
  keyboardType?: 'default' | 'email-address' | 'numeric';
}

/**
 * TextField is a form input component that includes a label and error handling.
 * 
 * @example
 * ```tsx
 * <TextField
 *   label="Email"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={errors.email}
 *   keyboardType="email-address"
 * />
 * ```
 */
export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChangeText,
  error,
  disabled = false,
  keyboardType = 'default',
}) => {
  // Implementation
};
```

### API Documentation

```typescript
// src/services/api/users.ts
/**
 * User service for managing user-related API calls.
 */
export class UserService {
  /**
   * Retrieves a user by their ID.
   * 
   * @param userId - The unique identifier of the user
   * @returns Promise resolving to the user data
   * @throws {ApiError} When the user is not found or request fails
   * 
   * @example
   * ```ts
   * const user = await UserService.getUser('123');
   * console.log(user.name);
   * ```
   */
  static async getUser(userId: string): Promise<User> {
    // Implementation
  }

  /**
   * Updates a user's profile information.
   * 
   * @param userId - The unique identifier of the user
   * @param updates - Partial user object containing fields to update
   * @returns Promise resolving to the updated user data
   * @throws {ApiError} When the update fails
   */
  static async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    // Implementation
  }
}
```

## Testing Standards

### Component Testing

```typescript
// src/components/common/Button/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button Component', () => {
  const defaultProps = {
    title: 'Press Me',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('handles press events', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    fireEvent.press(getByText('Press Me'));
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state during async operations', async () => {
    const asyncOnPress = jest.fn().mockImplementation(() => {
      return new Promise(resolve => setTimeout(resolve, 100));
    });

    const { getByText, findByText } = render(
      <Button {...defaultProps} onPress={asyncOnPress} />
    );

    fireEvent.press(getByText('Press Me'));
    expect(await findByText('Loading...')).toBeTruthy();
  });
});
```

### Hook Testing

```typescript
// src/hooks/useAuth/useAuth.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from './useAuth';

describe('useAuth Hook', () => {
  beforeEach(() => {
    // Clear storage, reset mocks, etc.
  });

  it('provides authentication state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('handles login flow', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeTruthy();
  });
});
```

## Best Practices

1. **Error Boundaries**
```typescript
// src/components/common/ErrorBoundary.tsx
import React from 'react';
import { View, Text } from 'react-native';
import * as Sentry from '@sentry/react-native';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <View style={styles.container}>
          <Text style={styles.text}>Something went wrong</Text>
        </View>
      );
    }

    return this.props.children;
  }
}
```

2. **Performance Optimization**
```typescript
// src/components/screens/Home/PostList.tsx
import React, { memo, useCallback } from 'react';
import { FlatList } from 'react-native';

export const PostList = memo(({ posts, onPostPress }) => {
  const renderItem = useCallback(({ item }) => (
    <PostItem post={item} onPress={onPostPress} />
  ), [onPostPress]);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={5}
    />
  );
});
```

3. **Accessibility**
```typescript
// src/components/common/TouchableCard.tsx
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

export const TouchableCard = ({ 
  title,
  description,
  onPress,
  accessibilityLabel,
}) => (
  <TouchableOpacity
    onPress={onPress}
    accessible={true}
    accessibilityLabel={accessibilityLabel || title}
    accessibilityRole="button"
    accessibilityHint={`Activates ${title}`}
  >
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </TouchableOpacity>
);
```

## Next Steps

Now that you understand code quality standards and best practices, you can:
- Implement proper project structure
- Use TypeScript effectively
- Configure ESLint for your needs
- Write comprehensive documentation
- Follow testing standards
- Apply best practices for performance and accessibility

In the next chapter, we'll explore deployment and publishing your React Native app.

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript) 