namespace Game {
  import ƒ = FudgeCore;
  import ƒui = FudgeUserInterface;

  export class State extends ƒ.Mutable {
    protected reduceMutator(_mutator: ƒ.Mutator): void {
      /**/
    }
    public test: string = "abc";
    public lifeChar: { char: Character["name"]; life: Character["life"] }[] =
      [];
    public testArray: string[] = ["1", "2"];
    public lifeChar1: number;
    private controller: ƒui.Controller;

    constructor() {
      super();
      this.fillLife();
      this.controller = new ƒui.Controller(
        this,
        document.querySelector("#vui")
      );
      this.lifeChar1 = this.lifeChar[0].life;
      this.lifeChar[0].life = 50;
      const x: HTMLDivElement = ƒui.Generator.createInterfaceFromMutator(
        this.testArray
      );
      console.log(x);
      document.getElementById("vui").appendChild(x);
      this.createInputs();
    }

    fillLife() {
      characters.forEach((c) => {
        this.lifeChar.push({ char: c.name, life: c.life });
      });
      // console.log(this.lifeChar[0].life);
    }

    createInputs() {
      //   let e = document.getElementById("vui") as HTMLDivElement;
      //   characters.forEach(() => {
      //     e.innerHTML =
      //       e.innerHTML + "<input type='text' key='lifeChar1' disabled=''/>";
      //   });
    }
  }
}