# send($call, $id, @$arg1, @$arg2, ...)
Call event on a client.  
Sends an event name to the specified client, telling it to call that event; optionally sends supplementary data.

## Parameters
  - `string $call` – name of the event to trigger on the client
  - `int $id` – ID of client to which message will be sent
  - `$arg1`, `$arg2`, `...` – (optional supplementary data) any number of arguments (each of types that can be converted to JSON, like numbers and strings) which will be provided to the client when it calls this event

## Return Value
`bool` success
  - `true` if message successfully sent
  - `false` on error
