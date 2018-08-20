# Setup
A guide for setting up an environment for a pocketjs application.

### Requirements
  - A web browser
  - Any web server (Apache, Node.js, etc)
  - PHP 5.4 or above, or PHP7

### Install
  - Download [`pocket.php`](https://github.com/anuvgupta/pocketjs/blob/master/pocket.php) and [`pocket.js`](https://github.com/anuvgupta/pocketjs/blob/master/clients/pocket.js)
  - Start your web server, go to the document root folder for your website
  - Place `pocket.js` in a place where your `index.html` file can access it
  - Place `pocket.php` outside of your document root (clients shouldn't be able to access it)
  - In your machine's network settings, open a single port (ie. 8000) publicly to TCP connections (if not open already by default)

### Base Files
- Go to your document root
- Create `index.html`
    - Include `pocket.js` with a normal script tag

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>pocketjs app</title>
    </head>
    <body>
        <script src="pocket.js" type="text/javascript"></script>
        <script type="text/javascript">
            // configure client here
        </script>
    </body>
</html>
```
- Go to where you placed `pocket.php` (outside of the document root)
- Create `server.php`
    - Include `pocket.php` with `require()`

```php
<?php
require('pocket.php');
?>
```

Check out [basics](#dl-tut-basics) next.
