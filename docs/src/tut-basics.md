# Basics
A guide to pocketjs application basics.  

### Create Pockets
  - Create pocket server in `server.php`
     - Look at constructor parameters in [`__construct`](#dl-php-construct)
     - Use port that you opened in [setup](#tut-setup)
     - Note: *blocking timeout* should be set to `null` in chat apps and other apps that require the server to process data only when prompted by clients. It should be set to an integer value if the app requires the server to consistently and repeatedly process data, unprompted by any client. (When in doubt, use a large number, which reduces server load; this can always be changed.)

  ```php
  $pocket = new Pocket('10.0.0.45', 8000, 20, 50);
  ```
  - Create pocket client in `index.html`
     - Don't use the  `new` keyword

  ```javascript
  var pocket = Pocket();
  ```

### App Format
  - server script – `server.php`
     1. Construct/configure pocket server
     2. Declare/initialize application variables
     3. Bind handlers to client events
        - Handlers should process client data, alter application variables, and send new information to client(s)
        - Configure custom handlers as well as "connection", "run", and "close" events
     4. Open socket to client connections  
  - client script – `client.html`
     1. Construct pocket client
     2. Declare/initialize application variables
     3. Bind handlers to server events
        - Handlers should process server data, alter application variables, and send new information to server
        - Configure custom handlers as well as "connection" and "close" events
     4. Separately, data can also be sent to the server asynchronously with forms and buttons
     5. Connect client socket to server

#### Example
This demo demonstrates the basic format of a pocketjs app with a simple demo in which clients can log in and set data in a dictionary.  
*(This demo is meant only to showcase the core features of pocketjs. Test it on your local server, but do not make it publicly online, as it displays data on a page without sanitizing. Essentially, it's not secure.)*
  - server script – `server.php`
    - ***N.B.:*** *Take note of* `use (&$pocket, ...)` *present in every closure function signature. This ensures that objects and other application variables outside the scope of these closure functions are available within these functions. The ampersand* `&` *ensures that these variables are passed as references, such that the functions will always have access to the most current representation of the object. This is essential; always follow this protocol.*


```php
// Construct/configure pocket server
$pocket = new Pocket('10.0.0.45', 8000, 20, 50);
$pocket->setOpt('kick-bad-data', false);

// Declare/initialize application variables
$clients = [ ]; // clients' info
$data = [ 'value1' => 25 ]; // app data

// Bind handlers to client events
$pocket->onConn(function ($id) use (&$pocket, &$clients) { // when new client connects
    $pocket->log("user[$id] connected");
    $clients[$id] = [ // initialize client's info
        'id' => $id,
        'name' => '',
        'age' => 0
    ];
    $pocket->send('askForNameAndAge', $id); // ask for client's info
});
$pocket->bind('nameAndAge', function ($name, $age, $id) use (&$pocket, &$clients, &$data) { // when new client sends info
    $pocket->log("user[$id] is $name, $age");
    // save client's info
    $clients[$id]['name'] = $name;
    $clients[$id]['age'] = $age;
    $pocket->send('update', $id, json_encode($data)); // push current app data to new client
});
$pocket->bind('setData', function ($key, $value, $id) use (&$pocket, &$data) { // when client sends data changes
    $pocket->log("data value $key set to $value");
    // save changes
    $data[$key] = $value;
    // push updated app data to all clients (including he who sent)
    $pocket->sendAll('update', json_encode($data));
});
$pocket->onClose(function ($id) use (&$pocket) { // when client disconnects
    $pocket->log("user[$id] disconnected");
    // remove client data
    unset($clients[$id]);
});

// Open socket to client connections
$pocket->open();
```
  - client script – `client.html`  

```html
Key: <input type="text" id="keyText"/><br/>
Value: <input type="text" id="valText"/><br/>
<button id ="submitButton">Set Data</button><br/>
<br/>
<pre id="outputBox">connecting...</pre>
<script src="pocket.js" type="text/javascript"></script>
<script type="text/javascript">
  // Construct pocket client
  var pocket = Pocket();

  // Declare/initialize application variables
  var user = { // client's info
      name: '',
      age: 0
  };

  // Bind handlers to server events
  pocket.onOpen(function () { // when pocket connects
      console.log('connected');
      // get/save client data
      user.name = prompt('What is your name?');
      user.age = prompt('What is your age?');
  });
  pocket.bind('askForNameAndAge', function () { // when server asks for client's info
      pocket.send('nameAndAge', user.name, user.age); // send client's info to server
  });
  pocket.bind('update', function (data) { // when server sends snapshot of app data
      var parsed_data = JSON.parse(data); // parse snapshot
      console.log(parsed_data);
      document.getElementById('outputBox').innerHTML = JSON.stringify(parsed_data, null, 2); // display snapshot on page
  });
  pocket.onClose(function () { // when pocket disconnects
      console.log('disconnected');
      document.getElementById('outputBox').innerHTML = 'disconnected'; // notify user
  });

  // Separately, data can also be sent to the server asynchronously with forms and buttons
  document.getElementById('submitButton').addEventListener('click', function () { // when button clicked
      // get new data changes
      var key = document.getElementById('keyText').value.trim();
      var value = document.getElementById('valText').value.trim();
      if (key != null && key.trim() != '') {
          pocket.send('setData', key, value); // send data changes to server
      }
  });

  // Connect client socket to server
  pocket.connect('example.com', 8000, 'server.php', false);
</script>
```

Check out some [demos](#dl-tut-demos) next.
