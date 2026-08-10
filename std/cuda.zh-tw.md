# std/cuda

`std/cuda` 模組提供了用於 CUDA 互操作的輔助函數和類型，簡化了記憶體管理、同步和裝置查詢。

> [!NOTE]
> 此模組需要使用 `--cuda` 標誌進行編譯。

## 使用方法

```zc
import "std/cuda.zc"

fn main() {
    let dev_ptr = cuda_alloc<float>(1024);
    defer cuda_free(dev_ptr);
    
    cuda_sync();
}
```

## 結構體定義

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

### 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **cuda_alloc** | `cuda_alloc<T>(n: usize) -> T*` | 為類型 `T` 的 `n` 個元素分配裝置記憶體。 |
| **cuda_free** | `cuda_free(ptr: void*)` | 釋放裝置記憶體。 |
| **cuda_copy_to_device** | `cuda_copy_to_device(dst: void*, src: void*, bytes: usize)` | 將數據從主機 (CPU) 複製到裝置 (GPU)。 |
| **cuda_copy_to_host** | `cuda_copy_to_host(dst: void*, src: void*, bytes: usize)` | 將數據從裝置 (GPU) 複製到主機 (CPU)。 |
| **cuda_copy_device** | `cuda_copy_device(dst: void*, src: void*, bytes: usize)` | 數據在裝置之間複製。 |
| **cuda_zero** | `cuda_zero(ptr: void*, bytes: usize)` | 將裝置記憶體設為零。 |

### 同步

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **cuda_sync** | `cuda_sync()` | 同步裝置（阻塞直到之前的所有 CUDA 調用完成）。 |

### 裝置資訊

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **cuda_device_count** | `cuda_device_count() -> int` | 返回可用 CUDA 裝置的數量。 |
| **cuda_set_device** | `cuda_set_device(id: int)` | 設置目前的 CUDA 裝置。 |
| **cuda_device_properties** | `cuda_device_properties(device_id: int) -> CudaDeviceProp` | 返回指定裝置的屬性。 |

### 裝置函數（僅限核心 Kernel）

這些函數被標記為 `@device`，只能在核心 (`@global`) 或裝置函數中調用。

| 函數 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **thread_id** | `thread_id() -> int` | 全域執行緒索引。 |
| **block_id** | `block_id() -> int` | 區塊索引 (`blockIdx.x`)。 |
| **local_id** | `local_id() -> int` | 本地執行緒索引 (`threadIdx.x`)。 |
| **block_size** | `block_size() -> int` | 區塊維度 (`blockDim.x`)。 |
| **grid_size** | `grid_size() -> int` | 網格維度 (`gridDim.x`)。 |
