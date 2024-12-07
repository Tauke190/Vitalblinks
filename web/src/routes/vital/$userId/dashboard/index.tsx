import { DEFAULT_USER_ID } from '@/data/user'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import RegionTab from '@/components/dashboard/region';
import MarketShare from '@/components/dashboard/marketShare';
import TrendChart from '@/components/dashboard/trendChart';

ChartJS.register(ArcElement, Tooltip, Legend);

{/* loader: (ctx) => {
        const { userId } = ctx.params
        if (userId !== DEFAULT_USER_ID)
            redirect({
                to: '/auth/login',
                throw: true,
            })

        return { userId }
    }, */}
export const Route = createFileRoute('/vital/$userId/dashboard/')({
    component: DashboardPage,
})

function DashboardPage() {
    return <div className='h-[calc(100vh-72px)] w-auto py-2 pr-2'
        style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '10px',
        }}>

        <RegionTab className='w-full col-[1/3] row-[1/1]' />
        <TrendChart className='col-[2/2] row-[2/2]' />
        <MarketShare className='col-[1/1] row-[2/2]' />

    </div>
}
