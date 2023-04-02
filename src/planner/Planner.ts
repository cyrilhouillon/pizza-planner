/* eslint-disable functional/no-this-expression */
import { Clock, LocalTime } from '@js-joda/core';

import { Pizza } from '../pizza/Pizza';

import { Creneau } from './Creneau';
import { Configuration } from './conf/Configuration';
import DefaultConfiguration from './conf/DefaultConfiguration';

// eslint-disable-next-line functional/no-class
export class Planner {
  readonly clock: Clock;
  readonly conf: Configuration;
  readonly creneaux: ReadonlyMap<Creneau, ReadonlyArray<Pizza>>;

  constructor(_clock?: Clock, _conf?: Configuration) {
    if (!_conf) {
      this.conf = DefaultConfiguration;
    } else {
      this.conf = _conf;
    }
    if (_clock) {
      this.clock = _clock;
    } else {
      this.clock = Clock.system(this.conf.timeZone);
    }
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

  /**
   * Indique le nombre maximum de pizzas commandables pour un créneau horaire donné
   * @param creneau un créneau horaire au format HH:mm
   * @returns le nombre de pizzas qu'on peut ajouter à ce créneau
   */
  placesLibresPour(creneau: string): number {
    return creneau.length;
  }
}

const planner: Planner = new Planner();

export default planner;
