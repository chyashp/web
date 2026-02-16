---
title: "React Native Architecture and Best Practices"
description: "Learn how to architect scalable React Native applications. Master project structure, design patterns, state management, and architectural best practices for large-scale apps."
date: "2024-03-27"
tags: ["react-native", "architecture", "design-patterns", "state-management", "clean-architecture"]
chapter: 24
section: 13
---

# React Native Architecture and Best Practices

This chapter will guide you through architecting scalable and maintainable React Native applications, focusing on proven patterns and practices.

## Project Structure

### Feature-Based Architecture

```typescript
// Project structure
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   ├── profile/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   └── shared/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── utils/
├── core/
│   ├── api/
│   ├── config/
│   ├── navigation/
│   ├── storage/
│   └── theme/
└── app/
    ├── store.ts
    └── App.tsx
```

### Feature Module Example

```typescript
// src/features/auth/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// src/features/auth/services/auth.service.ts
import { api } from '@/core/api';
import { User } from '../types';

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  static async register(email: string, password: string, name: string): Promise<User> {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  }

  static async logout(): Promise<void> {
    await api.post('/auth/logout');
  }
}

// src/features/auth/store/auth.slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../services/auth.service';
import { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    return await AuthService.login(email, password);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

## Clean Architecture

### Domain Layer

```typescript
// src/core/domain/entities/user.entity.ts
export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    private readonly createdAt: Date
  ) {}

  isNewUser(): boolean {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.createdAt > thirtyDaysAgo;
  }
}

// src/core/domain/repositories/user.repository.ts
import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  getById(id: string): Promise<UserEntity>;
  update(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}

// src/core/domain/use-cases/update-user-profile.use-case.ts
export class UpdateUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, updates: Partial<UserEntity>): Promise<void> {
    const user = await this.userRepository.getById(userId);
    const updatedUser = { ...user, ...updates };
    await this.userRepository.update(updatedUser);
  }
}
```

### Data Layer

```typescript
// src/core/data/repositories/user.repository.impl.ts
import { api } from '@/core/api';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { UserRepository } from '@/core/domain/repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';

export class UserRepositoryImpl implements UserRepository {
  async getById(id: string): Promise<UserEntity> {
    const response = await api.get(`/users/${id}`);
    return UserMapper.toDomain(response.data);
  }

  async update(user: UserEntity): Promise<void> {
    const dto = UserMapper.toDTO(user);
    await api.put(`/users/${user.id}`, dto);
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
}

// src/core/data/mappers/user.mapper.ts
import { UserEntity } from '@/core/domain/entities/user.entity';
import { UserDTO } from '../dtos/user.dto';

export class UserMapper {
  static toDomain(dto: UserDTO): UserEntity {
    return new UserEntity(
      dto.id,
      dto.email,
      dto.name,
      new Date(dto.created_at)
    );
  }

  static toDTO(entity: UserEntity): UserDTO {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      created_at: entity.createdAt.toISOString(),
    };
  }
}
```

## Dependency Injection

### DI Container

```typescript
// src/core/di/container.ts
import { Container } from 'inversify';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserRepositoryImpl } from '../data/repositories/user.repository.impl';
import { UpdateUserProfileUseCase } from '../domain/use-cases/update-user-profile.use-case';

export const TYPES = {
  UserRepository: Symbol.for('UserRepository'),
  UpdateUserProfileUseCase: Symbol.for('UpdateUserProfileUseCase'),
};

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<UpdateUserProfileUseCase>(TYPES.UpdateUserProfileUseCase).to(UpdateUserProfileUseCase);

export { container };

// src/core/di/hooks/use-injection.ts
import { useContext } from 'react';
import { Container } from 'inversify';
import { DIContext } from '../context';

export function useInjection<T>(identifier: symbol): T {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('DIContext not found');
  }
  return container.get<T>(identifier);
}

// Usage in components
function UserProfile() {
  const updateProfile = useInjection<UpdateUserProfileUseCase>(TYPES.UpdateUserProfileUseCase);

  const handleUpdate = async (updates: Partial<UserEntity>) => {
    await updateProfile.execute(userId, updates);
  };

  return (
    // Component JSX
  );
}
```

## State Management

### Redux with TypeScript

```typescript
// src/app/store/root-reducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/auth.slice';
import profileReducer from '@/features/profile/store/profile.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

// src/app/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import rootReducer, { RootState } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Navigation Architecture

### Type-Safe Navigation

```typescript
// src/core/navigation/types.ts
import { UserEntity } from '@/core/domain/entities/user.entity';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  UserProfile: { userId: string };
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: { query?: string };
  Profile: { user: UserEntity };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// src/core/navigation/navigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Error Handling

### Error Boundary

```typescript
// src/core/error/error-boundary.tsx
import React, { Component, ErrorInfo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Sentry from '@sentry/react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleReset}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## Next Steps

Now that you understand React Native architecture, you can:
- Implement a feature-based project structure
- Apply clean architecture principles
- Set up dependency injection
- Create type-safe navigation
- Handle errors effectively
- Scale your application with confidence

## Additional Resources

- [Clean Architecture with React Native](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation TypeScript Guide](https://reactnavigation.org/docs/typescript/)
- [InversifyJS Documentation](https://inversify.io/) 