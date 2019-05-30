/**
 * This class defines a "stage" which should be used to seperate updates, screens, or menus
 * This class is boilerplate and should not be changed probably
 */

import { Scene, Camera, PerspectiveCamera, WebGLRenderer, OrthographicCamera } from "three";

export abstract class Updateable {
    abstract update(): any
}

export class Stage {
    sceneList: { [key: string]: Scene; };
    cameraList: { [key: string]: OrthographicCamera; };
    elementsList: { [key: string]: any[]; };
    /*gameScene:Scene;
    UIScene:Scene;//might possibly need second UI scene for background UI effects
    BackgroundScene:Scene;
    gameCamera:OrthographicCamera;
    UICamera:OrthographicCamera;
    UIElements:Array<Updateable>;//create custom UI element object?
    BackgroundCamera:OrthographicCamera;
    BackgroundElements:any[];//create custom UI element object?
    gameElements:any[];//list of all objects that should be called in the update method*/
    height:number;
    width:number;

    constructor() {
        this.sceneList = {};//this seems like a hack to initialize
        this.sceneList["game"] = new Scene();
        this.sceneList["ui"] = new Scene();//orthographic vs perspective?
        this.sceneList["background"] = new Scene();
        this.height = 9;
        this.width = 16;
        //this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);//endererSize.width / - 2, rendererSize.width / 2, rendererSize.height / 2, rendererSize.height / -2, -1000, 1000
        this.cameraList = {};//this seems like a hack to initialize
        this.cameraList["game"] = new OrthographicCamera(this.width/-2, this.width/2, this.height - .5, -.5, -1000, 1000);
        this.cameraList["game"].position.set(0, 0, 25);
        this.cameraList["game"].lookAt(0, 0, 0);

        this.cameraList["ui"] = new OrthographicCamera(this.width/-2, this.width/2, this.height/2, this.height/-2, -1000, 1000);
        this.cameraList["ui"].position.set(0, 0, 25);
        this.cameraList["ui"].lookAt(0, 0, 0);

        this.cameraList["background"] = new OrthographicCamera(this.width/-2, this.width/2, this.height - .5, -.5, -1000, 1000);//make sure this is always the same as the gameCamera
        this.cameraList["background"].position.set(0, 0, 25);
        this.cameraList["background"].lookAt(0, 0, 0);

        this.elementsList = {};//this seems like a hack to initialize
        this.elementsList["ui"] = [];
        this.elementsList["background"] = [];
        this.elementsList["game"] = [];
    }

    render(renderer:WebGLRenderer) {
        renderer.autoClear = true;
        renderer.render( this.sceneList["ui"], this.cameraList["ui"] );
        renderer.autoClear = false;
        renderer.render( this.sceneList["background"], this.cameraList["background"] );
        renderer.render( this.sceneList["game"], this.cameraList["game"] );
    }

    baseUpdate() {
        this.elementsList["game"].forEach(element => {
            element.update();
        });
        //this.UIElements.forEach(element => {
        //    element.update();
        //});
        this.cameraList["background"].position.set(this.cameraList["game"].position.x, this.cameraList["game"].position.y, this.cameraList["game"].position.z);
    }

    update() {
        //this should be left empty for each instance to define themselves
    }
}