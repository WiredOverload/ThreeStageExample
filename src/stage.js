"use strict";
/**
 * This class defines a "stage" which should be used to seperate updates, screens, or menus
 * This class is boilerplate and should not be changed probably
 */
exports.__esModule = true;
var three_1 = require("three");
var Updateable = /** @class */ (function () {
    function Updateable() {
    }
    return Updateable;
}());
exports.Updateable = Updateable;
var Stage = /** @class */ (function () {
    function Stage() {
        this.gameScene = new three_1.Scene();
        this.UIScene = new three_1.Scene(); //orthographic vs perspective?
        //this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);//endererSize.width / - 2, rendererSize.width / 2, rendererSize.height / 2, rendererSize.height / -2, -1000, 1000
        this.camera = new three_1.OrthographicCamera(10 / -2, 10 / 2, 10 / 2, 10 / -2, -1000, 1000);
        //this.camera = new PerspectiveCamera(45, 512 / 2, 512 / 2, 512 / -2, -1000, 1000);
        this.camera.position.set(0, 0, 25);
        this.camera.lookAt(0, 0, 0);
        this.UIElements = new Array();
        this.gameElements = new Array();
    }
    Stage.prototype.render = function (renderer) {
        renderer.autoClear = true;
        renderer.render(this.gameScene, this.camera);
        renderer.autoClear = false;
        renderer.render(this.UIScene, this.camera);
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
