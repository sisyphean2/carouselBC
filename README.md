carouselBC
==========

An easy-to-use JQuery and javascript carousel that doesn't use the "mask" paradigm.

Steps to use this plugin:

1) Download the carouselBC.js, carouselBC.css, and Carousel_Pictures.txt files and upload them to your server.

2) Replace the urls, captions, and picture links in the Carousel_Pictures.txt file with your own.

3) Reference the js and css files in the <head> of your html, like this: link type='text/css' rel='stylesheet' href='carouselBC.css'/, script type='text/javascript' src='carouselBC.js' /script
   
4) Insert a div element with id="carouselBC" in your HTML at the desired location, like so: div id='carouselBC' /div

5) Invoke the plugin on the div in your javascript file, like this: $("#carouselBC").carouselBC();

6) You're done!

The plugin assembles the necessary HTML elements for the carousel and inserts them into the carouselBC div dynamically and on its own. Because of the way the plugin is written, the elements it generates and inserts can be styled by modifying the settings in the carouselBC.css directly. There is no need to venture into the source code.

You may use the same picture for the thumbnails along the bottom and for the big picture. The CSS in the plugin automatically resizes them to the default sizes. These sizes can be adjusted by modifying the CSS in carouselBC.css, but be aware that changing the size of the pictures will make it necessary to change the size and position of other elements as well. That said, because this plugin does not used the mask paradigm often used in slideshows, formatting both the big picture and the sliding bar at the bottom should be relatively easy and forgiving.

As always, if an element in your webpage shares an id or class with one of the elements in the plugin, there may be behavorial conflicts in either javascript or css.

This plugin is entirely namespaced, no global variables other than the method name $().carouselBC are added.
