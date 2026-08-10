+++
title = "Traits"
weight = 19
+++

# Traits & Standard Traits

Define shared behavior with traits, implement them for types,
and use standard library traits (Iterable, Drop, Copy, Clone).

## Zen C

```zc
import "std/io.zc"

trait Drawable {
    fn draw(self);
}

struct Circle {
    radius: float;
}

struct Square {
    side: float;
}

impl Drawable for Circle {
    fn draw(self) {
        println "drawing circle r={.radius}";
    }
}

impl Drawable for Square {
    fn draw(self) {
        println "drawing square side={.side}";
    }
}

fn render(d: Drawable) {
    d.draw();
}

fn main() {
    let c = Circle { radius: 5.0 };
    let s = Square { side: 3.0 };

    c.draw();
    s.draw();
}
```

## C

```c
#include <stdio.h>

typedef struct {
    float radius;
} Circle;

typedef struct {
    float side;
} Square;

void draw_circle(const void* ptr) {
    const Circle* c = (const Circle*)ptr;
    printf("drawing circle r=%.1f\n", c->radius);
}

void draw_square(const void* ptr) {
    const Square* s = (const Square*)ptr;
    printf("drawing square side=%.1f\n", s->side);
}

typedef void (*draw_fn)(const void*);
typedef struct {
    const void* data;
    draw_fn draw;
} Drawable;

Drawable make_drawable_circle(const Circle* c) {
    Drawable d = {c, (draw_fn)draw_circle};
    return d;
}

Drawable make_drawable_square(const Square* s) {
    Drawable d = {s, (draw_fn)draw_square};
    return d;
}

void render(Drawable d) {
    d.draw(d.data);
}

int main(void) {
    Circle c = {5.0f};
    Square s = {3.0f};

    render(make_drawable_circle(&c));
    render(make_drawable_square(&s));
    return 0;
}
```

## Key Differences

- `trait Drawable { fn draw(self); }` defines a shared interface
- `impl Drawable for Circle { ... }` implements the trait
- Trait objects: `fn render(d: Drawable)` accepts any Drawable implementation
- Standard traits: `Iterable`, `Drop`, `Copy`, `Clone`
- `@derive(Copy)`, `@derive(Eq)` auto-implement via Smart Derive
- C uses manual vtables: function pointer tables + void* data patterns
- C composition with function pointers inside structs

## Output


drawing circle r=5.000000
drawing square side=3.000000
