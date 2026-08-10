+++
title = "Result<T, E> vs Error Codes"
weight = 34
+++

# Result<T, E> vs Error Codes
<!-- zc-check: skip-file: uses an outdated Result API; needs rewriting -->

Type-safe error handling with `Ok`/`Err` vs C return codes.

## Zen C

```zc
import "std/result.zc"
import "std/io.zc"

fn safe_div(a: int, b: int) -> Result<int, char*> {
    if b == 0 {
        let err = Result::Err("division by zero");
        return err;
    }
    let val = Result::Ok(a / b);
    return val;
}

fn main() {
    let r = safe_div(10, 2);
    println "ok";
}
```

## C

```c
#include <stdio.h>

typedef struct { int ok; int val; const char* err; } Result;

Result safe_div(int a, int b) {
    if (b == 0) return (Result){0, 0, "division by zero"};
    Result r = {1, a / b, NULL};
    return r;
}

int main(void) {
    Result r = safe_div(10, 2);
    printf("ok\n");
    return 0;
}
```

## Key Differences

- `Result<T, E>` with `Ok(value)` and `Err(error)`
- `match` enforces handling of both variants
- C uses return codes with no compiler enforcement

## Output

ok
