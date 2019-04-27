"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var three_1 = require("three");
var stage_1 = require("./stage");
var THREE = require('three'); //only needed due to three type shenanigans
var Projectile = /** @class */ (function (_super) {
    __extends(Projectile, _super);
    function Projectile(scene, x, y, type) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.type = type;
        var spriteMap;
        switch (type) {
            case 0: { //basic bee
                spriteMap = new THREE.TextureLoader().load("BoundingBox.png");
                break;
            }
            case 1: { //homing bee
                spriteMap = new THREE.TextureLoader().load("BoundingBox.png");
                break;
            }
            case 2: { //exterminator gas puff
                spriteMap = new THREE.TextureLoader().load("BoundingBox.png");
                break;
            }
            case 3: { //wasp? NYI
                spriteMap = new THREE.TextureLoader().load("BoundingBox.png");
                break;
            }
        }
        var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        _this.sprite = new three_1.Sprite(spriteMaterial);
        scene.add(_this.sprite);
        return _this;
    }
    Projectile.prototype.render = function () {
    };
    Projectile.prototype.update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if (this.type == 2) {
            this.xVelocity -= this.xVelocity / 10;
            this.yVelocity -= this.yVelocity / 10;
        }
        else if (this.type == 1) {
            //add homing bee logic here
        }
    };
    return Projectile;
}(stage_1.Updateable));
exports.Projectile = Projectile;
