+++
title = "3. Aggregate Types"
weight = 3
+++

# 3. Aggregate Types {#3-aggregate-types}


#### Arrays
Fixed-size arrays with value semantics.
```zc
def SIZE = 5;
let ints: int[SIZE] = [1, 2, 3, 4, 5];
let zeros: [int; SIZE]; // Zero-initialized
```

#### Tuples
Group multiple values together, access elements by index.
```zc
let pair = (1, "Hello");
let x = pair.0;  // 1
let s = pair.1;  // "Hello"
```

**Multiple Return Values**

Functions can return tuples to provide multiple results:
```zc
fn add_and_subtract(a: int, b: int) -> (int, int) {
    return (a + b, a - b);
}

let result = add_and_subtract(3, 2);
let sum = result.0;   // 5
let diff = result.1;  // 1
```

**Destructuring**

Tuples can be destructured directly into variables:
```zc
let (sum, diff) = add_and_subtract(3, 2);
// sum = 5, diff = 1
```

Typed tuple destructuring allows explicit type annotations:
```zc
let (a: string, b: u8) = ("hello", 42);
let (x, y: i32) = (1, 2);  // Mixed: x inferred, y explicit
```

#### Structs
Data structures with optional bitfields.
```zc
struct Point {
    x: int;
    y: int;
}

// Struct initialization
let p = Point { x: 10, y: 20 };

// Bitfields
struct Flags {
    valid: U8 : 1;
    mode:  U8 : 3;
}
```

{% alert(type="note") %}
Structs use [Move Semantics](@/tour/08-memory-management.md#resource-semantics-move-by-default) by default. Fields can be accessed via `.` even on pointers (Auto-Dereference).
{% end %}

#### Opaque Structs
You can define a struct as `opaque` to restrict access to its fields to the defining module only, while still allowing the struct to be allocated on the stack (size is known).

<!-- zc-check: skip: opaque-type example, depends on a separate user.zc module -->
```zc
// In user.zc
opaque struct User {
    id: int;
    name: string;
}

fn new_user(name: string) -> User {
    return User{id: 1, name: name}; // OK: Inside module
}

// In main.zc
import "user.zc";

fn main() {
    let u = new_user("Alice");
    // let id = u.id; // Error: Cannot access private field 'id'
}
```

#### Enums
Tagged unions (Sum types) capable of holding data.
```zc
enum Shape {
    Circle(float),      // Holds radius
    Rect(float, float), // Holds width, height
    Point               // No data
}
```

#### Unions
Standard C unions (unsafe access).
```zc
union Data {
    i: int;
    f: float;
}
```

#### SIMD Vectors
Native SIMD vector types using GCC/Clang vector extensions. Annotate a struct with `@vector(N)` to define a vector of N elements.
```zc
import "std/simd.zc";

fn main() {
    let a = f32x4{v: 1.0};              // Broadcast: {1.0, 1.0, 1.0, 1.0}
    let b = f32x4{1.0, 2.0, 3.0, 4.0};  // Per-element init
    let c = a + b;                       // Element-wise addition
    let x = c[0];                        // Element access (float)
}
```
Arithmetic (`+`, `-`, `*`, `/`) and bitwise (`&`, `|`, `^`) operators work element-wise. See [`std/simd.zc`](std/simd.zc) for predefined types.

#### Type Aliases
Create a new name for an existing type.
```zc
alias ID = int;
alias PointMap = Map<string, Point>
alias OpFunc = fn(int, int) -> int
```

#### Opaque Type Aliases
You can define a type alias as `opaque` to create a new type that is distinct from its underlying type outside of the defining module. This provides strong encapsulation and type safety without the runtime overhead of a wrapper struct.

<!-- zc-check: skip: opaque-alias example, depends on a separate library.zc module -->
```zc
// In library.zc
opaque alias Handle = int;

fn make_handle(v: int) -> Handle {
    return v; // Implicit conversion allowed inside module
}

// In main.zc
import "library.zc";

fn main() {
    let h: Handle = make_handle(42);
    // let i: int = h; // Error: Type validation failed
    // let h2: Handle = 10; // Error: Type validation failed
}
```
