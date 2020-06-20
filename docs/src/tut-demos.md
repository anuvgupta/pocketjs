# Demos

A few demos and apps have been made to help understand pocketjs.

1. Simple Chat
    - Live demo: [github.anuv.me/pocketjs/demos/chat-simple](http://github.anuv.me/pocketjs/demos/chat-simple/)
    - A simplistic instant messaging application
    - Barebones, no nicknames, only supports messages being posted
    - Not practical in real life, just a demo of basic realtime functionality
    - View tutorial/source: [github.com/anuvgupta/pocketjs/tree/master/demos/chat-simple](https://github.com/anuvgupta/pocketjs/tree/master/demos/chat-simple)
2. Better Chat
    - Live demo: [github.anuv.me/pocketjs/demos/chat-better](http://github.anuv.me/pocketjs/demos/chat-better/)
    - An improved (but basic) instant messaging application
    - Supports nicknames, history, autoscrolling, secure text nodes
    - Actually useful in real life, consider replicating
    - View tutorial/source: [github.com/anuvgupta/pocketjs/tree/master/demos/chat-better](https://github.com/anuvgupta/pocketjs/tree/master/demos/chat-better)

## Example Apps

Here are some applications I've made that use pocketjs for their core functionality:

-   rubbr
    -   Play now: [pjs.rubbr.anuv.me](http://pjs.rubbr.anuv.me)
    -   View source: [github.com/anuvgupta/rubbr](https://github.com/anuvgupta/rubbr)
    -   An online multiplayer .io-style game (similar to [agar.io](http://agar.io)) in which players are cars, travel around a map, collect money and health, and blast through other players to damage/destroy them, thus gaining money and leaderboard points
        -   pocketjs calculates every player's position & collisions, synchronizes the map (positions of money/players/health/nitro) as well as the leaderboard between all clients
-   slop
    -   View online: [slop.anuv.me](http://slop.anuv.me)
        -   _Password: slop_
    -   View source: [github.com/anuvgupta/slop](https://github.com/anuvgupta/slop)
    -   An online realtime collaborative grocery list app. Multiple lists may be created, with various names/purposes. New items can be added and removed, as well as crossed off.
        -   pocketjs synchronizes all lists and items between all clients, so the changes by any one client are immediately reflected across all client devices (no reloading necessary)
