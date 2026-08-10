+++
title = "16. 診斷系統"
weight = 16
+++

# 16. 診斷系統 {#16-zhen-duan-xi-tong}


Zen C 提供了一個分類診斷系統，可以對編譯器警告進行粒度控制。這有助於在保持高程式碼品質標準的同時，減少與外部 C 程式碼交互時的摩擦。

#### 診斷類別

警告按邏輯類別分組。可以使用編譯器標誌全局啟用或禁用每個類別。

| 類別 | 描述 | 默認值 |
| :--- | :--- | :--- |
| **`INTEROP`** | 與導入 C 標頭檔和未定義的外部函數相關的警告。 | **OFF** |
| **`PEDANTIC`** | 針對潛在問題或程式碼品質的額外嚴格檢查。 | **OFF** |
| **`UNUSED`** | 對已定義但未使用的變數、參數或函數的警告。 | **ON** |
| **`SAFETY`** | 關鍵安全警告，如空指標存取或除以零。 | **ON** |
| **`LOGIC`** | 與邏輯相關的警告，如不可達程式碼或常量比較。 | **ON** |
| **`CONVERSION`** | 隱式或窄化型別轉換的警告。 | **ON** |
| **`STYLE`** | 編碼風格警告，如變數遮蔽 (shadowing)。 | **ON** |

#### 編譯器標誌

你可以使用 `-W`（啟用）和 `-Wno-`（禁用）標誌，後跟類別名稱或特定診斷 ID 來控制診斷。

##### 類別標誌

- `-Winterop`: 啟用所有與互操作性相關的警告。
- `-Wno-unused`: 特別靜音未使用變數/參數的警告。
- `-Wsafety`: 確保所有安全檢查都處於活動狀態。
- `-Wall`: 啟用所有主要的診斷類別。
- `-Wextra`: 啟用更嚴格的診斷（相當於 `-Wpedantic`）。

##### 使用範例

```bash
# 啟用 C 互操作性警告進行編譯
zc app.zc -Winterop

# 啟用除未使用程式碼外的所有警告進行編譯
zc app.zc -Wall -Wno-unused
```

#### C 互操作性摩擦

默认情况下，Zen C 會抑制可能屬於 C 標準庫的函數的“未定義函數”警告（`INTEROP` 類別為 **OFF**）。

如果你希望編譯器嚴格標記每個未定義的函數（例如，為了發現拼寫錯誤），請啟用 interop 類別：

```bash
zc main.zc -Winterop
```

啟用後，編譯器將為常見的 C 函數提供有用的建議：
```
warning: Undefined function 'abs'
  --> main.zc:5:13
   |
5  |     let x = abs(-5);
   |             ^ here
   |
   = note: If this is a C function, it might need to be whitelisted in 'zenc.json'
```

#### 白名單

如果你經常使用特定的 C 庫，並希望在啟用 `-Winterop` 的情況下不被特定函數干擾，可以在 `zenc.json` 配置檔案中的 `c_function_whitelist` 中添加它們。

---

## 標準庫

Zen C 包含一個涵蓋基本功能的標準庫 (`std`)。

[瀏覽標準庫文檔](../docs/std/README.md)

### 核心模塊

<details>
<summary>點擊查看所有標準庫模塊</summary>

| 模塊 | 描述 | 文檔 |
| :--- | :--- | :--- |
| **`std/bigfloat.zc`** | 任意精度浮點運算。 | [文檔](../docs/std/bigfloat.md) |
| **`std/bigint.zc`** | 任意精度整數 `BigInt`。 | [文檔](../docs/std/bigint.md) |
| **`std/bits.zc`** | 底層位運算操作 (`rotl`, `rotr` 等)。 | [文檔](../docs/std/bits.md) |
| **`std/complex.zc`** | 複數算術 `Complex`。 | [文檔](../docs/std/complex.md) |
| **`std/vec.zc`** | 可增長動態數組 `Vec<T>`。 | [文檔](../docs/std/vec.md) |
| **`std/string.zc`** | 堆分配的 `String` 類型，支持 UTF-8。 | [文檔](../docs/std/string.md) |
| **`std/queue.zc`** | 先進先出隊列 (環形緩衝區)。 | [文檔](../docs/std/queue.md) |
| **`std/map.zc`** | 泛型哈希表 `Map<V>`。 | [文檔](../docs/std/map.md) |
| **`std/fs.zc`** | 文件系統操作。 | [文檔](../docs/std/fs.md) |
| **`std/io.zc`** | 標準輸入/輸出 (`print`/`println`)。 | [文檔](../docs/std/io.md) |
| **`std/option.zc`** | 可選值 (`Some`/`None`)。 | [文檔](../docs/std/option.md) |
| **`std/result.zc`** | 錯誤處理 (`Ok`/`Err`)。 | [文檔](../docs/std/result.md) |
| **`std/path.zc`** | 跨平台路徑操作。 | [文檔](../docs/std/path.md) |
| **`std/env.zc`** | 進程環境變量。 | [文檔](../docs/std/env.md) |
| **`std/net/`** | TCP, UDP, HTTP, DNS, URL. | [文檔](../docs/std/net.md) |
| **`std/thread.zc`** | 線程與同步。 | [文檔](../docs/std/thread.md) |
| **`std/time.zc`** | 時間測量與睡眠。 | [文檔](../docs/std/time.md) |
| **`std/json.zc`** | JSON 解析與序列化。 | [文檔](../docs/std/json.md) |
| **`std/stack.zc`** | 後進先出棧 `Stack<T>`。 | [文檔](../docs/std/stack.md) |
| **`std/set.zc`** | 泛型哈希集合 `Set<T>`。 | [文檔](../docs/std/set.md) |
| **`std/process.zc`** | 進程執行與管理。 | [文檔](../docs/std/process.md) |
| **`std/regex.zc`** | 正則表達式 (基於 TRE)。 | [文檔](../docs/std/regex.md) |
| **`std/simd.zc`** | 原生 SIMD 向量類型。 | [文檔](../docs/std/simd.md) |

