# std/result

`Result<T>` is the standard type for error handling in Zen-C. It represents either success (`Ok`) containing a value of type `T`, or failure (`Err`) containing a string error message.

## Overview

- **Safe**: Forces explicit handling of success and failure paths.
- **Informative**: `Err` cases carry a descriptive error message.
- **Generic**: Supports any success value type `T`.
- **Integrated**: Works seamlessly with `Result`-based macros and patterns for concise error propagation.

## Usage

```zc
import "std/result.zc"

fn divide(a: int, b: int) -> Result<int> {
    if (b == 0) {
        return Result<int>::Err("Division by zero");
    }
    return Result<int>::Ok(a / b);
}

fn main() {
    match divide(10, 0) {
        Ok(val) => println "Result: {val}",
        Err(e)  => println "Error: {e}"
    }
}
```

## Struct Definition

```zc
struct Result<T> {
    is_ok: bool;
    val: T;
    err: char*;
}
```

## Methods

### Construction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **Ok** | `Result<T>::Ok(v: T) -> Result<T>` | Creates a success result containing `v`. |
| **Err** | `Result<T>::Err(e: char*) -> Result<T>` | Creates an error result with message `e`. |

### Query

| Method | Signature | Description |
| :--- | :--- | :--- |
| **is_ok** | `is_ok(self) -> bool` | Returns `true` if the result is `Ok`. |
| **is_err** | `is_err(self) -> bool` | Returns `true` if the result is `Err`. |
| **is_ok_and** | `is_ok_and(self, f: fn(T) -> bool) -> bool` | Returns `true` when `Ok` and `f` accepts the contained value. |
| **is_err_and** | `is_err_and(self, f: fn(char*) -> bool) -> bool` | Returns `true` when `Err` and `f` accepts the error message. |

### Extraction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **unwrap** | `unwrap(self) -> T` | Returns the ok value. Panics with the error message if `Err`. |
| **unwrap_ref** | `unwrap_ref(self) -> T*` | Returns a pointer to the ok value. Panics if `Err`. |
| **expect** | `expect(self, msg: char*) -> T` | Returns the value or panics with `msg` and the error message if `Err`. |
| **unwrap_or** | `unwrap_or(self, def: T) -> T` | Returns the ok value or `def` when `Err`. |
| **unwrap_or_else** | `unwrap_or_else(self, f: fn() -> T) -> T` | Returns the ok value or the result of `f` when `Err`. |
| **expect_err** | `expect_err(self, msg: char*) -> char*` | Returns the error message, or panics with `msg` when `Ok`. |

### Conversion

| Method | Signature | Description |
| :--- | :--- | :--- |
| **ok** | `ok(self) -> Option<T>` | Converts to an `Option`, mapping `Ok` to `Some` and discarding the error. |
| **err** | `err(self) -> Option<char*>` | Converts to an `Option` holding the error message, when `Err`. |
| **map_err** | `map_err(self, f: fn(char*) -> char*) -> Result<T>` | Applies `f` to the error message, leaving the value untouched. |

## Memory Management

| Method | Signature | Description |
| :--- | :--- | :--- |
| **forget** | `forget(self)` | Zeroes out the ok value without calling destructors or freeing memory. |
