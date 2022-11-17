declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
        test: (_event: Event) => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    let Mario: ƒ.Node;
    let spriteNode: ƒAid.NodeSprite;
    let walkspeed: number;
    let walkDirechtion: "right" | "left";
    let ySpeed: number;
    let collision: boolean;
    let cmpAudio: ƒ.ComponentAudio;
    function checkCollision(): void;
}
declare namespace Script {
    import ƒAid = FudgeAid;
    class Avatar extends ƒAid.NodeSprite {
    }
}
declare namespace Script {
    let animationCurrent: ƒAid.SpriteSheetAnimation;
    let animationWalk: ƒAid.SpriteSheetAnimation;
    let animationIdle: ƒAid.SpriteSheetAnimation;
    let animationJump: ƒAid.SpriteSheetAnimation;
    let animationFall: ƒAid.SpriteSheetAnimation;
    let animationRun: ƒAid.SpriteSheetAnimation;
    function stetIdleAnimation(): void;
    function turnMario(): void;
    function buildAllAnimations(): Promise<void>;
}
declare namespace Script {
    function marioControls(): void;
}
