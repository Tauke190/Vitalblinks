import { PieChartData } from "@/data/temp";
import { Pie } from "react-chartjs-2";

const MarketShare = () => {
    return (
        <div className="chart max-h-[80vh] h-2/4">
            <Pie
                data={PieChartData}
                id='200'
                title='Market share data' />
        </div>

    )
}
export default MarketShare;
