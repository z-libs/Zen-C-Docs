+++
title = "16. Sistema de Diagnóstico"
weight = 16
+++

# 16. Sistema de Diagnóstico {#16-sistema-de-diagnostico}


Zen C fornece um sistema de diagnóstico categorizado que permite controle granular sobre os avisos (warnings) do compilador. Isso permite manter altos padrões de qualidade de código enquanto reduz a fricção ao interagir com código C externo.

#### Categorias de Diagnóstico

Os avisos são agrupados em categorias lógicas. Cada categoria pode ser habilitada ou desabilitada globalmente usando flags do compilador.

| Categoria | Descrição | Padrão |
| :--- | :--- | :--- |
| **`INTEROP`** | Avisos relacionados à importação de headers C e funções externas não definidas. | **OFF** |
| **`PEDANTIC`** | Checagens extras rigorosas para potenciais problemas ou qualidade de código. | **OFF** |
| **`UNUSED`** | Avisos para variáveis, parâmetros ou funções definidos mas não utilizados. | **ON** |
| **`SAFETY`** | Avisos de segurança críticos, como acesso a ponteiros nulos ou divisão por zero. | **ON** |
| **`LOGIC`** | Avisos relacionados à lógica, como código inalcançável ou comparações de constantes. | **ON** |
| **`CONVERSION`** | Avisos para conversões de tipo implícitas ou estreitas (narrowing). | **ON** |
| **`STYLE`** | Avisos de estilo de codificação, como sombreamento de variáveis (shadowing). | **ON** |

#### Flags do Compilador

Você pode controlar o diagnóstico usando as flags `-W` (habilitar) e `-Wno-` (desabilitar) seguidas por um nome de categoria ou um ID de diagnóstico específico.

##### Flags de Categoria

- `-Winterop`: Habilita todos os avisos relacionados à interoperabilidade.
- `-Wno-unused`: Silencia especificamente avisos de variáveis/parâmetros não utilizados.
- `-Wsafety`: Garante que todas as checagens de segurança estejam ativas.
- `-Wall`: Habilita todas as principais categorias de diagnóstico.
- `-Wextra`: Habilita diagnósticos ainda mais rigorosos (equivalente a `-Wpedantic`).

##### Exemplo de Uso

```bash
# Compila com avisos de interoperabilidade C habilitados
zc app.zc -Winterop

# Compila com todos os avisos habilitados, exceto para código não utilizado
zc app.zc -Wall -Wno-unused
```

#### Fricção na Interoperabilidade C

Por padrão, Zen C suprime avisos de "Função não definida" para funções que provavelmente estão em bibliotecas padrão C (a categoria `INTEROP` está **OFF**).

Se você deseja que o compilador sinalize rigorosamente cada função não definida (por exemplo, para encontrar erros de digitação), habilite a categoria interop:

```bash
zc main.zc -Winterop
```

Quando habilitado, o compilador fornecerá sugestões úteis para funções C comuns:
```
warning: Undefined function 'abs'
  --> main.zc:5:13
   |
5  |     let x = abs(-5);
   |             ^ here
   |
   = note: If this is a C function, it might need to be whitelisted in 'zenc.json'
```

#### Whitelisting

Se você usa frequentemente uma biblioteca C específica e deseja manter `-Winterop` habilitado sem ser incomodado por funções específicas, você pode adicioná-las no `c_function_whitelist` no arquivo de configuração `zenc.json`.

---

## Biblioteca Padrão

O Zen C inclui a biblioteca padrão (`std`), que cobre as funcionalidades essenciais.

[Navegue pela Documentação da Biblioteca Padrão](../docs/std/README.md)

### Módulos Principais

<details>
<summary>Clique para ver todos os módulos da Biblioteca Padrão</summary>

