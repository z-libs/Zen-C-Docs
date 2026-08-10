+++
title = "Attributes"
weight = 26
+++

# Attributes

Compiler annotations for optimization hints, code placement,
linkage control, and trait derivation.

## Zen C

```zc
import "std/io.zc"

@inline fn fast_add(a: int, b: int) -> int { return a + b; }

@noinline fn slow_debug(a: int, b: int) -> int { return a + b; }

@constructor fn init_library() {
    println "library initialized";
}

@destructor fn cleanup_library() {
    println "library cleaned up";
}

@noreturn fn fatal(msg: string) {
    eprintln "FATAL: {msg}";
    exit(1);
}

@deprecated("use fast_add instead") fn old_add(a: int, b: int) -> int {
    return a + b;
}

@unused fn maybe_unused() {
    println "this might not be called";
}

@packed struct Compact {
    a: u8;
    b: int;
    c: u8;
}

fn main() {
    println "fast_add: {fast_add(3, 4)}";
    init_library();
}
```

## C

```c
#include <stdio.h>
#include <stdlib.h>

inline int fast_add(int a, int b) { return a + b; }

__attribute__((noinline)) int slow_debug(int a, int b) { return a + b; }

__attribute__((constructor)) void init_library(void) {
    printf("library initialized\n");
}

__attribute__((destructor)) void cleanup_library(void) {
    printf("library cleaned up\n");
}

__attribute__((noreturn)) void fatal(const char* msg) {
    fprintf(stderr, "FATAL: %s\n", msg);
    exit(1);
}

__attribute__((deprecated("use fast_add instead")))
int old_add(int a, int b) { return a + b; }

__attribute__((unused)) void maybe_unused(void) {
    printf("this might not be called\n");
}

typedef struct __attribute__((packed)) {
    uint8_t a;
    int b;
    uint8_t c;
} Compact;

int main(void) {
    printf("fast_add: %d\n", fast_add(3, 4));
    init_library();
    return 0;
}
```

## Key Differences

- `@inline` / `@noinline`: compiler inlining hints
- `@constructor`: run before `main()` (GCC/Clang attribute)
- `@destructor`: run after `main()` exits
- `@noreturn`: function does not return (optimization)
- `@deprecated("msg")`: warn on usage
- `@unused`, `@weak`, `@section("name")`, `@align(N)`, `@packed`
- `@pure`, `@cold`, `@hot`: optimization hints
- `@export`: symbol visibility (default)
- `@global`, `@device`, `@host`: CUDA attributes
- `@ctype("type")`: override generated C type
- Custom attributes: `@name` -> `__attribute__((name))`
- C uses `__attribute__((...))` directly (GCC/Clang extension)

## Output


library initialized
fast_add: 7
library initialized
library cleaned up
