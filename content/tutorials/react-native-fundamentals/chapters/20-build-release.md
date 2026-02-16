---
title: "Building and Releasing React Native Applications"
description: "Learn how to build, sign, and release React Native applications for both iOS and Android platforms. Master app store deployment, continuous integration, and release management."
date: "2024-03-27"
tags: ["react-native", "deployment", "app-store", "play-store", "ci-cd", "release-management"]
chapter: 20
section: 9
---

# Building and Releasing React Native Applications

This chapter will guide you through the process of building and releasing your React Native application for both iOS and Android platforms.

## Build Configuration

### Version Management

```typescript
// src/config/version.ts
interface VersionConfig {
  version: string;
  buildNumber: string;
  minimumOSVersion: {
    ios: string;
    android: number;
  };
}

export const versionConfig: VersionConfig = {
  version: '1.0.0',
  buildNumber: '1',
  minimumOSVersion: {
    ios: '13.0',
    android: 21, // Android 5.0
  },
};

// Usage in app.json
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1",
      "minOsVersion": "13.0"
    },
    "android": {
      "versionCode": 1,
      "minSdkVersion": 21
    }
  }
}
```

### Environment Configuration

```typescript
// src/config/environment.ts
type Environment = 'development' | 'staging' | 'production';

interface Config {
  apiUrl: string;
  environment: Environment;
  enableAnalytics: boolean;
  logLevel: 'debug' | 'info' | 'error';
}

const configs: Record<Environment, Config> = {
  development: {
    apiUrl: 'http://localhost:3000',
    environment: 'development',
    enableAnalytics: false,
    logLevel: 'debug',
  },
  staging: {
    apiUrl: 'https://staging-api.yourapp.com',
    environment: 'staging',
    enableAnalytics: true,
    logLevel: 'info',
  },
  production: {
    apiUrl: 'https://api.yourapp.com',
    environment: 'production',
    enableAnalytics: true,
    logLevel: 'error',
  },
};

export function getConfig(env: Environment = 'development'): Config {
  return configs[env];
}

// Usage in index.js or App.tsx
const config = getConfig(__DEV__ ? 'development' : 'production');
```

## iOS Build Process

### Xcode Configuration

```ruby
# ios/Podfile
platform :ios, '13.0'

target 'YourApp' do
  config = use_native_modules!
  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => true
  )

  # Production-specific configurations
  if ENV['PRODUCTION'] == '1'
    config_file = 'Release'
    use_frameworks!
  else
    config_file = 'Debug'
  end

  # Add your pods here
  pod 'Firebase/Analytics'
  pod 'Firebase/Crashlytics'
end

post_install do |installer|
  react_native_post_install(installer)
  __apply_Xcode_12_5_M1_post_install_workaround(installer)
  
  # Enable arm64 architecture for iOS simulator
  installer.pods_project.build_configurations.each do |config|
    config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = ''
    config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
  end
end
```

### App Signing and Provisioning

```bash
# Certificate and provisioning profile setup script
#!/bin/bash

# Variables
CERTIFICATE_PATH="./certificates"
PROFILE_PATH="./profiles"
KEYCHAIN_PATH="$HOME/Library/Keychains/build.keychain"

# Create keychain
security create-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH
security default-keychain -s $KEYCHAIN_PATH
security unlock-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH
security set-keychain-settings -t 3600 -l $KEYCHAIN_PATH

# Import certificates
security import "$CERTIFICATE_PATH/distribution.p12" -k $KEYCHAIN_PATH -P "$CERT_PASSWORD" -T /usr/bin/codesign
security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH

# Copy provisioning profiles
mkdir -p "$HOME/Library/MobileDevice/Provisioning Profiles"
cp "$PROFILE_PATH"/*.mobileprovision "$HOME/Library/MobileDevice/Provisioning Profiles/"
```

### Automated Build Script

```bash
#!/bin/bash
set -e

# Environment setup
export ENVIRONMENT="production"
export CONFIGURATION="Release"

# Clean build
xcodebuild clean -workspace ios/YourApp.xcworkspace -scheme YourApp

# Install pods
cd ios
pod install
cd ..

# Archive
xcodebuild archive \
  -workspace ios/YourApp.xcworkspace \
  -scheme YourApp \
  -configuration $CONFIGURATION \
  -archivePath ios/build/YourApp.xcarchive \
  CODE_SIGN_STYLE="Manual" \
  CODE_SIGN_IDENTITY="iPhone Distribution: Your Company (TEAM_ID)" \
  PROVISIONING_PROFILE_SPECIFIER="YourApp_Distribution"

# Export IPA
xcodebuild -exportArchive \
  -archivePath ios/build/YourApp.xcarchive \
  -exportOptionsPlist ios/ExportOptions.plist \
  -exportPath ios/build
```

## Android Build Process

### Gradle Configuration

