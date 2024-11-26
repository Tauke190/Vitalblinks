import Sidebar from '@/components/global/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/vital/$userId/dashboard')({
    component: DashboardLayout,
})

function DashboardLayout() {
    return (
        <main key={'dashboard-layout'}>
            <Sidebar />
            <Outlet />
        </main>
    )
}
