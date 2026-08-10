# 标准库

Zen C 标准库提供了一系列全面的模块和类型，用于处理常见的任务，涵盖从低层位操作到高层网络连接及 JSON 处理的各个方面。

## 模块

| 模块 | 说明 |
| :--- | :--- |
| **[BigFloat](./bigfloat.md)** | 任意精度浮点运算。 |
| **[BigInt](./bigint.md)** | 任意精度整数运算。 |
| **[Bits](./bits.md)** | 低层位运算 (`rotl`, `rotr`)。 |
| **[Complex](./complex.md)** | 复数运算。 |
| **[Crypto](./crypto.md)** | 加密原语 (SHA1)。 |
| **[CUDA](./cuda.md)** | CUDA GPGPU 操作及互操作性。 |
| **[Encoding](./encoding.md)** | 数据编码工具 (Base64)。 |
| **[Env](./env.md)** | 进程环境变量访问。 |
| **[FS](./fs.md)** | 文件系统 I/O 及目录操作。 |
| **[IO](./io.md)** | 标准输入/输出及格式化。 |
| **[Iter](./iter.md)** | 自定义迭代器 trait 与协议。 |
| **[JSON](./json.md)** | DOM 风格的 JSON 解析与序列化。 |
| **[Map](./map.md)** | 通用哈希映射实现。 |
| **[Math](./math.md)** | 数学常量与函数。 |
| **[Mem](./mem.md)** | 内存管理、分配器及 trait。 |
| **[Net](./net.md)** | TCP, UDP, HTTP, DNS 及 URL 解析。 |
| **[Option](./option.md)** | 可选值封装 (`Some`/`None`)。 |
| **[Path](./path.md)** | 跨平台文件路径操作。 |
| **[Process](./process.md)** | 进程执行与管理。 |
| **[Result](./result.md)** | 错误处理模式 (`Ok`/`Err`)。 |
| **[Regex](./regex.md)** | 正则表达式支持。 |
| **[Random](./random.md)** | 伪随机数生成器。 |
| **[SIMD](./simd.md)** | 硬件优化向量类型。 |
| **[Queue](./queue.md)** | FIFO 队列（环形缓冲区）实现。 |
| **[Set](./set.md)** | 通用哈希集合实现。 |
| **[Slice](./slice.md)** | 轻量级非所有权数组视图。 |
| **[Sort](./sort.md)** | 零开销排序引擎。 |
| **[Stack](./stack.md)** | LIFO 栈实现。 |
| **[String](./string.md)** | 可增长的堆分配字符串类型。 |
| **[Thread](./thread.md)** | 多线程与同步。 |
| **[Time](./time.md)** | 时间测量与休眠工具。 |
| **[UTF-8](./utf8.md)** | Unicode 与 UTF-8 处理工具。 |
| **[Vector](./vec.md)** | 可增长的动态数组类型。 |
