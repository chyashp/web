---
title: "Platform-Specific Features in React Native"
description: "Learn how to implement platform-specific features and optimizations in React Native. Master iOS and Android specific APIs, styling, and components for a truly native experience."
date: "2024-03-27"
tags: ["react-native", "ios", "android", "platform-specific", "mobile-development"]
chapter: 18
section: 8
---

# Platform-Specific Features in React Native

While React Native provides a unified way to build cross-platform applications, there are times when you need to implement platform-specific features or optimizations. This chapter will guide you through various approaches to handle platform-specific code.

## Platform Detection and Conditional Rendering

### Platform Module

```typescript
// src/components/Button/index.tsx
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  color = '#007AFF' 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        Platform.select({
          ios: styles.iosButton,
          android: styles.androidButton,
        }),
        { backgroundColor: color },
      ]}
    >
      <Text
        style={[
          styles.text,
          Platform.select({
            ios: styles.iosText,
            android: styles.androidText,
          }),
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  iosButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  androidButton: {
    elevation: 4,
  },
  text: {
    textAlign: 'center',
  },
  iosText: {
    fontSize: 17,
    fontWeight: '600',
  },
  androidText: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
```

### Platform-Specific File Extensions

```typescript
// src/components/Header/Header.ios.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Header: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 44,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c4c4c4',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 44,
  },
});

// src/components/Header/Header.android.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Header: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingTop: 0,
    backgroundColor: '#fff',
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left',
    lineHeight: 56,
    marginLeft: 16,
  },
});

// Usage
import { Header } from './components/Header';

function Screen() {
  return <Header title="My App" />;
}
```

## Platform-Specific APIs

### iOS Specific Features

```typescript
// src/utils/haptics.ios.ts
import * as Haptics from 'expo-haptics';

export class HapticFeedback {
  static light() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  static medium() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  static heavy() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  static success() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  static error() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
}

// Usage with type safety
interface HapticOptions {
  type: 'light' | 'medium' | 'heavy' | 'success' | 'error';
}

function useHapticFeedback() {
  const triggerHaptic = ({ type }: HapticOptions) => {
    switch (type) {
      case 'light':
        HapticFeedback.light();
        break;
      case 'medium':
        HapticFeedback.medium();
        break;
      case 'heavy':
        HapticFeedback.heavy();
        break;
      case 'success':
        HapticFeedback.success();
        break;
      case 'error':
        HapticFeedback.error();
        break;
    }
  };

  return { triggerHaptic };
}
```

### Android Specific Features

```typescript
// src/utils/ripple.android.ts
import { Platform, PressableAndroidRippleConfig } from 'react-native';

export class RippleEffect {
  static create(color: string = '#000000'): PressableAndroidRippleConfig {
    return {
      color,
      borderless: false,
      radius: -1, // -1 means default size
    };
  }

  static createBorderless(
    color: string = '#000000'
  ): PressableAndroidRippleConfig {
    return {
      color,
      borderless: true,
      radius: -1,
    };
  }
}

// Usage
import { Pressable } from 'react-native';
import { RippleEffect } from './utils/ripple';

function RippleButton({ onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={RippleEffect.create('#ffffff')}
    >
      {children}
    </Pressable>
  );
}
```

## Platform-Specific Styling

### Responsive Design with Platform Awareness

