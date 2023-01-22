namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  export let Mario: ƒ.Node;
  export let spriteNode: ƒAid.NodeSprite;
  export let walkspeed: number = 2;
  export let walkDirechtion: "right" | "left" = "right";
  export let ySpeed: number = 1;
  export let collision: boolean = false;
  export let cmpAudio: ƒ.ComponentAudio;
  let audioJump: ƒ.Audio;

  let gravity: number = 10;

  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );
  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    viewport.camera.mtxPivot.translateZ(20);
    viewport.camera.mtxPivot.rotateY(180);

    // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    let branch: ƒ.Node = viewport.getBranch();
    Mario = branch.getChildrenByName("Mario")[0];
    Mario.addChild(await createNewSpriteNode("forward"));

    await buildAllAnimations();
    stetIdleAnimation();
    let audio: ƒ.ComponentAudio = viewport
      .getBranch()
      .getComponent(ƒ.ComponentAudio);
    console.log(audio);

    setJumpSound();

    hndLoad(_event);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();
    // ƒ.Loop.timeFrameGame
  }

  async function update(_event: Event): Promise<void> {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();

    marioControls();
    setGravityForMario();
    // checkCollision();
    initCollision();
    // viewport.camera.mtxPivot.set(Mario.getComponent(ƒ.ComponentTransform).mtxLocal);
  }

  function setGravityForMario() {
    let deltaTime: number = ƒ.Loop.timeFrameGame / 1000;
    ySpeed <= -5 ? (ySpeed = -5) : "";
    ySpeed -= gravity * deltaTime;
    let yOffset: number = ySpeed * deltaTime;
    Mario.mtxLocal.translateY(yOffset);
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

  export function checkCollision() {
    let blocks: ƒ.Node = viewport.getBranch().getChildrenByName("Floor")[0];
    let pos: ƒ.Vector3 = Mario.mtxLocal.translation;
    for (let block of blocks.getChildren()) {
      let posBlock: ƒ.Vector3 = block.mtxLocal.translation;
      if (Math.abs(pos.x - posBlock.x) < 0.5) {
        if (pos.y < posBlock.y && pos.y > posBlock.y - 0.2) {
          collision = true;
          return;
        }
      }
    }
    collision = false;
  }

  function initCollision() {
    checkCollision();
    if (collision) {
      let blocks: ƒ.Node = viewport.getBranch().getChildrenByName("Floor")[0];
      let pos: ƒ.Vector3 = Mario.mtxLocal.translation;
      for (let block of blocks.getChildren()) {
        let posBlock: ƒ.Vector3 = block.mtxLocal.translation;
        pos.y = posBlock.y;
        Mario.mtxLocal.translation = pos;
        ySpeed = 0;
      }
    }
  }

  function setJumpSound() {
    audioJump = new ƒ.Audio("audio/jump.mp3");
    cmpAudio = new ƒ.ComponentAudio(audioJump, false, false);
    cmpAudio.connect(true);
    cmpAudio.volume = 0.7;
  }

  async function hndLoad(_event: Event): Promise<void> {
    // Load config
    config = await (await fetch("./config.json")).json();
  }
}
