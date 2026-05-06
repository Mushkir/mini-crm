import React from 'react';
import { DataTable } from '@/components/DataTable';
import type { IClient } from '@/interface/client';
import AddClient from './AddClient';
import { columns } from './Columns';

const TheClientsPage = ({ data }: { data: IClient }) => {
    return (
        <div className="container py-10 mx-auto">
            <div>
                <AddClient />
            </div>

            <DataTable endpoint="clients" columns={columns} data={data} />
        </div>
    );
};

export default TheClientsPage;
