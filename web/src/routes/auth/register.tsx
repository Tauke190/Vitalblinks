import { Button, Checkbox, Input, Select, SelectItem, Tooltip, } from '@nextui-org/react'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { FormProvider, useForm } from "react-hook-form"
import z from 'zod'

export const Route = createFileRoute('/auth/register')({
    component: RegisterPage,
})

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    'confirm-password': z.string().min(6),
    role: z.enum(["user", "admin"]).default("user"),
    username: z.string().min(3)
});

type tregisterForm = z.infer<typeof registerSchema>;

function RegisterPage() {
    // TODO: Add form validation
    // and error messages
    const formMethods = useForm<tregisterForm>({});
    const { register, reset } = formMethods;

    const router = useRouter();

    const onSubmit = (data: tregisterForm) => {
        console.log(data)
        fetch('http://localhost:3001/user/register',
            {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => {
                if (res.ok) {
                    reset();
                    return res.json()
                }
                throw new Error('Response not ok')
            }).then(data => {
                console.log(data)

                router.navigate({
                    to: "/vital/$userId/dashboard",
                    params: {
                        userId: data.id
                    }
                })
            })
    }

    return (
        <FormProvider {...formMethods}>
            <form
                className='max-w-[420px] w-full flex flex-col gap-2.5 relative h-full justify-center'
                onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className="greetings mb-5 space-y-1.5">
                    <h2 className='font-bold text-xl'>
                        Welcome to Vitalblinks.
                    </h2>
                    <p className='text-gray-400'>
                        Your virtual business trainner.
                    </p>
                </div>

                <Select
                    defaultSelectedKeys={"user"}
                    label="Role"
                    labelPlacement='outside'
                    isRequired
                    {...register('role')}
                    errorMessage={formMethods.formState.errors.role?.message}
                >
                    <SelectItem key="user">
                        user
                    </SelectItem>

                    <SelectItem key="admin">
                        admin
                    </SelectItem>
                </Select>

                <Input
                    labelPlacement='outside'
                    type='text'
                    placeholder='saroj200'
                    label="Username"
                    required
                    isRequired
                    autoFocus
                    {...register('username')}
                    errorMessage={formMethods.formState.errors.username?.message}
                />


                <Input
                    labelPlacement='outside'
                    type='email'
                    placeholder='saroj@vitalblinks.com'
                    label="Email"
                    required
                    isRequired
                    autoFocus
                    {...register('email')}
                    errorMessage={formMethods.formState.errors.email?.message}
                />

                <Input
                    labelPlacement='outside'
                    type='password'
                    isRequired
                    placeholder='Top secret passphrase'
                    label="Password"
                    required
                    {...register('password')}
                    errorMessage={formMethods.formState.errors.password?.message}
                />

                <Input
                    labelPlacement='outside'
                    type='password'
                    isRequired
                    placeholder='Re-enter top secret passphrase'
                    label="Confirm Password"
                    required
                    {...register('confirm-password')}
                    errorMessage={formMethods.formState.errors['confirm-password']?.message}
                />


                <div className="rememberForget flex items-center justify-between mt-5">
                    <Tooltip
                        placement='right'
                        delay={200}
                        content={
                            <div>
                                If checked you will be Automatically logged in
                                <br />
                                after successfull signin.
                            </div>
                        }
                        showArrow>
                        <div className="remember_me flex items-center gap-1">
                            <Checkbox id='checkbox' />
                            <label htmlFor='checkbox'>
                                Auto Login
                            </label>
                        </div>
                    </Tooltip>
                </div>

                <Button fullWidth color='primary' role='submit' type='submit'>
                    Register
                </Button>

                <div className="absolute bottom-10 text-center w-full space-x-1">
                    <span>
                        Already have an account?
                    </span>
                    <Link to="/auth/login" className='text-blue-500'>
                        Login Now
                    </Link>
                </div>
            </form >
        </FormProvider>
    )
}
