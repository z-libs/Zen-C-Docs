# std/vec

`Vec<T>` is a contiguous, growable array type. It is the standard dynamic array used in Zen-C.

## Overview

- **Generic**: Works with any type `T`.
- **Dynamic**: Automatically resizes as elements are added.
- **Safe**: Bounds checks on access (panics on failure).
- **RAII**: Automatically frees memory when it goes out of scope (implements `Drop`).

## Usage

```zc
import "std/vec.zc"

fn main() {
    let v = Vec<int>::new();
    v.push(10);
    v.push(20);
    
    // Iteration
    for x in &v {
        println "{(*x)}";
    }
} // v is freed automatically here
```

## Struct Definition

```zc
struct Vec<T> {
    data: T*;
    len: usize;
    cap: usize;
}
```

## Methods

### Construction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `Vec<T>::new() -> Vec<T>` | Creates a new, empty vector. Does not allocate memory until the first push. |
| **with_capacity** | `Vec<T>::with_capacity(cap: usize) -> Vec<T>` | Creates a new vector with an initial capacity of `cap`. Useful for optimization if you know the number of elements in advance. |

### Modification

| Method | Signature | Description |
| :--- | :--- | :--- |
| **push** | `push(self, item: T)` | Appends an element to the back. Panics if allocation fails. |
| **pop** | `pop(self) -> T` | Removes the last element and returns it. Panics if empty. |
| **pop_opt** | `pop_opt(self) -> Option<T>` | Removes the last element and returns `Some(val)`. Returns `None` if empty. Safe usage. |
| **insert** | `insert(self, idx: usize, item: T)` | Inserts an element at `idx`. Shifts elements right. Panics if `idx > len`. |
| **remove** | `remove(self, idx: usize) -> T` | Removes and returns the element at `idx`. Shifts elements left. Panics if `idx >= len`. |
| **append** | `append(self, other: Vec<T>)` | Appends all elements from `other` to `self`. Consumes `other` (move semantics). |
| **clear** | `clear(self)` | Removes all values. Has no effect on allocated capacity. |
| **reverse** | `reverse(self)` | Reverses the order of elements in place. |

### Access

| Method | Signature | Description |
| :--- | :--- | :--- |
| **get** | `get(self, idx: usize) -> T` | Returns a copy of the element at `idx`. Panics if out of bounds. |
| **get_ref** | `get_ref(self, idx: usize) -> T*` | Returns a pointer to the element at `idx`. Panics if out of bounds. Useful for avoiding copies. |
| **set** | `set(self, idx: usize, item: T)` | Overwrites the element at `idx`. Panics if out of bounds. |
| **first** | `first(self) -> T` | Returns a copy of the first element. Panics if empty. |
| **last** | `last(self) -> T` | Returns a copy of the last element. Panics if empty. |

### Utility

| Method | Signature | Description |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Returns the number of elements. |
| **is_empty** | `is_empty(self) -> bool` | Returns `true` if the vector contains no elements. |
| **contains** | `contains(self, item: T) -> bool` | Returns `true` if vector contains an element equal to `item` (byte-wise). |
| **clone** | `clone(self) -> Vec<T>` | Returns a new vector with a deep copy of the data. |
| **eq** | `eq(self, other: Vec<T>*) -> bool` | Returns `true` if two vectors are equal byte-wise. Takes a pointer to avoid moving `other`. |

### Operators

Zen-C supports operator overloading. `Vec<T>` implements the following:

| Operator | Method | Description |
| :--- | :--- | :--- |
| `+` | **add** | `v1 + &v2`. Returns a new vector (concatenation). |
| `+=` | **add_assign** | `v1 += &v2`. Appends `v2` to `v1`. |
| `==` | **eq** | `v1 == &v2`. Structural equality check. |
| `!=` | **neq** | `v1 != &v2`. Structural inequality check. |
| `<<` | **shl** | `v << item`. Pushes `item` to the back. |
| `>>` | **shr** | `v >> &item`. Pops the last element into `item`. |
| `*` | **mul** | `v * n`. Returns a new vector with elements repeated `n` times. |
| `*=` | **mul_assign** | `v *= n`. Repeats elements in-place `n` times. |
| `[]` | **get** / **set** | `v[i]` and `v[i] = x`. Standard indexing. |

### Iteration

| Method | Signature | Description |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> VecIter<T>` | Returns an iterator yielding copies. Used by `for x in v`. |
| **iter_ref** | `iter_ref(self) -> VecIterRef<T>` | Returns an iterator yielding pointers. Used by `for x in &v` (sugar) or `for x in v.iter_ref()`. Allows in-place mod. |

### Iterator Combinators

The `VecIter<T>` returned by `iterator()` drains the vector as it is consumed. The methods below operate on the remaining items.

| Method | Signature | Description |
| :--- | :--- | :--- |
| **next** | `next(self) -> Option<T>` | Yields the next item, or `None` when exhausted. |
| **count** | `count(self) -> usize` | Number of items still to be yielded. |
| **collect** | `collect(self) -> Vec<T>` | Drains the remaining items into a new `Vec`. |
| **forEach** | `forEach(self, f: fn(T))` | Calls `f` for each remaining item. |
| **find** | `find(self, pred: fn(T) -> bool) -> Option<T>` | Returns the first item accepted by `pred`. |
| **any** | `any(self, pred: fn(T) -> bool) -> bool` | Returns `true` when `pred` accepts at least one remaining item. |
| **all** | `all(self, pred: fn(T) -> bool) -> bool` | Returns `true` when `pred` accepts every remaining item. |
| **filter** | `filter(self, pred: fn(T) -> bool) -> Vec<T>` | Collects the remaining items accepted by `pred` into a new `Vec`. |
| **fold** | `fold(self, init: T, f: fn(T, T) -> T) -> T` | Reduces the remaining items with `f` starting from `init`. |

`VecIterRef<T>` also provides `next`, `count`, and `find` (yielding item pointers via `VecIterResult<T>`).

## Memory Management

| Method | Signature | Description |
| :--- | :--- | :--- |
| **Free** | `free(self)` | Manually frees memory. Safe to call multiple times. |
| **Forget** | `forget(self)` | Detaches the memory buffer from the vector (sets fields to 0). Prevents `Drop` from freeing memory. Useful for implementing move semantics or transferring ownership. |
| **Trait** | `impl Drop for Vec` | Automatically calls `free()` when `Vec` goes out of scope. |
