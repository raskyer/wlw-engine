import Wrestler from "../../models/wrestler";
import * as C from "../../consts";

const TripleH: Wrestler = {
  uid: C.UIDS.TRIPLE_H,
  name: "Triple H",
  img: "",
  gender: C.Genders.MALE,
  category: C.Categories.HEAVYWEIGHT,
  health: {
    val: 100,
    max: 100
  },
  stamina: 10,
  intensity: 3,
  cards: [],
  hand: [],
  dead: []
};

export default TripleH;
