---
title: "State Management in React Native: From Local to Global"
description: "Learn effective state management patterns in React Native. Master local state with hooks, global state with Redux Toolkit, and data persistence with AsyncStorage for robust mobile applications."
date: "2024-03-27"
tags: ["react-native", "state-management", "redux-toolkit", "context-api", "async-storage", "hooks", "mobile-development"]
chapter: 10
section: 6
---

# State Management in React Native

State management is crucial for building scalable and maintainable React Native applications. In this chapter, you'll learn different approaches to managing state, from local component state to global application state.

## Local State Management

### useState and useReducer

```typescript
import React, { useState, useReducer } from 'react';
import { View, Text, Button } from 'react-native';

// Simple useState example
const CounterWithState: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button 
        title="Increment" 
        onPress={() => setCount(prev => prev + 1)} 
      />
    </View>
  );
};

// Complex state with useReducer
type CounterState = {
  count: number;
  lastUpdated: Date;
};

type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        lastUpdated: new Date(),
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        lastUpdated: new Date(),
      };
    case 'RESET':
      return {
        count: 0,
        lastUpdated: new Date(),
      };
    default:
      return state;
  }
};

const CounterWithReducer: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    lastUpdated: new Date(),
  });

  return (
    <View>
      <Text>Count: {state.count}</Text>
      <Text>Last Updated: {state.lastUpdated.toLocaleString()}</Text>
      <Button 
        title="Increment" 
        onPress={() => dispatch({ type: 'INCREMENT' })} 
      />
      <Button 
        title="Decrement" 
        onPress={() => dispatch({ type: 'DECREMENT' })} 
      />
      <Button 
        title="Reset" 
        onPress={() => dispatch({ type: 'RESET' })} 
      />
    </View>
  );
};
```

### Custom Hooks for State Logic

```typescript
import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems: number;
}

const usePagination = ({
  initialPage = 1,
  itemsPerPage = 10,
  totalItems,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};
```

## Global State Management

### Redux Toolkit Setup

First, install the required dependencies:

```bash
npm install @reduxjs/toolkit react-redux
```

### Store Configuration

```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Creating a Slice

```typescript
// src/store/slices/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

### Async Thunks

```typescript
// src/store/slices/todoSlice.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.example.com/todos');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // ... existing reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
```

### Using Redux in Components

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addTodo, toggleTodo, removeTodo } from '../store/slices/todoSlice';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  const handleAddTodo = (title: string) => {
    dispatch(addTodo({
      id: Date.now().toString(),
      title,
      completed: false,
    }));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <View>
      {items.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => dispatch(toggleTodo(todo.id))}
          onRemove={() => dispatch(removeTodo(todo.id))}
        />
      ))}
    </View>
  );
};
```

## Context API for Simpler State Management

```typescript
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Theme {
  primary: string;
  background: string;
  text: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme: Theme = {
    primary: isDark ? '#FF6B2B' : '#FF8F59',
    background: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
  };

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

## Data Persistence

### AsyncStorage Integration

First, install AsyncStorage:

```bash
npm install @react-native-async-storage/async-storage
```

### Persistent Storage Hook

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

interface UsePersistentStorageOptions<T> {
  key: string;
  initialValue: T;
}

const usePersistentStorage = <T>({
  key,
  initialValue,
}: UsePersistentStorageOptions<T>) => {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadValue();
  }, [key]);

  const loadValue = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateValue = async (newValue: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (err) {
      setError(err);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(initialValue);
    } catch (err) {
      setError(err);
    }
  };

  return {
    value,
    updateValue,
    removeValue,
    loading,
    error,
  };
};
```

### Redux Persistence

```typescript
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'todos'], // Only persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
```

## Best Practices

1. **State Organization**
```typescript
// Separate business logic from UI components
const useUserProfile = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getUser(userId);
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, refetch: fetchUser };
};
```

2. **Performance Optimization**
```typescript
// Memoize expensive computations
const memoizedValue = useMemo(() => {
  return expensiveComputation(dependencies);
}, [dependencies]);

// Prevent unnecessary re-renders
const MemoizedComponent = React.memo(({ prop1, prop2 }) => {
  return <View>{/* Component content */}</View>;
});
```

3. **Error Handling**
```typescript
const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error) => {
    setError(error);
    // Log to monitoring service
    logError(error);
  }, []);

  return {
    error,
    handleError,
    clearError: () => setError(null),
  };
};
```

## Next Steps

Now that you understand state management in React Native, you can:
- Choose the right state management solution for your needs
- Implement local and global state effectively
- Handle complex state logic with custom hooks
- Persist data across app launches
- Optimize performance with proper state organization

In the next chapter, we'll explore networking and data fetching in React Native.

## Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Context API](https://reactjs.org/docs/context.html)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [React Native Performance](https://reactnative.dev/docs/performance) 