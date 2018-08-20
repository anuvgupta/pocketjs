# &lowbar;&lowbar;construct($d, $p, $mc, $bt, $n/$v)
Constructor for a pocket.  
Runs when a pocket object is constructed with `new Pocket(...)`. Configures the pocket.

## Parameters
  - `string $d` – internal IP address of server
  - `int $p` – server port to bind to pocket
  - `int $mc` – max number of clients allowed to connect
  - `int $bt` – pocket blocking timeout (milliseconds)
     - Amount of time that pocket waits for a client to connect or send data
     - Use `null` if application requires the pocket to wait indefinitely for new clients or new data from clients
        - Most common, usually most efficient
     - Use `0` if application requires pocket to loop indefinitely without waiting (unprompted by clients)
     - Use a number if application requires pocket to loop indefinitely with a small wait (unprompted by clients)
  - `string $n` or `bool $v` – either the application name or the verbose logging option
     - Use a string to supply the application name, which is used in logging to the console
     - Use `false` to turn off logging to the console altogether
     - Use `true` to keep logging on, with `LOG` instead of an application name

## Return Value
`void`
