import {
    SidebarFooter as ShadcnSidebarFooter
} from "@/components/shadcn/ui/sidebar"
import { USER } from "@/data/temp";
import { ChevronsUpDownIcon } from "lucide-react";


const SidebarFooter = () => {
    return (
        <ShadcnSidebarFooter className="cursor-pointer">
            <div className="headerBox flex items-center justify-between p-2.5 rounded-md hover:bg-gray-800">
                <div className="org-details flex gap-2.5 items-center">
                    <div className="image w-9 aspect-square rounded-md overflow-hidden bg-red-200">
                        <img src={USER.profile} />
                    </div>
                    <div className="details">
                        <div className="title font-bold text-gray-200">
                            {USER.name}
                        </div>
                        <div className="desc text-sm text-gray-400 break-all">
                            {USER.email}
                        </div>
                    </div>
                </div>

                <ChevronsUpDownIcon className="h-4 aspect-square" />
            </div>

        </ShadcnSidebarFooter>
    )
}

export default SidebarFooter;
