import { Button, Checkbox, Input } from '@nextui-org/react'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'

export const Route = createFileRoute('/auth/login/')({
    component: LoginPage,
})

type tloginForm = {
    email: string,
    password: string
}

function LoginPage() {
    const formMethods = useForm<tloginForm>();
    const { register, reset, setError } = formMethods;

    const router = useRouter();

    const onSubmit = (data: tloginForm) => {
        const response = axios.post('http://localhost:3001/auth/login', data);

        response.then(() => {
            reset();

            // TODO: Remove the userid as it's not necessary
            router.navigate({
                to: '/vital/$userId/dashboard',
                params: {
                    userId: "saroj"
                }
            });

        }).catch((err) => {
            if (err instanceof axios.AxiosError) {
                if (err.status === 404) {
                    setError('email', {
                        message: 'Invalid email or password',
                        type: 'server'
                    })
                }

                if (err.status === 403) {
                    setError('email', {
                        message: 'Invalid email or password',
                        type: 'server'
                    })

                    setError('password', {
                        message: 'Invalid email or password',
                        type: 'server'
                    })

                }
            }
        })
    }

    return (
        <FormProvider {...formMethods}>
            <form className="max-w-[420px] w-full flex flex-col gap-2.5 relative h-full justify-center" onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className="greetings mb-5 space-y-1.5">
                    <h2 className="font-bold text-xl">Welcome again, Blinker.</h2>
                    <p className="text-gray-400">
                        Can't wait to let you in lets first verify your identity.
                    </p>
                </div>
                <Input
                    labelPlacement="outside"
                    type="email"
                    placeholder="saroj@vitalblinks.com"
                    label="Email"
                    required
                    isRequired
                    autoFocus
                    isInvalid={!!formMethods.formState.errors.email}
                    errorMessage={formMethods.formState.errors.email?.message}
                    {...register('email')}
                />

                <Input
                    labelPlacement="outside"
                    type="password"
                    placeholder="secr*******"
                    label="Password"
                    required
                    isRequired
                    isInvalid={!!formMethods.formState.errors.password}
                    errorMessage={formMethods.formState.errors.password?.message}
                    {...register('password')}
                />

                <div className="rememberForget flex items-center justify-between mt-5">
                    <div className="remember_me flex items-center gap-1">
                        <Checkbox>Remember me</Checkbox>
                    </div>

                    <div className="forgotPassword">
                        <Link
                            to='/auth/login/forgot-password'
                            className="forgotPassword text-gray-300 underline underline-offset-3">
                            Forgot Password ?
                        </Link>
                    </div>
                </div>

                <Button fullWidth color="primary" type='submit'>
                    Login
                </Button>

                <div className="absolute bottom-10 text-center w-full space-x-1">
                    <span>Don't have an account?</span>
                    <Link to="/auth/register" className="text-blue-500">
                        Register Now
                    </Link>
                </div>
            </form>
        </FormProvider>
    )
}
