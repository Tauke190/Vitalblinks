import { DEFAULT_USER_ID } from '@/data/user'
import { Tab, Tabs } from '@nextui-org/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import RegionTab from '@/components/dashboard/region';
import MarketShare from '@/components/dashboard/marketShare';
import TrendChart from '@/components/dashboard/trendChart';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Route = createFileRoute('/vital/$userId/dashboard/')({
    component: DashboardPage,
    loader: (ctx) => {
        const { userId } = ctx.params
        if (userId !== DEFAULT_USER_ID)
            redirect({
                to: '/auth/login',
                throw: true,
            })

        return { userId }
    },
})

function DashboardPage() {
    return <div className=' h-full w-full col-[2/3] row-start-2 '>
        <Tabs radius='full' color='primary' defaultSelectedKey={"market-share"}>
            <Tab key={"region"} title="Region">
                <RegionTab />
            </Tab>

            <Tab title="Market Share" key="market-share" >
                <MarketShare />
            </Tab>

            <Tab title="Trend Chart" key={"trend-chart"}>
                <TrendChart />
            </Tab>
        </Tabs>
    </div>
}
