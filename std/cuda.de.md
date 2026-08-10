# std/cuda

Das Modul `std/cuda` bietet Hilfsfunktionen und Typen für die CUDA-Interoperabilität und vereinfacht die Speicherverwaltung, Synchronisation und Geräteabfragen.

> [!NOTE]
> Dieses Modul erfordert das Kompilieren mit dem Flag `--cuda`.

## Verwendung

```zc
import "std/cuda.zc"

fn main() {
    let dev_ptr = cuda_alloc<float>(1024);
    defer cuda_free(dev_ptr);
    
    cuda_sync();
}
```

## Struktur-Definition

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

## Methoden

### Speicherverwaltung

| Methode | Signatur | Beschreibung |
| :--- | :--- | :--- |
| **cuda_alloc** | `cuda_alloc<T>(n: usize) -> T*` | Allokiert Gerätespeicher für `n` Elemente vom Typ `T`. |
| **cuda_free** | `cuda_free(ptr: void*)` | Gibt Gerätespeicher frei. |
| **cuda_copy_to_device** | `cuda_copy_to_device(dst: void*, src: void*, bytes: usize)` | Kopiert Daten vom Host (CPU) zum Gerät (GPU). |
| **cuda_copy_to_host** | `cuda_copy_to_host(dst: void*, src: void*, bytes: usize)` | Kopiert Daten vom Gerät (GPU) zum Host (CPU). |
| **cuda_copy_device** | `cuda_copy_device(dst: void*, src: void*, bytes: usize)` | Kopiert Daten von Gerät zu Gerät. |
| **cuda_zero** | `cuda_zero(ptr: void*, bytes: usize)` | Setzt Gerätespeicher auf Null. |

### Synchronisation

| Methode | Signatur | Beschreibung |
| :--- | :--- | :--- |
| **cuda_sync** | `cuda_sync()` | Synchronisiert das Gerät (blockiert, bis alle vorherigen CUDA-Aufrufe abgeschlossen sind). |

### Geräteinformationen

| Methode | Signatur | Beschreibung |
| :--- | :--- | :--- |
| **cuda_device_count** | `cuda_device_count() -> int` | Gibt die Anzahl der verfügbaren CUDA-Geräte zurück. |
| **cuda_set_device** | `cuda_set_device(id: int)` | Legt das aktive CUDA-Gerät fest. |
| **cuda_device_properties** | `cuda_device_properties(device_id: int) -> CudaDeviceProp` | Gibt die Eigenschaften des angegebenen Geräts zurück. |

### Gerätefunktionen (Nur Kernel)

Diese Funktionen sind mit `@device` markiert und sollten nur innerhalb eines Kernels (`@global`) oder von Gerätefunktionen aufgerufen werden.

| Funktion | Signatur | Beschreibung |
| :--- | :--- | :--- |
| **thread_id** | `thread_id() -> int` | Globaler Thread-Index. |
| **block_id** | `block_id() -> int` | Block-Index (`blockIdx.x`). |
| **local_id** | `local_id() -> int` | Lokaler Thread-Index (`threadIdx.x`). |
| **block_size** | `block_size() -> int` | Block-Dimension (`blockDim.x`). |
| **grid_size** | `grid_size() -> int` | Grid-Dimension (`gridDim.x`). |
