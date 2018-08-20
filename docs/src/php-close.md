# close($id = null)
Close a pocket.  
Closes and removes specific client socket, all client sockets, or master socket (based on value of `$id`).

## Parameters
  - `int $id` – dictates which socket(s) to close
    - Use an `int` ID (between 0–`maxClients`) to select a specific client socket to close
    - Use an `int` ID (greater than `maxClients`) to close all client sockets
    - Use `null` (or provide no arguments) to close master socket

## Return Value
`void`
