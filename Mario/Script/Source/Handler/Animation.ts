namespace Script {
  export let animationCurrent: ƒAid.SpriteSheetAnimation;
  export let animationWalk: ƒAid.SpriteSheetAnimation;
  export let animationIdle: ƒAid.SpriteSheetAnimation;
  export let animationJump: ƒAid.SpriteSheetAnimation;
  export let animationFall: ƒAid.SpriteSheetAnimation;
  export let animationRun: ƒAid.SpriteSheetAnimation;

  export function stetIdleAnimation() {
    const sprite = Mario.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    sprite.setAnimation(animationIdle);
    animationCurrent = animationIdle;
  }

  export function turnMario() {
    Mario.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
    walkDirechtion === "right"
      ? (walkDirechtion = "left")
      : walkDirechtion === "left"
      ? (walkDirechtion = "right")
      : "";
  }

  export async function buildAllAnimations() {
    await buildWalkAnimation();
    await buildIdleAnimation();
    await buildJumpAnimation();
    await buildFallAnimation();
    await buildRunAnimation();
  }

  async function buildWalkAnimation() {
    animationWalk = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "walk",
      247,
      1,
      15,
      28,
      3,
      30
    );
  }

  async function buildIdleAnimation() {
    animationIdle = await buildSingleAnimation(
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

  async function buildJumpAnimation() {
    animationJump = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "jump",
      335,
      1,
      18,
      28,
      1,
      0
    );
  }

  async function buildFallAnimation() {
    animationFall = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "fall",
      366,
      1,
      16,
      28,
      1,
      0
    );
  }

  async function buildRunAnimation() {
    animationRun = await buildSingleAnimation(
      "assets/Mario/marioSpriteSheet.png",
      "run",
      245,
      41,
      18,
      28,
      3,
      30
    );
  }

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
