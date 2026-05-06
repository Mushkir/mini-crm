import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export const handleDeleteRecord = (
    id: number | undefined | null,
    endpoint: string,
    successMsg: string,
    errorMsg: string,
    reset: () => void,
) => {
    try {
        router.visit(`${endpoint}/${id}`, {
            method: 'delete',
            onSuccess: () => {
                toast.success(successMsg);
                reset?.();
            },
        });
    } catch (error) {
        console.log(error);
    }
};
