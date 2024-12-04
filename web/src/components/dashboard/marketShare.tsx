import { PieChartData } from "@/data/temp";
import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";
import { Pie } from "react-chartjs-2";

type tmarketShareProps = {
} & HtmlHTMLAttributes<HTMLDivElement>
const MarketShare = (props: tmarketShareProps) => {
    const { className } = props;
    return (
        <div className={cn("chart max-h-[80vh] h-2/4", className)}>
            <Pie
                data={PieChartData}
                id='200'
                title='Market share data' />
        </div>

    )
}
export default MarketShare;
