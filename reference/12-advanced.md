+++
title = "12. Advanced & Metaprogramming"
weight = 12
+++

# 12. Advanced & Metaprogramming {#12-advanced-metaprogramming}


### Advanced & Metaprogramming

#### 12.1 Metaprogramming

#### Comptime
Run code at compile-time to generate source or print messages.
```zc
comptime {
    // Generate code at compile-time (written to stdout)
    println "let build_date = \"2024-01-01\";";
}

println "Build Date: {build_date}";
```

<details>
<summary><b>Helper Functions</b></summary>

Special functions available inside `comptime` blocks for code generation and diagnostics:

<table>
<tr>
<th>Function</th>
<th>Description</th>
</tr>
<tr>
<td><code>yield(str)</code></td>
<td>Explicitly emit generated code (alternative to <code>printf</code>)</td>
</tr>
<tr>
<td><code>code(str)</code></td>
<td>Alias for <code>yield()</code> - clearer intent for code generation</td>
</tr>
<tr>
<td><code>compile_error(msg)</code></td>
<td>Halt compilation with a fatal error message</td>
</tr>
<tr>
<td><code>compile_warn(msg)</code></td>
<td>Emit a compile-time warning (allows compilation to continue)</td>
</tr>
</table>

**Example:**
```zc
comptime {
    compile_warn("Generating optimized code...");
    
    let ENABLE_FEATURE = 1;
    if (ENABLE_FEATURE == 0) {
        compile_error("Feature must be enabled!");
    }
    
    // Use code() with raw strings for clean generation
    code(r"let FEATURE_ENABLED = 1;");
}
```
</details>

<details>
<summary><b>Build Metadata</b></summary>

Access compiler build information at compile-time:

<table>
<tr>
<th>Constant</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td><code>__COMPTIME_TARGET__</code></td>
<td>string</td>
<td>Platform: <code>"linux"</code>, <code>"windows"</code>, or <code>"macos"</code></td>
</tr>
<tr>
<td><code>__COMPTIME_FILE__</code></td>
<td>string</td>
<td>Current source filename being compiled</td>
</tr>
</table>

**Example:**
```zc
comptime {
    // Platform-specific code generation
    println "let PLATFORM = \"{__COMPTIME_TARGET__}\";";
}

println "Running on: {PLATFORM}";
```
</details>

{% alert(type="tip") %}
Use raw strings (`r"..."`) in comptime to avoid escaping braces: `code(r"fn test() { return 42; }")`. Otherwise, use `{{` and `}}` to escape braces inside regular strings.
{% end %}

#### Embed
Embed files as specified types.
```zc
// Default (Slice_char)
let data = embed "assets/logo.png";

// Typed Embed
let text = embed "shader.glsl" as string;    // Embbed as C-string
let rom  = embed "bios.bin" as u8[1024];     // Embed as fixed array
let wav  = embed "sound.wav" as u8[];        // Embed as Slice_u8
```

#### Plugins
Zen C supports native Zen C (`.zc`) plugins that extend language syntax through compile-time code generation. Plugins can now provide interactive hover documentation (tooltips) for the Language Server (LSP).

```zc
import plugin "plugins/lisp" as lisp

fn main() {
    lisp! {
        (defun square (x) (* x x))
        (print (square 10))
    }
}
```

Read the full **[Plugin System Guide](../PLUGINS.md)** for more details.

#### Generic C Macros
Pass preprocessor macros through to C.

{% alert(type="tip") %}
For simple constants, use `def` instead. Use `#define` when you need C-preprocessor macros or conditional compilation flags.
{% end %}

```zc
#define MAX_BUFFER 1024
```

#### Conditional Compilation
Use `@cfg()` to conditionally include or exclude any top-level declaration based on `-D` flags.

```zc
// Build with: zc build app.zc -DUSE_OPENGL

@cfg(USE_OPENGL)
import "opengl_backend.zc";

@cfg(USE_VULKAN)
import "vulkan_backend.zc";

// OR: include if any backend is selected
@cfg(any(USE_OPENGL, USE_VULKAN))
fn init_graphics() { /* ... */ }

// AND with negation
@cfg(not(USE_OPENGL))
@cfg(not(USE_VULKAN))
fn fallback_init() { println "No backend selected"; }
```

