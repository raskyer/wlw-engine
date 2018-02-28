import { Actuator, Card, Effect, Kernel } from "../models";
import ArrayProxy from "./array.proxy";
import EffectProxy from "./effect.proxy";
import ActuatorsComposite from "../composites/actuators.composite";

class CardProxy {
  private readonly effects: ArrayProxy<EffectProxy>;

  constructor(private readonly card: Card) {
    this.effects = new ArrayProxy(card.effects, v => new EffectProxy(v));
  }

  getUid(): string {
    return this.card.uid;
  }

  getActuatorsKey(): string[] {
    return this.card.actuators;
  }

  getActuators(k: Kernel): ActuatorsComposite {
    const arr = this.card.actuators.map(a => k.get(a)).filter(a => a);

    return new ActuatorsComposite(arr);
  }

  getName(): string {
    return this.card.name;
  }

  getImg(): string {
    return this.card.img;
  }

  getDescription(): string {
    return this.card.description;
  }

  getStamina(): number {
    return this.card.stamina;
  }

  getIntensity(): number {
    return this.card.intensity;
  }

  getDamage(): number | undefined {
    return this.card.damage;
  }

  getEffects(): ArrayProxy<EffectProxy> {
    return this.effects;
  }

  getTargets(): number[] {
    return this.card.targets;
  }

  getRarity(): number {
    return this.card.rarity;
  }

  isBlockable(): boolean {
    return this.card.blockable;
  }

  isReverseable(): boolean {
    return this.card.reverseable;
  }

  isValid(): boolean {
    return this.card.valid;
  }

  getRef(): Card {
    return this.card;
  }
}

export default CardProxy;
