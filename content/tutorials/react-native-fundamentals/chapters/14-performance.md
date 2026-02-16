---
title: "Performance Optimization in React Native"
description: "Master performance optimization techniques in React Native. Learn about render optimization, memory management, list virtualization, and advanced performance monitoring tools."
date: "2024-03-27"
tags: ["react-native", "performance", "optimization", "memory-management", "profiling", "mobile-development"]
chapter: 14
section: 6
---

# Performance Optimization in React Native

Performance is crucial for delivering a great user experience in mobile applications. In this chapter, you'll learn how to identify and resolve performance bottlenecks in React Native apps.

## Render Optimization

### Component Memoization

```typescript
// src/components/ExpensiveComponent.tsx
import React, { memo } from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
  data: any[];
}

const ExpensiveComponent = memo(({ title, data }: Props) => {
  // Expensive calculations
  const processedData = data.map(item => /* complex processing */);

  return (
    <View>
      <Text>{title}</Text>
      {processedData.map(item => (
        <Text key={item.id}>{item.value}</Text>
      ))}
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.title === nextProps.title &&
    prevProps.data.length === nextProps.data.length
  );
});

export default ExpensiveComponent;
```

### useMemo and useCallback

```typescript
// src/hooks/useDataProcessing.ts
import { useMemo, useCallback } from 'react';

export function useDataProcessing(data: any[]) {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => /* complex processing */);
  }, [data]);

  // Memoize callback functions
  const handleDataUpdate = useCallback((newItem: any) => {
    // Handle update logic
  }, []);

  return {
    processedData,
    handleDataUpdate,
  };
}
```

## List Performance

### FlatList Optimization

```typescript
// src/components/OptimizedList.tsx
import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

interface Item {
  id: string;
  title: string;
}

const OptimizedList: React.FC<{ data: Item[] }> = ({ data }) => {
  const [refreshing, setRefreshing] = useState(false);

  const renderItem: ListRenderItem<Item> = useCallback(({ item }) => (
    <ItemComponent item={item} />
  ), []);

  const keyExtractor = useCallback((item: Item) => item.id, []);

  const getItemLayout = useCallback(
    (_, index: number) => ({
      length: 80, // Fixed height for each item
      offset: 80 * index,
      index,
    }),
    []
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNewData();
    setRefreshing(false);
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={5}
      initialNumToRender={10}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default OptimizedList;
```

### VirtualizedList Implementation

```typescript
// src/components/VirtualizedView.tsx
import React from 'react';
import { VirtualizedList } from 'react-native';

interface Item {
  id: string;
  content: string;
}

const VirtualizedView: React.FC<{ items: Item[] }> = ({ items }) => {
  const getItem = (data: Item[], index: number) => data[index];
  const getItemCount = (data: Item[]) => data.length;
  const getItemLayout = (data: Item[], index: number) => ({
    length: 50,
    offset: 50 * index,
    index,
  });

  return (
    <VirtualizedList
      data={items}
      renderItem={({ item }) => <ItemComponent item={item} />}
      keyExtractor={item => item.id}
      getItem={getItem}
      getItemCount={getItemCount}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      updateCellsBatchingPeriod={50}
    />
  );
};
```

## Memory Management

### Image Optimization

```typescript
// src/components/OptimizedImage.tsx
import React, { useState } from 'react';
import { Image, ImageProps } from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props extends Omit<ImageProps, 'source'> {
  uri: string;
  width: number;
  height: number;
}

const OptimizedImage: React.FC<Props> = ({ uri, width, height, ...props }) => {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  return (
    <FastImage
      source={{
        uri,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      style={{ width, height }}
      resizeMode={FastImage.resizeMode.cover}
      onError={() => {
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
        }
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
```

### Memory Leak Prevention

```typescript
// src/hooks/useSubscription.ts
import { useEffect, useRef } from 'react';

export function useSubscription(subscribe: () => () => void) {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    unsubscribeRef.current = subscribe();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [subscribe]);
}

// Usage example
function DataComponent() {
  useSubscription(() => {
    const subscription = dataSource.subscribe();
    return () => subscription.unsubscribe();
  });
}
```

## Network Optimization

### Request Caching