```groovy
// android/app/build.gradle
android {
    defaultConfig {
        applicationId "com.yourapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0.0"
    }

    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }

    buildTypes {
        debug {
            signingConfig signingConfigs.debug
            debuggable true
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }

    // Enable Hermes
    project.ext.react = [
        enableHermes: true
    ]
}
```

### Keystore Generation

```bash
#!/bin/bash

# Generate keystore
keytool -genkeypair \
  -v \
  -keystore android/app/release.keystore \
  -alias your-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass your-store-password \
  -keypass your-key-password \
  -dname "CN=Your Name, OU=Your Organization, O=Your Company, L=Your City, S=Your State, C=Your Country"

# Create keystore properties file
cat > android/keystore.properties << EOF
MYAPP_RELEASE_STORE_FILE=release.keystore
MYAPP_RELEASE_KEY_ALIAS=your-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your-store-password
MYAPP_RELEASE_KEY_PASSWORD=your-key-password
EOF
```

### Build Script

```bash
#!/bin/bash
set -e

# Environment setup
export ENVIRONMENT="production"

# Clean build
cd android
./gradlew clean

# Build release APK/AAB
./gradlew bundleRelease # For app bundle
./gradlew assembleRelease # For APK

# Move artifacts
mkdir -p ../builds
cp app/build/outputs/bundle/release/app-release.aab ../builds/
cp app/build/outputs/apk/release/app-release.apk ../builds/
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/release.yml
name: Release Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          yarn install
          cd ios && pod install
          
      - name: Setup provisioning profile
        env:
          IOS_PROFILE_BASE64: ${{ secrets.IOS_PROFILE_BASE64 }}
          IOS_CERTIFICATE_BASE64: ${{ secrets.IOS_CERTIFICATE_BASE64 }}
        run: |
          echo $IOS_PROFILE_BASE64 | base64 --decode > profile.mobileprovision
          echo $IOS_CERTIFICATE_BASE64 | base64 --decode > certificate.p12
          ./scripts/setup-signing.sh
          
      - name: Build iOS
        run: ./scripts/build-ios.sh
        
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: ios-build
          path: ios/build/*.ipa

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Setup JDK
        uses: actions/setup-java@v2
        with:
          distribution: 'adopt'
          java-version: '11'
          
      - name: Install dependencies
        run: yarn install
        
      - name: Setup keystore
        env:
          KEYSTORE_BASE64: ${{ secrets.ANDROID_KEYSTORE_BASE64 }}
        run: |
          echo $KEYSTORE_BASE64 | base64 --decode > android/app/release.keystore
          
      - name: Build Android
        run: ./scripts/build-android.sh
        
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: android-build
          path: |
            builds/*.aab
            builds/*.apk
```

## App Store Deployment

### iOS App Store Connect

```typescript
// scripts/upload-to-testflight.ts
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function uploadToTestFlight() {
  try {
    // Validate the archive
    await execAsync(
      'xcrun altool --validate-app -f ios/build/YourApp.ipa -t ios --apiKey "$API_KEY" --apiIssuer "$API_ISSUER"'
    );

    // Upload to App Store Connect
    await execAsync(
      'xcrun altool --upload-app -f ios/build/YourApp.ipa -t ios --apiKey "$API_KEY" --apiIssuer "$API_ISSUER"'
    );

    console.log('Successfully uploaded to TestFlight');
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

uploadToTestFlight();
```

### Google Play Console

```typescript
// scripts/upload-to-play-store.ts
import { google } from 'googleapis';
import { readFileSync } from 'fs';

async function uploadToPlayStore() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'path/to/service-account.json',
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });

    const androidpublisher = google.androidpublisher({
      version: 'v3',
      auth,
    });

    const edit = await androidpublisher.edits.insert({
      packageName: 'com.yourapp',
    });

    const editId = edit.data.id;

    // Upload AAB
    await androidpublisher.edits.bundles.upload({
      packageName: 'com.yourapp',
      editId,
      media: {
        mimeType: 'application/octet-stream',
        body: readFileSync('builds/app-release.aab'),
      },
    });

    // Commit the changes
    await androidpublisher.edits.commit({
      packageName: 'com.yourapp',
      editId,
    });

    console.log('Successfully uploaded to Play Store');
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

uploadToPlayStore();
```

## Next Steps

Now that you understand the build and release process, you can:
- Configure build environments
- Set up app signing and provisioning
- Automate builds with CI/CD
- Deploy to app stores
- Manage app versions and updates
- Monitor release performance

In the next chapter, we'll explore app monitoring and analytics.

## Additional Resources

- [iOS App Distribution Guide](https://developer.apple.com/documentation/xcode/distributing_your_app_for_beta_testing_and_releases)
- [Android App Bundle Guide](https://developer.android.com/guide/app-bundle)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Fastlane Documentation](https://docs.fastlane.tools/) 