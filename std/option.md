# std/option

`Option<T>` represents an optional value: every `Option` is either `Some` and contains a value, or `None`. It is commonly used to handle the absence of a value without resorting to null pointers.

## Overview

- **Safe**: Encourages explicit handling of the `None` case.
- **Generic**: Can wrap any type `T`.
- **Zero-cost**: Compiles down to a simple struct with a boolean flag.
- **Convenient**: Provides many utility methods for unwrapping and transforming values.

## Usage

```zc
import "std/option.zc"

fn main() {
    let val = Option<int>::Some(10);
    
    if (val.is_some()) {
        println "Value is {val.unwrap()}";
    }
    
    let empty = Option<int>::None();
    let x = empty.unwrap_or(0);
}
```

## Struct Definition

```zc
struct Option<T> {
    is_some: bool;
    val: T;
}
```

## Methods

### Construction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **Some** | `Option<T>::Some(v: T) -> Option<T>` | Creates a `Some` option containing `v`. |
| **None** | `Option<T>::None() -> Option<T>` | Creates a `None` option. |

### Query

| Method | Signature | Description |
| :--- | :--- | :--- |
| **is_some** | `is_some(self) -> bool` | Returns `true` if the option is `Some`. |
| **is_none** | `is_none(self) -> bool` | Returns `true` if the option is `None`. |
| **is_some_and** | `is_some_and(self, f: fn(T) -> bool) -> bool` | Returns `true` when `Some` and `f` accepts the contained value. |
| **is_none_or** | `is_none_or(self, f: fn(T) -> bool) -> bool` | Returns `true` when `None`, or when `Some` and `f` accepts the value. |

### Extraction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **unwrap** | `unwrap(self) -> T` | Returns the contained value. Panics if `None`. |
| **unwrap_ref** | `unwrap_ref(self) -> T*` | Returns a pointer to the contained value. Panics if `None`. |
| **unwrap_or** | `unwrap_or(self, def: T) -> T` | Returns the contained value or `def`. |
| **unwrap_or_else** | `unwrap_or_else(self, f: fn() -> T) -> T` | Returns the contained value or the result of `f` when `None`. |
| **expect** | `expect(self, msg: char*) -> T` | Returns the value or panics with `msg`. |
| **or_else** | `or_else(self, other: Option<T>) -> Option<T>` | Returns the option if `Some`, otherwise returns `other`. |

### Conversion

| Method | Signature | Description |
| :--- | :--- | :--- |
| **filter** | `filter(self, f: fn(T) -> bool) -> Option<T>` | Keeps the value when `Some` and `f` accepts it, otherwise `None`. |

## Memory Management

| Method | Signature | Description |
| :--- | :--- | :--- |
| **forget** | `forget(self)` | Zeroes out the internal value without calling destructors or freeing memory. |
