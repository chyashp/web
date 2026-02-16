---
title: "API Integration and Networking in React Native"
description: "Master API integration in React Native applications. Learn RESTful API consumption, GraphQL integration, offline support, and best practices for handling network requests and responses."
date: "2024-03-27"
tags: ["react-native", "api-integration", "networking", "rest-api", "graphql", "axios", "fetch-api", "mobile-development"]
chapter: 11
section: 7
---

# API Integration and Networking in React Native

Modern mobile applications rely heavily on network communication. In this chapter, you'll learn how to effectively integrate APIs, handle network requests, and manage data fetching in React Native applications.

## HTTP Client Setup

We'll use Axios for HTTP requests due to its robust features and consistent API across platforms.

```bash
npm install axios
```

### API Client Configuration

```typescript
// src/api/client.ts
import axios, { AxiosError, AxiosInstance } from 'axios';
import { getAuthToken } from '../utils/auth';

const baseURL = 'https://api.example.com/v1';

export const createAPIClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    async (config) => {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        // e.g., redirect to login
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createAPIClient();
```

## API Service Layer

### Type Definitions

```typescript
// src/types/api.ts
export interface APIResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface APIError {
  message: string;
  code: string;
  status: number;
}
```

### API Services

```typescript
// src/services/userService.ts
import { apiClient } from '../api/client';
import { User, UpdateUserDTO } from '../types/user';
import { APIResponse, PaginatedResponse } from '../types/api';

export const userService = {
  getCurrentUser: async (): Promise<APIResponse<User>> => {
    const response = await apiClient.get('/user/me');
    return response.data;
  },

  updateProfile: async (data: UpdateUserDTO): Promise<APIResponse<User>> => {
    const response = await apiClient.put('/user/profile', data);
    return response.data;
  },

  getUsers: async (page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get('/users', {
      params: { page, pageSize },
    });
    return response.data;
  },
};

// src/services/postService.ts
import { Post, CreatePostDTO } from '../types/post';

export const postService = {
  getPosts: async (page: number = 1): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get('/posts', {
      params: { page },
    });
    return response.data;
  },

  createPost: async (data: CreatePostDTO): Promise<APIResponse<Post>> => {
    const response = await apiClient.post('/posts', data);
    return response.data;
  },

  uploadImage: async (image: File): Promise<APIResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
```

## Custom Hooks for Data Fetching

### Basic Data Fetching Hook

```typescript
// src/hooks/useAPI.ts
import { useState, useEffect } from 'react';
import { APIError } from '../types/api';

interface UseAPIOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: APIError) => void;
  enabled?: boolean;
}

export const useAPI = <T>(
  fetchFn: () => Promise<T>,
  options: UseAPIOptions<T> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError);
      options.onError?.(apiError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.enabled !== false) {
      fetchData();
    }
  }, [options.enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
```

### Paginated Data Hook

```typescript
// src/hooks/usePaginatedAPI.ts
import { useState } from 'react';
import { PaginatedResponse, APIError } from '../types/api';

interface UsePaginatedAPIOptions<T> {
  pageSize?: number;
  onSuccess?: (data: PaginatedResponse<T>) => void;
  onError?: (error: APIError) => void;
}

export const usePaginatedAPI = <T>(
  fetchFn: (page: number, pageSize: number) => Promise<PaginatedResponse<T>>,
  options: UsePaginatedAPIOptions<T> = {}
) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetchFn(page, options.pageSize || 10);
      
      setItems(prev => [...prev, ...response.items]);
      setHasMore(response.hasMore);
      setPage(prev => prev + 1);
      options.onSuccess?.(response);
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError);
      options.onError?.(apiError);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    await loadMore();
  };

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
```

## Error Handling and Retry Logic

```typescript
// src/utils/apiUtils.ts
import { AxiosError } from 'axios';

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (error instanceof AxiosError) {
        // Don't retry on client errors (4xx)
        if (error.response?.status && error.response.status < 500) {
          throw error;
        }
      }
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// Usage example
const fetchWithRetry = async () => {
  return retryWithBackoff(
    () => apiClient.get('/potentially-flaky-endpoint'),
    3,
    1000
  );
};
```

