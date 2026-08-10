# std/cuda

El módulo `std/cuda` proporciona funciones de ayuda y tipos para la interoperabilidad con CUDA, simplificando la gestión de memoria, la sincronización y las consultas de dispositivos.

> [!NOTE]
> Este módulo requiere compilar con la bandera `--cuda`.

## Uso

```zc
import "std/cuda.zc"

fn main() {
    let dev_ptr = cuda_alloc<float>(1024);
    defer cuda_free(dev_ptr);
    
    cuda_sync();
}
```

## Definición de Estructura

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

## Métodos

### Gestión de Memoria

| Método | Firma | Descripción |
| :--- | :--- | :--- |
| **cuda_alloc** | `cuda_alloc<T>(n: usize) -> T*` | Asigna memoria de dispositivo para `n` elementos de tipo `T`. |
| **cuda_free** | `cuda_free(ptr: void*)` | Libera memoria de dispositivo. |
| **cuda_copy_to_device** | `cuda_copy_to_device(dst: void*, src: void*, bytes: usize)` | Copia datos del host (CPU) al dispositivo (GPU). |
| **cuda_copy_to_host** | `cuda_copy_to_host(dst: void*, src: void*, bytes: usize)` | Copia datos del dispositivo (GPU) al host (CPU). |
| **cuda_copy_device** | `cuda_copy_device(dst: void*, src: void*, bytes: usize)` | Copia datos de dispositivo a dispositivo. |
| **cuda_zero** | `cuda_zero(ptr: void*, bytes: usize)` | Establece la memoria del dispositivo a cero. |

### Sincronización

| Método | Firma | Descripción |
| :--- | :--- | :--- |
| **cuda_sync** | `cuda_sync()` | Sincroniza el dispositivo (se bloquea hasta que se completen todas las llamadas CUDA anteriores). |

### Información del Dispositivo

| Método | Firma | Descripción |
| :--- | :--- | :--- |
| **cuda_device_count** | `cuda_device_count() -> int` | Devuelve el número de dispositivos CUDA disponibles. |
| **cuda_set_device** | `cuda_set_device(id: int)` | Establece el dispositivo CUDA activo. |
| **cuda_device_properties** | `cuda_device_properties(device_id: int) -> CudaDeviceProp` | Devuelve las propiedades del dispositivo especificado. |

### Funciones de Dispositivo (Solo Kernel)

Estas funciones están marcadas con `@device` y solo deben llamarse desde un kernel (`@global`) o funciones de dispositivo.

| Función | Firma | Descripción |
| :--- | :--- | :--- |
| **thread_id** | `thread_id() -> int` | Índice de hilo global. |
| **block_id** | `block_id() -> int` | Índice de bloque (`blockIdx.x`). |
| **local_id** | `local_id() -> int` | Índice de hilo local (`threadIdx.x`). |
| **block_size** | `block_size() -> int` | Dimensión del bloque (`blockDim.x`). |
| **grid_size** | `grid_size() -> int` | Dimensión de la rejilla (`gridDim.x`). |
