import React, { useRef, useState } from 'react';
import { ACTION_TYPE } from '@/components/constants/actionTypes';
import { DataTable } from '@/components/DataTable';
import type { IClient } from '@/interface/client';
import AddClient from './AddClient';
import { columns } from './Columns';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { COLUMN_NAMES } from '@/components/constants/columnNames';
import { CONFIRMATION_ALERT_MESSAGE } from '@/components/constants/confirmationAlertMsg';
import { handleDeleteRecord } from '@/helpers/commonFunctions';

const TheClientsPage = ({ data }: { data: IClient }) => {
    const [userAction, setUserAction] = useState('');
    const [selectedRow, setSelectedRow] = useState<IClient | null>(null);

    const confirmationAlertBtnRef = useRef<HTMLButtonElement>(null);
    const modifyModalRef = useRef<HTMLButtonElement>(null);

    const handleRowAction = (action: string, row: IClient) => {
        if (action == ACTION_TYPE.DELETE || action == ACTION_TYPE.MODIFY) {
            setUserAction(action);
            setSelectedRow(row);
            confirmationAlertBtnRef?.current?.click();
        }

        if (action == ACTION_TYPE.VIEW) {
            setUserAction(action);
            setSelectedRow(row);
            modifyModalRef?.current?.click();
        }
    };

    const handleResetState = () => {
        setUserAction('');
        setSelectedRow(null);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="hidden justify-end">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            type="button"
                            ref={confirmationAlertBtnRef}
                            variant="outline"
                        >
                            Show Dialog
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {userAction === COLUMN_NAMES.MODIFY
                                    ? CONFIRMATION_ALERT_MESSAGE.MODIFY.HEADING
                                    : userAction === COLUMN_NAMES.DELETE
                                      ? CONFIRMATION_ALERT_MESSAGE.DELELE
                                            .HEADING
                                      : ''}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {userAction === COLUMN_NAMES.MODIFY
                                    ? CONFIRMATION_ALERT_MESSAGE.MODIFY
                                          .DESCRIPTION
                                    : userAction === COLUMN_NAMES.DELETE
                                      ? CONFIRMATION_ALERT_MESSAGE.DELELE
                                            .DESCRIPTION + ' record.'
                                      : ''}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                onClick={() => {
                                    setSelectedRow(null);
                                    setUserAction('');
                                }}
                            >
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    if (userAction == ACTION_TYPE.DELETE) {
                                        handleDeleteRecord(
                                            selectedRow?.id,
                                            'clients',
                                            'Record has been deleted successfully',
                                            'An error occured while delete country! Please try again later.',
                                            handleResetState,
                                        );
                                    }

                                    if (userAction == ACTION_TYPE.MODIFY) {
                                        modifyModalRef.current?.click();
                                    }
                                }}
                                className="bg-logoYellow hover:bg-logoYelloHover transition-all"
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <div>
                <AddClient
                    ref={modifyModalRef}
                    selectedRow={selectedRow}
                    handleResetState={handleResetState}
                />
            </div>

            <DataTable
                endpoint="clients"
                columns={columns(handleRowAction)}
                data={data}
            />
        </div>
    );
};

export default TheClientsPage;
