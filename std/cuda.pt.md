# std/cuda

O módulo `std/cuda` fornece funções auxiliares e tipos para interoperabilidade CUDA, simplificando a gestão de memória, sincronização e consultas de dispositivos.

> [!NOTE]
> Este módulo requer compilação com a flag `--cuda`.

## Uso

```zc
import "std/cuda.zc"

fn main() {
    let dev_ptr = cuda_alloc<float>(1024);
    defer cuda_free(dev_ptr);
    
    cuda_sync();
}
```

## Definição da Estrutura

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

### Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **cuda_alloc** | `cuda_alloc<T>(n: usize) -> T*` | Aloca memória de dispositivo para `n` elementos do tipo `T`. |
| **cuda_free** | `cuda_free(ptr: void*)` | Liberta memória de dispositivo. |
| **cuda_copy_to_device** | `cuda_copy_to_device(dst: void*, src: void*, bytes: usize)` | Copia dados do host (CPU) para o dispositivo (GPU). |
| **cuda_copy_to_host** | `cuda_copy_to_host(dst: void*, src: void*, bytes: usize)` | Copia dados do dispositivo (GPU) para o host (CPU). |
| **cuda_copy_device** | `cuda_copy_device(dst: void*, src: void*, bytes: usize)` | Copia dados de dispositivo para dispositivo. |
| **cuda_zero** | `cuda_zero(ptr: void*, bytes: usize)` | Define a memória do dispositivo como zero. |

### Sincronização

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **cuda_sync** | `cuda_sync()` | Sincroniza o dispositivo (bloqueia até que todas as chamadas CUDA anteriores terminem). |

### Informação do Dispositivo

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **cuda_device_count** | `cuda_device_count() -> int` | Retorna o número de dispositivos CUDA disponíveis. |
| **cuda_set_device** | `cuda_set_device(id: int)` | Define o dispositivo CUDA ativo. |
| **cuda_device_properties** | `cuda_device_properties(device_id: int) -> CudaDeviceProp` | Retorna as propriedades do dispositivo especificado. |

### Funções de Dispositivo (Apenas Kernel)

Estas funções são marcadas como `@device` e só devem ser chamadas de dentro de um kernel (`@global`) ou funções de dispositivo.

| Função | Assinatura | Descrição |
| :--- | :--- | :--- |
| **thread_id** | `thread_id() -> int` | Índice global da thread. |
| **block_id** | `block_id() -> int` | Índice do bloco (`blockIdx.x`). |
| **local_id** | `local_id() -> int` | Índice local da thread (`threadIdx.x`). |
| **block_size** | `block_size() -> int` | Dimensão do bloco (`blockDim.x`). |
| **grid_size** | `grid_size() -> int` | Dimensão da grelha (`gridDim.x`). |
