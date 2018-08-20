# connect(domain, port, server, secure)
Connect to server.  
Sets up WebSocket client and connects to server.

## Parameters
  - `string domain` – public IP or domain name of server
  - `int port` – port to which pocket server is bound
  - `string server` – file name of pocket server PHP script file (ie. `server.php`)
  - `bool secure` – if `true`, uses `WSS` protocol (WebSocket Secure, or, `WS` over `HTTPS`)

## Return Value
`object Pocket` or `void`
  - returns self (`this`) on success to enable chaining
  - returns `void` on failure
