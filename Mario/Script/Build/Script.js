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
    Script.walkspeed = 2;
    Script.walkDirechtion = "right";
    Script.ySpeed = 1;
    Script.collision = false;
    let audioJump;
    let gravity = 10;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        let branch = viewport.getBranch();
        Script.Mario = branch.getChildrenByName("Mario")[0];
        Script.Mario.addChild(await createNewSpriteNode("forward"));
        await Script.buildAllAnimations();
        Script.stetIdleAnimation();
        let audio = viewport
            .getBranch()
            .getComponent(ƒ.ComponentAudio);
        console.log(audio);
        setJumpSound();
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start();
        // ƒ.Loop.timeFrameGame
    }
    async function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
        Script.marioControls();
        setGravityForMario();
        // checkCollision();
        initCollision();
    }
    function setGravityForMario() {
        let deltaTime = ƒ.Loop.timeFrameGame / 1000;
        Script.ySpeed <= -5 ? (Script.ySpeed = -5) : "";
        Script.ySpeed -= gravity * deltaTime;
        let yOffset = Script.ySpeed * deltaTime;
        Script.Mario.mtxLocal.translateY(yOffset);
    }
    async function createNewSpriteNode(frameDirection) {
        Script.spriteNode = new ƒAid.NodeSprite("Sprite");
        Script.spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        Script.spriteNode.setFrameDirection(frameDirection === "back" ? -1 : frameDirection === "forward" ? 1 : 1);
        Script.spriteNode.mtxLocal.translateY(0.5);
        return Script.spriteNode;
    }
    function checkCollision() {
        let blocks = viewport.getBranch().getChildrenByName("Floor")[0];
        let pos = Script.Mario.mtxLocal.translation;
        for (let block of blocks.getChildren()) {
            let posBlock = block.mtxLocal.translation;
            if (Math.abs(pos.x - posBlock.x) < 0.5) {
                if (pos.y < posBlock.y && pos.y > posBlock.y - 0.2) {
                    Script.collision = true;
                    return;
                }
            }
        }
        Script.collision = false;
    }
    Script.checkCollision = checkCollision;
    function initCollision() {
        checkCollision();
        if (Script.collision) {
            let blocks = viewport.getBranch().getChildrenByName("Floor")[0];
            let pos = Script.Mario.mtxLocal.translation;
            for (let block of blocks.getChildren()) {
                let posBlock = block.mtxLocal.translation;
                pos.y = posBlock.y;
                Script.Mario.mtxLocal.translation = pos;
                Script.ySpeed = 0;
            }
        }
    }
    function setJumpSound() {
        audioJump = new ƒ.Audio("audio/jump.mp3");
        Script.cmpAudio = new ƒ.ComponentAudio(audioJump, false, false);
        Script.cmpAudio.connect(true);
        Script.cmpAudio.volume = 0.7;
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    function stetIdleAnimation() {
        const sprite = Script.Mario.getChildrenByName("Sprite")[0];
        sprite.setAnimation(Script.animationIdle);
        Script.animationCurrent = Script.animationIdle;
    }
    Script.stetIdleAnimation = stetIdleAnimation;
    function turnMario() {
        Script.Mario.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
        Script.walkDirechtion === "right"
            ? (Script.walkDirechtion = "left")
            : Script.walkDirechtion === "left"
                ? (Script.walkDirechtion = "right")
                : "";
    }
    Script.turnMario = turnMario;
    async function buildAllAnimations() {
        await buildWalkAnimation();
        await buildIdleAnimation();
        await buildJumpAnimation();
        await buildFallAnimation();
        await buildRunAnimation();
    }
    Script.buildAllAnimations = buildAllAnimations;
    async function buildWalkAnimation() {
        Script.animationWalk = await buildSingleAnimation("assets/Mario/marioSpriteSheet.png", "walk", 247, 1, 15, 28, 3, 30);
    }
    async function buildIdleAnimation() {
        Script.animationIdle = await buildSingleAnimation("assets/Mario/marioSpriteSheet.png", "idle", 247, 1, 15, 28, 1, 0);
    }
    async function buildJumpAnimation() {
        Script.animationJump = await buildSingleAnimation("assets/Mario/marioSpriteSheet.png", "jump", 335, 1, 18, 28, 1, 0);
    }
    async function buildFallAnimation() {
        Script.animationFall = await buildSingleAnimation("assets/Mario/marioSpriteSheet.png", "fall", 366, 1, 16, 28, 1, 0);
    }
    async function buildRunAnimation() {
        Script.animationRun = await buildSingleAnimation("assets/Mario/marioSpriteSheet.png", "run", 245, 41, 18, 28, 3, 30);
    }
    async function buildSingleAnimation(path, name, startX, startY, width, height, frames, distanceBetweenSprites) {
        let coat = await loadTextureFromSpriteSheet(path);
        let animation = new ƒAid.SpriteSheetAnimation(name, coat);
        animation.generateByGrid(ƒ.Rectangle.GET(startX, startY, width, height), frames, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(frames > 0 ? distanceBetweenSprites : 0));
        return animation;
    }
    async function loadTextureFromSpriteSheet(pathSpriteSheet) {
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load(pathSpriteSheet);
        let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
        return coat;
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    function marioControls() {
        if (!ƒ.Keyboard.isPressedOne([
            ƒ.KEYBOARD_CODE.D,
            ƒ.KEYBOARD_CODE.A,
            ƒ.KEYBOARD_CODE.W,
            ƒ.KEYBOARD_CODE.S,
        ])) {
            Script.collision && Script.animationCurrent !== Script.animationIdle
                ? Script.stetIdleAnimation()
                : "";
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
            ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])
                ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                    ? walk("right", true)
                    : walk("right")
                : ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])
                    ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                        ? walk("left", true)
                        : walk("left")
                    : "";
            jump();
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                ? walk("right", true)
                : walk("right");
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
                ? walk("left", true)
                : walk("left");
        }
        if (!Script.collision) {
            manageJumpAndFallAnimation();
        }
    }
    Script.marioControls = marioControls;
    function walk(direction, sprint) {
        const sprite = Script.Mario.getChildrenByName("Sprite")[0];
        if (Script.collision) {
            const anmToUse = sprint ? Script.animationRun : Script.animationWalk;
            Script.animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
            Script.animationCurrent = anmToUse;
        }
        Script.walkDirechtion !== direction ? Script.turnMario() : "";
        Script.Mario.getComponent(ƒ.ComponentTransform).mtxLocal.translateX((ƒ.Loop.timeFrameGame * Script.walkspeed * (sprint ? 2 : 1)) / 1000);
    }
    function jump() {
        Script.cmpAudio.play(true);
        Script.collision ? (Script.ySpeed = 5) : "";
    }
    function manageJumpAndFallAnimation() {
        const sprite = Script.Mario.getChildrenByName("Sprite")[0];
        Script.ySpeed >= 0
            ? sprite.setAnimation(Script.animationJump)
            : sprite.setAnimation(Script.animationFall);
        Script.animationCurrent = Script.animationJump;
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map