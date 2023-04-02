/* eslint-disable functional/no-this-expression */
import { Clock, LocalTime } from '@js-joda/core';

import { Creneau } from './Creneau';
import { Commande, Pizza, Planner } from './PlannerApi';
import { Configuration } from './conf/Configuration';
import DefaultConfiguration from './conf/DefaultConfiguration';

// eslint-disable-next-line functional/no-class
export class PizzaPlanner implements Planner {
  readonly clock: Clock;
  readonly conf: Configuration;
  readonly creneaux: ReadonlyMap<Creneau, ReadonlyArray<Pizza>>;
  // eslint-disable-next-line functional/prefer-readonly-type
  commandes: Map<string, Array<Commande>> = new Map();

  constructor(clock?: Clock, conf?: Configuration) {
    this.conf = conf || DefaultConfiguration;
    this.clock = clock || Clock.system(this.conf.timeZone);
    this.creneaux = this.initialiserCreneaux();
  }

  private initialiserCreneaux(): ReadonlyMap<Creneau, ReadonlyArray<Pizza>> {
    return new Map();
  }

  get planning(): string {
    return '';
  }

  get currentTime(): LocalTime {
    return LocalTime.now(this.clock);
  }

  placesLibresPour(creneau: string): number {
    const commandesPourCeCreneau = this.commandes.get(creneau);
    if (commandesPourCeCreneau) {
      return (
        this.conf.nbPizzasParCreneau -
        commandesPourCeCreneau
          .map((c) => c.pizzas.length)
          .reduce((sum, current) => sum + current, 0)
      );
    }
    return this.conf.nbPizzasParCreneau;
  }

  prochainCreneau(): ReadonlyArray<Pizza> {
    return [];
  }

  validerImpression(creneau: string): boolean {
    if (creneau) return true;
    return false;
  }

  commander(commande: Commande): boolean {
    const commandesPourCeCreneau = this.commandes.get(commande.creneau);
    if (commandesPourCeCreneau) {
      this.commandes.set(commande.creneau, [
        ...commandesPourCeCreneau,
        commande,
      ]);
    } else {
      this.commandes.set(commande.creneau, [commande]);
    }
    return true;
  }
}
