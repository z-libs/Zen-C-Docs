+++
title = "Sleeping Beauty problem"
+++

# Sleeping Beauty problem

{{trans|Wren}}

```zc
import "std/random.zc"
import "locale.h"

let rng: Random;

fn sleeping_beauty(reps: int) -> f64 {
    let wakings = 0;
    let heads = 0;
    for _ in 0..reps {
        let coin = rng.next_int_range(0, 1) // heads = 0, tails = 1 say
        wakings++;
        if coin == 0 {
            heads++;
        } else {
            wakings++;
        }
    }
    println "Wakings over {reps:'d} repetitions = {wakings:'d}";
    let pc = (f64)heads / (f64)wakings * 100.0;
    println "Percentage probability of heads on waking = {pc:g}%";
    return pc;
}

fn main() {
    setlocale(LC_NUMERIC, "");
    rng = Random::new();
    sleeping_beauty(1_000_000);
}
```

**Output:**

Sample run:

```
Wakings over 1,000,000 repetitions = 1,500,093
Percentage probability of heads on waking = 33.3251%
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Sleeping Beauty problem**](https://rosettacode.org/wiki/Sleeping_Beauty_problem) in Zen C.

*This article uses material from the Rosetta Code article **Sleeping Beauty problem**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Sleeping_Beauty_problem?action=history).*
