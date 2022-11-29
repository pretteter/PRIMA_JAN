namespace Script {
  import ƒ = FudgeCore;
  // Random Objekte einbauen

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let rbShip: ƒ.ComponentRigidbody;
  let cmpCamera: ƒ.ComponentCamera;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    cmpCamera = viewport.camera;
    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 2, -15));


    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    let graph: ƒ.Node = viewport.getBranch();
    
    let ship: ƒ.Node = graph.getChildrenByName("Ship")[0];
    console.log(ship);
    rbShip = ship.getComponent(ƒ.ComponentRigidbody);

  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();

    // rbShip.applyForce(ƒ.Vector3.Z(rbShip.mass * 5));
  }
}