/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { orderRouter } from './order';
import { postRouter } from './post';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  post: postRouter,
  orders:orderRouter
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
