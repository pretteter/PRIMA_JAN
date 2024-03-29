namespace Game {
  import ƒ = FudgeCore;
  import ƒui = FudgeUserInterface;

  export class Stats extends ƒ.Mutable {
    protected reduceMutator(_mutator: ƒ.Mutator): void {
      /**/
    }
    // test: string = "abc";
    lifeChar: { char: Character["name"]; life: Character["life"] }[] = [];
    testArray: string[] = [];
    // lifeChar1: number;
    controller: ƒui.Controller;

    constructor() {
      super();
      this.fillLife();
      this.controller = new ƒui.Controller(
        this,
        document.querySelector("#vui")
      );
      // this.lifeChar1 = this.lifeChar[0].life;
      // this.lifeChar[0].life = 50;
      this.refresh();
      // this.createInputs();
    }

    fillLife() {
      this.lifeChar = [];
      this.testArray = [];
      characters.forEach((c) => {
        this.lifeChar.push({ char: c.name, life: c.life });
      });
      this.lifeChar.forEach((input) => {
        this.testArray.push(input.life.toString());
      });
    }

    refresh() {
      const myNode = document.getElementById("vui");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
      }
      this.fillLife();
      const x: HTMLDivElement = ƒui.Generator.createInterfaceFromMutator(
        this.testArray
      );
      for (let i in x.children) {
        if (Number(i) <= characters.length)
          x.children[i]?.setAttribute("label", characters[i].name);
      }

      myNode.appendChild(x);
    }
  }
}
