# open()
Run the pocket server.  
Binds a master socket to the configured IP/port, begins listening for new clients.  
Then, in an infinite loop:
  1. Watches for new clients and new data from clients
  2. Verifies and adds new clients
  3. Calls [`onRun()`](#dl-php-onRun) event
  4. Parses new data from clients and calls corresponding events
  5. Removes disconnected clients

## Return Value
`void`
