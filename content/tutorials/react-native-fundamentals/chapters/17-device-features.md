---
title: "Device Features and Hardware Integration in React Native"
description: "Learn how to integrate device features and hardware capabilities in React Native. Master camera integration, geolocation, biometrics, sensors, and other device-specific functionalities."
date: "2024-03-27"
tags: ["react-native", "device-features", "camera", "geolocation", "biometrics", "sensors", "mobile-development"]
chapter: 17
section: 8
---

# Device Features and Hardware Integration in React Native

Modern mobile applications often require access to device hardware and features. In this chapter, you'll learn how to integrate various device capabilities into your React Native applications.

## Camera Integration

### Basic Camera Setup

```typescript
// src/components/Camera/index.tsx
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'react-native-camera';

interface CameraViewProps {
  onCapture: (uri: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        onCapture(data.uri);
      } catch (error) {
        console.error('Camera capture error:', error);
      }
    }
  };

  const toggleCameraType = () => {
    setType(current => 
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        type={type}
        style={styles.camera}
        captureAudio={false}
      >
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.button}
            onPress={toggleCameraType}
          >
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={handleCapture}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});
```

### Camera Permissions

```typescript
// src/utils/permissions.ts
import { PermissionsAndroid, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Camera permission err:', err);
      return false;
    }
  } else {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    return result === RESULTS.GRANTED;
  }
}

// Usage
import { CameraView } from './components/Camera';
import { requestCameraPermission } from './utils/permissions';

function PhotoScreen() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function checkPermission() {
      const granted = await requestCameraPermission();
      setHasPermission(granted);
    }
    checkPermission();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Camera permission is required</Text>
      </View>
    );
  }

  return <CameraView onCapture={handleCapture} />;
}
```

## Geolocation

### Location Services

```typescript
// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';
import Geolocation, { 
  GeolocationResponse 
} from '@react-native-community/geolocation';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export function useLocation(watchPosition = false) {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    let watchId: number;

    async function getLocation() {
      try {
        const position: GeolocationResponse = await new Promise(
          (resolve, reject) => {
            Geolocation.getCurrentPosition(
              resolve,
              reject,
              {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
              }
            );
          }
        );

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      } catch (error) {
        setLocation(prev => ({
          ...prev,
          error: error.message,
        }));
      }
    }

    if (watchPosition) {
      watchId = Geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation(prev => ({
            ...prev,
            error: error.message,
          }));
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10, // Minimum distance (meters) between updates
        }
      );
    } else {
      getLocation();
    }

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [watchPosition]);

  return location;
}

// Usage
function MapScreen() {
  const location = useLocation(true);

  if (location.error) {
    return <Text>Error: {location.error}</Text>;
  }

  return (
    <MapView
      initialRegion={{
        latitude: location.latitude || 0,
        longitude: location.longitude || 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}
```

## Biometric Authentication

### Fingerprint and Face ID

```typescript
// src/utils/biometrics.ts
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

class BiometricAuth {
  private rnBiometrics: ReactNativeBiometrics;

  constructor() {
    this.rnBiometrics = new ReactNativeBiometrics();
  }

  async isSensorAvailable(): Promise<{
    available: boolean;
    biometryType?: BiometryTypes;
  }> {
    try {
      const { available, biometryType } = 
        await this.rnBiometrics.isSensorAvailable();
      return { available, biometryType };
    } catch (error) {
      console.error('Biometric check error:', error);
      return { available: false };
    }
  }

  async authenticate(
    promptMessage: string = 'Confirm your identity'
  ): Promise<boolean> {
    try {
      const { success } = await this.rnBiometrics.simplePrompt({
        promptMessage,
        cancelButtonText: 'Cancel',
      });
      return success;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  async createKeys(): Promise<{
    publicKey: string | null;
    error?: string;
  }> {
    try {
      const { publicKey } = await this.rnBiometrics.createKeys();
      return { publicKey };
    } catch (error) {
      return { 
        publicKey: null, 
        error: 'Failed to create keys' 
      };
    }
  }
}

export const biometricAuth = new BiometricAuth();

// Usage
import { biometricAuth } from './utils/biometrics';

async function handleSecureLogin() {
  const { available, biometryType } = await biometricAuth.isSensorAvailable();
  
  if (!available) {
    console.log('Biometric authentication not available');
    return;
  }

  const authenticated = await biometricAuth.authenticate(
    `Sign in with ${biometryType === BiometryTypes.FaceID ? 'Face ID' : 'Fingerprint'}`
  );

  if (authenticated) {
    // Proceed with secure operation
    console.log('Authentication successful');
  }
}
```

## Device Sensors

### Accelerometer and Gyroscope

