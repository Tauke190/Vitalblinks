import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { LucidePanelLeft } from "lucide-react";

const TopBar = () => {
    const {
        toggleSidebar,
    } = useSidebar();

    return (
        <div className="p-2 h-16 flex items-center gap-2.5">
            <LucidePanelLeft
                onClick={toggleSidebar}
                className="h-5 aspect-square text-gray-500 cursor-pointer"
            />
        </div>
    )
}

export default TopBar;
