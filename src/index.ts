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

import { Scene, PerspectiveCamera, WebGLRenderer, MinEquation, Vector3, Sprite, Texture, SpriteMaterial } from "three";
import { Stage } from "./stage";
import { StaticImage } from "./staticImage";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Enemy } from "./enemy";
import { Platform } from "./platform";
import THREE = require("three");

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

//globals
let stageList: { [key: string]: Stage; } = {};//dictionary of all stages
var currentStage: string = "splash";
var win = false;
var music = new Audio('assets/SFX/Beeswax.mp3');
music.loop = true;
var shootClip = new Audio('assets/SFX/bee_buzz_edit.wav');
var hitClip = new Audio('assets/SFX/wasp_sting.wav');
var hitTargetClip = new Audio('assets/SFX/bee_man_get_hit2.wav');
hitClip.volume = 0.8;
var ticks:number = 0;

stageList["main"] = new Stage();
stageList["splash"] = new Stage();
stageList["gameOver"] = new Stage();

stageList["gameOver"].update = function () {
    stageList["gameOver"].gameElements.forEach(el => { el.update() });
}

//splash screen logic
stageList["splash"].update = function () {//actual splash screen update logic here
    stageList["splash"].gameElements.forEach(el => { el.update() });
}

//backgrounds
stageList["main"].UIElements.push(new StaticImage(stageList["main"].UIScene, 0, 0, "assets/space4096.png", new Vector3(16, 9, 1)));
stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, 0, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));
stageList["main"].BackgroundElements.push(new StaticImage(stageList["main"].BackgroundScene, 16, 4, "assets/backgroundFullDoubled.png", new Vector3(16, 9, 1)));
stageList["gameOver"].UIElements.push(new StaticImage(stageList["gameOver"].UIScene, 0, 0, "assets/winScreen.png", new Vector3(16, 9, 1)));
stageList["splash"].UIElements.push(new StaticImage(stageList["splash"].UIScene, 0, 0, "assets/splashscreen.png", new Vector3(16, 9, 1)));

//add platforms before player
for (var i = 0; i < 16; i++) {
    stageList["main"].gameElements.push(new Platform(stageList["main"].gameScene, (i * 16) + 2, 1));
    stageList["main"].gameElements.push(new Platform(stageList["main"].gameScene, (i * 16) + 2, 6));
    stageList["main"].gameElements.push(new Platform(stageList["main"].gameScene, (i * 16) + 6, 2));
    stageList["main"].gameElements.push(new Platform(stageList["main"].gameScene, (i * 16) + 6, 4));
    stageList["main"].gameElements.push(new Platform(stageList["main"].gameScene, (i * 16) + 10, 2));
    stageList["main"].gameElements.push(new Platform(stageList["main"].gameScene, (i * 16) + 10, 4));
    stageList["main"].gameElements.push(new Platform(stageList["main"].gameScene, (i * 16) + 14, 1));
    stageList["main"].gameElements.push(new Platform(stageList["main"].gameScene, (i * 16) + 14, 6));
}

stageList["main"].gameElements.push(new Player(stageList["main"].gameScene, renderer.capabilities.getMaxAnisotropy()));
//enemies
//stageList["main"].gameElements.push(new Enemy(stageList["main"].gameScene, 0, renderer.capabilities.getMaxAnisotropy(), 1, 0, 0, 0));

//game over sprite
var gameOver = new THREE.TextureLoader().load("assets/gameOver.png");
var spriteMap: Texture = gameOver;
spriteMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
spriteMaterial.map.minFilter = THREE.LinearFilter;
var gameOverSprite = new Sprite(spriteMaterial);
gameOverSprite.scale.set(12, 9, 1);
// arrow sprite
var arrow = new THREE.TextureLoader().load("assets/arrow.png");
var arrowSpriteMap: Texture = arrow;
arrowSpriteMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
var arrowSpriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: arrowSpriteMap, color: 0xffffff });
arrowSpriteMaterial.map.minFilter = THREE.LinearFilter;
var arrowSprite = new Sprite(arrowSpriteMaterial);
arrowSprite.position.set(0, 3, 0);
stageList["main"].gameScene.add(arrowSprite);

