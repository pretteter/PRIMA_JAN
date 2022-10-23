namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  export let Mario: ƒ.Node;
  export let spriteNode: ƒAid.NodeSprite;
  export let walkspeed: number = 2;
  export let walkDirechtion: "right" | "left" = "right";
  export let ySpeed: number = 0.01;

  let gravity: number = 0.1;

  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );
  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    let branch: ƒ.Node = viewport.getBranch();
    Mario = branch.getChildrenByName("Mario")[0];
    Mario.addChild(await createNewSpriteNode("forward"));

    await buildAllAnimations();
    stetIdleAnimation();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();
    // ƒ.Loop.timeFrameGame
  }

  async function update(_event: Event): Promise<void> {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    // ƒ.AudioManager.default.update();
    setGravity();
    marioMovement();
  }

  function setGravity() {
    let deltaTime: number = ƒ.Loop.timeFrameGame / 1000;
    ySpeed -= gravity * deltaTime;
    Mario.mtxLocal.translateY(ySpeed);

    let pos: ƒ.Vector3 = Mario.mtxLocal.translation;
    if (pos.y + ySpeed > 0) Mario.mtxLocal.translateY(ySpeed);
    else {
      ySpeed = 0;
      pos.y = 0;
      Mario.mtxLocal.translation = pos;
    }
  }

  async function createNewSpriteNode(
    frameDirection: "back" | "forward"
  ): Promise<ƒAid.NodeSprite> {
    spriteNode = new ƒAid.NodeSprite("Sprite");
    spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    spriteNode.setFrameDirection(
      frameDirection === "back" ? -1 : frameDirection === "forward" ? 1 : 1
    );
    spriteNode.mtxLocal.translateY(0.5);
    return spriteNode;
  }
}
