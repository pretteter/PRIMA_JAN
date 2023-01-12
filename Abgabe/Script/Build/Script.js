"use strict";
var Game;
(function (Game) {
    //   export let animationCurrent: ƒAid.SpriteSheetAnimation;
    //   export let animationWalk: ƒAid.SpriteSheetAnimation;
    //   export let animationIdle: ƒAid.SpriteSheetAnimation;
    //   export let animationJump: ƒAid.SpriteSheetAnimation;
    //   export let animationFall: ƒAid.SpriteSheetAnimation;
    //   export let animationRun: ƒAid.SpriteSheetAnimation;
    //   export function stetIdleAnimation(
    //     character: ƒ.Node,
    //     currentDirection: ConstructorParameters<typeof Character>[0]
    //   ) {
    //     const sprite =character.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    //     sprite.setAnimation(animationIdle);
    //     animationCurrent = animationIdle;
    //   }
    //   export function turnCharacter(
    //     character: ƒ.Node,
    //     currentDirection: "right" | "left"
    //   ) {
    //     character.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
    //     currentDirection === "right"
    //       ? (currentDirection = "left")
    //       : currentDirection === "left"
    //       ? (currentDirection = "right")
    //       : "";
    //   }
    async function buildAllAnimationsForCharacter(character) {
        await buildMoveAnimation(character);
        await buildIdleAnimation(character);
        // await buildJumpAnimation(character);
        // await buildFallAnimation(character);
        // await buildRunAnimation(character);
    }
    Game.buildAllAnimationsForCharacter = buildAllAnimationsForCharacter;
    async function buildMoveAnimation(character) {
        character.animationMove = await buildSingleAnimation("assets/Mario/marioSpriteSheet.png", "move", 247, 1, 15, 28, 3, 30);
    }
    async function buildIdleAnimation(character) {
        character.animationIdle = await buildSingleAnimation("assets/Mario/marioSpriteSheet.png", "idle", 247, 1, 15, 28, 1, 0);
    }
    //   async function buildJumpAnimation(character:Character) {
    //     animationJump = await buildSingleAnimation(
    //       "assets/Mario/marioSpriteSheet.png",
    //       "jump",
    //       335,
    //       1,
    //       18,
    //       28,
    //       1,
    //       0
    //     );
    //   }
    //   async function buildFallAnimation(character:Character) {
    //     animationFall = await buildSingleAnimation(
    //       "assets/Mario/marioSpriteSheet.png",
    //       "fall",
    //       366,
    //       1,
    //       16,
    //       28,
    //       1,
    //       0
    //     );
    //   }
    //   async function buildRunAnimation(character:Character) {
    //     animationRun = await buildSingleAnimation(
    //       "assets/Mario/marioSpriteSheet.png",
    //       "run",
    //       245,
    //       41,
    //       18,
    //       28,
    //       3,
    //       30
    //     );
    //   }
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
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Character extends ƒAid.NodeSprite {
        //     audioJump: ƒ.Audio;
        //     cmpAudio: ƒ.ComponentAudio;
        moveSpeed = 2;
        lookDirection;
        animationCurrent;
        animationMove;
        animationIdle;
        //     animationJump: ƒAid.SpriteSheetAnimation;
        //     animationFall: ƒAid.SpriteSheetAnimation;
        // animationRun: ƒAid.SpriteSheetAnimation;
        static amountOfInstances = 0;
        instanceId;
        constructor(lookDirection) {
            super("Character");
            this.lookDirection = lookDirection;
            this.initAvatar(lookDirection);
        }
        async initAvatar(lookDirection) {
            Game.viewport
                .getBranch()
                .addChild(new ƒ.Node("character_" + Character.amountOfInstances.toString()));
            this.addComponent(new ƒ.ComponentTransform());
            this.addChild(this.createNewSpriteNode(this.lookDirection));
            await Game.buildAllAnimationsForCharacter(this);
            this.stetIdleAnimation();
            this.lookDirection = lookDirection;
            this.instanceId = ++Character.amountOfInstances;
        }
        createNewSpriteNode(frameDirection) {
            let spriteNode = new ƒAid.NodeSprite("Sprite");
            // spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
            spriteNode.setFrameDirection(frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1);
            // spriteNode.mtxLocal.translateY(-0.5);
            // spriteNode.mtxLocal.translateX(-0.5);
            return spriteNode;
        }
        // function setJumpSound() {
        //   this.audioJump = new ƒ.Audio("audio/jump.mp3");
        //   this.cmpAudio = new ƒ.ComponentAudio(this.audioJump, false, false);
        //   this.cmpAudio.connect(true);
        //   this.cmpAudio.volume = 0.7;
        // }
        move(direction) {
            const sprite = this.getChildrenByName("Sprite")[0];
            const anmToUse = this.animationMove;
            this.animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
            this.animationCurrent = anmToUse;
            this.lookDirection !== direction ? this.turnCharacter() : "";
            this.getComponent(ƒ.ComponentTransform).mtxLocal.translateX((ƒ.Loop.timeFrameGame * this.moveSpeed) / 1000);
        }
        stetIdleAnimation() {
            const sprite = this.getChildrenByName("Sprite")[0];
            sprite.setAnimation(this.animationIdle);
            this.animationCurrent = this.animationIdle;
        }
        turnCharacter() {
            this.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
            this.lookDirection === "right"
                ? (this.lookDirection = "left")
                : this.lookDirection === "left"
                    ? (this.lookDirection = "right")
                    : "";
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Game); // Register the namespace to FUDGE for serialization
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
    Game.CustomComponentScript = CustomComponentScript;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let cmpCamera;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        Game.viewport = _event.detail;
        cmpCamera = Game.viewport.camera;
        let graph = Game.viewport.getBranch();
        cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 0, 35));
        cmpCamera.mtxPivot.rotateY(180);
        let charLeft = new Game.Character("left");
        // let charRight = new Character("right");
        // charLeft.mtxLocal.translateY(2);
        charLeft.mtxLocal.translateZ(1);
        graph.addChild(charLeft);
        // graph.addChild(charRight);
        console.log(graph);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        Game.viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Game || (Game = {}));
//# sourceMappingURL=Script.js.map