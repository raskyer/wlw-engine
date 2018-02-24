import * as _ from "lodash";
import { State, Wrestler } from "../models";
import { randomInt } from "./general.utils";

/**
 * Apply recovery on the wrestler.
 *
 * @param {Wrestler} w
 * @param {number} turn
 */
export const applyRecovery = (w: Wrestler, turn: number): void => {
  w.stamina.val = Math.min(
    w.stamina.max,
    w.stamina.val + randomInt(turn, turn + w.combat.recovery)
  );
  w.intensity.val = Math.min(
    w.intensity.max,
    w.intensity.val + randomInt(turn, turn + w.combat.recovery)
  );
};

/**
 * Return true if the index/key of player represent an interactive one.
 *
 * @param {string} index
 *
 * @return {boolean}
 */
export const isInteractive = (index: string): boolean => {
  return index.charAt(0) === "P";
};
