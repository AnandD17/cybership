import { router, publicProcedure } from '../trpc';
import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Order.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultOrderSelect = {
  id: true,
  status: true,
  customerName: true,
  address: true,
  products: true,
} satisfies Prisma.OrdersSelect;

export const orderRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        status: z.string().nullish(),
        page: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/v11/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { status, page } = input;

      const totalItems = await prisma.orders.count({
        where: {
          status: status ? { equals: status } : undefined,
        },
      });

      const totalPages = Math.ceil(totalItems / limit);

      const items = await prisma.orders.findMany({
        select: defaultOrderSelect,
        take: limit,
        skip: page ? page * limit : undefined,
        where: {
          status: status ? { equals: status } : undefined,
        },
        // orderBy: {
        //   createdAt: 'desc',
        // },
      });


      return {
        items,
        totalPages,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const order = await prisma.orders.findUnique({
        where: { id },
        select: defaultOrderSelect,
      });
      if (!order) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No order with id '${id}'`,
        });
      }
      return order;
    }),
});

