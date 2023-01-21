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
    let startX: number = 78;
    let startY: number = 4;
    let width: number = 15;
    let height: number = 17;
    let frames: number = 8;
    let distanceBetweenSprites: number = 24;

    switch (char.instanceId) {
      case 1: {
        path = "/assets/sprites/sheets/DinoSprites-mort.png";
        break;
      }
      case 2: {
        path = "/assets/sprites/sheets/DinoSprites-doux.png";
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
    let startX: number = 6;
    let startY: number = 4;
    let width: number = 15;
    let height: number = 17;
    let frames: number = 3;
    let distanceBetweenSprites: number = 24;

    switch (character.instanceId) {
      case 1: {
        path = "/assets/sprites/sheets/DinoSprites-mort.png";
        break;
      }
      case 2: {
        path = "/assets/sprites/sheets/DinoSprites-doux.png";
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

  export async function buildBombAnimation(bomb: Bomb) {
    await buildBombIdleAnimation(bomb);
    await buildBombExplodeAnimation(bomb)
  }

  async function buildBombIdleAnimation(bomb: Bomb) {
    let path: string = "assets/sprites/sheets/bomb_character_o_idle.png";
    let startX: number = 22;
    let startY: number = 21;
    let width: number = 22;
    let height: number = 30;
    let frames: number = 2;
    let distanceBetweenSprites: number = 64;

    bomb.animationIdle = await buildSingleAnimation(
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

  async function buildBombExplodeAnimation(bomb: Bomb) {
    let path: string = "assets/sprites/sheets/bomb_character_o_explode.png";
    let startX: number = 22;
    let startY: number = 27;
    let width: number = 22;
    let height: number = 24;
    let frames: number = 3;
    let distanceBetweenSprites: number = 29;

    bomb.animationExplode = await buildSingleAnimation(
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
