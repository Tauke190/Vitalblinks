import Sidebar from '@/components/global/sidebar'
import TopBar from '@/components/global/topbar'
import { SidebarProvider } from '@/components/shadcn/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/vital/$userId/dashboard')({
    component: DashboardLayout,
})

function DashboardLayout() {
    return (
        <SidebarProvider>
            <main key={'dashboard-layout'}
                className='grid grid-rows-2 grid-cols-2 min-h-screen h-full w-full'
                style={{
                    gridTemplateColumns: "248px 1fr",
                    gridTemplateRows: "50px 1fr",
                    gap: "20px"
                }}
            >
                <TopBar />
                <Sidebar />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}
