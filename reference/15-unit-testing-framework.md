+++
title = "15. Unit Testing Framework"
weight = 15
+++

# 15. Unit Testing Framework {#15-unit-testing-framework}


Zen C features a built-in testing framework that allows you to write unit tests directly in your source files using the `test` keyword.

#### Syntax
A `test` block contains a descriptive name and a body of code to execute. Tests do not require a `main` function to run.

```zc
test "unittest1" {
    "This is an unittest";

    let a = 3;
    assert(a > 0, "a should be a positive integer");

    "unittest1 passed.";
}
```

#### Running Tests
To run all tests in a file, use the `run` command. The compiler will automatically detect and execute all top-level `test` blocks.

```bash
zc run my_file.zc
```

#### Assertions
Use the built-in `assert(condition, message)` function to verify expectations. If the condition is false, the test will fail and print the provided message.

---

## Tooling

Zen C provides a built-in Language Server and REPL to enhance the development experience. It is also debuggable with LLDB.

### Language Server (LSP)

The Zen C Language Server (LSP) supports standard LSP features for editor integration, providing:

*   **Go to Definition**
*   **Find References**
*   **Hover Information** (including custom DSL plugins)
*   **Completion** (Function/Struct names, Dot-completion for methods/fields)
*   **Document Symbols** (Outline)
*   **Signature Help**
*   **Diagnostics** (Syntax/Semantic errors)

To start the language server (typically configured in your editor's LSP settings):

```bash
zc-lsp
```

It communicates via standard I/O (JSON-RPC 2.0).

### REPL

The Read-Eval-Print Loop allows you to experiment with Zen C code interactively.

```bash
zc-repl
```

#### Features

*   **Interactive Coding**: Type expressions or statements for immediate evaluation.
*   **Persistent History**: Commands are saved to `~/.zprep_history`.
*   **Startup Script**: Auto-loads commands from `~/.zprep_init.zc`.

#### Commands

| Command | Description |
|:---|:---|
| `:help` | Show available commands. |
| `:reset` | Clear current session history (variables/functions). |
| `:vars` | Show active variables. |
| `:funcs` | Show user-defined functions. |
| `:structs` | Show user-defined structs. |
| `:imports` | Show active imports. |
| `:history` | Show session input history. |
| `:type <expr>` | Show the type of an expression. |
| `:c <stmt>` | Show the generated C code for a statement. |
| `:time <expr>` | Benchmark an expression (runs 1000 iterations). |
| `:edit [n]` | Edit command `n` (default: last) in `$EDITOR`. |
| `:save <file>` | Save the current session to a `.zc` file. |
| `:load <file>` | Load and execute a `.zc` file into the session. |
| `:watch <expr>` | Watch an expression (re-evaluated after every entry). |
| `:unwatch <n>` | Remove a watch. |
| `:undo` | Remove the last command from the session. |
| `:delete <n>` | Remove command at index `n`. |
| `:clear` | Clear the screen. |
| `:quit` | Exit the REPL. |
| `! <cmd>` | Run a shell command (e.g. `!ls`). |

---

### Language Server Protocol (LSP)

Zen C includes a built-in Language Server for editor integration.

- **[Installation & Setup Guide](docs/LSP.md)**
- **Supported Editors**: VS Code, Neovim, Vim ([zenc.vim](https://github.com/zenc-lang/zenc.vim)), Zed, and any LSP-capable editor.

Use `zc-lsp` to start the server.

### Debugging Zen C

Zen C programs can be debugged using standard C debuggers like **LLDB** or **GDB**.

#### Visual Studio Code

For the best experience in VS Code, install the official [Zen C extension](https://marketplace.visualstudio.com/items?itemName=Z-libs.zenc). For debugging, you can use the **C/C++** (by Microsoft) or **CodeLLDB** extension.

Add these configurations to your `.vscode` directory to enable one-click debugging:

**`tasks.json`** (Build Task):
```json
{
    "label": "Zen C: Build Debug",
    "type": "shell",
    "command": "zc",
    "args": [ "${file}", "-g", "-o", "${fileDirname}/app", "-O0" ],
    "group": { "kind": "build", "isDefault": true }
}
```

**`launch.json`** (Debugger):
```json
{
    "name": "Zen C: Debug (LLDB)",
    "type": "lldb",
    "request": "launch",
    "program": "${fileDirname}/app",
    "preLaunchTask": "Zen C: Build Debug"
}
```
