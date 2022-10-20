namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let Mario: ƒ.Node;
  let spriteNode: ƒAid.NodeSprite;
  let walkspeed: number = 1;

  let walkRightAnimation: ƒAid.SpriteSheetAnimation;
  let idleAnimation: ƒAid.SpriteSheetAnimation;

  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );
  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    let branch: ƒ.Node = viewport.getBranch();
    Mario = branch.getChildrenByName("Mario")[0];
    walkRightAnimation = await buildWalkRightAnimation();
    idleAnimation = await buildIdleAnimation();
    Mario.addChild(await createNewSpriteNode("forward"));
    stetIdleAnimation();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();
    // ƒ.Loop.timeFrameGame
  }

  async function update(_event: Event): Promise<void> {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
      setWalkRight();
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
        ? setWalkLeft(true)
        : setWalkLeft();
    } else {
      stetIdleAnimation();
    }
  }

  function setWalkRight(sprint?: boolean) {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    sprite.setAnimation(walkRightAnimation);
    Mario.mtxLocal.translateX(
      (ƒ.Loop.timeFrameGame * walkspeed + (sprint ? 10 : 0)) / 1000
    );
  }

  function setWalkLeft(sprint?: boolean) {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    sprite.setAnimation(walkRightAnimation);
    Mario.mtxLocal.translateX(
      (-ƒ.Loop.timeFrameGame * walkspeed + (sprint ? 10 : 0)) / 1000
    );
  }

  function stetIdleAnimation() {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    sprite.setAnimation(idleAnimation);
  }

  async function createNewSpriteNode(
    frameDirection: "back" | "forward"
  ): Promise<ƒAid.NodeSprite> {
    // let root: ƒ.Node = new ƒ.Node("root");

    spriteNode = new ƒAid.NodeSprite("Sprite");
    spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    // MarioSpriteNode.setAnimation(await buildWalkRightAnimation());
    spriteNode.setFrameDirection(
      frameDirection === "back" ? -1 : frameDirection === "forward" ? 1 : 1
    );
    spriteNode.mtxLocal.translateY(0.5);
    // MarioSpriteNode.framerate = 30;

    return spriteNode;
  }

  async function buildWalkRightAnimation(): Promise<ƒAid.SpriteSheetAnimation> {
    let coat: ƒ.CoatTextured = await loadTextureFromSpriteSheet(
      "assets/Mario/MarioWalk.png"
    );
    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(
      "walkRight",
      coat
    );
    animation.generateByGrid(
      ƒ.Rectangle.GET(247, 1, 15, 28),
      3,
      30,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(14)
    );
    return animation;
  }

  async function buildIdleAnimation(): Promise<ƒAid.SpriteSheetAnimation> {
    let coat: ƒ.CoatTextured = await loadTextureFromSpriteSheet(
      "assets/Mario/MarioWalk.png"
    );
    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(
      "idle",
      coat
    );
    animation.generateByGrid(
      ƒ.Rectangle.GET(247, 1, 15, 28),
      1,
      30,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(0)
    );
    return animation;
  }

  async function loadTextureFromSpriteSheet(
    pathSpriteSheet: string
  ): Promise<ƒ.CoatTextured> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load(pathSpriteSheet);
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
    return coat;
  }
}
