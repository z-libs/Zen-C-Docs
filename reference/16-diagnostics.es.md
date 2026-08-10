+++
title = "16. Sistema de Diagnóstico"
weight = 16
+++

# 16. Sistema de Diagnóstico {#16-sistema-de-diagnostico}


Zen C presenta un sistema de diagnóstico categorizado que proporciona un control granular sobre las advertencias del compilador. Esto ayuda a mantener altos estándares de calidad del código al tiempo que reduce la fricción al interactuar con código C externo.

#### Categorías de Diagnóstico

Las advertencias se agrupan en categorías lógicas. Cada categoría puede habilitarse o deshabilitarse globalmente mediante indicadores del compilador.

| Categoría | Descripción | Por defecto |
| :--- | :--- | :--- |
| **`INTEROP`** | Advertencias relacionadas con las importaciones de cabeceras C y funciones externas no definidas. | **OFF** |
| **`PEDANTIC`** | Comprobaciones extra rigurosas para problemas potenciales o calidad del código. | **OFF** |
| **`UNUSED`** | Advertencias para variables, parámetros o funciones definidos pero no utilizados. | **ON** |
| **`SAFETY`** | Advertencias críticas de seguridad como el acceso a punteros nulos o la división por cero. | **ON** |
| **`LOGIC`** | Advertencias relacionadas con la lógica, como código inalcanzable o comparaciones de constantes. | **ON** |
| **`CONVERSION`** | Advertencias para conversiones de tipo implícitas o restrictivas. | **ON** |
| **`STYLE`** | Advertencias sobre el estilo de codificación, como el sombreado de variables (shadowing). | **ON** |

#### Indicadores del Compilador

Puedes controlar los diagnósticos utilizando las flags `-W` (activar) y `-Wno-` (desactivar) seguidas del nombre de una categoría o de un ID de diagnóstico específico.

##### Indicadores de Categoría

- `-Winterop`: Activa todas las advertencias relacionadas con la interoperabilidad.
- `-Wno-unused`: Silencia específicamente las advertencias por variables/parámetros no utilizados.
- `-Wsafety`: Asegura que todas las comprobaciones de seguridad estén activas.
- `-Wall`: Activa todas las categorías de diagnóstico principales.
- `-Wextra`: Activa diagnósticos aún más rigurosos (equivalente a `-Wpedantic`).

##### Ejemplo de Uso

```bash
# Compilar con las advertencias de interoperabilidad C activadas
zc app.zc -Winterop

# Compilar con todas las advertencias activadas excepto para el código no utilizado
zc app.zc -Wall -Wno-unused
```

#### Fricción en la Interoperabilidad C

Por defecto, Zen C suprime las advertencias de "Función no definida" para las funciones que probablemente se encuentren en las bibliotecas estándar de C (la categoría `INTEROP` está **OFF**).

Si deseas que el compilador marque estrictamente cada función no definida (por ejemplo, para detectar errores tipográficos), activa la categoría interop:

```bash
zc main.zc -Winterop
```

Cuando está activada, el compilador proporcionará sugerencias útiles para las funciones comunes de C:
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

Si utilizas con frecuencia una biblioteca C específica y deseas mantener `-Winterop` activado sin que te molesten funciones específicas, puedes añadirlas a la `c_function_whitelist` en el archivo de configuración `zenc.json`.

## Herramientas


Zen C proporciona un Servidor de Lenguaje y un REPL integrados para mejorar la experiencia de desarrollo.

### Servidor de Lenguaje (LSP)

El Servidor de Lenguaje de Zen C (LSP) soporta las características estándar de LSP para integración con editores, proporcionando:

*   **Ir a la Definición**
*   **Encontrar Referencias**
*   **Información de Hover** (incluyendo plugins DSL personalizados)
*   **Autocompletado** (Nombres de funciones/structs, autocompletado tras punto para métodos/campos)
*   **Símbolos del Documento** (Esquema)
*   **Ayuda de Firma**
*   **Diagnósticos** (Errores sintácticos/semánticos)

Para iniciar el servidor de lenguaje (normalmente configurado en los ajustes de LSP de tu editor):

