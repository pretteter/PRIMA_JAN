namespace Game {
  import ƒ = FudgeCore;
  //   import ƒAid = FudgeAid;

  export function characterControlls(char: Character) {
    let moveLeft: ƒ.KEYBOARD_CODE;
    let moveRight: ƒ.KEYBOARD_CODE;
    let attack: ƒ.KEYBOARD_CODE;
    let jump: ƒ.KEYBOARD_CODE;

    switch (char.instanceId) {
      case 1: {
        moveLeft = ƒ.KEYBOARD_CODE.A;
        moveRight = ƒ.KEYBOARD_CODE.D;
        attack = ƒ.KEYBOARD_CODE.SPACE;
        jump = ƒ.KEYBOARD_CODE.W;
        break;
      }
      case 2: {
        moveLeft = ƒ.KEYBOARD_CODE.ARROW_LEFT;
        moveRight = ƒ.KEYBOARD_CODE.ARROW_RIGHT;
        attack = ƒ.KEYBOARD_CODE.NUMPAD0;
        jump = ƒ.KEYBOARD_CODE.ARROW_UP;
        break;
      }
      default: {
        console.error("no Char to controll");
        return;
      }
    }

    movement();
    actions();

    function movement() {
      if (!ƒ.Keyboard.isPressedOne([moveLeft, moveRight])) {
        char.animationCurrent !== char.animationIdle
          ? char.setIdleAnimation()
          : "";
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
  }
}
