/**
 * TODO For Library:
 * Buttons and other interactable elements need more work in stage
 * individual stage update methods defined here?
 * 
 * Game Plan:
 * Rogue Legacy, Now With Bees (TM)
 * A bunch of bees dressed up as a man
 * platformer inside a mansion
 * hiding himself as a man to fit in with society, which uses bees as currency
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
 *  melee + ranged
 *  NPCs
 * NPC Text?
 * platforms and environment
 * art
 *  platforms
 *  backgrounds
 *  other stage screens
 * sound
 *  music
 *  bee sounds? we need it but it could sound traumatizing
 * different player attacks
 *  keep it simple by just spawning bee projectiles at first
 *  upgrades could make bees homing, bounce, be reobtainable...
 * Score, time or number of times died
 * NPCs that attack you if it's too obvious you are bees
 * 
 * Feel free to add anything you want here and delete anything that's been completed
 */

import { Scene, PerspectiveCamera, WebGLRenderer, MinEquation, Vector3 } from "three";
import { Stage } from "./stage";
import { StaticImage } from "./staticImage";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Enemy } from "./enemy";

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
stageList["main"].UIElements.push(new StaticImage(stageList["main"].UIScene, 0, 0, "assets/space4096.png", new Vector3(16, 9, 1)));
stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, 0, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));
stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, 16, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));

stageList["main"].gameElements.push(new Player(stageList["main"].gameScene, renderer.getMaxAnisotropy()));

stageList["main"].update = function () {//actual splash screen update logic here
    var localStage = stageList["main"];
    var localPlayer = localStage.gameElements.find(el => el instanceof Player);
    localStage.gameElements.forEach(el => { el.update() });
    localStage.gameCamera.position.set(localPlayer.x, localStage.gameCamera.position.y, localStage.gameCamera.position.z);

    var isBackgroundLeft: boolean = false, isBackgroundRight: boolean = false;
    localStage.BackgroundElements.forEach(element => {
        if (element.x < localPlayer.x && element.x > localPlayer.x - 16) {
            isBackgroundLeft = true;
        }
        else if (element.x > localPlayer.x && element.x < localPlayer.x + 16) {
            isBackgroundRight = true;
        }
        else {
            localStage.BackgroundElements.splice(localStage.BackgroundElements.indexOf(element), 1);
        }
    });
    if (!isBackgroundLeft) {
        stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, (Math.round(localPlayer.x / 16) * 16) - 16, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));
    }
    if (!isBackgroundRight) {
        stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, (Math.round(localPlayer.x / 16) * 16) + 16, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));
    }
    stageList["main"].gameElements.forEach(el => {
        stageList["main"].gameElements.forEach(el2 => {
            if (el !== el2) { // only check for collision between two different objects
                if (collision(el, el2)) {
                    // if player collides with an enemy projectile, take damage   
                    if (el instanceof Player && el2 instanceof Projectile && el2.type in [2, 3]) {
                        el.takeHit();
                        el2.isAlive = false;
                    }
                    // if enemy collides with enemy projectile, enemy takes damage
                    if (el instanceof Enemy && el2 instanceof Projectile && el2.type in [0, 1]) {
                        el.health -= 10;
                        el2.isAlive = false;
                    }
                    // if player collides with enemy, give player period of invuln and push back
                    if (el instanceof Player && el2 instanceof Enemy) {
                        el.takeHit();
                    }
                }
            }
        });
    });
}


var interval = setInterval(update, 1000 / 60);//60 ticks per second

function update() {
    stageList[currentStage].baseUpdate();
    stageList[currentStage].update();
    stageList["main"].gameElements.filter(el => el.isAlive); // filter out dead enemies / player
}

// check if two items are colliding
function collision(a, b) {
    return !(
        ((a.y + a.sprite.scale.y) < (b.y)) ||
        (a.y > (b.y + b.sprite.scale.y)) ||
        ((a.x + a.sprite.scale.x) < b.x) ||
        (a.x > (b.x + b.sprite.scale.x))
    );
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
    if (currentStage == "main") {
        const player: Player = stageList["main"].gameElements.find(el => el instanceof Player);

        if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
            player.right = true;
        }
        if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
            player.left = true;
        }
        if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
            player.up = true;
        }
        if (e.keyCode === 32 /* space bar */) {
            // shoot projectiles
            if (!player.isShooting) {
                stageList["main"].gameElements.push(
                    new Projectile(
                        stageList["main"].gameScene, 
                        player.x, 
                        player.y, 
                        player.xVel > 0 ? 0.01 : -0.01,
                        player.yVel > 0 ? 0.01 : -0.01, 
                        0
                    )
                );
            }
            player.isShooting = true;
        }
    }
});

/* movement controls for the player */
window.addEventListener("keyup", e => {
    if (currentStage == "main") {
        const player = stageList["main"].gameElements.find(el => el instanceof Player);
        if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
            player.right = false;
        }
        if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
            player.left = false;
        }
        if (e.keyCode === 32 /* space bar */ || e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
            player.isShooting = false;
        }
    }
});