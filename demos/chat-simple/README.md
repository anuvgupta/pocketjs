# chat-simple
A demo of a simplistic chat application (for realtime messaging) created with pocketjs  
Clients can send and receive messages that appear on other clients' screens immediately!  
This demo is online at [anuv.me/pocketjs/demos/chat-simple](http://anuv.me/pocketjs/demos/chat-simple)

## code
 - `pocket.php` is the pocketjs server-side library
 - `chat-simple.php` is the chat server code that uses `pocket.php` to create a WebSocket server
 - `www/pocket.js` is the pocketjs client-side library
 - `www/index.html` is the chat client code that uses `pocket.js` to create a pocketjs WebSocket client
    - It connects and sends/receives messages to/from the pocketjs WebSocket server created by `chat-simple.php`
 - Check out the comments in each file for details

## instructions
To test this demo yourself:
 1. Clone this repository
 2. Open a terminal/command-line window
    1. Navigate to this folder
    2. Run the command `php chat-simple.php`
    3. If you see an error like: `Warning: socket_bind(): unable to bind address [48]: Address already in use`
        1. By default, the chat demo binds a WebSocket server to port `30000`, because this port is usually unused. However, in this case, it is being used by another process on your machine.
        2. Choose an open port on your machine
            - `8000` and `8443` are typical for WebSockets, and ports around `30000` are often left unused
            - Check [this article](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) for conventional port usages
            - On a linux/macOS machine
                - Run `netstat`, `netstat -tulpn`, or `netstat -an | grep LISTEN` to see all running processes
                - Run `sudo lsof -i :`*some_port*` | grep LISTEN` to check for processes running on a port
                    - Ex: `sudo lsof -i :30000 | grep LISTEN`
        3. Open `index.html` in your favorite text editor (Atom)
            - Change this line:
            ```javascript
            pocket.connect('localhost', 30000, 'chat-simple.php');
            ```
            to this (use whatever port you chose instead of PORT)
            ```javascript
            pocket.connect('localhost', PORT, 'chat-simple.php');
            ```
 3. View the chat page
    - Open `index.html` in your favorite web browser (Chrome)
 4. View the server output
    - Check the terminal window in which the pocketjs server is running to see a log
 5. Chat with yourself
    - Check the JavaScript console for any error messages that might appear
    - Check the [docs](#documentation) and [tutorials](#further-tutorials) for troubleshooting, or [contact me](mailto:pocketjs@anuv.me) through email
    - Open the page in a new window, place them side by side, and enjoy the realtime updates!
    - Check out the other demos, like [chat-better](../chat-better)
