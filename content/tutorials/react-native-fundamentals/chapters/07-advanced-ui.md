---
title: "Advanced UI in React Native: Animations, Gestures, and Custom Components"
description: "Master advanced UI concepts in React Native. Learn to create fluid animations, handle complex gestures, build custom components, and implement modern mobile UI patterns for a polished user experience."
date: "2024-03-27"
tags: ["react-native", "animations", "gestures", "ui-design", "custom-components", "mobile-development", "user-experience", "interactive-ui"]
chapter: 7
section: 3
---

# Advanced UI in React Native

Take your React Native applications to the next level with advanced UI features. In this chapter, you'll learn how to create smooth animations, handle complex gestures, and build custom interactive components that provide a native feel.

## Animations

React Native provides two complementary animation systems: the Animated API for precise control and LayoutAnimation for automatic animations.

### Animated API Basics

```typescript
import { Animated, Easing } from 'react-native';

const FadeInView: React.FC = ({ children }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Performance optimization
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      {children}
    </Animated.View>
  );
};
```

### Complex Animations

```typescript
const AnimatedCard: React.FC = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animatePress = () => {
    // Scale down and move up
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: -10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateRelease = () => {
    // Return to original position
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            { scale },
            { translateY },
          ],
        },
      ]}
    >
      <Text>Interactive Card</Text>
    </Animated.View>
  );
};
```

### LayoutAnimation

```typescript
import { LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const ExpandableSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand}>
        <Text>Toggle Content</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          <Text>Expanded content here</Text>
        </View>
      )}
    </View>
  );
};
```

## Gesture Handling

### Basic Touch Handling

```typescript
const TouchableCard: React.FC = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Text>Press Me</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    backgroundColor: '#f7f7f7',
    transform: [{ scale: 0.98 }],
  },
});
```

### Pan Gesture Handler

```typescript
import { PanResponder, Animated } from 'react-native';

const DraggableCard: React.FC = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: pan.x },
          { translateY: pan.y }
        ]
      }}
      {...panResponder.panHandlers}
    >
      <Text>Drag me!</Text>
    </Animated.View>
  );
};
```

## Custom Components

### Reusable Button Component

```typescript
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
    >
      <Animated.View
        style={[
          styles.button,
          styles[variant],
          styles[size],
          disabled && styles.disabled,
          { transform: [{ scale }] },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? '#FF6B2B' : '#fff'} />
        ) : (
          <>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={[styles.text, styles[`${variant}Text`]]}>
              {title}
            </Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};
```

### Modal Component

```typescript
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 0.9,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        {children}
      </Animated.View>
    </View>
  );
};
```

## Performance Optimization

### Memoization and Callback Optimization

```typescript
const MemoizedCard = React.memo(({ item, onPress }: CardProps) => {
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  return (
    <Pressable onPress={handlePress}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

// Usage
const CardList: React.FC = () => {
  const handlePress = useCallback((id: string) => {
    console.log('Card pressed:', id);
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <MemoizedCard
          item={item}
          onPress={handlePress}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};
```

### Animation Performance

```typescript
// Use native driver when possible
Animated.timing(opacity, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // Runs animations on native thread
}).start();

// Avoid unnecessary re-renders
const styles = useMemo(() => ({
  transform: [
    { scale: animatedValue },
    { translateY: translateY },
  ],
}), [animatedValue, translateY]);
```

## Next Steps

Now that you've mastered advanced UI concepts in React Native, you can:
- Create fluid and performant animations
- Handle complex user interactions
- Build reusable custom components
- Optimize UI performance
- Implement modern mobile UI patterns

In the next chapter, we'll explore navigation patterns in React Native, including stack navigation, tab navigation, and deep linking.

## Additional Resources

- [React Native Animations Guide](https://reactnative.dev/docs/animations)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Performance](https://reactnative.dev/docs/performance) 