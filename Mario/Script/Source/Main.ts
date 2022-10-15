namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let Mario: ƒ.Node;
  let MarioSpriteNode: ƒAid.NodeSprite;

  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );
  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    let branch: ƒ.Node = viewport.getBranch();
    Mario = branch.getChildrenByName("Mario")[0];

    let MarioSpriteNode = await walkRight();
    Mario.addChild(MarioSpriteNode);
    Mario.getComponent(ƒ.ComponentMaterial).activate(false);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();

    Mario.mtxLocal.translateX(0.02);
  }

  async function walkRight(): Promise<ƒAid.NodeSprite> {
    // let root: ƒ.Node = new ƒ.Node("root");

    let coat: ƒ.CoatTextured = await loadSpriteSheet("assets/Mario/MarioWalk.png");
    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(
      "walkRight",
      coat
    );
    animation.generateByGrid(
      ƒ.Rectangle.GET(247, 1, 15, 28),
      3,
      30,
      ƒ.ORIGIN2D.TOPCENTER,
      ƒ.Vector2.X(14)
    );

    MarioSpriteNode = new ƒAid.NodeSprite("Sprite");
    MarioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    MarioSpriteNode.setAnimation(animation);
    MarioSpriteNode.setFrameDirection(1);
    MarioSpriteNode.mtxLocal.translateY(1.4);
    // MarioSpriteNode.framerate = 30;

    return MarioSpriteNode;
  }

  async function loadSpriteSheet(
    pathSpriteSheet: string
  ): Promise<ƒ.CoatTextured> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load(pathSpriteSheet);
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
    return coat;
  }
}
