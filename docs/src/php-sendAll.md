# sendAll($call, @$arg1, @$arg2, ...)
Call an event on all clients.  
Sends an event name to all connected clients, telling them to call that event; optionally sends supplementary data.

## Parameters
  - `string $call` – name of the event to trigger on the clients
  - `$arg1`, `$arg2`, `...` – (optional supplementary data) any number of arguments (each of types that can be converted to JSON, like numbers and strings) which will be provided to the clients when they call this event

## Return Value
`bool` success
  - `true` if message successfully sent
  - `false` on error
