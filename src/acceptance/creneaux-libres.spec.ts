import { Clock, Instant, ZoneId } from '@js-joda/core';
import anyTest, { TestInterface } from 'ava';

import { PizzaPlanner } from '../planner/Planner';
import { Pizza, Planner } from '../planner/PlannerApi';

type ContextePlanner = { readonly planner: Planner };
const test = anyTest as TestInterface<ContextePlanner>;

test.beforeEach((t) => {
  const clock = Clock.fixed(
    Instant.parse('2023-04-02T17:40:00.000Z'),
    ZoneId.UTC
  );
  const planner = new PizzaPlanner(clock);
  // eslint-disable-next-line functional/immutable-data
  t.context = { planner: planner };
});

test('le premier creneau libre a suffisament de places pour le nombre de pizzas par créneau', (t) => {
  t.is(t.context.planner.placesLibresPour('18:00'), 7);
});

test('si déjà 4 pizzas sont commandées, il ne reste plus que 3 places', (t) => {
  t.context.planner.commander({
    creneau: '18:00',
    pizzas: [aPizza(), aPizza(), aPizza(), aPizza()],
  });
  t.is(t.context.planner.placesLibresPour('18:00'), 3);
});

test('si déjà 4 pizzas sont commandées pour 18h10, il ne reste plus que 3 places pour 18h10 mais 7 pour 18h00', (t) => {
  t.context.planner.commander({
    creneau: '18:10',
    pizzas: [aPizza(), aPizza(), aPizza(), aPizza()],
  });
  t.is(t.context.planner.placesLibresPour('18:00'), 7);
  t.is(t.context.planner.placesLibresPour('18:10'), 3);
});

function aPizza(): Pizza {
  return { name: 'Fromage', taille: 'G' };
}
