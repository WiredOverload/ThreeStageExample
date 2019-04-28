import { Sprite, Scene, TextureLoader, SpriteMaterial, Vector3} from "three";
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
        var spriteMap:TextureLoader = new THREE.TextureLoader().load(imageURL);//"BoundingBox.png"
        var spriteMaterial:SpriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        this.sprite = new Sprite( spriteMaterial );
        this.sprite.scale = scale;//might need to use .set
        scene.add(this.sprite);
    }

    render() {

    }

    update() {
        //no need to update a static Image
    }
}