//game screen logic
stageList["main"].update = function () {//actual splash screen update logic here
    var localStage: Stage = stageList["main"];
    localStage.gameElements.forEach(el => {
        if (el.isAlive != undefined && !el.isAlive) {
            localStage.gameScene.remove(el.sprite);
        }
    });

    var localPlayer: Player = localStage.gameElements.find(el => el instanceof Player);
    if (!localPlayer.isAlive) {
        gameOverSprite.position.x = localPlayer.x;
        gameOverSprite.position.y = 4;
        localStage.gameScene.add(gameOverSprite);
    }
    // filter out dead enemies
    localStage.gameElements = localStage.gameElements.filter(el => el.isAlive || el instanceof Player || el.isAlive == undefined);

    localStage.gameElements.forEach(element => {
        if (element.isAlive != undefined && element.x < localPlayer.x - 16) {
            element.isAlive = false;
        }
    });

    localStage.gameElements.forEach(el => { el.update() });
    localStage.gameCamera.position.set(localPlayer ? localPlayer.x : localStage.gameCamera.position.x, localStage.gameCamera.position.y, localStage.gameCamera.position.z);

    //background logic
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

    //collision logic
    localPlayer.isOnGround = false;
    stageList["main"].gameElements.forEach(el => {
        stageList["main"].gameElements.forEach(el2 => {
            if (el !== el2) { // only check for collision between two different objects
                if (collision(el, el2)) {
                    // if player collides with an enemy projectile, take damage   
                    if (el instanceof Player && el.isAlive && el2 instanceof Projectile && (el2.type === 2 || el2.type === 3)) {
                        el.takeHit();
                        el2.isAlive = false;
                    }
                    // if enemy collides with player projectile, enemy takes damage
                    if (el instanceof Enemy && el2 instanceof Projectile && (el2.type === 0 || el2.type === 1)) {
                        if (el.health > 0) {
                            el.health -= 25;
                            el2.isAlive = false;
                            hitTargetClip.play();
                        }
                    }
                    // if player collides with enemy, give player period of invuln and push back
                    if (el instanceof Player && el.isAlive && el2 instanceof Enemy) {
                        var beeAmount = el.health <= 10 && el.health > 0 ? 8 : 4;
                        el.takeHit();

                        for (var i = 0; i < Math.PI * 2; i += Math.PI / beeAmount) {
                            stageList["main"].gameElements.push(
                                new Projectile(
                                    stageList["main"].gameScene,
                                    localPlayer.x,
                                    localPlayer.y,
                                    localPlayer.xVel + (Math.cos(i) * .05),
                                    localPlayer.yVel + (Math.sin(i) * .05),
                                    0
                                )
                            );
                        }
                        hitClip.play();
                    }

                    //console.log('player collided with enemy');
                }
                // if player collides with queen, increment player's queen count
                if (el instanceof Player && el.isAlive && el2 instanceof Projectile && el2.type === 4) {
                    el.queenCount++;
                    el.health += 50;
                    el2.isAlive = false;
                    //console.log('picked up queen');
                }
                //player colliding with platform
                if (el instanceof Player && el2 instanceof Platform) {
                    if (el.x - (el.sprite.scale.x / 2) < el2.x + (el2.sprite.scale.x / 2) &&
                        el.x + (el.sprite.scale.x / 2) > el2.x - (el2.sprite.scale.x / 2) &&
                        el.y - (el.sprite.scale.y / 2) < el2.y + (el2.sprite.scale.y / 2) &&
                        el.y - (el.sprite.scale.y / 2) + .1 > el2.y - (el2.sprite.scale.y / 2)) {
                        el.isOnGround = true;
                        el.yVel = Math.max(0, el.yVel);
                        //console.log('player collided with platform');
                    }
                }
            }
        });
    });

    // game win logic
    if (localPlayer.x >= 240) {
        win = true;
        currentStage = "gameOver";
    }
    //enemy spawning
    if (ticks % 60 == 0) {
        stageList["main"].gameElements.push(new Enemy(stageList["main"].gameScene, 0, renderer.capabilities.getMaxAnisotropy(), localPlayer.x + 18, localPlayer.y, -0.1, 0));
    }
    if (ticks % 240 == 0) {
        var enemy: Enemy = new Enemy(stageList["main"].gameScene, 0, renderer.capabilities.getMaxAnisotropy(), localPlayer.x - 15.5, localPlayer.y, 0.1, 0);
        var spriteMap: Texture = new THREE.TextureLoader().load("assets/wasp1.png");
        spriteMap.repeat.set(-1, 1);
        spriteMap.offset.set(1, 0);
        spriteMap.anisotropy = renderer.getMaxAnisotropy();
        var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        spriteMaterial.map.minFilter = THREE.LinearFilter;
        enemy.sprite.material = spriteMaterial;
        stageList["main"].gameElements.push(enemy);
    }
}


