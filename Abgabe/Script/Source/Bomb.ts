namespace Game {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Bomb extends ƒ.Node {
    forceStart: number;
    mass: number;
    animationIdle: ƒAid.SpriteSheetAnimation;
    animationExplode: ƒAid.SpriteSheetAnimation;

    static amountOfInstances: number = 0;
    instanceId: number;

    public constructor(forceStart: number, mass: number) {
      super("Bomb_" + Bomb.amountOfInstances.toString());

      this.forceStart = forceStart;
      this.mass = mass;
      this.initBomb();
    }

    private async initBomb() {
      this.instanceId = ++Bomb.amountOfInstances;

      this.addComponent(new ƒ.ComponentTransform());
      this.addRidgetBody();
      this.addChild(this.createNewSpriteNode("right"));
      await buildBombAnimation(this);
      this.setIdleAnimation();
    }

    launch(character: Character, direction: "right" | "left") {
      audioShoot.play(true);
      this.placeBomb(character);
      this.getComponent(ƒ.ComponentRigidbody).applyForce(
        new ƒ.Vector3(
          direction === "right" ? this.forceStart / 2 : -this.forceStart / 2,
          this.forceStart,
          0
        )
      );
    }

    private placeBomb(character: Character) {
      this.mtxLocal.translate(
        new ƒ.Vector3(
          character.getComponent(ƒ.ComponentRigidbody).getPosition().x,
          character.getComponent(ƒ.ComponentRigidbody).getPosition().y + 0.6,
          0
        )
      );

      let graph: ƒ.Node = viewport.getBranch();
      graph.addChild(this);
    }

    private createNewSpriteNode(
      frameDirection: ConstructorParameters<typeof Character>[0]
    ): ƒAid.NodeSprite {
      let spriteNode = new ƒAid.NodeSprite("Sprite");
      spriteNode.addComponent(new ƒ.ComponentTransform());
      spriteNode.setFrameDirection(
        frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1
      );
      spriteNode.mtxLocal.translateY(-0.5);
      spriteNode.activate(false);
      return spriteNode;
    }

    private addRidgetBody() {
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
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
      sprite.setAnimation(this.animationIdle);
      sprite.activate(true);
      // this.animationCurrent = this.animationIdle;
    }

    removeBomb() {
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
      sprite.setAnimation(this.animationExplode);

      setTimeout(() => {
        let graph: ƒ.Node = viewport.getBranch();
        sprite.stopAnimation();
        graph.removeChild(this);
      }, 250);
    }
  }
}
