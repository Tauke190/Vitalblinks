import {
    Sidebar as ShadcnSidebar,
    SidebarFooter,
    SidebarHeader,
} from "@/components/shadcn/ui/sidebar";

import SidebarContent from "./sidebarContent";

const Sidebar = () => {
    return (
        <ShadcnSidebar
            variant="floating"
            collapsible="icon"
            side="left"
            className="col-[1/1] row-[2/3]"
        >

            <SidebarHeader>
                Level 1
            </SidebarHeader>

            <SidebarContent />

            <SidebarFooter>
                Footer ho hai tw yo.
            </SidebarFooter>

        </ShadcnSidebar >
    )
};

export default Sidebar;
