+++
title = "String vs C Strings"
weight = 32
+++

# String vs C Strings

Heap-allocated Unicode strings with concatenation vs C char*
manual buffer management.

## Zen C

```zc
import "std/string.zc"
import "std/io.zc"

fn main() {
    let s: String = String::new("");
    s.append_c("Hello, ");
    s.append_c("Zen!");

    println "'{s}' (len: {s.length()})";

    s.append_c(" v");
    println "'{s}' (len: {s.length()})";

    let search = "Zen";
    println "contains '{search}': {s.contains_str(search)}";

    println "cleared, len: {s.length()}";
}
```

## C

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

typedef struct {
    char* data;
    size_t len;
    size_t cap;
} String;

void string_push_str(String* s, const char* str) {
    size_t slen = strlen(str);
    if (s->len + slen + 1 > s->cap) {
        s->cap = (s->len + slen + 1) * 2;
        s->data = realloc(s->data, s->cap);
    }
    memcpy(s->data + s->len, str, slen);
    s->len += slen;
    s->data[s->len] = '\0';
}

void string_push(String* s, char c) {
    if (s->len + 2 > s->cap) {
        s->cap = (s->len + 2) * 2;
        s->data = realloc(s->data, s->cap);
    }
    s->data[s->len++] = c;
    s->data[s->len] = '\0';
}

int string_contains(String* s, const char* sub) {
    return strstr(s->data, sub) != NULL;
}

void string_free(String* s) {
    free(s->data);
    s->data = NULL;
    s->len = s->cap = 0;
}

int main(void) {
    String s = {calloc(1, 1), 0, 1};
    string_push_str(&s, "Hello, ");
    string_push_str(&s, "C!");

    printf("'%s' (len: %zu)\n", s.data, s.len);

    string_push(&s, ' ');
    string_push(&s, 'v');
    printf("'%s' (len: %zu)\n", s.data, s.len);

    for (size_t i = 0; i < s.len; i++)
        s.data[i] = toupper((unsigned char)s.data[i]);
    printf("upper: '%s'\n", s.data);

    printf("contains 'C!': %s\n",
        string_contains(&s, "C!") ? "true" : "false");

    string_free(&s);
    return 0;
}
```

## Key Differences

- `String::new()`, `s.push_str(str)`, `s.push(ch)`
- `s.to_uppercase()`, `s.to_lowercase()` for case conversion
- `s.contains(sub)`, `s.starts_with(pre)`, `s.ends_with(suf)`
- `s.len` for length (UTF-8 aware)
- `s.trim()`, `s.split(delim)`, `s.replace(from, to)`
- C: `strlen`, `strcpy`, `strcat` with manual buffer allocation
- C: no bounds checking, buffer overflow risk
- C: `strstr` for searching, manual upper/lower via `toupper`

## Output


'Hello, Zen!' (len: 11)
'Hello, Zen! v' (len: 13)
contains 'Zen': true
cleared, len: 13
