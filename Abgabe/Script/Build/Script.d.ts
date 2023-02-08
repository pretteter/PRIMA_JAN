declare namespace Game {
    function buildAllAnimationsForCharacter(character: Character): Promise<void>;
    function buildBombAnimation(bomb: Bomb): Promise<void>;
}
declare namespace Game {
    import ƒ = FudgeCore;
    let audioShoot: ƒ.ComponentAudio;
    let audioBackground: ƒ.ComponentAudio;
    function createSounds(): void;
}
declare namespace Game {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class Bomb extends ƒ.Node {
        forceStart: number;
        mass: number;
        animationIdle: ƒAid.SpriteSheetAnimation;
        animationExplode: ƒAid.SpriteSheetAnimation;
        animationCurrent: ƒAid.SpriteSheetAnimation;
        static amountOfInstances: number;
        instanceId: number;
        constructor(forceStart: number, mass: number);
        private initBomb;
        launch(character: Character, direction: "right" | "left"): void;
        private placeBomb;
        private createNewSpriteNode;
        private addRidgetBody;
        setIdleAnimation(): void;
        removeBomb(char: Character): void;
        manageCollision(char: Character): void;
        removeNode(node: ƒ.Node): void;
        private addLight;
    }
}
declare namespace Game {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class Character extends ƒ.Node {
        lookDirection: ConstructorParameters<typeof Character>[1];
        animationCurrent: ƒAid.SpriteSheetAnimation;
        animationMove: ƒAid.SpriteSheetAnimation;
        animationIdle: ƒAid.SpriteSheetAnimation;
        hasRocket: boolean;
        life: number;
        mass: number;
        static amountOfInstances: number;
        instanceId: number;
        constructor(name: string, lookDirection: "right" | "left", coordinateX: number, coordinateY: number, mass: number);
        initAvatar(lookDirection: typeof this.lookDirection, coordinateX: number, coordinateY: number, mass: number): void;
        move(direction: typeof this.lookDirection): void;
        jump(): void;
        attack(): void;
        setIdleAnimation(otherDirectionThanSprite?: boolean): void;
        turnCharacter(otherDirectionThanSprite?: boolean): void;
        private createNewSpriteNode;
        private addRigidBody;
    }
}
declare namespace Game {
    function characterControlls(char: Character): void;
}
declare namespace Game {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Game {
    interface iConfig {
        character: iCharacter[];
    }
    interface iCharacter {
        name: string;
        lookDirection: "right" | "left";
        moveLeft: ƒ.KEYBOARD_CODE;
        moveRight: ƒ.KEYBOARD_CODE;
        attack: ƒ.KEYBOARD_CODE;
        jump: ƒ.KEYBOARD_CODE;
        startX: number;
        startY: number;
        mass: number;
    }
}
declare namespace Game {
    import ƒ = FudgeCore;
    let viewport: ƒ.Viewport;
    let config: iConfig;
    let gameState: Stats;
    let characters: Character[];
}
declare namespace Game {
    import ƒ = FudgeCore;
    class RotateRigidBody extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        rotSpeed: number;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
    }
}
declare namespace Game {
    import ƒ = FudgeCore;
    import ƒui = FudgeUserInterface;
    class Stats extends ƒ.Mutable {
        protected reduceMutator(_mutator: ƒ.Mutator): void;
        lifeChar: {
            char: Character["name"];
            life: Character["life"];
        }[];
        testArray: string[];
        controller: ƒui.Controller;
        constructor();
        fillLife(): void;
        refresh(): void;
    }
}
