# std/string

`String` is a growable, heap-allocated string type. It wraps a `Vec<char>` and ensures null-termination for C compatibility.

## Usage

```zc
import "std/string.zc"

fn main() {
    let s = String::from("Hello");

    // Append requires a pointer to another String
    let part = String::from(" World");
    s.append(&part);
    
    // Iteration (UTF-8 aware)
    for c in s {
        println "{c}";
    }

    // Use c_str() to print
    println "{s.c_str()}"; // Prints "Hello World"
    
    if (s.starts_with("Hello")) {
        // ...
    }
} // s is freed automatically here
```

## Struct Definition

```zc
struct String {
    vec: Vec<char>;
}
```

## Methods

### Construction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `String::new(s: char*) -> String` | Creates a new String from a C string primitive. |
| **from** | `String::from(s: char*) -> String` | Alias for `new`. |
| **from_rune** | `String::from_rune(r: rune) -> String` | Creates a new String from a single `rune`. |
| **from_runes** | `String::from_runes(runes: rune*, count: usize) -> String` | Creates a new String from an array of `runes`. |
| **from_runes_vec** | `String::from_runes_vec(runes: Vec<rune>) -> String` | Creates a new String from a vector of `rune` objects. |

### Modification

| Method | Signature | Description |
| :--- | :--- | :--- |
| **append** | `append(self, other: String*)` | Appends another string to this one. |
| **append_c** | `append_c(self, s: char*)` | Appends a C string literal. |
| **push_rune** | `push_rune(self, r: rune)` | Appends a single Unicode code point (`rune`) to the string. |
| **insert_rune** | `insert_rune(self, idx: usize, r: rune)` | Inserts a `rune` at the specified *character index*. |
| **remove_rune_at** | `remove_rune_at(self, idx: usize) -> rune` | Removes and returns the `rune` at the specified *character index*. |
| **reserve** | `reserve(self, cap: usize)` | Ensures the string has at least `cap` characters of capacity. |
| **clear** | `clear(self)` | Clears the string. |

### Access & Query

| Method | Signature | Description |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | Returns the underlying C string pointer. |
| **length** | `length(self) -> usize` | Returns the length of the string (excluding null terminator). |
| **is_empty** | `is_empty(self) -> bool` | Returns true if length is 0. |
| **to_string** | `to_string(self) -> char*` | Maps to `c_str()`. Used for `{var}` interpolation. |
| **starts_with** | `starts_with(self, prefix: char*) -> bool` | Checks if the string starts with the given prefix. |
| **ends_with** | `ends_with(self, suffix: char*) -> bool` | Checks if the string ends with the given suffix. |
| **contains** | `contains(self, target: char) -> bool` | Checks if the string contains the given character. |
| **contains_str** | `contains_str(self, target: char*) -> bool` | Checks if the string contains the given substring. |
| **find** | `find(self, target: char) -> Option<usize>` | Returns the index of the first occurrence of byte `target`. |
| **find_str** | `find_str(self, target: char*) -> Option<usize>` | Returns the index of the first occurrence of substring `target`. |
| **find_all_str** | `find_all_str(self, target: char*) -> Vec<usize>` | Returns a vector containing all indices where `target` occurs. |
| **substring** | `substring(self, start: usize, len: usize) -> String` | Returns a new String containing the specified substring. |

### UTF-8 Support

| Method | Signature | Description |
| :--- | :--- | :--- |
| **utf8_len** | `utf8_len(self) -> usize` | Returns the number of Unicode code points (characters). |
| **utf8_at** | `utf8_at(self, idx: usize) -> String` | Returns the character at the specified index as a new String. |
| **utf8_get** | `utf8_get(self, idx: usize) -> rune` | Returns the character at the specified index as a `rune`. |
| **utf8_substr** | `utf8_substr(self, start_idx: usize, num_chars: usize) -> String` | Returns a substring based on character indices. |
| **runes** | `runes(self) -> Vec<rune>` | Returns a vector containing all Unicode code points. |
| **chars** | `chars(self) -> StringCharsIter` | Returns a manual iterator yielding `Option<rune>`. |

### Transformations

| Method | Signature | Description |
| :--- | :--- | :--- |
| **to_lowercase** | `to_lowercase(self) -> String` | Returns a new string converted into lowercase. |
| **to_uppercase** | `to_uppercase(self) -> String` | Returns a new string converted into uppercase. |
| **to_int** | `to_int(self) -> int` | Parses the string as a decimal integer. Returns `0` when not a valid integer. |
| **repeated** | `repeated(self, count: usize) -> String` | Returns a new string with this string repeated `count` times. |
| **reverse** | `reverse(self) -> String` | Returns a new string with the characters in reverse order. |
| **split** | `split(self, delim: char) -> Vec<String>` | Splits the string into a vector of substrings. |
| **trim** | `trim(self) -> String` | Returns a new string with leading/trailing whitespace removed. |
| **trim_start** | `trim_start(self) -> String` | Returns a new string with leading whitespace removed. |
| **trim_end** | `trim_end(self) -> String` | Returns a new string with trailing whitespace removed. |
| **replace** | `replace(self, target: char*, replacement: char*) -> String` | Returns a new string with replacements. |
| **pad_left** | `pad_left(self, target_len: usize, pad_char: char) -> String` | Returns a new string padded on the left. |
| **pad_right** | `pad_right(self, target_len: usize, pad_char: char) -> String` | Returns a new string padded on the right. |

### Comparison

| Method | Signature | Description |
| :--- | :--- | :--- |
| **eq** | `eq(self, other: String*) -> bool` | Structural equality check. |
| **neq** | `neq(self, other: String*) -> bool` | Structural inequality check. |
| **compare** | `compare(self, other: String*) -> int` | Lexical comparison. |
| **compare_ignore_case** | `compare_ignore_case(self, other: String*) -> int` | Case-insensitive lexical comparison. |
| **eq_ignore_case** | `eq_ignore_case(self, other: String*) -> bool` | Case-insensitive equality check. |

## Operators

| Operator | Method | Description |
| :--- | :--- | :--- |
| `+` | **add** | `s1 + &s2`. Concatenates strings into a new `String`. |
| `+=` | **add_assign** | `s1 += &s2`. Appends `s2` to `s1` in place. |
| `==` | **eq** | `s1 == &s2`. structural equality check. |
| `!=` | **neq** | `s1 != &s2`. structural inequality check. |
| `<` | **lt** | `s1 < &s2`. Lexical comparison. |
| `>` | **gt** | `s1 > &s2`. Lexical comparison. |
| `<=` | **le** | `s1 <= &s2`. Lexical comparison. |
| `>=` | **ge** | `s1 >= &s2`. Lexical comparison. |
| `{}` | **to_string** | Used for string interpolation in `printf`/`println`. |

## Iteration

| Method | Signature | Description |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> StringCharsIter` | Returns an iterator yielding `rune`. Used by `for c in s`. |

## Memory Management

| Method | Signature | Description |
| :--- | :--- | :--- |
| **free** | `free(self)` | Manually frees the string memory. |
| **destroy** | `destroy(self)` | Alias for `free`. |
| **forget** | `forget(self)` | Prevents automatic freeing (transfer ownership). |
| **Trait** | `impl Drop for String` | Automatically calls `free()` when out of scope. |
