+++
title = "Sorting algorithms/Cycle sort"
+++

# Sorting algorithms/Cycle sort

A translation of the Python code in the Wikipedia article. 

```zc
fn cycle_sort(a: int*, len: const usize) -> int {
    let writes = 0;
    for cs in 0..(len - 1) {
        let item = a[cs];
        let pos = cs;
        for i in (cs + 1)..len {
            if a[i] < item { pos++; }
        }
        if pos != cs {
            while item == a[pos] { pos++; }
            let t = a[pos];
            a[pos] = item;
            item = t;
            while pos != cs {
                pos = cs;
                for i in (cs + 1)..len {
                    if a[i] < item { pos++; }
                }
                while item == a[pos] { pos++; }
                let u = a[pos];
                a[pos] = item;
                item = u;
                writes++;
            }
        }
    }
    return writes;
}

fn main() {
    let a1 = [4, 65, 2, -31, 0, 99, 2, 83, 782, 1];
    let a2 = [7, 5, 2, 6, 1, 4, 2, 6, 3];
    let aa: int*[2] = [a1, a2];
    let lens = [a1.len, a2.len];
    for i in 0..aa.len {
        print "Before: [";
        for j in 0..lens[i] { print "{aa[i][j]}, "; }
        println "\b\b]";
        let w = cycle_sort(aa[i], lens[i]);
        print "After : [";
        for j in 0..lens[i] { print "{aa[i][j]}, "; }
        println "\b\b] ";
        println "Writes : {w}\n";
    }
}
```

**Output:**

```
Before: [4, 65, 2, -31, 0, 99, 2, 83, 782, 1] 
After : [-31, 0, 1, 2, 2, 4, 65, 83, 99, 782] 
Writes : 7

Before: [7, 5, 2, 6, 1, 4, 2, 6, 3] 
After : [1, 2, 2, 3, 4, 5, 6, 6, 7] 
Writes : 6
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Sorting algorithms/Cycle sort**](https://rosettacode.org/wiki/Sorting_algorithms/Cycle_sort) in Zen C.

*This article uses material from the Rosetta Code article **Sorting algorithms/Cycle sort**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Sorting_algorithms/Cycle_sort?action=history).*
