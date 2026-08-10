# std/random

The `std/random` module provides an idiomatic, object-oriented pseudo-random number generator (PRNG). Each `Random` owns an independent 64-bit xorshift64\* state, so generators seeded the same way produce identical deterministic sequences without interfering with one another (unlike a process-global `srand`/`rand`).

## Usage

```zc
import "std/random.zc"

fn main() {
    // Automatically seeds the generator with the current time
    let rng = Random::new();

    // Generate random integers
    let bounded = rng.next_int_range(1, 100); // 1 to 100 inclusive
    
    println "Rolled: {bounded}";
}
```

## Struct Definition

```zc
struct Random {
    state: u64;
}
```

## Methods

### Initialization

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `Random::new() -> Random` | Creates a new random generator seeded with current system time. |
| **from_seed** | `Random::from_seed(seed: U32) -> Random` | Creates a new random generator using a specific seed. Identical seeds produce identical sequences. |

### Generation

| Method | Signature | Description |
| :--- | :--- | :--- |
| **next_raw** | `next_raw(self) -> u64` | Advances the generator and returns the next raw 64-bit value. |
| **next_int** | `next_int(self) -> int` | Returns a random non-negative integer in `[0, INT32_MAX]`. |
| **next_int_range** | `next_int_range(self, min: int, max: int) -> int` | Returns a random integer in range `[min, max]` inclusive. |
| **next_double** | `next_double(self) -> double` | Returns a random floating-point number in range `[0.0, 1.0)`. |
| **next_bool** | `next_bool(self) -> bool` | Returns a random boolean. |
