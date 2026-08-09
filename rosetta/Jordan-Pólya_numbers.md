+++
title = "Jordan-Pólya numbers"
+++

# Jordan-Pólya numbers

{{trans|C}}

```zc
import "std/vec.zc"
import "std/string.zc"
import "locale.h"

let factorials: u64[19] = [1, 1];

fn cache_factorials() {
    let fact: u64 = 1;
    for i in 2..19 {
        fact *= i;
        factorials[i] = fact;
    }
}

fn find_nearest_fact(n: u64) -> int {
    for i in 1..19 {
        if factorials[i] >= n { return i; }
    }
    return 18;
}

fn find_nearest_in_vec(a: Vec<u64>*, n: u64) -> u64 {
    let l: usize = 0;
    let r = a.length();
    let m: usize;
    while l < r {
        m = (l + r) / 2;
        if a.get(m) > n {
            r = m;
        } else {
            l = m + 1;
        }
    }
    if r > 0 && a.get(r - 1) == n { return r - 1; }
    return r;
}

fn jordan_polya(limit: u64) -> Vec<u64> {
    let res = Vec<u64>::new();
    let ix = find_nearest_fact(limit);
    let t: u64;
    for i in 0..=ix {
        t = factorials[i];
        res << t;
    }
    let k: usize = 2;
    let p: u64;
    let rk: u64;
    let kl: u64;
    while k < res.length() {
        rk = res[k];
        for let l: usize = 2; l < res.length(); ++l {
            t = res[l];
            if t > limit / rk { break; }
            kl = t * rk;
            loop {
                p = find_nearest_in_vec(&res, kl);
                if p < res.length() && res[p] != kl {
                    res.insert(p, kl);
                } else if p == res.length() {
                    res << kl;
                }
                if kl > limit / rk { break; }
                kl *= rk;
            }
        }
        ++k;
    }
    res.remove(0);
    return res;
}

fn decompose(n: u64, start: u64) -> Vec<u64> {
    for let s: u64 = start; s > 0; --s {
        let f = Vec<u64>::new();
        if s < 2 { return f; }
        let m = n;
        while !(m % factorials[s]) {
            f << s;
            m /= factorials[s];
            if m == 1 { return f; }
        }
        if f.length() > 0 {
            let g = decompose(m, s - 1);
            if g.length() > 0 {
                let prod: u64 = 1;
                for let i: usize = 0; i < g.length(); ++i {
                    prod *= factorials[g[i]];
                }
                if prod == m {
                    for let i: usize = 0; i < g.length(); ++i {
                        let t = g[i];
                        f << t;
                    }
                    return f;
                }
            }
        }
    }
    return Vec<u64>::new(); 
}

fn superscript(n: int) -> String {
    let ss: string[10] = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
    if n < 10 { return String::from(ss[n]); }
    let buf = String::from("");
    buf.append_c(ss[n / 10]);
    buf.append_c(ss[n % 10]);
    return buf;
}

fn main() {
    cache_factorials();
    let v = jordan_polya((u64)1 << 53);
    println "First 50 Jordan-Pólya numbers:";
    for i in 0..50 {
        print "{v[i]:4lu} ";
        if !((i + 1) % 10) { println ""; }
    }

    printf("\nThe largest Jordan-Pólya number before 100 million: ");
    setlocale(LC_NUMERIC, "");
    let ix = find_nearest_in_vec(&v, (u64)100_000_000);    
    println "{v[ix - 1]:'lu}\n\n";

    let targets: u64[5] = [800, 1050, 1800, 2800, 3800];
    let t: u64;
    for let i = 0; i < 5; ++i {
        t = v[targets[i] - 1];
        println "The {targets[i]:'lu}th Jordan-Pólya number is : {t:'lu}";
        let w = decompose(t, 18);
        let count = 1;
        t = w[0];
        print " = ";
        for let j: usize = 1; j < w.length(); ++j {
            let u = w[j];
            if u != t {
                if count == 1 {
                    print "{t}! x ";
                } else {
                    let ss = superscript(count);
                    print "({t}!){ss} x ";
                    count = 1;
                }
                t = u;
            } else {
                ++count;
            }
        }
        if count == 1 {
            print "{t}! x ";
        } else {
            let ss = superscript(count);
            print "({t}!){ss} x ";
        }
        print "\b\b \n\n";
    }
}
```

**Output:**

```
First 50 Jordan-Pólya numbers:
   1    2    4    6    8   12   16   24   32   36 
  48   64   72   96  120  128  144  192  216  240 
 256  288  384  432  480  512  576  720  768  864 
 960 1024 1152 1296 1440 1536 1728 1920 2048 2304 
2592 2880 3072 3456 3840 4096 4320 4608 5040 5184 

The largest Jordan-Pólya number before 100 million: 99,532,800

The 800th Jordan-Pólya number is : 18,345,885,696
 = (4!)⁷ x (2!)²   

The 1,050th Jordan-Pólya number is : 139,345,920,000
 = 8! x (5!)³ x 2!   

The 1,800th Jordan-Pólya number is : 9,784,472,371,200
 = (6!)² x (4!)² x (2!)¹⁵   

The 2,800th Jordan-Pólya number is : 439,378,587,648,000
 = 14! x 7!   

The 3,800th Jordan-Pólya number is : 7,213,895,789,838,336
 = (4!)⁸ x (2!)¹⁶
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Jordan-Pólya numbers**](https://rosettacode.org/wiki/Jordan-Pólya_numbers) in Zen C.

*This article uses material from the Rosetta Code article **Jordan-Pólya numbers**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Jordan-Pólya_numbers?action=history).*
