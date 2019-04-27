import { Sprite, TextureLoader, SpriteMaterial, Scene } from "three";
import { Updateable } from "./stage";
var THREE = require('three');

export class Player extends Updateable {
    scene: Scene;
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    sprite: Sprite;

    constructor(scene: Scene) {
        super();
        this.scene = scene;
        this.x = 0;
        this.y = 0;
        this.xVel = 0;
        this.yVel = 0;

        var spriteMap: TextureLoader = new THREE.TextureLoader().load("assets/BoundingBox.png");//"BoundingBox.png"
        var spriteMaterial: SpriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        this.sprite = new Sprite(spriteMaterial);
        this.scene.add(this.sprite);
    }

    update(): void {
        this.x += this.xVel;
        this.y += this.yVel;
        this.sprite.position.set(this.x, this.y, 0);
    }

    render(): void {
        
    }
}