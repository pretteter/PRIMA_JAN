namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let Mario: ƒ.Node;
  let spriteNode: ƒAid.NodeSprite;
  let walkspeed: number = 2;
  let walkDirechtion: "right" | "left" = "right";

  let animationCurrent: ƒAid.SpriteSheetAnimation;
  let animationWalk: ƒAid.SpriteSheetAnimation;
  let animationIdle: ƒAid.SpriteSheetAnimation;
  let animationJump: ƒAid.SpriteSheetAnimation;
  let animationFall: ƒAid.SpriteSheetAnimation;

  let ySpeed: number = 0.01;
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

    animationWalk = await buildWalkAnimation();
    animationIdle = await buildIdleAnimation();
    animationJump = await buildJumpAnimation();
    animationFall = await buildFallAnimation();

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

  function marioMovement() {
    if (
      !ƒ.Keyboard.isPressedOne([
        ƒ.KEYBOARD_CODE.D,
        ƒ.KEYBOARD_CODE.A,
        ƒ.KEYBOARD_CODE.W,
        ƒ.KEYBOARD_CODE.S,
      ])
    ) {
      ySpeed === 0 && animationCurrent !== animationIdle
        ? stetIdleAnimation()
        : "";
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
        ? walkRight(true)
        : walkRight();
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
        ? walkLeft(true)
        : walkLeft();
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) || ySpeed !== 0) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])
        ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
          ? walkRight(true)
          : walkRight()
        : ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])
        ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
          ? walkLeft(true)
          : walkLeft()
        : "";
      jump();
    }
  }

  function walkRight(sprint?: boolean) {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    animationCurrent !== animationWalk
      ? sprite.setAnimation(animationWalk)
      : "";
    animationCurrent = animationWalk;
    walkDirechtion === "left" ? turnMario() : "";
    Mario.mtxLocal.translateX(
      (ƒ.Loop.timeFrameGame * walkspeed + (sprint ? 10 : 0)) / 1000
    );
  }

  function walkLeft(sprint?: boolean) {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    animationCurrent !== animationWalk
      ? sprite.setAnimation(animationWalk)
      : "";
    walkDirechtion === "right" ? turnMario() : "";
    animationCurrent = animationWalk;
    sprite
      .getComponent(ƒ.ComponentTransform)
      .mtxLocal.translateX(
        (ƒ.Loop.timeFrameGame * walkspeed + (sprint ? 10 : 0)) / 1000
      );
  }

  function jump() {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    animationCurrent !== animationJump
      ? ySpeed >= 0
        ? sprite.setAnimation(animationJump)
        : sprite.setAnimation(animationFall)
      : "";
    animationCurrent = animationJump;
    ySpeed === 0 ? (ySpeed = 0.05) : "";
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

  function stetIdleAnimation() {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    sprite.setAnimation(animationIdle);
    animationCurrent = animationIdle;
  }

  function turnMario() {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    sprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
    walkDirechtion === "right"
      ? (walkDirechtion = "left")
      : walkDirechtion === "left"
      ? (walkDirechtion = "right")
      : "";
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

  async function buildWalkAnimation(): Promise<ƒAid.SpriteSheetAnimation> {
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
      ƒ.Vector2.X(30)
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

  async function buildJumpAnimation(): Promise<ƒAid.SpriteSheetAnimation> {
    let coat: ƒ.CoatTextured = await loadTextureFromSpriteSheet(
      "assets/Mario/MarioWalk.png"
    );
    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(
      "jump",
      coat
    );
    animation.generateByGrid(
      ƒ.Rectangle.GET(335, 1, 18, 28),
      1,
      30,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(0)
    );
    return animation;
  }

  async function buildFallAnimation(): Promise<ƒAid.SpriteSheetAnimation> {
    let coat: ƒ.CoatTextured = await loadTextureFromSpriteSheet(
      "assets/Mario/MarioWalk.png"
    );
    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(
      "fall",
      coat
    );
    animation.generateByGrid(
      ƒ.Rectangle.GET(366, 1, 16, 28),
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
