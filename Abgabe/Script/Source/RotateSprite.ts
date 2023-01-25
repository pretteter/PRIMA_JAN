namespace Game {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Game);

  export class RotateSprite extends ƒ.ComponentScript {
    public static readonly iSubclass: number =
      ƒ.Component.registerSubclass(RotateSprite);
    public rotSpeed: number = 100; 

    constructor() {
      super();
      if (ƒ.Project.mode == ƒ.MODE.EDITOR) return;

      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
    }

    public hndEvent = (_event: Event): void => {
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

    public update = (_event: Event): void => {
      this.node
        .getComponent(ƒ.ComponentRigidbody)
        .rotateBody(new ƒ.Vector3(0, 0, (100 * ƒ.Loop.timeFrameGame) / 1000));
    };
  }
}
