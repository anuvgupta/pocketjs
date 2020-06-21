# pocketjs
pocketjs is a barebones WebSocket library for implementing realtime applications in PHP and JavaScript.  
&nbsp;  
*Why pocketjs?*  
Many web developers have many existing dynamic web applications currently deployed, but they require a solution for seamless realtime integration, rather than a framework around/in which to architect their entire application. There are many existing options, such as [node.js](http://nodejs.org)/[socket.io](http://socket.io) and [Firebase](https://firebase.google.com), but many require a dramatic shift to an unfamiliar and heavy framework, or essentially just having envisioned and built the project for that framework in the first place. **pocketjs** is a lightweight, encapsulated, and straightforward library for incorporating realtime updates into an existing web app (preferably written in PHP, but any language should be compatible).  
*Visit [github.anuv.me/pocketjs](http://github.anuv.me/pocketjs)*. 

## Architecture
pocketjs blends well into existing web frameworks:
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
 - Web Server - all are compatible
    - Apache, NGINX, node.js, etc.
    - Handles HTTP/HTTPS requests
    - Runs on port 80/443, or with a reverse proxy
    - Serves static/dynamic HTML/CSS/JS content
        - Provides WebSocket client for pocketjs server

The WebSocket server runs independently from the Web Server, and can easily be appended to an existing application.  
&nbsp;  
Regarding program structure, pocketjs utilizes an *event-driven flow* model to simplify operations as much as possible within the bounds of PHP.  

## Getting Started
*Documentation and tutorials:* Check out docs and tutorials at [github.anuv.me/pocketjs/docs](http://github.anuv.me/pocketjs/docs). Here you can find a getting started guide, a tutorial on the basics of a typical pocketjs application, and documentation for each function of both the client and server.  

*View a live demo!*
 1. View live demos online at [github.anuv.me/pocketjs/demos](http://github.anuv.me/pocketjs/demos)
 2. View a chat demo alongside code online at [github.anuv.me/pocketjs/#hook](http://github.anuv.me/pocketjs/#hook)
 3. Host your own local chat app
     1. Install PHP 5.4 or above, or PHP7
     2. Clone [this](http://github.com/anuvgupta/pocketjs) repository
     3. Go to the [demos](http://github.com/anuvgupta/pocketjs/tree/master/demos) folder and follow the instructions to set up your own!

### Compatibility
pocketjs is compatible with many libraries and frameworks, as it functions on its own.  

### License
pocketjs is released under the [MIT License](https://github.com/anuvgupta/pocketjs/blob/master/LICENSE.md)
