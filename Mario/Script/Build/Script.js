"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let Mario;
    let MarioSpriteNode;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        let branch = viewport.getBranch();
        Mario = branch.getChildrenByName("Mario")[0];
        let MarioSpriteNode = await walkRight();
        Mario.addChild(MarioSpriteNode);
        Mario.getComponent(ƒ.ComponentMaterial).activate(false);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
        Mario.mtxLocal.translateX(0.02);
    }
    async function walkRight() {
        // let root: ƒ.Node = new ƒ.Node("root");
        let coat = await loadSpriteSheet("assets/Mario/MarioWalk.png");
        let animation = new ƒAid.SpriteSheetAnimation("walkRight", coat);
        animation.generateByGrid(ƒ.Rectangle.GET(247, 1, 15, 28), 3, 30, ƒ.ORIGIN2D.TOPCENTER, ƒ.Vector2.X(14));
        MarioSpriteNode = new ƒAid.NodeSprite("Sprite");
        MarioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        MarioSpriteNode.setAnimation(animation);
        MarioSpriteNode.setFrameDirection(1);
        MarioSpriteNode.mtxLocal.translateY(1.4);
        // MarioSpriteNode.framerate = 30;
        return MarioSpriteNode;
    }
    async function loadSpriteSheet(pathSpriteSheet) {
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load(pathSpriteSheet);
        let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
        return coat;
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map