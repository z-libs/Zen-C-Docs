+++
title = "16. Diagnostic System"
weight = 16
+++

# 16. Diagnostic System {#16-diagnostic-system}
<!-- zc-check: skip-file: this chapter's code blocks are intentional error/warning demos -->


Zen C provides a categorized diagnostic system that allows for granular control over compiler warnings. This helps maintain high code quality standards while reducing friction when interacting with external C code.

#### Diagnostic Categories

Warnings are grouped into logical categories. Each category can be enabled or disabled globally using compiler flags.

| Category | Description | Default |
| :--- | :--- | :--- |
| **`INTEROP`** | Warnings related to C header imports and undefined extern functions. | **OFF** |
| **`PEDANTIC`** | Extra strict checks for potential issues or code quality. | **OFF** |
| **`UNUSED`** | Warnings for defined but unused variables, parameters, or functions. | **ON** |
| **`SAFETY`** | Critical safety warnings like null pointer access or division by zero. | **ON** |
| **`LOGIC`** | Logic-related warnings like unreachable code or constant comparisons. | **ON** |
| **`CONVERSION`** | Warnings for implicit or narrowing type conversions. | **ON** |
| **`STYLE`** | Coding style warnings like variable shadowing. | **ON** |

#### Compiler Flags

You can control diagnostics using the `-W` (enable) and `-Wno-` (disable) flags followed by a category name or specific diagnostic ID.

##### Category Flags

- `-Winterop`: Enables all interoperability-related warnings.
- `-Wno-unused`: Specifically silences unused variable/parameter warnings.
- `-Wsafety`: Ensures all safety checks are active.
- `-Wall`: Enables all major diagnostic categories.
- `-Wextra`: Enables even stricter diagnostics (equivalent to `-Wpedantic`).

##### Usage Example

```bash
# Compile with C interop warnings enabled
zc app.zc -Winterop

# Compile with all warnings enabled except for unused code
zc app.zc -Wall -Wno-unused
```

#### C Interop Friction

By default, Zen C suppresses "Undefined function" warnings for functions that likely belong to C standard libraries (`INTEROP` category is **OFF**).

If you want the compiler to strictly flag every undefined function (e.g., to catch typos), enable the interop category:

```bash
zc main.zc -Winterop
```

When enabled, the compiler will provide helpful suggestions for common C functions:
```
warning: Undefined function 'abs'
  --> main.zc:5:13
   |
5  |     let x = abs(-5);
   |             ^ here
   |
   = note: If this is a C function, it might need to be whitelisted in 'zenc.json'
```

#### Whitelisting

If you frequently use a specific C library and want to keep `-Winterop` enabled without being nagged by specific functions, you can add them to the `c_function_whitelist` in the `zenc.json` config file.

## Compiler Support & Compatibility

Zen C is designed to work with most C11 compilers. Some features rely on GNU C extensions, but these often work in other compilers. Use the `--cc` flag to switch backends.

```bash
zc run app.zc --cc clang
zc run app.zc --cc zig
```

### Test Suite Status

<details>
<summary>Click to view Compiler Support details</summary>

| Compiler | Pass Rate | Supported Features | Known Limitations |
|:---|:---:|:---|:---|
| **GCC** | **100% (Full)** | All Features | None. |
| **Clang** | **100% (Full)** | All Features | None. |
| **Zig** | **100% (Full)** | All Features | None. Uses `zig cc` as a drop-in C compiler. |
| **TCC** | **98% (High)** | Structs, Generics, Traits, Pattern Matching | No Intel ASM, No `__attribute__((constructor))`. |

</details>

{% alert(type="warning") %}
**COMPILER BUILD WARNING:** While **Zig CC** works excellently as a backend for your Zen C programs, building the *Zen C compiler itself* with it may verify but produce an unstable binary that fails tests. We recommend building the compiler with **GCC** or **Clang** and using Zig only as a backend for your operational code.
{% end %}

### Building with Zig

Zig's `zig cc` command provides a drop-in replacement for GCC/Clang with excellent cross-compilation support. To use Zig:

```bash
# Compile and run a Zen C program with Zig
zc run app.zc --cc zig

# Build the Zen C compiler itself with Zig
make zig
```

### C++ Interop

Zen C can generate C++-compatible code with the `--cpp` flag, allowing seamless integration with C++ libraries.

```bash
# Direct compilation with g++
zc app.zc --cpp

# Or transpile for manual build
zc transpile app.zc --cpp
g++ out.c my_cpp_lib.o -o app
```

#### Using C++ in Zen C

Include C++ headers and use raw blocks for C++ code:

```zc
include <vector>
include <iostream>

raw {
    std::vector<int> make_vec(int a, int b) {
        return {a, b};
    }
}

fn main() {
    let v = make_vec(1, 2);
    raw { std::cout << "Size: " << v.size() << std::endl; }
}
```

{% alert(type="note") %}
The `--cpp` flag switches the backend to `g++` and emits C++-compatible code (uses `auto` instead of `__auto_type`, function overloads instead of `_Generic`, and explicit casts for `void*`).
{% end %}

#### CUDA Interop

Zen C supports GPU programming by transpiling to **CUDA C++**. This allows you to leverage powerful C++ features (templates, constexpr) within your kernels while maintaining Zen C's ergonomic syntax.

```bash
# Direct compilation with nvcc
zc run app.zc --cuda

# Or transpile for manual build
zc transpile app.zc --cuda -o app.cu
nvcc app.cu -o app
```

