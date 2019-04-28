import { Sprite, TextureLoader, SpriteMaterial, Scene, Texture, Vector3, WebGLRenderer } from "three";
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
    health: number;
    isAlive: boolean;
    isInvuln: boolean;
    isShooting: boolean;
    maxAnisotrophy: number;
    beemanIdleState: Texture;
    beemanIdleStateHurt1: Texture;
    beemanIdleStateHurt2: Texture;
    beemanShootingState: Texture;
    beemanShootingStateHurt1: Texture;
    beemanShootingStateHurt2: Texture;

    constructor(scene: Scene, maxAnisotrophy: number) {
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
        this.isAlive = true;
        this.isInvuln = false;
        this.isShooting = false;
        this.maxAnisotrophy = maxAnisotrophy;
        this.beemanIdleState = new THREE.TextureLoader().load("assets/beeman_idle1.png")
        this.beemanIdleStateHurt1 = new THREE.TextureLoader().load("assets/beeman_idle2.png")
        this.beemanIdleStateHurt2 = new THREE.TextureLoader().load("assets/beeman_idle3.png")
        this.beemanShootingState = new THREE.TextureLoader().load("assets/beeman1.png")
        this.beemanShootingStateHurt1 = new THREE.TextureLoader().load("assets/beeman2.png")
        this.beemanShootingStateHurt2 = new THREE.TextureLoader().load("assets/beeman3.png")

        var spriteMap: Texture = this.beemanIdleState;

        if (this.health < 75) {
            spriteMap = this.beemanIdleStateHurt1;
        } else if (this.health < 50) {
            spriteMap = this.beemanIdleStateHurt2;
        }

        spriteMap.anisotropy = this.maxAnisotrophy;
        var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        spriteMaterial.map.minFilter = THREE.LinearFilter;
        this.sprite = new Sprite(spriteMaterial);
        this.sprite.scale.set(31/81, 1, 1);
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

        if (this.health <= 0) {
            this.isAlive = false;
        }

        if (this.isShooting) {
            var spriteMap: Texture = this.beemanShootingState;
            this.sprite.scale.set(45 / 81, 1, 1);

            if (this.health < 75) {
                spriteMap = this.beemanShootingStateHurt1;
                this.sprite.scale.set(44/73, 1, 1);
            } else if (this.health < 50) {
                spriteMap = this.beemanShootingStateHurt2;
                this.sprite.scale.set(50/54, 1, 1);
            }

            spriteMap.anisotropy = this.maxAnisotrophy;
            var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
            spriteMaterial.map.minFilter = THREE.LinearFilter;
            this.sprite.material = spriteMaterial;
        } else {
            var spriteMap: Texture = this.beemanIdleState;
            this.sprite.scale.set(31/81, 1, 1);

            if (this.health < 75) {
                spriteMap = this.beemanIdleStateHurt1;
                this.sprite.scale.set(27/73, 1, 1);
            } else if (this.health < 50) {
                spriteMap = this.beemanIdleStateHurt2;
                this.sprite.scale.set(35/54, 1, 1);
            }
            spriteMap.anisotropy = this.maxAnisotrophy;
            var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
            spriteMaterial.map.minFilter = THREE.LinearFilter;
            this.sprite.material = spriteMaterial;
        }
    }

    takeHit(): void {
        this.health -= this.isInvuln ? 0 : 10;
        this.isInvuln = true;
    }

    render(): void {

    }
}