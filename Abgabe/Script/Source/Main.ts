namespace Game {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  let cmpCamera: ƒ.ComponentCamera;
  let characters: Character[] = [];

  export let config: iConfig;

  // let audioJump: ƒ.Audio;

  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
    cmpCamera = viewport.camera;
    // let graph: ƒ.Node = viewport.getBranch();

    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 4, 18));
    cmpCamera.mtxPivot.rotateY(180);

    await hndLoad(_event);
    createSounds();
    audioBackground.play(true);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate(); // if physics is included and used
    // console.log(config?.character);

    characters.forEach((x) => {
      characterControlls(x);
    });
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  async function hndLoad(_event: Event): Promise<void> {
    // Load config
    config = await (await fetch("Script/Source/config.json")).json();

    config.character.forEach(async (c, i) => {
      if (i <= 3) {
        characters.push(
          new Character("right", c.startX | 5, c.startY | 5, c.mass | 10)

        );
        await buildAllAnimationsForCharacter(characters[i]);
        // characters[i].setIdleAnimation("left");
      } else return;
    });
  }
}
