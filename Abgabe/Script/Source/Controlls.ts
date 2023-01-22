namespace Game {
  import ƒ = FudgeCore;
  //   import ƒAid = FudgeAid;

  export function characterControlls(char: Character) {
    let moveLeft: ƒ.KEYBOARD_CODE;
    let moveRight: ƒ.KEYBOARD_CODE;
    let attack: ƒ.KEYBOARD_CODE;
    let jump: ƒ.KEYBOARD_CODE;

    moveLeft = index(
      ƒ.KEYBOARD_CODE,
      config.character[char.instanceId - 1].moveLeft
    );
    moveRight = index(
      ƒ.KEYBOARD_CODE,
      config.character[char.instanceId - 1].moveRight
    );
    attack = index(
      ƒ.KEYBOARD_CODE,
      config.character[char.instanceId - 1].attack
    );
    jump = index(ƒ.KEYBOARD_CODE, config.character[char.instanceId - 1].jump);

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

    function index(obj: any, i: any) {
      return obj[i];
    }
  }
}
