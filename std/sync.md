# std/sync

The `std/sync` module provides a comprehensive suite of synchronization primitives for managing concurrent access to shared data and coordinating thread execution.

## Overview

- **Standard Primitives**: Includes `Mutex`, `CondVar`, `RwLock`, `Once`, `Semaphore`, and `Barrier`.
- **RAII Integration**: All primitives implement the `Drop` trait, ensuring that system resources (like pthread handles) are released automatically.
- **Cross-platform**: Safely abstracts platform-specific quirks (e.g., implementing `Barrier` and `Semaphore` via mutexes/condvars on macOS).
- **Efficiency**: Thin wrappers around optimized system-level synchronization libraries.

## Usage

```zc
import "std/sync.zc"

fn main() {
    let m = Mutex::new();
    
    // Scoped lock (RAII)
    {
        m.lock();
        // Critical section
        m.unlock();
    } // m is freed automatically if it was the last owner
    
    // One-time initialization
    let once = Once::new();
    once.call(fn() {
        println "Initialized!";
    });
}
```

## Struct Definitions

### `Mutex`
A mutual exclusion lock for protecting shared data.

### `CondVar`
A condition variable for signaling between threads based on state changes.

### `RwLock`
A reader-writer lock that allows multiple concurrent readers but only one writer.

### `Once`
Ensures that a specific piece of initialization code is executed exactly once.

### `Semaphore`
A counting semaphore for controlling access to a pool of resources.

### `Barrier`
A synchronization point where multiple threads must wait until a specific number have arrived.

## Methods

### `Mutex` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `Mutex::new() -> Mutex` | Creates a new mutex. |
| **lock** | `lock(self)` | Acquires the lock (blocking). |
| **try_lock** | `try_lock(self) -> bool` | Attempts to acquire the lock without blocking. |
| **unlock** | `unlock(self)` | Releases the lock. |

### `CondVar` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `CondVar::new() -> CondVar` | Creates a new condition variable. |
| **wait** | `wait(self, mutex: Mutex*)` | Blocks the thread until signaled, releasing the mutex temporarily. |
| **signal** | `signal(self)` | Wakes up one thread waiting on this condition. |
| **broadcast**| `broadcast(self)` | Wakes up all threads waiting on this condition. |

### `RwLock` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `RwLock::new() -> RwLock` | Creates a new reader-writer lock. |
| **rdlock** | `rdlock(self)` | Acquires a shared read lock. |
| **wrlock** | `wrlock(self)` | Acquires an exclusive write lock. |
| **unlock** | `unlock(self)` | Releases any lock held. |

### `Semaphore` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `Semaphore::new(value: int) -> Semaphore` | Creates a new semaphore with initial `value`. |
| **wait** | `wait(self)` | Decrements the semaphore (blocking if 0). |
| **post** | `post(self)` | Increments the semaphore. |
| **value** | `value(self) -> int` | Returns the current value. |

### `Barrier` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `Barrier::new(count: int) -> Barrier` | Creates a new barrier for `count` threads. |
| **wait** | `wait(self) -> bool` | Waits at the barrier. Returns `true` for the designated leader. |

## Memory Management

All primitives implement `impl Drop` and will automatically call their internal `free()` method to release system resources when they go out of scope.
