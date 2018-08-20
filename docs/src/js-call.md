# call(name, @arg1, @arg2, ...)
Manually call event on the client.  
Runs the function on the client bound to the event, with any supplementary data the function needs.  
*This method is run when the server sends a message with this event name and the correct data to the client.*

## Parameters
  - `string name` – name of the event to call
  - `arg1`, `arg2`, `...` – (optional supplementary data) the arguments that the event function needs

## Return Value
`object Pocket`
  - returns self (`this`) on success to enable chaining
