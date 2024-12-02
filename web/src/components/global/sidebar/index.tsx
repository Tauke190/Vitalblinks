import {
    Sidebar as ShadcnSidebar,
} from "@/components/shadcn/ui/sidebar";

import SidebarContent from "./content";
import SidebarHeader from "./header";
import SidebarFooter from "./footer";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    return (
        <ShadcnSidebar
            side="left"
            variant="floating"
            className={cn("col-[1/1] row-[2/3]",)}
        >
            <SidebarHeader />
            <SidebarContent />
            <SidebarFooter />
        </ShadcnSidebar >
    )
};

export default Sidebar;
