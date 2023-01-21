namespace Game {
  import ƒ = FudgeCore;
  //   import ƒAid = FudgeAid;

  // export let audioShoot: ƒ.ComponentAudio;
  export let audioShoot: ƒ.ComponentAudio;
  export let audioBackground: ƒ.ComponentAudio;

  export function createSounds() {
    setBackgroundSound();
    setShootSound();
  }

  function setShootSound() {
   let audio = new ƒ.Audio("assets/audio/PUNCH.mp3");
    audioShoot = new ƒ.ComponentAudio(audio, false, false);
    audioShoot.connect(true);
    audioShoot.volume = 0.2;
  }

  function setBackgroundSound() {
    let audio = new ƒ.Audio("assets/audio/Prepare_for_Battle_looped.mp3");
    audioShoot = new ƒ.ComponentAudio(audio, true, false);
    audioShoot.connect(true);
    audioShoot.volume = 0.1;
  }
}
