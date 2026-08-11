# std/fs

The `std/fs` module provides a comprehensive API for interacting with the file system, including file I/O, directory manipulation, and metadata retrieval.

## Overview

- **Safe Handles**: The `File` struct provides a safe wrapper around raw file handles.
- **RAII**: File handles are automatically closed when they go out of scope via the `Drop` trait.
- **Error Handling**: Uses `Result<T>` for all operations that can fail, providing descriptive error messages.
- **Convenience**: Includes static methods for common tasks like reading or writing an entire file in one call.

## Usage

```zc
import "std/fs.zc"

fn main() {
    // Basic file reading using RAII
    match File::read_all("config.txt") {
        Ok(content) => { println "Config: {content}"; },
        Err(e) => { println "Error reading config: {e}"; }
    }
    
    // Explicit file handle with automatic closure
    let res = File::open("data.log", "a");
    if (res.is_ok()) {
        let file = res.unwrap();
        file.write_string("Log entry\n");
        // file is closed automatically here
    }
}
```

## Struct Definitions

### `File`
Represents an open file handle.
```zc
struct File {
    handle: void*;
}
```

### `Metadata`
File or directory metadata.
```zc
struct Metadata {
    size: U64;
    is_dir: bool;
    is_file: bool;
}
```

### `DirEntry`
Represents an entry in a directory.
```zc
struct DirEntry {
    name: String;
    is_dir: bool;
}
```

## Methods

### Open / Close

| Method | Signature | Description |
| :--- | :--- | :--- |
| **open** | `File::open(path: char*, mode: char*) -> Result<File>` | Opens a file at `path` with `mode`. |
| **close** | `close(self)` | Explicitly closes the file handle. |

### Read / Write

| Method | Signature | Description |
| :--- | :--- | :--- |
| **read_to_string** | `read_to_string(self) -> Result<String>` | Reads the entire file into a `String`. |
| **read_all** | `File::read_all(path: char*) -> Result<String>` | Static utility to read a file completely. |
| **read_lines** | `File::read_lines(path: char*) -> Result<Vec<String>>` | Static utility to read a file into a vector of lines. |
| **write_string** | `write_string(self, content: char*) -> Result<bool>` | Writes a string to the file. |
| **write_lines** | `File::write_lines(path: char*, lines: Vec<String>*) -> Result<bool>` | Static utility to write a vector of lines to a file. |

### Path Utilities

| Method | Signature | Description |
| :--- | :--- | :--- |
| **exists** | `File::exists(path: char*) -> bool` | Returns true if the path exists. |
| **current_dir** | `File::current_dir() -> Result<String>` | Returns the absolute path of the current working directory. |
| **metadata** | `File::metadata(path: char*) -> Result<Metadata>` | Retrieves metadata for the specified path. |

### File & Directory Ops

| Method | Signature | Description |
| :--- | :--- | :--- |
| **create_dir** | `File::create_dir(path: char*) -> Result<bool>` | Creates a new directory. |
| **remove_file** | `File::remove_file(path: char*) -> Result<bool>` | Deletes the specified file. |
| **remove_dir** | `File::remove_dir(path: char*) -> Result<bool>` | Deletes the specified directory (must be empty). |
| **read_dir** | `File::read_dir(path: char*) -> Result<Vec<DirEntry>>` | Returns a list of entries in a directory. |

## Memory Management

| Method | Signature | Description |
| :--- | :--- | :--- |
| **Trait** | `impl Drop for File` | Automatically closes the file handle when out of scope. |
