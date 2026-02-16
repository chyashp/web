---
title: "Native Modules and Platform-Specific Code in React Native"
description: "Learn how to create custom native modules, bridge native code, and implement platform-specific features in React Native. Master native APIs, module creation, and cross-platform development."
date: "2024-03-27"
tags: ["react-native", "native-modules", "ios", "android", "bridge", "platform-specific", "mobile-development"]
chapter: 16
section: 8
---

# Native Modules and Platform-Specific Code in React Native

Native modules allow you to write platform-specific code in native languages (Swift/Objective-C for iOS, Java/Kotlin for Android) and expose it to your JavaScript code. In this chapter, you'll learn how to create and use native modules effectively.

## Creating Native Modules

### iOS Native Module

```swift
// ios/RCTCustomModule.swift
import Foundation

@objc(CustomModule)
class CustomModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func getDeviceInfo(_ callback: RCTResponseSenderBlock) {
    let deviceInfo: [String: Any] = [
      "model": UIDevice.current.model,
      "systemVersion": UIDevice.current.systemVersion,
      "batteryLevel": UIDevice.current.batteryLevel
    ]
    
    callback([NSNull(), deviceInfo])
  }
  
  @objc
  func showAlert(_ message: String, 
                resolver resolve: @escaping RCTPromiseResolveBlock,
                rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      let alert = UIAlertController(
        title: nil,
        message: message,
        preferredStyle: .alert
      )
      
      alert.addAction(UIAlertAction(
        title: "OK",
        style: .default,
        handler: { _ in resolve(true) }
      ))
      
      UIApplication.shared.keyWindow?.rootViewController?.present(
        alert,
        animated: true,
        completion: nil
      )
    }
  }
}

// ios/RCTCustomModule.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CustomModule, NSObject)

RCT_EXTERN_METHOD(getDeviceInfo:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(
  showAlert:(NSString *)message
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

@end
```

### Android Native Module

```kotlin
// android/app/src/main/java/com/yourapp/CustomModule.kt
package com.yourapp

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class CustomModule(reactContext: ReactApplicationContext) : 
  ReactContextBaseJavaModule(reactContext) {
  
  override fun getName() = "CustomModule"
  
  @ReactMethod
  fun getDeviceInfo(callback: Callback) {
    val deviceInfo = Arguments.createMap().apply {
      putString("model", Build.MODEL)
      putString("manufacturer", Build.MANUFACTURER)
      putString("androidVersion", Build.VERSION.RELEASE)
    }
    
    callback(null, deviceInfo)
  }
  
  @ReactMethod
  fun showAlert(message: String, promise: Promise) {
    try {
      val activity = currentActivity
      
      if (activity == null) {
        promise.reject("E_ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist")
        return
      }
      
      activity.runOnUiThread {
        AlertDialog.Builder(activity)
          .setMessage(message)
          .setPositiveButton("OK") { _, _ -> promise.resolve(true) }
          .show()
      }
    } catch (e: Exception) {
      promise.reject("E_SHOW_ALERT_ERROR", e)
    }
  }
  
  @ReactMethod
  fun addListener(eventName: String) {
    // Required for RN 0.65+
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Required for RN 0.65+
  }
}

// android/app/src/main/java/com/yourapp/CustomPackage.kt
package com.yourapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class CustomPackage : ReactPackage {
  override fun createNativeModules(
    reactContext: ReactApplicationContext
  ): List<NativeModule> {
    return listOf(CustomModule(reactContext))
  }
  
  override fun createViewManagers(
    reactContext: ReactApplicationContext
  ): List<ViewManager<*, *>> {
    return emptyList()
  }
}
```

### JavaScript Interface

```typescript
// src/modules/CustomModule.ts
import { NativeModules, Platform } from 'react-native';

const { CustomModule } = NativeModules;

interface DeviceInfo {
  model: string;
  systemVersion?: string;
  androidVersion?: string;
  manufacturer?: string;
  batteryLevel?: number;
}

class CustomModuleClass {
  getDeviceInfo(): Promise<DeviceInfo> {
    return new Promise((resolve, reject) => {
      CustomModule.getDeviceInfo((error: any, result: DeviceInfo) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  showAlert(message: string): Promise<boolean> {
    return CustomModule.showAlert(message);
  }
}

export default new CustomModuleClass();

// Usage
import CustomModule from './modules/CustomModule';

async function showDeviceInfo() {
  try {
    const info = await CustomModule.getDeviceInfo();
    console.log('Device Info:', info);
    
    await CustomModule.showAlert(
      `Running on ${Platform.OS} device: ${info.model}`
    );
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Native UI Components

### iOS Custom View

```swift
// ios/RCTGradientView.swift
import UIKit

@objc(RCTGradientView)
class GradientView: UIView {
  private let gradientLayer = CAGradientLayer()
  
  @objc var startColor: String = "#000000" {
    didSet { updateGradient() }
  }
  
  @objc var endColor: String = "#FFFFFF" {
    didSet { updateGradient() }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupGradient()
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupGradient()
  }
  
  private func setupGradient() {
    gradientLayer.frame = bounds
    layer.addSublayer(gradientLayer)
    updateGradient()
  }
  
  private func updateGradient() {
    gradientLayer.colors = [
      UIColor(hex: startColor).cgColor,
      UIColor(hex: endColor).cgColor
    ]
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    gradientLayer.frame = bounds
  }
}

// ios/RCTGradientViewManager.swift
@objc(RCTGradientViewManager)
class GradientViewManager: RCTViewManager {
  override func view() -> UIView! {
    return GradientView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

// ios/RCTGradientViewManager.m
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RCTGradientViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(startColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(endColor, NSString)
@end
```

### Android Custom View

```kotlin
// android/app/src/main/java/com/yourapp/GradientView.kt
class GradientView(context: Context) : View(context) {
  private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
  private val gradient = LinearGradient(
    0f, 0f, 0f, height.toFloat(),
    intArrayOf(Color.BLACK, Color.WHITE),
    null,
    Shader.TileMode.CLAMP
  )
  
  var startColor: String = "#000000"
    set(value) {
      field = value
      updateGradient()
    }
  
  var endColor: String = "#FFFFFF"
    set(value) {
      field = value
      updateGradient()
    }
  
  init {
    paint.shader = gradient
  }
  
  private fun updateGradient() {
    val newGradient = LinearGradient(
      0f, 0f, 0f, height.toFloat(),
      intArrayOf(Color.parseColor(startColor), Color.parseColor(endColor)),
      null,
      Shader.TileMode.CLAMP
    )
    paint.shader = newGradient
    invalidate()
  }
  
  override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), paint)
  }
}

// android/app/src/main/java/com/yourapp/GradientViewManager.kt
class GradientViewManager(
  private val reactContext: ReactApplicationContext
) : SimpleViewManager<GradientView>() {
  
  override fun getName() = "RCTGradientView"
  
  override fun createViewInstance(context: ThemedReactContext): GradientView {
    return GradientView(context)
  }
  
  @ReactProp(name = "startColor")
  fun setStartColor(view: GradientView, color: String) {
    view.startColor = color
  }
  
  @ReactProp(name = "endColor")
  fun setEndColor(view: GradientView, color: String) {
    view.endColor = color
  }
}
```

### React Native Component

```typescript
// src/components/GradientView.tsx
import React from 'react';
import { requireNativeComponent, ViewStyle } from 'react-native';

interface GradientViewProps {
  startColor: string;
  endColor: string;
  style?: ViewStyle;
}

const RCTGradientView = requireNativeComponent<GradientViewProps>('RCTGradientView');

export const GradientView: React.FC<GradientViewProps> = ({
  startColor,
  endColor,
  style,
}) => (
  <RCTGradientView
    startColor={startColor}
    endColor={endColor}
    style={style}
  />
);

// Usage
import { GradientView } from './components/GradientView';

function App() {
  return (
    <GradientView
      startColor="#FF6B2B"
      endColor="#1a365d"
      style={{ flex: 1 }}
    />
  );
}
```

## Platform-Specific Code

### Platform-Specific File Extensions

```typescript
// src/utils/platform.ios.ts
export function getPlatformFeatures() {
  return {
    hapticFeedback: true,
    biometricAuth: 'FaceID',
    shareExtension: true,
  };
}

// src/utils/platform.android.ts
export function getPlatformFeatures() {
  return {
    hapticFeedback: true,
    biometricAuth: 'Fingerprint',
    shareExtension: false,
  };
}

// Usage
import { getPlatformFeatures } from './utils/platform';
const features = getPlatformFeatures();
```

### Platform-Specific Components

```typescript
// src/components/Button/index.tsx
import { Platform } from 'react-native';
import IOSButton from './IOSButton';
import AndroidButton from './AndroidButton';

export const Button = Platform.select({
  ios: () => IOSButton,
  android: () => AndroidButton,
})();

// Usage with platform-specific props
interface CommonProps {
  title: string;
  onPress: () => void;
}

interface IOSProps extends CommonProps {
  hapticFeedback?: boolean; // iOS only
}

interface AndroidProps extends CommonProps {
  rippleColor?: string; // Android only
}

type ButtonProps = Platform.select<IOSProps, AndroidProps>;

const MyButton: React.FC<ButtonProps> = (props) => {
  if (Platform.OS === 'ios') {
    return <IOSButton {...(props as IOSProps)} />;
  }
  return <AndroidButton {...(props as AndroidProps)} />;
};
```

## Best Practices

1. **Error Handling**
```typescript
// src/modules/NativeModule.ts
class NativeModule {
  async callNativeMethod() {
    try {
      const result = await NativeModules.CustomModule.someMethod();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        // Handle known error types
        console.error('Native module error:', error.message);
      } else {
        // Handle unknown errors
        console.error('Unknown error in native module');
      }
      throw error;
    }
  }
}
```

2. **Type Safety**
```typescript
// src/types/native.ts
declare module 'react-native' {
  interface NativeModulesStatic {
    CustomModule: {
      getDeviceInfo(
        callback: (error: any, result: DeviceInfo) => void
      ): void;
      showAlert(message: string): Promise<boolean>;
    };
  }
}
```

3. **Performance Optimization**
```typescript
// src/modules/BatchedModule.ts
class BatchedModule {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;

  async addToQueue(task: () => Promise<void>) {
    this.queue.push(task);
    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  private async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }
    this.isProcessing = false;
  }
}
```

## Next Steps

Now that you understand native modules and platform-specific code, you can:
- Create custom native modules
- Implement native UI components
- Handle platform-specific features
- Bridge native code with JavaScript
- Optimize native module performance

In the next chapter, we'll explore app deployment and publishing.

## Additional Resources

- [Native Modules Documentation](https://reactnative.dev/docs/native-modules-intro)
- [Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [Native UI Components](https://reactnative.dev/docs/native-components-ios)
- [Native Modules Setup](https://reactnative.dev/docs/native-modules-setup) 