```bash
zc-lsp
```

Se comunica mediante I/O estándar (JSON-RPC 2.0).

### REPL

El bucle Read-Eval-Print te permite experimentar con el código de Zen C de forma interactiva.

```bash
zc-repl
```

#### Características

*   **Codificación Interactiva**: Escribe expresiones o sentencias para su evaluación inmediata.
*   **Historial Persistente**: Los comandos se guardan en `~/.zprep_history`.
*   **Script de Inicio**: Carga automáticamente comandos desde `~/.zprep_init.zc`.

#### Comandos

| Comando | Descripción |
|:---|:---|
| `:help` | Muestra los comandos disponibles. |
| `:reset` | Limpia el historial de la sesión actual (variables/funciones). |
| `:vars` | Muestra las variables activas. |
| `:funcs` | Muestra las funciones definidas por el usuario. |
| `:structs` | Muestra los structs definidos por el usuario. |
| `:imports` | Muestra las importaciones activas. |
| `:history` | Muestra el historial de entrada de la sesión. |
| `:type <expr>` | Muestra el tipo de una expresión. |
| `:c <stmt>` | Muestra el código C generado para una sentencia. |
| `:time <expr>` | Benchmark de una expresión (ejecuta 1000 iteraciones). |
| `:edit [n]` | Edita el comando `n` (por defecto: el último) en `$EDITOR`. |
| `:save <file>` | Guarda la sesión actual en un archivo `.zc`. |
| `:load <file>` | Carga y ejecuta un archivo `.zc` en la sesión. |
| `:watch <expr>` | Observa una expresión (se revalúa tras cada entrada). |
| `:unwatch <n>` | Elimina una observación. |
| `:undo` | Elimina el último comando de la sesión. |
| `:delete <n>` | Elimina el comando en el índice `n`. |
| `:clear` | Limpia la pantalla. |
| `:quit` | Sale del REPL. |
| `! <cmd>` | Ejecuta un comando de shell (ej. `!ls`). |

---

### Protocolo de Servidor de Lenguaje (LSP)

Zen C incluye un Servidor de Lenguaje integrado para la integración con editores.

- **[Guía de Instalación y Configuración](translations/LSP_ES.md)**
- **Editores Soportados**: VS Code, Neovim, Vim, Zed, y cualquier editor capaz de LSP.

Usa `zc-lsp` para iniciar el servidor.

### Depuración de Zen C

Los programas de Zen C se pueden depurar utilizando depuradores de C estándar como **LLDB** o **GDB**.

#### Visual Studio Code

