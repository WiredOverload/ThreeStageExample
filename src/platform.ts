import { Sprite, Scene, TextureLoader, SpriteMaterial} from "three";
import { Updateable } from "./stage";
var THREE = require('three');//only needed due to three type shenanigans

export class Platform extends Updateable{
    sprite:Sprite;
    x:number;
    y:number;

    constructor(scene:Scene, x:number, y:number) {
        super();//needed?
        this.x = x;
        this.y = y;
        var spriteMap:TextureLoader = new THREE.TextureLoader().load("assets/woodPlatform1.png");
        var spriteMaterial:SpriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        this.sprite = new Sprite( spriteMaterial );
        this.sprite.scale.set(2, 1/8, 1);
        this.sprite.position.set(x, y, 0);
        scene.add(this.sprite);
    }

    render() {

    }

    update() {
        //this.sprite.position.set(this.x, this.y, 0);
    }
}