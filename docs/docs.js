function getDocsSource() { return {"php-construct": "# &lowbar;&lowbar;construct($d, $p, $mc, $bt, $n/$v)\nConstructor for a pocket.  \nRuns when a pocket object is constructed with `new Pocket(...)`. Configures the pocket.\n\n## Parameters\n  - `string $d` \u2013 internal IP address of server\n  - `int $p` \u2013 server port to bind to pocket\n  - `int $mc` \u2013 max number of clients allowed to connect\n  - `int $bt` \u2013 pocket blocking timeout (milliseconds)\n     - Amount of time that pocket waits for a client to connect or send data\n     - Use `null` if application requires the pocket to wait indefinitely for new clients or new data from clients\n        - Most common, usually most efficient\n     - Use `0` if application requires pocket to loop indefinitely without waiting (unprompted by clients)\n     - Use a number if application requires pocket to loop indefinitely with a small wait (unprompted by clients)\n  - `string $n` or `bool $v` \u2013 either the application name or the verbose logging option\n     - Use a string to supply the application name, which is used in logging to the console\n     - Use `false` to turn off logging to the console altogether\n     - Use `true` to keep logging on, with `LOG` instead of an application name\n\n## Return Value\n`void`\n", "js-callArr": "# callArr(name, args)\nManually call event on the client (with an array of arguments).  \nRuns the function on the client bound to the event, with any supplementary data the function needs.  \n*This method is run when the server sends a message with this event name and the correct data to the client.*\n\n## Parameters\n  - `string name` \u2013 name of the event to call\n  - `array args` \u2013 (supplementary data) array of arguments that the event function needs\n\n## Return Value\n`object Pocket`\n  - returns self (`this`) on success to enable chaining\n", "js-online": "# online()\nGet client connection status.  \nAccessor method for whether or not pocket client is online/connected to pocket server.\n\n## Return Value\n`bool online`\n  - `true` if client is connected to server\n  - `false` if client is disconnected from server or currently connecting to server\n", "js-call": "# call(name, @arg1, @arg2, ...)\nManually call event on the client.  \nRuns the function on the client bound to the event, with any supplementary data the function needs.  \n*This method is run when the server sends a message with this event name and the correct data to the client.*\n\n## Parameters\n  - `string name` \u2013 name of the event to call\n  - `arg1`, `arg2`, `...` \u2013 (optional supplementary data) the arguments that the event function needs\n\n## Return Value\n`object Pocket`\n  - returns self (`this`) on success to enable chaining\n", "tut-basics": "# Basics\nA guide to pocketjs application basics.  \n\n### Create Pockets\n  - Create pocket server in `server.php`\n     - Look at constructor parameters in [`__construct`](#dl-php-construct)\n     - Use port that you opened in [setup](#tut-setup)\n     - Note: *blocking timeout* should be set to `null` in chat apps and other apps that require the server to process data only when prompted by clients. It should be set to an integer value if the app requires the server to consistently and repeatedly process data, unprompted by any client. (When in doubt, use a large number, which reduces server load; this can always be changed.)\n\n  ```php\n  $pocket = new Pocket('10.0.0.45', 8000, 20, 50);\n  ```\n  - Create pocket client in `index.html`\n     - Don't use the  `new` keyword\n\n  ```javascript\n  var pocket = Pocket();\n  ```\n\n### App Format\n  - server script \u2013 `server.php`\n     1. Construct/configure pocket server\n     2. Declare/initialize application variables\n     3. Bind handlers to client events\n        - Handlers should process client data, alter application variables, and send new information to client(s)\n        - Configure custom handlers as well as \"connection\", \"run\", and \"close\" events\n     4. Open socket to client connections  \n  - client script \u2013 `client.html`\n     1. Construct pocket client\n     2. Declare/initialize application variables\n     3. Bind handlers to server events\n        - Handlers should process server data, alter application variables, and send new information to server\n        - Configure custom handlers as well as \"connection\" and \"close\" events\n     4. Separately, data can also be sent to the server asynchronously with forms and buttons\n     5. Connect client socket to server\n\n#### Example\nThis demo demonstrates the basic format of a pocketjs app with a simple demo in which clients can log in and set data in a dictionary.  \n*(This demo is meant only to showcase the core features of pocketjs. Test it on your local server, but do not make it publicly online, as it displays data on a page without sanitizing. Essentially, it's not secure.)*\n  - server script \u2013 `server.php`\n    - ***N.B.:*** *Take note of* `use (&$pocket, ...)` *present in every closure function signature. This ensures that objects and other application variables outside the scope of these closure functions are available within these functions. The ampersand* `&` *ensures that these variables are passed as references, such that the functions will always have access to the most current representation of the object. This is essential; always follow this protocol.*\n\n\n```php\n// Construct/configure pocket server\n$pocket = new Pocket('10.0.0.45', 8000, 20, 50);\n$pocket->setOpt('kick-bad-data', false);\n\n// Declare/initialize application variables\n$clients = [ ]; // clients' info\n$data = [ 'value1' => 25 ]; // app data\n\n// Bind handlers to client events\n$pocket->onConn(function ($id) use (&$pocket, &$clients) { // when new client connects\n    $pocket->log(\"user[$id] connected\");\n    $clients[$id] = [ // initialize client's info\n        'id' => $id,\n        'name' => '',\n        'age' => 0\n    ];\n    $pocket->send('askForNameAndAge', $id); // ask for client's info\n});\n$pocket->bind('nameAndAge', function ($name, $age, $id) use (&$pocket, &$clients, &$data) { // when new client sends info\n    $pocket->log(\"user[$id] is $name, $age\");\n    // save client's info\n    $clients[$id]['name'] = $name;\n    $clients[$id]['age'] = $age;\n    $pocket->send('update', $id, json_encode($data)); // push current app data to new client\n});\n$pocket->bind('setData', function ($key, $value, $id) use (&$pocket, &$data) { // when client sends data changes\n    $pocket->log(\"data value $key set to $value\");\n    // save changes\n    $data[$key] = $value;\n    // push updated app data to all clients (including he who sent)\n    $pocket->sendAll('update', json_encode($data));\n});\n$pocket->onClose(function ($id) use (&$pocket) { // when client disconnects\n    $pocket->log(\"user[$id] disconnected\");\n    // remove client data\n    unset($clients[$id]);\n});\n\n// Open socket to client connections\n$pocket->open();\n```\n  - client script \u2013 `client.html`  \n\n```html\nKey: <input type=\"text\" id=\"keyText\"/><br/>\nValue: <input type=\"text\" id=\"valText\"/><br/>\n<button id =\"submitButton\">Set Data</button><br/>\n<br/>\n<pre id=\"outputBox\">connecting...</pre>\n<script src=\"pocket.js\" type=\"text/javascript\"></script>\n<script type=\"text/javascript\">\n  // Construct pocket client\n  var pocket = Pocket();\n\n  // Declare/initialize application variables\n  var user = { // client's info\n      name: '',\n      age: 0\n  };\n\n  // Bind handlers to server events\n  pocket.onOpen(function () { // when pocket connects\n      console.log('connected');\n      // get/save client data\n      user.name = prompt('What is your name?');\n      user.age = prompt('What is your age?');\n  });\n  pocket.bind('askForNameAndAge', function () { // when server asks for client's info\n      pocket.send('nameAndAge', user.name, user.age); // send client's info to server\n  });\n  pocket.bind('update', function (data) { // when server sends snapshot of app data\n      var parsed_data = JSON.parse(data); // parse snapshot\n      console.log(parsed_data);\n      document.getElementById('outputBox').innerHTML = JSON.stringify(parsed_data, null, 2); // display snapshot on page\n  });\n  pocket.onClose(function () { // when pocket disconnects\n      console.log('disconnected');\n      document.getElementById('outputBox').innerHTML = 'disconnected'; // notify user\n  });\n\n  // Separately, data can also be sent to the server asynchronously with forms and buttons\n  document.getElementById('submitButton').addEventListener('click', function () { // when button clicked\n      // get new data changes\n      var key = document.getElementById('keyText').value.trim();\n      var value = document.getElementById('valText').value.trim();\n      if (key != null && key.trim() != '') {\n          pocket.send('setData', key, value); // send data changes to server\n      }\n  });\n\n  // Connect client socket to server\n  pocket.connect('example.com', 8000, 'server.php', false);\n</script>\n```\n\nCheck out some [demos](#dl-tut-demos) next.\n", "php-send": "# send($call, $id, @$arg1, @$arg2, ...)\nCall event on a client.  \nSends an event name to the specified client, telling it to call that event; optionally sends supplementary data.\n\n## Parameters\n  - `string $call` \u2013 name of the event to trigger on the client\n  - `int $id` \u2013 ID of client to which message will be sent\n  - `$arg1`, `$arg2`, `...` \u2013 (optional supplementary data) any number of arguments (each of types that can be converted to JSON, like numbers and strings) which will be provided to the client when it calls this event\n\n## Return Value\n`bool` success\n  - `true` if message successfully sent\n  - `false` on error\n", "tut-alt-clients": "# Alternative Clients\nThe main pocketjs client is written in JavaScript, as the intended purpose is for applications to be web applications. However, the websocket protocol is built on HTTP and is therefore quite extensible and can be implemented in many languages and on many platforms.\n\n### Python\nAn experimental python client that uses the package [websocket-client v0.40.0](https://pypi.python.org/pypi/websocket-client) can be found [here](https://github.com/anuvgupta/pocketjs/blob/master/clients/pocket.py). It doesn't work perfectly, but I've found it is useful for Raspberry Pi projects. Feel free to develop it further.\n\n### Other Platforms\nIf you wish to build other clients for your application, feel free to study the existing clients and create a pocketjs client in another language that supports websockets.\n", "js-bind": "# bind(name, func)\nBind a function to an event.  \nSaves the function such that when the event is called on the client (by [call](#dl-js-call) or [callArr](#dl-js-callArr)), the function is run (with any supplementary data provided).\n\n## Parameters\n  - `string name` \u2013 name of the event to bind to\n  - `function func` \u2013 function to bind to event\n\n## Return Value\n`object Pocket`\n  - returns self (`this`) on success to enable chaining\n", "php-log": "# log($data)\nLog any data.  \nFormats any data into a proper log entry, and prints to output stream (usually the terminal window, sometimes a log file). Uses application name as set in [constructor](#dl-php-construct), or `LOG`.\n\n## Parameters\n  - `$data` \u2013 any data you want to print out for testing (preferably text, array, object, etc.)\n\n## Return Value\n`void`\n", "php-destruct": "# &lowbar;&lowbar;destruct()\nDestructor for a pocket.  \nRuns when a pocket object is destroyed. Closes all connections.\n\n## Return Value\n`void`\n", "php-callArr": "# callArr($name, $args)\nManually call event on the server (with an array of arguments).  \nRuns the function on the server bound to the event, with any supplementary data the function needs.  \n*This method is run when a client sends a message with this event name and the correct data to the server.*\n\n## Parameters\n  - `string $name` \u2013 name of the event to call\n  - `array $args` \u2013 (supplementary data) array of arguments that the event function needs\n     - Last item in array should be the number ID of the client calling this event\n\n## Return Value\n`bool` success\n  - `true` if message successfully sent\n  - `false` on error\n", "js-getPort": "# getPort()\nGet client port.  \nAccessor method for client socket port.\n\n## Return Value\n`int port`\n  - Port of client socket as determined by server on connection\n  - `0` if client has not yet connected to server\n", "php-close": "# close($id = null)\nClose a pocket.  \nCloses and removes specific client socket, all client sockets, or master socket (based on value of `$id`).\n\n## Parameters\n  - `int $id` \u2013 dictates which socket(s) to close\n    - Use an `int` ID (between 0\u2013`maxClients`) to select a specific client socket to close\n    - Use an `int` ID (greater than `maxClients`) to close all client sockets\n    - Use `null` (or provide no arguments) to close master socket\n\n## Return Value\n`void`\n", "tut-setup": "# Setup\nA guide for setting up an environment for a pocketjs application.\n\n### Requirements\n  - A web browser\n  - Any web server (Apache, Node.js, etc)\n  - PHP 5.4 or above, or PHP7\n\n### Install\n  - Download [`pocket.php`](https://github.com/anuvgupta/pocketjs/blob/master/pocket.php) and [`pocket.js`](https://github.com/anuvgupta/pocketjs/blob/master/clients/pocket.js)\n  - Start your web server, go to the document root folder for your website\n  - Place `pocket.js` in a place where your `index.html` file can access it\n  - Place `pocket.php` outside of your document root (clients shouldn't be able to access it)\n  - In your machine's network settings, open a single port (ie. 8000) publicly to TCP connections (if not open already by default)\n\n### Base Files\n- Go to your document root\n- Create `index.html`\n    - Include `pocket.js` with a normal script tag\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n        <title>pocketjs app</title>\n    </head>\n    <body>\n        <script src=\"pocket.js\" type=\"text/javascript\"></script>\n        <script type=\"text/javascript\">\n            // configure client here\n        </script>\n    </body>\n</html>\n```\n- Go to where you placed `pocket.php` (outside of the document root)\n- Create `server.php`\n    - Include `pocket.php` with `require()`\n\n```php\n<?php\nrequire('pocket.php');\n?>\n```\n\nCheck out [basics](#dl-tut-basics) next.\n", "js-send": "# send(call, @arg1, @arg2, ...)\n\n## Parameters\n  - `string call` \u2013 name of the event to trigger on the server\n  - `arg1`, `arg2`, `...` \u2013 (optional supplementary data) any number of arguments (each of types that can be converted to JSON, like numbers and strings) which will be provided to the server when it calls this event\n\n## Return Value\n`object Pocket`\n  - returns self (`this`) on success to enable chaining\n", "php-setOpt": "# setOpt($option, $value)\nSet certain server options.  \nControls how server deals with clients who send illegal data.\n\n## Parameters\n  - `string $option` \u2013 the name of the option to set to on or off\n     - `kick-bad-data`\n        - When turned on, clients who send incorrectly formatted data are forcefully disconnected\n        - When turned off, incorrectly formatted data is simply ignored\n     - `kick-bad-events`\n        - When turned on, clients who send messages with nonexistent events are forcefully disconnected\n        - When turned off, messages with nonexistent events are simply ignored\n  - `bool $value` \u2013 determines if option is on `true` or off `false`\n\n## Return Value\n`bool` success\n  - `true` if function successfully bound\n  - `false` on error\n", "js-getAddress": "# getAddress()\nGet client IP address.  \nAccessor method for client IP address as determined by server.\n\n## Return Value\n`string address`\n  - IP(v4) address of client as it appears to server on connection\n  - empty string if client has not yet connected to server\n", "js-getID": "# getID()\nGet client number ID.  \nAccessor method for integer ID assigned to client by server.\n\n## Return Value\n`int id`\n  - integer ID assigned to client by server\n     - identifies client in server script\n  - `0` if client has not yet connected to server\n", "php-onConn": "# onConn($func/$id)\nBind function to \"connection\" event (or manually call \"connection\" event).  \nSaves the function such that when a new client connects to the server, the function is run with the new client's new number ID. Or, manually runs previously set onConn function for a specific client given a client ID.\n\n## Parameters\n  - `function $func` or `int $id`\n      - `function $func` \u2013 function to bind to \"connection\" event\n         - The only argument of this function should be `$id`, whose value will always be the new number ID of the newly connected client  \n      - `int $id` \u2013 use existing client ID as the only argument (instead of the function) to manually run the previously set onConn function for that client\n\n## Return Value\n`bool` success\n  - `false` on error\n", "php-call": "# call($name, @$arg1, @$arg2, ...)\nManually call event on the server.  \nRuns the function on the server bound to the event, with any supplementary data the function needs.  \n*This method is run when a client sends a message with this event name and the correct data to the server.*\n\n## Parameters\n  - `string $name` \u2013 name of the event to call\n  - `$arg1`, `$arg2`, `...` \u2013 (optional supplementary data) the arguments that the event function needs\n     - Last argument should be the number ID of the client calling this event\n\n## Return Value\n`bool` success\n  - `true` if message successfully sent\n  - `false` on error\n", "php-sendAll": "# sendAll($call, @$arg1, @$arg2, ...)\nCall an event on all clients.  \nSends an event name to all connected clients, telling them to call that event; optionally sends supplementary data.\n\n## Parameters\n  - `string $call` \u2013 name of the event to trigger on the clients\n  - `$arg1`, `$arg2`, `...` \u2013 (optional supplementary data) any number of arguments (each of types that can be converted to JSON, like numbers and strings) which will be provided to the clients when they call this event\n\n## Return Value\n`bool` success\n  - `true` if message successfully sent\n  - `false` on error\n", "php-onRun": "# onRun(@$func)\nBind function to \"run\" event (or manually call \"run\" event).  \nSaves the function such that it runs repeatedly on an interval. This interval is the *blocking timeout* set in the pocket [constructor](#dl-php-construct). (Note: The function is called in the infinite loop after new clients are detected and added, but before new data is detected from clients. Look at the page for method [`open()`](#dl-php-open) for clarity.) Or, manually runs previously set onRun function.\n\n## Parameters\n  - `function $func` \u2013 function to bind to \"run\" event\n     - This function should have no arguments\n  - Provide no parameters at all to manually run a previously set onRun function\n\n## Return Value\n`void`\n", "php-onClose": "# onClose($func/$id)\nBind function to \"close\" event (or manually call \"close\" event).  \nSaves the function such that when a client disconnects from the server, the function is run with the client's number ID. Or, manually runs previously set onClose function for a specific client given a client ID.\n\n## Parameters\n  - `function $func` or `int $id`\n      - `function $func` \u2013 function to bind to \"close\" event\n         - The only argument of this function should be `$id`, whose value will always be the number ID of the disconnecting client\n      - `int $id` \u2013 use existing client ID as the only argument (instead of the function) to manually run the previously set onClose event for that client\n\n## Return Value\n`bool` success\n  - `false` on error\n", "js-onClose": "# onClose(@$func)\nBind function to \"close\" event (or manually call \"close\" event).  \nSaves the function such that when the client disconnects from the server, the function is run. Or, manually runs previously set onClose function.\n\n## Parameters\n  - `function $func` \u2013 function to bind to \"close\" event\n     - This function should have no arguments\n  - Provide no parameters at all to manually run a previously set onClose function\n\n## Return Value\n`object Pocket`\n  - returns self (`this`) on success to enable chaining\n", "js-connect": "# connect(domain, port, server, secure)\nConnect to server.  \nSets up WebSocket client and connects to server.\n\n## Parameters\n  - `string domain` \u2013 public IP or domain name of server\n  - `int port` \u2013 port to which pocket server is bound\n  - `string server` \u2013 file name of pocket server PHP script file (ie. `server.php`)\n  - `bool secure` \u2013 if `true`, uses `WSS` protocol (WebSocket Secure, or, `WS` over `HTTPS`)\n\n## Return Value\n`object Pocket` or `void`\n  - returns self (`this`) on success to enable chaining\n  - returns `void` on failure\n", "php-open": "# open()\nRun the pocket server.  \nBinds a master socket to the configured IP/port, begins listening for new clients.  \nThen, in an infinite loop:\n  1. Watches for new clients and new data from clients\n  2. Verifies and adds new clients\n  3. Calls [`onRun()`](#dl-php-onRun) event\n  4. Parses new data from clients and calls corresponding events\n  5. Removes disconnected clients\n\n## Return Value\n`void`\n", "tut-demos": "# Demos\nA few demos and apps have been made to help understand pocketjs.\n\n  1. Simple Chat\n     - Live demo: [github.anuv.me/pocketjs/demos/chat-simple](http://github.anuv.me/pocketjs/demos/chat-simple/)\n     - A simplistic instant messaging application\n     - Barebones, no nicknames, only supports messages being posted\n     - Not practical in real life, just a demo of basic realtime functionality\n     - View tutorial/source: [github.com/anuvgupta/pocketjs/tree/master/demos/chat-simple](https://github.com/anuvgupta/pocketjs/tree/master/demos/chat-simple)\n  2. Better Chat\n     - Live demo: [github.anuv.me/pocketjs/demos/chat-better](http://github.anuv.me/pocketjs/demos/chat-better/)\n     - An improved (but basic) instant messaging application\n     - Supports nicknames, history, autoscrolling, secure text nodes\n     - Actually useful in real life, consider replicating\n     - View tutorial/source: [github.com/anuvgupta/pocketjs/tree/master/demos/chat-better](https://github.com/anuvgupta/pocketjs/tree/master/demos/chat-better)\n\n## Example Apps\nHere are some applications I've made that use pocketjs for their core functionality:\n  - rubbr.io\n     - Play now: [rubbr.anuv.me](http://rubbr.anuv.me)\n     - View source: [github.com/anuvgupta/rubbr](https://github.com/anuvgupta/rubbr)\n     - An online multiplayer .io-style game (similar to [agar.io](http://agar.io)) in which players are cars, travel around a map, collect money and health, and blast through other players to damage/destroy them, thus gaining money and leaderboard points\n         - pocketjs calculates every player's position, synchronizes the map (positions of money/players/health/nitro) as well as the leaderboard between all clients\n  - slop.ml\n     - View online: [slop.anuv.me](http://slop.anuv.me)\n         - This is actually password protected because I didn't code in a user account system, so there is only one account for my family\n     - View source: [github.com/anuvgupta/slop.ml](https://github.com/anuvgupta/slop.ml)\n     - An online realtime collaborative grocery list app. Multiple lists may be created, with various names/purposes. New items can be added and removed, as well as crossed off.\n         - pocketjs synchronizes all lists and items between all clients, so the changes by any one client are immediately reflected across all client devices (no reloading necessary)\n", "tut-cmd-line": "# Command Line Utility\npocketjs comes with a simple command line utility written in bash that helps create and manage pocketjs applications.  \n*It should work fine on macOS and Linux, but a Windows version has not been and will never be created.*\n\n## Installation\n  - Download it [here](https://github.com/anuvgupta/pocketjs/blob/master/pocketjs)\n  - Place it in a convenient location\n     - Your home directory `~`\n         - My preference on my own server\n     - Directly in `/usr/bin` (or as a symlink)\n     - Directly in `/usr/local/bin` (or as a symlink)\n     - The project directory (where server script `server.php` is located)\n         - My preference during development\n\n## Usage\n  - All features must be used while in the project directory (where server script `server.php` is located)\n  - The pocketjs application directory will be created here; thus all features must be used while directly outside of this generated application directory.\n  - The application directory contains important files that the utility and other features require to help you manage your application\n\n## Features\n*The following syntax assumes the `pocketjs` command can be accessed globally. Tailor the command to accommodate where you placed the bash script.*\n  - Help\n     - Syntax: `pocketjs help`\n     - A quick guide that summarizes all features and their syntax\n  - Utility\n     - Syntax: `pocketjs utility`\n     - A nice all-in-one command line interface for managing your application\n     - Uses all the other features of the bash script (so don't bother with the rest of this guide unless you want to learn how the other features work)\n     - Once an application is stopped, it cannot be restarted unless the utility is exited and reopened only after a few minutes (due to port binding restrictions)\n  - Create New Application\n     - Syntax: `pocketjs forever {name} {command}`\n         - `name` = name for your new application (alphanumeric, dash `-` and underscore `_` allowed)\n         - `command` = `'php /absolute/path/to/pocketjs_server_script.php'` (single quotes included)\n     - Creates a new pocketjs application\n         - Backgrounds `command` with [`nohup`](https://linux.101hacks.com/unix/nohup-command/)\n         - Creates a folder with name `name`\n         - Places in that folder:\n             - PID file `pid.txt` \u2013 contains PID of `nohup` process\n             - Log file `log.txt` \u2013 contains output of `nohup` process\n             - Name file `name,txt` \u2013 contains full original `name` argument\n             - Command file `cmd.txt` \u2013 contains full original `command` argument\n  - Stop Running Application\n     - Syntax: `pocketjs never {name}`\n         - `name` = name of existing running application to stop\n     - Stops a running pocketjs application (whose app folder is in the current directory)\n  - Clean Up Stopped Application\n     - Syntax: `pocketjs cleanup {name}`\n         - `name` = name of existing stopped application to delete\n     - Deletes files and folder of stopped pocketjs application (whose app folder is in the current directory)\n  - Get PID of Application\n     - Syntax: `pocketjs pid {name}`\n         - `name` = name of existing application from which to read PID\n     - Outputs the PID of a pocketjs application (whose app folder is in the current directory)\n         - Simply reads from app's `pid.txt` file\n         - If app is stopped, PID represents last known PID\n         - If app is running, PID represents current PID\n  - Read Log of Application\n     - Syntax: `pocketjs log {name}`\n         - `name` = name of existing application from which to read log\n     - Outputs the full logged output of a pocketjs application (whose app folder is in the current directory)\n         - Simply reads from app's `log.txt` file\n", "js-onOpen": "# onOpen(@$func)\nBind function to \"open\" event (or manually call \"open\" event).  \nSaves the function such that when a client successfully opens connection to the server, the function is run. Or, manually runs previously set onOpen function.\n\n## Parameters\n  - `function $func` \u2013 function to bind to \"open\" event\n     - This function should have no arguments\n  - Provide no parameters at all to manually run a previously set onOpen function\n\n## Return Value\n`object Pocket`\n  - returns self (`this`) on success to enable chaining\n", "php-bind": "# bind($name, $func)\nBind a function to an event.  \nSaves the function such that when the event is called on the server (by [call](#dl-php-call) or [callArr](#dl-php-callArr)), the function is run (with any supplementary data provided).\n\n## Parameters\n  - `string $name` \u2013 name of the event to bind to\n  - `function $func` \u2013 function to bind to event\n     - The last (or only) argument of this function should be `$id`, whose value will usually be the number ID of the client who calls this event\n\n## Return Value\n`bool` success\n  - `true` if function successfully bound\n  - `false` on error\n"}; }