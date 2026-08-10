+++
title = "Conditional Compilation & Macros"
weight = 25
+++

# Conditional Compilation & C Macros

`@cfg` for platform/feature-gated code, `#define` macros for C
interop, and Smart Derive for auto-generating trait implementations.

## Zen C

```zc
import "std/io.zc"

#define MAX_BUFFER 1024

@cfg(DEBUG)
fn debug_log(msg: string) {
    eprintln "[DEBUG] {msg}";
}

@cfg(not(DEBUG))
fn debug_log(msg: string) { }

@derive(Copy)
struct Vec3 {
    x: f32;
    y: f32;
    z: f32;
}

fn main() {
    println "buffer size: {MAX_BUFFER}";
    debug_log("running in debug mode");

    let v1 = Vec3 { x: 1.0, y: 2.0, z: 3.0 };
    let v2 = v1;
    println "v2: ({v2.x}, {v2.y}, {v2.z})";
}
```

## C

```c
#include <stdio.h>

#define MAX_BUFFER 1024

#define DEBUG 1

#if DEBUG
void debug_log(const char* msg) {
    fprintf(stderr, "[DEBUG] %s\n", msg);
}
#else
void debug_log(const char* msg) { }
#endif

typedef struct {
    float x;
    float y;
    float z;
} Vec3;

int main(void) {
    printf("buffer size: %d\n", MAX_BUFFER);
    debug_log("running in debug mode");

    Vec3 v1 = {1.0f, 2.0f, 3.0f};
    Vec3 v2 = v1;
    printf("v2: (%.1f, %.1f, %.1f)\n", v2.x, v2.y, v2.z);
    return 0;
}
```

## Key Differences

- `@cfg(NAME)`, `@cfg(not(NAME))`, `@cfg(any(...))`, `@cfg(all(...))`
- Multiple `@cfg` directives on a declaration are ANDed
- C `#define` macros pass through to C output
- `@derive(Copy)` auto-implements `Copy` trait (Smart Derive)
- `@derive(Eq)` generates equality method taking by reference
- C uses `#ifdef`/`#if` preprocessor which is less structured
- C struct copy is implicit (no trait needed)

## Output


buffer size: 1024
v2: (1.000000, 2.000000, 3.000000)
