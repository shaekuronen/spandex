#Grunt-based project template

Spandex is a Static Site Generator built on Node JS & Grunt

##Installation

###1. Install grunt-init
[grunt-init](http://gruntjs.com/project-scaffolding) is a standalone utility 

`npm install -g grunt-init`

If it tells you you don't have the necessary privileges, be more assertive:

```shell
sudo npm install -g grunt-init
```

###2. Install the template
`git clone git@github.com:GuardianInteractive/grunt-init-template.git ~/.grunt-init/spandex`


##Usage
Create a project folder, then initialise the project from the `spandex` template:

```shell
mkdir project-name
cd project-name
grunt-init spandex
```

You will be prompted for a project name, but it will default to the name of the folder you created (`project-name` in the example above), so just hit `Enter` twice.

You will then be prompted to do `npm install` to install grunt (and its plugins and dependencies) locally to the project. Further instructions for setting up with GitHub and using grunt can be found in the project's `README.md` file.