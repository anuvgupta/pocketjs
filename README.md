# pocketjs
<!-- ![pocketjs](http://anuv.me/pocketjs/img/pocketjs_40.png) -->
pocketjs is a lightweight WebSocket library for writing realtime applications in PHP and JavaScript.  
&nbsp;  
*Why pocketjs?*  
Many web developers, such as myself, have many existing dynamic web applications currently deployed. But they require a solution for seamless realtime integration, rather than a framework around/in which to architect their entire application. There are many existing options, such as [node.js](http://nodejs.org) and [Firebase](https://firebase.google.com), but many require a dramatic shift to an unfamiliar and heavy framework, or are not simultaneously cost-effective and scalable. **pocketjs** is a lightweight, encapsulated, and straightforward library for incorporating realtime updates into an existing web app (preferably written in PHP, but any language should be compatible).
#### Visit [anuv.me/pocketjs](http://anuv.me/pocketjs)

## Architecture
pocketjs is blends well into existing web frameworks
 - Web Server
    - HTTP/HTTPS request handler running on port 80/443
    - Apache, XAMPP, Rails, WEBricks, node.js, etc.
 - pocketjs WebSocket Server
    - WS/WSS request handler running on port 8000/8443 (or other)
    - Backgrounded php process with a pocketjs script
        - ie. `nohup` on linux, or or other
