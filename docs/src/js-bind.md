# bind(name, func)
Bind a function to an event.  
Saves the function such that when the event is called on the client (by [call](#dl-js-call) or [callArr](#dl-js-callArr)), the function is run (with any supplementary data provided).

## Parameters
  - `string name` – name of the event to bind to
  - `function func` – function to bind to event

## Return Value
`object Pocket`
  - returns self (`this`) on success to enable chaining
