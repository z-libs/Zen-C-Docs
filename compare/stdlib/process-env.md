+++
title = "Process & Env vs system/getenv"
weight = 55
+++

# Process & Env vs system()/getenv()
<!-- zc-check: skip-file: prints environment variables (machine-specific) -->

Process execution, environment variables, and system info vs C
system(), popen(), getenv().

## Zen C

```zc
import "std/process.zc"
import "std/env.zc"
import "std/io.zc"

fn main() {
    let home = env::get("HOME").unwrap_or("unknown");
    println "HOME: {home}";

    env::set("ZC_MODE", "debug");
    let mode = env::get("ZC_MODE").unwrap_or("not set");
    println "ZC_MODE: {mode}";
}
```

## C

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    FILE* f = popen("uname -s", "r");
    if (f) {
        char buf[256];
        fgets(buf, sizeof(buf), f);
        printf("os: %s", buf);
        pclose(f);
    }

    const char* home = getenv("HOME");
    if (home) printf("HOME: %s\n", home);

    setenv("ZC_MODE", "debug", 1);
    const char* mode = getenv("ZC_MODE");
    if (mode) printf("ZC_MODE: %s\n", mode);

    long cores = sysconf(_SC_NPROCESSORS_ONLN);
    printf("cores: %ld\n", cores);
    return 0;
}
```

## Key Differences

- `process::exec(cmd, [args])?` captures stdout/stderr
- `process::spawn(cmd, [args])` for background processes
- `process::exit(code)` for process termination
- `env::get(key)` returns `Option<string>`
- `env::set(key, value)` sets environment variable
- `info::cpu_count()`, `info::hostname()` for system info
- `user::current()`, `user::home_dir()` for user info
- C: `popen`/`pclose`, `system()`, `getenv`/`setenv`
- C: `unistd.h` for `sysconf`, `gethostname`

## Output


HOME: /home/zuhaitz
ZC_MODE: debug
