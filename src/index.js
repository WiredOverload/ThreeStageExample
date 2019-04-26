"use strict";
/**
 * Notes:
 * Buttons and other interactable elements need more work in stage
 * individual stage update methods defined here?
 */
exports.__esModule = true;
var three_1 = require("three");
var stage_1 = require("./stage");
var staticImage_1 = require("./staticImage");
var renderer = new three_1.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);//1:1 scale resolution
if (window.innerWidth / 16 > window.innerHeight / 9) {
    renderer.setSize(window.innerHeight * (16 / 9), window.innerHeight); //make constant
}
else {
    renderer.setSize(window.innerWidth, window.innerWidth * (9 / 16));
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
    if (window.innerWidth / 16 > window.innerHeight / 9) {
        renderer.setSize(window.innerHeight * (16 / 9), window.innerHeight); //make constant
    }
    else {
        renderer.setSize(window.innerWidth, window.innerWidth * (9 / 16));
    }
});
