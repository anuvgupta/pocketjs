# bind($name, $func)
Bind a function to an event.  
Saves the function such that when the event is called on the server (by [call](#dl-php-call) or [callArr](#dl-php-callArr)), the function is run (with any supplementary data provided).

## Parameters
  - `string $name` – name of the event to bind to
  - `function $func` – function to bind to event
     - The last (or only) argument of this function should be `$id`, whose value will usually be the number ID of the client who calls this event

## Return Value
`bool` success
  - `true` if function successfully bound
  - `false` on error
