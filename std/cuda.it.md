# std/cuda

Il modulo `std/cuda` fornisce funzioni di supporto e tipi per l'interoperabilità CUDA, semplificando la gestione della memoria, la sincronizzazione e le query del dispositivo.

> [!NOTE]
> Questo modulo richiede la compilazione con il flag `--cuda`.

## Utilizzo

```zc
import "std/cuda.zc"

fn main() {
    let dev_ptr = cuda_alloc<float>(1024);
    defer cuda_free(dev_ptr);
    
    cuda_sync();
}
```

## Definizione Struct

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

## Metodi

### Gestione della Memoria

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **cuda_alloc** | `cuda_alloc<T>(n: usize) -> T*` | Alloca memoria sul dispositivo per `n` elementi di tipo `T`. |
| **cuda_free** | `cuda_free(ptr: void*)` | Libera la memoria del dispositivo. |
| **cuda_copy_to_device** | `cuda_copy_to_device(dst: void*, src: void*, bytes: usize)` | Copia i dati dall'host (CPU) al dispositivo (GPU). |
| **cuda_copy_to_host** | `cuda_copy_to_host(dst: void*, src: void*, bytes: usize)` | Copia i dati dal dispositivo (GPU) all'host (CPU). |
| **cuda_copy_device** | `cuda_copy_device(dst: void*, src: void*, bytes: usize)` | Copia i dati da dispositivo a dispositivo. |
| **cuda_zero** | `cuda_zero(ptr: void*, bytes: usize)` | Imposta la memoria del dispositivo a zero. |

### Sincronizzazione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **cuda_sync** | `cuda_sync()` | Sincronizza il dispositivo (si blocca fino al completamento di tutte le chiamate CUDA precedenti). |

### Informazioni sul Dispositivo

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **cuda_device_count** | `cuda_device_count() -> int` | Restituisce il numero di dispositivi CUDA disponibili. |
| **cuda_set_device** | `cuda_set_device(id: int)` | Imposta il dispositivo CUDA attivo. |
| **cuda_device_properties** | `cuda_device_properties(device_id: int) -> CudaDeviceProp" | Restituisce le proprietà del dispositivo specificato. |

### Funzioni del Dispositivo (Solo Kernel)

Queste funzioni sono contrassegnate con `@device` e dovrebbero essere chiamate solo dall'interno di un kernel (`@global`) o di funzioni del dispositivo.

| Funzione | Firma | Descrizione |
| :--- | :--- | :--- |
| **thread_id** | `thread_id() -> int` | Indice globale del thread. |
| **block_id** | `block_id() -> int` | Indice del blocco (`blockIdx.x`). |
| **local_id** | `local_id() -> int` | Indice locale del thread (`threadIdx.x`). |
| **block_size** | `block_size() -> int` | Dimensione del blocco (`blockDim.x`). |
| **grid_size** | `grid_size() -> int` | Dimensione della griglia (`gridDim.x`). |
