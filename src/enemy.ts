import { Sprite, TextureLoader, SpriteMaterial, Scene, Texture, Vector3 } from "three";
import { Updateable } from "./stage";
var THREE = require('three');

export class Enemy extends Updateable {
    scene: Scene;
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    sprite: Sprite;
    health:number;
    isAlive: boolean;
    maxAnisotrophy: number;

    constructor(scene: Scene, type: number, maxAnisotrophy: number, x, y, xVel, yVel) {
        super();
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.health = 100;
        this.isAlive = true;
        this.maxAnisotrophy = maxAnisotrophy;

        var spriteMap: Texture;

        switch(type)
        {
            case 0: {//wasp
                this.health = 50;
                spriteMap = new THREE.TextureLoader().load("assets/wasp1.png");
                break;
            }
            case 1: {//exterminator
                this.health = 100;
                spriteMap = new THREE.TextureLoader().load("assets/exterminator.png");
                break;
            }
            case 2: {//NPCs?

            }
        }
        
        spriteMap.anisotropy = maxAnisotrophy;
        var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        spriteMaterial.map.minFilter = THREE.LinearFilter;
        this.sprite = new Sprite(spriteMaterial);
        this.sprite.scale.set(45/81, 1, 1);
        this.scene.add(this.sprite);
    }

    update(): void {
        this.x += this.xVel;
        this.y += this.yVel;
        this.sprite.position.set(this.x, this.y, 0);

        if (this.health <= 0) {
            this.isAlive = false;
        }
    }

    render(): void {
        
    }
}