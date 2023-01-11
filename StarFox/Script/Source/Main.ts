namespace Script {
  import ƒ = FudgeCore;
  // Random Objekte einbauen

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let rbShip: ƒ.ComponentRigidbody;
  let cmpCamera: ƒ.ComponentCamera;
  let terrain: ƒ.MeshTerrain;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    cmpCamera = viewport.camera;
    // cmpCamera.mtxPivot.rotateY(90);
    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 2, -15));

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    let graph: ƒ.Node = viewport.getBranch();

    let ship: ƒ.Node = graph.getChildrenByName("Ship")[0];
    console.log(ship);
    rbShip = ship.getComponent(ƒ.ComponentRigidbody);

    terrain = graph
      .getChildrenByName("Terrain")[0]
      .getComponent(ƒ.ComponentMesh).mesh as ƒ.MeshTerrain;
    console.log(getDistanceToTerrain(graph));
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate(); // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();

    // rbShip.applyForce(ƒ.Vector3.Z(rbShip.mass * 5));
  }

  function getDistanceToTerrain(graph: ƒ.Node) {
    return terrain.getTerrainInfo(
      graph.getChildrenByName("Ship")[0].getComponent(ƒ.ComponentMesh).mtxWorld
        .translation,
      graph.getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh)
        .mtxWorld
    ).distance;
  }
}
