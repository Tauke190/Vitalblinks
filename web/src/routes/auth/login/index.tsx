import { Button, Checkbox, Input } from '@nextui-org/react'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
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
    const { register, reset } = formMethods;

    const router = useRouter();

    const onSubmit = (data: tloginForm) => {
        console.log(data)
        fetch('http://localhost:3001/user/login',
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
                router.navigate({
                    to: "/vital/$userId/dashboard",
                    params: {
                        userId: data.id
                    }
                })
                reset()
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
                    {...register('email')}
                />

                <Input
                    labelPlacement="outside"
                    type="password"
                    placeholder="secr*******"
                    label="Password"
                    required
                    isRequired
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
