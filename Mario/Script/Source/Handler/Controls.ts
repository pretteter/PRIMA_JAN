namespace Script {
  export function marioControls() {
    if (
      !ƒ.Keyboard.isPressedOne([
        ƒ.KEYBOARD_CODE.D,
        ƒ.KEYBOARD_CODE.A,
        ƒ.KEYBOARD_CODE.W,
        ƒ.KEYBOARD_CODE.S,
      ])
    ) {
      collision && animationCurrent !== animationIdle
        ? stetIdleAnimation()
        : "";
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
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
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
        ? walk("right", true)
        : walk("right");
    } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])
        ? walk("left", true)
        : walk("left");
    }
    if (!collision) {
      manageJumpAndFallAnimation();
    }
  }

  function walk(direction: "right" | "left", sprint?: boolean) {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    if (collision) {
      const anmToUse = sprint ? animationRun : animationWalk;
      animationCurrent !== anmToUse ? sprite.setAnimation(anmToUse) : "";
      animationCurrent = anmToUse;
    }
    walkDirechtion !== direction ? turnMario() : "";
    Mario.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(
      (ƒ.Loop.timeFrameGame * walkspeed * (sprint ? 2 : 1)) / 1000
    );
  }

  function jump() {
    cmpAudio.play(true);
    collision ? (ySpeed = 5) : "";
  }

  function manageJumpAndFallAnimation() {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    ySpeed >= 0
      ? sprite.setAnimation(animationJump)
      : sprite.setAnimation(animationFall);
    animationCurrent = animationJump;
  }
}
