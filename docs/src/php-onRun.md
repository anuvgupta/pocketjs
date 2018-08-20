# onRun(@$func)
Bind function to "run" event (or manually call "run" event).  
Saves the function such that it runs repeatedly on an interval. This interval is the *blocking timeout* set in the pocket [constructor](#dl-php-construct). (Note: The function is called in the infinite loop after new clients are detected and added, but before new data is detected from clients. Look at the page for method [`open()`](#dl-php-open) for clarity.) Or, manually runs previously set onRun function.

## Parameters
  - `function $func` – function to bind to "run" event
     - This function should have no arguments
  - Provide no parameters at all to manually run a previously set onRun function

## Return Value
`void`
