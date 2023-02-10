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
        switch (char.instanceId % 4) {
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
            case 0: {
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
        switch (character.instanceId % 4) {
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
            case 0: {
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
    class Bomb extends ƒ.Node {
        forceStart;
        mass;
        animationIdle;
        animationExplode;
        animationCurrent;
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
            this.addLight();
            this.addChild(this.createNewSpriteNode("right"));
            await Game.buildBombAnimation(this);
            this.setIdleAnimation();
        }
        launch(character, direction) {
            console.log("Char Launch Bomb");
            console.log(character);
            Game.audioShoot.play(true);
            this.placeBomb(character);
            this.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(direction === "right" ? this.forceStart / 2 : -this.forceStart / 2, this.forceStart, 0));
            try {
                this.manageCollision(character);
            }
            catch (e) {
                console.error(e);
            }
        }
        placeBomb(character) {
            this.mtxLocal.translate(new ƒ.Vector3(character.getComponent(ƒ.ComponentRigidbody).getPosition().x, character.getComponent(ƒ.ComponentRigidbody).getPosition().y + 1, 0));
            Game.viewport.getBranch().addChild(this);
        }
        createNewSpriteNode(frameDirection) {
            let spriteNode = new ƒAid.NodeSprite("Sprite");
            spriteNode.addComponent(new ƒ.ComponentTransform());
            spriteNode.setFrameDirection(frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1);
            spriteNode.mtxLocal.translateY(-0.5);
            spriteNode.activate(false);
            return spriteNode;
        }
        addRidgetBody() {
            let ridgetBody = new ƒ.ComponentRigidbody();
            ridgetBody.initialization = ƒ.BODY_INIT.TO_PIVOT;
            ridgetBody.effectGravity = 10;
            ridgetBody.mass = this.mass;
            ridgetBody.typeCollider = ƒ.COLLIDER_TYPE.SPHERE;
            ridgetBody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
            ridgetBody.effectRotation = new ƒ.Vector3(0, 0, 0);
            // ridgetBody.setScaling(new ƒ.Vector3(0.5,0.5,0.5))
            ridgetBody.initialize();
            this.addComponent(ridgetBody);
        }
        setIdleAnimation() {
            const sprite = this.getChildrenByName("Sprite")[0];
            sprite.setAnimation(this.animationIdle);
            sprite.activate(true);
            this.animationCurrent = this.animationIdle;
        }
        removeBomb(char) {
            const sprite = this.getChildrenByName("Sprite")[0];
            this.animationCurrent !== this.animationExplode
                ? sprite.setAnimation(this.animationExplode)
                : "";
            setTimeout(() => {
                this.removeNode(this);
                this.getComponent(ƒ.ComponentRigidbody).removeEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, (_event) => { });
                char.hasRocket = false;
            }, 250);
        }
        manageCollision(char) {
            this.getComponent(ƒ.ComponentRigidbody).addEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, (_event) => {
                const collisionPartner = _event.cmpRigidbody.node;
                if (collisionPartner.name === "mainland") {
                    console.error("Collison with mainland");
                }
                if (collisionPartner instanceof Game.Character) {
                    console.error("Collison with char");
                    collisionPartner.life -= 25;
                    if (collisionPartner.life <= 0) {
                        this.removeNode(collisionPartner);
                    }
                    Game.gameState.refresh();
                }
                this.removeBomb(char);
            });
        }
        removeNode(node) {
            const sprite = this.getChildrenByName("Sprite")[0];
            let graph = Game.viewport.getBranch();
            graph.removeChild(node);
            sprite.stopAnimation();
            if (node instanceof Game.Character) {
                Game.characters.forEach((c, i) => {
                    if (c === node)
                        Game.characters.splice(i, 1);
                });
            }
            Game.viewport.draw();
        }
        addLight() {
            let light = new ƒ.ComponentLight();
            light.setType(ƒ.LightPoint);
            light.mtxPivot.translate(new ƒ.Vector3(0, 0, 1));
            light.mtxPivot.scale(new ƒ.Vector3(20, 20, 2));
            // light.mtxPivot.rotate(new ƒ.Vector3(0, 0, 0));
            this.addComponent(light);
        }
    }
    Game.Bomb = Bomb;
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
        hasRocket = false;
        life = 100;
        mass;
        static amountOfInstances = 0;
        instanceId;
        constructor(name, lookDirection, coordinateX, coordinateY, mass) {
            super(name || "Character_" + (Character.amountOfInstances + 1).toString());
            // this.lookDirection = lookDirection;
            this.initAvatar(lookDirection || "right", coordinateX || 5, coordinateY || 5, mass || 10);
        }
        initAvatar(lookDirection, coordinateX, coordinateY, mass) {
            this.instanceId = ++Character.amountOfInstances;
            this.mass = mass;
            this.lookDirection = lookDirection;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(new ƒ.Vector3(coordinateX, coordinateY, 0));
            this.addChild(this.createNewSpriteNode(this.lookDirection));
            this.addRigidBody();
            // this.addLight();
            Character.amountOfInstances % 4 === 0
                ? this.addComponent(new Game.RotateRigidBody())
                : "";
            let graph = Game.viewport.getBranch();
            graph.addChild(this);
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
            if (this.hasRocket === false) {
                const rocket = new Game.Bomb(80000, 50);
                this.hasRocket = true;
                rocket.launch(this, this.lookDirection);
            }
        }
        setIdleAnimation(otherDirectionThanSprite) {
            if (this.animationCurrent === this.animationIdle) {
                return;
            }
            const sprite = this.getChildrenByName("Sprite")[0];
            sprite.setAnimation(this.animationIdle);
            sprite.activate(true);
            this.animationCurrent = this.animationIdle;
            if (otherDirectionThanSprite) {
                this.turnCharacter(otherDirectionThanSprite);
            }
        }
        turnCharacter(otherDirectionThanSprite) {
            this.getComponent(ƒ.ComponentRigidbody).rotateBody(new ƒ.Vector3(0, 180, 0));
            // this.getComponent(ƒ.ComponentLight).mtxPivot.rotate(
            //   new ƒ.Vector3(0, 0, 180)
            // );
            if (otherDirectionThanSprite)
                return;
            this.lookDirection === "right"
                ? (this.lookDirection = "left")
                : this.lookDirection === "left"
                    ? (this.lookDirection = "right")
                    : "";
        }
        createNewSpriteNode(frameDirection) {
            let spriteNode = new ƒAid.NodeSprite("Sprite");
            spriteNode.addComponent(new ƒ.ComponentTransform());
            spriteNode.setFrameDirection(frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1);
            spriteNode.mtxLocal.translateY(-0.25);
            spriteNode.activate(false);
            return spriteNode;
        }
        addRigidBody() {
            let rigidBody = new ƒ.ComponentRigidbody();
            rigidBody.effectGravity = 10;
            rigidBody.mass = this.mass;
            rigidBody.typeCollider = ƒ.COLLIDER_TYPE.CUBE;
            rigidBody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
            rigidBody.effectRotation = new ƒ.Vector3(0, 0, 0);
            rigidBody.mtxPivot.scale(new ƒ.Vector3(0.5, 0.5, 1));
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
        let charData = Game.config.character[char.instanceId - 1];
        moveLeft =
            ƒ.KEYBOARD_CODE[charData.moveLeft] || ƒ.KEYBOARD_CODE.A;
        moveRight =
            ƒ.KEYBOARD_CODE[charData.moveRight] || ƒ.KEYBOARD_CODE.D;
        attack =
            ƒ.KEYBOARD_CODE[charData.attack] || ƒ.KEYBOARD_CODE.SPACE;
        jump = ƒ.KEYBOARD_CODE[charData.jump] || ƒ.KEYBOARD_CODE.W;
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
    Game.characters = [];
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        Game.viewport = _event.detail;
        // viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
        await hndLoad(_event);
        Game.audioBackground.play(true);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        Game.characters.forEach((x) => {
            Game.characterControlls(x);
        });
        // characters[0].getComponent(ƒ.ComponentRigidbody).checkCollisionEvents();
        Game.viewport.draw();
        ƒ.AudioManager.default.update();
    }
    async function hndLoad(_event) {
        Game.config = await (await fetch("Script/Source/config.json")).json();
        Game.config.character.forEach(async (char, i) => {
            Game.characters.push(new Game.Character(char.name, char.lookDirection, char.startX, char.startY, char.mass));
            await Game.buildAllAnimationsForCharacter(Game.characters[i]);
            char.lookDirection === "left"
                ? Game.characters[i].setIdleAnimation(true)
                : Game.characters[i].setIdleAnimation();
        });
        cmpCamera = Game.viewport.camera;
        cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 4, 15));
        cmpCamera.mtxPivot.rotateY(180);
        Game.gameState = new Game.Stats();
        Game.createSounds();
        manageBorderCollision();
    }
    function manageBorderCollision() {
        let borders = Game.viewport
            .getBranch()
            .getChildrenByName("Ground")[0]
            .getChildrenByName("mainland")[0]
            .getChildren();
        borders.forEach((b) => {
            b.getComponent(ƒ.ComponentRigidbody).addEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, (_event) => {
                const collisionPartner = _event.cmpRigidbody.node;
                if (collisionPartner instanceof Game.Bomb) {
                    console.error("Collison with " + b.name);
                    let main = b.getParent().getParent().getParent();
                    let light = main.getComponent(ƒ.ComponentLight).light;
                    light.color.r = Math.random();
                    light.color.g = Math.random();
                    light.color.b = Math.random();
                    light.color.a = Math.random();
                }
            });
        });
    }
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Game);
    class RotateRigidBody extends ƒ.ComponentScript {
        static iSubclass = ƒ.Component.registerSubclass(RotateRigidBody);
        rotSpeed = 100;
        constructor() {
            super();
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
        }
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
        update = (_event) => {
            this.node
                .getComponent(ƒ.ComponentRigidbody)
                .rotateBody(new ƒ.Vector3(0, 0, (100 * ƒ.Loop.timeFrameGame) / 1000));
        };
    }
    Game.RotateRigidBody = RotateRigidBody;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    var ƒui = FudgeUserInterface;
    class Stats extends ƒ.Mutable {
        reduceMutator(_mutator) {
            /**/
        }
        // test: string = "abc";
        lifeChar = [];
        testArray = [];
        // lifeChar1: number;
        controller;
        constructor() {
            super();
            this.fillLife();
            this.controller = new ƒui.Controller(this, document.querySelector("#vui"));
            // this.lifeChar1 = this.lifeChar[0].life;
            // this.lifeChar[0].life = 50;
            this.refresh();
            // this.createInputs();
        }
        fillLife() {
            this.lifeChar = [];
            this.testArray = [];
            Game.characters.forEach((c) => {
                this.lifeChar.push({ char: c.name, life: c.life });
            });
            this.lifeChar.forEach((input) => {
                this.testArray.push(input.life.toString());
            });
        }
        refresh() {
            const myNode = document.getElementById("vui");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
            this.fillLife();
            const x = ƒui.Generator.createInterfaceFromMutator(this.testArray);
            for (let i in x.children) {
                if (Number(i) <= Game.characters.length)
                    x.children[i]?.setAttribute("label", Game.characters[i].name);
            }
            myNode.appendChild(x);
        }
    }
    Game.Stats = Stats;
})(Game || (Game = {}));
//# sourceMappingURL=Script.js.map