import { zodResolver } from '@hookform/resolvers/zod';
import { router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import type { IClient } from '@/interface/client';

interface IAddClient {
    selectedRow?: IClient;
}

const AddClient = forwardRef<HTMLButtonElement, IAddClient>(
    ({ selectedRow }, ref) => {
        const [loading, setLoading] = useState(false);
        const [openDialog, setOpenDialog] = useState(false);

        const { props } = usePage();
        const flash: any = props.flash || {};

        const clientSchema = z.object({
            firstName: z
                .string()
                .min(3, {
                    message: 'First name must be at least 03 characters',
                })
                .max(30, {
                    message: 'First name cannot be exceed 56 characters',
                }),
            lastName: z
                .string()
                .min(3, {
                    message: 'Last name must be at least 03 characters',
                })
                .max(30, {
                    message: 'Last name cannot be exceed 56 characters',
                }),
            email: z.string().email('Please enter a valid email address.'),
            phone: z
                .string()
                .min(10, {
                    message: 'Phone number must be 10 digits',
                })
                .max(10, {
                    message: 'Phone number must be 10 digits',
                }),
        });

        type ValidationSchemaType = z.infer<typeof clientSchema>;

        const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
        } = useForm<ValidationSchemaType>({
            resolver: zodResolver(clientSchema),
        });

        const [file, setFile] = useState(null);

        const handleFileChange = (e: any) => {
            if (e.target.files) {
                setFile(e.target.files[0]);
            }
        };

        const closeModal = () => {
            setOpenDialog(false);
        };

        function onSubmit(data: z.infer<typeof clientSchema>) {
            console.log(data);

            const formData = new FormData();
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('email', data.email);
            formData.append('phone', data.phone);

            if (file) {
                formData.append('image', file);
            }

            router.post('clients', formData, {
                onStart: () => {
                    setLoading(true);
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }

        // console.log(flash);

        useEffect(() => {
            if (flash.error) {
                toast.success(flash.error);
                closeModal();
            }

            if (flash.success) {
                reset();
                toast.error(flash.success);
                closeModal();
            }
        }, [flash]);

        return (
            <div className="-mt-5 mb-10">
                <Dialog open={openDialog}>
                    <DialogTrigger asChild>
                        <Button
                            ref={ref}
                            onClick={() => setOpenDialog(true)}
                            className="bg-logoYellow hover:bg-logoYelloHover text-slate-100 transition-all"
                        >
                            <Plus />
                            <span>Add Client</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-150">
                        <DialogHeader>
                            <DialogTitle>
                                {`${selectedRow?.id ? 'Edit ' : ''} ${selectedRow?.id ? 'c' : 'C'}ountry`}
                            </DialogTitle>
                            <DialogDescription>
                                {`${selectedRow?.id ? 'Edit' : 'Create'} country here. Click ${selectedRow?.id ? 'save changes' : 'submit'} when you're done.`}
                            </DialogDescription>
                        </DialogHeader>

                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <Input
                                    placeholder="First name"
                                    // name="firstName"
                                    id="firstName"
                                    // className="w-full py-2 pl-5 mb-5 rounded-lg bg-slate-900"
                                    {...register('firstName')}
                                />
                                {errors.firstName && (
                                    <small className="mt-3 block text-red-500">
                                        {errors?.firstName.message}
                                    </small>
                                )}
                            </div>

                            <div className="mb-4">
                                <Input
                                    placeholder="Last name"
                                    // name="firstName"
                                    id="lastName"
                                    // className="w-full py-2 pl-5 mb-5 rounded-lg bg-slate-900"
                                    {...register('lastName')}
                                />
                                {errors.lastName && (
                                    <small className="mt-3 block text-red-500">
                                        {errors?.lastName.message}
                                    </small>
                                )}
                            </div>

                            <div className="mb-4">
                                <Input
                                    placeholder="Email"
                                    // name="firstName"
                                    id="email"
                                    // className="w-full py-2 pl-5 mb-5 rounded-lg bg-slate-900"
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <small className="mt-3 block text-red-500">
                                        {errors?.email.message}
                                    </small>
                                )}
                            </div>

                            <div className="mb-4">
                                <Input
                                    placeholder="Phone"
                                    type="number"
                                    // name="firstName"
                                    id="phone"
                                    // className="w-full py-2 pl-5 mb-5 rounded-lg bg-slate-900"
                                    {...register('phone')}
                                />
                                {errors.phone && (
                                    <small className="mt-3 block text-red-500">
                                        {errors?.phone.message}
                                    </small>
                                )}
                            </div>

                            <div className="mb-4">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setOpenDialog(false);
                                            // reset();
                                            // resetState?.();
                                        }}
                                        variant="outline"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-logoYellow hover:bg-logoYelloHover transition-all"
                                >
                                    {loading ? (
                                        <>
                                            <Spinner />
                                            {selectedRow?.id
                                                ? 'Saving...'
                                                : 'Creating...'}
                                        </>
                                    ) : selectedRow?.id ? (
                                        'Save changes'
                                    ) : (
                                        'Create'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    },
);

export default AddClient;
