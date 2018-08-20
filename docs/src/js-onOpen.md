# onOpen(@$func)
Bind function to "open" event (or manually call "open" event).  
Saves the function such that when a client successfully opens connection to the server, the function is run. Or, manually runs previously set onOpen function.

## Parameters
  - `function $func` – function to bind to "open" event
     - This function should have no arguments
  - Provide no parameters at all to manually run a previously set onOpen function

## Return Value
`object Pocket`
  - returns self (`this`) on success to enable chaining
