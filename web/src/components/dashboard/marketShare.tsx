import { PieChartData } from "@/data/temp";
import { cn } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { HtmlHTMLAttributes } from "react";
import { Pie } from "react-chartjs-2";

type tmarketShareProps = {
} & HtmlHTMLAttributes<HTMLDivElement>

const MarketShare = (props: tmarketShareProps) => {
    const { className } = props;

    return (
        <Card className={cn("chart w-full h-full", className)}>
            <CardHeader>Market Share</CardHeader>
            <CardBody>
                <Pie
                    data={PieChartData}
                    id='200'
                    title='Market share data' />
            </CardBody>
        </Card>

    )
}
export default MarketShare;
