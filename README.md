# pocketjs
pocketjs is a lightweight WebSocket library for writing realtime applications in PHP and JavaScript.  
&nbsp;  
*Why pocketjs?*  
Many web developers, such as myself, have many existing dynamic web applications currently deployed. But they require a solution for seamless realtime integration, rather than a framework around/in which to architect their entire application. There are many existing options, such as [node.js](http://nodejs.org)/[socket.io](http://socket.io) and [Firebase](https://firebase.google.com), but many require a dramatic shift to an unfamiliar and heavy framework, or are not simultaneously cost-effective and scalable. **pocketjs** is a lightweight, encapsulated, and straightforward library for incorporating realtime updates into an existing web app (preferably written in PHP, but any language should be compatible).
#### Visit [github.anuv.me/pocketjs](http://github.anuv.me/pocketjs)

## Architecture
pocketjs blends well into existing web frameworks:
 - Web Server - all are compatible
    - Apache, NGINX, node.js, etc.
    - Handles HTTP/HTTPS requests
    - Runs on port 80/443, or with a reverse proxy
    - Serves static/dynamic HTML/CSS/JS content
        - Provides WebSocket client for pocketjs server
 - WebSocket Server - pocketjs
    - Handles WS/WSS requests
    - Runs on port 8000/8443 (or custom)
    - Backgrounded PHP process of a pocketjs script
        - ie. `nohup php` on Linux, or other
    - Receives and sends updates to/from clients
 - WebSocket Client - pocketjs
    - Provided by web server over HTTP/HTTPS
    - Connects to WebSocket server over WS/WSS
    - Receives and sends updates to/from server

The WebSocket server runs independently from the Web Server, and can easily be appended to an existing application.  
&nbsp;  
Regarding program structure, pocketjs utilizes an *event-driven flow* model to simplify operations as much as possible within the bounds of PHP.  

## Getting Started
*View a live demo!*
 1. View live demos online at [github.anuv.me/pocketjs/demos](http://github.anuv.me/pocketjs/demos)
 2. View a chat demo alongside code online at [github.anuv.me/pocketjs/#hook](http://github.anuv.me/pocketjs/#hook)
 3. Host your own local chat app
    - Follow the steps below!

*Set up a local pocketjs chat demo in just* ***3*** *simple steps*
 1. Install PHP 5.4 or above, or PHP7
    - From [php.net/downloads.php](http://php.net/downloads.php)
    - Or your favorite package manager
 2. Clone [this](http://github.com/anuvgupta/pocketjs) repository
 3. Go to the [demos](http://github.com/anuvgupta/pocketjs/tree/master/demos) folder and try out some demos!


## Further Tutorials
View this tutorial and others at [github.anuv.me/pocketjs/docs?tutorials](http://github.anuv.me/pocketjs/docs?tutorials)

## Documentation
View all API docs and tutorials at [github.anuv.me/pocketjs/docs](http://github.anuv.me/pocketjs/docs)
&nbsp;  
&nbsp;  

# Compatibility
pocketjs is compatible with many libraries and frameworks, as it functions on its own.  
For more questions about compatibility, email me at [pocketjs@anuv.me](mailto:pocketjs@anuv.me?Subject=Compatibility%20Issue)  
# License
pocketjs is released under the [MIT License](https://github.com/anuvgupta/pocketjs/blob/master/LICENSE.md)
