---
title: "Production Deployment and Monitoring"
description: "Learn how to deploy, monitor, and maintain React Native applications in production. Master error tracking, analytics, performance monitoring, and automated updates."
date: "2024-03-27"
tags: ["react-native", "production", "monitoring", "analytics", "error-tracking", "performance"]
chapter: 21
section: 10
---

# Production Deployment and Monitoring

This chapter will guide you through the process of deploying, monitoring, and maintaining your React Native application in production.

## Error Tracking and Monitoring

### Sentry Integration

```typescript
// src/config/sentry.ts
import * as Sentry from '@sentry/react-native';

interface SentryConfig {
  dsn: string;
  environment: string;
  enableAutoSessionTracking: boolean;
  sessionTrackingIntervalMillis: number;
  debug: boolean;
}

export function initializeSentry(config: SentryConfig) {
  Sentry.init({
    ...config,
    enableAutoPerformanceTracking: true,
    tracesSampleRate: 1.0,
    attachStacktrace: true,
  });
}

// Usage in App.tsx
const sentryConfig: SentryConfig = {
  dsn: 'your-sentry-dsn',
  environment: __DEV__ ? 'development' : 'production',
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 30000,
  debug: __DEV__,
};

initializeSentry(sentryConfig);
```

### Custom Error Boundary

```typescript
// src/components/ErrorBoundary.tsx
import React from 'react';
import * as Sentry from '@sentry/react-native';

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Usage
const ErrorFallback = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Something went wrong</Text>
    <Text style={styles.message}>The app has encountered an error.</Text>
    <Button 
      title="Try Again"
      onPress={() => window.location.reload()}
    />
  </View>
);

// In App.tsx
export default function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AppContent />
    </ErrorBoundary>
  );
}
```

## Analytics Implementation

### Firebase Analytics Setup

```typescript
// src/services/analytics.ts
import analytics from '@react-native-firebase/analytics';

export interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
}

export interface UserProperties {
  userId?: string;
  userType?: string;
  subscription?: string;
}

class AnalyticsService {
  private enabled: boolean = false;

  async initialize(): Promise<void> {
    if (__DEV__) {
      await analytics().setAnalyticsCollectionEnabled(false);
      return;
    }

    await analytics().setAnalyticsCollectionEnabled(true);
    this.enabled = true;
  }

  async trackScreen(screenName: string, screenClass?: string): Promise<void> {
    if (!this.enabled) return;

    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  }

  async trackEvent({ name, params }: AnalyticsEvent): Promise<void> {
    if (!this.enabled) return;

    await analytics().logEvent(name, params);
  }

  async setUserProperties(properties: UserProperties): Promise<void> {
    if (!this.enabled) return;

    if (properties.userId) {
      await analytics().setUserId(properties.userId);
    }

    Object.entries(properties).forEach(([key, value]) => {
      if (value) {
        analytics().setUserProperty(key, value);
      }
    });
  }
}

export const analyticsService = new AnalyticsService();

// Usage in components
function ProfileScreen() {
  useEffect(() => {
    analyticsService.trackScreen('Profile');
  }, []);

  const handleSubscribe = async () => {
    await analyticsService.trackEvent({
      name: 'subscribe',
      params: { plan: 'premium' }
    });
  };

  return (
    // Component JSX
  );
}
```

## Performance Monitoring

### Firebase Performance Monitoring

```typescript
// src/services/performance.ts
import perf, { FirebasePerformanceTypes } from '@react-native-firebase/perf';

class PerformanceService {
  private enabled: boolean = false;
  private traces: Map<string, FirebasePerformanceTypes.Trace> = new Map();

  async initialize(): Promise<void> {
    if (__DEV__) {
      await perf().setPerformanceCollectionEnabled(false);
      return;
    }

    await perf().setPerformanceCollectionEnabled(true);
    this.enabled = true;
  }

  async startTrace(traceName: string): Promise<void> {
    if (!this.enabled) return;

    const trace = await perf().startTrace(traceName);
    this.traces.set(traceName, trace);
  }

  async stopTrace(traceName: string, metrics?: Record<string, number>): Promise<void> {
    if (!this.enabled) return;

    const trace = this.traces.get(traceName);
    if (!trace) return;

    if (metrics) {
      Object.entries(metrics).forEach(([key, value]) => {
        trace.putMetric(key, value);
      });
    }

    await trace.stop();
    this.traces.delete(traceName);
  }

  async startNetworkMonitoring(): Promise<void> {
    if (!this.enabled) return;

    const httpMetric = await perf().newHttpMetric('https://api.yourapp.com', 'GET');
    await httpMetric.start();

    // Add to your API interceptor
    // await httpMetric.setHttpResponseCode(response.status);
    // await httpMetric.setResponseContentType(response.headers['content-type']);
    // await httpMetric.stop();
  }
}

export const performanceService = new PerformanceService();

// Usage in API service
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.yourapp.com',
});

api.interceptors.request.use(async (config) => {
  const httpMetric = await perf().newHttpMetric(config.url!, config.method!.toUpperCase());
  await httpMetric.start();
  config.metadata = { httpMetric };
  return config;
});

api.interceptors.response.use(
  async (response) => {
    const { httpMetric } = response.config.metadata;
    await httpMetric.setHttpResponseCode(response.status);
    await httpMetric.setResponseContentType(response.headers['content-type']);
    await httpMetric.stop();
    return response;
  },
  async (error) => {
    const { httpMetric } = error.config.metadata;
    await httpMetric.setHttpResponseCode(error.response?.status || 0);
    await httpMetric.stop();
    return Promise.reject(error);
  }
);
```