## Offline Support

### Network Status Monitoring

```typescript
// src/hooks/useNetworkStatus.ts
import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
};
```

### Offline Queue

```typescript
// src/utils/offlineQueue.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

interface QueuedRequest {
  id: string;
  url: string;
  method: string;
  data?: any;
  timestamp: number;
}

export class OfflineQueue {
  private static QUEUE_KEY = '@offline_queue';
  private static instance: OfflineQueue;

  private constructor() {}

  static getInstance(): OfflineQueue {
    if (!OfflineQueue.instance) {
      OfflineQueue.instance = new OfflineQueue();
    }
    return OfflineQueue.instance;
  }

  async addToQueue(request: Omit<QueuedRequest, 'id' | 'timestamp'>): Promise<void> {
    const queue = await this.getQueue();
    const newRequest: QueuedRequest = {
      ...request,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    queue.push(newRequest);
    await AsyncStorage.setItem(OfflineQueue.QUEUE_KEY, JSON.stringify(queue));
  }

  async processQueue(): Promise<void> {
    const queue = await this.getQueue();
    const failedRequests: QueuedRequest[] = [];

    for (const request of queue) {
      try {
        await apiClient({
          url: request.url,
          method: request.method,
          data: request.data,
        });
      } catch (error) {
        failedRequests.push(request);
      }
    }

    await AsyncStorage.setItem(
      OfflineQueue.QUEUE_KEY,
      JSON.stringify(failedRequests)
    );
  }

  private async getQueue(): Promise<QueuedRequest[]> {
    const queue = await AsyncStorage.getItem(OfflineQueue.QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  }
}
```

## GraphQL Integration

First, install the required dependencies:

```bash
npm install @apollo/client graphql
```

### Apollo Client Setup

```typescript
// src/api/graphql.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuthToken } from '../utils/auth';

const httpLink = createHttpLink({
  uri: 'https://api.example.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

### GraphQL Operations

```typescript
// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
        createdAt
      }
    }
  }
`;

// src/graphql/mutations.ts
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

// Usage in components
const UserProfile: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const handleUpdate = async (input: UpdateUserInput) => {
    try {
      await updateUser({
        variables: { id: userId, input },
      });
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <View>
      <Text>{data.user.name}</Text>
      {/* Rest of the component */}
    </View>
  );
};
```

## Best Practices

1. **Request Caching**
```typescript
// src/utils/cache.ts
import { Cache } from '../types/cache';

export class RequestCache {
  private cache: Map<string, Cache<any>> = new Map();
  private readonly TTL: number = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.TTL;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }
}
```

2. **API Error Handling**
```typescript
// src/utils/errorHandling.ts
export class APIErrorHandler {
  static handle(error: any): APIError {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data.message || 'Server error',
        code: error.response.data.code || 'UNKNOWN',
        status: error.response.status,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'No response from server',
        code: 'NETWORK_ERROR',
        status: 0,
      };
    } else {
      // Request setup error
      return {
        message: error.message || 'Request failed',
        code: 'REQUEST_FAILED',
        status: 0,
      };
    }
  }
}
```

3. **Request Debouncing**
```typescript
// src/hooks/useDebounce.ts
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage in search
const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <TextInput
      value={query}
      onChangeText={setQuery}
      placeholder="Search..."
    />
  );
};
```

## Next Steps

Now that you understand API integration in React Native, you can:
- Build robust networking layers
- Handle API requests and responses effectively
- Implement offline support
- Use GraphQL for complex data requirements
- Optimize network performance

In the next chapter, we'll explore testing and debugging in React Native.

## Additional Resources

- [Axios Documentation](https://axios-http.com/docs/intro)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [React Native Networking](https://reactnative.dev/docs/network)
- [GraphQL Documentation](https://graphql.org/learn/) 