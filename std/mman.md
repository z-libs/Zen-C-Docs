# std/sys/mman

The `std/sys/mman` module provides a Zen-C interface for memory mapping and protection functions, wrapping POSIX `sys/mman.h`.

## Overview

- **Memory Mapping**: Map files or anonymous memory into the process address space.
- **Protection Control**: Dynamically change memory region permissions (Read, Write, Execute).
- **Anonymous Memory**: Allocate large blocks of memory directly from the OS without a file.

## Usage

```zc
import "std/sys/mman.zc"
import "std/io.zc"

fn main() {
    let size: usize = 4096;
    let prot = Z_PROT_READ | Z_PROT_WRITE;
    let flags = Z_MAP_PRIVATE | Z_MAP_ANONYMOUS;
    
    let addr = Memory::mmap(size, prot, flags);
    if ((isize)addr == Z_MAP_FAILED) {
        println "Mapping failed";
        return 0;
    }
    
    // Use memory...
    
    Memory::munmap(addr, size);
}
```

## Struct Definition

```zc
struct Memory {}
```

## Methods

### `Memory` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **mmap** | `Memory::mmap(len: usize, prot: int, flags: int) -> void*` | Creates a new mapping in the virtual address space of the calling process. |
| **munmap** | `Memory::munmap(addr: void*, len: usize) -> bool` | Deletes the mappings for the specified address range. Returns `true` on success. |
| **mprotect** | `Memory::mprotect(addr: void*, len: usize, prot: int) -> bool` | Changes the access protections for the calling process's memory pages. Returns `true` on success. |

## Constants

### Protection Flags
- `Z_PROT_NONE`: Page cannot be accessed.
- `Z_PROT_READ`: Page can be read.
- `Z_PROT_WRITE`: Page can be written.
- `Z_PROT_EXEC`: Page can be executed.

### Visibility Flags
- `Z_MAP_SHARED`: Share this mapping.
- `Z_MAP_PRIVATE`: Create a private copy-on-write mapping.
- `Z_MAP_ANONYMOUS`: The mapping is not backed by any file.

### Error Values
- `Z_MAP_FAILED`: Returned by `mmap` on error.
