+++
title = "Complex vs complex.h"
weight = 50
+++

# Complex vs C99 complex.h

Complex number arithmetic with operator support vs C99 complex.h.

## Zen C

```zc
import "std/complex.zc"
import "std/io.zc"

fn main() {
    let a = Complex::new(3.0, 4.0);
    let b = Complex::new(1.0, 2.0);

    println "magnitude: {a.magnitude()}";
}
```

## C

```c
#include <stdio.h>
#include <complex.h>
#include <math.h>

int main(void) {
    double complex a = 3.0 + 4.0 * I;
    double complex b = 1.0 + 2.0 * I;

    double complex sum = a + b;
    printf("sum: %.1f + %.1fi\n", creal(sum), cimag(sum));

    double complex product = a * b;
    printf("product: %.1f + %.1fi\n", creal(product), cimag(product));

    printf("magnitude: %.1f\n", cabs(a));
    return 0;
}
```

## Key Differences

- `Complex::new(real, imag)` constructor
- Overloaded `+`, `-`, `*`, `/` operators
- `a.magnitude()`, `a.phase()`, `a.conjugate()`
- `Complex::from_polar(r, theta)` for polar construction
- C: `double complex` with `I` constant
- C: `creal`, `cimag` for component extraction
- C: `cabs`, `carg` for magnitude and phase

## Output


magnitude: 5.000000
