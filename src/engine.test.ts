import "mocha";
import * as _ from "lodash";
import { expect } from "chai";
import Kernel from "./kernel";
import Engine from "./engine";
import { State } from "./models";
import * as W from "./resources/wrestlers";
import * as C from "./resources/cards";

const fakeState: Readonly<State> = Object.freeze({
  turn: 0,
  active: "P1",
  targets: ["CPU"],
  next: ["CPU"],
  players: {
    P1: W.TripleH,
    CPU: W.JohnCena
  },
  card: new C.Ddt(),
  mode: {
    name: "",
    img: "",
    description: "",
    numbers: 2
  }
});

describe("Engine", () => {
  const engine = new Engine(new Kernel());

  it("should be able to make a new turn", () => {
    const mutable = engine.newTurn(fakeState);

    /* NO CHANGES */
    expect(mutable.players).to.eql(fakeState.players);

    /* CHANGES */
    expect(mutable.turn).to.equal(1);
    expect(mutable.targets.length).to.equal(0);
    expect(mutable.next.length).to.equal(0);
    expect(mutable.card).to.equal(null);
    expect(mutable.active).to.equal("CPU");
  });

  it("should be able to make a simple card play", () => {
    const mutable = engine.playCard(fakeState);

    /* NO CHANGES */
    expect(mutable.active).to.equal(fakeState.active);
    expect(mutable.targets[0]).to.equal(fakeState.targets[0]);
    expect(mutable.turn).to.equal(fakeState.turn);

    /* CHANGES */
    expect(mutable.players.CPU.health.val).to.equal(
      fakeState.players.CPU.health.val - fakeState.card.damage
    );
    expect(mutable.players.P1.stamina.val).to.equal(
      fakeState.players.P1.stamina.val - fakeState.card.stamina
    );
    expect(mutable.players.P1.intensity.val).to.equal(
      fakeState.players.P1.intensity.val - fakeState.card.intensity
    );
  });

  it("should be able to make a simple card distribution", () => {
    // Add distributor
    const mutable = engine.distributeCards(fakeState);
  });

  it("should be able to make a card validation", () => {
    // Add validator
    const mutable = engine.validateCards(fakeState);
  });

  it("should be able to choose a random card", () => {});

  it("should be able to return the active wrestler", () => {
    const active = engine.getActive(fakeState);
    expect(active).to.eql(fakeState.players.P1);
  });

  it("should be able to return the first target", () => {
    const target = engine.getFirstTarget(fakeState);
    expect(target).to.eql(fakeState.players.CPU);
  });

  it("should be able to return the targets", () => {
    const targets = engine.getTargets(fakeState);
    expect(targets.length).to.equal(1);
    expect(targets).to.eql([fakeState.players.CPU]);
  });

  it("should be able to return all wrestlers", () => {
    const wrestlers = engine.getWrestlers(fakeState);
    expect(wrestlers.length).to.equal(2);
    expect(wrestlers).eql([fakeState.players.P1, fakeState.players.CPU]);
  });

  it("should be able to generate a random bool", () => {
    expect(engine.randomBool(100)).to.equal(true);
    expect(engine.randomBool(0)).to.equal(false);
  });

  it("should be able to generate a random int", () => {
    expect(engine.randomInt(0, 0)).to.equal(0);
    expect(engine.randomInt(100, 100)).to.equal(100);
    expect(engine.randomInt(0, 10))
      .to.be.greaterThan(-1)
      .and.lessThan(11);
  });

  it("should be able to add validator", () => {
    const f: State = _.cloneDeep(fakeState);
    f.players.P1.hand.push(new C.Ddt());
    let counter = 0;

    engine.addValidator((card, mutable, e) => {
      expect(e).to.eql(engine);
      counter++;
    });

    engine.validateCards(f);
    expect(counter).to.equal(1);
  });

  it("should be able to add distributor", () => {
    let counter = 0;

    engine.addDistributor((wrestler, mutable, e) => {
      expect(e).to.eql(engine);
      wrestler.hand.push(new C.Ddt());
      counter++;
    });

    engine.distributeCards(fakeState);
    expect(counter).to.equal(1);
  });
});
