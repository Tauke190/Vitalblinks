import { DEFAULT_USER_ID } from '@/data/user'
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
    return <div className='h-full w-auto'
        style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '20px',
        }}>
        <TrendChart />
        <MarketShare />
        <RegionTab />

    </div>
}
