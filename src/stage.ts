/**
 * This class defines a "stage" which should be used to seperate updates, screens, or menus
 * This class is boilerplate and should not be changed probably
 */

import { Scene, Camera, PerspectiveCamera, WebGLRenderer, OrthographicCamera } from "three";

export abstract class Updateable {
    abstract update(): any
}

export class Stage {
    gameScene:Scene;
    UIScene:Scene;//might possibly need second UI scene for background UI effects
    camera:OrthographicCamera;
    UIElements:Array<Updateable>;//create custom UI element object?
    gameElements:Array<Updateable>;//list of all objects that should be called in the update method

    constructor() {
        this.gameScene = new Scene();
        this.UIScene = new Scene();//orthographic vs perspective?
        //this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);//endererSize.width / - 2, rendererSize.width / 2, rendererSize.height / 2, rendererSize.height / -2, -1000, 1000
        this.camera = new OrthographicCamera(10 /  -2, 10 / 2, 10 / 2, 10 / -2, -1000, 1000);
        //this.camera = new PerspectiveCamera(45, 512 / 2, 512 / 2, 512 / -2, -1000, 1000);
        this.camera.position.set(0, 0, 25);
        this.camera.lookAt(0, 0, 0);
        this.UIElements = new Array<Updateable>();
        this.gameElements = new Array<Updateable>();
    }

    render(renderer:WebGLRenderer) {
        renderer.autoClear = true;
        renderer.render( this.gameScene, this.camera );
        renderer.autoClear = false;
        renderer.render( this.UIScene, this.camera );
    }

    baseUpdate() {
        this.gameElements.forEach(element => {
            element.update();
        });
        this.UIElements.forEach(element => {
            element.update();
        });
    }

    update() {
        //this should be left empty for each instance to define themselves
    }
}