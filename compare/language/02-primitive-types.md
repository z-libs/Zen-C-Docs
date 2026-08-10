+++
title = "Primitive Types"
weight = 2
+++

# Primitive Types

Fixed-width integers, floating-point types, booleans, characters,
and type mappings to C.

## Zen C

```zc
import "std/io.zc"

fn main() {
    let a: int = 42;
    let b: u8 = 255;
    let c: i64 = -9223372036854775807;
    let d: f64 = 3.1415926535;
    let e: bool = true;
    let f: char = 'Z';
    let g: isize = 42;
    let h: usize = 4096;
    let rune_val: rune = 'Z';

    println "int:     {a} ({sizeof(a)} bytes)";
    println "u8:      {b} ({sizeof(b)} bytes)";
    println "i64:     {c} ({sizeof(c)} bytes)";
    println "f64:     {d:.10}";
    println "bool:    {e}";
    println "char:    {f}";
    println "isize:   {g}";
    println "usize:   {h}";
    println "rune:    {rune_val}";
}
```

## C

```c
#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

int main(void) {
    int32_t a = 42;
    uint8_t b = 255;
    int64_t c = -9223372036854775807;
    double d = 3.1415926535;
    bool e = true;
    char f = 'Z';
    ptrdiff_t g = (ptrdiff_t)a;
    size_t h = 4096;

    printf("int:     %d (%zu bytes)\n", a, sizeof(a));
    printf("u8:      %u (%zu bytes)\n", b, sizeof(b));
    printf("i64:     %ld (%zu bytes)\n", (long)c, sizeof(c));
    printf("f64:     %.10f\n", d);
    printf("bool:    %d\n", e);
    printf("char:    %c\n", f);
    printf("isize:   %td\n", g);
    printf("usize:   %zu\n", h);
    printf("rune:    %c\n", f);
    return 0;
}
```

## Key Differences

- Zen C `int`/`uint` are portable 32-bit (`int32_t`/`uint32_t`)
- Zen C `i8`..`i128`/`u8`..`u128` vs C `int8_t`..`__int128_t`
- Zen C `isize`/`usize` pointer-sized ints vs C `ptrdiff_t`/`size_t`
- Zen C `bool` is a real boolean type, same as C `_Bool`/`bool`
- Zen C `rune` = `uint32_t` for Unicode scalar values
- Type table in Zen C is explicit: `u8`, `i32`, `f64` etc.
- C interop types: `c_int`, `c_char`, `c_long` etc. map directly

## Output


int:     42 (4 bytes)
u8:      255 (1 bytes)
i64:     -9223372036854775807 (8 bytes)
f64:
bool:    true
char:    Z
isize:   42
usize:   4096
rune:    Z
