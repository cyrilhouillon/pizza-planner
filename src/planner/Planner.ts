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
    if (creneau) return 4;
    return 0;
  }

  prochainCreneau(): ReadonlyArray<Pizza> {
    return [];
  }

  validerImpression(creneau: string): boolean {
    if (creneau) return true;
    return false;
  }

  commander(commande: Commande): boolean {
    if (commande) return true;
    return false;
  }
}
