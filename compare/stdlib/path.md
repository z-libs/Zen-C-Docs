+++
title = "Path vs Manual Paths"
weight = 41
+++

# Path vs Manual Path Manipulation

Cross-platform path manipulation vs C manual string operations
for path handling.

## Zen C

```zc
import "std/path.zc"
import "std/io.zc"

fn main() {
    let base = Path::new("/home/user");
    let full = base.join("docs/readme.txt");
    println "full path: {full}";

    let ext = full.extension();
    println "extension: {ext}";
}
```

## C

```c
#include <stdio.h>
#include <string.h>
#include <libgen.h>
#include <stdlib.h>

int main(void) {
    char path[512];
    snprintf(path, sizeof(path), "%s/%s", "/home/user", "docs/readme.txt");
    printf("full path: %s\n", path);

    const char* filename = "readme.txt";
    const char* dot = strrchr(filename, '.');
    printf("extension: %s\n", dot ? dot + 1 : "");
    return 0;
}
```

## Key Differences

- `Path::new(str)` creates a path object
- `base.join(other)` for cross-platform path joining
- `full.extension()` returns `Option<String>`
- C: manual string concatenation with `/`
- C: `strrchr` for extension detection

## Output







