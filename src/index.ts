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

import { Scene, PerspectiveCamera, WebGLRenderer, MinEquation } from "three";
import { Stage } from "./stage";
import { StaticImage } from "./staticImage";
import { Player } from "./player";

var renderer: WebGLRenderer = new WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);//1:1 scale resolution
if (window.innerWidth / 16 > window.innerHeight / 9) {
    renderer.setSize(window.innerHeight * (16 / 9), window.innerHeight);//make constant
}
else {
    renderer.setSize(window.innerWidth, window.innerWidth * (9 / 16));
}

//document.getElementById("canvasContainer").append(renderer.domElement);
document.body.getElementsByClassName('centered-canvas')[0].appendChild(renderer.domElement);//boardhouse uses a captured canvas element, difference?

let stageList: { [key: string]: Stage; } = {};//dictionary of all stages
var currentStage: string = "main";

stageList["main"] = new Stage();

stageList["splash"] = new Stage();
currentStage = "splash";
// stageList["splash"].UIElements.push(new StaticImage(stageList["splash"].UIScene, 0, 0, "assets/BoundingBox.png"));

stageList["splash"].update = function () {//actual splash screen update logic here
    stageList["splash"].gameElements.forEach(el => { el.update() });
}

stageList["splash"].gameElements.push(new Player(stageList["splash"].gameScene));

var interval = setInterval(update, 1000 / 60);//60 ticks per second

function update() {
    stageList[currentStage].baseUpdate();
    stageList[currentStage].update();
}

var animate = function () {
    requestAnimationFrame(animate);

    stageList[currentStage].render(renderer);
}
animate();

window.addEventListener("resize", e => {
    if (window.innerWidth / 16 > window.innerHeight / 9) {
        renderer.setSize(window.innerHeight * (16 / 9), window.innerHeight);//make constant
    }
    else {
        renderer.setSize(window.innerWidth, window.innerWidth * (9 / 16));
    }
});

/* movement controls for the player */
window.addEventListener("keydown", e => {
    const player = stageList["splash"].gameElements.find(el => el instanceof Player);

    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
        player.right = true;
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
        player.left = true;
    }
    if (e.keyCode === 32 /* space bar */ || e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
        player.up = true;
    }
});

/* movement controls for the player */
window.addEventListener("keyup", e => {
    const player = stageList["splash"].gameElements.find(el => el instanceof Player);
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
        player.right = false;
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
        player.left = false;
    }
    if (e.keyCode === 32 /* space bar */ || e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
        player.up = false;
    }
});