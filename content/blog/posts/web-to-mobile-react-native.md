---
title: "from web to mobile: a react developer's first steps with react native"
date: "2025-03-21"
author: "nanushi team"
tags: ["react native", "mobile development", "react", "tutorial", "beginners"]
excerpt: "transitioning from web to mobile development? learn the key differences, common pitfalls, and best practices for react developers starting with react native."
---

# from web to mobile: a react developer's first steps with react native

as a web developer diving into react native, the journey can feel both familiar and surprisingly different. while your react knowledge gives you a head start, there are some key differences that might catch you off guard. let's explore what you need to know for a smooth transition.

## the familiar territory

if you're coming from react, you'll find many concepts carry over nicely to react native. here's what stays the same:

### 1. component-based architecture
```jsx
// this looks familiar, right?
function WelcomeCard({ username }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>welcome, {username}!</Text>
    </View>
  );
}
```

> 📚 resource: check out the [official react native components guide](https://reactnative.dev/docs/components-and-apis) for a full list of available components.

### 2. hooks and state management
```jsx
// your useState knowledge transfers perfectly
const [isLoading, setIsLoading] = useState(false);
const [userData, setUserData] = useState(null);
```

> 🔗 deep dive: [react hooks in react native](https://reactnative.dev/docs/next/hooks)

## key differences to watch for

### 1. forget about html - meet native components
```jsx
// web
<div className="container">
  <p>hello world</p>
  <input type="text" />
</div>

// react native
<View style={styles.container}>
  <Text>hello world</Text>
  <TextInput />
</View>
```

> 📱 learn more: [understanding core components](https://reactnative.dev/docs/intro-react-native-components)

### 2. styling works differently
```jsx
// web css
.container {
  display: flex;
  padding: 20px;
  background-color: #fff;
}

// react native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  }
});
```

> 🎨 styling resources:
> - [react native styling cheat sheet](https://github.com/vhpoet/react-native-styling-cheat-sheet)
> - [official styling guide](https://reactnative.dev/docs/style)

### 3. layout with flexbox
- flexbox is the primary layout system
- no grid or float
- flex direction defaults to column (not row!)
- dimensions are unitless

> 📐 recommended: [mastering flexbox in react native](https://www.reactnative.guide/8-styling/8.1-styling-introduction.html)

### 4. platform-specific considerations
```jsx
// handling platform differences
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
    },
    android: {
      elevation: 4,
    },
  }),
});
```

> 🔄 learn more: [platform specific code](https://reactnative.dev/docs/platform-specific-code)

## common gotchas for web developers

1. **navigation is different**
   - no url-based routing
   - stack, tab, and drawer navigation
   - navigation state management

> 🧭 recommended resources:
> - [react navigation docs](https://reactnavigation.org/docs/getting-started)
> - [navigation patterns](https://reactnavigation.org/docs/navigation-lifecycle)

2. **touch handling**
   - `onClick` becomes `onPress`
   - different touch feedback per platform
   - handling gestures

> 👆 learn more: [handling touches in react native](https://reactnative.dev/docs/handling-touches)

3. **styling limitations**
   - no css files
   - no css selectors
   - no cascading styles
   - limited animations

> 💅 helpful tools:
> - [react native paper](https://callstack.github.io/react-native-paper/)
> - [native base](https://nativebase.io/)

## best practices for your first react native app

1. **start with a simple app**
   - focus on basic navigation
   - implement common mobile patterns
   - understand the mobile lifecycle

2. **embrace mobile patterns**
   - think in screens, not pages
   - consider offline states
   - handle different screen sizes

3. **debug effectively**
   - learn to use the react native debugger
   - understand metro bundler
   - platform-specific debugging tools

> 🔧 debugging resources:
> - [official debugging guide](https://reactnative.dev/docs/debugging)
> - [flipper](https://fbflipper.com/)
> - [react native debugger](https://github.com/jhen0409/react-native-debugger)

## real-world example: converting a web component

```jsx
// web version
function WebProfileCard({ user }) {
  return (
    <div className="profile-card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <button onClick={handleClick}>
        view profile
      </button>
    </div>
  );
}

// react native version
function NativeProfileCard({ user }) {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: user.avatar }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <TouchableOpacity 
        onPress={handlePress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          view profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

## additional learning resources

1. **official documentation**
   - [react native docs](https://reactnative.dev/)
   - [expo documentation](https://docs.expo.dev/)
   - [react navigation](https://reactnavigation.org/)

2. **community resources**
   - [awesome react native](https://github.com/jondot/awesome-react-native)
   - [react native community](https://github.com/react-native-community)
   - [react native directory](https://reactnative.directory/)

3. **recommended courses**
   - [react native - the practical guide](https://www.udemy.com/course/react-native-the-practical-guide/)
   - [cs50's mobile app development with react native](https://www.edx.org/course/cs50s-mobile-app-development-with-react-native)
   - [react native school](https://www.reactnativeschool.com/)

## next steps in your mobile development journey

1. **master mobile-specific features**
   - camera access
   - push notifications
   - geolocation
   - offline storage

2. **learn mobile ux patterns**
   - loading states
   - error handling
   - touch feedback
   - gesture handling

3. **join a community**
   - work with other developers
   - get code reviews
   - learn best practices
   - build real apps

ready to start your mobile development journey? join us at [nanushi.org](https://nanushi.org) where you can:
- work on real mobile projects
- collaborate with other developers
- get regular code reviews
- build portfolio-worthy applications

remember, the transition from web to mobile development is a journey. while there are differences to master, your react knowledge gives you a strong foundation. focus on understanding mobile-specific patterns and best practices, and you'll be building great mobile apps in no time.

---

*this article is part of our mobile development series at nanushi. join our community of developers learning and building together.* 