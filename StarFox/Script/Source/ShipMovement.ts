namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization

  export class SpaceShipMovement extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number =
      ƒ.Component.registerSubclass(SpaceShipMovement);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "SpaceShipMovement added to ";

    public strafeThrust: number = 20;
    public forwardthrust: number = 10000000000;

    private rgdBodySpaceship: ƒ.ComponentRigidbody;

    private relativeX: ƒ.Vector3;
    // private relativeY: ƒ.Vector3;
    private relativeZ: ƒ.Vector3;

    private width: number = 0;
    private height: number = 0;
    private xAxis: number = 0;
    private yAxis: number = 0;

    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR) return;

      // Listen to this component being added to or removed from a node

      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Debug.log(this.message, this.node);
          this.rgdBodySpaceship = this.node.getComponent(ƒ.ComponentRigidbody);

          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          console.log(this.node);
          window.addEventListener("mousemove", this.handleMouse);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    };

    update = (): void => {
      this.setRelativeAxes();

      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
        this.thrust("forward");
      }

      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
        this.thrust("back");
      }

      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
        this.roll("against");
      }

      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
        this.roll("in");
      }

      this.rgdBodySpaceship.applyTorque(new ƒ.Vector3(0, this.xAxis * -3, 0));
      this.rgdBodySpaceship.applyTorque(
        ƒ.Vector3.SCALE(this.relativeX, this.yAxis)
      );
    };

    handleMouse = (e: MouseEvent): void => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      let mousePositionY: number = e.clientY;
      let mousePositionX: number = e.clientX;

      this.xAxis = 2 * (mousePositionX / this.width) - 1;
      this.yAxis = 2 * (mousePositionY / this.height) - 1;
    };

    setRelativeAxes(): void {
      this.relativeZ = ƒ.Vector3.Z(3);
      this.relativeZ.transform(this.node.mtxWorld, false);

      this.relativeX = ƒ.Vector3.X(3);
      this.relativeX.transform(this.node.mtxWorld, false);
    }

    /**
     * thrust forward with _forward 1, backwards with _forward -1
     */
    thrust(direction: "forward" | "back"): void {
      let scaledRotatedDirection: ƒ.Vector3 = ƒ.Vector3.SCALE(
        this.relativeZ,
        this.forwardthrust * (direction === "forward" ? 1 : -1)
      );
      this.rgdBodySpaceship.applyForce(scaledRotatedDirection);
    }

    /**
     * roll right with _clockwise 1, left with _clockwise -1
     */
    public roll(_clockwise: "in" | "against"): void {
      this.rgdBodySpaceship.applyTorque(
        ƒ.Vector3.SCALE(this.relativeZ, _clockwise == "against" ? 1 : -1)
      );
    }
  }
}