## Automated Updates

### CodePush Integration

```typescript
// src/services/codepush.ts
import codePush, { CodePushOptions } from 'react-native-code-push';

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
};

export function withCodePush(WrappedComponent: React.ComponentType) {
  class CodePushComponent extends React.Component {
    componentDidMount() {
      this.checkForUpdate();
    }

    async checkForUpdate() {
      try {
        const update = await codePush.checkForUpdate();
        if (update) {
          const { isMandatory, label, packageSize } = update;
          console.log(`Update available: ${label}, size: ${packageSize}, mandatory: ${isMandatory}`);
          
          if (isMandatory) {
            await update.download();
            await update.install(codePush.InstallMode.IMMEDIATE);
          } else {
            // Show update prompt to user
          }
        }
      } catch (error) {
        console.error('CodePush update check failed:', error);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return codePush(codePushOptions)(CodePushComponent);
}

// Usage in App.tsx
const App = () => {
  return (
    // App content
  );
};

export default withCodePush(App);
```

## Production Checklist

### Pre-deployment Verification

```typescript
// scripts/verify-production.ts
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function verifyProduction() {
  const checks = [
    {
      name: 'Environment Variables',
      check: () => {
        const requiredVars = [
          'API_URL',
          'SENTRY_DSN',
          'FIREBASE_CONFIG',
        ];
        
        const missing = requiredVars.filter(v => !process.env[v]);
        if (missing.length > 0) {
          throw new Error(`Missing environment variables: ${missing.join(', ')}`);
        }
      }
    },
    {
      name: 'Dependencies',
      check: async () => {
        await execAsync('yarn audit');
      }
    },
    {
      name: 'TypeScript',
      check: async () => {
        await execAsync('yarn tsc --noEmit');
      }
    },
    {
      name: 'Tests',
      check: async () => {
        await execAsync('yarn test --coverage');
      }
    },
    {
      name: 'Bundle Size',
      check: async () => {
        const { stdout } = await execAsync('yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output /dev/null --stats-output stats.json');
        const stats = require('./stats.json');
        if (stats.bundleSize > 10 * 1024 * 1024) { // 10MB
          throw new Error('Bundle size exceeds 10MB');
        }
      }
    }
  ];

  for (const { name, check } of checks) {
    try {
      await check();
      console.log(`✅ ${name} check passed`);
    } catch (error) {
      console.error(`❌ ${name} check failed:`, error);
      process.exit(1);
    }
  }
}

verifyProduction();
```

## Monitoring Dashboard

### Custom Monitoring UI

```typescript
// src/screens/MonitoringDashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { analyticsService } from '../services/analytics';
import { performanceService } from '../services/performance';

interface MetricsData {
  crashes: number;
  activeUsers: number;
  apiLatency: number[];
  errorRate: number;
}

export function MonitoringDashboard() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMetrics = async () => {
    // Fetch metrics from your backend/analytics services
    const data = await Promise.all([
      analyticsService.getMetrics(),
      performanceService.getMetrics(),
    ]);

    setMetrics({
      crashes: data[0].crashes,
      activeUsers: data[0].activeUsers,
      apiLatency: data[1].apiLatency,
      errorRate: data[1].errorRate,
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMetrics();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (!metrics) return <LoadingSpinner />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>App Health Dashboard</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Crash Rate</Text>
          <Text style={styles.metric}>{metrics.crashes}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Users</Text>
          <Text style={styles.metric}>{metrics.activeUsers}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>API Latency</Text>
          <LineChart
            data={{
              labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
              datasets: [{
                data: metrics.apiLatency
              }]
            }}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Error Rate</Text>
          <Text style={styles.metric}>{metrics.errorRate}%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  metric: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
```

## Next Steps

Now that you understand production deployment and monitoring, you can:
- Implement comprehensive error tracking
- Set up analytics and performance monitoring
- Configure automated updates
- Create monitoring dashboards
- Establish deployment verification processes
- Monitor and maintain production apps

## Additional Resources

- [Sentry React Native Documentation](https://docs.sentry.io/platforms/react-native/)
- [Firebase Analytics Guide](https://firebase.google.com/docs/analytics)
- [CodePush Documentation](https://github.com/microsoft/react-native-code-push)
- [React Native Performance Guide](https://reactnative.dev/docs/performance) 