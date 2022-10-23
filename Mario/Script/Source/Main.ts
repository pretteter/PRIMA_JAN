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
  let animationRun: ƒAid.SpriteSheetAnimation;

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
        ? walk("right", true)
        : walk("right");
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
        ? walk("left", true)
        : walk("left");
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) || ySpeed !== 0) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])
        ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
          ? walk("right", true)
          : walk("right")
        : ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])
        ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
          ? walk("left", true)
          : walk("left")
        : "";
      jump();
    }
  }

  function walk(direction: "right" | "left", sprint?: boolean) {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    const anmToUse = sprint ? animationRun : animationWalk;
    animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
    animationCurrent = anmToUse;
    walkDirechtion !== direction ? turnMario() : "";
    sprite
      .getComponent(ƒ.ComponentTransform)
      .mtxLocal.translateX(
        (ƒ.Loop.timeFrameGame * walkspeed * (sprint ? 2 : 1)) / 1000
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
    ySpeed === 0 ? (ySpeed = 0.075) : "";
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

  async function loadTextureFromSpriteSheet(
    pathSpriteSheet: string
  ): Promise<ƒ.CoatTextured> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load(pathSpriteSheet);
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
    return coat;
  }

  async function buildAllAnimations() {
    animationRun = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "run",
      245,
      41,
      18,
      28,
      3,
      30
    );
    animationFall = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "fall",
      366,
      1,
      16,
      28,
      1
    );

    animationJump = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "jump",
      335,
      1,
      18,
      28,
      1
    );

    animationIdle = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "idle",
      247,
      1,
      15,
      28,
      1
    );

    animationWalk = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "walk",
      247,
      1,
      15,
      28,
      3,
      30
    );
  }

  async function buildSingleAnimation(
    path: string,
    name: string,
    startX: number,
    startY: number,
    width: number,
    height: number,
    frames: number,
    distanceBetweenSprites?: number
  ): Promise<ƒAid.SpriteSheetAnimation> {
    let coat: ƒ.CoatTextured = await loadTextureFromSpriteSheet(path);
    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(
      name,
      coat
    );
    animation.generateByGrid(
      ƒ.Rectangle.GET(startX, startY, width, height),
      frames,
      30,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(frames > 0 ? distanceBetweenSprites : 0)
    );
    return animation;
  }
}
