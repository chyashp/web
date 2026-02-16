---
title: "Security and Authentication in React Native"
description: "Learn how to implement security best practices in React Native applications. Master authentication, secure storage, data encryption, and protection against common security threats."
date: "2024-03-27"
tags: ["react-native", "security", "authentication", "encryption", "secure-storage", "mobile-security"]
chapter: 19
section: 9
---

# Security and Authentication in React Native

Security is crucial for mobile applications. In this chapter, you'll learn how to implement various security measures and best practices in your React Native applications.

## Secure Storage

### Encrypted Storage Implementation

```typescript
// src/utils/secureStorage.ts
import EncryptedStorage from 'react-native-encrypted-storage';

export class SecureStorage {
  static async storeSecureItem(key: string, value: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(
        key,
        value
      );
    } catch (error) {
      console.error('Error storing secure item:', error);
      throw new Error('Failed to store secure item');
    }
  }

  static async getSecureItem(key: string): Promise<string | null> {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (error) {
      console.error('Error retrieving secure item:', error);
      return null;
    }
  }

  static async removeSecureItem(key: string): Promise<void> {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing secure item:', error);
      throw new Error('Failed to remove secure item');
    }
  }

  static async clearSecureStorage(): Promise<void> {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      console.error('Error clearing secure storage:', error);
      throw new Error('Failed to clear secure storage');
    }
  }
}

// Usage
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthStorage {
  private static readonly ACCESS_TOKEN_KEY = 'auth_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'auth_refresh_token';

  static async saveTokens(tokens: AuthTokens): Promise<void> {
    await Promise.all([
      SecureStorage.storeSecureItem(
        this.ACCESS_TOKEN_KEY,
        tokens.accessToken
      ),
      SecureStorage.storeSecureItem(
        this.REFRESH_TOKEN_KEY,
        tokens.refreshToken
      ),
    ]);
  }

  static async getTokens(): Promise<AuthTokens | null> {
    const [accessToken, refreshToken] = await Promise.all([
      SecureStorage.getSecureItem(this.ACCESS_TOKEN_KEY),
      SecureStorage.getSecureItem(this.REFRESH_TOKEN_KEY),
    ]);

    if (!accessToken || !refreshToken) {
      return null;
    }

    return { accessToken, refreshToken };
  }

  static async clearTokens(): Promise<void> {
    await Promise.all([
      SecureStorage.removeSecureItem(this.ACCESS_TOKEN_KEY),
      SecureStorage.removeSecureItem(this.REFRESH_TOKEN_KEY),
    ]);
  }
}
```

## Authentication

### JWT Authentication Implementation

```typescript
// src/services/auth.ts
import axios from 'axios';
import { AuthStorage } from '../utils/secureStorage';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

export class AuthService {
  private static instance: AuthService;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  private constructor() {
    this.setupAxiosInterceptors();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private setupAxiosInterceptors(): void {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axios(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const tokens = await this.refreshTokens();
            this.onRefreshSuccess(tokens.accessToken);
            originalRequest.headers.Authorization = 
              `Bearer ${tokens.accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            this.onRefreshFailure(refreshError);
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private onRefreshSuccess(accessToken: string): void {
    this.refreshSubscribers.forEach((callback) => callback(accessToken));
    this.refreshSubscribers = [];
    this.isRefreshing = false;
  }

  private onRefreshFailure(error: any): void {
    this.refreshSubscribers = [];
    this.isRefreshing = false;
    // Handle authentication failure (e.g., logout user)
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        '/api/auth/login',
        credentials
      );
      await AuthStorage.saveTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Authentication failed');
    }
  }

  async refreshTokens(): Promise<AuthResponse> {
    const tokens = await AuthStorage.getTokens();
    if (!tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post<AuthResponse>(
        '/api/auth/refresh',
        {
          refreshToken: tokens.refreshToken,
        }
      );
      await AuthStorage.saveTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new Error('Token refresh failed');
    }
  }

  async logout(): Promise<void> {
    try {
      const tokens = await AuthStorage.getTokens();
      if (tokens?.refreshToken) {
        await axios.post('/api/auth/logout', {
          refreshToken: tokens.refreshToken,
        });
      }
    } finally {
      await AuthStorage.clearTokens();
    }
  }
}

export const authService = AuthService.getInstance();
```

## Data Encryption

### Sensitive Data Handling

```typescript
// src/utils/encryption.ts
import { NativeModules } from 'react-native';
import { Buffer } from 'buffer';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;

