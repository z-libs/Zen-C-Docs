+++
title = "Set<T> vs Custom Sets"
weight = 36
+++

# Set<T> vs Custom Sets

Generic hash set vs C custom set implementations.

## Zen C

```zc
import "std/set.zc"
import "std/io.zc"

fn main() {
    let s: Set<int> = Set::new();
    println "set created, capacity: {s.cap}";
}
```

## C

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("set created\n");
    return 0;
}
```

## Key Differences

- `Set<T>` with `insert(val)`, `remove(val)`, `contains(val)`, `len`, `cap`
- Duplicates automatically rejected
- Generic: works with any type implementing `Hash` and `Eq`
- C: custom hash tables with open addressing

## Output


set created, capacity: 0
