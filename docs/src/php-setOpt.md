# setOpt($option, $value)
Set certain server options.  
Controls how server deals with clients who send illegal data.

## Parameters
  - `string $option` – the name of the option to set to on or off
     - `kick-bad-data`
        - When turned on, clients who send incorrectly formatted data are forcefully disconnected
        - When turned off, incorrectly formatted data is simply ignored
     - `kick-bad-events`
        - When turned on, clients who send messages with nonexistent events are forcefully disconnected
        - When turned off, messages with nonexistent events are simply ignored
  - `bool $value` – determines if option is on `true` or off `false`

## Return Value
`bool` success
  - `true` if function successfully bound
  - `false` on error