```typescript
// src/hooks/useSensors.ts
import { useState, useEffect } from 'react';
import { 
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes 
} from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';

interface SensorData {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export function useSensors(updateInterval = 100) {
  const [accelerometerData, setAccelerometerData] = useState<SensorData | null>(
    null
  );
  const [gyroscopeData, setGyroscopeData] = useState<SensorData | null>(null);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, updateInterval);
    setUpdateIntervalForType(SensorTypes.gyroscope, updateInterval);

    const accelerometerSubscription = accelerometer
      .pipe(
        map(({ x, y, z, timestamp }) => ({ x, y, z, timestamp })),
        filter(data => data.timestamp % updateInterval === 0)
      )
      .subscribe(
        data => setAccelerometerData(data),
        error => console.error('Accelerometer error:', error)
      );

    const gyroscopeSubscription = gyroscope
      .pipe(
        map(({ x, y, z, timestamp }) => ({ x, y, z, timestamp })),
        filter(data => data.timestamp % updateInterval === 0)
      )
      .subscribe(
        data => setGyroscopeData(data),
        error => console.error('Gyroscope error:', error)
      );

    return () => {
      accelerometerSubscription.unsubscribe();
      gyroscopeSubscription.unsubscribe();
    };
  }, [updateInterval]);

  return { accelerometerData, gyroscopeData };
}

// Usage
function MotionDetector() {
  const { accelerometerData, gyroscopeData } = useSensors(200);

  useEffect(() => {
    if (accelerometerData) {
      const magnitude = Math.sqrt(
        Math.pow(accelerometerData.x, 2) +
        Math.pow(accelerometerData.y, 2) +
        Math.pow(accelerometerData.z, 2)
      );

      if (magnitude > 20) {
        console.log('Sudden movement detected!');
      }
    }
  }, [accelerometerData]);

  return (
    <View>
      <Text>Accelerometer:</Text>
      <Text>X: {accelerometerData?.x.toFixed(2)}</Text>
      <Text>Y: {accelerometerData?.y.toFixed(2)}</Text>
      <Text>Z: {accelerometerData?.z.toFixed(2)}</Text>
      
      <Text>Gyroscope:</Text>
      <Text>X: {gyroscopeData?.x.toFixed(2)}</Text>
      <Text>Y: {gyroscopeData?.y.toFixed(2)}</Text>
      <Text>Z: {gyroscopeData?.z.toFixed(2)}</Text>
    </View>
  );
}
```

## Best Practices

1. **Permission Handling**
```typescript
// src/utils/permissionManager.ts
import { Permission, check, request, RESULTS } from 'react-native-permissions';

export class PermissionManager {
  static async checkAndRequest(
    permission: Permission,
    rationale?: string
  ): Promise<boolean> {
    try {
      const status = await check(permission);
      
      switch (status) {
        case RESULTS.GRANTED:
          return true;
        case RESULTS.DENIED:
          const result = await request(permission, { rationale });
          return result === RESULTS.GRANTED;
        default:
          return false;
      }
    } catch (error) {
      console.error(`Permission error (${permission}):`, error);
      return false;
    }
  }
}
```

2. **Battery Optimization**
```typescript
// src/hooks/useBatteryOptimizedSensors.ts
import { useState, useEffect, useCallback } from 'react';
import { AppState } from 'react-native';
import { useSensors } from './useSensors';

export function useBatteryOptimizedSensors() {
  const [isActive, setIsActive] = useState(true);
  const { accelerometerData, gyroscopeData } = useSensors(
    isActive ? 100 : 1000
  );

  const handleAppStateChange = useCallback((nextAppState: string) => {
    setIsActive(nextAppState === 'active');
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  return { accelerometerData, gyroscopeData };
}
```

3. **Error Handling**
```typescript
// src/utils/deviceFeatureError.ts
export class DeviceFeatureError extends Error {
  constructor(
    public feature: string,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'DeviceFeatureError';
  }

  static handle(error: unknown, feature: string): DeviceFeatureError {
    if (error instanceof DeviceFeatureError) {
      return error;
    }

    const message = error instanceof Error ? 
      error.message : 
      'Unknown error occurred';

    return new DeviceFeatureError(
      feature,
      'UNKNOWN',
      message
    );
  }
}

// Usage
try {
  await camera.takePicture();
} catch (error) {
  const handledError = DeviceFeatureError.handle(error, 'camera');
  // Log error or show user-friendly message
}
```

## Next Steps

Now that you understand device features and hardware integration, you can:
- Implement camera functionality
- Use geolocation services
- Add biometric authentication
- Integrate device sensors
- Handle permissions properly
- Optimize battery usage

In the next chapter, we'll explore app deployment and publishing.

## Additional Resources

- [React Native Camera](https://react-native-camera.github.io/react-native-camera/)
- [React Native Geolocation](https://github.com/react-native-geolocation/react-native-geolocation)
- [React Native Biometrics](https://github.com/SelfLender/react-native-biometrics)
- [React Native Sensors](https://react-native-sensors.github.io/) 