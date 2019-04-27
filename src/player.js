"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var three_1 = require("three");
var stage_1 = require("./stage");
var THREE = require('three');
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(scene) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.x = 0;
        _this.y = 0;
        _this.xVel = 0;
        _this.yVel = 0;
        var spriteMap = new THREE.TextureLoader().load("assets/BoundingBox.png"); //"BoundingBox.png"
        var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        _this.sprite = new three_1.Sprite(spriteMaterial);
        _this.scene.add(_this.sprite);
        return _this;
    }
    Player.prototype.update = function () {
        this.x += this.xVel;
        this.y += this.yVel;
        this.sprite.position.set(this.x, this.y, 0);
    };
    Player.prototype.render = function () {
    };
    return Player;
}(stage_1.Updateable));
exports.Player = Player;
