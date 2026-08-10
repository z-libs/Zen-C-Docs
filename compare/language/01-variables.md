+++
title = "Variables & Constants"
weight = 1
+++

# Variables & Constants

Variable declaration, type inference, compile-time constants, and the
`const` qualifier.

## Zen C

```zc
import "std/io.zc"

def MAX_USERS = 100;

fn main() {
    let name: string = "Zen";
    let x = 42;
    let y = 3.14;
    let buffer: char[MAX_USERS];

    println "name: {name}";
    println "x: {x}, y: {y}";
    println "buffer size: {sizeof(buffer)}";
}
```

## C

```c
#include <stdio.h>

#define MAX_USERS 100

int main(void) {
    const char* name = "C";
    int x = 42;
    const double y = 3.14;
    char buffer[MAX_USERS];

    printf("name: %s\n", name);
    printf("x: %d, y: %.2f\n", x, y);
    printf("buffer size: %zu\n", sizeof(buffer));
    return 0;
}
```

## Key Differences

- `let` infers type from value; `let name: string` gives explicit type
- `def` is a typed compile-time constant (safer than `#define`)
- `const` qualifier on function params and types enforces read-only access
- Type inference via `let x = 42` vs C explicit `int x = 42`
- `sizeof` works on variables and types without parentheses

## Output


name: Zen
x: 42, y: 3.140000
buffer size: 100
