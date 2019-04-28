import { Sprite, Scene, TextureLoader, SpriteMaterial } from "three";
import { Updateable } from "./stage";
var THREE = require('three');//only needed due to three type shenanigans

export class Projectile extends Updateable {
    sprite: Sprite;
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    type: number;
    lifetimeTicks: number;
    totalTicks: number;
    isAlive: boolean;

    constructor(scene: Scene, x: number, y: number, xVel: number, yVel: number, type: number) {
        super();//needed?
        this.x = x;
        this.y = y;
        this.type = type;
        this.totalTicks = 0;
        this.isAlive = true; 
        this.xVelocity = xVel;
        this.yVelocity = yVel;
        
        var spriteMap: TextureLoader;
        switch (type) {
            case 0: {//basic bee
                spriteMap = new THREE.TextureLoader().load("bee1.png");
                this.lifetimeTicks = 60 * 10;//10 seconds
                break;
            }
            case 1: {//homing bee
                spriteMap = new THREE.TextureLoader().load("bee1.png");
                this.lifetimeTicks = 60 * 10;//10 seconds
                break;
            }
            case 2: {//exterminator gas puff
                spriteMap = new THREE.TextureLoader().load("BoundingBox.png");
                this.lifetimeTicks = 60 * 3;//3 seconds
                break;
            }
            case 3: {//wasp? NYI
                spriteMap = new THREE.TextureLoader().load("BoundingBox.png");
                break;
            }
        }
        var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        this.sprite = new Sprite(spriteMaterial);
        scene.add(this.sprite);
    }

    render() {

    }

    update() {
        this.totalTicks++;
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if (this.type == 2) {
            this.xVelocity -= this.xVelocity / 10;
            this.yVelocity -= this.yVelocity / 10;
        }
        else if (this.type == 1) {
            //add homing bee logic here
        }
    }
}