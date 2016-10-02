# pocketjs
pocketjs is a lightweight WebSocket library for writing realtime applications in PHP and JavaScript.  
&nbsp;  
*Why pocketjs?*  
Many web developers, such as myself, have many existing dynamic web applications currently deployed. But they require a solution for seamless realtime integration, rather than a framework around/in which to architect their entire application. There are many existing options, such as [node.js](http://nodejs.org) and [Firebase](https://firebase.google.com), but many require a dramatic shift to an unfamiliar and heavy framework, or are not simultaneously cost-effective and scalable. **pocketjs** is a lightweight, encapsulated, and straightforward library for incorporating realtime updates into an existing web app (preferably written in PHP, but any language should be compatible).
#### Visit [anuv.me/pocketjs](http://anuv.me/pocketjs)

## Architecture
pocketjs blends well into existing web frameworks:
 - Web Server
    - Handles HTTP/HTTPS requests
    - Runs on port 80/443, or with a reverse proxy
    - Apache, XAMPP, NGINX, Rails, macOS, node.js, etc.
 - pocketjs WebSocket Server
    - Handles WS/WSS requests
    - Runs on port 8000/8443 (or others)
    - Backgrounded PHP process of a pocketjs script
        - ie. `nohup` on Linux, or or other

The WebSocket server runs independently from the Web Server, and can easily be appended to an existing application.

## Getting Started
*View a live demo!*
 1. View a live demo online at [anuv.me/pocketjs/demo](http://anuv.me/pocketjs/demo)
 2. View an improved demo online at [anuv.me/pocketjs/#hook](http://anuv.me/pocketjs/#hook)
 3. View a local demo
    - Clone this repository onto your machine
    - Open `demo/www/index.html` in your favorite web browser (Chrome)
 4. Host your own local chat app
    - Follow the steps below!

*Set up a local pocketjs chat demo in just* ***5*** *simple steps*
 1. Install PHP 5.4 or above, or PHP7
    - From [php.net/downloads.php](http://php.net/downloads.php)
    - Or your favorite package manager
 2. Clone [this](http://github.com/anuvgupta.pocketjs) repository
    - Copy the contents of `demo/www` into a new folder `pocketjs` in your web server's `www` or `htdocs` directory
        - In that folder, open `pocketjs/app.js` in your favorite text editor (Atom)
        - Scroll to the bottom and change
        ```javascript
        pocket.connect('aws.anuv.me', 8000, 'chat.php');
        ```
        to this (use `127.0.0.1` if `localhost does not work`)
        ```javascript
        pocket.connect('localhost', 30000, 'chat.php');
        ```
    - Copy the folder `demo` (not including `www`) to somewhere convenient
 3. Start the pocketjs chat demo server
    - Navigate to the `demo` folder from step 2
    - Run the following command in a shell: `php chat.php -- nobash`
    - If you see an error like: `Warning: socket_bind(): unable to bind address [48]: Address already in use`
        1. By default, the chat demo binds a WebSocket server to port `30000`, because this port is usually unused. However, in this case, it is being used by another process on your machine.
        2. Choose an open port on your machine
            - `8000` and `8443` are typical for WebSockets, and ports around `30000` are often left unused
            - Check [this article](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) for conventional port usages
            - On a linux/macOS machine
                - Run `netstat`, `netstat -tulpn`, or `netstat -an | grep LISTEN` to see all running processes
                - Run `sudo lsof -i :`*some_port*` | grep LISTEN` to check for processes running on a port
                    - Ex: `sudo lsof -i :30000 | grep LISTEN`
        3. Go back to the `app.js` file you modified before and reopen it
            - Change this line:
            ```javascript
            pocket.connect('localhost', 30000, 'chat.php');
            ```
            to this (use whatever port you chose instead of PORT)
            ```javascript
            pocket.connect('localhost', PORT, 'chat.php');
            ```
 4. View the chat page
    - Open your favorite web browser (Chrome)
    - One of two options:
        1. Start your web server and navigate to `http://` (your IP/hostname+port, ie. `localhost` or `127.0.0.1:80`) `/pocketjs` in your browser
        2. Or, open *your_web_server's_www_directory*`/pocketjs/index.html` in your browser
 5. Chat with yourself
    - Check the JavaScript console for any error messages that might appear
    - Check the [docs](#documentation) and [tutorials](#further-tutorials) for troubleshooting, or [contact me](mailto:pocketjs@anuv.me) through email
    - Open the page in a new window, place them side by side, and enjoy the realtime updates!

## Further Tutorials
&nbsp;&nbsp;View this tutorial and others at [anuv.me/pocketjs/docs?tutorials](http://anuv.me/pocketjs/docs?tutorials)

## Documentation
&nbsp;&nbsp;View all API docs and tutorials at [anuv.me/pocketjs/docs](http://anuv.me/pocketjs/docs)
&nbsp;  
&nbsp;  

# Compatibility
&nbsp;&nbsp;&nbsp;&nbsp;
[![XAMPP](http://anuv.me/pocketjs/img/logo/xampp_75.png)](http://www.apachefriends.org)
[![NGINX](http://anuv.me/pocketjs/img/logo/nginx_75.png)](http://www.nginx.com/)
[![RubyOnRails](http://anuv.me/pocketjs/img/logo/railsB_75.png)](http://rubyonrails.org/)
[![Node.js](http://anuv.me/pocketjs/img/logo/node_75.png)](http://nodejs.org/)
[![macOS Server](http://anuv.me/pocketjs/img/logo/macos_75.png)](http://www.apple.com/macos/server/)  
pocketjs is compatible with many libraries and frameworks.  
For more questions about compatibility, email me at [pocketjs@anuv.me](mailto:pocketjs@anuv.me?Subject=Compatibility%20Issue)  
&nbsp;  
# License
&nbsp;&nbsp;pocketjs is released under the [MIT License](https://github.com/anuvgupta/pocketjs/blob/master/LICENSE.md)
