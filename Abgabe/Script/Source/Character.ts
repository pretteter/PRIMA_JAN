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
    hasRocket: boolean;
    life: number = 100;
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
      super("Character_" + Character.amountOfInstances.toString());
      this.lookDirection = lookDirection;
      this.initAvatar(lookDirection, coordinateX, coordinateY);
    }

    async initAvatar(
      lookDirection: ConstructorParameters<typeof Character>[0],
      coordinateX: number,
      coordinateY: number
    ) {
      // viewport
      //   .getBranch()
      //   .addChild(
      //     new ƒ.Node(null)
      //   );
      this.instanceId = ++Character.amountOfInstances;

      this.addComponent(new ƒ.ComponentTransform());
      this.addRidgetBody();
      lookDirection === "left" ? this.turnCharacter() : "";

      this.mtxLocal.translate(new ƒ.Vector3(coordinateX, coordinateY, 0));
      this.mtxLocal.scale(new ƒ.Vector3(1, 1, 1));
      this.addChild(this.createNewSpriteNode(this.lookDirection));
      await buildAllAnimationsForCharacter(this);
      // this.setIdleAnimation();

      this.lookDirection = lookDirection;

      let graph: ƒ.Node = viewport.getBranch();
      graph.addChild(this);
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
      // this.getComponent(ƒ.ComponentRigidbody).setVelocity(
      //   new ƒ.Vector3(direction === "right" ? 10 : -10, 0, 0)
      // );

      if (
        this.getComponent(ƒ.ComponentRigidbody).getVelocity().x >= -10 &&
        this.getComponent(ƒ.ComponentRigidbody).getVelocity().x <= 10
      ) {
        this.getComponent(ƒ.ComponentRigidbody).applyForce(
          new ƒ.Vector3(direction === "right" ? 50000 : -50000, 0, 0)
        );
      }
    }

    jump() {
      console.log(this.getComponent(ƒ.ComponentRigidbody).getVelocity().y);

      if (
        this.getComponent(ƒ.ComponentRigidbody).getVelocity().y <= 0.1 &&
        this.getComponent(ƒ.ComponentRigidbody).getVelocity().y >= -0.1
      )
        this.getComponent(ƒ.ComponentRigidbody).applyForce(
          new ƒ.Vector3(
            0,
            this.getComponent(ƒ.ComponentRigidbody).mass * 1600,
            0
          )
        );
    }

    attack() {
      if (!this.hasRocket) {
        const rocket: Rocket = new Rocket(
          this.getComponent(ƒ.ComponentRigidbody).mass * 70,
          50
        );
        rocket.launch(this, this.lookDirection);
        this.hasRocket = true;
        setTimeout(() => {
          this.removeRocket(rocket);
          this.hasRocket = false;
        }, 1200);
      }
    }

    removeRocket(rocket: Rocket) {
      let graph: ƒ.Node = viewport.getBranch();
      graph.removeChild(rocket);
    }

    setIdleAnimation() {
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
      sprite.setAnimation(this.animationIdle);
      this.animationCurrent = this.animationIdle;
    }

    turnCharacter() {
      this.getComponent(ƒ.ComponentRigidbody).rotateBody(
        new ƒ.Vector3(0, 180, 0)
      );

      this.lookDirection === "right"
        ? (this.lookDirection = "left")
        : this.lookDirection === "left"
        ? (this.lookDirection = "right")
        : "";
    }

    private createNewSpriteNode(
      frameDirection: ConstructorParameters<typeof Character>[0]
    ): ƒAid.NodeSprite {
      let spriteNode = new ƒAid.NodeSprite("Sprite");
      // spriteNode.addComponent(new ƒ.ComponentTransform);
      spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
      spriteNode.setFrameDirection(
        frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1
      );
      spriteNode.mtxLocal.translateY(-0.5);
      return spriteNode;
    }

    private addRidgetBody() {
      let ridgetBody = new ƒ.ComponentRigidbody();
      ridgetBody.initialization = ƒ.BODY_INIT.TO_MESH;
      ridgetBody.effectGravity = 10;
      ridgetBody.mass = 1000;
      ridgetBody.typeCollider = ƒ.COLLIDER_TYPE.CUBE;
      ridgetBody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
      ridgetBody.effectRotation = new ƒ.Vector3(0, 0, 0);
      // ridgetBody.setScaling(new ƒ.Vector3(0.5,0.5,0.5))
      ridgetBody.initialize();
      this.addComponent(ridgetBody);
    }
  }
}
