# std/encoding

The `std/encoding` module provides data encoding and decoding utilities.

## Base64 (`std/encoding/base64.zc`)

Base64 encoding implementation (RFC 4648). See [Base64](./base64.md) for the full reference.

### Usage

```zc
import "std/encoding/base64.zc"

fn main() {
    let data = "Hello";
    let encoded = Base64::encode((u8*)data, 5);
    // encoded is "SGVsbG8="
}
```

### Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **encode** | `Base64::encode(data: u8*, len: usize) -> String` | Encodes data into a Base64 string. |
| **decode** | `Base64::decode(data: char*) -> Result<Vec<u8>>` | Decodes a Base64 string into raw bytes, validating length and characters. |

## Hex (`std/encoding/hex.zc`)

Hexadecimal encoding and decoding.

### Usage

```zc
import "std/encoding/hex.zc"

fn main() {
    let data = "Zen";
    let encoded = Hex::encode((u8*)data, 3);
    // encoded is "5a656e"
}
```

### Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | Encodes data into a Hex string. |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | Decodes a Hex string into raw bytes. |
