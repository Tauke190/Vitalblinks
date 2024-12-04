import { cn } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { HtmlHTMLAttributes } from "react";

type tRegionTabProps = {
} & HtmlHTMLAttributes<HTMLDivElement>

const RegionTab = (props: tRegionTabProps) => {
    const { className } = props;

    return (
        <Card className={cn("", className)}>
            <CardHeader>Region</CardHeader>
            <CardBody>
                <p>Region content</p>
            </CardBody>
        </Card>
    )
}

RegionTab.displayName = "Region";
export default RegionTab;
