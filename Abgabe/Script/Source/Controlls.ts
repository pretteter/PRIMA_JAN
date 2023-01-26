namespace Game {
  import ƒ = FudgeCore;
  //   import ƒAid = FudgeAid;

  export function characterControlls(char: Character) {
    let moveLeft: ƒ.KEYBOARD_CODE;
    let moveRight: ƒ.KEYBOARD_CODE;
    let attack: ƒ.KEYBOARD_CODE;
    let jump: ƒ.KEYBOARD_CODE;

    moveLeft =
      index(ƒ.KEYBOARD_CODE, config.character[char.instanceId - 1].moveLeft) ||
      ƒ.KEYBOARD_CODE.A;
    moveRight =
      index(ƒ.KEYBOARD_CODE, config.character[char.instanceId - 1].moveRight) ||
      ƒ.KEYBOARD_CODE.D;
    attack =
      index(ƒ.KEYBOARD_CODE, config.character[char.instanceId - 1].attack) ||
      ƒ.KEYBOARD_CODE.W;
    jump =
      index(ƒ.KEYBOARD_CODE, config.character[char.instanceId - 1].jump) ||
      ƒ.KEYBOARD_CODE.SPACE;

    movement();
    actions();

    function movement() {
      if (!ƒ.Keyboard.isPressedOne([moveLeft, moveRight])) {
        char.setIdleAnimation();
      } else if (ƒ.Keyboard.isPressedOne([moveRight])) {
        char.move("right");
      } else if (ƒ.Keyboard.isPressedOne([moveLeft])) {
        char.move("left");
      }
    }

    function actions() {
      if (ƒ.Keyboard.isPressedOne([attack])) {
        char.attack();
      }
      if (ƒ.Keyboard.isPressedOne([jump])) {
        char.jump();
      }
    }

    function index(obj: any, i: any) {
      return obj[i];
    }
  }
}
