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
    let spriteNode;
    let walkspeed = 1;
    let walkRightAnimation;
    let idleAnimation;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        let branch = viewport.getBranch();
        Mario = branch.getChildrenByName("Mario")[0];
        walkRightAnimation = await buildWalkRightAnimation();
        idleAnimation = await buildIdleAnimation();
        Mario.addChild(await createNewSpriteNode("forward"));
        stetIdleAnimation();
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start();
        // ƒ.Loop.timeFrameGame
    }
    async function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            setWalkRight();
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                ? setWalkLeft(true)
                : setWalkLeft();
        }
        else {
            stetIdleAnimation();
        }
    }
    function setWalkRight(sprint) {
        const sprite = Mario.getChildrenByName("Sprite")[0];
        sprite.setAnimation(walkRightAnimation);
        Mario.mtxLocal.translateX((ƒ.Loop.timeFrameGame * walkspeed + (sprint ? 10 : 0)) / 1000);
    }
    function setWalkLeft(sprint) {
        const sprite = Mario.getChildrenByName("Sprite")[0];
        sprite.setAnimation(walkRightAnimation);
        Mario.mtxLocal.translateX((-ƒ.Loop.timeFrameGame * walkspeed + (sprint ? 10 : 0)) / 1000);
    }
    function stetIdleAnimation() {
        const sprite = Mario.getChildrenByName("Sprite")[0];
        sprite.setAnimation(idleAnimation);
    }
    async function createNewSpriteNode(frameDirection) {
        // let root: ƒ.Node = new ƒ.Node("root");
        spriteNode = new ƒAid.NodeSprite("Sprite");
        spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        // MarioSpriteNode.setAnimation(await buildWalkRightAnimation());
        spriteNode.setFrameDirection(frameDirection === "back" ? -1 : frameDirection === "forward" ? 1 : 1);
        spriteNode.mtxLocal.translateY(0.5);
        // MarioSpriteNode.framerate = 30;
        return spriteNode;
    }
    async function buildWalkRightAnimation() {
        let coat = await loadTextureFromSpriteSheet("assets/Mario/MarioWalk.png");
        let animation = new ƒAid.SpriteSheetAnimation("walkRight", coat);
        animation.generateByGrid(ƒ.Rectangle.GET(247, 1, 15, 28), 3, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(14));
        return animation;
    }
    async function buildIdleAnimation() {
        let coat = await loadTextureFromSpriteSheet("assets/Mario/MarioWalk.png");
        let animation = new ƒAid.SpriteSheetAnimation("idle", coat);
        animation.generateByGrid(ƒ.Rectangle.GET(247, 1, 15, 28), 1, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(0));
        return animation;
    }
    async function loadTextureFromSpriteSheet(pathSpriteSheet) {
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load(pathSpriteSheet);
        let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
        return coat;
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map