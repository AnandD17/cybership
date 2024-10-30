'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Order, orderSchema } from '~/data/schema/order';
import { DataTableColumnHeader } from '~/components/ui/table/data-table-column-header';
import { statuses } from '~/data/data';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'customerName',
    accessorKey: 'customerName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    enableSorting: false,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    enableSorting: false,
  },
  {
    id: 'products',
    accessorKey: 'products',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => {
      const products = row.original.products;
      return <div>{products.length}</div>;
    },
    enableSorting: false,
  },
];

export const filters = [
  {
    column: 'status',
    title: 'Status',
    options: statuses,
  },
];