</details>

---

## 工具鏈

Zen C 提供內置的語言服務器 (LSP) 和 REPL 以增強開發體驗。

### 語言服務器 (LSP)

Zen C 語言服務器 (LSP) 支持標準的 LSP 特性，用於編輯器集成：

*   **轉到定義**
*   **查找引用**
*   **懸停資訊** (包含自定義 DSL 插件)
*   **補全** (函數/結構體名，方法/字段的點補全)
*   **文檔符號** (大綱)
*   **簽名幫助**
*   **診斷** (語法/語義錯誤)

啟動語言服務器（通常在編輯器的 LSP 設置中配置）：

```bash
zc-lsp
```

它通過標準 I/O (JSON-RPC 2.0) 進行通信。

### REPL

Read-Eval-Print Loop 允許你交互式地嘗試 Zen C 代碼。

```bash
zc-repl
```

#### 特性

*   **交互式編碼**：輸入表達式或語句以立即求值。
*   **持久歷史**：命令保存在 `~/.zprep_history` 中。
*   **啟動腳本**：自動加載 `~/.zprep_init.zc` 中的命令。

#### 命令

| 命令 | 描述 |
|:---|:---|
| `:help` | 顯示可用命令。 |
| `:reset` | 清除當前會話歷史 (變量/函數)。 |
| `:vars` | 顯示活躍變量。 |
| `:funcs` | 顯示用戶定義的函數。 |
| `:structs` | 顯示用戶定義的結構體。 |
| `:imports` | 顯示活躍導入。 |
| `:history` | 顯示會話輸入歷史。 |
| `:type <expr>` | 顯示表達式的類型。 |
| `:c <stmt>` | 顯示語句生成的 C 代碼。 |
| `:time <expr>` | 基准測試表達式 (運行 1000 次迭代)。 |
| `:edit [n]` | 在 `$EDITOR` 中編輯命令 `n` (默認：最後一條)。 |
| `:save <file>` | 將當前會話保存到 `.zc` 文件。 |
| `:load <file>` | 將 `.zc` 文件加載並執行到會話中。 |
| `:watch <expr>` | 監視表達式 (每次輸入後重新求值)。 |
| `:unwatch <n>` | 移除監視。 |
| `:undo` | 從會話中移除最後一條命令。 |
| `:delete <n>` | 移除索引為 `n` 的命令。 |
| `:clear` | 清屏。 |
| `:quit` | 退出 REPL。 |
| `! <cmd>` | 運行 shell 命令 (如 `!ls`)。 |

---

### 語言伺服器協定 (LSP)

Zen C 包含一個內建的語言伺服器，用於編輯器整合。

- **[安裝與設定指南](translations/LSP_ZH_TW.md)**
- **支援的編輯器**: VS Code, Neovim, Vim, Zed, 以及任何支援 LSP 的編輯器。

使用 `zc-lsp` 啟動服務器。

### Zen C 調試

Zen C 程序可以使用標準的 C 調試器（如 **LLDB** 或 **GDB**）進行調試。

#### Visual Studio Code