```typescript
// src/styles/responsive.ts
import { Platform, Dimensions, ScaledSize } from 'react-native';

interface Metrics {
  screenWidth: number;
  screenHeight: number;
  isSmallDevice: boolean;
  isTablet: boolean;
}

class ResponsiveDesign {
  private static instance: ResponsiveDesign;
  private metrics: Metrics;

  private constructor() {
    const { width, height } = Dimensions.get('window');
    this.metrics = {
      screenWidth: width,
      screenHeight: height,
      isSmallDevice: width < 375,
      isTablet: this.detectTablet(width, height),
    };

    Dimensions.addEventListener('change', this.handleDimensionsChange);
  }

  static getInstance(): ResponsiveDesign {
    if (!ResponsiveDesign.instance) {
      ResponsiveDesign.instance = new ResponsiveDesign();
    }
    return ResponsiveDesign.instance;
  }

  private handleDimensionsChange = ({ window }: { window: ScaledSize }) => {
    this.metrics = {
      screenWidth: window.width,
      screenHeight: window.height,
      isSmallDevice: window.width < 375,
      isTablet: this.detectTablet(window.width, window.height),
    };
  };

  private detectTablet(width: number, height: number): boolean {
    const pixelDensity = Dimensions.get('screen').scale;
    const adjustedWidth = width * pixelDensity;
    const adjustedHeight = height * pixelDensity;

    if (Platform.OS === 'ios') {
      return Math.min(adjustedWidth, adjustedHeight) >= 768;
    }
    return Math.min(adjustedWidth, adjustedHeight) >= 600;
  }

  getMetrics(): Metrics {
    return this.metrics;
  }

  scale(size: number): number {
    const { isSmallDevice, isTablet } = this.metrics;
    if (isTablet) return size * 1.25;
    if (isSmallDevice) return size * 0.85;
    return size;
  }
}

export const responsive = ResponsiveDesign.getInstance();

// Usage
import { StyleSheet } from 'react-native';
import { responsive } from './styles/responsive';

const styles = StyleSheet.create({
  container: {
    padding: responsive.scale(16),
  },
  title: {
    fontSize: responsive.scale(
      Platform.select({
        ios: 20,
        android: 18,
      })
    ),
  },
});
```

## Platform-Specific Navigation

### Navigation Bar Customization

```typescript
// src/navigation/HeaderConfig.ts
import { Platform } from 'react-native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const getDefaultHeaderConfig = (
  title: string
): NativeStackNavigationOptions => ({
  title,
  headerStyle: Platform.select({
    ios: {
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      backgroundColor: '#fff',
      elevation: 4,
    },
  }),
  headerTitleStyle: Platform.select({
    ios: {
      fontSize: 17,
      fontWeight: '600',
    },
    android: {
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'left',
    },
  }),
  headerBackTitle: Platform.OS === 'ios' ? 'Back' : undefined,
  headerTintColor: Platform.select({
    ios: '#007AFF',
    android: '#000000',
  }),
});

// Usage
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDefaultHeaderConfig } from './navigation/HeaderConfig';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={getDefaultHeaderConfig('Home')}
      />
    </Stack.Navigator>
  );
}
```

## Best Practices

1. **Platform Version Checking**
```typescript
// src/utils/platform.ts
import { Platform, PlatformOSType } from 'react-native';

export class PlatformUtils {
  static isIOS(): boolean {
    return Platform.OS === 'ios';
  }

  static isAndroid(): boolean {
    return Platform.OS === 'android';
  }

  static getVersion(): number {
    return Platform.Version as number;
  }

  static isAtLeastVersion(version: number): boolean {
    if (this.isIOS()) {
      const [major] = (Platform.Version as string).split('.');
      return parseInt(major, 10) >= version;
    }
    return Platform.Version >= version;
  }

  static select<T>(config: {
    ios?: T;
    android?: T;
    default?: T;
  }): T | undefined {
    const platform = Platform.OS as PlatformOSType;
    return config[platform] || config.default;
  }
}

// Usage
if (PlatformUtils.isAtLeastVersion(13)) {
  // Use iOS 13+ features
}

const fontSize = PlatformUtils.select({
  ios: 17,
  android: 16,
  default: 16,
});
```

2. **Platform-Specific Components**
```typescript
// src/components/PlatformView.tsx
import React from 'react';
import { Platform, View, ViewProps } from 'react-native';

interface PlatformViewProps extends ViewProps {
  ios?: ViewProps;
  android?: ViewProps;
}

export const PlatformView: React.FC<PlatformViewProps> = ({
  ios,
  android,
  ...props
}) => {
  const platformProps = Platform.select({
    ios,
    android,
  });

  return <View {...props} {...platformProps} />;
};

// Usage
function Screen() {
  return (
    <PlatformView
      style={{ padding: 16 }}
      ios={{
        style: {
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }}
      android={{
        style: {
          elevation: 4,
        },
      }}
    >
      <Text>Platform-specific styling</Text>
    </PlatformView>
  );
}
```

## Next Steps

Now that you understand platform-specific features, you can:
- Implement platform-specific components and styles
- Use platform-specific APIs effectively
- Create responsive designs for different devices
- Handle platform version differences
- Optimize navigation for each platform

In the next chapter, we'll explore app security and authentication.

## Additional Resources

- [Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [React Native Platform API](https://reactnative.dev/docs/platform)
- [iOS Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design for Android](https://material.io/design) 