declare namespace Game {
    function buildAllAnimations(character: Character): Promise<void>;
}
declare namespace Game {
    import ƒAid = FudgeAid;
    class Character extends ƒAid.NodeSprite {
        walkspeed: number;
        lookDirection: ConstructorParameters<typeof Character>[0];
        animationCurrent: ƒAid.SpriteSheetAnimation;
        animationMove: ƒAid.SpriteSheetAnimation;
        animationIdle: ƒAid.SpriteSheetAnimation;
        static amountOfInstances: number;
        instanceId: number;
        constructor(lookDirection: "right" | "left");
        initAvatar(lookDirection: ConstructorParameters<typeof Character>[0]): Promise<void>;
        private createNewSpriteNode;
        move(direction: ConstructorParameters<typeof Character>[0]): void;
        stetIdleAnimation(): void;
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
