import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

type tRegionTabProps = {
} & HtmlHTMLAttributes<HTMLDivElement>

const RegionTab = (props: tRegionTabProps) => {
    const { className } = props;

    return (
        <div className={cn("", className)}>
        </div>
    )
}

RegionTab.displayName = "Region";
export default RegionTab;
