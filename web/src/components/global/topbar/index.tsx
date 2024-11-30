import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { LucidePanelLeft } from "lucide-react";

const TopBar = () => {
    return (
        <div className="col-[2/3] p-2 h-full flex items-center gap-2.5">
            <LucidePanelLeft className="h-5 aspect-square text-gray-500" />

            <div className="breadcumbs">
                <Breadcrumbs>
                    <BreadcrumbItem>
                        Vital
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        Saroj
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        Dashboard
                    </BreadcrumbItem>
                </Breadcrumbs>
            </div>

        </div>
    )
}

export default TopBar;
