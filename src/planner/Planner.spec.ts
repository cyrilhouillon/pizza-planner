import { ChronoUnit, Clock, Instant, LocalTime, ZoneId } from '@js-joda/core';
import test from 'ava';

import { PizzaPlanner } from './Planner';

test('first test', (t) => {
  t.is(new PizzaPlanner().planning, '');
});

test('get current time', (t) => {
  const clock = Clock.fixed(
    Instant.parse('2023-04-02T19:40:00.000Z'),
    ZoneId.UTC
  );
  const planner = new PizzaPlanner(clock);
  t.true(
    planner.currentTime
      .truncatedTo(ChronoUnit.MINUTES)
      .equals(LocalTime.of(19, 40).truncatedTo(ChronoUnit.MINUTES))
  );
});
