namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Avatar extends ƒAid.NodeSprite {
    //     audioJump: ƒ.Audio;
    //     cmpAudio: ƒ.ComponentAudio;
    //     walkspeed: number = 2;
    //     walkDirechtion: "right" | "left" = "right";
    //     animationCurrent: ƒAid.SpriteSheetAnimation;
    //     animationWalk: ƒAid.SpriteSheetAnimation;
    //     animationIdle: ƒAid.SpriteSheetAnimation;
    //     animationJump: ƒAid.SpriteSheetAnimation;
    //     animationFall: ƒAid.SpriteSheetAnimation;
    //     animationRun: ƒAid.SpriteSheetAnimation;
    //     public constructor() {
    //       super("Avatar");
    //       this.addChild(createNewSpriteNode("forward"));
    //     }
    //   }
    // }
    // function initAvatar() {
    // //   this.addChild(createNewSpriteNode("forward"));
    // }
    // function createNewSpriteNode(
    //   frameDirection: "back" | "forward"
    // ): ƒAid.NodeSprite {
    //   let spriteNode = new ƒAid.NodeSprite("Sprite");
    //   spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    //   spriteNode.setFrameDirection(
    //     frameDirection === "back" ? -1 : frameDirection === "forward" ? 1 : 1
    //   );
    //   spriteNode.mtxLocal.translateY(0.5);
    //   return spriteNode;
    // }
    // function setJumpSound() {
    //   this.audioJump = new ƒ.Audio("audio/jump.mp3");
    //   this.cmpAudio = new ƒ.ComponentAudio(this.audioJump, false, false);
    //   this.cmpAudio.connect(true);
    //   this.cmpAudio.volume = 0.7;
    // }
    // function walk(direction: "right" | "left", sprint?: boolean) {
    //   const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    //   if (collision) {
    //     const anmToUse = sprint ? this.animationRun : this.animationWalk;
    //     this.animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
    //     this.animationCurrent = anmToUse;
    //   }
    //   walkDirechtion !== direction ? turnMario() : "";
    //   this.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(
    //     (ƒ.Loop.timeFrameGame * this.walkspeed * (sprint ? 2 : 1)) / 1000
    //   );
    //   function stetIdleAnimation() {
    //     const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    //     sprite.setAnimation(this.animationIdle);
    //     this.animationCurrent = this.animationIdle;
    //   }
    //    function turnMario() {
    //     Mario.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
    //     this.walkDirechtion === "right"
    //       ? (this.walkDirechtion = "left")
    //       : this.walkDirechtion === "left"
    //       ? (this.walkDirechtion = "right")
    //       : "";
    //   }
    //     function buildAllAnimations() {
    //     await buildWalkAnimation();
    //     await buildIdleAnimation();
    //     await buildJumpAnimation();
    //     await buildFallAnimation();
    //     await buildRunAnimation();
    //   }
  }
}
