namespace Game {
  import ƒ = FudgeCore;
  //   import ƒAid = FudgeAid;

  export let audioShoot: ƒ.Audio;

  export function createSounds() {
    setBackgroundSound();
    setShootSound();
  }

  function setShootSound() {
    audioShoot = new ƒ.Audio("assets/audio/PUNCH.mp3");
    cmpAudio = new ƒ.ComponentAudio(audioShoot, false, false);
    cmpAudio.connect(true);
    cmpAudio.volume = 0.7;
  }

  function setBackgroundSound() {}
}
