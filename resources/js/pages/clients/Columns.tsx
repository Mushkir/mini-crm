import type { ColumnDef } from '@tanstack/react-table';
import type { IClient } from '@/interface/client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { options } from '@/utils/actionOptions';

export const columns: ColumnDef<IClient>[] = [
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
    },
    {
        accessorKey: 'id',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {options.map((option) => {
                            return (
                                <DropdownMenuItem className="hover:cursor-pointer">
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
