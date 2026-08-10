+++
title = "Regex vs regex.h"
weight = 47
+++

# Regex vs POSIX regex

Built-in regular expression matching vs C POSIX regex.h.

## Zen C

```zc
import "std/regex.zc"
import "std/io.zc"

fn main() {
    let re = regex::compile("[a-z]+@[a-z]+\\.[a-z]+");

    let test_email = "hello@world.com";
    println "is match: {re.is_match(test_email)}";
}
```

## C

```c
#include <stdio.h>
#include <regex.h>

int main(void) {
    regex_t re;
    int ret = regcomp(&re, "[a-z]+@[a-z]+\\.[a-z]+", REG_EXTENDED);
    if (ret) { printf("compile error\n"); return 1; }

    const char* text = "contact user@example.com for info";
    regmatch_t match[1];
    const char* p = text;

    while (regexec(&re, p, 1, match, 0) == 0) {
        int len = match[0].rm_eo - match[0].rm_so;
        printf("match: %.*s\n", len, p + match[0].rm_so);
        p += match[0].rm_eo;
    }

    printf("is match: %s\n",
        regexec(&re, "hello@world.com", 0, NULL, 0) == 0 ? "true" : "false");

    regfree(&re);
    return 0;
}
```

## Key Differences

- `regex::compile(pattern)?` compiles a regex
- `re.find_all(text)` returns all matches as strings
- `re.find(text)` returns first match
- `re.is_match(text)` for boolean check
- `re.replace(text, replacement)` for substitution
- C: `regcomp` / `regexec` with manual match extraction
- C: `regoff_t` offsets to extract matched substrings
- C: manual `regfree` for cleanup

## Output


is match: true
