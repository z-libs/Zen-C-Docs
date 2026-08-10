# Zen C Language Server Protocol (LSP)

Zen C ships a Language Server (LSP) binary, `zc-lsp`, that provides editor features like autocompletion, go-to-definition, and error diagnostics.

## Starting the Server

`zc-lsp` is a standalone binary installed alongside `zc`. (The legacy `zc lsp` subcommand still works as a deprecated alias.) You can start it manually (though your editor usually handles this) with:

```bash
zc-lsp
```

It communicates over standard input/output (stdio).

## Editor Configuration

### VS Code

For Visual Studio Code, use the official Zen C extension:

- **Repository**: [zenc-lang/vscode-zenc](https://github.com/zenc-lang/vscode-zenc)

Install the extension directly from the **[Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=zenc-lang.zenc)**.

Alternatively, you can build the `.vsix` from source.

### Vim / Neovim

Support for Vim and Neovim is provided via the `Zen-C.vim` plugin, which includes syntax highlighting and LSP configuration helpers.

- **Repository**: [davidscholberg/Zen-C.vim](https://github.com/davidscholberg/Zen-C.vim)

#### Neovim (`lazy.nvim` example)

If you are using `nvim-lspconfig`, you can register `zc` as a custom server:

```lua
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.zenc then
  configs.zenc = {
    default_config = {
      cmd = { 'zc-lsp' },
      filetypes = { 'zenc', 'zc' },
      root_dir = lspconfig.util.root_pattern('.git', 'build.bat', 'Makefile'),
      settings = {},
    },
  }
end

lspconfig.zenc.setup {}
```

### Zed

To configure Zen C in Zed, add the following to your `settings.json` or language configuration:

```json
{
  "lsp": {
    "zenc": {
      "binary": {
        "path": "zc-lsp"
      }
    }
  },
  "languages": {
    "Zen C": {
      "language_servers": ["zenc"]
    }
  }
}
```

### Generic Editors (Sublime, Emacs, etc.)

For any editor that supports generic LSP clients:

1.  **Command**: `zc-lsp`
2.  **Transport**: `stdio`
3.  **File Extensions**: `.zc`

## Features

- **Diagnostics**: Real-time syntax and type errors.
- **Go to Definition**: Jump to struct, function, and variable definitions.
- **Autocompletion**: Context-aware suggestions for fields and methods.
- **Hover**: Type information and documentation on hover (including custom DSL plugins).
