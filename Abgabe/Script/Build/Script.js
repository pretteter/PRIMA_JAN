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
    async function buildMoveAnimation(char) {
        let path;
        let startX;
        let startY;
        let width;
        let height;
        let frames;
        let distanceBetweenSprites;
        switch (char.instanceId) {
            case 1: {
                path = "assets/Mario/marioSpriteSheet.png";
                startX = 247;
                startY = 1;
                width = 15;
                height = 28;
                frames = 3;
                distanceBetweenSprites = 30;
                break;
            }
            case 2: {
                path = "/assets/sprites/sheets/DinoSprites-doux.png";
                startX = 247;
                startY = 1;
                width = 15;
                height = 28;
                frames = 3;
                distanceBetweenSprites = 30;
                break;
            }
            default: {
                console.error("no character to generate");
                return;
            }
        }
        char.animationMove = await buildSingleAnimation(path, "move", startX, startY, width, height, frames, distanceBetweenSprites);
    }
    async function buildIdleAnimation(character) {
        let path;
        let startX;
        let startY;
        let width;
        let height;
        let frames;
        let distanceBetweenSprites;
        switch (character.instanceId) {
            case 1: {
                path = "assets/Mario/marioSpriteSheet.png";
                startX = 247;
                startY = 1;
                width = 15;
                height = 28;
                frames = 1;
                distanceBetweenSprites = 0;
                break;
            }
            case 2: {
                path = "/assets/sprites/sheets/DinoSprites-doux.png";
                startX = 247;
                startY = 1;
                width = 15;
                height = 28;
                frames = 1;
                distanceBetweenSprites = 0;
                break;
            }
            default: {
                console.error("no character to generate");
                return;
            }
        }
        character.animationIdle = await buildSingleAnimation(path, "idle", startX, startY, width, height, frames, distanceBetweenSprites);
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
    class Character extends ƒ.Node {
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
        constructor(lookDirection, coordinateX, coordinateY) {
            super("Character");
            this.lookDirection = lookDirection;
            this.initAvatar(lookDirection, coordinateX, coordinateY);
        }
        async initAvatar(lookDirection, coordinateX, coordinateY) {
            Game.viewport
                .getBranch()
                .addChild(new ƒ.Node("character_" + Character.amountOfInstances.toString()));
            this.instanceId = ++Character.amountOfInstances;
            this.addComponent(new ƒ.ComponentTransform());
            this.addRidgetBody();
            this.mtxLocal.translate(new ƒ.Vector3(coordinateX, coordinateY, 0));
            this.mtxLocal.scale(new ƒ.Vector3(2, 2, 2));
            this.addChild(this.createNewSpriteNode(this.lookDirection));
            await Game.buildAllAnimationsForCharacter(this);
            this.setIdleAnimation();
            lookDirection === "left" ? this.turnCharacter() : "";
            this.lookDirection = lookDirection;
            let graph = Game.viewport.getBranch();
            graph.addChild(this);
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
        setIdleAnimation() {
            const sprite = this.getChildrenByName("Sprite")[0];
            sprite.setAnimation(this.animationIdle);
            this.animationCurrent = this.animationIdle;
        }
        turnCharacter() {
            this.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
            console.log(this.getComponent(ƒ.ComponentTransform).mtxLocal);
            this.lookDirection === "right"
                ? (this.lookDirection = "left")
                : this.lookDirection === "left"
                    ? (this.lookDirection = "right")
                    : "";
        }
        addRidgetBody() {
            let x = new ƒ.ComponentRigidbody();
            x.initialization = ƒ.BODY_INIT.TO_MESH;
            x.effectGravity = 10;
            x.mass = 10;
            x.typeCollider = ƒ.COLLIDER_TYPE.CUBE;
            x.typeBody = ƒ.BODY_TYPE.DYNAMIC;
            x.initialize();
            this.addComponent(x);
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    //   import ƒAid = FudgeAid;
    function characterControlls(char) {
        let moveLeft;
        let moveRight;
        // let shoot;
        switch (char.instanceId) {
            case 1: {
                moveLeft = ƒ.KEYBOARD_CODE.A;
                moveRight = ƒ.KEYBOARD_CODE.D;
                break;
            }
            case 2: {
                moveLeft = ƒ.KEYBOARD_CODE.ARROW_LEFT;
                moveRight = ƒ.KEYBOARD_CODE.ARROW_RIGHT;
                break;
            }
            default: {
                console.error("no Char to controll");
                return;
            }
        }
        if (!ƒ.Keyboard.isPressedOne([moveLeft, moveRight])) {
            char.animationCurrent !== char.animationIdle
                ? char.setIdleAnimation()
                : "";
        }
        else if (ƒ.Keyboard.isPressedOne([moveRight])) {
            char.move("right");
        }
        else if (ƒ.Keyboard.isPressedOne([moveLeft])) {
            char.move("left");
        }
    }
    Game.characterControlls = characterControlls;
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
    let characters = [];
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        Game.viewport = _event.detail;
        cmpCamera = Game.viewport.camera;
        // let graph: ƒ.Node = viewport.getBranch();
        cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 0, 35));
        cmpCamera.mtxPivot.rotateY(180);
        characters.push(new Game.Character("left", 0, 0), new Game.Character("right", 5, 5));
        // let charX = new Character("left", 7, 7);
        // let charRight = new Character("right");
        // charLeft.mtxLocal.translateY(2);
        // graph.addChild(charRight);
        console.log(Game.viewport.getBranch());
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        characters.forEach((x) => {
            Game.characterControlls(x);
        });
        // CharacterControlls();
        Game.viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Game || (Game = {}));
//# sourceMappingURL=Script.js.map