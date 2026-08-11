# std/thread

The `std/thread` module provides high-level primitives for creating and managing concurrent threads of execution.

## Overview

- **Native Threads**: Uses underlying system-level threading (e.g., POSIX threads).
- **Closure Support**: `Thread::spawn` can take Zen-C closures, allowing for easy data sharing between threads.
- **Explicit Lifecycle**: Threads must be explicitly joined or detached to ensure proper resource cleanup.
- **Safety**: Errors during thread creation or manipulation are reported via `Result<bool>`.

## Usage

```zc
import "std/thread.zc"

fn worker(id: int) {
    println "Hello from worker {id}";
}

fn main() {
    // Spawning with a closure
    let t = Thread::spawn(fn() {
        worker(42);
    }).unwrap();
    
    // Explicitly waiting for completion
    t.join();
}
```

## Struct Definitions

### `Thread`
Represents a handle to a spawned thread.
```zc
struct Thread {
    handle: void*;
}
```

## Methods

### `Thread` Lifecycle

| Method | Signature | Description |
| :--- | :--- | :--- |
| **spawn** | `Thread::spawn(func: fn()) -> Result<Thread>` | Spawns a new thread executing the provided closure or function. |
| **join** | `join(self) -> Result<bool>` | Blocks the current thread until the spawned thread terminates. |
| **detach** | `detach(self) -> Result<bool>` | Detaches the thread, allowing it to run independently. Resources are freed automatically on exit. |
| **cancel** | `cancel(self) -> Result<bool>` | Sends a cancellation request to the thread. |

### Utility Functions

| Function | Signature | Description |
| :--- | :--- | :--- |
| **sleep_ms** | `sleep_ms(ms: int)` | Suspends execution of the current thread for approximately `ms` milliseconds. |
