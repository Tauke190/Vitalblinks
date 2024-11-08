import { createRootRoute, Outlet } from "@tanstack/react-router"
import { AuthLayout } from "./auth/_layout"

const MainLayout = () => {
    return <>
        MainLayout
        <Outlet />
    </>
}


export const Route = createRootRoute({
    component: () => {
        const auth = false;

        if (auth)
            return <MainLayout />

        return <AuthLayout />
    }
})
