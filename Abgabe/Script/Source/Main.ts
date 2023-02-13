namespace Game {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  export let config: iConfig;
  export let gameState: Stats;
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
    config.character.forEach(async (char, i) => {
      characters.push(
        new Character(
          char.name,
          char.lookDirection,
          char.startX,
          char.startY,
          char.mass
        )
      );

      await buildAllAnimationsForCharacter(characters[i]);
      char.lookDirection === "left"
        ? characters[i].setIdleAnimation(true)
        : characters[i].setIdleAnimation();
    });

    cmpCamera = viewport.camera;
    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, 4, 15));
    cmpCamera.mtxPivot.rotateY(180);
    gameState = new Stats();
    createSounds();
    manageBorderCollision();
  }

  function manageBorderCollision() {
    let borders = viewport
      .getBranch()
      .getChildrenByName("Ground")[0]
      .getChildrenByName("mainland")[0]
      .getChildren();
    borders.forEach((border) => {
      border.getComponent(ƒ.ComponentRigidbody).addEventListener(
        ƒ.EVENT_PHYSICS.COLLISION_ENTER,
        (_event: any) => {
          const collisionPartner = _event.cmpRigidbody.node as ƒ.Node;
          if (collisionPartner instanceof Bomb) {
            console.error("Collison with " + border.name);
            let main = border.getParent().getParent().getParent();
            let light = main.getComponent(ƒ.ComponentLight).light;
            light.color.r = Math.random();
            light.color.g = Math.random();
            light.color.b = Math.random();
            light.color.a = Math.random();
          }
        }
      );
    });
  }
}
