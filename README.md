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
Eventually, we need to install Webpack to actually use SASS in Webpack. We're going to install all of the dependencies below
