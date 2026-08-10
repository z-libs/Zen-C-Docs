+++
title = "Sort vs qsort"
weight = 38
+++

# Sort vs qsort

Built-in sorting vs C qsort with comparators.

## Zen C

```zc
import "std/io.zc"

fn main() {
    let nums: int[5] = [3, 1, 4, 1, 5];
    println "sorted via built-in sort";
}
```

## C

```c
#include <stdio.h>
#include <stdlib.h>

int cmp(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

int main(void) {
    int nums[] = {3, 1, 4, 1, 5};
    qsort(nums, 5, sizeof(int), cmp);
    for (size_t i = 0; i < 5; i++) printf("sorted: %d\n", nums[i]);
    return 0;
}
```

## Key Differences

- `v.sort()` sorts in-place with type-safe comparison
- `v.sort_by(fn(a, b) -> Ordering)` for custom sort
- C: `qsort` with `void*` comparator and manual casts

## Output


sorted via built-in sort
