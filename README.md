# pocketjs
pocketjs is a lightweight WebSocket library for writing realtime applications in PHP and JavaScript.  
&nbsp;  
*Why pocketjs?*  
Many web developers, such as myself, have many existing dynamic web applications currently deployed. But they require a solution for seamless realtime integration, rather than a framework around/in which to architect their entire application. There are many existing options, such as [node.js](http://nodejs.org) and [Firebase](https://firebase.google.com), but many require a dramatic shift to an unfamiliar and heavy framework, or are not simultaneously cost-effective and scalable. **pocketjs** is a lightweight, encapsulated, and straightforward library for incorporating realtime updates into an existing web app (preferably written in PHP, but any language should be compatible).
#### Visit [anuv.me/pocketjs](http://anuv.me/pocketjs)

## Architecture
pocketjs is blends well into existing web frameworks:
 - Web Server
    - HTTP/HTTPS request handler running on port 80/443
    - Apache, XAMPP, NGINX, Rails, WEBricks, node.js, etc.
 - pocketjs WebSocket Server
    - WS/WSS request handler running on port 8000/8443 (or other)
    - Backgrounded PHP process of a pocketjs script
        - ie. `nohup` on Linux, or or other

The WebSocket server runs independently from the Web Server, and can easily be appended to an existing application.

&nbsp;  
&nbsp;  

# Compatibility
&nbsp;&nbsp;&nbsp;&nbsp;
[![NGINX](http://anuv.me/pocketjs/img/logo/nginx_75.png)](http://www.nginx.com/)
[![XAMPP](http://anuv.me/pocketjs/img/logo/xampp_75.png)](http://www.apachefriends.org)
[![PHP](http://anuv.me/pocketjs/img/logo/php_75.png)](http://php.net)  [![RubyOnRails](http://anuv.me/pocketjs/img/logo/railsA_75.png)](http://rubyonrails.org/)
[![Node.js](http://anuv.me/pocketjs/img/logo/node_75.png)](http://nodejs.org/)  
pocketjs is compatible with many libraries and frameworks.  
For more questions about compatibility, email me at [pocketjs@anuv.me](mailto:pocketjs@anuv.me?Subject=Compatibility%20Issue)  
&nbsp;  
# License
&nbsp;&nbsp;pocketjs is released under the [MIT License](https://github.com/anuvgupta/pocketjs/blob/master/LICENSE.md)
