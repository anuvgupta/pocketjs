# Command Line Utility
pocketjs comes with a simple command line utility written in bash that helps create and manage pocketjs applications.  
*It should work fine on macOS and Linux, but a Windows version has not been and will never be created.*

## Installation
  - Download it [here](https://github.com/anuvgupta/pocketjs/blob/master/pocketjs)
  - Place it in a convenient location
     - Your home directory `~`
         - My preference on my own server
     - Directly in `/usr/bin` (or as a symlink)
     - Directly in `/usr/local/bin` (or as a symlink)
     - The project directory (where server script `server.php` is located)
         - My preference during development

## Usage
  - All features must be used while in the project directory (where server script `server.php` is located)
  - The pocketjs application directory will be created here; thus all features must be used while directly outside of this generated application directory.
  - The application directory contains important files that the utility and other features require to help you manage your application

## Features
*The following syntax assumes the `pocketjs` command can be accessed globally. Tailor the command to accommodate where you placed the bash script.*
  - Help
     - Syntax: `pocketjs help`
     - A quick guide that summarizes all features and their syntax
  - Utility
     - Syntax: `pocketjs utility`
     - A nice all-in-one command line interface for managing your application
     - Uses all the other features of the bash script (so don't bother with the rest of this guide unless you want to learn how the other features work)
     - Once an application is stopped, it cannot be restarted unless the utility is exited and reopened only after a few minutes (due to port binding restrictions)
  - Create New Application
     - Syntax: `pocketjs forever {name} {command}`
         - `name` = name for your new application (alphanumeric, dash `-` and underscore `_` allowed)
         - `command` = `'php /absolute/path/to/pocketjs_server_script.php'` (single quotes included)
     - Creates a new pocketjs application
         - Backgrounds `command` with [`nohup`](https://linux.101hacks.com/unix/nohup-command/)
         - Creates a folder with name `name`
         - Places in that folder:
             - PID file `pid.txt` – contains PID of `nohup` process
             - Log file `log.txt` – contains output of `nohup` process
             - Name file `name,txt` – contains full original `name` argument
             - Command file `cmd.txt` – contains full original `command` argument
  - Stop Running Application
     - Syntax: `pocketjs never {name}`
         - `name` = name of existing running application to stop
     - Stops a running pocketjs application (whose app folder is in the current directory)
  - Clean Up Stopped Application
     - Syntax: `pocketjs cleanup {name}`
         - `name` = name of existing stopped application to delete
     - Deletes files and folder of stopped pocketjs application (whose app folder is in the current directory)
  - Get PID of Application
     - Syntax: `pocketjs pid {name}`
         - `name` = name of existing application from which to read PID
     - Outputs the PID of a pocketjs application (whose app folder is in the current directory)
         - Simply reads from app's `pid.txt` file
         - If app is stopped, PID represents last known PID
         - If app is running, PID represents current PID
  - Read Log of Application
     - Syntax: `pocketjs log {name}`
         - `name` = name of existing application from which to read log
     - Outputs the full logged output of a pocketjs application (whose app folder is in the current directory)
         - Simply reads from app's `log.txt` file
