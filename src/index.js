"use strict";
/**
 * TODO For Library:
 * Buttons and other interactable elements need more work in stage
 * individual stage update methods defined here?
 *
 * Game Plan:
 * Rogue Legacy, Now With Bees (TM)
 * A bunch of bees dressed up as a man
 * platformer inside a mansion(?)
 *  No idea why he's there or what his end goal is
 * originally hiding himself as a man to fit in with society, which uses bees as currency
 * loses bee mass as he gets hit due to losing bees
 * loses bee mass as he uses Bee Abilities (TM)
 * leaves the queen when the swarm disperses
 *  pickup previosuly dropped queens used for upgrades at shop
 *
 *
 * TODO For Game
 * Splash stage
 * lose stage
 * shop stage
 * player movement + properties
 * projectiles
 * enemies
 *  melee + ranged?
 *  settled on wasps + exterminators? what about society?
 * platforms and environment
 *  mansion just for platform stage?
 *  possibly trying to escape a city?
 *  too many bees flew in through windows and banded together to escape?
 * art
 *  player, multiple sprites or dynamic
 *  platforms
 *  projectiles
 *  enemies
 *  backgrounds
 *  other stage screens
 * sound
 *  music
 *  bee sounds? we need it but it could sound traumatizing
 * different playyer attacks
 *  keep it simple by just spawning bee projectiles at first
 *  upgrades could make bees homing, bounce, be reobtainable...
 * Score, time or number of times died
 * NPCs that attack you if it's too obvious you are bees?
 *
 * Feel free to add anything you want here and delete anything that's been completed
 */
exports.__esModule = true;
var three_1 = require("three");
var stage_1 = require("./stage");
var staticImage_1 = require("./staticImage");
var renderer = new three_1.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);//1:1 scale resolution
if (window.innerWidth / 16 > window.innerHeight / 9) {
    renderer.setSize(window.innerHeight * (16 / 9), window.innerHeight); //make constant
}
else {
    renderer.setSize(window.innerWidth, window.innerWidth * (9 / 16));
}
//document.getElementById("canvasContainer").append(renderer.domElement);
document.body.getElementsByClassName('centered-canvas')[0].appendChild(renderer.domElement); //boardhouse uses a captured canvas element, difference?
var stageList = {}; //dictionary of all stages
var currentStage = "main";
stageList["main"] = new stage_1.Stage();
stageList["splash"] = new stage_1.Stage();
currentStage = "splash";
stageList["splash"].UIElements.push(new staticImage_1.StaticImage(stageList["splash"].UIScene, 0, 0, "assets/BoundingBox.png"));
stageList["splash"].update = function () {
};
var interval = setInterval(update, 1000 / 60); //60 ticks per second 
function update() {
    stageList[currentStage].baseUpdate();
    stageList[currentStage].update();
}
var animate = function () {
    requestAnimationFrame(animate);
    stageList[currentStage].render(renderer);
};
animate();
window.addEventListener("resize", function (e) {
    if (window.innerWidth / 16 > window.innerHeight / 9) {
        renderer.setSize(window.innerHeight * (16 / 9), window.innerHeight); //make constant
    }
    else {
        renderer.setSize(window.innerWidth, window.innerWidth * (9 / 16));
    }
});
