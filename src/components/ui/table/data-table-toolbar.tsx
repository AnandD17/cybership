import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '../button';
import { Input } from '../input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData, FData> {
  table: Table<TData>;
  filters?: FData[];
  enableSearch?: boolean;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData, FData>({
  table,
  filters,
  enableSearch = true,
  children,
}: DataTableToolbarProps<TData, FData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {enableSearch && (
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filters &&
          filters.map((filter: any, index) => (
            <DataTableFacetedFilter
              key={index}
              column={table.getColumn(filter.column)}
              title={filter.title}
              options={filter.options}
            />
          ))}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
      {children}
    </div>
  );
}