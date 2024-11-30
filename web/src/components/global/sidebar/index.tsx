import {
    Sidebar as ShadcnSidebar,
} from "@/components/shadcn/ui/sidebar";

import SidebarContent from "./content";
import SidebarHeader from "./header";
import SidebarFooter from "./footer";

const Sidebar = () => {
    return (
        <ShadcnSidebar
            variant="floating"
            collapsible="icon"
            side="left"
            className="col-[1/1] row-[2/3]"
        >

            <SidebarHeader />
            <SidebarContent />
            <SidebarFooter />

        </ShadcnSidebar >
    )
};

export default Sidebar;
