namespace Game {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Character extends ƒ.Node {
    //     audioJump: ƒ.Audio;
    //     cmpAudio: ƒ.ComponentAudio;
    // moveSpeed: number = 2;

    lookDirection: ConstructorParameters<typeof Character>[0];
    animationCurrent: ƒAid.SpriteSheetAnimation;
    animationMove: ƒAid.SpriteSheetAnimation;
    animationIdle: ƒAid.SpriteSheetAnimation;
    hasRocket: boolean;
    life: number = 100;
    mass: number;
    //     animationJump: ƒAid.SpriteSheetAnimation;
    //     animationFall: ƒAid.SpriteSheetAnimation;
    // animationRun: ƒAid.SpriteSheetAnimation;

    static amountOfInstances: number = 0;
    instanceId: number;

    public constructor(
      lookDirection: "right" | "left",
      coordinateX: number,
      coordinateY: number,
      mass: number
    ) {
      super("Character_" + (Character.amountOfInstances + 1).toString());
      // this.lookDirection = lookDirection;
      this.initAvatar(lookDirection, coordinateX, coordinateY, mass);
    }

    async initAvatar(
      lookDirection: ConstructorParameters<typeof Character>[0],
      coordinateX: number,
      coordinateY: number,
      mass: number
    ) {
      this.instanceId = ++Character.amountOfInstances;
      this.mass = mass;
      this.lookDirection = lookDirection;
      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translate(new ƒ.Vector3(coordinateX, coordinateY, 0));
      this.addChild(this.createNewSpriteNode(this.lookDirection));
      this.addRigidBody();

      Character.amountOfInstances % 4  === 0
        ? this.addComponent(new RotateSprite())
        : "";

      let graph: ƒ.Node = viewport.getBranch();
      graph.addChild(this);
    }

    move(direction: ConstructorParameters<typeof Character>[0]) {
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
      const anmToUse = this.animationMove;
      this.animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
      this.animationCurrent = anmToUse;
      this.lookDirection !== direction ? this.turnCharacter() : "";

      if (
        this.getComponent(ƒ.ComponentRigidbody).getVelocity().x >= -10 &&
        this.getComponent(ƒ.ComponentRigidbody).getVelocity().x <= 10
      ) {
        this.getComponent(ƒ.ComponentRigidbody).applyForce(
          new ƒ.Vector3(
            direction === "right" ? this.mass * 50 : -this.mass * 50,
            0,
            0
          )
        );
      }
    }

    jump() {
      if (
        this.getComponent(ƒ.ComponentRigidbody).getVelocity().y <= 0.1 &&
        this.getComponent(ƒ.ComponentRigidbody).getVelocity().y >= -0.1
      )
        this.getComponent(ƒ.ComponentRigidbody).applyForce(
          new ƒ.Vector3(0, this.mass * 1600, 0)
        );
    }

    attack() {
      if (!this.hasRocket) {
        const rocket: Bomb = new Bomb(80000, 50);
        rocket.launch(this, this.lookDirection);
        this.hasRocket = true;
        setTimeout(() => {
          rocket.removeBomb();
          this.hasRocket = false;
        }, 1200);
      }
    }

    setIdleAnimation(otherDirectionThanSprite?: boolean) {
      if (this.animationCurrent === this.animationIdle) {
        return;
      }
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
      sprite.setAnimation(this.animationIdle);
      sprite.activate(true);
      this.animationCurrent = this.animationIdle;

      if (otherDirectionThanSprite) {
        this.turnCharacter(otherDirectionThanSprite);
      }
    }

    turnCharacter(otherDirectionThanSprite?: boolean) {
      this.getComponent(ƒ.ComponentRigidbody).rotateBody(
        new ƒ.Vector3(0, 180, 0)
      );
      if (otherDirectionThanSprite) return;
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
      spriteNode.addComponent(new ƒ.ComponentTransform());
      spriteNode.setFrameDirection(
        frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1
      );
      spriteNode.mtxLocal.translateY(-0.25);
      spriteNode.activate(false);
      return spriteNode;
    }

    private addRigidBody() {
      let rigidBody = new ƒ.ComponentRigidbody();
      rigidBody.effectGravity = 10;
      rigidBody.mass = this.mass;
      rigidBody.typeCollider = ƒ.COLLIDER_TYPE.SPHERE;
      rigidBody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
      rigidBody.effectRotation = new ƒ.Vector3(0, 0, 0);
      rigidBody.mtxPivot.scale(new ƒ.Vector3(0.5, 0.5, 1));
      rigidBody.initialize();
      this.addComponent(rigidBody);
    }
  }
}