| Form | Meaning |
|:---|:---|
| `@cfg(NAME)` | Include if `-DNAME` is set |
| `@cfg(not(NAME))` | Include if `-DNAME` is NOT set |
| `@cfg(any(A, B, ...))` | Include if ANY condition is true (OR) |
| `@cfg(all(A, B, ...))` | Include if ALL conditions are true (AND) |

Multiple `@cfg` on one declaration are ANDed. `not()` can be used inside `any()` and `all()`. Works on any top-level declaration: `fn`, `struct`, `import`, `impl`, `raw`, `def`, `test`, etc.

#### 12.2 Attributes

Decorate functions and structs to modify compiler behavior.

| Attribute | Scope | Description |
|:---|:---|:---|
| `@required` | Fn | Warn if return value is ignored. |
| `@deprecated("msg")` | Fn/Struct | Warn on usage with message. |
| `@inline` | Fn | Hint compiler to inline. |
| `@noinline` | Fn | Prevent inlining. |
| `@packed` | Struct | Remove padding between fields. |
| `@align(N)` | Struct | Force alignment to N bytes. |
| `@constructor` | Fn | Run before main. |
| `@destructor` | Fn | Run after main exits. |
| `@unused` | Fn/Var | Suppress unused variable warnings. |
| `@weak` | Fn | Weak symbol linkage. |
| `@section("name")` | Fn | Place code in specific section. |
| `@noreturn` | Fn | Function does not return (e.g. exit). |
| `@pure` | Fn | Function has no side effects (optimization hint). |
| `@cold` | Fn | Function is unlikely to be executed (branch prediction hint). |
| `@hot` | Fn | Function is frequently executed (optimization hint). |
| `@export` | Fn/Struct | Export symbol (visibility default). |
| `@global` | Fn | CUDA: Kernel entry point (`__global__`). |
| `@device` | Fn | CUDA: Device function (`__device__`). |
| `@host` | Fn | CUDA: Host function (`__host__`). |
| `@comptime` | Fn | Helper function available for compile-time execution. |
| `@cfg(NAME)` | Any | Conditional compilation: include only if `-DNAME` is passed. Supports `not()`, `any()`, `all()`. |
| `@derive(...)` | Struct | Auto-implement traits. Supports `Debug`, `Eq` (Smart Derive), `Copy`, `Clone`. |
| `@ctype("type")` | Fn Param | Overrides generated C type for a parameter. |
| `@<custom>` | Any | Passes generic attributes to C (e.g. `@flatten`, `@alias("name")`). |

#### Custom Attributes

Zen C supports a powerful **Custom Attribute** system that allows you to use any GCC/Clang `__attribute__` directly in your code. Any attribute that is not explicitly recognized by the Zen C compiler is treated as a generic attribute and passed through to the generated C code.

This provides access to advanced compiler features, optimizations, and linker directives without needing explicit support in the language core.

#### Syntax Mapping
Zen C attributes are mapped directly to C attributes:
- `@name` → `__attribute__((name))`
- `@name(args)` → `__attribute__((name(args)))`
- `@name("string")` → `__attribute__((name("string")))`

#### Smart Derives

Zen C provides "Smart Derives" that respect Move Semantics:

- **`@derive(Eq)`**: Generates an equality method that takes arguments by reference (`fn eq(self, other: T*)`).
    - When comparing two non-Copy structs (`a == b`), the compiler automatically passes `b` by reference (`&b`) to avoid moving it.
    - Recursive equality checks on fields also prefer pointer access to prevent ownership transfer.

#### 12.3 Inline Assembly

Zen C provides first-class support for inline assembly, transpiling directly to GCC-style extended `asm`.

#### Basic Usage
Write raw assembly within `asm` blocks. Strings are concatenated automatically.
```zc
asm {
    "nop"
    "mfence"
}
```

#### Volatile
Prevent the compiler from optimizing away assembly that has side effects.
```zc
asm volatile {
    "rdtsc"
}
```

