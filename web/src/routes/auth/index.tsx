import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
    component: LoginPage,
    notFoundComponent: () => {
        return "No matching route found"
    },
    beforeLoad: () => {
        const isAuthenticated = false

        if (!isAuthenticated)
            throw redirect({
                to: "/auth/login/",
                replace: true,
            })
    },
})

function LoginPage() {
    return 'Redirecting to Login page ...'
}
