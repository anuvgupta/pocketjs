# send(call, @arg1, @arg2, ...)

## Parameters
  - `string call` – name of the event to trigger on the server
  - `arg1`, `arg2`, `...` – (optional supplementary data) any number of arguments (each of types that can be converted to JSON, like numbers and strings) which will be provided to the server when it calls this event

## Return Value
`object Pocket`
  - returns self (`this`) on success to enable chaining
