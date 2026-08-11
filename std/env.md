# std/env

The `std/env` module provides cross-platform access to process environment variables.

## Overview

- **Key-Value Access**: Simple API for getting, setting, and unsetting environment variables.
- **Borrowed or Owned**: Choose between `get` (returns a borrowed C string) and `get_dup` (returns an owned, heap-allocated `String`).
- **Cross-platform**: Safely abstracts underlying system calls for environment manipulation.

## Usage

```zc
import "std/env.zc"

fn main() {
    // Setting an environment variable
    Env::set("MY_APP_MODE", "development");

    // Retrieving (Borrowed)
    match Env::get("MY_APP_MODE") {
        Some(val) => { println "Mode: {val}"; },
        None => { println "Mode not set"; }
    }

    // Retrieving (Owned String for RAII)
    match Env::get_dup("HOME") {
        Some(home) => {
             println "Home: {home}";
             // home is freed automatically
        }
        None => { println "HOME not found"; }
    }
}
```

## Enum Definition

```zc
enum EnvRes {
    OK,
    ERR,
}
```

## Methods

### Access & Query

| Method | Signature | Description |
| :--- | :--- | :--- |
| **get** | `Env::get(name: char*) -> Option<char*>` | Retrieves a borrowed pointer to an environment variable. Do not free. |
| **get_dup** | `Env::get_dup(name: char*) -> Option<String>` | Retrieves an environment variable as a new `String` object. |

### Modification

| Method | Signature | Description |
| :--- | :--- | :--- |
| **set** | `Env::set(name: char*, value: char*) -> EnvRes` | Sets or updates an environment variable. |
| **unset** | `Env::unset(name: char*) -> EnvRes` | Removes an environment variable from the current process. |
