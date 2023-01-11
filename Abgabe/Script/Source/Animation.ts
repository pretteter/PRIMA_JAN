namespace Game {
//   export let animationCurrent: ƒAid.SpriteSheetAnimation;
//   export let animationWalk: ƒAid.SpriteSheetAnimation;
//   export let animationIdle: ƒAid.SpriteSheetAnimation;
//   export let animationJump: ƒAid.SpriteSheetAnimation;
//   export let animationFall: ƒAid.SpriteSheetAnimation;
//   export let animationRun: ƒAid.SpriteSheetAnimation;

//   export function stetIdleAnimation(
//     character: ƒ.Node,
//     currentDirection: ConstructorParameters<typeof Character>[0]
//   ) {
//     const sprite =character.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
//     sprite.setAnimation(animationIdle);
//     animationCurrent = animationIdle;
//   }

//   export function turnCharacter(
//     character: ƒ.Node,
//     currentDirection: "right" | "left"
//   ) {
//     character.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
//     currentDirection === "right"
//       ? (currentDirection = "left")
//       : currentDirection === "left"
//       ? (currentDirection = "right")
//       : "";
//   }

  export async function buildAllAnimations(character:Character) {
    await buildMoveAnimation(character);
    await buildIdleAnimation(character);
    // await buildJumpAnimation(character);
    // await buildFallAnimation(character);
    // await buildRunAnimation(character);
  }

  async function buildMoveAnimation(character:Character) {
    character.animationMove = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "move",
      247,
      1,
      15,
      28,
      3,
      30
    );
  }

  async function buildIdleAnimation(character:Character) {
    character.animationIdle = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "idle",
      247,
      1,
      15,
      28,
      1,
      0
    );
  }

//   async function buildJumpAnimation(character:Character) {
//     animationJump = await buildSingleAnimation(
//       "assets/Mario/marioSpriteSheet.png",
//       "jump",
//       335,
//       1,
//       18,
//       28,
//       1,
//       0
//     );
//   }

//   async function buildFallAnimation(character:Character) {
//     animationFall = await buildSingleAnimation(
//       "assets/Mario/marioSpriteSheet.png",
//       "fall",
//       366,
//       1,
//       16,
//       28,
//       1,
//       0
//     );
//   }

//   async function buildRunAnimation(character:Character) {
//     animationRun = await buildSingleAnimation(
//       "assets/Mario/marioSpriteSheet.png",
//       "run",
//       245,
//       41,
//       18,
//       28,
//       3,
//       30
//     );
//   }

  async function buildSingleAnimation(
    path: string,
    name: string,
    startX: number,
    startY: number,
    width: number,
    height: number,
    frames: number,
    distanceBetweenSprites: number
  ): Promise<ƒAid.SpriteSheetAnimation> {
    let coat: ƒ.CoatTextured = await loadTextureFromSpriteSheet(path);
    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(
      name,
      coat
    );
    animation.generateByGrid(
      ƒ.Rectangle.GET(startX, startY, width, height),
      frames,
      30,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(frames > 0 ? distanceBetweenSprites : 0)
    );
    return animation;
  }

  async function loadTextureFromSpriteSheet(
    pathSpriteSheet: string
  ): Promise<ƒ.CoatTextured> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load(pathSpriteSheet);
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
    return coat;
  }
}
