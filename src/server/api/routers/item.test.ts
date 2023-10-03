/**
 * Integration test example for the `post` router
 */

import { inferProcedureInput } from '@trpc/server';
import { createContextInner } from '~/server/context';
import { AppRouter, appRouter } from '../root';
import { db } from '~/server/db';

test('get all published items', async () => {
  const ctx = await createContextInner({ db, user: null });
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter['item']['getAll']> = {
    limit: 10,
    page: 1,
    filter: {
      status: 'PUBLISHED',
    },
  };

  const { items } = await caller.item.getAll(input);

  expect(items.length).toMatchObject(0);
});
