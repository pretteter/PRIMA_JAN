namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let graph: ƒ.Graph;
  let cart: ƒ.Node;

  let carSpeed: number = 3;
  let carTurn: number = 2.5;

  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);
  let ctrTurn: ƒ.Control = new ƒ.Control("Turn", 100, ƒ.CONTROL_TYPE.PROPORTIONAL);

  let mtxTerrain: ƒ.Matrix4x4;
  let meshTerrain: ƒ.MeshTerrain;

  let camera: ƒ.Node = new ƒ.Node("cameraNode");
  let cmpCamera = new ƒ.ComponentCamera();
  

  ctrForward.setDelay(50);

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    graph = <ƒ.Graph>viewport.getBranch();

    cart = graph.getChildrenByName("Kart")[0];

    camera.addComponent(cmpCamera);
    camera.addComponent(new ƒ.ComponentTransform())
    graph.addChild(camera);

    cmpCamera.mtxPivot.translation = new ƒ.Vector3(0,8,-12);
    cmpCamera.mtxPivot.rotation = new ƒ.Vector3(25,0,0);
    cart.addComponent(cmpCamera);

    viewport.calculateTransforms();
    let cmpMeshTerrain: ƒ.ComponentMesh = graph.getChildrenByName("Map")[0].getComponent(ƒ.ComponentMesh);
    meshTerrain = <ƒ.MeshTerrain>cmpMeshTerrain.mesh;
    mtxTerrain = cmpMeshTerrain.mtxWorld;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used

    // camera.mtxLocal.translation = cart.mtxWorld.translation;
    // camera.mtxLocal.rotation = new ƒ.Vector3()
    viewport.draw();
    ƒ.AudioManager.default.update();

    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;

    let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
    ctrTurn.setInput(turn * carTurn * deltaTime);
    cart.mtxLocal.rotateY(ctrTurn.getOutput());

    let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
    ctrForward.setInput(forward * carSpeed * deltaTime);
    cart.mtxLocal.translateZ(ctrForward.getOutput());

    let terrainInfo: ƒ.TerrainInfo = meshTerrain.getTerrainInfo(cart.mtxLocal.translation, mtxTerrain);
    cart.mtxLocal.translation = terrainInfo.position;
    cart.mtxLocal.showTo(ƒ.Vector3.SUM(terrainInfo.position, cart.mtxLocal.getZ()), terrainInfo.normal);
  }
}