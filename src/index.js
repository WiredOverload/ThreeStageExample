"use strict";
/**
 * Notes:
 * Buttons and other interactable elements need more work in stage
 * individual stage update methods defined here?
 * look into fov / aspect ratio logic again
 *  get constant borders without stretching
 *  get borders to take up space, possibly get UI to stretch instead
 */
exports.__esModule = true;
var three_1 = require("three");
var stage_1 = require("./stage");
var staticImage_1 = require("./staticImage");
var renderer = new three_1.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);//1:1 scale resolution
if (window.innerWidth > window.innerHeight) {
    renderer.setSize(window.innerHeight, window.innerHeight);
}
else {
    renderer.setSize(window.innerWidth, window.innerWidth);
}
//document.getElementById("canvasContainer").append(renderer.domElement);
document.body.getElementsByClassName('centered-canvas')[0].appendChild(renderer.domElement); //boardhouse uses a captured canvas element, difference?
var stageList = {}; //dictionary of all stages
var currentStage = "main";
stageList["main"] = new stage_1.Stage();
stageList["splash"] = new stage_1.Stage();
currentStage = "splash";
stageList["splash"].UIElements.push(new staticImage_1.StaticImage(stageList["splash"].UIScene, 0, 0, "assets/BoundingBox.png"));
stageList["splash"].update = function () {
};
//probably needed for later
//var verticalBoundary:number = Math.tan((camera.fov / 2) * Math.PI/180) * camera.position.z;
//var horizontalBoundary:number = Math.tan((Math.atan( Math.tan( camera.fov * Math.PI / 180 / 2 ) * camera.aspect ) * 180 / Math.PI) * Math.PI/180) * camera.position.z;//probably simplifyable
var interval = setInterval(update, 1000 / 60); //60 ticks per second 
function update() {
    stageList[currentStage].baseUpdate();
    stageList[currentStage].update();
}
var animate = function () {
    requestAnimationFrame(animate);
    stageList[currentStage].render(renderer);
};
animate();
window.addEventListener("resize", function (e) {
    //stageList[currentStage].camera.aspect = window.innerWidth / window.innerHeight;
    //stageList[currentStage].camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerWidth > window.innerHeight) {
        renderer.setSize(window.innerHeight, window.innerHeight);
    }
    else {
        renderer.setSize(window.innerWidth, window.innerWidth);
    }
});
