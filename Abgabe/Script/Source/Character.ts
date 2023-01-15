namespace Game {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Character extends ƒ.Node {
    //     audioJump: ƒ.Audio;
    //     cmpAudio: ƒ.ComponentAudio;
    moveSpeed: number = 2;

    lookDirection: ConstructorParameters<typeof Character>[0];
    animationCurrent: ƒAid.SpriteSheetAnimation;
    animationMove: ƒAid.SpriteSheetAnimation;
    animationIdle: ƒAid.SpriteSheetAnimation;
    //     animationJump: ƒAid.SpriteSheetAnimation;
    //     animationFall: ƒAid.SpriteSheetAnimation;
    // animationRun: ƒAid.SpriteSheetAnimation;

    static amountOfInstances: number = 0;
    instanceId: number;

    public constructor(
      lookDirection: "right" | "left",
      coordinateX: number,
      coordinateY: number
    ) {
      super("Character");
      this.lookDirection = lookDirection;
      this.initAvatar(lookDirection, coordinateX, coordinateY);
    }

    async initAvatar(
      lookDirection: ConstructorParameters<typeof Character>[0],
      coordinateX: number,
      coordinateY: number
    ) {
      viewport
        .getBranch()
        .addChild(
          new ƒ.Node("character_" + Character.amountOfInstances.toString())
        );
      this.instanceId = ++Character.amountOfInstances;

      this.addComponent(new ƒ.ComponentTransform());
      this.addRidgetBody();
      this.mtxLocal.translate(new ƒ.Vector3(coordinateX,coordinateY,0))
      this.mtxLocal.scale(new ƒ.Vector3(2,2,2))
      this.addChild(this.createNewSpriteNode(this.lookDirection));
      await buildAllAnimationsForCharacter(this);
      this.setIdleAnimation();

      lookDirection === "left" ? this.turnCharacter() : "";
      this.lookDirection = lookDirection;

      let graph: ƒ.Node = viewport.getBranch();
      graph.addChild(this);
    }

    private createNewSpriteNode(
      frameDirection: ConstructorParameters<typeof Character>[0]
    ): ƒAid.NodeSprite {
      let spriteNode = new ƒAid.NodeSprite("Sprite");
      // spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
      spriteNode.setFrameDirection(
        frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1
      );
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

    move(direction: ConstructorParameters<typeof Character>[0]) {
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;

      const anmToUse = this.animationMove;
      this.animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
      this.animationCurrent = anmToUse;

      this.lookDirection !== direction ? this.turnCharacter() : "";
      this.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(
        (ƒ.Loop.timeFrameGame * this.moveSpeed) / 1000
      );
    }

    setIdleAnimation() {
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
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
}
