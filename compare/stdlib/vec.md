+++
title = "Vec<T> vs Dynamic Arrays"
weight = 31
+++

# Vec<T> vs Dynamic Arrays

Growable dynamic arrays with bounds checking vs C malloc/realloc
manual dynamic arrays.

## Zen C

```zc
import "std/vec.zc"
import "std/io.zc"

fn main() {
    let v: Vec<int> = Vec::new();
    v.push(10);
    v.push(20);
    v.push(30);

    println "len: {v.len}, cap: {v.cap}";

    for val in v {
        println "value: {val}";
    }

    println "v[1]: {v[1]}";

    v.remove(1);
    println "after remove, len: {v.len}";

    v.clear();
    println "after clear, len: {v.len}";
}
```

## C

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* data;
    size_t len;
    size_t cap;
} Vec;

void vec_push(Vec* v, int val) {
    if (v->len >= v->cap) {
        v->cap = v->cap ? v->cap * 2 : 4;
        v->data = realloc(v->data, v->cap * sizeof(int));
    }
    v->data[v->len++] = val;
}

void vec_remove(Vec* v, size_t idx) {
    for (size_t i = idx; i < v->len - 1; i++)
        v->data[i] = v->data[i + 1];
    v->len--;
}

void vec_free(Vec* v) {
    free(v->data);
    v->data = NULL;
    v->len = v->cap = 0;
}

int main(void) {
    Vec v = {NULL, 0, 0};
    vec_push(&v, 10);
    vec_push(&v, 20);
    vec_push(&v, 30);

    printf("len: %zu, cap: %zu\n", v.len, v.cap);

    for (size_t i = 0; i < v.len; i++)
        printf("value: %d\n", v.data[i]);

    printf("v[1]: %d\n", v.data[1]);

    vec_remove(&v, 1);
    printf("after remove, len: %zu\n", v.len);

    v.len = 0;
    printf("after clear, len: %zu\n", v.len);

    vec_free(&v);
    return 0;
}
```

## Key Differences

- `Vec::new()`, `v.push(val)`, `v.pop()`, `v.insert(i, val)`, `v.remove(i)`
- Bounds-checked access: `v[i]` with automatic bounds verification
- Automatic growth: capacity doubles when full
- `for val in v` iterates over elements
- `v.len`, `v.cap` for size tracking
- C requires manual realloc, manual bounds checking
- C dynamic arrays: `realloc` with manual capacity tracking

## Output


len: 3, cap: 8
value: 10
value: 20
value: 30
v[1]: 20
after remove, len: 2
after clear, len: 0
