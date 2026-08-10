+++
title = "Net vs BSD Sockets"
weight = 42
+++

# Net vs BSD Sockets
<!-- zc-check: skip-file: uses an outdated net API; needs rewriting -->

High-level TCP/UDP/HTTP networking vs C raw BSD socket programming.

## Zen C (TCP echo client)

```zc
import "std/net.zc"
import "std/io.zc"

fn main() {
    let conn = net::tcp_connect("127.0.0.1", 8080)?;
    defer conn.close();

    conn.write("Hello, server!\n");
    let response = conn.read_line()?;
    println "server response: {response}";
}
```

## C (TCP echo client)

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

int main(void) {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) { perror("socket"); return 1; }

    struct sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);

    if (connect(sock, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("connect"); close(sock); return 1;
    }

    const char* msg = "Hello, server!\n";
    send(sock, msg, strlen(msg), 0);

    char buf[1024];
    ssize_t n = recv(sock, buf, sizeof(buf) - 1, 0);
    if (n > 0) {
        buf[n] = '\0';
        printf("server response: %s", buf);
    }

    close(sock);
    return 0;
}
```

## Key Differences

- `net::tcp_connect(host, port)` for TCP clients
- `net::tcp_listen(host, port)` for TCP servers
- `conn.read_line()?`, `conn.write(data)` with Result error handling
- `net::udp_socket()`, `net::http_get(url)` for higher-level protocols
- `net::dns_resolve(hostname)` for DNS lookups
- `net::url_parse(url)` for URL decomposition
- C: raw `socket()`, `bind()`, `connect()`, `send()`, `recv()`
- C: manual `struct sockaddr_in` setup, byte order handling with `htons`/`htonl`

## Output

server response: <echoed message>