#### Named Constraints
Zen C simplifies the complex GCC constraint syntax with named bindings.

```zc
// Syntax: : out(variable) : in(variable) : clobber(reg)
// Uses {variable} placeholder syntax for readability

fn add_five(x: int) -> int {
    let result: int;
    asm {
        "mov {x}, {result}"
        "add $5, {result}"
        : out(result)
        : in(x)
        : clobber("cc")
    }
    return result;
}
```

| Type | Syntax | GCC Equivalent |
|:---|:---|:---|
| **Output** | `: out(variable)` | `"=r"(variable)` |
| **Input** | `: in(variable)` | `"r"(variable)` |
| **Clobber** | `: clobber("rax")` | `"rax"` |
| **Memory** | `: clobber("memory")` | `"memory"` |

#### 12.4 Diagnostic System

Zen C provides a categorized diagnostic system that can be controlled via `-W` and `-Wno-` flags. This is useful for managing warnings related to safety, unused code, and C interop.

[Read more about the Diagnostic System](@/tour/16-diagnostics.md#16-diagnostic-system)

#### 12.5 Build Directives

Zen C supports special comments at the top of your source file to configure the build process without needing a complex build system or Makefile.

| Directive | Arguments | Description |
|:---|:---|:---|
| `//> link:` | `-lfoo` or `path/to/lib.a` | Link against a library or object file. |
| `//> lib:` | `path/to/libs` | Add a library search path (`-L`). |
| `//> include:` | `path/to/headers` | Add an include search path (`-I`). |
| `//> framework:` | `Cocoa` | Link against a macOS framework. |
| `//> cflags:` | `-Wall -O3` | Pass arbitrary flags to the C compiler. |
| `//> define:` | `MACRO` or `KEY=VAL` | Define a preprocessor macro (`-D`). |
| `//> pkg-config:` | `gtk+-3.0` | Run `pkg-config` and append `--cflags` and `--libs`. |
| `//> shell:` | `command` | Execute a shell command during the build. |
| `//> get:` | `http://url/file` | Download a file if specific file does not exist. |

#### Features

**1. OS Guarding**
Prefix directives with an OS name to apply them only on specific platforms.
Supported prefixes: `linux:`, `windows:`, `macos:` (or `darwin:`).

```zc
//> linux: link: -lm
//> windows: link: -lws2_32
//> macos: framework: Cocoa
```

**2. Environment Variable Expansion**
Use `${VAR}` syntax to expand environment variables in your directives.

```zc
//> include: ${HOME}/mylib/include
//> lib: ${ZC_ROOT}/std
```

#### Examples

<!-- zc-check: skip: build-directive example requiring external GTK/raylib headers -->
```zc
//> include: ./include
//> lib: ./libs
//> link: -lraylib -lm
//> cflags: -Ofast
//> pkg-config: gtk+-3.0

import "raylib.h"

fn main() { ... }
```

#### 12.6 Keywords

The following keywords are reserved in Zen C.

#### Declarations
`alias`, `def`, `enum`, `fn`, `impl`, `import`, `let`, `module`, `opaque`, `struct`, `trait`, `union`, `use`

#### Control Flow
`async`, `await`, `break`, `catch`, `continue`, `defer`, `do`, `else`, `for`, `goto`, `guard`, `if`, `loop`, `match`, `return`, `try`, `unless`, `while`

#### Special
`asm`, `assert`, `autofree`, `comptime`, `const`, `embed`, `launch`, `ref`, `sizeof`, `static`, `test`, `volatile`

#### Constants
`true`, `false`, `null`

#### C Reserved
The following identifiers are reserved because they are keywords in C11:
`auto`, `case`, `char`, `default`, `double`, `extern`, `float`, `inline`, `int`, `long`, `register`, `restrict`, `short`, `signed`, `switch`, `typedef`, `unsigned`, `void`, `_Atomic`, `_Bool`, `_Complex`, `_Generic`, `_Imaginary`, `_Noreturn`, `_Static_assert`, `_Thread_local`

#### Operators
`and`, `or`
