# std/path

The `std/path` module provides cross-platform utilities for manipulating file system paths. It simplifies common tasks like joining paths, extracting extensions, and finding parent directories.

## Overview

- **Cross-platform**: Handles both forward and backward slashes appropriately during manipulation.
- **Type-safe**: The `Path` struct encapsulates path information, distinguishing it from regular strings.
- **Convenient Parsing**: Easily extract components like `extension`, `file_name`, and `parent`.
- **RAII**: Memory is automatically managed via the `Drop` trait.

## Usage

```zc
import "std/path.zc"

fn main() {
    let p = Path::new("/home/user");
    let full_path = p.join("docs/file.txt");
    
    println "Full path: {full_path.c_str()}";
    
    match full_path.extension() {
        Some(ext) => { println "Extension: {ext}"; },
        None => { println "No extension found"; }
    }
} // full_path and p are freed automatically here
```

## Struct Definition

```zc
struct Path {
    str: String;
}
```

## Methods

### Construction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `Path::new(s: char*) -> Path` | Creates a new `Path` from a C string. |
| **from_string** | `Path::from_string(s: String) -> Path` | Creates a `Path` by taking ownership of a `String`. |
| **clone** | `clone(self) -> Path` | Returns a deep copy of the `Path`. |

### Manipulation

| Method | Signature | Description |
| :--- | :--- | :--- |
| **join** | `join(self, other: char*) -> Path` | Appends `other` to the path using the correct directory separator. |

### Parsing

| Method | Signature | Description |
| :--- | :--- | :--- |
| **extension** | `extension(self) -> Option<String>` | Returns the file extension (without the leading dot), if any. |
| **file_name** | `file_name(self) -> Option<String>` | Returns the final component of the path. |
| **parent** | `parent(self) -> Option<Path>` | Returns the parent directory path. |

### Access

| Method | Signature | Description |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | Returns the underlying C string representation. |

## Memory Management

| Method | Signature | Description |
| :--- | :--- | :--- |
| **free** | `free(self)` | Manually frees the path's internal string memory. |
| **Trait** | `impl Drop for Path` | Automatically calls `free()` when out of scope. |
