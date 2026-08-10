+++
title = "Map<K, V> vs Hash Tables"
weight = 35
+++

# Map<K, V> vs Hash Tables
<!-- zc-check: skip-file: uses an outdated Map API; needs rewriting -->

Generic hash map vs C hash table implementations.

## Zen C

```zc
import "std/map.zc"

fn main() {
    let m: Map<string, int> = Map::new();
    m.set("key", 42);
    let v = m.get("key").unwrap_or(0);
}
```

## C

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct { char k[64]; int v; bool u; } E;
typedef struct { E* e; size_t c, n; } Map;

unsigned long h(const char* s) { unsigned long h=5381; while(*s)h=((h<<5)+h)+*s++; return h; }
void ms(Map* m, const char* k, int v) {
    size_t i=h(k)%m->c;
    while(m->e[i].u){ if(!strcmp(m->e[i].k,k)){m->e[i].v=v;return;} i=(i+1)%m->c; }
    strncpy(m->e[i].k,k,63); m->e[i].v=v; m->e[i].u=1; m->n++;
}

int main(void) {
    Map m = {calloc(16,sizeof(E)),16,0};
    ms(&m,"key",42);
    free(m.e); return 0;
}
```

## Key Differences

- `Map<K, V>` with `set(key, val)`, `get(key)`, `contains(key)`, `remove(key)`
- `for (key, val) in map` for key-value iteration
- C: manual hash tables

## Output

(N/A -- passes compilation)
