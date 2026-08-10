+++
title = "Structs, Bitfields & Type Aliases"
weight = 6
+++

# Structs, Bitfields & Type Aliases

Data structures with named field initialization, bitfields,
opaque structs, and type aliases.

## Zen C

```zc
import "std/io.zc"

struct Point {
    x: int;
    y: int;
}

struct Flags {
    valid: u8 : 1;
    mode: u8 : 3;
    reserved: u8 : 4;
}

alias ID = int;

fn print_point(p: Point) {
    println "Point({p.x}, {p.y})";
}

fn main() {
    let p = Point { x: 10, y: 20 };
    print_point(p);

    let f = Flags { valid: 1, mode: 5, reserved: 0 };
    println "valid: {f.valid}, mode: {f.mode}";

    let id: ID = 42;
    println "id: {id}";
}
```

## C

```c
#include <stdio.h>
#include <stdint.h>

typedef struct {
    int32_t x;
    int32_t y;
} Point;

typedef struct {
    uint8_t valid : 1;
    uint8_t mode : 3;
    uint8_t reserved : 4;
} Flags;

typedef int32_t ID;

void print_point(Point p) {
    printf("Point(%d, %d)\n", p.x, p.y);
}

int main(void) {
    Point p = {10, 20};
    print_point(p);

    Flags f = {1, 5, 0};
    printf("valid: %u, mode: %u\n", f.valid, f.mode);

    ID id = 42;
    printf("id: %d\n", id);
    return 0;
}
```

## Key Differences

- Zen C structs use `{ .field = value }` named init
- C uses `{ value }` positional (or `.field = value` in C99)
- Bitfields: Zen C `u8 : 1` vs C `uint8_t field : 1`
- `alias ID = int` is like C `typedef int ID`
- Opaque structs (`opaque struct User`) restrict field access
- Auto-dereference: `ptr.field` works on pointers without `->`

## Output