Para obtener la mejor experiencia en VS Code, instale la [extensión oficial de Zen C](https://marketplace.visualstudio.com/items?itemName=Z-libs.zenc). Para la depuración, puede utilizar la extensión **C/C++** (de Microsoft) o **CodeLLDB**.

Agregue estas configuraciones a su directorio `.vscode` para habilitar la depuración con un solo clic:

**`tasks.json`** (Tarea de compilación):
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

## Soporte del Compilador y Compatibilidad

Zen C está diseñado para funcionar con la mayoría de los compiladores C11. Algunas características dependen de extensiones de GNU C, pero estas suelen funcionar en otros compiladores. Usa la flag `--cc` para cambiar de backend.

```bash
zc run app.zc --cc clang
zc run app.zc --cc zig
```

### Estado de la Suite de Pruebas

<details>
<summary>Click para ver detalles de Soporte del Compilador</summary>

| Compilador | Tasa de Acierto | Características Soportadas | Limitaciones Conocidas |
|:---|:---:|:---|:---|
| **GCC** | **100% (Completo)** | Todas las características | Ninguna. |
| **Clang** | **100% (Completo)** | Todas las características | Ninguna. |
| **Zig** | **100% (Completo)** | Todas las características | Ninguna. Usa `zig cc` como compilador C. |
| **TCC** | **98% (Alto)** | Estructuras, Genéricos, Traits, Coincidencia de Patrones | Sin ASM Intel, Sin `__attribute__((constructor))`. |

</details>

{% alert(type="warning") %}
**ADVERTENCIA DE COMPILACIÓN:** Aunque **Zig CC** funciona excelentemente como backend para tus programas Zen C, compilar el *propio compilador Zen C* con el puede verificar pero producir un binario inestable que falla en las pruebas. Recomendamos compilar el compilador con **GCC** o **Clang** y usar Zig solo como backend para tu código operativo.
{% end %}

### Construyendo con Zig

El comando `zig cc` de Zig proporciona un reemplazo directo para GCC/Clang con un excelente soporte de compilación cruzada (cross-compilation). Para usar Zig:

```bash
# Compilar y ejecutar un programa Zen C con Zig
zc run app.zc --cc zig

# Construir el propio compilador Zen C con Zig
make zig
```

### Interop con C++

Zen C puede generar código compatible con C++ con la flag `--cpp`, permitiendo una integración perfecta con bibliotecas de C++.

```bash
# Compilación directa con g++
zc app.zc --cpp

# O transpilar para construcción manual
zc transpile app.zc --cpp
g++ out.c mi_lib_cpp.o -o app
```

#### Usando C++ en Zen C

Incluye cabeceras de C++ y usa bloques `raw` para el código C++:

```zc
include <vector>
include <iostream>

raw {
    std::vector<int> hacer_vec(int a, int b) {
        return {a, b};
    }
}

fn main() {
    let v = hacer_vec(1, 2);
    raw { std::cout << "Tamaño: " << v.size() << std::endl; }
}
```

{% alert(type="note") %}
La flag `--cpp` cambia el backend a `g++` y emite código compatible con C++ (usa `auto` en lugar de `__auto_type`, sobrecarga de funciones en lugar de `_Generic`, y casts explícitos para `void*`).
{% end %}

#### Interop con CUDA

Zen C soporta la programación de GPU transpilando a **CUDA C++**. Esto te permite aprovechar las potentes características de C++ (plantillas, constexpr) dentro de tus kernels mientras mantienes la sintaxis ergonómica de Zen C.

```bash
# Compilación directa con nvcc
zc run app.zc --cuda

# O transpilar para construcción manual
zc transpile app.zc --cuda -o app.cu
nvcc app.cu -o app
```

#### Atributos Específicos de CUDA

| Atributo | Equivalente CUDA | Descripción |
|:---|:---|:---|
| `@global` | `__global__` | Función de kernel (se ejecuta en GPU, se llama desde el host) |
| `@device` | `__device__` | Función de dispositivo (se ejecuta en GPU, se llama desde GPU) |
| `@host` | `__host__` | Función de host (explícitamente solo CPU) |

#### Sintaxis de Lanzamiento de Kernel

Zen C proporciona una sentencia `launch` limpia para invocar kernels de CUDA:

```zc
launch nombre_del_kernel(args) with {
    grid: num_bloques,
    block: hilos_por_bloque,
    shared_mem: 1024,  // Opcional
    stream: mi_stream   // Opcional
};
```

Esto se transpila a: `nombre_del_kernel<<<grid, bloque, compartido, stream>>>(args);`

#### Escribiendo Kernels de CUDA

Usa la sintaxis de funciones de Zen C con `@global` y la sentencia `launch`:

```zc
import "std/cuda.zc"

@global
fn kernel_suma(a: float*, b: float*, c: float*, n: int) {
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

    // ... inicialización de datos ...
    
    launch kernel_suma(d_a, d_b, d_c, N) with {
        grid: (N + 255) / 256,
        block: 256
    };
    
    cuda_sync();
}
```

#### Biblioteca Estándar (`std/cuda.zc`)
Zen C proporciona una biblioteca estándar para operaciones comunes de CUDA para reducir los bloques `raw`:

```zc
import "std/cuda.zc"

// Gestión de memoria
let d_ptr = cuda_alloc<float>(1024);
cuda_copy_to_device(d_ptr, h_ptr, 1024 * sizeof(float));
defer cuda_free(d_ptr);

// Sincronización
cuda_sync();

// Indexación de hilos (usar dentro de kernels)
let i = thread_id(); // Índice global
let bid = block_id();
let tid = local_id();
```

{% alert(type="note") %}
**Nota:** La flag `--cuda` establece `nvcc` como el compilador e implica el modo `--cpp`. Requiere el NVIDIA CUDA Toolkit.
{% end %}

### Soporte C23

Zen C soporta características modernas de C23 cuando se utiliza un compilador backend compatible (GCC 14+, Clang 14+).

- **`auto`**: Zen C mapea automáticamente la inferencia de tipos a `auto` estándar de C23 si `__STDC_VERSION__ >= 202300L`.
- **`_BitInt(N)`**: Use tipos `iN` y `uN` (ej. `i256`, `u12`, `i24`) para acceder a enteros de ancho arbitrario de C23.

### Interop con Objective-C

Zen C puede compilarse a Objective-C (`.m`) usando la flag `--objc`, permitiéndote usar frameworks de Objective-C (como Cocoa/Foundation) y su sintaxis.

```bash
# Compilar con clang (o gcc/gnustep)
zc app.zc --objc --cc clang
```

#### Usando Objective-C en Zen C

Usa `include` para las cabeceras y bloques `raw` para la sintaxis de Objective-C (`@interface`, `[...]`, `@""`).

```zc
//> macos: framework: Foundation
//> linux: cflags: -fconstant-string-class=NSConstantString -D_NATIVE_OBJC_EXCEPTIONS
//> linux: link: -lgnustep-base -lobjc

include <Foundation/Foundation.h>

fn main() {
    raw {
        NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
        NSLog(@"¡Hola desde Objective-C!");
        [pool drain];
    }
    println "¡Zen C también funciona!";
}
```

{% alert(type="note") %}
**Nota:** La interpolación de cadenas de Zen C funciona con objetos de Objective-C (`id`) llamando a `debugDescription` o `description`.
{% end %}

## Contribuyendo

¡Damos la bienvenida a las contribuciones! Ya sea corrigiendo errores, añadiendo documentación o proponiendo nuevas características.

Por favor, consulta [CONTRIBUTING_ES.md](CONTRIBUTING_ES.md) para ver las guías detalladas sobre cómo contribuir, ejecutar pruebas y enviar pull requests.

---

## Seguridad

Para instrucciones sobre reportes de seguridad, por favor vea [SECURITY_ES.md](SECURITY_ES.md).

---

## Atribuciones

Este proyecto utiliza bibliotecas de terceros. Los textos completos de las licencias pueden encontrarse en el directorio `LICENSES/`.

*   **[cJSON](https://github.com/DaveGamble/cJSON)** (Licencia MIT): Usado para el parseo y generación de JSON en el Servidor de Lenguaje.
*   **[zc-ape](https://github.com/OEvgeny/zc-ape)** (Licencia MIT): El port original de Ejecutable Realmente Portable de Zen-C por [Eugene Olonov](https://github.com/OEvgeny).
*   **[Cosmopolitan Libc](https://github.com/jart/cosmopolitan)** (Licencia ISC): La biblioteca fundamental que hace posible APE.
*   **[TRE](https://github.com/laurikari/tre)** (Licencia BSD): Usado para el motor de expresiones regulares en la biblioteca estándar.
*   **[zenc.vim](https://github.com/zenc-lang/zenc.vim)** (Licencia MIT): El plugin oficial para Vim/Neovim, escrito principalmente por **[davidscholberg](https://github.com/davidscholberg)**.

---

<div align="center">
  <p>
    Copyright © 2026 Lenguaje de Programación Zen C.<br>
    Comienza tu viaje hoy.
  </p>
  <p>
    <a href="https://discord.com/invite/q6wEsCmkJP">Discord</a> •
    <a href="https://github.com/zenc-lang/zenc">GitHub</a> •
    <a href="https://github.com/zenc-lang/docs">Documentación</a> •
    <a href="https://github.com/zenc-lang/awesome-zenc">Ejemplos</a> •
    <a href="https://github.com/zenc-lang/rfcs">RFCs</a> •
    <a href="CONTRIBUTING_ES.md">Contribuir</a>
  </p>
</div>
