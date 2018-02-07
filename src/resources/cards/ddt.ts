import Card from "../../models/card";
import * as Actuators from "../../consts/actuators";
import * as Validators from "../../consts/validators";
import * as Targets from "../../consts/targets";

const DDT: Card = {
  uid: "",
  actuators: [Actuators.BASE, Actuators.ATTACK],
  validators: [Validators.ATTACK],
  name: "DDT",
  img: "",
  description: "",
  stamina: 3,
  intensity: 1,
  damage: 10,
  effects: [],
  targets: [Targets.OPPONENT],
  reverseable: true
};

export default DDT;