| Módulo | Descrição | Docs |
| :--- | :--- | :--- |
| **`std/bigfloat.zc`** | Aritmética de ponto flutuante de precisão arbitrária. | [Docs](../docs/std/bigfloat.md) |
| **`std/bigint.zc`** | Inteiro de precisão arbitrária `BigInt`. | [Docs](../docs/std/bigint.md) |
| **`std/bits.zc`** | Operações bit-a-bit de baixo nível (`rotl`, `rotr`, etc). | [Docs](../docs/std/bits.md) |
| **`std/complex.zc`** | Aritmética de números complexos `Complex`. | [Docs](../docs/std/complex.md) |
| **`std/vec.zc`** | Growable dynamic array `Vec<T>`. | [Docs](../docs/std/vec.md) |
| **`std/string.zc`** | Heap-allocated `String` type with UTF-8 support. | [Docs](../docs/std/string.md) |
| **`std/queue.zc`** | FIFO queue (Ring Buffer). | [Docs](../docs/std/queue.md) |
| **`std/map.zc`** | Generic Hash Map `Map<V>`. | [Docs](../docs/std/map.md) |
| **`std/fs.zc`** | File system operations. | [Docs](../docs/std/fs.md) |
| **`std/io.zc`** | Standard Input/Output (`print`/`println`). | [Docs](../docs/std/io.md) |
| **`std/option.zc`** | Optional values (`Some`/`None`). | [Docs](../docs/std/option.md) |
| **`std/result.zc`** | Error handling (`Ok`/`Err`). | [Docs](../docs/std/result.md) |
| **`std/path.zc`** | Cross-platform path manipulation. | [Docs](../docs/std/path.md) |
| **`std/env.zc`** | Process environment variables. | [Docs](../docs/std/env.md) |
| **`std/net/`** | TCP, UDP, HTTP, DNS, URL. | [Docs](../docs/std/net.md) |
| **`std/thread.zc`** | Threads and Synchronization. | [Docs](../docs/std/thread.md) |
| **`std/time.zc`** | Time measurement and sleep. | [Docs](../docs/std/time.md) |
| **`std/json.zc`** | JSON parsing and serialization. | [Docs](../docs/std/json.md) |
| **`std/stack.zc`** | LIFO Stack `Stack<T>`. | [Docs](../docs/std/stack.md) |
| **`std/set.zc`** | Generic Hash Set `Set<T>`. | [Docs](../docs/std/set.md) |
| **`std/process.zc`** | Process execution and management. | [Docs](../docs/std/process.md) |
| **`std/regex.zc`** | Expressões Regulares (baseado em TRE). | [Docs](../docs/std/regex.md) |
| **`std/simd.zc`** | Tipos de vetores SIMD nativos. | [Docs](../docs/std/simd.md) |

</details>

---

## Ferramentas

Zen C inclui um Language Server embutido (`zc-lsp`) e um REPL para aprimorar a experiência do desenvolvimento.

### Language Server (LSP)

O Zen C Language Server (LSP) suporta funcionalidades padrão de LSP para integração com editores, fornecendo:

*   **Go to Definition** - Vá para definição
*   **Find References** - Encontrar referências
*   **Informações de Hover** (incluindo plugins DSL personalizados) - Informação com sobreposição do ponteiro do mouse
*   **Completion** - Auto-completar (Nomes de Função/Struct, compleção de ponto para métodos/campos)
*   **Document Symbols** - Símbolos de documento (Outline)
*   **Signature Help** - Ajuda de assinatura
*   **Diagnostics** - Diagnóstico (Sintaxe/Erros semânticos)

Para inicializar o servidor da linguagem (tipicamente configurado nas configurações LSP do seu editor):

```bash
zc-lsp
```

Ele se comunica via I/O padrão (JSON-RPC 2.0).

### REPL

O Read-Eval-Print Loop permite que você experimente seu código Zen C interativamente.

#### Funcionalidades:

*   **Código Interativo**: Escreva expressões ou declarações para avaliação imediata.
*   **Histórico Persistente**: Comandos são salvos em `~/.zprep_history`.
*   **Script de Inicialização**: Automaticamente carrega comandos de `~/.zprep_init.zc`.

#### Comandos

