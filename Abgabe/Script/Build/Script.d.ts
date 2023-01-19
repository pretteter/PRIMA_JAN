declare namespace Game {
    function buildAllAnimationsForCharacter(character: Character): Promise<void>;
}
declare namespace Game {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class Character extends ƒ.Node {
        moveSpeed: number;
        lookDirection: ConstructorParameters<typeof Character>[0];
        animationCurrent: ƒAid.SpriteSheetAnimation;
        animationMove: ƒAid.SpriteSheetAnimation;
        animationIdle: ƒAid.SpriteSheetAnimation;
        hasRocket: boolean;
        life: number;
        static amountOfInstances: number;
        instanceId: number;
        constructor(lookDirection: "right" | "left", coordinateX: number, coordinateY: number);
        initAvatar(lookDirection: ConstructorParameters<typeof Character>[0], coordinateX: number, coordinateY: number): Promise<void>;
        move(direction: ConstructorParameters<typeof Character>[0]): void;
        jump(): void;
        attack(): void;
        removeRocket(rocket: Rocket): void;
        setIdleAnimation(): void;
        turnCharacter(): void;
        private createNewSpriteNode;
        private addRidgetBody;
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
    import ƒ = FudgeCore;
    let viewport: ƒ.Viewport;
}
declare namespace Game {
    import ƒ = FudgeCore;
    class Rocket extends ƒ.Node {
        forceStart: number;
        mass: number;
        static amountOfInstances: number;
        instanceId: number;
        constructor(forceStart: number, mass: number);
        private initRocket;
        launch(character: Character, direction: "right" | "left"): void;
        private placeRocket;
        private createNewSpriteNode;
        private addRidgetBody;
    }
}
