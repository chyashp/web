---
title: "Form Handling and Validation in React Native"
description: "Master form handling in React Native applications. Learn to build user-friendly forms with validation, handle user input effectively, and implement form submission with proper error handling."
date: "2024-03-27"
tags: ["react-native", "forms", "validation", "formik", "yup", "user-input", "mobile-forms", "error-handling"]
chapter: 9
section: 5
---

# Form Handling and Validation in React Native

Forms are a crucial part of mobile applications, from user registration to data collection. In this chapter, you'll learn how to create robust, user-friendly forms with proper validation and error handling.

## Form Libraries and Tools

We'll use two popular libraries for form handling:
- **Formik**: For form state management and handling
- **Yup**: For schema-based form validation

Install the required dependencies:

```bash
npm install formik yup
```

## Basic Form Components

Let's start with common form input components that we'll use throughout our forms.

### Custom Input Component

```typescript
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CustomInputProps {
  field: string;
  label: string;
  value: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  field,
  label,
  value,
  placeholder,
  secureTextEntry,
  onChangeText,
  onBlur,
  error,
  touched,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          touched && error && styles.inputError
        ]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {touched && error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
  },
});
```

## Registration Form Example

Let's create a complete registration form with validation.

```typescript
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CustomInput } from './CustomInput';
import { CustomButton } from './CustomButton';

// Validation schema
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      // API call to register user
      console.log('Form submitted:', values);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View style={styles.form}>
            <CustomInput
              field="fullName"
              label="Full Name"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              error={errors.fullName}
              touched={touched.fullName}
              placeholder="Enter your full name"
            />

            <CustomInput
              field="email"
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              placeholder="Enter your email"
              keyboardType="email-address"
            />

            <CustomInput
              field="password"
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
              touched={touched.password}
              placeholder="Create a password"
              secureTextEntry
            />

            <CustomInput
              field="confirmPassword"
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
            />

            <CustomButton
              onPress={handleSubmit}
              title="Register"
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  form: {
    padding: 20,
  },
});
```

## Login Form with API Integration

Here's an example of a login form with API integration and error handling.

```typescript
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setApiError(null);
      await login(values.email, values.password);
      // Navigation will be handled by auth state change
    } catch (error) {
      setApiError(
        error.message || 'An error occurred during login'
      );
      Alert.alert('Login Failed', apiError);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {/* Form fields similar to registration form */}
      </Formik>
    </View>
  );
};
```

## Advanced Form Features

### Real-time Validation

```typescript
const LiveValidationInput: React.FC = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateInput = useCallback(
    debounce(async (text: string) => {
      try {
        await schema.validate(text);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    }, 500),
    []
  );

  const handleChangeText = (text: string) => {
    setValue(text);
    validateInput(text);
  };

  return (
    <CustomInput
      value={value}
      onChangeText={handleChangeText}
      error={error}
    />
  );
};
```

### Form Array Fields

```typescript
interface Address {
  street: string;
  city: string;
  zipCode: string;
}

const AddressForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        addresses: [{ street: '', city: '', zipCode: '' }],
      }}
      onSubmit={values => console.log(values)}
    >
      {({ values, handleChange, handleBlur }) => (
        <FieldArray
          name="addresses"
          render={arrayHelpers => (
            <>
              {values.addresses.map((address, index) => (
                <View key={index}>
                  <CustomInput
                    field={`addresses.${index}.street`}
                    label="Street"
                    value={address.street}
                    onChangeText={handleChange(`addresses.${index}.street`)}
                    onBlur={handleBlur(`addresses.${index}.street`)}
                  />
                  {/* Other address fields */}
                  <Button
                    title="Remove"
                    onPress={() => arrayHelpers.remove(index)}
                  />
                </View>
              ))}
              <Button
                title="Add Address"
                onPress={() => arrayHelpers.push({ 
                  street: '', 
                  city: '', 
                  zipCode: '' 
                })}
              />
            </>
          )}
        />
      )}
    </Formik>
  );
};
```

## Form Submission and Error Handling

### API Integration Pattern

```typescript
interface SubmitResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const submitForm = async (values: FormValues): Promise<SubmitResponse> => {
  try {
    const response = await fetch('api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Submission failed');
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
```

### Error Boundary for Forms

```typescript
class FormErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Form error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Something went wrong. Please try again.
          </Text>
          <Button
            title="Reset Form"
            onPress={() => this.setState({ hasError: false })}
          />
        </View>
      );
    }

    return this.props.children;
  }
}
```

## Best Practices

1. **Performance Optimization**
```typescript
// Use memo for form components
const MemoizedInput = React.memo(CustomInput);

// Use callbacks for event handlers
const handleChange = useCallback((field: string) => (
  text: string
) => {
  setFieldValue(field, text);
}, [setFieldValue]);
```

2. **Form State Management**
```typescript
// Custom hook for form state
const useFormState = <T extends object>(
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (field: keyof T) => (value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof T) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  };
};
```

3. **Accessibility**
```typescript
const AccessibleInput: React.FC<CustomInputProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <View>
      <TextInput
        {...props}
        accessibilityLabel={label}
        accessibilityHint={error}
        accessibilityRole="text"
      />
    </View>
  );
};
```

## Next Steps

Now that you understand form handling in React Native, you can:
- Build complex forms with validation
- Handle user input effectively
- Implement form submission with proper error handling
- Create reusable form components
- Optimize form performance

In the next chapter, we'll explore data management and state handling in React Native applications.

## Additional Resources

- [Formik Documentation](https://formik.org/docs/overview)
- [Yup Documentation](https://github.com/jquense/yup)
- [React Native TextInput](https://reactnative.dev/docs/textinput)
- [Form Validation Patterns](https://reactnative.dev/docs/handling-text-input) 