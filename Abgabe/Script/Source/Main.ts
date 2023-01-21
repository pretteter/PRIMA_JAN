namespace Game {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  let cmpCamera: ƒ.ComponentCamera;
  let characters: Character[] = [];

  // let audioJump: ƒ.Audio;

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
    cmpCamera = viewport.camera;
    // let graph: ƒ.Node = viewport.getBranch();

    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 4, 18));
    cmpCamera.mtxPivot.rotateY(180);

    createSounds();
    // audioBackground.play(true);
    characters.push(
      new Character("right", -5, 2),
      new Character("right", 5, 5)
    );
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate(); // if physics is included and used
    characters.forEach((x) => {
      characterControlls(x);
    });
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}
