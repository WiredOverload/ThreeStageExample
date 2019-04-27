"use strict";
/**
 * This class defines a "stage" which should be used to seperate updates, screens, or menus
 * This class is boilerplate and should not be changed probably
 */
exports.__esModule = true;
var three_1 = require("three");
var Updateable = (function () {
    function Updateable() {
    }
    return Updateable;
}());
exports.Updateable = Updateable;
var Stage = (function () {
    function Stage() {
        this.gameScene = new three_1.Scene();
        this.UIScene = new three_1.Scene(); //orthographic vs perspective?
        this.height = 9;
        this.width = 16;
        //this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);//endererSize.width / - 2, rendererSize.width / 2, rendererSize.height / 2, rendererSize.height / -2, -1000, 1000
        this.gameCamera = new three_1.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, -1000, 1000);
        this.gameCamera.position.set(0, 0, 25);
        this.gameCamera.lookAt(0, 0, 0);
        this.UICamera = new three_1.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, -1000, 1000); //make sure this is always the same as the gameCamera
        this.UICamera.position.set(0, 0, 25);
        this.UICamera.lookAt(0, 0, 0);
        this.UIElements = new Array();
        this.gameElements = new Array();
    }
    Stage.prototype.render = function (renderer) {
        renderer.autoClear = true;
        renderer.render(this.gameScene, this.gameCamera);
        renderer.autoClear = false;
        renderer.render(this.UIScene, this.UICamera);
    };
    Stage.prototype.baseUpdate = function () {
        this.gameElements.forEach(function (element) {
            element.update();
        });
        this.UIElements.forEach(function (element) {
            element.update();
        });
    };
    Stage.prototype.update = function () {
        //this should be left empty for each instance to define themselves
    };
    return Stage;
}());
exports.Stage = Stage;
