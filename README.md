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
&nbsp;&nbsp;&nbsp;&nbsp;[![NGINX](http://anuv.me/pocketjs/img/logo/nginx_75.png)](https://www.nginx.com/) [![HTML5](http://anuv.me/block.js/img/logo/html5_75.png)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) [![CSS3](http://anuv.me/block.js/img/logo/css3_75.png)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) [![EcmaScript6](http://anuv.me/block.js/img/logo/js5_75.png)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla)
[![AngularJS](http://anuv.me/block.js/img/logo/angular_75.png)](https://angularjs.org/)  
block.js is compatible with many libraries and frameworks.  
For more questions about compatibility, email me at [blockjs@anuv.me](mailto:blockjs@anuv.me?Subject=Compatibility%20Issue)  
&nbsp;  
# License
&nbsp;&nbsp;pocketjs is released under the [MIT License](https://github.com/anuvgupta/pocketjs/blob/master/LICENSE.md)
