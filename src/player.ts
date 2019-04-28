import { Sprite, TextureLoader, SpriteMaterial, Scene, Texture, Vector3 } from "three";
import { Updateable } from "./stage";
var THREE = require('three');

export class Player extends Updateable {
    scene: Scene;
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    sprite: Sprite;
    up: boolean;
    left: boolean;
    right: boolean;
    isJumping: boolean;
    maxVel: number;
    health:number;

    constructor(scene: Scene) {
        super();
        this.scene = scene;
        this.x = 0;
        this.y = 0;
        this.xVel = 0;
        this.yVel = 0;
        this.up = false;
        this.left = false;
        this.right = false;
        this.isJumping = false;
        this.maxVel = 0.05;
        this.health = 100;

        var spriteMap: Texture = new THREE.TextureLoader().load("assets/beeman1.png");//"BoundingBox.png"
        spriteMap.anisotropy = 2;
        var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        spriteMaterial.map.minFilter = THREE.LinearFilter;
        this.sprite = new Sprite(spriteMaterial);
        this.sprite.scale.set(45/81, 1, 1);
        this.scene.add(this.sprite);
    }

    update(): void {
        if (this.right) {
            this.xVel = Math.min(this.xVel += 0.01, this.maxVel);
        }
        if (this.left) {
            this.xVel = Math.max(this.xVel -= 0.01, -this.maxVel);
        }
        if (this.up) {
            this.yVel += this.isJumping ? 0.009 : 0.3;
            this.isJumping = true;
        }
        this.yVel -= 0.01;
        this.x += this.xVel;
        this.y += this.yVel;
        this.xVel *= 0.9;
        this.yVel *= 0.9;

        if (this.y < 0) {
            this.isJumping = false;
            this.y = 0
            this.yVel = 0;
        }

        this.sprite.position.set(this.x, this.y, 0);
    }

    render(): void {
        
    }
}