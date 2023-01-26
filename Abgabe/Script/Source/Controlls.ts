namespace Game {
  import ƒ = FudgeCore;
  //   import ƒAid = FudgeAid;

  export function characterControlls(char: Character) {
    let moveLeft: ƒ.KEYBOARD_CODE;
    let moveRight: ƒ.KEYBOARD_CODE;
    let attack: ƒ.KEYBOARD_CODE;
    let jump: ƒ.KEYBOARD_CODE;

    let charData: iCharacter = config.character[char.instanceId - 1];
    type keyType = keyof typeof ƒ.KEYBOARD_CODE;

    moveLeft =
      ƒ.KEYBOARD_CODE[charData.moveLeft as keyType] || ƒ.KEYBOARD_CODE.A;
    moveRight =
      ƒ.KEYBOARD_CODE[charData.moveRight as keyType] || ƒ.KEYBOARD_CODE.D;
    attack =
      ƒ.KEYBOARD_CODE[charData.attack as keyType] || ƒ.KEYBOARD_CODE.SPACE;
    jump = ƒ.KEYBOARD_CODE[charData.jump as keyType] || ƒ.KEYBOARD_CODE.W;

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
  }
}
