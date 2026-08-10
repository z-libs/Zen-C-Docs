+++
title = "11. Concurrency (Async/Await)"
weight = 11
+++

# 11. Concurrency (Async/Await) {#11-concurrency-asyncawait}


Built on pthreads.

```zc
async fn fetch_data() -> string {
    // Runs in background
    return "Data";
}

fn main() {
    let result = await fetch_data();
    println "{result}";
}
```
