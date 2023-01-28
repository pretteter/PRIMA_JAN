namespace Game {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  export let config: iConfig;
  export let gameState: State;
  let cmpCamera: ƒ.ComponentCamera;
  export let characters: Character[] = [];

  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    // viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
    await hndLoad(_event);
    audioBackground.play(true);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate(); // if physics is included and used

    characters.forEach((x) => {
      characterControlls(x);
    });
    // characters[0].getComponent(ƒ.ComponentRigidbody).checkCollisionEvents();
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  async function hndLoad(_event: Event): Promise<void> {
    config = await (await fetch("Script/Source/config.json")).json();
    config.character.forEach(async (c, i) => {
      characters.push(
        new Character(
          c.lookDirection || "right",
          c.startX || 5,
          c.startY || 5,
          c.mass || 10
        )
      );

      await buildAllAnimationsForCharacter(characters[i]);
      c.lookDirection === "left"
        ? characters[i].setIdleAnimation(true)
        : characters[i].setIdleAnimation();
    });

    cmpCamera = viewport.camera;
    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 4, 18));
    cmpCamera.mtxPivot.rotateY(180);
    gameState = new State();
    createSounds();
  }
}
