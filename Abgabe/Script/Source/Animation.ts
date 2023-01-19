namespace Game {

  export async function buildAllAnimationsForCharacter(character: Character) {
    await buildMoveAnimation(character);
    await buildIdleAnimation(character);
    // await buildJumpAnimation(character);
    // await buildFallAnimation(character);
    // await buildRunAnimation(character);
  }

  async function buildMoveAnimation(char: Character) {
    let path: string;
    let startX: number;
    let startY: number;
    let width: number;
    let height: number;
    let frames: number;
    let distanceBetweenSprites: number;

    switch (char.instanceId) {
      case 1: {
        path = "assets/Mario/marioSpriteSheet.png";
        startX = 247;
        startY = 1;
        width = 15;
        height = 28;
        frames = 3;
        distanceBetweenSprites = 30;
        break;
      }
      case 2: {
        path = "/assets/sprites/sheets/DinoSprites-doux.png";
        startX = 247;
        startY = 1;
        width = 15;
        height = 28;
        frames = 3;
        distanceBetweenSprites = 30;
        break;
      }
      default: {
        console.error("no character to generate");
        return;
      }
    }

    char.animationMove = await buildSingleAnimation(
      path,
      "move",
      startX,
      startY,
      width,
      height,
      frames,
      distanceBetweenSprites
    );
  }

  async function buildIdleAnimation(character: Character) {
    let path: string;
    let startX: number;
    let startY: number;
    let width: number;
    let height: number;
    let frames: number;
    let distanceBetweenSprites: number;

    switch (character.instanceId) {
      case 1: {
        path = "assets/Mario/marioSpriteSheet.png";
        startX = 247;
        startY = 1;
        width = 15;
        height = 28;
        frames = 1;
        distanceBetweenSprites = 0;
        break;
      }
      case 2: {
        path = "/assets/sprites/sheets/DinoSprites-doux.png";
        startX = 247;
        startY = 1;
        width = 15;
        height = 28;
        frames = 1;
        distanceBetweenSprites = 0;
        break;
      }
      default: {
        console.error("no character to generate");
        return;
      }
    }
    character.animationIdle = await buildSingleAnimation(
      path,
      "idle",
      startX,
      startY,
      width,
      height,
      frames,
      distanceBetweenSprites
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
