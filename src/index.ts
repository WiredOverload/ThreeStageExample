/**
 * Notes:
 * Buttons and other interactable elements need more work in stage
 * individual stage update methods defined here?
 */

import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { Stage } from "./stage";
import { StaticImage } from "./staticImage";

var renderer:WebGLRenderer = new WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);//1:1 scale resolution
if(window.innerWidth / 16 > window.innerHeight / 9) {
    renderer.setSize(window.innerHeight * (16/9), window.innerHeight);//make constant
}
else {
    renderer.setSize(window.innerWidth, window.innerWidth * (9/16));
} 

//document.getElementById("canvasContainer").append(renderer.domElement);
document.body.getElementsByClassName('centered-canvas')[0].appendChild(renderer.domElement);//boardhouse uses a captured canvas element, difference?

let stageList: { [key: string]: Stage; } = {};//dictionary of all stages
var currentStage:string = "main";

stageList["main"] = new Stage();

stageList["splash"] = new Stage();
currentStage = "splash";
stageList["splash"].UIElements.push(new StaticImage(stageList["splash"].UIScene, 0, 0, "assets/BoundingBox.png"));

stageList["splash"].update = function() {//actual splash screen update logic here

}

var interval = setInterval(update, 1000/60);//60 ticks per second 
function update() {
    stageList[currentStage].baseUpdate();
    stageList[currentStage].update();
}

var animate = function() {
    requestAnimationFrame(animate);

    stageList[currentStage].render(renderer);
}
animate();

window.addEventListener("resize", e => {
    if(window.innerWidth / 16 > window.innerHeight / 9) {
        renderer.setSize(window.innerHeight * (16/9), window.innerHeight);//make constant
    }
    else {
        renderer.setSize(window.innerWidth, window.innerWidth * (9/16));
    }
});