#### CUDA-Specific Attributes

| Attribute | CUDA Equivalent | Description |
|:---|:---|:---|
| `@global` | `__global__` | Kernel function (runs on GPU, called from host) |
| `@device` | `__device__` | Device function (runs on GPU, called from GPU) |
| `@host` | `__host__` | Host function (explicit CPU-only) |

#### Kernel Launch Syntax

Zen C provides a clean `launch` statement for invoking CUDA kernels:

```zc
launch kernel_name(args) with {
    grid: num_blocks,
    block: threads_per_block,
    shared_mem: 1024,  // Optional
    stream: my_stream   // Optional
};
```

This transpiles to: `kernel_name<<<grid, block, shared, stream>>>(args);`

#### Writing CUDA Kernels

Use Zen C function syntax with `@global` and the `launch` statement:

```zc
import "std/cuda.zc"

@global
fn add_kernel(a: float*, b: float*, c: float*, n: int) {
    let i = thread_id();
    if i < n {
        c[i] = a[i] + b[i];
    }
}

fn main() {
    def N = 1024;
    let d_a = cuda_alloc<float>(N);
    let d_b = cuda_alloc<float>(N); 
    let d_c = cuda_alloc<float>(N);
    defer cuda_free(d_a);
    defer cuda_free(d_b);
    defer cuda_free(d_c);

    // ... init data ...
    
    launch add_kernel(d_a, d_b, d_c, N) with {
        grid: (N + 255) / 256,
        block: 256
    };
    
    cuda_sync();
}
```

#### Standard Library (`std/cuda.zc`)
Zen C provides a standard library for common CUDA operations to reduce `raw` blocks:

```zc
import "std/cuda.zc"

// Memory management
let d_ptr = cuda_alloc<float>(1024);
cuda_copy_to_device(d_ptr, h_ptr, 1024 * sizeof(float));
defer cuda_free(d_ptr);

// Synchronization
cuda_sync();

// Thread Indexing (use inside kernels)
let i = thread_id(); // Global index
let bid = block_id();
let tid = local_id();
```

{% alert(type="note") %}
**Note:** The `--cuda` flag sets `nvcc` as the compiler and implies `--cpp` mode. Requires the NVIDIA CUDA Toolkit.
{% end %}

### C23 Support

Zen C supports modern C23 features when using a compatible backend compiler (GCC 14+, Clang 14+, TCC (partial)).

- **`auto`**: Zen C automatically maps type inference to standard C23 `auto` if `__STDC_VERSION__ >= 202300L`.
- **`_BitInt(N)`**: Use `iN` and `uN` types (e.g., `i256`, `u12`, `i24`) to access C23 arbitrary-width integers.

### Objective-C Interop

Zen C can compile to Objective-C (`.m`) using the `--objc` flag, allowing you to use Objective-C frameworks (like Cocoa/Foundation) and syntax.

```bash
# Compile with clang (or gcc/gnustep)
zc app.zc --objc --cc clang
```

#### Using Objective-C in Zen C

Use `include` for headers and `raw` blocks for Objective-C syntax (`@interface`, `[...]`, `@""`).

```zc
//> macos: framework: Foundation
//> linux: cflags: -fconstant-string-class=NSConstantString -D_NATIVE_OBJC_EXCEPTIONS
//> linux: link: -lgnustep-base -lobjc

include <Foundation/Foundation.h>

fn main() {
    raw {
        NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
        NSLog(@"Hello from Objective-C!");
        [pool drain];
    }
    println "Zen C works too!";
}
```

{% alert(type="note") %}
**Note:** Zen C string interpolation works with Objective-C objects (`id`) by calling `debugDescription` or `description`.
{% end %}

---

## Contributing
 
 We welcome contributions! Whether it's fixing bugs, adding documentation, or proposing new features.
 
 Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute, run tests, and submit pull requests.

---
 
 ## Security
 
 For security reporting instructions, please see [SECURITY.md](SECURITY.md).
 
 ---
 
 ## Attributions

This project uses third-party libraries. Full license texts can be found in the `LICENSES/` directory.

*   **[cJSON](https://github.com/DaveGamble/cJSON)** (MIT License): Used for JSON parsing and generation in the Language Server.
*   **[zc-ape](https://github.com/OEvgeny/zc-ape)** (MIT License): The original Actually Portable Executable port of Zen-C by [Eugene Olonov](https://github.com/OEvgeny).
*   **[Cosmopolitan Libc](https://github.com/jart/cosmopolitan)** (ISC License): The foundational library that makes APE possible.
*   **[TRE](https://github.com/laurikari/tre)** (BSD License): Used for the regular expression engine in the standard library.
*   **[zenc.vim](https://github.com/zenc-lang/zenc.vim)** (MIT License): The official Vim/Neovim plugin, primarily authored by **[davidscholberg](https://github.com/davidscholberg)**.

---

<div align="center">
  <p>
    Copyright © 2026 Zen C Programming Language.<br>
    Start your journey today.
  </p>
  <p>
    <a href="https://discord.com/invite/q6wEsCmkJP">Discord</a> •
    <a href="https://github.com/zenc-lang/zenc">GitHub</a> •
    <a href="https://github.com/zenc-lang/docs">Documentation</a> •
    <a href="https://github.com/zenc-lang/awesome-zenc">Examples</a> •
    <a href="https://github.com/zenc-lang/rfcs">RFCs</a> •
    <a href="CONTRIBUTING.md">Contribute</a>
  </p>
</div>
