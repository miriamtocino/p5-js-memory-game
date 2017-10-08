## Memory Game

When I was a child, I remember to have played "Memory" game not only in "real life" (with actual paper tiles), but also in the computer. A friend of my dad had programmed it himself and I learned all the countries and their flags with it.  

This time, instead of countries flags, I chose to use the drawings I made while I was preparing for childbirth. I will be printing them as well in paper, so I can play with Kei both "offline" and "online".

I decided to build the game in JavaScript (I'm brushing-up my skills with this language at the moment) and the [p5.js](https://p5js.org) library.

Once I am done, this is what my "Memory" game will look like:

[![](https://github.com/miriamtocino/p5-js-memory-game/blob/master/screenshot.gif?raw=true)](https://github.com/miriamtocino/p5-js-memory-game/blob/master/screenshot.gif?raw=true)

"Memory" game is a good example of using computer memory to remember information, like with arrays.

## Game Rules

To make the game, we will need to re-create the physical parts of the game using our drawing commands and implement the rules of the game using variables and logic. We will make a single-player version of the game, which will simplify some of the logic. Here's an outline of what we'll implement:

* The game consists of an even number of tiles with images on one side and a generic back. Each image appears on precisely two tiles.

* When the game starts, all tiles are turned face down.

* The player then flips over two cards, selecting them by clicking on them. If the two tiles have the same image, they remain face up. Otherwise, the tiles flip back over after a small period of time.

* The goal of the game is to get all the tiles flipped face up (i.e., find all the matching image pairs) in the least number of tries. That means that lower number of tries are better scores.

## Node http-server

If you want to run the game locally, feel free to download the code in this repository. Be careful that in order to get all the images rendered properly, you will need to run a local server. I chose to run a Node http-server when coding the app. Check instructions [here](https://github.com/processing/p5.js/wiki/Local-server#node-http-server-2nd-option).

After you do that, you only need to run the server under the project folder and visit [http://localhost:8080/](http://localhost:8080/) in the browser.

## Resources

* [p5.js](https://p5js.org)
* [Memory Game in Khan Academy](https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations/memory-game/a/intro-to-memory)
