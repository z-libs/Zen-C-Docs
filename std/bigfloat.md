# std/bigfloat

`BigFloat` provides arbitrary-precision decimal floating-point arithmetic for Zen-C. It is implemented as a scaled `BigInt`, allowing for high-precision calculations without binary rounding errors.

## Overview

- **Arbitrary Precision**: Supports decimal numbers of any size, limited only by memory.
- **Scaled Representation**: Uses a `BigInt` magnitude and an integer `scale` to represent decimal values.
- **Precision Control**: Easily align scales for precise addition and subtraction.
- **RAII**: Memory for the underlying magnitude is automatically managed via the `Drop` trait.

## Usage

```zc
import "std/bigfloat.zc"

fn main() {
    let a = BigFloat::from_int(123);
    a.scale = 2; // Represents 1.23
    
    let b = BigFloat::from_int(4567);
    b.scale = 3; // Represents 4.567
    
    let sum = a.add(b);
    
    let s = sum.to_string();
    println "Sum: {s}"; // Sum: 5.797
    free(s);
} // a, b, and sum are freed automatically here
```

## Struct Definition

```zc
struct BigFloat {
    magnitude: BigInt;
    scale: int;
}
```

## Methods

### Construction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `BigFloat::new() -> BigFloat` | Creates a new `BigFloat` initialized to 0.0. |
| **from_int** | `BigFloat::from_int(val: u64) -> BigFloat` | Creates a `BigFloat` from an integer with scale 0. |
| **from_bigint** | `BigFloat::from_bigint(val: BigInt, scale: int) -> BigFloat` | Creates a `BigFloat` from a `BigInt` magnitude and a scale. |
| **from_string** | `BigFloat::from_string(s: char*) -> Result<BigFloat>` | Parses a decimal string such as `"12.5"` into a `BigFloat`. |

### Arithmetic

| Method | Signature | Description |
| :--- | :--- | :--- |
| **add** | `add(self, other: BigFloat) -> BigFloat` | Adds two `BigFloat` values, automatically aligning their scales. Returns a new `BigFloat`. |
| **sub** | `sub(self, other: BigFloat*) -> BigFloat` | Subtracts `other` from `self`. Panics if the result would be negative. |
| **mul** | `mul(self, other: BigFloat*) -> BigFloat` | Returns the product of two `BigFloat` values. |
| **div** | `div(self, other: BigFloat*, precision: int) -> BigFloat` | Divides `self` by `other`, producing `precision` fractional digits. |

### Modification

| Method | Signature | Description |
| :--- | :--- | :--- |
| **align_scale** | `align_scale(self, target_scale: int)` | Increases the scale of the `BigFloat` to `target_scale` by shifting the magnitude. |

### Utility

| Method | Signature | Description |
| :--- | :--- | :--- |
| **clone** | `clone(self) -> BigFloat` | Returns a deep copy of the `BigFloat`. |
| **compare** | `compare(self, other: BigFloat*) -> int` | Returns `-1`, `0`, or `1` when `self` is less than, equal to, or greater than `other`. |
| **to_string** | `to_string(self) -> char*` | Returns a heap-allocated string representation with the decimal point. |

## Memory Management

| Method | Signature | Description |
| :--- | :--- | :--- |
| **free_mem** | `free_mem(self)` | Manually frees the underlying `BigInt` memory. |
| **Trait** | `impl Drop for BigFloat` | Automatically calls `free_mem()` when out of scope. |
