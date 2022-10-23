namespace Script {

  export function marioMovement() {
    if (
      !ƒ.Keyboard.isPressedOne([
        ƒ.KEYBOARD_CODE.D,
        ƒ.KEYBOARD_CODE.A,
        ƒ.KEYBOARD_CODE.W,
        ƒ.KEYBOARD_CODE.S,
      ])
    ) {
      ySpeed === 0 && animationCurrent !== animationIdle
        ? stetIdleAnimation()
        : "";
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
        ? walk("right", true)
        : walk("right");
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
        ? walk("left", true)
        : walk("left");
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) || ySpeed !== 0) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])
        ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
          ? walk("right", true)
          : walk("right")
        : ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])
        ? ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
          ? walk("left", true)
          : walk("left")
        : "";
      jump();
    }
  }

  function walk(direction: "right" | "left", sprint?: boolean) {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    const anmToUse = sprint ? animationRun : animationWalk;
    animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
    animationCurrent = anmToUse;
    walkDirechtion !== direction ? turnMario() : "";
    sprite
      .getComponent(ƒ.ComponentTransform)
      .mtxLocal.translateX(
        (ƒ.Loop.timeFrameGame * walkspeed * (sprint ? 2 : 1)) / 1000
      );
  }

  function jump() {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    animationCurrent !== animationJump
      ? ySpeed >= 0
        ? sprite.setAnimation(animationJump)
        : sprite.setAnimation(animationFall)
      : "";
    animationCurrent = animationJump;
    ySpeed === 0 ? (ySpeed = 0.075) : "";
  }
}
