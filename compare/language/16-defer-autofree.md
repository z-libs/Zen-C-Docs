+++
title = "Defer & Autofree"
weight = 16
+++

# Defer & Autofree

Deferred cleanup at scope exit (LIFO order) and automatic memory
freeing for heap allocations.

## Zen C

```zc
import "std/io.zc"

fn process_file(path: char*) {
    let f = fopen(path, "r");
    defer fclose(f);

    println "processing {path}...";
    println "done";
}

fn allocate_buffer() {
    autofree let buf = malloc(1024);
    println "buffer allocated";
}

fn main() {
    process_file("test.txt");
    println "---";

    allocate_buffer();
    println "---";
    println "buffer automatically freed";
}
```

## C

```c
#include <stdio.h>
#include <stdlib.h>

void process_file(const char* path) {
    FILE* f = fopen(path, "r");
    if (!f) return;

    printf("processing %s...\n", path);
    printf("done\n");

    fclose(f);
}

void allocate_buffer(void) {
    char* buf = malloc(1024);
    printf("buffer allocated\n");
    free(buf);
}

int main(void) {
    process_file("test.txt");
    printf("---\n");

    allocate_buffer();
    printf("---\n");
    printf("buffer manually freed\n");
    return 0;
}
```

## Key Differences

- `defer fclose(f)` schedules cleanup at scope exit
- Multiple defers execute in LIFO (last-in, first-out) order
- No control-flow allowed inside defer (no return/break/continue)
- `autofree let buf = malloc(N)` auto-frees at scope exit
- C requires manual cleanup at every exit point (goto cleanup pattern)
- Combined with `guard`, creates clean early-return-with-cleanup

## Output







