---
title: "React Native Navigation: A Complete Guide to Mobile App Navigation"
description: "Learn how to implement navigation in React Native applications. Master stack navigation, tab navigation, drawer navigation, authentication flows, and deep linking for a seamless user experience."
date: "2024-03-27"
tags: ["react-native", "navigation", "react-navigation", "mobile-development", "stack-navigation", "tab-navigation", "deep-linking", "mobile-apps"]
chapter: 8
section: 4
---

# React Native Navigation

Navigation is a fundamental aspect of mobile applications. In this chapter, you'll learn how to implement various navigation patterns using React Navigation, the standard navigation library for React Native.

## Setting Up React Navigation

First, let's install the required dependencies:

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer

# Required dependencies for React Navigation
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
```

Initialize navigation in your app:

```typescript
// App.tsx
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      {/* Your navigation stack goes here */}
    </NavigationContainer>
  );
}
```

## Stack Navigation

Stack navigation is the most common pattern, providing a way to transition between screens where each new screen is placed on top of the stack.

### Basic Stack Navigation

```typescript
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Define your screen params
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B2B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={({ route }) => ({ 
          title: `Profile of ${route.params.userId}` 
        })}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
      />
    </Stack.Navigator>
  );
}
```

### Screen Components and Navigation Props

```typescript
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text>User Profile: {userId}</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
```

## Tab Navigation

Tab navigation provides a way to switch between different screens using tabs, typically at the bottom of the screen.

### Bottom Tab Navigator

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

type TabParamList = {
  Home: undefined;
  Discover: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outlined';
              break;
            case 'Discover':
              iconName = focused ? 'explore' : 'explore-outlined';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outlined';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B2B',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

## Drawer Navigation

Drawer navigation provides a side menu that can be pulled out from the edge of the screen.

### Drawer Navigator Setup

```typescript
import { createDrawerNavigator } from '@react-navigation/drawer';

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
        drawerActiveBackgroundColor: '#FF6B2B20',
        drawerActiveTintColor: '#FF6B2B',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
```

## Nested Navigation

Combine different navigation patterns to create complex navigation structures.

### Combined Navigation Example

```typescript
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoryList" component={CategoryListScreen} />
    </Stack.Navigator>
  );
}
```

## Authentication Flow

Implement a secure authentication flow with protected routes.

```typescript
type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        // Protected routes
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        // Public routes
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
```

## Deep Linking

Enable deep linking to navigate directly to specific screens from external links.

```typescript
// App.tsx
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  
  config: {
    screens: {
      Home: {
        path: 'home',
        screens: {
          Feed: 'feed',
          Profile: 'user/:id',
        },
      },
      Settings: 'settings',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
}
```

## Navigation Events and Lifecycle

Handle navigation events and screen lifecycle methods.

```typescript
function HomeScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Do something when screen is focused
      refreshData();
    });

    return unsubscribe;
  }, [navigation]);

  // Screen focus/blur events
  useFocusEffect(
    useCallback(() => {
      // Do something when screen is focused
      const subscription = subscribeToUpdates();

      return () => {
        // Cleanup when screen is unfocused
        subscription.unsubscribe();
      };
    }, [])
  );

  return <View>{/* Screen content */}</View>;
}
```

## Best Practices

### 1. Type Safety

```typescript
// Define types for your navigation structure
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Use throughout your app
function useAppNavigation() {
  return useNavigation<NavigationProp<RootStackParamList>>();
}
```

### 2. Screen Options

```typescript
const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#FF6B2B',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // Animation configurations
  animation: 'slide_from_right',
  presentation: 'card',
};
```

### 3. Navigation State Persistence

```typescript
<NavigationContainer
  onStateChange={(state) => {
    // Save navigation state to storage
    saveNavigationState(state);
  }}
>
  {/* Navigation stack */}
</NavigationContainer>
```

## Next Steps

Now that you understand React Native navigation, you can:
- Implement complex navigation patterns
- Handle authentication flows
- Set up deep linking
- Manage navigation state
- Create type-safe navigation

In the next chapter, we'll explore form handling and data validation in React Native.

## Additional Resources

- [React Navigation Documentation](https://reactnavigation.org/)
- [Navigation Patterns](https://reactnavigation.org/docs/navigation-patterns)
- [Deep Linking Guide](https://reactnavigation.org/docs/deep-linking)
- [TypeScript Guide](https://reactnavigation.org/docs/typescript) 