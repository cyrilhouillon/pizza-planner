/* eslint-disable functional/no-class */
import { LocalTime } from '@js-joda/core';

export class Creneau {
  readonly heure!: LocalTime;
}

export function precedent(creneau: string): string | null {
  if (creneau === '18:10') return '18:00';
  return null;
}
