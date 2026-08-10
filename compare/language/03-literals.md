+++
title = "Literals"
weight = 3
+++

# Literals

Numeric literals in decimal, hex, octal, and binary; underscores
for readability; floating-point and Unicode rune literals.

## Zen C

```zc
import "std/io.zc"

fn main() {
    let decimal: int = 42;
    let hex: int = 0xFF;
    let octal: int = 0o755;
    let binary: int = 0b1010_1100;
    let large: int = 1_000_000;
    let pi: f64 = 3.1415_9265;
    let sci: f64 = 1.5e10;
    let rune_val: rune = 'Z';

    println "decimal: {decimal}";
    println "hex:     {hex}";
    println "octal:   {octal}";
    println "binary:  {binary}";
    println "large:   {large}";
    println "pi:      {pi:.7}";
    println "sci:     {sci:.1e}";
    println "rune:    {rune_val}";
}
```

## C

```c
#include <stdio.h>
#include <stdint.h>

int main(void) {
    int32_t decimal = 42;
    int32_t hex = 0xFF;
    int32_t octal = 0755;
    int32_t binary = 0b10101100;
    int32_t large = 1000000;
    double pi = 3.14159265;
    double sci = 1.5e10;
    char rune_val = 'Z';

    printf("decimal: %d\n", decimal);
    printf("hex:     %d\n", hex);
    printf("octal:   %d\n", octal);
    printf("binary:  %d\n", binary);
    printf("large:   %d\n", large);
    printf("pi:      %.7f\n", pi);
    printf("sci:     %.1e\n", sci);
    printf("rune:    %c\n", rune_val);
    return 0;
}
```

## Key Differences

- Zen C uses `0o` prefix for octal (C uses leading zero)
- Leading zero in Zen C is a decimal number (no accidental octal)
- Underscore separators everywhere: `1_000_000`, `0b1010_1100`, `3.1415_9265`
- Binary literals `0b` are built-in (C23 added them)
- `rune` literals: `'Z'`, `'\\u{2764}'` for Unicode scalar values

## Output


decimal: 42
hex:     255
octal:   493
binary:  172
large:   1000000
pi:
sci:     1.5e+10
rune:    Z
