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

import { Scene, PerspectiveCamera, WebGLRenderer, MinEquation, Vector3 } from "three";
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


//splash screen logic
stageList["splash"].update = function () {//actual splash screen update logic here
    stageList["splash"].gameElements.forEach(el => { el.update() });
}


//game screen logic
stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, 0, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));
stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, 16, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));

stageList["main"].gameElements.push(new Player(stageList["main"].gameScene, renderer));

stageList["main"].update = function () {//actual splash screen update logic here
    var localStage = stageList["main"];
    var localPlayer = localStage.gameElements.find(el => el instanceof Player);
    localStage.gameElements.forEach(el => { el.update() });
    localStage.gameCamera.position.set(localPlayer.x, localStage.gameCamera.position.y, localStage.gameCamera.position.z);

    var isBackgroundLeft:boolean = false, isBackgroundRight: boolean = false;
    localStage.BackgroundElements.forEach(element => {
        if(element.x < localPlayer.x && element.x > localPlayer.x - 16)
        {
            isBackgroundLeft = true;
        }
        else if (element.x > localPlayer.x && element.x < localPlayer.x + 16) {
            isBackgroundRight = true;
        }
        else {
            localStage.BackgroundElements.splice(localStage.BackgroundElements.indexOf(element), 1);
        }
    });
    if(!isBackgroundLeft) {
        stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, (Math.round(localPlayer.x / 16) * 16) - 16, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));
    }
    if(!isBackgroundRight) {
        stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, (Math.round(localPlayer.x / 16) * 16) + 16, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));
    }
}


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
    if(currentStage == "main") {
        const player = stageList["main"].gameElements.find(el => el instanceof Player);

        if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
            player.right = true;
        }
        if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
            player.left = true;
        }
        if (e.keyCode === 32 /* space bar */ || e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
            player.up = true;
        }
    }
});

/* movement controls for the player */
window.addEventListener("keyup", e => {
    if(currentStage == "main") {
        const player = stageList["main"].gameElements.find(el => el instanceof Player);
        if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
            player.right = false;
        }
        if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
            player.left = false;
        }
        if (e.keyCode === 32 /* space bar */ || e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
            player.up = false;
        }
    }
});