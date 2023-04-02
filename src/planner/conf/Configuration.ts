import { LocalTime, ZoneId } from '@js-joda/core';

export type Configuration = {
  readonly heureDebut: LocalTime;
  readonly heureFin?: LocalTime;
  readonly creneauEnMinutes: number;
  readonly timeZone: ZoneId;
};
