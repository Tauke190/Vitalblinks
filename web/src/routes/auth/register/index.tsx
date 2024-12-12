import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import z from 'zod'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import {
    Button,
    Input,
    Select,
    SelectItem,
} from '@nextui-org/react'
import { zodResolver } from '@hookform/resolvers/zod'

export const Route = createFileRoute('/auth/register/')({
    component: RouteComponent,
})

export const firstPhaseRegSchema = z.object({
    role: z.enum(['user', 'admin']).default('user'),
    organization_number: z.number(),
    purchase_number: z.number().nullable(),
    access_code: z.number(),
}).refine((s) => {
    console.log(s)
    if (s.role === 'admin') {
        return !!s.organization_number && !!s.purchase_number && !!s.access_code
    }

    return !!s.organization_number && !!s.access_code
}, {
    path: ["organization_number", "purchase_number", "access_code"],
    message: "Invalid data found"
});

type tregisterForm = z.infer<typeof firstPhaseRegSchema>

function RouteComponent() {
    const formMethods = useForm<tregisterForm>({
        reValidateMode: "onChange",
        defaultValues: {
            role: "user",
        },
        resolver: zodResolver(firstPhaseRegSchema),
    })
    const { register, formState } = formMethods
    console.log(formState.errors)

    const router = useRouter()

    const userType = useWatch({
        name: "role",
        control: formMethods.control,
    })

    const isAdmin = userType === "admin";

    const onSubmit = (data: tregisterForm) => {
        router.navigate({
            to: "/auth/register/info",
            search: { ...data }
        })
    }

    return (
        <FormProvider {...formMethods}>
            <form
                className="max-w-[420px] min-w-[320px] w-full flex flex-col gap-2.5 relative  justify-center"
                onSubmit={formMethods.handleSubmit(onSubmit)}
            >
                <Select
                    tabIndex={1}
                    label="Role"
                    labelPlacement="outside"
                    placeholder='user'
                    isRequired
                    {...register('role', {
                        required: "Role is required",
                    })}
                    errorMessage={formMethods.formState.errors.role?.message}
                    isInvalid={!!formState.errors.role}
                >
                    <SelectItem key="user" >User</SelectItem>
                    <SelectItem key="admin">Admin</SelectItem>
                </Select>

                <Input
                    autoFocus
                    labelPlacement="outside"
                    type="number"
                    placeholder="9123123412"
                    label="Organization Number"
                    required
                    isRequired
                    {...register('organization_number', {
                        required: "Organization Number is required",
                    })}
                    isInvalid={!!formState.errors.organization_number}
                    errorMessage={formMethods.formState.errors.organization_number?.message}
                />

                {isAdmin ? (
                    <Input
                        labelPlacement="outside"
                        type="number"
                        placeholder="1234###"
                        label="Purchase Number"
                        required
                        isRequired
                        {...register('purchase_number', {
                            required: "Purchase Number is required",
                        })}
                        errorMessage={formMethods.formState.errors.purchase_number?.message}
                        isInvalid={!!formState.errors.purchase_number}
                    />) : null}

                <Input
                    labelPlacement="outside"
                    type="number"
                    placeholder="102030"
                    label="Access Code"
                    required
                    isRequired
                    {...register('access_code', {
                        required: "Access Code is required",
                    })}
                    errorMessage={formMethods.formState.errors.access_code?.message}
                    isInvalid={!!formState.errors.access_code}
                />

                <div className="bottom-section mt-10 space-y-2.5">
                    <div className="flex gap-2.5">
                        <Button fullWidth type='reset'>
                            Cancel
                        </Button>

                        <Button fullWidth color="primary" type="submit" >
                            Next
                        </Button>
                    </div>

                    <div className="text-center w-full space-x-1">
                        <span>Already have an account?</span>
                        <Link to="/auth/login" className="text-blue-500">
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </FormProvider >
    )
}
