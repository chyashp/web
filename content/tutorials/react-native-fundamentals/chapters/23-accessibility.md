---
title: "Accessibility in React Native"
description: "Learn how to make your React Native applications accessible to all users. Master screen reader support, focus management, WCAG compliance, and accessibility best practices."
date: "2024-03-27"
tags: ["react-native", "accessibility", "a11y", "wcag", "screen-reader"]
chapter: 23
section: 12
---

# Accessibility in React Native

This chapter will guide you through implementing accessibility features in your React Native application, ensuring it's usable by people with various disabilities.

## Screen Reader Support

### Accessible Components

```typescript
// src/components/AccessibleButton.tsx
import React from 'react';
import { TouchableOpacity, Text, AccessibilityProps } from 'react-native';

interface AccessibleButtonProps extends AccessibilityProps {
  onPress: () => void;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  onPress,
  label,
  hint,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={[styles.button, disabled && styles.disabled]}
      {...props}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: '#666',
  },
});

// Usage
<AccessibleButton
  label="Submit Form"
  hint="Double tap to submit your information"
  onPress={handleSubmit}
  disabled={!isValid}
/>
```

### Form Fields

```typescript
// src/components/AccessibleInput.tsx
import React from 'react';
import { View, TextInput, Text, AccessibilityInfo } from 'react-native';

interface AccessibleInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  required?: boolean;
  autoComplete?: TextInputProps['autoComplete'];
  keyboardType?: TextInputProps['keyboardType'];
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  required = false,
  autoComplete,
  keyboardType,
}) => {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    AccessibilityInfo.announceForAccessibility(`${label} field, ${error || ''}`);
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.label}
        accessibilityRole="text"
      >
        {label}{required && '*'}
      </Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          isFocused && styles.focused,
          error && styles.error,
        ]}
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={error || `Enter ${label.toLowerCase()}`}
        accessibilityRole="text"
        accessibilityState={{
          error: !!error,
          required,
        }}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
      />
      {error && (
        <Text
          style={styles.errorText}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  focused: {
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  error: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});
```

## Focus Management

### Focus Trap

```typescript
// src/components/FocusTrap.tsx
import React, { useRef, useEffect } from 'react';
import { View, AccessibilityInfo, findNodeHandle } from 'react-native';

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  active = true,
}) => {
  const startRef = useRef<View>(null);
  const endRef = useRef<View>(null);

  useEffect(() => {
    if (active && startRef.current) {
      const nodeHandle = findNodeHandle(startRef.current);
      if (nodeHandle) {
        AccessibilityInfo.setAccessibilityFocus(nodeHandle);
      }
    }
  }, [active]);

  const handleStartFocus = () => {
    if (endRef.current) {
      const nodeHandle = findNodeHandle(endRef.current);
      if (nodeHandle) {
        AccessibilityInfo.setAccessibilityFocus(nodeHandle);
      }
    }
  };

  const handleEndFocus = () => {
    if (startRef.current) {
      const nodeHandle = findNodeHandle(startRef.current);
      if (nodeHandle) {
        AccessibilityInfo.setAccessibilityFocus(nodeHandle);
      }
    }
  };

  if (!active) return <>{children}</>;

  return (
    <View>
      <View
        ref={startRef}
        accessible={true}
        accessibilityRole="none"
        onAccessibilityEscape={handleStartFocus}
      />
      {children}
      <View
        ref={endRef}
        accessible={true}
        accessibilityRole="none"
        onAccessibilityEscape={handleEndFocus}
      />
    </View>
  );
};

// Usage in Modal
function AccessibleModal({ isVisible, onClose, children }) {
  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <FocusTrap active={isVisible}>
        <View style={styles.modalContent}>
          {children}
        </View>
      </FocusTrap>
    </Modal>
  );
}
```

## Dynamic Updates

### Live Region

