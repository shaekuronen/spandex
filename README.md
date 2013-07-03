#Spandex - Static Site Generator

Spandex is built on Node JS & Grunt 

Functionality
- Concatentate, minify, and rev JS and CSS files
- Minify images
- Server-side Templating w/ EJS
- Layout Management with EJS Includes
- Local Server w/ Node Connect

##Installation

###1. Install grunt-init
[grunt-init](http://gruntjs.com/project-scaffolding) is a standalone utility 

```shell
npm install -g grunt-init
```

If you don't have the necessary privileges, be more assertive:

```shell
sudo npm install -g grunt-init
```

###2. Install the template
```shell
git clone https://github.com/shaekuronen/spandex.git ~/.grunt-init/spandex
```

##Usage
Create a project folder, then init the project from the `spandex` template:

```shell
mkdir project-name
cd project-name
grunt-init spandex
```

You will be prompted for a project data, enter a new value or accept defaults

To install grunt (and its plugins and dependencies) locally to the project:

```shell
cd www
npm install
```

If you don't have the necessary privileges, be more assertive:

```shell
sudo npm install
```