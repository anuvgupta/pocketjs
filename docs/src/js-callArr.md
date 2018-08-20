# callArr(name, args)
Manually call event on the client (with an array of arguments).  
Runs the function on the client bound to the event, with any supplementary data the function needs.  
*This method is run when the server sends a message with this event name and the correct data to the client.*

## Parameters
  - `string name` – name of the event to call
  - `array args` – (supplementary data) array of arguments that the event function needs

## Return Value
`object Pocket`
  - returns self (`this`) on success to enable chaining
