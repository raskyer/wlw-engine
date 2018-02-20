import AbstractCard from "../../../entities/abstract-card";
import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class Ddt extends AbstractCard {
  uid = "ddt";
  name = "DDT";
  img = "https://pm1.narvii.com/5851/697f239d9cd6ec27e14c40b2b8b2ccd01bb9c6b6_hq.jpg";
  description = "";
  stamina = 3;
  intensity = 0;
  damage = 10;
  effects = []; //blood
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
}

export default Ddt;
