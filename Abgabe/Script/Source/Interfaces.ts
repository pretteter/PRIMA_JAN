namespace Game {
  export interface iConfig {
    character: iCharacter[];
  }

  interface iCharacter {
    lookDirection: ConstructorParameters<typeof Character>[0];
    moveLeft: ƒ.KEYBOARD_CODE;
    moveRight: ƒ.KEYBOARD_CODE;
    attack: ƒ.KEYBOARD_CODE;
    jump: ƒ.KEYBOARD_CODE;
    startX: number;
    startY: number;
    mass: number;
  }
}
