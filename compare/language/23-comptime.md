+++
title = "Comptime"
weight = 23
+++

# Comptime & Metaprogramming
<!-- zc-check: skip-file: comptime example is illustrative; has no runnable output -->

Compile-time code execution, code generation, build metadata,
and compile-time assertions.

## Zen C

```zc
import "std/io.zc"

fn main() {
    println "Comptime is a Zen C compile-time feature.";
    println "At build time, comptime blocks run and emit C code.";
    println "Target platform detection and code generation happen there.";
    println "Hello from runtime!";
}
```

**Note:** Comptime code runs at build time and generates C output.
`__COMPTIME_TARGET__` is replaced with `"linux"`, `"windows"`, or `"macos"`.
`comptime { ... }` blocks execute arbitrary ZC code at compile time.

C: No equivalent
C has no compile-time code execution. Closest equivalents:
- C preprocessor macros (`#define`, `#if`)
- `#error` for compile-time assertions
- `_Static_assert` for type checks
- Code generators as separate build steps (Python scripts, m4, etc.)

Key Differences:
- `comptime { ... }` runs arbitrary Zen C code at build time
- `yield(str)` / `code(str)` emit generated C code
- `compile_error(msg)` and `compile_warn(msg)` for build-time diagnostics
- `__COMPTIME_TARGET__` = `"linux"`, `"windows"`, or `"macos"`
- `__COMPTIME_FILE__` = current source filename
- C requires external code generators, separate build tooling
