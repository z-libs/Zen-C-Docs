+++
title = "IO vs printf/scanf"
weight = 39
+++

# IO vs printf/scanf

Type-safe formatted I/O with string interpolation vs C printf/scanf
format strings.

## Zen C

```zc
import "std/io.zc"

fn main() {
    print "Enter your name: ";
    let name = ? "> ";
    println "Hello, {name}!";
}
```

## C

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    printf("Enter your name: ");
    printf("> ");
    char name[256];
    fgets(name, sizeof(name), stdin);
    name[strcspn(name, "\n")] = '\0';
    printf("Hello, %s!\n", name);
    return 0;
}
```

## Key Differences

- `print` / `println` with string interpolation: `"Hello, {name}!"`
- `? "prompt"`: read line from stdin
- `eprint` / `eprintln`: stderr output
- C: `printf` with format specifiers (`%s`, `%d`)
- C: `fgets` + `strcspn` for input and newline stripping

## Output


Enter your name:
