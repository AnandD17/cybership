import { PaginationState } from '@tanstack/react-table';
import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';
import type { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { DataTable } from '~/components/ui/table/data-table';
import { columns } from '~/data/columns/order';
import type { AppRouter } from '~/server/routers/_app';

const IndexPage: NextPageWithLayout = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const getOrders = trpc.orders.list.useQuery({
    limit: pagination.pageSize,
    page: pagination.pageIndex,
  });

  return (
    <div className="p-4 px-10">
      <DataTable
        enableSearch={false}
        columns={columns}
        data={getOrders.data?.items ?? ([] as any)}
        setPagination={setPagination}
        pagination={pagination}
        pageCount={getOrders.data?.totalPages ?? 0}
      />
    </div>
  );
};

export default IndexPage;