```typescript
// src/components/LiveRegion.tsx
import React, { useEffect } from 'react';
import { View, Text, AccessibilityInfo } from 'react-native';

interface LiveRegionProps {
  message: string;
  type?: 'polite' | 'assertive';
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  message,
  type = 'polite',
}) => {
  useEffect(() => {
    if (message) {
      AccessibilityInfo.announceForAccessibility(message);
    }
  }, [message]);

  return (
    <View
      accessible={true}
      accessibilityLiveRegion={type}
      accessibilityRole="text"
    >
      <Text>{message}</Text>
    </View>
  );
};

// Usage
function LoadingState() {
  const [status, setStatus] = useState('Loading...');

  return (
    <View>
      <ActivityIndicator size="large" />
      <LiveRegion
        message={status}
        type="polite"
      />
    </View>
  );
}
```

## Color and Contrast

### Contrast Checker

```typescript
// src/utils/accessibility.ts
interface RGB {
  r: number;
  g: number;
  b: number;
}

export class ContrastChecker {
  private static hexToRgb(hex: string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 };
  }

  private static getLuminance({ r, g, b }: RGB): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928
        ? c / 12.92
        : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  static getContrastRatio(color1: string, color2: string): number {
    const l1 = this.getLuminance(this.hexToRgb(color1));
    const l2 = this.getLuminance(this.hexToRgb(color2));
    const lightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (lightest + 0.05) / (darkest + 0.05);
  }

  static meetsWCAG2AA(ratio: number, fontSize: number): boolean {
    return fontSize >= 18 ? ratio >= 3 : ratio >= 4.5;
  }

  static meetsWCAG2AAA(ratio: number, fontSize: number): boolean {
    return fontSize >= 18 ? ratio >= 4.5 : ratio >= 7;
  }
}

// Usage
const textColor = '#333333';
const backgroundColor = '#FFFFFF';
const fontSize = 16;

const ratio = ContrastChecker.getContrastRatio(textColor, backgroundColor);
const isAA = ContrastChecker.meetsWCAG2AA(ratio, fontSize);
const isAAA = ContrastChecker.meetsWCAG2AAA(ratio, fontSize);

console.log(`Contrast ratio: ${ratio.toFixed(2)}`);
console.log(`Meets WCAG 2.0 AA: ${isAA}`);
console.log(`Meets WCAG 2.0 AAA: ${isAAA}`);
```

## Testing Accessibility

### Accessibility Tests

```typescript
// src/tests/accessibility.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';

describe('Accessibility Tests', () => {
  test('button has correct accessibility props', () => {
    const { getByRole } = render(
      <AccessibleButton
        label="Submit"
        hint="Submit form"
        onPress={() => {}}
      />
    );

    const button = getByRole('button');
    expect(button.props.accessibilityLabel).toBe('Submit');
    expect(button.props.accessibilityHint).toBe('Submit form');
    expect(button.props.accessible).toBe(true);
  });

  test('form field announces errors', () => {
    const announceSpy = jest.spyOn(AccessibilityInfo, 'announceForAccessibility');

    const { getByLabelText } = render(
      <AccessibleInput
        label="Email"
        value=""
        onChangeText={() => {}}
        error="Invalid email"
      />
    );

    const input = getByLabelText('Email');
    fireEvent(input, 'focus');

    expect(announceSpy).toHaveBeenCalledWith('Email field, Invalid email');
  });

  test('focus trap maintains focus within modal', () => {
    const { getByTestId } = render(
      <AccessibleModal isVisible={true} onClose={() => {}}>
        <Text>Modal content</Text>
      </AccessibleModal>
    );

    const modal = getByTestId('modal');
    expect(modal).toHaveFocus();
  });
});
```

## Next Steps

Now that you understand accessibility in React Native, you can:
- Implement screen reader support
- Manage focus properly
- Create accessible forms
- Ensure proper color contrast
- Test accessibility features
- Meet WCAG guidelines

## Additional Resources

- [React Native Accessibility Guide](https://reactnative.dev/docs/accessibility)
- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [iOS Accessibility](https://developer.apple.com/accessibility/)
- [Android Accessibility](https://developer.android.com/guide/topics/ui/accessibility) 