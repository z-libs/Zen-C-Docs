+++
title = "Concurrency"
weight = 22
+++

# Concurrency (Async/Await)
<!-- zc-check: skip-file: concurrency example output ordering is non-deterministic -->

Stackless async functions, await for result retrieval, and
background task launching.

## Zen C

```zc
import "std/io.zc"
import "std/thread.zc"

fn worker(name: string) {
    println "{name} started";
    sleep_ms(50);
    println "{name} done";
}

fn main() {
    println "spawning threads...";

    let t1 = thread::spawn(fn() { worker("A"); }).unwrap();
    let t2 = thread::spawn(fn() { worker("B"); }).unwrap();

    println "doing other work...";

    t1.join().unwrap();
    println "A complete";

    t2.join().unwrap();
    println "B complete";

    println "done";
}
```

## C

```c
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

typedef struct { const char* name; } WorkerArg;

void* worker(void* arg) {
    WorkerArg* a = (WorkerArg*)arg;
    printf("%s started\n", a->name);
    usleep(50000);
    printf("%s done\n", a->name);
    return NULL;
}

int main(void) {
    printf("spawning threads...\n");

    WorkerArg a1 = {"A"}, a2 = {"B"};
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, &a1);
    pthread_create(&t2, NULL, worker, &a2);

    printf("doing other work...\n");

    pthread_join(t1, NULL);
    printf("A complete\n");

    pthread_join(t2, NULL);
    printf("B complete\n");

    printf("done\n");
    return 0;
}
```

## Key Differences

- `thread::spawn(fn() { ... })` creates threads via closures
- `t.join()?` waits for completion
- `sleep_ms(ms)` for timed waits
- C uses pthreads directly: `pthread_create`, `pthread_join`
- C requires `void*` arg structs for passing data
- Zen C closures capture surrounding variables implicitly

## Output








spawning threads...
A started
doing other work...
B started
A done
B done
A complete
B complete
done