//main update
var interval = setInterval(update, 1000 / 60);//60 ticks per second
function update() {
    ticks++;
    stageList[currentStage].baseUpdate();
    stageList[currentStage].update();
}

// check if two items are colliding
function collision(a, b) {
    return (
        a.x - (a.sprite.scale.x / 2) < b.x + (b.sprite.scale.x / 2) &&
        a.x + (a.sprite.scale.x / 2) > b.x - (b.sprite.scale.x / 2) &&
        a.y - (a.sprite.scale.y / 2) < b.y + (b.sprite.scale.y / 2) &&
        a.y + (a.sprite.scale.y / 2) > b.y - (b.sprite.scale.y / 2)
    )
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
    if(music.played != null) {
        music.play();
    }
    if (currentStage == "main") {
        const player: Player = stageList["main"].gameElements.find(el => el instanceof Player);
        if (player.isAlive) {
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
                    player.health -= 4;
                    stageList["main"].gameElements.push(
                        new Projectile(
                            stageList["main"].gameScene,
                            player.x,
                            player.y,
                            player.xVel >= 0 ? 0.05 + player.xVel : -0.05 + player.xVel,
                            0,
                            0
                        )
                    );
                    stageList["main"].gameElements.push(
                        new Projectile(
                            stageList["main"].gameScene,
                            player.x,
                            player.y,
                            player.xVel >= 0 ? 0.05 + player.xVel : -0.05 + player.xVel,
                            0.0075,
                            0
                        )
                    );
                    stageList["main"].gameElements.push(
                        new Projectile(
                            stageList["main"].gameScene,
                            player.x,
                            player.y,
                            player.xVel >= 0 ? 0.05 + player.xVel : -0.05 + player.xVel,
                            -0.0075,
                            0
                        )
                    );
                    shootClip.play();
                }
                player.isShooting = true;
            }
        }
    }
});

/* movement controls for the player */
window.addEventListener("keyup", e => {
    if (currentStage == "main") {
        const player = stageList["main"].gameElements.find(el => el instanceof Player);
        if (player.isAlive) {
            if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
                player.right = false;
            }
            if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
                player.left = false;
            }
            if (e.keyCode === 32 /* space bar */) {
                player.isShooting = false;
            }
            if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
                player.up = false;
            }
        }
    }
});


var respawn = function () {
    // respawn player to starting position
    const player: Player = stageList["main"].gameElements.find(el => el instanceof Player);
    if (player) {
        player.x = -4;
        player.y = 0;
        player.xVel = 0;
        player.yVel = 0;
        player.up = false;
        player.left = false;
        player.right = false;
        player.isJumping = false;
        player.isAlive = true;
        player.isInvuln = false;
        player.isShooting = false;
        player.isLookingRight = true;
        player.health = 100;
    }
}

window.addEventListener("click", e => { 
    if(currentStage == "splash") {
        currentStage = "main"
    }
    else {
        const player: Player = stageList["main"].gameElements.find(el => el instanceof Player);
        if (!player.isAlive) {
            //spawn queen at player's corpse
            stageList["main"].gameElements.push(
                new Projectile(
                    stageList["main"].gameScene,
                    player.x,
                    0,
                    0,
                    0,
                    4
                )
            );

            respawn();
            stageList["main"].gameScene.add(player.sprite);
            console.log("respawned");
            // remove game over indicator
            stageList["main"].gameScene.remove(gameOverSprite);
        }

        if (win) {
            currentStage = "main";
            win = false;
            respawn();
        }
    }
});