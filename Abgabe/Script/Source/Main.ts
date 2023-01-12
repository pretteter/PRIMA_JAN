namespace Game {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  let cmpCamera: ƒ.ComponentCamera;

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    cmpCamera = viewport.camera;
    let graph: ƒ.Node = viewport.getBranch();

    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 0, 35));
    cmpCamera.mtxPivot.rotateY(180);

    let charLeft = new Character("left", 0, 0);
    let charRight = new Character("right", 5, 5);
    // let charRight = new Character("right");
    // charLeft.mtxLocal.translateY(2);
    // graph.addChild(charRight);
    console.log(graph);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}
