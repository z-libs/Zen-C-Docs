+++
title = "Largest proper divisor of n"
+++

# Largest proper divisor of n

```zc
fn lpd(n: int) -> int {
    if n == 1 { return 1; }
    let lim = (n % 2) ? n / 3: n / 2;
    for i in lim..=1 step -1 {
        if !(n % i) { return i; }
    }
    return 1;   // 1 is always a proper divisor for n >= 2
}

fn main() {
    println "Largest proper divisor of n where 1 <= n <= 100:";
    for n in 1..101 {
        print "{lpd(n):2d}  ";
        if !(n % 10) { println ""; }
    }
}
```

**Output:**

```
Largest proper divisor of n where 1 <= n <= 100:
 1   1   1   2   1   3   1   4   3   5  
 1   6   1   7   5   8   1   9   1  10  
 7  11   1  12   5  13   9  14   1  15  
 1  16  11  17   7  18   1  19  13  20  
 1  21   1  22  15  23   1  24   7  25  
17  26   1  27  11  28  19  29   1  30  
 1  31  21  32  13  33   1  34  23  35  
 1  36   1  37  25  38  11  39   1  40  
27  41   1  42  17  43  29  44   1  45  
13  46  31  47  19  48   1  49  33  50
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Largest proper divisor of n**](https://rosettacode.org/wiki/Largest_proper_divisor_of_n) in Zen C.

*This article uses material from the Rosetta Code article **Largest proper divisor of n**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Largest_proper_divisor_of_n?action=history).*
