import { Button, Checkbox, Input, Tooltip } from '@nextui-org/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
    component: RouteComponent,
})

function RouteComponent() {
    return (<form className='max-w-[420px] w-full flex flex-col gap-2.5 relative h-full justify-center'>
        <div className="greetings mb-5 space-y-1.5">
            <h2 className='font-bold text-xl'>
                Welcome to Vitalblinks.
            </h2>
            <p className='text-gray-400'>
                Your virtual business trainner.
            </p>
        </div>
        <Input
            labelPlacement='outside'
            type='email'
            name='email'
            placeholder='saroj@vitalblinks.com'
            label="Email"
            required
            isRequired
            autoFocus
        />

        <Input
            labelPlacement='outside'
            type='password'
            isRequired
            name='password'
            placeholder='Top secret passphrase'
            label="Password"
            required
        />

        <Input
            labelPlacement='outside'
            type='password'
            isRequired
            name='confirm-password'
            placeholder='Re-enter top secret passphrase'
            label="Password"
            required
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

        <Button fullWidth color='primary'>
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
    </form>)
}