| Comando | Descrição |
|:---|:---|
| `:help` | Mostra comandos disponíveis. |
| `:reset` | Reinicia a sessão atual (limpa todas as definições). |
| `:vars` | Mostra variáveis ativas. |
| `:funcs` | Mostra funções definidas pelo usuário. |
| `:structs` | Mostra structs definidos pelo usuário. |
| `:imports` | Mostra imports ativos. |
| `:history` | Mostra histórico de entrada da sessão. |
| `:type <expr>` | Mostra o tipo de uma expressão. |
| `:c <stmt>` | Mostra o código C gerado para uma declaração. |
| `:time <expr>` | Faz benchmark de uma expressão (executa 1000 iterações). |
| `:edit [n]` | Edita comando `n` (padrão: último) em `$EDITOR`. |
| `:save <file>` | Salva a sessão atual em um arquivo `.zc`. |
| `:load <file>` | Carrega e executa um arquivo `.zc` na sessão. |
| `:watch <expr>` | Observa uma expressão (reavaliada após cada entrada). |
| `:unwatch <n>` | Remove um watch. |
| `:undo` | Remove o último comando da sessão. |
| `:delete <n>` | Remove comando no índice `n`. |
| `:clear` | Limpa a tela. |
| `:quit` | Sai do REPL. |
| `! <cmd>` | Executa um comando shell (e.g. `!ls`). |

---

### Protocolo de Servidor de Linguagem (LSP)

O Zen C inclui um Servidor de Linguagem integrado para integração com editores.

- **[Guia de Instalação e Configuração](translations/LSP_PT_BR.md)**
- **Editores Suportados**: VS Code, Neovim, Vim, Zed, e qualquer editor capaz de LSP.

Use `zc-lsp` para iniciar o servidor.

### Depuração de Zen C

Os programas Zen C podem ser depurados usando depuradores C padrão, como **LLDB** ou **GDB**.

#### Visual Studio Code

