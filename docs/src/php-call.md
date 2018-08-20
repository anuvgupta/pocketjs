# call($name, @$arg1, @$arg2, ...)
Manually call event on the server.  
Runs the function on the server bound to the event, with any supplementary data the function needs.  
*This method is run when a client sends a message with this event name and the correct data to the server.*

## Parameters
  - `string $name` – name of the event to call
  - `$arg1`, `$arg2`, `...` – (optional supplementary data) the arguments that the event function needs
     - Last argument should be the number ID of the client calling this event

## Return Value
`bool` success
  - `true` if message successfully sent
  - `false` on error
