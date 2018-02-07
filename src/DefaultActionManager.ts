import Kernel from "./kernel";
import { Events, Validators } from "./consts/index";
import { State, Card } from "./models";
import { ActionManager, EventManager, Actuator, Validator } from "./interfaces";
import DefaultEventManager from "./DefaultEventManager";

class DefaultActionManager implements ActionManager {
  private readonly $k: Kernel;
  private readonly $e: EventManager;

  constructor(kernel: Kernel = new Kernel) {
    this.$k = kernel;
    this.$e = DefaultEventManager;
  }

  public makeNewTurn(mutable: State, original: Readonly<State>): State {
    this.$e.publish(Events.PRE_TURN_NEW, { mutable, original });
    this.$e.publish(Events.POST_TURN_NEW, { mutable, original });
    return mutable;
  }

  public makeCardValidation(card: Readonly<Card>, state: Readonly<State>): boolean {
    this.$e.publish(Events.PRE_CARD_VALIDATION, { card, state });
    
    for (let key of card.validators) {
      for (let validator of this.$k.getValidators(key)) {
        if (!validator.isValid(card, state)) {
          this.$e.publish(Events.POST_CARD_VALIDATION, { card, state, status: false });
          return false;
        }
      }
    }

    this.$e.publish(Events.POST_CARD_VALIDATION, { card, state, status: true });
    return true;
  }

  public makeCardPlay(mutable: State, original: Readonly<State>): State {
    this.$e.publish(Events.PRE_CARD_PLAY, { mutable, original });
    for (let key of original.card.actuators) {
      this.$k.getActuators(key).forEach((actuator: Actuator) => actuator.operate(mutable, original));
    }
    this.$e.publish(Events.POST_CARD_PLAY, { mutable, original });

    return mutable;
  }

  public makeCardDistribution(mutable: State, original: Readonly<State>): State {
    return mutable;
  }
}

export default DefaultActionManager;
