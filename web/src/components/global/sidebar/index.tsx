import { Sidebar as ShadcnSidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenuItem, SidebarProvider } from "@/components/shadcn/ui/sidebar";
const Sidebar = () => {
    return (
        <SidebarProvider>
            <ShadcnSidebar>

                <SidebarHeader>
                    Header
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroupLabel>
                        Home
                    </SidebarGroupLabel>
                    <SidebarGroup title="dashboard">
                        <SidebarMenuItem>
                            Hello this is lin
                        </SidebarMenuItem>
                    </SidebarGroup>

                </SidebarContent>

                <SidebarFooter>
                    I am the footer
                </SidebarFooter>

            </ShadcnSidebar >
        </SidebarProvider >
    )
};

export default Sidebar;
