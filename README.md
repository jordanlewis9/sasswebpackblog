When I create a project, I like to use the [BEM](http://getbem.com) methodology. When it comes to the actual naming of the elements, I try to make them as descriptive as possible while following BEM, but can get carried away sometimes (just open your inspector if you want to see how carried away I can get). The reason I bring BEM up is because BEM fits in nicely with the CSS preprocessor [SASS](https://sass-lang.com). I really love SASS for the nesting and modularity of the code, making it so much easier to maintain thousands of lines of CSS. With that being said, let's set up the ability to use SASS via [Webpack](https://webpack.js.org)!
<br/><br/>
Somewhere in your normal "projects" folder, go ahead and make a new directory. Go into this new directory via your terminal, and we're going to npm init a package.json file. After we do this, let's make a couple of files in the root directory.
<br/><br/>

```
touch index.html index.js main.css
```

<br/><br/>
Now that we're on the same page, create a simple HTML template like the one shown below:
<br/><br/>

```
<div class="div">
  <div class="div__inner">
    <div class="div__inner--text">
      THIS IS NOT SEMANTIC BUT THIS POST ISN'T ABOUT SEMANTICS
    </div>
  </div>
</div>
```

<br/><br/>
Eventually, we need to install Webpack to actually use SASS in Webpack. We're going to install a few dependencies first, and then install the rest a little later.
<br/><br/>

```
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```

<br/><br/>

In the event that you don't know what the above packages are, Webpack is a file bundler that bundles all of our front-end code into a couple of large files. This reduces the amount of files that the browser needs to download in order to get our site up and running. Webpack-cli is the command line interface that allows us to run webpack commands. Webpack-dev-server sets up a live preview (with a bit of configuration) of our site when we're in development. What good is setting up a CSS preprocessor if we can't instantly see our changes? HTML-webpack-plugin will automatically inject our JS and CSS files into a template HTML page.
<br/><br/>

Once that is finished installing, create a new file in the root directory called "webpack.config.js". Inside this file, we're going to set up a barebones development environment. Don't worry if you're intimidated by the code below - I'm going to explain every line.
<br/><br/>

```
const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: path.resolve(__dirname, "dist"),
    hot: true
  },
  plugins: [new HTMLWebpackPlugin({
    template: "./index.html"
  })]
}

module.exports = config;
```

<br/><br/>

Webpack runs off of a Node.js instance. This gives us access to requiring the "path" module into the file. The "path" module will be useful later. We're also requiring the use of the html-webpack-plugin so that we can also use it later.
<br/><br/>

We'll be exporting a configuration object from this file.

- The first entry is for the mode we're currently in. By default, webpack sets this to "production", so we want to go ahead and set it to "development"
- The second line is for the main file in which webpack can start building a dependency tree from, based on the imports to this file. Here, it's going to just be "./index.js", but it's very common for this file to be in a src directory. index.js is going to be where we will import any dependencies (and our css!) that we have.
- Next, we're building an output options object. This is where webpack will place our bundled code once it is finished bundling.
- filename is the name that webpack will give the JS bundle once it's finished. There are ways to give the file(s) more dynamic names, but here we're ok with "bundle.js"
- path tells webpack where it should place the bundled files once it's done building them. "dist" is a common folder name for dev environments, and "build" is common for production. We use path.resolve, along with \_\_dirname, to allow webpack to dynamically build the path to the folder. This will place the "dist" folder at the same level as the webpack.config.js file, regardless of potential differing folder structures.
- We pass devServer a configuration object. We can configure devServer because we installed webpack-dev-server earlier.
- port is simply the port webpack will run the dev server on. In your address bar, this will be localhost:3000.
- open: true is not necessary, but this tells webpack to open localhost:3000 in your default browser when you run the command to start the dev server.
- Again we see path.resolve for contentBase. This is where webpack-dev-server will find your files to serve.
- hot is also not necessary, but it enables hot reloading by the browser IE when you save a change and webpack finishes it's continuous bundle, the browser will automatically reload with the changes as well.
- Now we're passing an array to our plugins key. This is simply a list of all of the plugins we want webpack to use.
- The only plugin that we're currently passing in is a new instance of HTMLWebpackPlugin. That's right, plugins for webpack are just JS classes.
- To initiate this class, we only need to pass it a default template to find our HTML code. Here, it's index.html. What the plugin will do now is take the template, inject whatever JS files webpack builds, and output it to where the original output.path tells it to.
- Lastly, we need to export the config object.
  <br/><br/>

Whew, that was a lot! But we're far from over! Now we need to go to our package.json file and set up a couple of scripts - one to have webpack build the files, and another to have webpack-dev-server serve the files. In our scripts in package.json, add the following:
<br/><br/>

```
    "dev:build": "webpack --config webpack.config.js",
    "dev:serve": "webpack serve"
```

<br/><br/>

/// EXCLUDE NODE MODULES!!!
