import type { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import type { IClient } from '@/interface/client';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { options } from '@/utils/actionOptions';

export const columns = (
    handleRowAction: (action: string, row: IClient) => void,
): ColumnDef<IClient>[] => [
    {
        accessorKey: 'first_name',
        header: 'First name',
    },
    {
        accessorKey: 'last_name',
        header: 'Last name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone_no',
        header: 'Phone',
    },
    {
        accessorKey: 'logo',
        header: 'Image',
        cell: ({ row }) => {
            // console.log(row.original.logo_path);

            return (
                <img
                    className="w-75"
                    src={`${row?.original?.logo_path ? `/${row?.original?.logo_path}` : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}`}
                    alt={`${row.original.first_name}s image`}
                />
            );
        },
    },
    {
        accessorKey: 'id',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {options.map((option) => {
                            return (
                                <DropdownMenuItem
                                    onSelect={() => {
                                        handleRowAction?.(
                                            option.label,
                                            row?.original,
                                        );
                                    }}
                                    className="hover:cursor-pointer"
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
