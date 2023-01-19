namespace Game {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Rocket extends ƒ.Node {
    forceStart: number;
    mass: number;

    static amountOfInstances: number = 0;
    instanceId: number;

    public constructor(forceStart: number, mass: number) {
      super("Rocket_" + Rocket.amountOfInstances.toString());

      this.forceStart = forceStart;
      this.mass = mass;
      this.initRocket();
    }

    private initRocket() {
      this.instanceId = ++Rocket.amountOfInstances;

      this.addComponent(new ƒ.ComponentTransform());
      this.addRidgetBody();
      this.addChild(this.createNewSpriteNode("right"));
    }

    launch(character: Character, direction: "right" | "left") {
      this.placeRocket(character);
      this.getComponent(ƒ.ComponentRigidbody).applyForce(
        new ƒ.Vector3(
          direction === "right" ? this.forceStart / 2 : -this.forceStart / 2,
          this.forceStart,
          0
        )
      );
    }

    private placeRocket(character: Character) {

      this.mtxLocal.translate(
        new ƒ.Vector3(
          character.getComponent(ƒ.ComponentRigidbody).getPosition().x,
          character.getComponent(ƒ.ComponentRigidbody).getPosition().y + 2,
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
      // spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
      spriteNode.setFrameDirection(
        frameDirection === "left" ? -1 : frameDirection === "right" ? 1 : 1
      );
      return spriteNode;
    }

    private addRidgetBody() {
      let ridgetBody = new ƒ.ComponentRigidbody();
      ridgetBody.initialization = ƒ.BODY_INIT.TO_PIVOT;
      ridgetBody.effectGravity = 10;
      ridgetBody.mass = this.mass;
      ridgetBody.typeCollider = ƒ.COLLIDER_TYPE.CUBE;
      ridgetBody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
      ridgetBody.effectRotation = new ƒ.Vector3(0, 0, 0);
      // ridgetBody.setScaling(new ƒ.Vector3(0.5,0.5,0.5))
      ridgetBody.initialize();
      this.addComponent(ridgetBody);
    }
  }
}
