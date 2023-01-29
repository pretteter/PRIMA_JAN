namespace Game {
  export interface iConfig {
    character: iCharacter[];
  }

  export interface iCharacter {
    name: string;
    lookDirection: "right" | "left";
    moveLeft: ƒ.KEYBOARD_CODE;
    moveRight: ƒ.KEYBOARD_CODE;
    attack: ƒ.KEYBOARD_CODE;
    jump: ƒ.KEYBOARD_CODE;
    startX: number;
    startY: number;
    mass: number;
  }
}
