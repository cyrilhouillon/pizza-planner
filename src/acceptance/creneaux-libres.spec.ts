import { Clock, Instant, ZoneId } from '@js-joda/core';
import test from 'ava';

import { PizzaPlanner } from '../planner/Planner';

const clock = Clock.fixed(
  Instant.parse('2023-04-02T17:40:00.000Z'),
  ZoneId.UTC
);
const planner = new PizzaPlanner(clock);

test('le premier creneau libre a suffisament de places pour le nombre de pizzas par créneau', (t) => {
  t.is(planner.placesLibresPour('18:00'), 7);
});
