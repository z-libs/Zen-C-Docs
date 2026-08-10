+++
title = "FS vs File Operations"
weight = 40
+++

# FS vs File I/O
<!-- zc-check: skip-file: uses an outdated fs API; needs rewriting -->

File system operations with error handling vs C fopen/fread/fwrite
with manual error checking.

## Zen C

```zc
import "std/fs.zc"
import "std/io.zc"

fn main() {
    let f = fs::open("output.txt", "w").expect("failed to open");
    f.write_string("Hello, Zen C!\n");
    f.write_string("Line 2\n");
    f.close();

    let inf = fs::open("output.txt", "r").expect("failed to open");
    let content = fs::read_all("output.txt").expect("failed to read");
    println "file content:\n{content}";
    inf.close();
}
```

## C

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    FILE* f = fopen("output.txt", "w");
    if (!f) return 1;
    fprintf(f, "Hello, C!\n");
    fprintf(f, "Line 2\n");
    fclose(f);

    FILE* inf = fopen("output.txt", "r");
    if (!inf) return 1;
    fseek(inf, 0, SEEK_END);
    long size = ftell(inf);
    fseek(inf, 0, SEEK_SET);
    char* content = malloc(size + 1);
    fread(content, 1, size, inf);
    content[size] = '\0';
    printf("file content:\n%s", content);
    free(content);
    fclose(inf);
    return 0;
}
```

## Key Differences

- `fs::open(path, mode)` for read/write/append
- `f.write(str)`, `f.read_all()` for I/O operations
- `f.read_line()`, `f.read_bytes(N)` for granular reads
- Directory operations: `fs::mkdir`, `fs::read_dir`, `fs::exists`
- `fs::remove(path)`, `fs::rename(from, to)`
- `stat` for file metadata
- C: `fopen`, `fread`, `fwrite`, `fprintf`, manual error checking
- C: no built-in directory traversal (need `opendir`/`readdir`)

## Output

file content:
Hello, Zen C!
Line 2
