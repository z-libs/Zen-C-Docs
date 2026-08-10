+++
title = "Printing & String Interpolation"
weight = 15
+++

# Printing & String Interpolation

Print macros, string interpolation with `{}`, raw strings,
multiline strings, and input prompts.

## Zen C

```zc
import "std/io.zc"

fn main() {
    let name = "Zen";
    let count = 3;

    println "Hello, {name}!";
    println "Count: {count}";

    println "JSON: {{key: value}}";

    let path = r"C:\Users\{name}\docs";
    println "raw path: {path}";

    let story = """
    Once upon a time,
    in the land of {name},
    there were {count} warriors.
    """;
    println "{story}";

    println "--- user input ---";
    print "What is your name? ";
    let user_name = ? ">>> ";
    println "Hello, {user_name}!";
}
```

## C

```c
#include <stdio.h>

int main(void) {
    const char* name = "C";
    int count = 3;

    printf("Hello, %s!\n", name);
    printf("Count: %d\n", count);

    printf("JSON: {key: value}\n");

    const char* path = "C:\\Users\\{name}\\docs";
    printf("raw path: %s\n", path);

    printf("Once upon a time,\n");
    printf("in the land of %s,\n", name);
    printf("there were %d warriors.\n", count);

    printf("--- user input ---\n");
    printf("What is your name? ");
    printf(">>> ");
    char buffer[256];
    if (fgets(buffer, sizeof(buffer), stdin)) {
        buffer[strcspn(buffer, "\n")] = '\0';
        printf("Hello, %s!\n", buffer);
    }
    return 0;
}
```

## Key Differences

- String interpolation: `"Hello, {name}!"` vs `printf("Hello, %s!", name)`
- Brace escaping: `{{` and `}}` for literal braces
- Raw strings: `r"no \\ escape {interpolation}"`
- Multiline strings: `"""..."""` blocks with implicit interpolation
- Shorthand printing: bare `"msg"` = `println "msg"`
- Input: `? "prompt"` reads a line; `? "prompt" (var)` scans typed input
- C needs `printf` with format specifiers, `fgets` for input, `strcspn` for newline cleanup

## Output


Hello, Zen!
Count: 3
JSON: {key: value}
raw path: C:\Users\{name}\docs

    Once upon a time,
    in the land of Zen,
    there were 3 warriors.

--- user input ---
What is your name?
