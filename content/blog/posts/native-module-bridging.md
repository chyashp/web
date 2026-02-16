---
title: "native module integration: bridging react native and native code"
excerpt: learn how to extend your react native apps with custom native modules, handle platform-specific features, and optimize native bridge communication.
date: '2024-03-18'
tags:
  - native-modules
  - react-native
  - mobile-development
  - ios-development
  - android-development
---

# native module integration: bridging react native and native code

while react native provides extensive functionality through javascript apis, there are inevitably scenarios where you need to access platform-specific capabilities or optimize performance-critical code paths. native modules form the bridge between javascript and platform-specific code, enabling developers to harness the full power of ios and android while maintaining react native's development experience. in this comprehensive guide, we'll explore the complete process of creating, integrating, and optimizing native modules.

## understanding the react native bridge architecture

the react native bridge serves as the communication layer between javascript and native code. as [explained in the official documentation](https://reactnative.dev/docs/legacy/native-modules-intro), the bridge facilitates asynchronous, serialized communication between the two environments.

according to [Meta's engineering blog on app architecture](https://engineering.fb.com/2023/02/06/ios/facebook-ios-app-architecture/), this architecture provides several key benefits:

- separation between js business logic and native platform code
- ability to update js without resubmitting to app stores
- consistent apis across platforms with platform-specific implementations

here's how you access a native module from javascript:

```typescript
// javascript side: accessing native functionality
import { NativeModules } from 'react-native'

// define typescript interface for better type safety and documentation
interface BiometricModule {
  // authenticate user via platform biometric system (fingerprint/face)
  authenticate(reason: string): Promise<{success: boolean, error?: string}>
  
  // check if biometric authentication is available on this device
  isAvailable(): Promise<{available: boolean, biometryType?: 'fingerprint' | 'facial' | 'iris'}>
  
  // enable/disable biometric authentication with optional timeout
  configureBiometrics(options: {enabled: boolean, timeout?: number}): Promise<void>
}

// access your native module with proper type casting
const { BiometricAuth } = NativeModules as {
  BiometricAuth: BiometricModule
}

// function demonstrating usage with proper error handling
async function authenticateUser() {
  try {
    // First check if the functionality is available
    const {available, biometryType} = await BiometricAuth.isAvailable()
    
    if (!available) {
      console.log('Biometric authentication not available on this device')
      return false
    }
    
    // Use specific messaging based on the biometry type
    const reason = biometryType === 'facial' 
      ? 'Authenticate with Face ID to continue' 
      : 'Authenticate with fingerprint to continue'
    
    const {success, error} = await BiometricAuth.authenticate(reason)
    return success
  } catch (error) {
    console.error('Biometric authentication error:', error)
    return false
  }
}
```

## implementing native modules for ios

ios native modules are implemented in objective-c or swift. according to [apple's documentation on biometric authentication](https://developer.apple.com/documentation/localauthentication/logging_a_user_into_your_app_with_face_id_or_touch_id), proper implementation requires specific entitlements and careful error handling.

here's a complete objective-c implementation following the [ios native module documentation](https://reactnative.dev/docs/native-modules-ios):

```objective-c
// BiometricAuth.h
#import <React/RCTBridgeModule.h>

@interface BiometricAuth : NSObject <RCTBridgeModule>
@end

// BiometricAuth.m
#import "BiometricAuth.h"
#import <LocalAuthentication/LocalAuthentication.h>

@implementation BiometricAuth

// Required: export the module to JavaScript
RCT_EXPORT_MODULE()

// Helper method to get biometry type string
- (NSString *)getBiometryType:(LAContext *)context {
  if (@available(iOS 11.0, *)) {
    switch (context.biometryType) {
      case LABiometryTypeFaceID:
        return @"facial";
      case LABiometryTypeTouchID:
        return @"fingerprint";
      case LABiometryNone:
      default:
        return nil;
    }
  } else {
    // For iOS < 11
    return @"fingerprint";
  }
}

// Check if biometric authentication is available
RCT_EXPORT_METHOD(isAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  // Create context before evaluating policy
  LAContext *context = [[LAContext alloc] init];
  NSError *error;
  
  // Check if the device supports biometric authentication
  BOOL available = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
  
  // Determine the biometry type if available
  NSString *biometryType = available ? [self getBiometryType:context] : nil;
  
  // Resolve with an object containing availability and type
  resolve(@{
    @"available": @(available),
    @"biometryType": biometryType ?: [NSNull null]
  });
}

// Authenticate the user with biometrics
RCT_EXPORT_METHOD(authenticate:(NSString *)reason
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  // Create context for this authentication request
  LAContext *context = [[LAContext alloc] init];
  NSError *error;
  
  // Check if we can use biometric authentication
  if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
    // Use the localizedReason to explain why the app needs authentication
    [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
            localizedReason:reason
                      reply:^(BOOL success, NSError *error) {
      // Always dispatch back to main thread for UI-related operations
      dispatch_async(dispatch_get_main_queue(), ^{
        if (success) {
          resolve(@{@"success": @YES});
        } else {
          // Provide detailed error information
          NSString *errorMessage = [self messageForLAError:error];
          resolve(@{
            @"success": @NO,
            @"error": errorMessage ?: @"Authentication failed"
          });
        }
      });
    }];
  } else {
    // Cannot use biometrics, provide reason why
    NSString *errorMessage = [self messageForLAError:error];
    resolve(@{
      @"success": @NO,
      @"error": errorMessage ?: @"Biometric authentication not available"
    });
  }
}

// Configure biometric settings
RCT_EXPORT_METHOD(configureBiometrics:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  // Extract options with defaults
  BOOL enabled = options[@"enabled"] ? [options[@"enabled"] boolValue] : YES;
  NSTimeInterval timeout = options[@"timeout"] ? [options[@"timeout"] doubleValue] : 0;
  
  LAContext *context = [[LAContext alloc] init];
  
  // Configure timeout if specified
  if (timeout > 0) {
    context.touchIDAuthenticationAllowableReuseDuration = timeout;
  }
  
  // Example of storing settings in UserDefaults
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  [defaults setBool:enabled forKey:@"biometricsEnabled"];
  [defaults synchronize];
  
  resolve(nil);
}

// Helper method to provide user-friendly error messages
- (NSString *)messageForLAError:(NSError *)error {
  if (!error) return nil;
  
  switch (error.code) {
    case LAErrorAuthenticationFailed:
      return @"Authentication failed";
    case LAErrorUserCancel:
      return @"User canceled authentication";
    case LAErrorUserFallback:
      return @"User chose to use fallback";
    case LAErrorSystemCancel:
      return @"System canceled authentication";
    case LAErrorPasscodeNotSet:
      return @"Passcode not set";
    case LAErrorBiometryNotAvailable:
      return @"Biometric authentication not available";
    case LAErrorBiometryNotEnrolled:
      return @"No biometric identities enrolled";
    case LAErrorBiometryLockout:
      return @"Biometric authentication is locked out";
    default:
      return [NSString stringWithFormat:@"Authentication error: %@", error.localizedDescription];
  }
}

// Specify that some methods should be called on the main thread
- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

// Override to prevent blocking the main thread for methods that don't need it
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isAuthenticating) {
  LAContext *context = [[LAContext alloc] init];
  return @([context evaluatedPolicyDomainState] != nil);
}

@end
```

## developing native modules for android

for android, the implementation requires java or kotlin code. the [official android biometric authentication documentation](https://developer.android.com/training/sign-in/biometric-auth) recommends using the androidx biometric library for consistent behavior across android versions.

```java
// BiometricAuthModule.java
package com.yourapp.biometrics;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@ReactModule(name = BiometricAuthModule.NAME)
public class BiometricAuthModule extends ReactContextBaseJavaModule {
    public static final String NAME = "BiometricAuth";
    private final ReactApplicationContext reactContext;
    private final Executor executor = Executors.newSingleThreadExecutor();

    public BiometricAuthModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // Check if biometric authentication is available
    @ReactMethod
    public void isAvailable(final Promise promise) {
        FragmentActivity activity = (FragmentActivity) getCurrentActivity();
        
        if (activity == null) {
            rejectWithActivity(promise);
            return;
        }

        BiometricManager biometricManager = BiometricManager.from(activity);
        int canAuthenticate = biometricManager.canAuthenticate(
            BiometricManager.Authenticators.BIOMETRIC_STRONG);
        
        WritableMap result = Arguments.createMap();
        
        switch (canAuthenticate) {
            case BiometricManager.BIOMETRIC_SUCCESS:
                result.putBoolean("available", true);
                // Determine biometry type - simplified here
                String biometryType = android.os.Build.VERSION.SDK_INT >= 29 ? "facial" : "fingerprint";
                result.putString("biometryType", biometryType);
                break;
            default:
                result.putBoolean("available", false);
                break;
        }
        
        promise.resolve(result);
    }

    @ReactMethod
    public void authenticate(String reason, final Promise promise) {
        FragmentActivity activity = (FragmentActivity) getCurrentActivity();
        
        if (activity == null) {
            rejectWithActivity(promise);
            return;
        }

        BiometricPrompt biometricPrompt = new BiometricPrompt(activity, executor, 
            new BiometricPrompt.AuthenticationCallback() {
                @Override
                public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                    WritableMap resultMap = Arguments.createMap();
                    resultMap.putBoolean("success", true);
                    promise.resolve(resultMap);
                }

                @Override
                public void onAuthenticationError(int errorCode, CharSequence errString) {
                    WritableMap resultMap = Arguments.createMap();
                    resultMap.putBoolean("success", false);
                    resultMap.putString("error", errString.toString());
                    promise.resolve(resultMap);
                }

                @Override
                public void onAuthenticationFailed() {
                    // This is called when authentication fails (e.g., wrong fingerprint)
                    // Don't resolve here as we might get a proper error through onAuthenticationError
                }
            });
            
        BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
            .setTitle("Biometric Authentication")
            .setSubtitle(reason)
            .setNegativeButtonText("Cancel")
            .setConfirmationRequired(false)
            .build();
            
        activity.runOnUiThread(() -> {
            biometricPrompt.authenticate(promptInfo);
        });
    }

    @ReactMethod
    public void configureBiometrics(ReadableMap options, final Promise promise) {
        // Extract options with defaults
        boolean enabled = options.hasKey("enabled") ? options.getBoolean("enabled") : true;
        
        // Example of storing preferences
        reactContext.getSharedPreferences("BiometricPrefs", ReactApplicationContext.MODE_PRIVATE)
            .edit()
            .putBoolean("biometricsEnabled", enabled)
            .apply();
        
        promise.resolve(null);
    }
    
    private void rejectWithActivity(Promise promise) {
        promise.reject("ERR_ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist");
    }
}
```

## registering native modules in your app

for your native modules to be accessible from javascript, you must register them with react native, as explained in the [native modules setup guide](https://reactnative.dev/docs/native-modules-setup):

### ios registration (in AppDelegate.mm)

```objective-c
#import "AppDelegate.h"
#import "BiometricAuth.h" // Import your module header

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ...existing setup code...
  
  // The module is automatically registered via macros
  // but you may need to explicitly initialize it depending on your needs
  
  return YES;
}

// ...rest of AppDelegate implementation...

@end
```

### android registration

for android, create a package class to group related modules:

```java
// BiometricPackage.java
package com.yourapp.biometrics;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BiometricPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new BiometricAuthModule(reactContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```

then register the package in MainApplication.java:

```java
// MainApplication.java
import com.yourapp.biometrics.BiometricPackage;

// ...

@Override
protected List<ReactPackage> getPackages() {
  List<ReactPackage> packages = new PackageList(this).getPackages();
  // Add your custom packages here
  packages.add(new BiometricPackage());
  return packages;
}
```

## optimizing with the new architecture and turbo modules

react native's new architecture, as described in [this comprehensive Meta engineering post](https://reactnative.dev/architecture/why-the-new-architecture), introduces turbo modules for improved performance and type safety:

```typescript
// TypeScript definition for a Turbo Module
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Synchronous method (only available in Turbo Modules)
  isAuthenticatingSync(): boolean;
  
  // Asynchronous methods
  isAvailable(): Promise<{available: boolean, biometryType?: string}>;
  authenticate(reason: string): Promise<{success: boolean, error?: string}>;
  configureBiometrics(options: {enabled: boolean, timeout?: number}): Promise<void>;
}

export default TurboModuleRegistry.get<Spec>('BiometricAuth') as Spec | null;
```

## creating a javascript wrapper for better developer experience

a well-designed javascript api can significantly improve the developer experience when using native modules:

```typescript
// BiometricManager.ts
import { Platform } from 'react-native';
import BiometricAuth from './BiometricAuthNative';

// Types for better documentation and type checking
export type BiometryType = 'fingerprint' | 'facial' | 'iris' | undefined;

export interface AuthenticationOptions {
  reason?: string;
  fallbackPrompt?: string;
  cancelButton?: string;
}

export interface BiometricAvailability {
  available: boolean;
  biometryType?: BiometryType;
  error?: string;
}

export interface AuthenticationResult {
  success: boolean;
  error?: string;
}

// Default messages by platform and authentication type
const getDefaultReason = (biometryType?: BiometryType): string => {
  if (Platform.OS === 'ios') {
    return biometryType === 'facial' 
      ? 'Authenticate with Face ID' 
      : 'Authenticate with Touch ID';
  }
  
  return 'Biometric authentication required';
};

// Main class with clean API and error handling
class BiometricManager {
  /**
   * Checks if biometric authentication is available on the device
   */
  static async isBiometricAvailable(): Promise<BiometricAvailability> {
    try {
      if (!BiometricAuth) {
        return { 
          available: false, 
          error: 'Biometric module not available' 
        };
      }
      
      const result = await BiometricAuth.isAvailable();
      return result;
    } catch (error) {
      return { 
        available: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  /**
   * Authenticates the user using available biometric methods
   */
  static async authenticate(options: AuthenticationOptions = {}): Promise<AuthenticationResult> {
    try {
      if (!BiometricAuth) {
        return { 
          success: false, 
          error: 'Biometric module not available' 
        };
      }
      
      // Check availability first
      const availability = await this.isBiometricAvailable();
      
      if (!availability.available) {
        return { 
          success: false, 
          error: availability.error || 'Biometric authentication not available' 
        };
      }
      
      // Use provided reason or fallback to default based on biometry type
      const reason = options.reason || getDefaultReason(availability.biometryType);
      
      // Authenticate and return result
      return await BiometricAuth.authenticate(reason);
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Authentication failed' 
      };
    }
  }
  
  /**
   * Configures biometric authentication options
   */
  static async configure(options: {
    enabled: boolean;
    timeout?: number;
  }): Promise<void> {
    if (!BiometricAuth) {
      throw new Error('Biometric module not available');
    }
    
    return BiometricAuth.configureBiometrics(options);
  }
}

export default BiometricManager;
```

## testing native modules effectively

testing native modules requires special consideration, as outlined in the [react native testing documentation](https://reactnative.dev/docs/testing-overview). here's how to properly test your biometric implementation:

```typescript
// BiometricManager.test.ts
import { NativeModules } from 'react-native';
import BiometricManager from '../BiometricManager';

// Mock the native module
jest.mock('react-native', () => {
  return {
    Platform: {
      OS: 'ios',
      select: jest.fn(),
    },
    NativeModules: {
      BiometricAuth: {
        isAvailable: jest.fn(),
        authenticate: jest.fn(),
        configureBiometrics: jest.fn(),
      },
    },
  };
});

const mockBiometricAuth = NativeModules.BiometricAuth;

describe('BiometricManager', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('isBiometricAvailable', () => {
    it('should return available: true when biometrics are available', async () => {
      // Arrange
      mockBiometricAuth.isAvailable.mockResolvedValue({
        available: true,
        biometryType: 'facial',
      });
      
      // Act
      const result = await BiometricManager.isBiometricAvailable();
      
      // Assert
      expect(result).toEqual({
        available: true,
        biometryType: 'facial',
      });
      expect(mockBiometricAuth.isAvailable).toHaveBeenCalledTimes(1);
    });

    it('should handle native module errors', async () => {
      // Arrange
      mockBiometricAuth.isAvailable.mockRejectedValue(
        new Error('Native module error')
      );
      
      // Act
      const result = await BiometricManager.isBiometricAvailable();
      
      // Assert
      expect(result).toEqual({
        available: false,
        error: 'Native module error',
      });
    });
  });

  describe('authenticate', () => {
    it('should successfully authenticate user', async () => {
      // Arrange
      mockBiometricAuth.isAvailable.mockResolvedValue({
        available: true,
        biometryType: 'facial',
      });
      
      mockBiometricAuth.authenticate.mockResolvedValue({
        success: true,
      });
      
      // Act
      const result = await BiometricManager.authenticate();
      
      // Assert
      expect(result).toEqual({
        success: true,
      });
      expect(mockBiometricAuth.authenticate).toHaveBeenCalledWith(
        'Authenticate with Face ID'
      );
    });

    it('should use custom reason when provided', async () => {
      // Arrange
      mockBiometricAuth.isAvailable.mockResolvedValue({
        available: true,
        biometryType: 'fingerprint',
      });
      
      mockBiometricAuth.authenticate.mockResolvedValue({
        success: true,
      });
      
      // Act
      await BiometricManager.authenticate({
        reason: 'Custom authentication reason',
      });
      
      // Assert
      expect(mockBiometricAuth.authenticate).toHaveBeenCalledWith(
        'Custom authentication reason'
      );
    });
  });
});
```

## key takeaways

- **understand platform differences**: ios and android have different biometric apis that require platform-specific implementations
- **create clean interfaces**: use typescript to define clear interfaces between js and native code
- **handle errors gracefully**: native operations can fail in various ways, so implement comprehensive error handling
- **optimize for performance**: bridge communication has overhead, so minimize unnecessary calls
- **document comprehensively**: native modules often require additional setup, so document requirements clearly
- **test thoroughly**: write automated tests that mock the native modules to verify your javascript logic

integrating native modules requires careful planning and platform-specific knowledge, but it unlocks powerful capabilities that pure javascript cannot provide. when implemented correctly, native modules can significantly enhance your react native applications while maintaining a smooth developer and user experience.

as react native's architecture evolves, stay updated with the [official documentation](https://reactnative.dev/docs/legacy/native-modules-intro) to ensure your native modules continue to work effectively and take advantage of performance improvements.
