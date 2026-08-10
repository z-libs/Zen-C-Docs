# Zen C Documentation

Welcome to the official documentation repository for the **Zen C** programming language. This repository contains the technical specifications, language reference, and standard library documentation.

## Documentation Index

### Standard Library
The core of Zen C's power lies in its standard library. Detailed documentation for each module can be found in the [std/](std/) directory.

| Module | Description |
| :--- | :--- |
| **[vec](std/vec.md)** | Dynamic array implementation. |
| **[string](std/string.md)** | Modern, safe string handling. |
| **[net](std/net.md)** | High-level networking (TCP, HTTP). |
| **[thread](std/thread.md)** | Concurrency and parallelism. |
| **[json](std/json.md)** | Built-in JSON serialization/deserialization. |

> [!NOTE]
> For a high-level overview of the library, see the **[Standard Library README](std/README.md)**.

### Technical Specifications
Deep dives into the compiler's internals and tooling protocols.

- **[Lexer Specification](lex.md)**: Detailed breakdown of Zen C's tokens and grammar rules.
- **[LSP Protocol](LSP.md)**: Documentation for the Zen C Language Server integration.
- **[Plugin System](PLUGINS.md)**: How to extend the compiler with custom plugins.

### Command-Line Tools

Zen C ships a small set of focused binaries, installed alongside `zc`:

| Binary | Purpose |
| :--- | :--- |
| `zc` | The compiler (`build`, `transpile`, `run`, `check`, ...). |
| `zc-lsp` | Language server (JSON-RPC over stdio). |
| `zc-repl` | Interactive read-eval-print loop (JIT-powered). |
| `zc-doc` | Generates module documentation from source. |
| `zc-format` | Source formatter. |

The legacy subcommands `zc lsp`, `zc repl`, `zc doc`, and `zc format` still work as deprecated aliases that launch the standalone binaries.

## Reference (17 chapters)

| # | Chapter | Description |
|:---|:---|:---|
| 1 | [Variables & Constants](reference/01-variables-constants.md) | let, types, mutability |
| 2 | [Primitive Types](reference/02-primitive-types.md) | int, float, bool, char, etc. |
| 3 | [Aggregate Types](reference/03-aggregate-types.md) | Arrays, slices, tuples |
| 4 | [Functions & Lambdas](reference/04-functions-lambdas.md) | Functions, closures |
| 5 | [Control Flow](reference/05-control-flow.md) | if, while, for, match |
| 6 | [Operators](reference/06-operators.md) | Arithmetic, comparison, sugar operators |
| 7 | [Printing & F-strings](reference/07-printing-interpolation.md) | Output, string interpolation |
| 8 | [Memory & Lifetimes](reference/08-memory-management.md) | Ownership, borrowing |
| 9 | [OOP](reference/09-oop.md) | Traits, impl blocks, methods |
| 10 | [Generics](reference/10-generics.md) | Type-safe templates |
| 11 | [Concurrency](reference/11-concurrency.md) | Stackless async/await |
| 12 | [Advanced](reference/12-advanced.md) | Inline assembly, raw blocks |
| 13 | [Comptime](reference/13-comptime.md) | Compile-time evaluation and metaprogramming |
| 14 | [Interop](reference/14-interop.md) | C, C++, CUDA, Objective-C interop |
| 15 | [Unit Testing](reference/15-unit-testing-framework.md) | test, assert, expect |
| 16 | [Diagnostics](reference/16-diagnostics.md) | Compiler warnings, categories |
| 17 | [MISRA Rules](reference/17-misra-rules.md) | Safety rules, Zen-specific checks |

## Related Resources

- **[zenc](https://github.com/zenc-lang/zenc)**: The core compiler source code.
- **[awesome-zenc](https://github.com/zenc-lang/awesome-zenc)**: A collection of examples and Rosetta Code implementations.

## Contributing to Docs

Documentation is a community effort. If you find a typo, outdated information, or want to contribute a new guide, please open a documentation issue or pull request.
