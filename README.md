# Watto's Spaceship Emporium

Aaaaahhh! Welcome to Watto's shop, eh?   
Take a look around. I've got everything you need, eh? He-he-he-he-he!

#### Quick Overview:  
This has been tested on Chrome, Safari, Firefox, and the latest version of Microsoft Edge.

This is a very simplistic ReactJS app that uses the react-router to handle moving between the list page and the detail page. Otherwise it's pretty much standard JavaScript and ReactJS code. Currently using CSS that's supported in the Evergreen browsers, such as Viewport units.

I couldn't find very many images that were consistent in size / shape, and I didn't want to get bogged down in editing the images to all look the same. They are all, except for one, from the same source at least.

#### Instructions:

To start clone down the repo:

```
git clone https://github.com/joshcoody/space-emporium.git

#OR

git clone git@github.com:joshcoody/space-emporium.git
```

Next you'll need to install all of the dependencies:

```
npm install
```

To view the final project you have 2 options...

First, you can load up the dev server by running:

```
npm start

#OR

npm run start:dev

```

This will run webpack's dev server for you to view the content on http://localhost:8080.

##### NOTE: I use the sass-autocompile package for Atom to compile my SCSS files, so if you run the Dev server you'll need to run the following command first in a separate tab / window:

```
npm run sass:dev
```

The Other option is to run the production server via:

```
NODE_ENV=production npm start

#OR

npm run start:prod
```

That's it, you should be running and seeing the site at http://localhost:8080