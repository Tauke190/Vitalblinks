import { Button, cn, Input, Tooltip } from '@nextui-org/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { fallback, zodSearchValidator } from '@tanstack/router-zod-adapter'
import { ArrowLeft01Icon } from 'hugeicons-react'
import { HtmlHTMLAttributes } from 'react'
import { z } from 'zod'

const autoFillSchema = z.object({
    id: fallback(z.string(), '').default(''),
})

export const Route = createFileRoute('/auth/login/forgot-password/')({
    component: ForgotPassword,
    validateSearch: zodSearchValidator(autoFillSchema),
})

const GoBackPageBtn = ({
    to,
    displayName: name,
    className,
    ...rest
}: HtmlHTMLAttributes<HTMLDivElement> & {
    to?: string
    displayName?: string
}) => {
    return (
        <div
            className={cn(
                'flex items-center gap-1 text-opacity-80 hover:text-opacity-100 text-white w-max pr-2 py-1 cursor-pointer rounded-md',
                className,
            )}
            {...rest}
        >
            <ArrowLeft01Icon size={20} />
            <Link to={to}>{name || 'back'}</Link>
        </div>
    )
}

function ForgotPassword() {
    const { id } = Route.useSearch()

    return (
        <section>
            <GoBackPageBtn
                to="/auth/login"
                className="absolute top-10 left-2.5"
                displayName="login"
            />

            <form className="max-w-[420px] w-full flex flex-col gap-2.5 relative h-full justify-center">
                <div className="greetings mb-5 space-y-1.5">
                    <h2 className="font-bold text-xl">Forgot password?</h2>
                    <p className="text-gray-400">
                        Enter your email address below. We will send you an email with a
                        <Tooltip
                            showArrow
                            placement="bottom"
                            content={
                                <div>
                                    Magic Link???
                                    <p>
                                        {' '}
                                        A special magical link that authenticated you when clicked.{' '}
                                    </p>
                                </div>
                            }
                        >
                            <span className="underline w-max px-1 text-primary">
                                magic link
                            </span>
                        </Tooltip>
                        or a confirmation code to reset your password.
                    </p>
                </div>

                <div className="actual_form space-y-2.5">
                    <Input
                        labelPlacement="outside"
                        type="email"
                        name="email"
                        placeholder="saroj@vitalblinks.com"
                        label="Email"
                        required
                        isRequired
                        autoFocus
                    />

                    <div className="space-y-2.5 py-5">
                        <Button fullWidth>Signin with Magic Url</Button>

                        <Button fullWidth color="primary">
                            Change Password
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    )
}
