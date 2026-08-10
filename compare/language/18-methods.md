+++
title = "Methods"
weight = 18
+++

# Methods & impl Blocks

Static and instance methods on types, including methods on
primitive types.

## Zen C

```zc
import "std/io.zc"

struct Rectangle {
    width: int;
    height: int;
}

impl Rectangle {
    fn new(w: int, h: int) -> Self {
        return Rectangle { width: w, height: h };
    }

    fn area(self) -> int {
        return .width * .height;
    }

    fn scale(self, factor: int) -> Rectangle {
        return Rectangle { width: .width * factor, height: .height * factor };
    }
}

fn main() {
    let r = Rectangle::new(10, 5);
    println "area: {r.area()}";

    let r2 = r.scale(2);
    println "scaled area: {r2.area()}";
}
```

## C

```c
#include <stdio.h>
#include <stdbool.h>

typedef struct {
    int width;
    int height;
} Rectangle;

Rectangle rect_new(int w, int h) {
    Rectangle r = {w, h};
    return r;
}

int rect_area(Rectangle r) {
    return r.width * r.height;
}

Rectangle rect_scale(Rectangle r, int factor) {
    Rectangle r2 = {r.width * factor, r.height * factor};
    return r2;
}

bool is_even(int self) {
    return self % 2 == 0;
}

int main(void) {
    Rectangle r = rect_new(10, 5);
    printf("area: %d\n", rect_area(r));

    Rectangle r2 = rect_scale(r, 2);
    printf("scaled area: %d\n", rect_area(r2));

    printf("42 is even: %s\n", is_even(42) ? "true" : "false");
    printf("7 is even: %s\n", is_even(7) ? "true" : "false");
    return 0;
}
```

## Key Differences

- `impl Type { fn method(self) ... }` vs C prefix-style functions
- `Self` refers to the implementing type
- Self shorthand: `.width` inside methods means `self.width`
- Static methods: `Rectangle::new(10, 5)` vs `rect_new(10, 5)`
- Primitive methods: `42.is_even()` calls `impl int { fn is_even ... }`
- C uses `type_func(obj, ...)` convention or function pointers in structs
- Method chaining: `r.scale(2).area()`

## Output


area: 50
scaled area: 200
