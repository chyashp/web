---
title: "modern state management in react native: beyond redux"
excerpt: explore modern approaches to state management in react native apps, from context api to zustand, and learn when to use each solution for optimal app performance.
date: '2024-03-19'
tags:
  - state-management
  - react-native
  - mobile-development
  - performance
  - hooks
---

# modern state management in react native: beyond redux

effective state management is crucial for building maintainable and performant mobile applications. as react native applications grow in complexity, choosing the right state management approach becomes a critical architectural decision. in this guide, we'll explore modern alternatives to traditional redux and understand when to leverage each solution for optimal results.

## the evolution of state management in react native

state management has evolved significantly since the early days of react native. as [highlighted in the official React documentation](https://react.dev/learn/managing-state), the community has moved from centralized stores toward more modular and purpose-specific solutions.

this evolution reflects a deeper understanding of the different types of state in mobile applications:

```typescript
// Traditional Redux approach - centralized everything
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    entities: entitiesReducer,
    // Often became bloated with mixed concerns
  }
})

// Modern approach with Zustand - targeted, specific stores
import create from 'zustand'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    // Validation logic
    if (!credentials.email || !credentials.password) {
      throw new Error('Invalid credentials')
    }
    
    try {
      // Focused responsibility: authentication
      const user = await api.login(credentials)
      set({ user, isAuthenticated: true })
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  },
  logout: () => set({ user: null, isAuthenticated: false })
}))
```

according to [the 2023 State of JavaScript survey](https://2023.stateofjs.com/en-US/libraries/), there's been a significant rise in adoption of lighter alternatives to redux, with a growing preference for solutions that minimize boilerplate and offer better performance profiles.

## categorizing state for optimal management

before choosing a solution, it's essential to categorize your state properly. as [recommended by Tanner Linsley](https://tkdodo.eu/blog/practical-react-query), state generally falls into these categories:

### 1. ui state
- form inputs, toggles, selections
- modal visibility, animation states
- scrolling position, active tabs

### 2. client state
- user preferences, settings
- app configuration
- cached calculations

### 3. server state
- api responses
- backend-sourced data
- async resources

with these categories in mind, let's examine the most effective solutions for each.

## react context and hooks for ui/local state

react's built-in context api provides a lightweight solution for state that doesn't change frequently but needs to be accessible by multiple components. as the [React Native documentation explains](https://reactnative.dev/docs/0.71/components-and-apis), context is ideal for:

- theme/appearance settings
- user authentication
- feature flags
- localization

here's how to implement a clean, performant context pattern:

```typescript
// ThemeContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react'

// Define types for better maintainability
type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean // Derived state for convenience
}

// Create context with a helpful default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')
  
  // Memoize functions to prevent unnecessary renders
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])
  
  // Pre-compute derived values
  const isDark = theme === 'dark'
  
  // Memoize the context value
  const value = React.useMemo(() => ({
    theme,
    toggleTheme,
    isDark
  }), [theme, toggleTheme, isDark])
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for consuming the context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Usage in components
function ThemeAwareComponent() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <View style={styles[theme]}>
      <Text>Current theme: {theme}</Text>
      <Button onPress={toggleTheme} title="Toggle theme" />
    </View>
  )
}
```

when using context, follow these performance best practices:
- separate contexts by domain/update frequency
- use `React.memo` for components that consume context
- leverage `useMemo` to prevent unnecessary re-renders
- consider context splitting techniques for large state objects

## zustand for global client state

[zustand](https://github.com/pmndrs/zustand) has emerged as a leading solution for global state, offering the power of redux with significantly less boilerplate. according to [Poimandres](https://pmnd.rs/), the team behind zustand, this library excels at:

- global application state
- state that requires complex transitions
- cross-component synchronization
- persistent state with minimal configuration

here's how to implement a scalable zustand store:

```typescript
// store.ts - a well-structured zustand implementation
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Separate types for better organization
interface UserState {
  user: User | null
  isLoggedIn: boolean
}

interface UserActions {
  login: (user: User) => void
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

// Combine state and actions in the store type
interface UserStore extends UserState, UserActions {}

// Create store with persistence
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isLoggedIn: false,
      
      // Actions with clear responsibilities
      login: (user) => set({ user, isLoggedIn: true }),
      
      logout: () => set({ user: null, isLoggedIn: false }),
      
      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'user-storage', // Unique storage key
      storage: createJSONStorage(() => AsyncStorage), // RN storage adapter
      partialize: (state) => ({ 
        user: state.user,
        // Exclude derived/computed state and functions
      }),
    }
  )
)

// Create a selector hook for optimized component updates
export const useIsLoggedIn = () => useUserStore((state) => state.isLoggedIn)
export const useUser = () => useUserStore((state) => state.user)

// Component usage with optimized rendering
function ProfileSection() {
  // Only re-renders when user changes
  const user = useUser()
  const logout = useUserStore((state) => state.logout)
  
  if (!user) return null
  
  return (
    <View>
      <Text>Welcome, {user.name}</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  )
}
```

zustand benefits over redux include:
- minimal boilerplate code
- built-in persistence with minimal configuration
- automatic context provider
- simpler optimization with selectors
- better typescript integration

## jotai for atomic state management

[jotai](https://jotai.org/), inspired by recoil, provides atom-based state management that's particularly useful for fine-grained updates and derived state. according to the [jotai documentation](https://jotai.org/docs/introduction), it excels in:

- breaking state into atomic pieces
- creating derived/computed state
- minimizing re-renders across the component tree
- avoiding provider nesting issues

here's a practical jotai implementation:

```typescript
// atoms.ts
import { atom } from 'jotai'

// Base atoms - smallest units of state
export const nameAtom = atom('john')
export const surnameAtom = atom('doe')
export const ageAtom = atom(30)

// Derived atoms - computed based on other atoms
export const fullNameAtom = atom(
  (get) => `${get(nameAtom)} ${get(surnameAtom)}`
)

// Atoms with write logic
export const userAgeBracketAtom = atom(
  (get) => {
    const age = get(ageAtom)
    if (age < 18) return 'minor'
    if (age < 65) return 'adult'
    return 'senior'
  },
  (get, set, newAge: number) => {
    // Validation before setting
    if (newAge < 0 || newAge > 120) {
      console.error('Invalid age value')
      return
    }
    set(ageAtom, newAge)
  }
)

// Component with optimized rendering
function UserProfile() {
  // Components only re-render when accessed atoms change
  const [name, setName] = useAtom(nameAtom)
  const [surname, setSurname] = useAtom(surnameAtom)
  const [fullName] = useAtom(fullNameAtom)
  const [ageBracket, setAge] = useAtom(userAgeBracketAtom)
  
  return (
    <View>
      <Text>Full name: {fullName}</Text>
      <Text>Age bracket: {ageBracket}</Text>
      
      <TextInput value={name} onChangeText={setName} />
      <TextInput value={surname} onChangeText={setSurname} />
      <Button onPress={() => setAge(35)} title="Update age" />
    </View>
  )
}
```

jotai's unique benefits include:
- no need for selectors to optimize renders
- seamless derived state
- works well with concurrent mode
- simpler debugging with atom-based approach

## react query for server state management

[tanstack query](https://tanstack.com/query/latest) (formerly react query) has become the standard for managing server state in react applications. as [outlined by its creator](https://tkdodo.eu/blog/react-query-as-a-state-manager), it's specifically designed for:

- api data fetching and caching
- background updates and synchronization
- error handling for server operations
- pagination and infinite scrolling
- optimistic updates

implementing react query correctly in a react native app:

```typescript
// api.ts - clean react query implementation
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './api-client'

// Types for better maintainability
interface Todo {
  id: string
  title: string
  completed: boolean
}

// Custom hooks for data fetching with proper error handling
export function useTodos() {
  return useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: () => api.getTodos(),
    // Configuration for better UX
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404s or auth failures
      if (error?.status === 404 || error?.status === 401) return false
      return failureCount < 3
    }
  })
}

// Mutation hook with optimistic updates
export function useAddTodo() {
  const queryClient = useQueryClient()
  
  return useMutation<Todo, Error, Omit<Todo, 'id'>>({
    mutationFn: (newTodo) => api.addTodo(newTodo),
    
    // Optimistic update for better UX
    onMutate: async (newTodo) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || []
      
      // Optimistically update the cache
      queryClient.setQueryData<Todo[]>(['todos'], old => [
        ...(old || []),
        { ...newTodo, id: `temp-${Date.now()}` }
      ])
      
      return { previousTodos }
    },
    
    // Error handling: rollback on error
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
      console.error('Failed to add todo:', err)
    },
    
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

// Component with proper loading/error handling
function TodoListScreen() {
  const [newTodoText, setNewTodoText] = useState('')
  const { data: todos, isLoading, isError, error } = useTodos()
  const addTodoMutation = useAddTodo()
  
  const handleAddTodo = () => {
    if (!newTodoText.trim()) return
    
    addTodoMutation.mutate({
      title: newTodoText,
      completed: false
    })
    setNewTodoText('')
  }
  
  if (isLoading) return <LoadingSpinner />
  
  if (isError) return (
    <ErrorView message={`Failed to load todos: ${error?.message}`} />
  )
  
  return (
    <View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="New todo..."
        />
        <Button
          onPress={handleAddTodo}
          title="Add"
          disabled={addTodoMutation.isLoading}
        />
      </View>
      
      {addTodoMutation.isError && (
        <Text style={styles.errorText}>
          Error adding todo: {addTodoMutation.error?.message}
        </Text>
      )}
    </View>
  )
}
```

key benefits of react query for mobile apps include:
- automatic background refetching
- smart request deduplication
- window focus refetching
- optimized for offline-first experiences
- pagination and infinite list support

## performance optimization strategies

as highlighted in the [React Native performance documentation](https://reactnative.dev/docs/performance), state management choices directly impact app performance. implement these optimizations:

### 1. minimize rerenders with proper state structure

```typescript
// BAD: Single large state object causes unnecessary rerenders
const useGlobalStore = create((set) => ({
  user: null,
  settings: { theme: 'light', notifications: true },
  todos: [],
  // Everything updates together
}))

// GOOD: Separated concerns allow targeted updates
const useUserStore = create((set) => ({ user: null, setUser: (user) => set({ user }) }))
const useSettingsStore = create((set) => ({ 
  theme: 'light',
  notifications: true,
  // Only settings components rerender on change
}))
```

### 2. implement proper selector patterns

```typescript
// Without selectors: component rerenders on any store change
function UserGreeting() {
  const store = useStore()
  return <Text>Hello, {store.user.name}</Text>
}

// With selectors: component only rerenders when name changes
function UserGreeting() {
  const userName = useStore(state => state.user?.name)
  return <Text>Hello, {userName}</Text>
}
```

### 3. leverage middleware for performance monitoring

```typescript
// Add performance monitoring to zustand
import { subscribeWithSelector } from 'zustand/middleware'

const useStore = create(
  subscribeWithSelector(
    (set) => ({
      // store implementation
    })
  )
)

// Monitor specific state changes
useStore.subscribe(
  state => state.counter,
  (counter) => {
    console.log('Counter changed to:', counter)
    // Track performance metrics
  }
)
```

## migrating between state management solutions

transitioning between state management solutions? follow these battle-tested strategies from the [Redux Toolkit migration guide](https://redux-toolkit.js.org/tutorials/migrate-from-redux):

### 1. incremental adoption pattern

```typescript
// Hybrid approach during migration
function App() {
  return (
    // Keep existing Redux provider
    <ReduxProvider store={legacyStore}>
      <QueryClientProvider client={queryClient}>
        {/* New features use modern solutions */}
        <NewFeatureWithReactQuery />
        {/* Legacy features still use Redux */}
        <LegacyFeatureWithRedux />
      </QueryClientProvider>
    </ReduxProvider>
  )
}
```

### 2. adapter pattern for transitioning

```typescript
// Create adapter between old and new state systems
function useUserAdapter() {
  // Get user from old Redux store
  const legacyUser = useSelector(state => state.auth.user)
  // Get actions from new state manager
  const { login, logout } = useUserStore()
  
  // Set up synchronization
  useEffect(() => {
    if (legacyUser && !useUserStore.getState().user) {
      // Keep new store in sync with old during transition
      login(legacyUser)
    }
  }, [legacyUser, login])
  
  return { legacyUser, login, logout }
}
```

## key takeaways

- **categorize your state**: different types of state need different management solutions
- **choose the right tool**: context for ui, zustand for client state, react query for server data
- **optimize selectively**: focus optimization efforts on frequently updating states
- **consider composition**: modern apps benefit from combining specialized solutions
- **prioritize developer experience**: reduced boilerplate leads to fewer bugs and faster development

the modern approach to state management in react native emphasizes purpose-built tools over monolithic solutions. by selecting the right tool for each type of state, you can build more maintainable, performant applications.

as [Kent C. Dodds explains](https://kentcdodds.com/blog/application-state-management-with-react), "the more state you have to manage, the more important it becomes to be intentional about how you manage it."