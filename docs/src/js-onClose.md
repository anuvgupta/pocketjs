# onClose(@$func)
Bind function to "close" event (or manually call "close" event).  
Saves the function such that when the client disconnects from the server, the function is run. Or, manually runs previously set onClose function.

## Parameters
  - `function $func` – function to bind to "close" event
     - This function should have no arguments
  - Provide no parameters at all to manually run a previously set onClose function

## Return Value
`object Pocket`
  - returns self (`this`) on success to enable chaining
