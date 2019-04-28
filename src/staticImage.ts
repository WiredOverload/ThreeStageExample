import { Sprite, Scene, TextureLoader, SpriteMaterial, Vector3, Texture, WebGLRenderer} from "three";
import { Updateable } from "./stage";
var THREE = require('three');//only needed due to three type shenanigans

export class StaticImage extends Updateable{
    sprite:Sprite;
    x:number;
    y:number;

    constructor(scene:Scene, x:number, y:number, imageURL:string, scale:Vector3) {
        super();//needed?
        this.x = x;
        this.y = y;
        var spriteMap:Texture = new THREE.TextureLoader().load(imageURL);
        spriteMap.minFilter = THREE.NearestFilter;
        spriteMap.magFilter = THREE.NearestFilter;
        var spriteMaterial:SpriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        //spriteMaterial.map.minFilter = THREE.LinearFilter;
        this.sprite = new Sprite( spriteMaterial );
        this.sprite.scale.set(scale.x, scale.y, scale.z);
        this.sprite.position.set(x, y, 0);
        scene.add(this.sprite);
    }

    render() {

    }

    update() {
        this.sprite.position.set(this.x, this.y, 0);
    }
}