export class Encryption {
  private static async deriveKey(
    password: string,
    salt: Buffer
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      NativeModules.KeyDerivation.pbkdf2(
        password,
        salt.toString('base64'),
        100000, // iterations
        KEY_LENGTH,
        'SHA256',
        (error: Error | null, key: string) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(Buffer.from(key, 'base64'));
        }
      );
    });
  }

  static async encrypt(text: string, password: string): Promise<string> {
    const salt = randomBytes(SALT_LENGTH);
    const iv = randomBytes(IV_LENGTH);
    const key = await this.deriveKey(password, salt);

    const cipher = createCipheriv(ALGORITHM, key, iv, {
      authTagLength: TAG_LENGTH,
    });

    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    // Combine all components: salt + iv + tag + encrypted
    const result = Buffer.concat([salt, iv, tag, encrypted]);
    return result.toString('base64');
  }

  static async decrypt(
    encryptedData: string,
    password: string
  ): Promise<string> {
    const data = Buffer.from(encryptedData, 'base64');

    const salt = data.slice(0, SALT_LENGTH);
    const iv = data.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = data.slice(
      SALT_LENGTH + IV_LENGTH,
      SALT_LENGTH + IV_LENGTH + TAG_LENGTH
    );
    const encrypted = data.slice(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);

    const key = await this.deriveKey(password, salt);

    const decipher = createDecipheriv(ALGORITHM, key, iv, {
      authTagLength: TAG_LENGTH,
    });
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}

// Usage
interface SensitiveData {
  creditCard: string;
  ssn: string;
}

class SecureDataManager {
  private static readonly ENCRYPTION_KEY = 'your-secure-encryption-key';

  static async storeSensitiveData(data: SensitiveData): Promise<void> {
    const encrypted = await Encryption.encrypt(
      JSON.stringify(data),
      this.ENCRYPTION_KEY
    );
    await SecureStorage.storeSecureItem('sensitive_data', encrypted);
  }

  static async retrieveSensitiveData(): Promise<SensitiveData | null> {
    const encrypted = await SecureStorage.getSecureItem('sensitive_data');
    if (!encrypted) return null;

    const decrypted = await Encryption.decrypt(
      encrypted,
      this.ENCRYPTION_KEY
    );
    return JSON.parse(decrypted);
  }
}
```

## Security Best Practices

### Certificate Pinning

```typescript
// src/utils/certificatePinning.ts
import { Platform } from 'react-native';
import TrustKit from 'react-native-trustkit';

export class CertificatePinning {
  static initialize() {
    const trustKitConfig = {
      TSKPinnedDomains: {
        'api.yourapp.com': {
          TSKPublicKeyHashes: [
            'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
            'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=',
          ],
          includedSubdomains: true,
        },
      },
    };

    if (Platform.OS === 'ios') {
      TrustKit.initializeWithConfiguration(trustKitConfig);
    } else {
      // Android implementation
      TrustKit.getInstance().initializeWithConfiguration(trustKitConfig);
    }
  }
}

// Initialize certificate pinning when app starts
CertificatePinning.initialize();
```

### Root Detection

```typescript
// src/utils/security.ts
import { NativeModules } from 'react-native';
import JailMonkey from 'jail-monkey';

export class SecurityUtils {
  static async isDeviceSecure(): Promise<{
    secure: boolean;
    risks: string[];
  }> {
    const risks: string[] = [];

    if (await JailMonkey.isJailBroken()) {
      risks.push('Device is rooted/jailbroken');
    }

    if (await JailMonkey.canMockLocation()) {
      risks.push('Location can be mocked');
    }

    if (await JailMonkey.trustFall()) {
      risks.push('Device has malicious apps installed');
    }

    if (await JailMonkey.isDebuggedMode()) {
      risks.push('App is running in debug mode');
    }

    return {
      secure: risks.length === 0,
      risks,
    };
  }

  static handleSecurityRisks(): void {
    this.isDeviceSecure().then(({ secure, risks }) => {
      if (!secure) {
        // Handle security risks (e.g., limit app functionality or show warning)
        console.warn('Security risks detected:', risks);
      }
    });
  }
}

// Usage in app startup
SecurityUtils.handleSecurityRisks();
```

## Next Steps

Now that you understand security implementation in React Native, you can:
- Implement secure storage for sensitive data
- Set up JWT authentication with token refresh
- Encrypt sensitive data
- Implement certificate pinning
- Detect and handle security risks
- Follow security best practices

In the next chapter, we'll explore app deployment and release management.

## Additional Resources

- [React Native Security](https://reactnative.dev/docs/security)
- [OWASP Mobile Security Testing Guide](https://owasp.org/www-project-mobile-security-testing-guide/)
- [React Native Encrypted Storage](https://github.com/emeraldsanto/react-native-encrypted-storage)
- [React Native TrustKit](https://github.com/datatheorem/TrustKit-React-Native) 