import { LocalTime, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';

import { Configuration } from './Configuration';

const DefaultConfiguration: Configuration = {
  heureDebut: LocalTime.of(18, 0),
  heureFin: LocalTime.of(22, 0),
  creneauEnMinutes: 10,
  timeZone: ZoneId.of('Europe/Paris'),
};

export default DefaultConfiguration;