```typescript
// src/utils/apiCache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheConfig {
  ttl: number;
  key: string;
}

export class APICache {
  static async get<T>(config: CacheConfig): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(config.key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > config.ttl;

      return isExpired ? null : data;
    } catch {
      return null;
    }
  }

  static async set<T>(config: CacheConfig, data: T): Promise<void> {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(config.key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
}
```

### Image Prefetching

```typescript
// src/utils/imagePrefetcher.ts
import FastImage from 'react-native-fast-image';

export class ImagePrefetcher {
  static prefetchImages(urls: string[]): Promise<void[]> {
    const prefetchTasks = urls.map(url =>
      FastImage.preload([{ uri: url }])
    );
    return Promise.all(prefetchTasks);
  }

  static prefetchScreen(screenImages: string[]) {
    return async () => {
      try {
        await this.prefetchImages(screenImages);
      } catch (error) {
        console.error('Image prefetch error:', error);
      }
    };
  }
}
```

## Performance Monitoring

### Custom Performance Hooks

```typescript
// src/hooks/usePerformanceMonitor.ts
import { useEffect, useRef } from 'react';
import { InteractionManager } from 'react-native';

export function usePerformanceMonitor(componentName: string) {
  const startTimeRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const task = InteractionManager.runAfterInteractions(() => {
      const renderTime = Date.now() - startTimeRef.current;
      console.log(`${componentName} render time: ${renderTime}ms`);
    });

    return () => task.cancel();
  }, [componentName]);
}

// Usage
function HeavyComponent() {
  usePerformanceMonitor('HeavyComponent');
  // Component logic
}
```

### Performance Metrics Collection

```typescript
// src/utils/performanceMetrics.ts
import { PerformanceObserver, performance } from 'perf_hooks';

export class PerformanceMetrics {
  private static instance: PerformanceMetrics;
  private metrics: Map<string, number[]>;

  private constructor() {
    this.metrics = new Map();
    this.setupObserver();
  }

  static getInstance(): PerformanceMetrics {
    if (!PerformanceMetrics.instance) {
      PerformanceMetrics.instance = new PerformanceMetrics();
    }
    return PerformanceMetrics.instance;
  }

  private setupObserver() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        this.recordMetric(entry.name, entry.duration);
      });
    });

    observer.observe({ entryTypes: ['measure'] });
  }

  startMeasure(name: string) {
    performance.mark(`${name}-start`);
  }

  endMeasure(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  }

  private recordMetric(name: string, duration: number) {
    const existing = this.metrics.get(name) || [];
    this.metrics.set(name, [...existing, duration]);
  }

  getMetrics(name: string) {
    return this.metrics.get(name) || [];
  }
}
```

## Best Practices

1. **Component Optimization**
```typescript
// Avoid inline styles
const styles = StyleSheet.create({
  container: {
    // styles
  },
});

// Use PureComponent or memo for static components
const StaticComponent = memo(() => (
  <View style={styles.container}>
    <Text>I rarely change</Text>
  </View>
));
```

2. **Event Handler Optimization**
```typescript
// Debounce expensive operations
import { debounce } from 'lodash';

const handleSearch = debounce((text: string) => {
  // Expensive search operation
}, 300);
```

3. **Asset Management**
```typescript
// Preload assets on app start
const preloadAssets = async () => {
  const imageAssets = Asset.loadAsync([
    require('./assets/logo.png'),
    require('./assets/background.jpg'),
  ]);

  const fontAssets = Font.loadAsync({
    'CustomFont': require('./assets/fonts/CustomFont.ttf'),
  });

  await Promise.all([imageAssets, fontAssets]);
};
```

## Next Steps

Now that you understand performance optimization in React Native, you can:
- Optimize component rendering
- Implement efficient list rendering
- Manage memory effectively
- Optimize network requests
- Monitor app performance

In the next chapter, we'll explore native modules and platform-specific code.

## Additional Resources

- [React Native Performance Guide](https://reactnative.dev/docs/performance)
- [React Native Profiler](https://reactnative.dev/docs/profiler)
- [Optimizing FlatList Configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration)
- [Memory Management](https://reactnative.dev/docs/ram-bundles-inline-requires) 