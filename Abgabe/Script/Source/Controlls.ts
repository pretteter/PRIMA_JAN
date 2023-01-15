namespace Game {
  import ƒ = FudgeCore;
  //   import ƒAid = FudgeAid;

  export function characterControlls(char: Character) {
    let moveLeft: ƒ.KEYBOARD_CODE;
    let moveRight: ƒ.KEYBOARD_CODE;
    // let shoot;

    switch (char.instanceId) {
      case 1: {
        moveLeft = ƒ.KEYBOARD_CODE.A;
        moveRight = ƒ.KEYBOARD_CODE.D;

        break;
      }
      case 2: {
        moveLeft = ƒ.KEYBOARD_CODE.ARROW_LEFT;
        moveRight = ƒ.KEYBOARD_CODE.ARROW_RIGHT;

        break;
      }
      default: {
        console.error("no Char to controll");
        return;
      }
    }

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
}
