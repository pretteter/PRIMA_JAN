"use strict";
var Game;
(function (Game) {
    async function buildAllAnimationsForCharacter(character) {
        await buildMoveAnimation(character);
        await buildIdleAnimation(character);
        // await buildJumpAnimation(character);
        // await buildFallAnimation(character);
        // await buildRunAnimation(character);
    }
    Game.buildAllAnimationsForCharacter = buildAllAnimationsForCharacter;
    async function buildBombAnimation(bomb) {
        await buildBombIdleAnimation(bomb);
        await buildBombExplodeAnimation(bomb);
    }
    Game.buildBombAnimation = buildBombAnimation;
    async function buildMoveAnimation(char) {
        let path;
        let startX = 78;
        let startY = 4;
        let width = 15;
        let height = 17;
        let frames = 8;
        let distanceBetweenSprites = 24;
        switch (char.instanceId) {
            case 1: {
                path = "assets/sprites/sheets/DinoSprites_mort.png";
                break;
            }
            case 2: {
                path = "assets/sprites/sheets/DinoSprites_doux.png";
                break;
            }
            case 3: {
                path = "assets/sprites/sheets/DinoSprites_tard.png";
                break;
            }
            case 4: {
                path = "assets/sprites/sheets/DinoSprites_vita.png";
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
        let startX = 6;
        let startY = 4;
        let width = 15;
        let height = 17;
        let frames = 3;
        let distanceBetweenSprites = 24;
        switch (character.instanceId) {
            case 1: {
                path = "assets/sprites/sheets/DinoSprites_mort.png";
                break;
            }
            case 2: {
                path = "assets/sprites/sheets/DinoSprites_doux.png";
                break;
            }
            case 3: {
                path = "assets/sprites/sheets/DinoSprites_tard.png";
                break;
            }
            case 4: {
                path = "assets/sprites/sheets/DinoSprites_vita.png";
                break;
            }
            default: {
                console.error("no character to generate");
                return;
            }
        }
        character.animationIdle = await buildSingleAnimation(path, "idle", startX, startY, width, height, frames, distanceBetweenSprites);
    }
    async function buildBombIdleAnimation(bomb) {
        let path = "assets/sprites/sheets/bomb_character_o_idle.png";
        let startX = 22;
        let startY = 21;
        let width = 22;
        let height = 30;
        let frames = 2;
        let distanceBetweenSprites = 64;
        bomb.animationIdle = await buildSingleAnimation(path, "idle", startX, startY, width, height, frames, distanceBetweenSprites);
    }
    async function buildBombExplodeAnimation(bomb) {
        let path = "assets/sprites/sheets/bomb_character_o_explode.png";
        let startX = 22;
        let startY = 27;
        let width = 22;
        let height = 24;
        let frames = 3;
        let distanceBetweenSprites = 29;
        bomb.animationExplode = await buildSingleAnimation(path, "idle", startX, startY, width, height, frames, distanceBetweenSprites);
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
    function createSounds() {
        setBackgroundSound();
        setShootSound();
    }
    Game.createSounds = createSounds;
    function setShootSound() {
        let audio = new ƒ.Audio("assets/audio/PUNCH.mp3");
        Game.audioShoot = new ƒ.ComponentAudio(audio, false, false);
        Game.audioShoot.connect(true);
        Game.audioShoot.volume = 0.2;
    }
    function setBackgroundSound() {
        let audio = new ƒ.Audio("assets/audio/Prepare_for_Battle_looped.mp3");
        Game.audioBackground = new ƒ.ComponentAudio(audio, true, false);
        Game.audioBackground.connect(true);
        Game.audioBackground.volume = 0.1;
    }
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Character extends ƒ.Node {
        //     audioJump: ƒ.Audio;
        //     cmpAudio: ƒ.ComponentAudio;
        // moveSpeed: number = 2;
        lookDirection;
        animationCurrent;
        animationMove;
        animationIdle;
        hasRocket;
        life = 100;
        mass;
        //     animationJump: ƒAid.SpriteSheetAnimation;
        //     animationFall: ƒAid.SpriteSheetAnimation;
        // animationRun: ƒAid.SpriteSheetAnimation;
        static amountOfInstances = 0;
        instanceId;
        constructor(lookDirection, coordinateX, coordinateY, mass) {
            super("Character_" + Character.amountOfInstances.toString());
            this.lookDirection = lookDirection;
            this.initAvatar(lookDirection, coordinateX, coordinateY, mass);
        }
        async initAvatar(lookDirection, coordinateX, coordinateY, mass) {
            this.instanceId = ++Character.amountOfInstances;
            this.mass = mass;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(new ƒ.Vector3(coordinateX, coordinateY, 0));
            // this.mtxLocal.scale(new ƒ.Vector3(1, 1, 1));
            this.addChild(this.createNewSpriteNode(this.lookDirection));
            // await buildAllAnimationsForCharacter(this);
            this.addRigidBody();
            this.lookDirection = lookDirection;
            let graph = Game.viewport.getBranch();
            graph.addChild(this);
            this.setIdleAnimation(lookDirection);
        }
        move(direction) {
            const sprite = this.getChildrenByName("Sprite")[0];
            const anmToUse = this.animationMove;
            this.animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
            this.animationCurrent = anmToUse;
            this.lookDirection !== direction ? this.turnCharacter() : "";
            if (this.getComponent(ƒ.ComponentRigidbody).getVelocity().x >= -10 &&
                this.getComponent(ƒ.ComponentRigidbody).getVelocity().x <= 10) {
                this.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(direction === "right" ? this.mass * 50 : -this.mass * 50, 0, 0));
            }
        }
        jump() {
            if (this.getComponent(ƒ.ComponentRigidbody).getVelocity().y <= 0.1 &&
                this.getComponent(ƒ.ComponentRigidbody).getVelocity().y >= -0.1)
                this.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(0, this.mass * 1600, 0));
        }
        attack() {
            if (!this.hasRocket) {
                const rocket = new Game.Bomb(80000, 50);
                rocket.launch(this, this.lookDirection);
                this.hasRocket = true;
                setTimeout(() => {
                    rocket.removeRocket();
                    this.hasRocket = false;
                }, 1200);
            }
        }
        setIdleAnimation(initDirechtion) {
            if (this.animationCurrent === this.animationIdle) {
                return;
            }
            const sprite = this.getChildrenByName("Sprite")[0];
            sprite.setAnimation(this.animationIdle);
            this.animationCurrent = this.animationIdle;
            initDirechtion === this.lookDirection ? this.turnCharacter() : "";
        }
        turnCharacter() {
            this.getComponent(ƒ.ComponentRigidbody).rotateBody(new ƒ.Vector3(0, 180, 0));
            this.lookDirection === "right"
                ? (this.lookDirection = "left")
                : this.lookDirection === "left"
                    ? (this.lookDirection = "right")
                    : "";
        }
        createNewSpriteNode(frameDirection) {
            let spriteNode = new ƒAid.NodeSprite("Sprite");
            // spriteNode.addComponent(new ƒ.ComponentTransform);
            spriteNode.addComponent(new ƒ.ComponentTransform());
            spriteNode.setFrameDirection(frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1);
            spriteNode.mtxLocal.translateY(-0.25);
            return spriteNode;
        }
        addRigidBody() {
            let rigidBody = new ƒ.ComponentRigidbody();
            // rigidBody.initialization = ƒ.BODY_INIT.TO_MESH;
            rigidBody.effectGravity = 10;
            rigidBody.mass = this.mass;
            rigidBody.typeCollider = ƒ.COLLIDER_TYPE.CUBE;
            rigidBody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
            rigidBody.effectRotation = new ƒ.Vector3(0, 0, 0);
            rigidBody.mtxPivot.scale(new ƒ.Vector3(0.5, 0.5, 1));
            // rigidBody.mtxPivot.scaleX(0.5);
            rigidBody.initialize();
            this.addComponent(rigidBody);
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
        let attack;
        let jump;
        moveLeft = index(ƒ.KEYBOARD_CODE, Game.config.character[char.instanceId - 1].moveLeft);
        moveRight = index(ƒ.KEYBOARD_CODE, Game.config.character[char.instanceId - 1].moveRight);
        attack = index(ƒ.KEYBOARD_CODE, Game.config.character[char.instanceId - 1].attack);
        jump = index(ƒ.KEYBOARD_CODE, Game.config.character[char.instanceId - 1].jump);
        movement();
        actions();
        function movement() {
            if (!ƒ.Keyboard.isPressedOne([moveLeft, moveRight])) {
                char.setIdleAnimation();
            }
            else if (ƒ.Keyboard.isPressedOne([moveRight])) {
                char.move("right");
            }
            else if (ƒ.Keyboard.isPressedOne([moveLeft])) {
                char.move("left");
            }
        }
        function actions() {
            if (ƒ.Keyboard.isPressedOne([attack])) {
                char.attack();
            }
            if (ƒ.Keyboard.isPressedOne([jump])) {
                char.jump();
            }
        }
        function index(obj, i) {
            return obj[i];
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
    // let audioJump: ƒ.Audio;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        Game.viewport = _event.detail;
        Game.viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
        cmpCamera = Game.viewport.camera;
        // let graph: ƒ.Node = viewport.getBranch();
        cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 4, 18));
        cmpCamera.mtxPivot.rotateY(180);
        await hndLoad(_event);
        Game.createSounds();
        Game.audioBackground.play(true);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        // console.log(config?.character);
        characters.forEach((x) => {
            Game.characterControlls(x);
        });
        Game.viewport.draw();
        ƒ.AudioManager.default.update();
    }
    async function hndLoad(_event) {
        // Load config
        Game.config = await (await fetch("Script/Source/config.json")).json();
        Game.config.character.forEach(async (c, i) => {
            if (i <= 3) {
                characters.push(new Game.Character("right", c.startX | 5, c.startY | 5, c.mass | 10));
                await Game.buildAllAnimationsForCharacter(characters[i]);
                // characters[i].setIdleAnimation("left");
            }
            else
                return;
        });
    }
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Bomb extends ƒ.Node {
        forceStart;
        mass;
        animationIdle;
        animationExplode;
        static amountOfInstances = 0;
        instanceId;
        constructor(forceStart, mass) {
            super("Bomb_" + Bomb.amountOfInstances.toString());
            this.forceStart = forceStart;
            this.mass = mass;
            this.initBomb();
        }
        async initBomb() {
            this.instanceId = ++Bomb.amountOfInstances;
            this.addComponent(new ƒ.ComponentTransform());
            this.addRidgetBody();
            this.addChild(this.createNewSpriteNode("right"));
            await Game.buildBombAnimation(this);
            this.setIdleAnimation();
        }
        launch(character, direction) {
            Game.audioShoot.play(true);
            this.placeBomb(character);
            this.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(direction === "right" ? this.forceStart / 2 : -this.forceStart / 2, this.forceStart, 0));
        }
        placeBomb(character) {
            this.mtxLocal.translate(new ƒ.Vector3(character.getComponent(ƒ.ComponentRigidbody).getPosition().x, character.getComponent(ƒ.ComponentRigidbody).getPosition().y + 2, 0));
            let graph = Game.viewport.getBranch();
            graph.addChild(this);
        }
        createNewSpriteNode(frameDirection) {
            let spriteNode = new ƒAid.NodeSprite("Sprite");
            spriteNode.addComponent(new ƒ.ComponentTransform());
            spriteNode.setFrameDirection(frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1);
            spriteNode.mtxLocal.translateY(-0.5);
            return spriteNode;
        }
        addRidgetBody() {
            let ridgetBody = new ƒ.ComponentRigidbody();
            ridgetBody.initialization = ƒ.BODY_INIT.TO_PIVOT;
            ridgetBody.effectGravity = 10;
            ridgetBody.mass = this.mass;
            ridgetBody.typeCollider = ƒ.COLLIDER_TYPE.CUBE;
            ridgetBody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
            ridgetBody.effectRotation = new ƒ.Vector3(0, 0, 0);
            // ridgetBody.setScaling(new ƒ.Vector3(0.5,0.5,0.5))
            ridgetBody.initialize();
            this.addComponent(ridgetBody);
        }
        setIdleAnimation() {
            const sprite = this.getChildrenByName("Sprite")[0];
            sprite.setAnimation(this.animationIdle);
            // this.animationCurrent = this.animationIdle;
        }
        removeRocket() {
            const sprite = this.getChildrenByName("Sprite")[0];
            sprite.setAnimation(this.animationExplode);
            setTimeout(() => {
                let graph = Game.viewport.getBranch();
                graph.removeChild(this);
            }, 250);
        }
    }
    Game.Bomb = Bomb;
})(Game || (Game = {}));
//# sourceMappingURL=Script.js.map