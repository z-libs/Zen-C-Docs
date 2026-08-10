+++
title = "Build Directives"
weight = 28
+++

# Build Directives
<!-- zc-check: skip-file: build-directive example requires external deps (glib/X11) -->

In-source build configuration: linking libraries, include paths,
flags, and OS-guarded directives.

## Zen C (file: app.zc)

```zc
import "std/io.zc"

//> link: -lm
//> include: /usr/local/include
//> lib: /usr/local/lib
//> linux: link: -lX11
//> windows: link: -lws2_32
//> macos: framework: Cocoa
//> pkg-config: glib-2.0
//> define: VERSION=2

fn main() {
    println "Build configured with VERSION={VERSION}";
    println "Libraries linked via directives";
}
```

## C (equivalent: Makefile or CMake)

```makefile
# C requires external build system
CFLAGS += -DVERSION=2 -I/usr/local/include
LDFLAGS += -lm -L/usr/local/lib

ifeq ($(OS),Linux)
    LDFLAGS += -lX11
endif
ifeq ($(OS),Windows)
    LDFLAGS += -lws2_32
endif
ifeq ($(OS),Darwin)
    LDFLAGS += -framework Cocoa
endif

app: app.c
    gcc $(CFLAGS) app.c -o app $(LDFLAGS)
```

## Key Differences

- Build directives inline in source: `//> link: -lfoo`
- `//> lib:` = `-L`, `//> include:` = `-I`, `//> cflags:` = pass-through
- `//> framework:` = macOS framework linking
- `//> define:` = `-D` flag
- `//> pkg-config:` auto-runs `pkg-config --cflags --libs`
- `//> shell:` executes arbitrary shell command during build
- `//> get:` downloads file if it does not exist
- OS guarding: `linux:`, `windows:`, `macos:` (or `darwin:`) prefixes
- Environment variable expansion: `$${HOME}`, `$${ZC_ROOT}`
- C requires separate build system (Makefile, CMake, meson, etc.)

## Output

Build configured with VERSION=2
Libraries linked via directives
