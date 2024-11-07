import { createRootRoute, Outlet } from "@tanstack/react-router"

const MainLayout = () => {
    return <>
        MainLayout
        <Outlet />
    </>
}

export const Route = createRootRoute({
    component: () => <MainLayout />
})
