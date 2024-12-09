import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import z from 'zod'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import {
    Button,
    Input,
    Select,
    SelectItem,
} from '@nextui-org/react'

export const Route = createFileRoute('/auth/register/')({
    component: RouteComponent,
})

const registerSchema = z.object({
    role: z.enum(['user', 'admin']).default('user'),
    organization_number: z.number(),
    purchase_number: z.number().nullable(),
    access_code: z.number(),
})

type tregisterForm = z.infer<typeof registerSchema>

function RouteComponent() {
    const formMethods = useForm<tregisterForm>({
        defaultValues: {
            role: "user",
        }
    })
    const { register } = formMethods
    const router = useRouter()

    const userType = useWatch({
        name: "role",
        control: formMethods.control,
    })

    const isAdmin = userType === "admin";

    const onSubmit = (data: tregisterForm) => {
        console.log(data)
    }


    return (
        <FormProvider {...formMethods}>
            <form
                className="max-w-[420px] min-w-[320px] w-full flex flex-col gap-2.5 relative  justify-center"
                onSubmit={formMethods.handleSubmit(onSubmit)}
            >
                <Select
                    label="Role"
                    labelPlacement="outside"
                    placeholder='user'
                    isRequired
                    {...register('role')}
                    errorMessage={formMethods.formState.errors.role?.message}
                >
                    <SelectItem key="user" >user</SelectItem>
                    <SelectItem key="admin">admin</SelectItem>
                </Select>

                <Input
                    labelPlacement="outside"
                    type="text"
                    placeholder="9123123412"
                    label="Organization Number"
                    required
                    isRequired
                    autoFocus
                    {...register('organization_number')}
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
                        autoFocus
                        {...register('purchase_number')}
                        errorMessage={formMethods.formState.errors.purchase_number?.message}
                    />) : null}

                <Input
                    labelPlacement="outside"
                    type="number"
                    placeholder="102030"
                    label="Access Code"
                    required
                    isRequired
                    autoFocus
                    {...register('access_code')}
                    errorMessage={formMethods.formState.errors.access_code?.message}
                />

                <div className="bottom-section mt-10 space-y-2.5">
                    <div className="flex gap-2.5">
                        <Button fullWidth type="submit">
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
