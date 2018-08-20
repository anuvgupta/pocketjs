# onClose($func/$id)
Bind function to "close" event (or manually call "close" event).  
Saves the function such that when a client disconnects from the server, the function is run with the client's number ID. Or, manually runs previously set onClose function for a specific client given a client ID.

## Parameters
  - `function $func` or `int $id`
      - `function $func` – function to bind to "close" event
         - The only argument of this function should be `$id`, whose value will always be the number ID of the disconnecting client
      - `int $id` – use existing client ID as the only argument (instead of the function) to manually run the previously set onClose event for that client

## Return Value
`bool` success
  - `false` on error