Para a melhor experiência no VS Code, instale a [extensão oficial do Zen C](https://marketplace.visualstudio.com/items?itemName=Z-libs.zenc). Para depuração, você pode usar a extensão **C/C++** (da Microsoft) ou a **CodeLLDB**.

Adicione estas configurações ao seu diretório `.vscode` para habilitar a depuração com um clique:

**`tasks.json`** (Tarefa de Compilação):
```json
{
    "label": "Zen C: Build Debug",
    "type": "shell",
    "command": "zc",
    "args": [ "${file}", "-g", "-o", "${fileDirname}/app", "-O0" ],
    "group": { "kind": "build", "isDefault": true }
}
```

**`launch.json`** (Depurador):
```json
{
    "name": "Zen C: Debug (LLDB)",
    "type": "lldb",
    "request": "launch",
    "program": "${fileDirname}/app",
    "preLaunchTask": "Zen C: Build Debug"
}
```
## Suporte do Compilador e Compatibilidade

Zen C foi projetado para funcionar com a maioria dos compiladores C11. Algumas funcionalidades dependem de extensões GNU C, mas estas frequentemente funcionam em outros compiladores. Use a flag `--cc` para trocar backends.

```bash
zc run app.zc --cc clang
zc run app.zc --cc zig
```

### Status da Suíte de Testes

<details>
<summary>Clique para ver detalhes do Suporte de Compilador</summary>

| Compilador | Taxa de Aprovação | Funcionalidades Suportadas | Limitações Conhecidas |
|:---|:---:|:---|:---|
| **GCC** | **100% (Completo)** | Todas as Funcionalidades | Nenhuma. |
| **Clang** | **100% (Completo)** | Todas as Funcionalidades | Nenhuma. |
| **Zig** | **100% (Completo)** | Todas as Funcionalidades | Nenhuma. Usa `zig cc` como compilador C drop-in. |
| **TCC** | **98% (Alto)** | Estruturas, Genéricos, Traits, Pattern Matching | Sem ASM Intel, Sem `__attribute__((constructor))`. |

</details>

{% alert(type="warning") %}
**AVISO DE COMPILAÇÃO:** Embora **Zig CC** funcione excelentemente como backend para seus programas Zen C, compilar o *próprio compilador Zen C* com ele pode verificar, mas produzir um binário instável que falha nos testes. Recomendamos compilar o compilador com **GCC** ou **Clang** e usar Zig apenas como backend para seu código operacional.
{% end %}

### Build com Zig

O comando `zig cc` do Zig fornece um substituto drop-in para GCC/Clang com excelente suporte de compilação cruzada. Para usar Zig:

```bash
# Compila e executa um programa Zen C com Zig
zc run app.zc --cc zig

# Faz build do próprio compilador Zen C com Zig
make zig
```

### Interoperabilidade C++

Zen C pode gerar código compatível com C++ com a flag `--cpp`, permitindo integração sem emendas com bibliotecas C++.

```bash
# Compilação direta com g++
zc app.zc --cpp

# Ou transpile para build manual
zc transpile app.zc --cpp
g++ out.c my_cpp_lib.o -o app
```

#### Usando C++ em Zen C

Inclua headers C++ e use blocos raw para código C++:

```zc
include <vector>
include <iostream>

raw {
    std::vector<int> make_vec(int a, int b) {
        return {a, b};
    }
}

fn main() {
    let v = make_vec(1, 2);
    raw { std::cout << "Size: " << v.size() << std::endl; }
}
```

> **Nota:** A flag `--cpp` troca o backend para `g++` e emite código compatível com C++ (usa `auto` em vez de `__auto_type`, sobrecarga de função em vez de `_Generic`, e casts explícitos para `void*`).

### Interoperabilidade CUDA

Zen C suporta programação GPU transpilando para **CUDA C++**. Isso permite que você aproveite poderosas funcionalidades C++ (templates, constexpr) dentro de seus kernels enquanto mantém a sintaxe ergonômica do Zen C.

```bash
# Compilação direta com nvcc
zc run app.zc --cuda

# Ou transpile para build manual
zc transpile app.zc --cuda -o app.cu
nvcc app.cu -o app
```

#### Atributos Específicos do CUDA

| Atributo | Equivalente CUDA | Descrição |
|:---|:---|:---|
| `@global` | `__global__` | Função kernel (executa na GPU, chamada do host) |
| `@device` | `__device__` | Função device (executa na GPU, chamada da GPU) |
| `@host` | `__host__` | Função host (explicitamente apenas CPU) |

#### Sintaxe de Launch de Kernel

Zen C fornece uma instrução `launch` limpa para invocar kernels CUDA:

```zc
launch kernel_name(args) with {
    grid: num_blocks,
    block: threads_per_block,
    shared_mem: 1024,  // Opcional
    stream: my_stream   // Opcional
};
```

Isso transpila para: `kernel_name<<<grid, block, shared, stream>>>(args);`

#### Escrevendo Kernels CUDA

Use sintaxe de função Zen C com `@global` e a instrução `launch`:

```zc
import "std/cuda.zc"

@global
fn add_kernel(a: float*, b: float*, c: float*, n: int) {
    let i = thread_id();
    if i < n {
        c[i] = a[i] + b[i];
    }
}

fn main() {
    def N = 1024;
    let d_a = cuda_alloc<float>(N);
    let d_b = cuda_alloc<float>(N); 
    let d_c = cuda_alloc<float>(N);
    defer cuda_free(d_a);
    defer cuda_free(d_b);
    defer cuda_free(d_c);

    // ... init data ...
    
    launch add_kernel(d_a, d_b, d_c, N) with {
        grid: (N + 255) / 256,
        block: 256
    };
    
    cuda_sync();
}
```

#### Biblioteca Padrão (`std/cuda.zc`)
Zen C fornece uma biblioteca padrão para operações CUDA comuns para reduzir blocos `raw`:

```zc
import "std/cuda.zc"

// Gerenciamento de memória
let d_ptr = cuda_alloc<float>(1024);
cuda_copy_to_device(d_ptr, h_ptr, 1024 * sizeof(float));
defer cuda_free(d_ptr);

// Sincronização
cuda_sync();

// Indexação de Thread (use dentro de kernels)
let i = thread_id(); // Índice global
let bid = block_id();
let tid = local_id();
```

{% alert(type="note") %}
**Nota:** A flag `--cuda` define `nvcc` como o compilador e implica modo `--cpp`. Requer o NVIDIA CUDA Toolkit.
{% end %}

### Suporte C23

Zen C suporta funcionalidades modernas de C23 quando usa um compilador backend compatível (GCC 14+, Clang 14+, TCC (parcial)).

- **`auto`**: Zen C automaticamente mapeia inferência de tipo para o `auto` padrão C23 se `__STDC_VERSION__ >= 202300L`.
- **`_BitInt(N)`**: Use tipos `iN` e `uN` (e.g., `i256`, `u12`, `i24`) para acessar inteiros de largura arbitrária do C23.

### Interoperabilidade Objective-C

Zen C pode compilar para Objective-C (`.m`) usando a flag `--objc`, permitindo que você use frameworks Objective-C (como Cocoa/Foundation) e sintaxe.

```bash
# Compila com clang (ou gcc/gnustep)
zc app.zc --objc --cc clang
```

#### Usando Objective-C em Zen C

Use `include` para headers e blocos `raw` para sintaxe Objective-C (`@interface`, `[...]`, `@""`).

```zc
//> macos: framework: Foundation
//> linux: cflags: -fconstant-string-class=NSConstantString -D_NATIVE_OBJC_EXCEPTIONS
//> linux: link: -lgnustep-base -lobjc

include <Foundation/Foundation.h>

fn main() {
    raw {
        NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
        NSLog(@"Hello from Objective-C!");
        [pool drain];
    }
    println "Zen C works too!";
}
```

{% alert(type="note") %}
**Nota:** Interpolação de strings do Zen C funciona com objetos Objective-C (`id`) chamando `debugDescription` ou `description`.
{% end %}


---

## Contribuindo

Nós damos boas-vindas a contribuições! Seja consertando bugs, adicionando documentação ou propondo novas funcionalidades.

Por favor, veja [CONTRIBUTING_PT_BR.md](CONTRIBUTING_PT_BR.md) para diretrizes detalhadas sobre como contribuir, executar testes e submeter pull requests.

---

## Segurança

Para instruções sobre relatórios de segurança, por favor veja [SECURITY_PT_BR.md](SECURITY_PT_BR.md).

---

## Atribuições

Este projeto usa bibliotecas de terceiros. Textos completos de licença podem ser encontrados no diretório `LICENSES/`.

*   **[cJSON](https://github.com/DaveGamble/cJSON)** (Licença MIT): Usado para parsing e geração JSON no Language Server.
*   **[zc-ape](https://github.com/OEvgeny/zc-ape)** (Licença MIT): O port original Actually Portable Executable do Zen-C por [Eugene Olonov](https://github.com/OEvgeny).
*   **[Cosmopolitan Libc](https://github.com/jart/cosmopolitan)** (Licença ISC): A biblioteca fundadora que torna APE possível.
*   **[TRE](https://github.com/laurikari/tre)** (Licença BSD): Usado para o motor de expressões regulares na biblioteca padrão.
*   **[zenc.vim](https://github.com/zenc-lang/zenc.vim)** (Licença MIT): O plugin oficial para Vim/Neovim, escrito principalmente por **[davidscholberg](https://github.com/davidscholberg)**.

---

<div align="center">
  <p>
    Copyright © 2026 Linguagem de Programação Zen C.<br>
    Comece sua jornada hoje.
  </p>
  <p>
    <a href="https://discord.com/invite/q6wEsCmkJP">Discord</a> •
    <a href="https://github.com/zenc-lang/zenc">GitHub</a> •
    <a href="https://github.com/zenc-lang/docs">Documentação</a> •
    <a href="https://github.com/zenc-lang/awesome-zenc">Exemplos</a> •
    <a href="https://github.com/zenc-lang/rfcs">RFCs</a> •
    <a href="CONTRIBUTING_PT_BR.md">Contribuir</a>
  </p>
</div>
