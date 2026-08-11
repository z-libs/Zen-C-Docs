# std/base64

The `std/base64` module provides RFC 4648 Base64 encoding and decoding. Encoding converts binary data into an ASCII string; decoding reverses the process, validating the input length and characters.

## Overview

- **RFC 4648**: Uses the standard alphabet `A-Z`, `a-z`, `0-9`, `+`, `/` with `=` padding.
- **Round-trip**: `decode(encode(x))` returns the original bytes.
- **Validating**: `decode` rejects invalid lengths and characters via `Result`.

## Usage

```zc
import "std/encoding/base64.zc"
import "std/io.zc"

fn main() {
    let data = (u8*)"foobar";
    let encoded = Base64::encode(data, strlen(data));
    println "Encoded: {encoded.c_str()}";

    let decoded = Base64::decode(encoded.c_str());
    if (decoded.is_ok()) {
        println "Decoded back to {decoded.unwrap().len} bytes";
    }
}
```

## Struct Definition

```zc
struct Base64 {}
```

## Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **encode** | `encode(data: u8*, len: usize) -> String` | Encodes `len` bytes into a Base64 `String`. |
| **decode** | `decode(data: char*) -> Result<Vec<u8>>` | Decodes a Base64 string into a `Vec<u8>`. Returns `Err` on an invalid length or character. |
