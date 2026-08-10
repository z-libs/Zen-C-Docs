+++
title = "Thread vs pthreads"
weight = 43
+++

# Thread vs pthreads
<!-- zc-check: skip-file: concurrency example has non-deterministic output -->

Structured threading vs C pthreads with manual joins.

## Zen C

```zc
import "std/thread.zc"
import "std/io.zc"

fn worker(id: int) {
    println "thread {id} done";
}

fn main() {
    println "spawning...";
    let t1 = Thread::spawn(fn() { worker(1); }).unwrap();
    let t2 = Thread::spawn(fn() { worker(2); }).unwrap();
    t1.join().unwrap();
    t2.join().unwrap();
    println "done";
}
```

## C

```c
#include <stdio.h>
#include <pthread.h>

typedef struct { int id; } WorkerArg;

void* worker(void* arg) {
    WorkerArg* a = (WorkerArg*)arg;
    printf("thread %d done\n", a->id);
    return NULL;
}

int main(void) {
    printf("spawning...\n");
    WorkerArg a1 = {1}, a2 = {2};
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, &a1);
    pthread_create(&t2, NULL, worker, &a2);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("done\n");
    return 0;
}
```

## Key Differences

- `Thread::spawn(fn() { ... })` creates threads via closures
- `t.join()?` waits for completion
- C uses pthreads: `pthread_create`, `pthread_join`
- C requires `void*` arg structs for passing data

## Output



spawning...
thread 1 done
thread 2 done
done
