namespace Game {
  export interface Config {
    character: Character[];
  }

  interface Character {
    moveLeft: ƒ.KEYBOARD_CODE;
    moveRight: ƒ.KEYBOARD_CODE;
    attack: ƒ.KEYBOARD_CODE;
    jump: ƒ.KEYBOARD_CODE;
    startX: number;
    startY: number;
  }
}
