import { createRootRoute, Outlet } from "@tanstack/react-router"
import { AuthLayout } from "./auth"

const MainLayout = () => {
    return <>
        <Outlet />
    </>
}


export const Route = createRootRoute({
    component: () => {
        const auth = true;

        if (auth)
            return <MainLayout />

        return <AuthLayout />
    }
})
