---
layout: post
title: Developing Minesweeper
---

![Minesweeper Screenshot](https://raw.githubusercontent.com/ss37/Minesweeper/gh-pages/public/images/screenshot_1.JPG)  

######Generating Smiley

In this game, the player can click on the smiley to start a new game. Every time he clicks on a cell, you can notice that the expression of the smiley changes. This I was able to create using SVG. Scalable Vector Graphics (SVG) is an open standard developed by World Wide Web Consortium (W3C). Since it is easy to incorporate SVG into HTML5, I was able to generate a smiley by creating a big circle, 2 smaller circles as eyes and a curve for its mouth. :blush: So Simple! In the end of a game, you can notice the smiley changes to a smarty :sunglasses: or a knocked out :dizzy_face: smiley based on the win/loss of the player.

![Minesweeper Won Screenshot](https://raw.githubusercontent.com/ss37/Minesweeper/gh-pages/public/images/screenshot_4.JPG)

######Randomizing Mines

I initially developed a single grid of 5 mines and ensured all the cells carried the correct values. I used the concepts of arrays and event handlers in JavaScript to cover the cell and uncover the cell. During the summer, I generated an algorithm that randomly generated mines and the correct values in the cells. So what you see now is a game that changes each time you click on the smiley!

![Minesweeper Lost Screenshot](https://raw.githubusercontent.com/ss37/Minesweeper/gh-pages/public/images/screenshot_3.JPG)

######Creating Flags

I loved the idea of flags in the classic game on Windows. I replicated it in here using SVG and JavaScript. Since a flag is a line and a triangle, it was pretty much easy. So every time a player uses a right click on a cell, he/she can a flag displayed right there. This helps him remember that the cell contains a mine and he should not click on it while playing the game.

![Minesweeper Flags Screenshot](https://raw.githubusercontent.com/ss37/Minesweeper/gh-pages/public/images/screenshot_2.JPG)

The rest of the layout of the website was created using Bootstrap. Bootstrap is a really simple, easy-to-use tool for quick web page solutions.
