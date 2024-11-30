import {
    SidebarHeader as ShadcnSidebarHeader
} from "@/components/shadcn/ui/sidebar"

import { ChevronsUpDownIcon } from "lucide-react";

const SidebarHeader = () => {
    return (
        <ShadcnSidebarHeader className="cursor-pointer">
            <div className="headerBox flex items-center justify-between p-2.5 rounded-md hover:bg-gray-800">
                <div className="org-details flex gap-2.5 items-center">
                    <div className="image">
                        <img src="https://archive.blogs.harvard.edu/ahshieh/files/2008/08/harvard_u_shield.jpg" height={30} width={30} />
                    </div>
                    <div className="details">
                        <div className="title font-bold text-gray-200">
                            Harvard Business
                        </div>
                        <div className="desc text-sm text-gray-400">
                            Core blinker
                        </div>
                    </div>
                </div>

                <ChevronsUpDownIcon className="h-4 aspect-square" />
            </div>
        </ShadcnSidebarHeader>
    )
}

export default SidebarHeader;
