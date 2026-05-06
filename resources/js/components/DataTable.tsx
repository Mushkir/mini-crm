/* eslint-disable @typescript-eslint/no-explicit-any */

import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[] | any;
    enableMultiRowSelection?: boolean;
    endpoint: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    enableMultiRowSelection = true,
    endpoint,
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState({
        pageIndex: data.current_page - 1, // page
        pageSize: data.per_page, // rowsPerPage
    });

    const table = useReactTable({
        data: data.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // Required for server-side pagination
        enableMultiRowSelection: enableMultiRowSelection,
        manualPagination: true,
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
        rowCount: data.total,
    });

    const getAll = () => {
        // router.visit('frequently-asked-questions', {
        router.visit(endpoint, {
            method: 'get',
            data: {
                page: pagination.pageIndex + 1,
                perPage: pagination.pageSize,
            },
            replace: true,
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        getAll();
    }, [pagination.pageIndex, pagination.pageSize]);

    // console.log(table);

    // console.log(table.getPageCount());
    // console.log(table.getRowCount());

    // console.log(pagination.pageSize);
    // console.log(table.getState().pagination.pageSize);
    // console.log(table.getSelectedRowModel().rows);

    return (
        <div className="-mt-5 overflow-hidden border rounded-md">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <>
                {/* <Button onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
                    {'<<'}
                </Button> */}
                {/* <Button onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
                    {'>>'}
                </Button> */}

                <div className="flex items-center justify-end py-4 pr-5 space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>

                    {/* <span>{`${pagination.pageIndex + 1} of ${table.getPageCount()}`}</span> */}
                    <span>{`${data.to} of ${table.getRowCount()}`}</span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </>
        </div>
    );
}
