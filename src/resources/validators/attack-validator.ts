import Validator from "../../interfaces/validator";
import Card from "../../models/card";
import State from "../../models/state";
import { ATTACK } from "../../consts/validators";

class AttackValidator implements Validator {
  key(): string {
    return ATTACK;
  }

  isValid(card: Readonly<Card>, state: Readonly<State>): boolean {
    return true;
  }
}

export default AttackValidator;