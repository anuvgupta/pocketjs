# onConn($func/$id)
Bind function to "connection" event (or manually call "connection" event).  
Saves the function such that when a new client connects to the server, the function is run with the new client's new number ID. Or, manually runs previously set onConn function for a specific client given a client ID.

## Parameters
  - `function $func` or `int $id`
      - `function $func` – function to bind to "connection" event
         - The only argument of this function should be `$id`, whose value will always be the new number ID of the newly connected client  
      - `int $id` – use existing client ID as the only argument (instead of the function) to manually run the previously set onConn function for that client

## Return Value
`bool` success
  - `false` on error
