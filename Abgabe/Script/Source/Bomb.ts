namespace Game {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  export class Bomb extends ƒ.Node {
    forceStart: number;
    mass: number;
    animationIdle: ƒAid.SpriteSheetAnimation;
    animationExplode: ƒAid.SpriteSheetAnimation;
    animationCurrent: ƒAid.SpriteSheetAnimation;

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
      try {
        this.manageCollision(character);
      } catch (e) {
        console.error(e);
      }
    }

    private placeBomb(character: Character) {
      this.mtxLocal.translate(
        new ƒ.Vector3(
          character.getComponent(ƒ.ComponentRigidbody).getPosition().x,
          character.getComponent(ƒ.ComponentRigidbody).getPosition().y + 1,
          0
        )
      );
      viewport.getBranch().addChild(this);
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
      this.animationCurrent = this.animationIdle;
    }

    removeBomb(char: Character) {
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
      this.animationCurrent !== this.animationExplode
        ? sprite.setAnimation(this.animationExplode)
        : "";

      // if (sprite.getCurrentFrame >= 2) {
      //   let graph: ƒ.Node = viewport.getBranch();
      //   graph.removeChild(this);
      //   sprite.stopAnimation();
      // } else {
      //   this.removeBomb();
      // }

      setTimeout(() => {
        this.removeNode(this);
        char.hasRocket = false;
      }, 250);
    }

    manageCollision(char: Character) {
      this.getComponent(ƒ.ComponentRigidbody).addEventListener(
        ƒ.EVENT_PHYSICS.COLLISION_ENTER,
        (_event: any) => {
          const collisionPartner = _event.cmpRigidbody.node as ƒ.Node;

          if (collisionPartner.name === "mainland") {
            console.error("Collison with mainland");
          }
          if (
            collisionPartner.name === "left_border" ||
            collisionPartner.name === "right_border"
          ) {
            console.error("Collison with border");
            let parent = collisionPartner.getParent();
            let coat = parent.getComponent(ƒ.ComponentMaterial).material
              .coat as any;
            coat["color"] = {
              r: Math.random(),
              g: Math.random(),
              b: Math.random(),
              a: 1,
            };
          }
          if (collisionPartner instanceof Character) {
            console.error("Collison with char");
            // gameState.testArray[collisionPartner.instanceId] = (
            //   Number(gameState.testArray[collisionPartner.instanceId]) - 25
            // ).toString();
            collisionPartner.life -= 25;
            if (collisionPartner.life <= 0) {
              this.removeNode(collisionPartner);
            }
            gameState.refresh();
          }
          if (collisionPartner instanceof Character) {
            console.error("Collison with bomb");
          }
          this.removeBomb(char);
          // char.hasRocket = false;
        }
      );
    }

    removeNode(node: ƒ.Node) {
      const sprite = this.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
      let graph: ƒ.Node = viewport.getBranch();
      graph.removeChild(node);
      sprite.stopAnimation();
      if (node instanceof Character) {
        characters.forEach((c, i) => {
          if (c === node) characters.splice(i, 1);
        });
      }
      viewport.draw();
    }
  }
}
