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
        static amountOfInstances: number;
        instanceId: number;
        constructor(lookDirection: "right" | "left", coordinateX: number, coordinateY: number);
        initAvatar(lookDirection: ConstructorParameters<typeof Character>[0], coordinateX: number, coordinateY: number): Promise<void>;
        private createNewSpriteNode;
        move(direction: ConstructorParameters<typeof Character>[0]): void;
        setIdleAnimation(): void;
        turnCharacter(): void;
    }
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
