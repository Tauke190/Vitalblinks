import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { firstPhaseRegSchema } from './index'
import z from "zod";
import { useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordInput from '@/components/form/customPasswordInput';
import { useMount } from '@brui/react-hooks';
import { STAGES, useRegProg } from '@/hooks/useRegisterationProgress';
import { useEffect } from 'react';

export const Route = createFileRoute('/auth/register/info')({
    component: RouteComponent,
    // #TODO: Add better zod schema validation and redirect on 
    // failure to get proper search params.
    // No modification tollerance.
    validateSearch: (s): z.infer<typeof firstPhaseRegSchema> => {
        s.role = s.role || 'user'
        s.organization_number = parseInt(s.organization_number as string) || 0
        s.purchase_number = parseInt(s.purchase_number as string) || 0
        s.access_code = parseInt(s.access_code as string) || 0

        const parsedSearch = firstPhaseRegSchema.safeParse(s);

        if (parsedSearch.success)
            return parsedSearch.data

        throw redirect({
            to: "/auth/register",
        })
    },
})

const finalRegSchema = z.object({
    first_name: z.string(),
    last_name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
}).refine(s => s.password === s.confirm_password,
    {
        path: ["confirm_password"],
        message: "Passwords do not match",
    });

type tfinalRegForm = z.infer<typeof finalRegSchema>

function RouteComponent() {
    const search = Route.useSearch();
    const router = useRouter();

    const formMethods = useForm<tfinalRegForm>({
        reValidateMode: "onChange",
        resolver: zodResolver(finalRegSchema),
    });

    const { register, formState, getFieldState } = formMethods;
    const setProgress = useRegProg().setProgress;

    useEffect(() => {
        const ProgressCount = Object.entries(formState.dirtyFields).length;
        if (!ProgressCount) return;
        setProgress(ProgressCount * 20);
    }, [JSON.stringify(formState.dirtyFields)])

    const onSubmit = (data: tfinalRegForm) => {
        const finalData = {
            ...data,
            ...search
        }

        router.navigate({
            to: "/auth/register/confirmation",
            search: finalData
        })
    }

    const stageStage = useRegProg();
    useEffect(() => {
        stageStage.setCurrentStage(STAGES[1]);
    }, [])

    return (
        <form
            className="max-w-[420px] min-w-[320px] w-full flex flex-col gap-2.5 relative  justify-center"
            onSubmit={formMethods.handleSubmit(onSubmit)}
        >
            <Input
                label='First Name'
                placeholder='Saroj'
                labelPlacement='outside'
                {...register('first_name')}
                isInvalid={!!formState.errors.first_name}
                errorMessage={formState.errors.first_name?.message}
                isRequired
                required
            />

            <Input
                label='Last Name'
                placeholder='Regmi'
                labelPlacement='outside'
                {...register('last_name')}
                isInvalid={!!formState.errors.last_name}
                errorMessage={formState.errors.last_name?.message}
            />

            <Input
                label='Email'
                isRequired
                required
                placeholder='saroj@vitalblinks.com'
                labelPlacement='outside'
                {...register('email')}
                isInvalid={!!formState.errors.email}
                errorMessage={formState.errors.email?.message}
            />

            <PasswordInput
                toggleEye
                isRequired
                required
                label='Password'
                placeholder='********'
                labelPlacement='outside'
                {...register('password')}
                isInvalid={!!formState.errors.password}
                errorMessage={formState.errors.password?.message}
            />

            <PasswordInput
                toggleEye
                label='Confirm Password'
                placeholder='********'
                labelPlacement='outside'
                {...register('confirm_password')}
                isInvalid={!!formState.errors.confirm_password}
                errorMessage={formState.errors.confirm_password?.message}
                isRequired
                required
                description={"Passwords must be at least 8 characters long."}
            />

            <div className="bottom-section mt-10 space-y-2.5">
                <div className="flex gap-2.5">
                    <Button
                        fullWidth
                        type='reset'
                        onClick={() => {
                            router.navigate({
                                to: "/auth/register",
                            })
                        }}>
                        Back
                    </Button>

                    <Button fullWidth color="primary" type="submit">
                        Next
                    </Button>
                </div>
            </div>

        </form>
    )
}
