import Sidebar from '@/components/global/sidebar'
import TopBar from '@/components/global/topbar'
import { SidebarInset, SidebarProvider } from '@/components/shadcn/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/vital/$userId/dashboard')({
    component: DashboardLayout,
})

function DashboardLayout() {

    return (
        <SidebarProvider>
            <Sidebar />

            <SidebarInset className='flex flex-col gap-2.5'>
                <TopBar />
                <Outlet />
            </SidebarInset>

        </SidebarProvider>
    )
}
