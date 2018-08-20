# Alternative Clients
The main pocketjs client is written in JavaScript, as the intended purpose is for applications to be web applications. However, the websocket protocol is built on HTTP and is therefore quite extensible and can be implemented in many languages and on many platforms.

### Python
An experimental python client that uses the package [websocket-client v0.40.0](https://pypi.python.org/pypi/websocket-client) can be found [here](https://github.com/anuvgupta/pocketjs/blob/master/clients/pocket.py). It doesn't work perfectly, but I've found it is useful for Raspberry Pi projects. Feel free to develop it further.

### Other Platforms
If you wish to build other clients for your application, feel free to study the existing clients and create a pocketjs client in another language that supports websockets.
