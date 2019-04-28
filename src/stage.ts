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
    gameCamera:OrthographicCamera;
    UICamera:OrthographicCamera;
    UIElements:Array<Updateable>;//create custom UI element object?
    BackgroundCamera:OrthographicCamera;
    BackgroundElements:Array<Updateable>;//create custom UI element object?
    gameElements:any[];//list of all objects that should be called in the update method
    height:number;
    width:number;

    constructor() {
        this.gameScene = new Scene();
        this.UIScene = new Scene();//orthographic vs perspective?
        this.height = 9;
        this.width = 16;
        //this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);//endererSize.width / - 2, rendererSize.width / 2, rendererSize.height / 2, rendererSize.height / -2, -1000, 1000
        this.gameCamera = new OrthographicCamera(this.width/-2, this.width/2, this.height/2, this.height/-2, -1000, 1000);
        this.gameCamera.position.set(0, 0, 25);
        this.gameCamera.lookAt(0, 0, 0);

        this.UICamera = new OrthographicCamera(this.width/-2, this.width/2, this.height/2, this.height/-2, -1000, 1000);//make sure this is always the same as the gameCamera
        this.UICamera.position.set(0, 0, 25);
        this.UICamera.lookAt(0, 0, 0);

        this.BackgroundCamera = new OrthographicCamera(this.width/-2, this.width/2, this.height/2, this.height/-2, -1000, 1000);//make sure this is always the same as the gameCamera
        this.BackgroundCamera.position.set(0, 0, 25);
        this.BackgroundCamera.lookAt(0, 0, 0);

        this.UIElements = new Array<Updateable>();
        this.BackgroundElements = new Array<Updateable>();
        this.gameElements = [];
    }

    render(renderer:WebGLRenderer) {
        renderer.autoClear = true;
        renderer.render( this.gameScene, this.gameCamera );
        renderer.autoClear = false;
        renderer.render( this.UIScene, this.UICamera );
    }

    baseUpdate() {
        this.gameElements.forEach(element => {
            element.update();
        });
        this.UIElements.forEach(element => {
            element.update();
        });
        this.BackgroundCamera.position = this.gameCamera.position;
    }

    update() {
        //this should be left empty for each instance to define themselves
    }
}