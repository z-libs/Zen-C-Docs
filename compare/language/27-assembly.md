+++
title = "Inline Assembly"
weight = 27
+++

# Inline Assembly
<!-- zc-check: skip-file: inline asm example prints a non-deterministic timestamp -->

Raw assembly blocks, volatile asm, and named constraints for
register allocation.

## Zen C

```zc
import "std/io.zc"

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

fn read_timestamp() -> u64 {
    let result: u64;
    asm volatile {
        "rdtsc"
        : out(result)
    }
    return result;
}

fn main() {
    let val = add_five(10);
    println "add_five(10): {val}";

    let ts = read_timestamp();
    println "timestamp: {ts}";

    asm { "nop" }
    println "nop executed";
}
```

## C

```c
#include <stdio.h>
#include <stdint.h>

int add_five(int x) {
    int result;
    __asm__ __volatile__ (
        "mov %1, %0\n\t"
        "add $5, %0"
        : "=r"(result)
        : "r"(x)
        : "cc"
    );
    return result;
}

uint64_t read_timestamp(void) {
    uint32_t low, high;
    __asm__ __volatile__ (
        "rdtsc"
        : "=a"(low), "=d"(high)
    );
    return ((uint64_t)high << 32) | low;
}

int main(void) {
    int val = add_five(10);
    printf("add_five(10): %d\n", val);

    uint64_t ts = read_timestamp();
    printf("timestamp: %lu\n", (unsigned long)ts);

    __asm__ __volatile__ ("nop");
    printf("nop executed\n");
    return 0;
}
```

## Key Differences

- `asm { "instruction" }` for basic assembly
- `asm volatile { ... }` prevents optimization of assembly with side effects
- Named constraints: `: out(variable)` instead of C `"=r"(var)`
- Input: `: in(variable)` instead of `"r"(var)`
- Clobber: `: clobber("reg")` instead of separate clobber list
- Variable placeholders: `{variable}` in asm string
- C uses `__asm__ __volatile__` with GCC extended asm syntax
- C constraint strings: `"=a"`/`"=b"`/`"=r"` etc.

## Output





add_five(10): 15
timestamp: 2059951938
nop executed
