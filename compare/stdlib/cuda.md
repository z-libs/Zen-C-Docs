+++
title = "CUDA vs Raw CUDA C"
weight = 52
+++

# CUDA vs Raw CUDA C
<!-- zc-check: skip-file: CUDA example requires a GPU; illustrative only -->

GPU programming with first-class CUDA support vs C raw CUDA C API.

## Zen C

```zc
import "std/cuda.zc"
import "std/io.zc"

@global fn vector_add(a: f32*, b: f32*, c: f32*, n: int) {
    let idx = thread_id();
    if idx < n {
        c[idx] = a[idx] + b[idx];
    }
}

fn main() {
    let n = 256;
    let a = cuda::alloc<f32>(n);
    let b = cuda::alloc<f32>(n);
    let c = cuda::alloc<f32>(n);

    for i in 0..n {
        a[i] = i as f32;
        b[i] = (i * 2) as f32;
    }

    let d_a = cuda::copy_to_device(a, n);
    let d_b = cuda::copy_to_device(b, n);
    let d_c = cuda::alloc_device<f32>(n);

    launch vector_add(d_a, d_b, d_c, n) with { grid: 1, block: n };
    cuda::sync();

    cuda::copy_to_host(d_c, c, n);

    println "c[0]: {c[0]}, c[1]: {c[1]}, c[255]: {c[255]}";

    cuda::free_device(d_a);
    cuda::free_device(d_b);
    cuda::free_device(d_c);
}
```

## C (raw CUDA C)

```c
#include <stdio.h>
#include <cuda_runtime.h>

__global__ void vector_add(const float* a, const float* b, float* c, int n) {
    int idx = threadIdx.x + blockIdx.x * blockDim.x;
    if (idx < n) c[idx] = a[idx] + b[idx];
}

int main(void) {
    int n = 256;
    float* a = (float*)malloc(n * sizeof(float));
    float* b = (float*)malloc(n * sizeof(float));
    float* c = (float*)malloc(n * sizeof(float));
    for (int i = 0; i < n; i++) { a[i] = (float)i; b[i] = (float)(i * 2); }

    float *d_a, *d_b, *d_c;
    cudaMalloc(&d_a, n * sizeof(float));
    cudaMalloc(&d_b, n * sizeof(float));
    cudaMalloc(&d_c, n * sizeof(float));
    cudaMemcpy(d_a, a, n * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, b, n * sizeof(float), cudaMemcpyHostToDevice);

    vector_add<<<1, n>>>(d_a, d_b, d_c, n);
    cudaDeviceSynchronize();

    cudaMemcpy(c, d_c, n * sizeof(float), cudaMemcpyDeviceToHost);
    printf("c[0]: %.1f, c[1]: %.1f, c[255]: %.1f\n", c[0], c[1], c[255]);

    cudaFree(d_a); cudaFree(d_b); cudaFree(d_c);
    free(a); free(b); free(c);
    return 0;
}
```

## Key Differences

- `cuda::alloc<T>(n)` for host allocation with GPU-compatible memory
- `cuda::copy_to_device(host_ptr, n)` for host-to-device transfer
- `cuda::copy_to_host(dev_ptr, host_ptr, n)` for device-to-host
- `cuda::sync()` for synchronization
- `thread_id()`, `block_id()`, `local_id()` kernel builtins
- C: `cudaMalloc`, `cudaMemcpy` with explicit flags
- C: manual `cudaFree` for cleanup

## Output

c[0]: 0.0, c[1]: 3.0, c[255]: 765.0
