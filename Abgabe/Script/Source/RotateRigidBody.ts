namespace Game {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Game);

  export class RotateRigidBody extends ƒ.ComponentScript {
    static readonly iSubclass: number =
      ƒ.Component.registerSubclass(RotateRigidBody);
    rotSpeed: number = 100;

    constructor() {
      super();
      if (ƒ.Project.mode == ƒ.MODE.EDITOR) return;

      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
    }

    hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
      }
    };

    update = (_event: Event): void => {
      this.node
        .getComponent(ƒ.ComponentRigidbody)
        .rotateBody(new ƒ.Vector3(0, 0, (100 * ƒ.Loop.timeFrameGame) / 1000));
    };
  }
}
