# std/json

The `std/json` module provides a DOM-style JSON parser and builder implementation for Zen-C. It features a simple API for creating, manipulating, and serializing JSON data with automatic memory management.

## Overview

- **DOM-style**: Hierarchical tree structure of `JsonValue` nodes.
- **Type-safe Accessors**: Check types (`is_string`, `is_number`) and unwrap values safely.
- **Automatic Cleanup**: Implements the `Drop` trait for automatic, recursive memory management.
- **Standards Compliant**: Supports standard JSON types including objects, arrays, strings, numbers, booleans, and null.

## Usage

```zc
import "std/json.zc"

fn main() {
    // Building JSON
    let obj = JsonValue::object();
    obj.set("name", JsonValue::string("Alice"));
    obj.set("age", JsonValue::number(30.0));
    obj.set("active", JsonValue::bool(true));
    
    // Serialization
    let json_str = obj.to_string();
    println "Serialized: {json_str}";

    // Parsing (round trip)
    let parsed_res = JsonValue::parse(json_str);
    free(json_str);
    if (parsed_res.is_ok()) {
        let parsed = parsed_res.unwrap();
        let name = (*parsed).get_string("name").unwrap();
        println "Name: {name}";
    }
} // obj is freed automatically here
```

## Struct Definition

```zc
struct JsonValue {
    kind: JsonType;
    // ... internal fields
}
```

## Methods

### Construction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **null** | `JsonValue::null() -> JsonValue` | Creates a null value. |
| **bool** | `JsonValue::bool(b: bool) -> JsonValue` | Creates a boolean value. |
| **number** | `JsonValue::number(n: double) -> JsonValue` | Creates a numeric value. |
| **string** | `JsonValue::string(s: char*) -> JsonValue` | Creates a string value. |
| **array** | `JsonValue::array() -> JsonValue` | Creates an empty JSON array. |
| **object** | `JsonValue::object() -> JsonValue` | Creates an empty JSON object. |

### Parsing

| Method | Signature | Description |
| :--- | :--- | :--- |
| **parse** | `JsonValue::parse(json: char*) -> Result<JsonValue*>` | Parses a JSON string into a heap-allocated tree. |

### Accessors

| Method | Signature | Description |
| :--- | :--- | :--- |
| **is_null** | `is_null(self) -> bool` | Returns true if the type is null. |
| **is_bool** | `is_bool(self) -> bool` | Returns true if the type is boolean. |
| **is_number** | `is_number(self) -> bool` | Returns true if the type is a number. |
| **is_string** | `is_string(self) -> bool` | Returns true if the type is a string. |
| **is_array** | `is_array(self) -> bool` | Returns true if the type is an array. |
| **is_object** | `is_object(self) -> bool` | Returns true if the type is an object. |
| **as_string** | `as_string(self) -> Option<char*>` | Returns the string pointer if applicable. |
| **as_int** | `as_int(self) -> Option<int>` | Returns the integer value if applicable. |
| **as_float** | `as_float(self) -> Option<double>` | Returns the numeric value if applicable. |
| **as_bool** | `as_bool(self) -> Option<bool>` | Returns the boolean value if applicable. |

### Modification

| Method | Signature | Description |
| :--- | :--- | :--- |
| **push** | `push(self, val: JsonValue)` | Appends a child value to a JSON array. |
| **set** | `set(self, key: char*, val: JsonValue)` | Inserts or updates a key-value pair in a JSON object. |
| **get** | `get(self, key: char*) -> Option<JsonValue*>` | Retrieves a child value from an object by key. |
| **at** | `at(self, index: usize) -> Option<JsonValue*>` | Retrieves a child value from an array by index. |

### Serialization

| Method | Signature | Description |
| :--- | :--- | :--- |
| **to_string** | `to_string(self) -> char*` | Returns a serialized JSON string (caller frees). |

## Memory Management

| Method | Signature | Description |
| :--- | :--- | :--- |
| **free** | `free(self)` | Recursively frees the value and all descendant nodes. |
| **Trait** | `impl Drop for JsonValue` | Automatically triggers recursive `free()` when out of scope. |
