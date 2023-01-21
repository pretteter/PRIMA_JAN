namespace Game {
  import ƒ = FudgeCore;
//   import ƒAid = FudgeAid;

  export let audioShoot: ƒ.Audio;

  export function createSounds() {
    setShootSound();
  }

  function setShootSound() {
    audioShoot = new ƒ.Audio("/assets/audio/PUNCH #2.mp3");
    cmpAudio = new ƒ.ComponentAudio(audioShoot, false, false);
    cmpAudio.connect(true);
    cmpAudio.volume = 0.7;
  }
}
