<div id="top"></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-for">Built For</a></li>
        <li><a href="#model-value">Model Value</a></li>
        <li><a href="#data-flow">Data Flow</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#interfaces">Interfaces</a></li>
    <li>
      <a href="#architecture">Architecture</a>
      <ul>
        <li><a href="#hierarchical-order-diagram-of-resources">Hierarchical Order Diagram of Resources</a></li>
      </ul>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Riconoscimenti</a></li>
    <li><a href="#for-external-visitors">For External Visitors</a></li>
  </ol>
</details>



## About The Project

The Project is focused on showing my abilities with node.js and the languages that rotate around him.
The body of the project is on the bicycle road between Colico and Villa di Chiavenna.

The Project has:
* A HomePage that shows to the user the road and  some usefull infos
* Various page for the small towns that the road hit with comments and the possibility of leave a comment and see what other users thinks
* A Territory page to know better the Valley where the road is placed
* A Infos page

<p align="right">(<a href="#top">back to top</a>)</p>

## Built For

The Target users are either "fit" people or people who appreciates bikes. Who arrives in the website have to know what he wants, the website doesn't guide the user. 
The connection does not require a large bandwidth and can be estabilished with any device.

The Language used is the natural language that anyone can understand.

The Website can be categorized between educational and fun, the research should be direct and active, with small traits of explorative search.
Based on Bates model's the main category is "Searching" and the secondary is "Browsing".

<p align="right">(<a href="#top">back to top</a>)</p>

## Model Value

The value of the application comes out from the quantity of users that can visit it, thus the business model should be something like affiliation or ads-based. Obviously you have to expand the road that the website can cover to attract more users and more money.

<p align="right">(<a href="#top">back to top</a>)</p>

## Data Flow

The datas were already produced and free to use. The only costs came out from the adaptation of them.

The memorization and organization is directory based on the type of data and name of the files based on what they have inside. The JSON files (that are only two) are internal organized to be used easily in a javascript function.
comment.json is a simple JSON array's filled with MongoDB datas, and the other one (infos.json) is hand-written in the same way.

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Express](http://expressjs.com/)

The standard used here are HTML5, CSS3, Node.js for the server-side, JSON for datas, JavaScript and Jade for the error page. 
I tried to reuse more code as possible, so the page for a single zone is written only once and then composed by many javascript function (stored in util.js) that built up the page with the comment-table/cards-slideshow, zone header and form to send opinions.

In this project the controllers are mainly app.js and users.js. These files catch up the request of the user and load the right resources (html, css, js, imgs, ecc..). Those resources provide to create the correct UI.


<p align="right">(<a href="#top">back to top</a>)</p>

## Interfaces

The project is builted around four html files:
* index.html, homepage;
* zona.html, road trait;
* piste.html, lists of all the traits and opinions;
* territorio.html, territorial infos; 
* info.html, author thoughts.

There are two mode for the UI, a "light mode" that use, mostly, dark-green/orange/beige/white/black colors and a "dark mode" that use, mostly, black/electric-blue/gray/white colors.

The page structure is often the same, a header with a navbar (hamburger menu for smartphones and tablets), a main container with the context div and an aside part with two aside elements and then a simple footer.

<p align="right">(<a href="#top">back to top</a>)</p>

## Architecture

<p align="right">(<a href="#top">back to top</a>)</p>

## Hierarchical Order Diagram of Resources

<ul>
  <li>homepage (index.html)</li>
  <li>territorio (territorio.html)<li>
  <li>info (info.html)</li>
  <li>piste (piste.html)
    <ul>
      <li>specific zone (zona.html)<li>
    </ul>
  </li>
  <li>specific zone (zona.html)<li>
</ul>

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Linkedin - [Pietro Masolini](https://www.linkedin.com/in/pietro-m-99b7b318a/)
Instagram - [@pietromasolini_1ne](https://www.instagram.com/pietromasolini_1ne/)

Project Link: [https://github.com/roccobalocco/myapp](https://github.com/roccobalocco/myapp)

<p align="right">(<a href="#top">back to top</a>)</p>


## Acknowledgements

Resources that I found usefull during the development:
* [From image to map-image in HTML website](http://www.image-map.net/)
* [Free infos about everything that works on web](https://www.w3schools.com)
* [Beautiful icons](https://fontawesome.com/v4/)
* [UTF-8 codes](https://www.utf8icons.com/)
* [Original footer](https://codepen.io/julesforrest/pen/qLpgNB)
* [Original Hamburger menu](https://codepen.io/alvarotrigo/pen/QWqKOdb)
* [Color palette inspirations](https://www.shutterstock.com/blog/color-palettes-for-websites)

<p align="right">(<a href="#top">back to top</a>)</p>


