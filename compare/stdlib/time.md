+++
title = "Time vs time.h"
weight = 45
+++

# Time vs time.h
<!-- zc-check: skip-file: time example prints a changing timestamp -->

Time measurement and timestamps vs C time.h/clock_gettime.

## Zen C

```zc
import "std/time.zc"
import "std/io.zc"

fn main() {
    let now = time::now();
    println "timestamp: {now} ms";
}
```

## C

```c
#include <stdio.h>
#include <time.h>

int main(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    long ms = ts.tv_sec * 1000 + ts.tv_nsec / 1000000;
    printf("timestamp: %ld ms\n", ms);
    return 0;
}
```

## Key Differences

- `time::now()` returns a `U64` monotonic timestamp in milliseconds
- C: `clock_gettime` + manual `tv_sec`/`tv_nsec` arithmetic

## Output










timestamp: 1786358929701 ms
