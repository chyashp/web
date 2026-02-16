---
title: "Data Persistence in React Native: Storage Solutions and Best Practices"
description: "Learn how to implement data persistence in React Native applications. Master AsyncStorage, SQLite, Realm, secure storage, and caching strategies for optimal data management."
date: "2024-03-27"
tags: ["react-native", "data-persistence", "async-storage", "sqlite", "realm", "secure-storage", "caching", "mobile-development"]
chapter: 12
section: 8
---

# Data Persistence in React Native

Data persistence is crucial for creating robust mobile applications. In this chapter, you'll learn about different storage solutions and how to implement them effectively in React Native.

## AsyncStorage Basics

AsyncStorage is React Native's simple key-value storage system. First, install the package:

```bash
npm install @react-native-async-storage/async-storage
```

### Basic Operations

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Retrieve data
const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Remove data
const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};
```

### Custom Storage Hook

```typescript
// src/hooks/useAsyncStorage.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseAsyncStorageOptions<T> {
  key: string;
  initialValue: T;
}

export function useAsyncStorage<T>({ 
  key, 
  initialValue 
}: UseAsyncStorageOptions<T>) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadData();
  }, [key]);

  const loadData = async () => {
    try {
      setLoading(true);
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  const setValue = async (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (e) {
      setError(e as Error);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (e) {
      setError(e as Error);
    }
  };

  return {
    value: storedValue,
    setValue,
    removeValue,
    loading,
    error,
    refresh: loadData,
  };
}
```

## SQLite Integration

For more complex data storage needs, SQLite provides a full relational database solution.

```bash
npm install react-native-sqlite-storage
```

### Database Setup

```typescript
// src/database/index.ts
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export class Database {
  private static instance: Database;
  private database: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async init(): Promise<void> {
    try {
      this.database = await SQLite.openDatabase({
        name: 'AppDatabase.db',
        location: 'default',
      });

      await this.createTables();
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at INTEGER NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`,
    ];

    for (const query of queries) {
      await this.database?.executeSql(query);
    }
  }

  async close(): Promise<void> {
    await this.database?.close();
    this.database = null;
  }
}
```

### Data Access Layer

```typescript
// src/database/repositories/noteRepository.ts
import { Database } from '../index';
import { Note } from '../types';

export class NoteRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async create(note: Omit<Note, 'id'>): Promise<Note> {
    const id = Date.now().toString();
    const timestamp = Date.now();

    const query = `
      INSERT INTO notes (id, user_id, title, content, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await this.db.executeSql(query, [
      id,
      note.userId,
      note.title,
      note.content,
      timestamp,
      timestamp,
    ]);

    return {
      id,
      ...note,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  }

  async getByUserId(userId: string): Promise<Note[]> {
    const query = `
      SELECT * FROM notes
      WHERE user_id = ?
      ORDER BY updated_at DESC
    `;

    const [results] = await this.db.executeSql(query, [userId]);
    return results.rows.raw();
  }

  async update(id: string, data: Partial<Note>): Promise<void> {
    const timestamp = Date.now();
    const sets: string[] = [];
    const values: any[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'userId') {
        sets.push(`${key} = ?`);
        values.push(value);
      }
    });

    sets.push('updated_at = ?');
    values.push(timestamp);
    values.push(id);

    const query = `
      UPDATE notes
      SET ${sets.join(', ')}
      WHERE id = ?
    `;

    await this.db.executeSql(query, values);
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM notes WHERE id = ?';
    await this.db.executeSql(query, [id]);
  }
}
```

## Realm Database

Realm is a modern alternative to SQLite, offering better performance and a more developer-friendly API.

```bash
npm install realm @realm/react
```

### Schema Definition

```typescript
// src/database/realm/schemas.ts
export const NoteSchema = {
  name: 'Note',
  primaryKey: 'id',
  properties: {
    id: 'string',
    userId: 'string',
    title: 'string',
    content: 'string?',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

export const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    email: 'string',
    createdAt: 'date',
    notes: 'Note[]',
  },
};
```

### Realm Configuration

```typescript
// src/database/realm/index.ts
import Realm from 'realm';
import { NoteSchema, UserSchema } from './schemas';

export const getRealm = async () => {
  return await Realm.open({
    schema: [UserSchema, NoteSchema],
    schemaVersion: 1,
  });
};

// Custom hook for Realm operations
export function useRealm<T>(
  realmFunction: (realm: Realm) => Promise<T>
): {
  execute: () => Promise<T>;
  loading: boolean;
  error: Error | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);

    try {
      const realm = await getRealm();
      const result = await realmFunction(realm);
      realm.close();
      return result;
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}
```

### Data Operations with Realm

```typescript
// src/database/realm/repositories/noteRepository.ts
import Realm from 'realm';
import { Note } from '../types';

export class NoteRepository {
  static async create(realm: Realm, note: Omit<Note, 'id'>): Promise<Note> {
    return new Promise((resolve, reject) => {
      try {
        let createdNote: Note;

        realm.write(() => {
          createdNote = realm.create('Note', {
            id: new Realm.BSON.ObjectId().toString(),
            ...note,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });

        resolve(createdNote!);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getByUserId(realm: Realm, userId: string): Promise<Note[]> {
    return realm
      .objects<Note>('Note')
      .filtered('userId == $0', userId)
      .sorted('updatedAt', true)
      .toJSON();
  }

  static async update(
    realm: Realm,
    id: string,
    data: Partial<Note>
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        realm.write(() => {
          const note = realm.objectForPrimaryKey<Note>('Note', id);
          if (note) {
            Object.assign(note, {
              ...data,
              updatedAt: new Date(),
            });
          }
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  static async delete(realm: Realm, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        realm.write(() => {
          const note = realm.objectForPrimaryKey<Note>('Note', id);
          if (note) {
            realm.delete(note);
          }
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
```

## Secure Storage

For sensitive data like authentication tokens or user credentials, use secure storage.

```bash
npm install react-native-encrypted-storage
```

### Secure Storage Utility

```typescript
// src/utils/secureStorage.ts
import EncryptedStorage from 'react-native-encrypted-storage';

export class SecureStorage {
  static async storeSecureItem(key: string, value: any): Promise<void> {
    try {
      await EncryptedStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error('Error storing secure item:', error);
      throw error;
    }
  }

  static async getSecureItem<T>(key: string): Promise<T | null> {
    try {
      const item = await EncryptedStorage.getItem(key);
      return item ? JSON.parse(item) : null;
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
      throw error;
    }
  }

  static async clearSecureStorage(): Promise<void> {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      console.error('Error clearing secure storage:', error);
      throw error;
    }
  }
}
```

## Caching Strategies

### Memory Cache

```typescript
// src/utils/memoryCache.ts
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class MemoryCache {
  private static instance: MemoryCache;
  private cache: Map<string, CacheItem<any>>;
  private readonly defaultTTL: number;

  private constructor(defaultTTL: number = 5 * 60 * 1000) {
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  static getInstance(): MemoryCache {
    if (!MemoryCache.instance) {
      MemoryCache.instance = new MemoryCache();
    }
    return MemoryCache.instance;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + (ttl || this.defaultTTL),
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}
```

### Persistent Cache

```typescript
// src/utils/persistentCache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheConfig {
  prefix: string;
  ttl: number;
}

export class PersistentCache {
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      prefix: '@cache:',
      ttl: 24 * 60 * 60 * 1000, // 24 hours
      ...config,
    };
  }

  async set<T>(key: string, data: T): Promise<void> {
    const cacheItem = {
      data,
      timestamp: Date.now() + this.config.ttl,
    };

    await AsyncStorage.setItem(
      this.config.prefix + key,
      JSON.stringify(cacheItem)
    );
  }

  async get<T>(key: string): Promise<T | null> {
    const item = await AsyncStorage.getItem(this.config.prefix + key);
    if (!item) return null;

    const { data, timestamp } = JSON.parse(item);
    if (Date.now() > timestamp) {
      await this.remove(key);
      return null;
    }

    return data;
  }

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(this.config.prefix + key);
  }

  async clear(): Promise<void> {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => 
      key.startsWith(this.config.prefix)
    );
    await AsyncStorage.multiRemove(cacheKeys);
  }
}
```

## Best Practices

1. **Data Migration**
```typescript
// src/database/migrations.ts
export class DatabaseMigration {
  static async migrate(fromVersion: number, toVersion: number): Promise<void> {
    for (let version = fromVersion + 1; version <= toVersion; version++) {
      await this.runMigration(version);
    }
  }

  private static async runMigration(version: number): Promise<void> {
    switch (version) {
      case 2:
        await this.migrateToV2();
        break;
      case 3:
        await this.migrateToV3();
        break;
      default:
        console.warn(`No migration found for version ${version}`);
    }
  }

  private static async migrateToV2(): Promise<void> {
    // Add migration logic
  }

  private static async migrateToV3(): Promise<void> {
    // Add migration logic
  }
}
```

2. **Error Handling**
```typescript
// src/utils/errorHandling.ts
export class StorageError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

export function handleStorageError(error: any): StorageError {
  if (error instanceof StorageError) {
    return error;
  }

  return new StorageError(
    error.message || 'Unknown storage error',
    'STORAGE_ERROR',
    error
  );
}
```

3. **Data Validation**
```typescript
// src/utils/validation.ts
import * as yup from 'yup';

export const validateBeforeStore = async <T>(
  data: T,
  schema: yup.Schema<T>
): Promise<T> => {
  try {
    return await schema.validate(data);
  } catch (error) {
    throw new StorageError(
      'Data validation failed',
      'VALIDATION_ERROR',
      error as Error
    );
  }
};
```

## Next Steps

Now that you understand data persistence in React Native, you can:
- Choose the right storage solution for your needs
- Implement secure data storage
- Handle complex data relationships
- Optimize data access with caching
- Manage data migrations

In the next chapter, we'll explore testing and debugging in React Native.

## Additional Resources

- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [SQLite Documentation](https://github.com/andpor/react-native-sqlite-storage)
- [Realm Documentation](https://www.mongodb.com/docs/realm/sdk/react-native/)
- [Encrypted Storage Documentation](https://github.com/emeraldsanto/react-native-encrypted-storage) 