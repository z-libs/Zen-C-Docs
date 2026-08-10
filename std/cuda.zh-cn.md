# std/cuda

`std/cuda` 模块提供用于 CUDA 互操作的辅助函数和类型，简化了内存管理、同步和设备查询。

> [!NOTE]
> 此模块要求在编译时使用 `--cuda` 标志。

## 使用方法

```zc
import "std/cuda.zc"

fn main() {
    let dev_ptr = cuda_alloc<float>(1024);
    defer cuda_free(dev_ptr);
    
    cuda_sync();
}
```

## 结构体定义

```zc
struct CudaDeviceProp {
    name: String;
    total_global_mem: usize;
    multi_processor_count: int;
    major: int;
    minor: int;
    max_threads_per_block: int;
    warp_size: int;
}
```

## 方法

### 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **cuda_alloc** | `cuda_alloc<T>(n: usize) -> T*` | 在设备上为 `n` 个类型为 `T` 的元素分配内存。 |
| **cuda_free** | `cuda_free(ptr: void*)` | 释放设备内存。 |
| **cuda_copy_to_device** | `cuda_copy_to_device(dst: void*, src: void*, bytes: usize)` | 将数据从主机 (CPU) 拷贝到设备 (GPU)。 |
| **cuda_copy_to_host** | `cuda_copy_to_host(dst: void*, src: void*, bytes: usize)` | 将数据从设备 (GPU) 拷贝到主机 (CPU)。 |
| **cuda_copy_device** | `cuda_copy_device(dst: void*, src: void*, bytes: usize)` | 在设备之间拷贝数据。 |
| **cuda_zero** | `cuda_zero(ptr: void*, bytes: usize)` | 将设备内存清零。 |

### 同步

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **cuda_sync** | `cuda_sync()` | 同步设备（阻塞直到所有之前的 CUDA 调用完成）。 |

### 设备信息

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **cuda_device_count** | `cuda_device_count() -> int` | 返回可用的 CUDA 设备数量。 |
| **cuda_set_device** | `cuda_set_device(id: int)` | 设置当前活动的 CUDA 设备。 |
| **cuda_device_properties** | `cuda_device_properties(device_id: int) -> CudaDeviceProp` | 返回指定设备的属性。 |

### 设备函数 (仅限 Kernel)

这些函数标记为 `@device`，只能在核函数 (`@global`) 或设备函数中调用。

| 函数 | 签名 | 说明 |
| :--- | :--- | :--- |
| **thread_id** | `thread_id() -> int` | 全局线程索引。 |
| **block_id** | `block_id() -> int` | 块索引 (`blockIdx.x`)。 |
| **local_id** | `local_id() -> int` | 局部线程索引 (`threadIdx.x`)。 |
| **block_size** | `block_size() -> int` | 块维度 (`blockDim.x`)。 |
| **grid_size** | `grid_size() -> int` | 网格维度 (`gridDim.x`)。 |
