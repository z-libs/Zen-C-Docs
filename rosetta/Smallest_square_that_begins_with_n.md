+++
title = "Smallest square that begins with n"
+++

# Smallest square that begins with n

{{trans|Pascal}}

```zc
import "std/math.zc"

fn low_square_start_n(n: u64) -> u64 {
    let sqrt_n = Math::sqrt((f64)n);
    let sqrt_n10 = Math::sqrt((f64)(n * 10));
    let pow10: u64 = 1;
    loop {
        let sqrts: u64[2] = [(u64)sqrt_n, (u64)sqrt_n10]; 
        for i in sqrts {
            let ii = i;
            for _ in 0..2 {
                let my_sqr = ii * ii / pow10;
                if my_sqr == n { return ii; }
                ii++;
            }
            pow10 *= 10;
        }
        sqrt_n *= 10.0;
        sqrt_n10 *= 10.0;
        if sqrt_n > (10.0 * n) { break; }
    }
    return 0;
}

fn main() {
    println "Test 1 .. 49";
    for let i: u64 = 1; i < 50; ++i {
        let t = low_square_start_n(i);
        print "{t * t:7lu}";
        if !(i % 10) { println ""; }
    }
    println "\n";
    println "Test 999,991 .. 1,000,000";
    for let i: u64 = 999_991; i <= 1_000_000; ++i {
        let t = low_square_start_n(i);
        println "{i:10lu} : {t:10lu} -> {t * t:14lu}";
    }
}
```

**Output:**

```
Test 1 .. 49
      1     25     36      4    529     64    729     81      9    100
   1156    121   1369    144   1521     16   1764   1849    196   2025
   2116    225   2304   2401     25   2601   2704    289   2916   3025
   3136    324   3364   3481  35344     36   3721   3844   3969    400
  41209   4225   4356    441  45369   4624   4761    484     49

Test 999,991 .. 1,000,000
    999991 :    3162264 ->  9999913605696
    999992 :     999996 ->   999992000016
    999993 :    3162267 ->  9999932579289
    999994 :     999997 ->   999994000009
    999995 :     316227 ->    99999515529
    999996 :     999998 ->   999996000004
    999997 :    3162273 ->  9999970526529
    999998 :     999999 ->   999998000001
    999999 :    3162277 ->  9999995824729
   1000000 :       1000 ->        1000000
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Smallest square that begins with n**](https://rosettacode.org/wiki/Smallest_square_that_begins_with_n) in Zen C.

*This article uses material from the Rosetta Code article **Smallest square that begins with n**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Smallest_square_that_begins_with_n?action=history).*
