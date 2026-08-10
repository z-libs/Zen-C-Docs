+++
title = "Enums & Unions"
weight = 7
+++

# Enums (Tagged Unions) & Unions

Tagged unions with data-carrying variants, pattern matching
support, and C-compatible unions.

## Zen C

```zc
import "std/io.zc"

enum Shape {
    Circle(float),
    Rect(float, float),
    Point,
}

union Data {
    i: int;
    f: float;
}

fn area(shape: Shape) -> float {
    match shape {
        Shape::Circle(r) => { return 3.14 * r * r; },
        Shape::Rect(w, h) => { return w * h; },
        Shape::Point => { return 0.0; },
    }
}

fn main() {
    let c = Shape::Circle(10.0);
    let r = Shape::Rect(4.0, 5.0);
    let p = Shape::Point;

    println "circle area: {area(c)}";
    println "rect area:   {area(r)}";
    println "point area:  {area(p)}";

    let d = Data { i: 42 };
    println "union int: {d.i}";
}
```

## C

```c
#include <stdio.h>

typedef enum { SHAPE_CIRCLE, SHAPE_RECT, SHAPE_POINT } ShapeKind;

typedef struct {
    ShapeKind kind;
    union {
        float radius;
        struct { float w; float h; } rect;
    } data;
} Shape;

Shape make_circle(float r) {
    Shape s = {SHAPE_CIRCLE, .data.radius = r};
    return s;
}

Shape make_rect(float w, float h) {
    Shape s = {SHAPE_RECT};
    s.data.rect.w = w;
    s.data.rect.h = h;
    return s;
}

Shape make_point(void) {
    Shape s = {SHAPE_POINT};
    return s;
}

float area(Shape s) {
    switch (s.kind) {
        case SHAPE_CIRCLE: return 3.14f * s.data.radius * s.data.radius;
        case SHAPE_RECT:   return s.data.rect.w * s.data.rect.h;
        case SHAPE_POINT:  return 0.0f;
        default:           return 0.0f;
    }
}

typedef union {
    int32_t i;
    float f;
} Data;

int main(void) {
    Shape c = make_circle(10.0f);
    Shape r = make_rect(4.0f, 5.0f);
    Shape p = make_point();

    printf("circle area: %.1f\n", area(c));
    printf("rect area:   %.1f\n", area(r));
    printf("point area:  %.1f\n", area(p));

    Data d;
    d.i = 42;
    printf("union int: %d\n", d.i);
    return 0;
}
```

## Key Differences

- Zen C enums are tagged unions: `Circle(float)` carries data
- C enums are just integer constants; tagged unions need manual tag + union
- Pattern matching on enums is safe and exhaustive
- C requires switch on tag + manual field access pattern
- Zen C unions use named fields (`Data { i: 42 }`)

## Output


circle area: 314.000000
rect area:   20.000000
point area:  0.000000
union int: 42