為了在 VS Code 中獲得最佳體驗，請安裝官方的 [Zen C 擴充功能](https://marketplace.visualstudio.com/items?itemName=Z-libs.zenc)。對於調試，您可以使用 **C/C++**（由 Microsoft 提供）或 **CodeLLDB** 擴充功能。

將這些配置添加到您的 `.vscode` 目錄中，以啟用一鍵調試：

**`tasks.json`** (構建任務):
```json
{
    "label": "Zen C: Build Debug",
    "type": "shell",
    "command": "zc",
    "args": [ "${file}", "-g", "-o", "${fileDirname}/app", "-O0" ],
    "group": { "kind": "build", "isDefault": true }
}
```

**`launch.json`** (調試器):
```json
{
    "name": "Zen C: Debug (LLDB)",
    "type": "lldb",
    "request": "launch",
    "program": "${fileDirname}/app",
    "preLaunchTask": "Zen C: Build Debug"
}
```

## 編譯器支持與兼容性

Zen C 旨在與大多數 C11 編譯器配合使用。某些特性依賴於 GNU C 擴展，但這些擴展通常在其他編譯器中也能工作。使用 `--cc` 標誌切換後端。

```bash
zc run app.zc --cc clang
zc run app.zc --cc zig
```

### 測試套件狀態

<details>
<summary>點擊查看編譯器支持詳情</summary>

| 編譯器 | 通過率 | 受支持特性 | 已知局限性 |
|:---|:---:|:---|:---|
| **GCC** | **100% (全面)** | 所有特性 | 無. |
| **Clang** | **100% (全面)** | 所有特性 | 無. |
| **Zig** | **100% (全面)** | 所有特性 | 無. 使用 `zig cc` 作為替代 C 編譯器. |
| **TCC** | **98% (高)** | 結構體, 泛型, Trait, 模式匹配 | 不支持 Intel ASM, 不支持 `__attribute__((constructor))`. |

</details>

{% alert(type="warning") %}
**編譯器構建警告：** 雖然 **Zig CC** 作為 Zen C 程序的後端非常出色，但使用它構建 *Zen C 編譯器本身*可能會通過驗證，但會生成無法通過測試的不穩定二進制文件。我們建議使用 **GCC** 或 **Clang** 構建編譯器，並僅將 Zig 用作操作代碼的後端。
{% end %}

### 使用 Zig 構建

Zig 的 `zig cc` 命令提供了 GCC/Clang 的替代方案，具有出色的跨平台編譯支持。使用 Zig：

```bash
# 使用 Zig 編譯並運行 Zen C 程序
zc run app.zc --cc zig

# 使用 Zig 構建 Zen C 編譯器本身
make zig
```

### C++ 互操作

Zen C 可以通過 `--cpp` 標誌生成 C++ 兼容的代碼，從而實現與 C++ 庫的無縫集成。

```bash
# 直接使用 g++ 編譯
zc app.zc --cpp

# 或者轉譯用於手動構建
zc transpile app.zc --cpp
g++ out.c my_cpp_lib.o -o app
```

#### 在 Zen C 中使用 C++

包含 C++ 頭文件並在 `raw` 塊中使用 C++ 代碼：

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

{% alert(type="note") %}
`--cpp` 標誌會將後端切換為 `g++` 並發出 C+ 兼容的代碼（使用 `auto` 代替 `__auto_type`，使用函數重載代替 `_Generic`，以及對 `void*` 進行顯式轉換）。
{% end %}

#### CUDA 互操作

Zen C 通過轉譯為 **CUDA C++** 來支持 GPU 編程。這使你在維持 Zen C 人體工程學語法的同時，能夠利用內核中的強大 C++ 特性（模板、constexpr）。

```bash
# 直接使用 nvcc 編譯
zc run app.zc --cuda

# 或者轉譯用於手動構建
zc transpile app.zc --cuda -o app.cu
nvcc app.cu -o app
```

#### CUDA 特定屬性

| 屬性 | CUDA 等效項 | 描述 |
|:---|:---|:---|
| `@global` | `__global__` | 內核函數 (運行在 GPU，從主機調用) |
| `@device` | `__device__` | 設備函數 (運行在 GPU，從 GPU 調用) |
| `@host` | `__host__` | 主機函數 (明確僅 CPU 運行) |

#### 內核啟動語法

Zen C 提供了一個簡潔的 `launch` 語句用於調用 CUDA 內核：

```zc
launch kernel_name(args) with {
    grid: num_blocks,
    block: threads_per_block,
    shared_mem: 1024,  // 可選
    stream: my_stream   // 可選
};
```

這轉譯為：`kernel_name<<<grid, block, shared, stream>>>(args);`

#### 編寫 CUDA 內核

使用帶有 `@global` 的 Zen C 函數語法和 `launch` 語句：

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

    // ... 初始化數據 ...
    
    launch add_kernel(d_a, d_b, d_c, N) with {
        grid: (N + 255) / 256,
        block: 256
    };
    
    cuda_sync();
}
```

#### 標準庫 (`std/cuda.zc`)
Zen C 為常見的 CUDA 操作提供了一個標準庫，以減少 `raw` 塊的使用：

```zc
import "std/cuda.zc"

