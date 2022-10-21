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
    let walkDirechtion = "right";
    let animationCurrent;
    let animationWalkRight;
    let animationWalkLeft;
    let animationIdle;
    let animationJump;
    let ySpeed = 0.01;
    let gravity = 0.1;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        let branch = viewport.getBranch();
        Mario = branch.getChildrenByName("Mario")[0];
        Mario.addChild(await createNewSpriteNode("forward"));
        animationWalkRight = await buildWalkRightAnimation();
        animationWalkLeft = await buildWalkLeftAnimation();
        animationIdle = await buildIdleAnimation();
        stetIdleAnimation();
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start();
        // ƒ.Loop.timeFrameGame
    }
    async function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
        setGravity();
        marioMovement();
    }
    function marioMovement() {
        if (!ƒ.Keyboard.isPressedOne([
            ƒ.KEYBOARD_CODE.D,
            ƒ.KEYBOARD_CODE.A,
            ƒ.KEYBOARD_CODE.W,
            ƒ.KEYBOARD_CODE.S,
        ])) {
            stetIdleAnimation();
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                ? walkRight(true)
                : walkRight();
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                ? walkLeft(true)
                : walkLeft();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
            ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])
                ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                    ? walkRight(true)
                    : walkRight()
                : ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])
                    ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                        ? walkLeft(true)
                        : walkLeft()
                    : "";
            jump();
        }
    }
    function walkRight(sprint) {
        const sprite = Mario.getChildrenByName("Sprite")[0];
        animationCurrent !== animationWalkRight
            ? sprite.setAnimation(animationWalkRight)
            : "";
        animationCurrent = animationWalkRight;
        walkDirechtion === "left" ? turnMario() : "";
        Mario.mtxLocal.translateX((ƒ.Loop.timeFrameGame * walkspeed + (sprint ? 10 : 0)) / 1000);
    }
    function walkLeft(sprint) {
        const sprite = Mario.getChildrenByName("Sprite")[0];
        animationCurrent !== animationWalkLeft
            ? sprite.setAnimation(animationWalkLeft)
            : "";
        walkDirechtion === "right" ? turnMario() : "";
        animationCurrent = animationWalkLeft;
        sprite
            .getComponent(ƒ.ComponentTransform)
            .mtxLocal.translateX((ƒ.Loop.timeFrameGame * walkspeed + (sprint ? 10 : 0)) / 1000);
    }
    function jump() {
        ySpeed <= 0.01 ? (ySpeed = 0.05) : "";
    }
    function setGravity() {
        let deltaTime = ƒ.Loop.timeFrameGame / 1000;
        ySpeed -= gravity * deltaTime;
        Mario.mtxLocal.translateY(ySpeed);
        let pos = Mario.mtxLocal.translation;
        if (pos.y + ySpeed > 0)
            Mario.mtxLocal.translateY(ySpeed);
        else {
            ySpeed = 0;
            pos.y = 0;
            Mario.mtxLocal.translation = pos;
        }
    }
    function stetIdleAnimation() {
        const sprite = Mario.getChildrenByName("Sprite")[0];
        sprite.setAnimation(animationIdle);
        animationCurrent = animationIdle;
    }
    function turnMario() {
        const sprite = Mario.getChildrenByName("Sprite")[0];
        sprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
        walkDirechtion === "right"
            ? (walkDirechtion = "left")
            : walkDirechtion === "left"
                ? (walkDirechtion = "right")
                : "";
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
        animation.generateByGrid(ƒ.Rectangle.GET(247, 1, 15, 28), 3, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(30));
        return animation;
    }
    async function buildWalkLeftAnimation() {
        let coat = await loadTextureFromSpriteSheet("assets/Mario/MarioWalk.png");
        let animation = new ƒAid.SpriteSheetAnimation("walkLeft", coat);
        animation.generateByGrid(ƒ.Rectangle.GET(247, 1, 15, 28), 3, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(30));
        return animation;
    }
    async function buildIdleAnimation() {
        let coat = await loadTextureFromSpriteSheet("assets/Mario/MarioWalk.png");
        let animation = new ƒAid.SpriteSheetAnimation("idle", coat);
        animation.generateByGrid(ƒ.Rectangle.GET(247, 1, 15, 28), 1, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(0));
        return animation;
    }
    async function buildJumpAnimation() {
        let coat = await loadTextureFromSpriteSheet("assets/Mario/MarioWalk.png");
        let animation = new ƒAid.SpriteSheetAnimation("jump", coat);
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