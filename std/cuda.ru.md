# std/cuda

Модуль `std/cuda` предоставляет вспомогательные функции и типы для взаимодействия с CUDA, упрощая управление памятью, синхронизацию и запросы к устройствам.

> [!NOTE]
> Этот модуль требует компиляции с флагом `--cuda`.

## Использование

```zc
import "std/cuda.zc"

fn main() {
    let dev_ptr = cuda_alloc<float>(1024);
    defer cuda_free(dev_ptr);
    
    cuda_sync();
}
```

## Определение структуры

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

## Методы

### Управление памятью

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **cuda_alloc** | `cuda_alloc<T>(n: usize) -> T*` | Выделяет память устройства для `n` элементов типа `T`. |
| **cuda_free** | `cuda_free(ptr: void*)` | Освобождает память устройства. |
| **cuda_copy_to_device** | `cuda_copy_to_device(dst: void*, src: void*, bytes: usize)` | Копирует данные с хоста (CPU) на устройство (GPU). |
| **cuda_copy_to_host** | `cuda_copy_to_host(dst: void*, src: void*, bytes: usize)` | Копирует данные с устройства (GPU) на хост (CPU). |
| **cuda_copy_device** | `cuda_copy_device(dst: void*, src: void*, bytes: usize)` | Копирует данные с устройства на устройство. |
| **cuda_zero** | `cuda_zero(ptr: void*, bytes: usize)` | Заполняет память устройства нулями. |

### Синхронизация

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **cuda_sync** | `cuda_sync()` | Синхронизирует устройство (блокирует выполнение до завершения всех предыдущих вызовов CUDA). |

### Информация об устройстве

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **cuda_device_count** | `cuda_device_count() -> int` | Возвращает количество доступных устройств CUDA. |
| **cuda_set_device** | `cuda_set_device(id: int)` | Устанавливает активное устройство CUDA. |
| **cuda_device_properties** | `cuda_device_properties(device_id: int) -> CudaDeviceProp` | Возвращает свойства указанного устройства. |

### Функции устройства (только для ядер)

Эти функции помечены `@device` и должны вызываться только изнутри ядра (`@global`) или функций устройства.

| Функция | Сигнатура | Описание |
| :--- | :--- | :--- |
| **thread_id** | `thread_id() -> int` | Глобальный индекс потока. |
| **block_id** | `block_id() -> int` | Индекс блока (`blockIdx.x`). |
| **local_id** | `local_id() -> int` | Локальный индекс потока (`threadIdx.x`). |
| **block_size** | `block_size() -> int` | Размер блока (`blockDim.x`). |
| **grid_size** | `grid_size() -> int` | Размер сетки (`gridDim.x`). |