// 內存管理
let d_ptr = cuda_alloc<float>(1024);
cuda_copy_to_device(d_ptr, h_ptr, 1024 * sizeof(float));
defer cuda_free(d_ptr);

// 同步
cuda_sync();

// 線程索引 (在內核內部使用)
let i = thread_id(); // 全局索引
let bid = block_id();
let tid = local_id();
```

{% alert(type="note") %}
**注意：** `--cuda` 標誌設置 `nvcc` 為編譯器並隱含 `--cpp` 模式。需要安裝 NVIDIA CUDA Toolkit。
{% end %}

### C23 支援

當使用相容的後端編譯器（GCC 14+, Clang 14+）時，Zen C 支援現代 C23 特性。

-   **`auto`**: 如果 `__STDC_VERSION__ >= 202300L`，Zen C 會自動將型別推導映射到標準 C23 `auto`。
-   **`_BitInt(N)`**: 使用 `iN` 和 `uN` 型別（例如 `i256`, `u12`, `i24`）存取 C23 任意位元寬度整數。

### Objective-C 互操作

Zen C 可以通過 `--objc` 標誌編譯為 Objective-C (`.m`)，允許你使用 Objective-C 框架（如 Cocoa/Foundation）和語法。

```bash
# 使用 clang (或 gcc/gnustep) 編譯
zc app.zc --objc --cc clang
```

#### 在 Zen C 中使用 Objective-C

使用 `include` 包含頭文件，並在 `raw` 塊中使用 Objective-C 語法 (`@interface`, `[...]`, `@""`)。

```zc
//> macos: framework: Foundation
//> linux: cflags: -fconstant-string-class=NSConstantString -D_NATIVE_OBJC_EXCEPTIONS
//> linux: link: -lgnustep-base -lobjc

include <Foundation/Foundation.h>

fn main() {
    raw {
        NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
        NSLog(@"來自 Objective-C 的問候！");
        [pool drain];
    }
    println "Zen C 也能正常工作！";
}
```

{% alert(type="note") %}
**注意：** Zen C 字符串插值通過調用 `debugDescription` 或 `description` 同樣適用於 Objective-C 對象 (`id`)。
{% end %}


---

## 貢獻

我們歡迎各類貢獻！無論是修復 Bug、完善文檔，還是提出新功能建議。

請參閱 [CONTRIBUTING_ZH_TW.md](CONTRIBUTING_ZH_TW.md) 了解有關如何貢獻、運行測試和提交拉取請求的詳細指南。

---

## 安全

關於安全漏洞報告的說明，請參閱 [SECURITY_ZH_TW.md](SECURITY_ZH_TW.md)。

---

## 致謝與歸属

本項目使用了第三方庫。完整許可證文本可在 `LICENSES/` 目錄中找到。

*   **[cJSON](https://github.com/DaveGamble/cJSON)** (MIT 許可證)：用於語言服務器中的 JSON 解析和生成。
*   **[zc-ape](https://github.com/OEvgeny/zc-ape)** (MIT 許可證)：由 [Eugene Olonov](https://github.com/OEvgeny) 開發的原版 Zen-C 實際上便攜的可執行文件 (APE) 端口。
*   **[Cosmopolitan Libc](https://github.com/jart/cosmopolitan)** (ISC 許可證)：使 APE 成為可能納基礎庫。
*   **[TRE](https://github.com/laurikari/tre)** (BSD 許可證)：用於標準庫中的正則表達式引擎。
*   **[zenc.vim](https://github.com/zenc-lang/zenc.vim)** (MIT 許可證)：官方 Vim/Neovim 插件，主要作者為 **[davidscholberg](https://github.com/davidscholberg)**。

---

<div align="center">
  <p>
    Copyright © 2026 Zen C 編程語言。<br>
    今天就開始你的旅程。
  </p>
  <p>
    <a href="https://discord.com/invite/q6wEsCmkJP">Discord</a> •
    <a href="https://github.com/zenc-lang/zenc">GitHub</a> •
    <a href="https://github.com/zenc-lang/docs">文檔</a> •
    <a href="https://github.com/zenc-lang/awesome-zenc">範例</a> •
    <a href="https://github.com/zenc-lang/rfcs">RFC</a> •
    <a href="CONTRIBUTING_ZH_TW.md">貢獻</a>
  </p>
</div>
