+++
title = "SIMD vs Intrinsics"
weight = 53
+++

# SIMD vs Intrinsics

Hardware vector types with operator overloads vs C SIMD intrinsics.

## Zen C

```zc
import "std/simd.zc"
import "std/io.zc"

fn main() {
    let a = f32x4{1.0, 2.0, 3.0, 4.0};
    let b = f32x4{5.0, 6.0, 7.0, 8.0};

    let sum = a + b;
    println "a[0] + b[0]: {sum[0]}";

    let product = a * b;
    println "a[1] * b[1]: {product[1]}";

    let scaled = a * 2.0;
    println "a[2] * 2: {scaled[2]}";
}
```

## C (SSE/AVX intrinsics)

```c
#include <stdio.h>
#include <xmmintrin.h>

int main(void) {
    __m128 a = _mm_set_ps(4.0f, 3.0f, 2.0f, 1.0f);
    __m128 b = _mm_set_ps(8.0f, 7.0f, 6.0f, 5.0f);

    __m128 sum = _mm_add_ps(a, b);
    float sum_arr[4]; _mm_storeu_ps(sum_arr, sum);
    printf("a[0] + b[0]: %.1f\n", sum_arr[0]);

    __m128 product = _mm_mul_ps(a, b);
    float prod_arr[4]; _mm_storeu_ps(prod_arr, product);
    printf("a[1] * b[1]: %.1f\n", prod_arr[1]);

    __m128 two = _mm_set1_ps(2.0f);
    __m128 scaled = _mm_mul_ps(a, two);
    float scaled_arr[4]; _mm_storeu_ps(scaled_arr, scaled);
    printf("a[2] * 2: %.1f\n", scaled_arr[2]);
    return 0;
}
```

## Key Differences

- `f32x4`, `f32x8`, `i32x4` etc. for different vector types
- Natural operator syntax: `a + b`, `a * 2.0`
- Element access via `[i]` -- no store/load gymnastics
- `@vector(N)` attribute for custom vector types on structs
- Broadcast initialization: `f32x4(1.0)` sets all lanes
- C: `_mm_add_ps`, `_mm_mul_ps` etc. with verbose function names
- C: manual `_mm_storeu_ps` to extract elements
- C: architecture-specific (#ifdef __SSE__, __AVX__, __ARM_NEON)

## Output


a[0] + b[0]: 6.000000
a[1] * b[1]: 12.000000
a[2] * 2: 6.000000
